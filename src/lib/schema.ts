import { z } from "zod";
import {
  INQUIRY_COURSES,
  isProposedCourseRequired,
} from "@/lib/content/institutions";

const PHONE_SHAPE = /^[\d\s+().-]{7,20}$/;
const PHONE_EXTENSION = /\s*(?:extension|extn|ext|x)\.?\s*\d{1,6}$/i;

const GUARDIAN_LED_PROGRAMS = new Set<string>(
  INQUIRY_COURSES.filter((course) => course.institutionId === "school").map(
    (course) => course.id,
  ),
);

export function isGuardianLedProgram(program: string): boolean {
  return GUARDIAN_LED_PROGRAMS.has(program.trim());
}

function isPhone(value: string) {
  const base = value.replace(PHONE_EXTENSION, "");
  if (!PHONE_SHAPE.test(base)) return false;
  const digits = base.replace(/\D/g, "").length;
  return digits >= 7 && digits <= 15;
}

function endOfToday() {
  const day = new Date();
  day.setHours(23, 59, 59, 999);
  return day.getTime();
}

function isBlank(value: string | null): value is null | "" {
  return value === null || value === "";
}

function requiredText(message: string) {
  return z.string().trim().min(1, message);
}

function optionalEmail(message: string) {
  return z
    .string()
    .trim()
    .refine((value) => value === "" || z.email().safeParse(value).success, {
      error: message,
    });
}

function optionalPhone(message: string) {
  return z
    .string()
    .trim()
    .refine((value) => value === "" || isPhone(value), { error: message });
}

function requiredPhone(missing: string, invalid: string) {
  return optionalPhone(invalid).refine((value) => value !== "", {
    error: missing,
  });
}

function optionalPastDate(unreadable: string, future: string) {
  return z
    .string()
    .trim()
    .nullable()
    .refine(
      (value) => isBlank(value) || !Number.isNaN(new Date(value).getTime()),
      { error: unreadable },
    )
    .refine(
      (value) => {
        if (isBlank(value)) return true;
        const time = new Date(value).getTime();
        return Number.isNaN(time) || time <= endOfToday();
      },
      { error: future },
    );
}

function requiredPastDate(missing: string, unreadable: string, future: string) {
  return optionalPastDate(unreadable, future).refine(
    (value) => !isBlank(value),
    { error: missing },
  );
}

type ConditionalField =
  | "proposedCourse"
  | "fatherName"
  | "fatherContact"
  | "telephone"
  | "email"
  | "signature"
  | "signatureDate";

export const qualificationSchema = z.object({
  id: z.string(),
  place: requiredText("Enter where you studied, or remove this qualification"),
  dates: z.string().trim(),
  awards: z.string().trim(),
  dateObtained: z.string().nullable(),
});

export type Qualification = z.infer<typeof qualificationSchema>;

export const employmentSchema = z.object({
  id: z.string(),
  dates: z.string().trim(),
  employer: z.string().trim(),
  position: z.string().trim(),
  duties: z.string().trim(),
});

export type Employment = z.infer<typeof employmentSchema>;

export const admissionsSchema = z
  .object({
    program: requiredText("Choose the programme you are applying for"),
    proposedCourse: z.string().trim(),
    surname: requiredText("Enter your surname"),
    firstName: requiredText("Enter your first name"),
    dob: requiredPastDate(
      "Choose your date of birth",
      "That date of birth could not be read — pick it from the calendar",
      "Your date of birth cannot be in the future",
    ),
    nationality: requiredText("Enter your nationality"),
    telephone: optionalPhone("Enter a valid telephone number"),
    email: optionalEmail("Enter a valid email address"),
    photo: z.instanceof(File).nullable(),
    specialNeeds: z.boolean(),
    fatherName: z.string().trim(),
    fatherContact: optionalPhone(
      "Enter a valid contact number, or leave blank",
    ),
    fatherEmail: optionalEmail("Enter a valid email address, or leave blank"),
    fatherJob: z.string().trim(),
    motherName: z.string().trim(),
    motherContact: optionalPhone(
      "Enter a valid contact number, or leave blank",
    ),
    motherEmail: optionalEmail("Enter a valid email address, or leave blank"),
    motherJob: z.string().trim(),
    secondaryContact: optionalPhone(
      "Enter a valid contact number, or leave blank",
    ),
    relationship: z.string().trim(),
    qualifications: z.array(qualificationSchema),
    pendingQualifications: z.string().trim(),
    employment: z.array(employmentSchema),
    personalStatement: z.string().trim(),
    howDidYouHear: z.array(z.string()),
    signature: z.string().trim(),
    signatureDate: optionalPastDate(
      "That date could not be read — pick it from the calendar",
      "The date you signed cannot be in the future",
    ),
  })
  .superRefine((data, ctx) => {
    const missing = (path: ConditionalField, message: string) => {
      ctx.addIssue({ code: "custom", path: [path], message });
    };

    if (isProposedCourseRequired(data.program) && data.proposedCourse === "") {
      missing("proposedCourse", "Select your proposed course");
    }

    if (isGuardianLedProgram(data.program)) {
      if (data.fatherName === "" && data.motherName === "") {
        missing("fatherName", "Enter at least one parent or guardian name");
      }
      if (data.fatherContact === "" && data.motherContact === "") {
        missing(
          "fatherContact",
          "Enter a contact number for at least one parent or guardian",
        );
      }
    } else {
      if (data.telephone === "") {
        missing("telephone", "Enter a telephone number we can reach you on");
      }
      if (data.email === "") {
        missing("email", "Enter your email address");
      }
      if (data.signature === "") {
        missing("signature", "Type your full name to sign the declaration");
      }
    }

    if (data.signature !== "" && isBlank(data.signatureDate)) {
      missing("signatureDate", "Choose the date you signed");
    }
  });

export type AdmissionsFormData = z.infer<typeof admissionsSchema>;

export const contactSchema = z.object({
  name: z
    .string({ error: "Please enter your name" })
    .min(1, "Please enter your name"),
  email: z
    .string({ error: "Please enter your email address" })
    .min(1, "Please enter your email address")
    .pipe(z.email({ error: "Please enter a valid email address" })),
  phone: requiredPhone(
    "Please enter your phone number",
    "Please enter a valid phone number",
  ),
  topic: z
    .string({ error: "Please choose a subject" })
    .min(1, "Please choose a subject"),
  message: z
    .string({ error: "Please enter your message" })
    .min(1, "Please enter your message")
    .max(2000, "Message must be 2000 characters or fewer"),
});

export type ContactFormData = z.infer<typeof contactSchema>;
