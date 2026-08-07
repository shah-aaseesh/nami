import { z } from "zod";

export const qualificationSchema = z.object({
  id: z.string().catch(""),
  place: z.string().catch(""),
  dates: z.string().catch(""),
  awards: z.string().catch(""),
  dateObtained: z.string().nullable().catch(null),
});

export type Qualification = z.infer<typeof qualificationSchema>;

export const employmentSchema = z.object({
  id: z.string().catch(""),
  dates: z.string().catch(""),
  employer: z.string().catch(""),
  position: z.string().catch(""),
  duties: z.string().catch(""),
});

export type Employment = z.infer<typeof employmentSchema>;

export const admissionsSchema = z.object({
  program: z.string().catch(""),
  proposedCourse: z.string().catch(""),
  title: z.string().catch(""),
  surname: z.string().catch(""),
  firstName: z.string().catch(""),
  dob: z.string().nullable().catch(null),
  nationality: z.string().catch(""),
  telephone: z.string().catch(""),
  email: z.string().catch(""),
  photo: z.instanceof(File).nullable().catch(null),
  specialNeeds: z.boolean().catch(false),
  fatherName: z.string().catch(""),
  fatherContact: z.string().catch(""),
  fatherEmail: z.string().catch(""),
  fatherJob: z.string().catch(""),
  motherName: z.string().catch(""),
  motherContact: z.string().catch(""),
  motherEmail: z.string().catch(""),
  motherJob: z.string().catch(""),
  secondaryContact: z.string().catch(""),
  relationship: z.string().catch(""),
  qualifications: z.array(qualificationSchema).catch([]),
  pendingQualifications: z.string().catch(""),
  employment: z.array(employmentSchema).catch([]),
  personalStatement: z.string().catch(""),
  howDidYouHear: z.array(z.string()).catch([]),
  criminalRecord: z.instanceof(File).nullable().catch(null),
  signature: z.string().catch(""),
  signatureDate: z.string().nullable().catch(null),
});

export type AdmissionsFormData = z.infer<typeof admissionsSchema>;

export const contactSchema = z.object({
  name: z
    .string({ error: "Please enter your name" })
    .min(1, "Please enter your name"),
  email: z
    .string({ error: "Please enter your email address" })
    .min(1, "Please enter your email address")
    .email("Please enter a valid email address"),
  phone: z.string().catch(""),
  topic: z
    .string({ error: "Please choose a subject" })
    .min(1, "Please choose a subject"),
  message: z
    .string({ error: "Please enter your message" })
    .min(1, "Please enter your message")
    .max(2000, "Message must be 2000 characters or fewer"),
});

export type ContactFormData = z.infer<typeof contactSchema>;
