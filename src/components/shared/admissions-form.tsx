"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import gsap from "gsap";
import { useRef, useState } from "react";
import {
  type Control,
  Controller,
  type UseFormRegister,
  useFieldArray,
  useForm,
  useWatch,
} from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { H2, H3, P } from "@/components/ui/typography";
import {
  findInquiryCourse,
  INQUIRY_COURSES,
  type InquiryCourse,
} from "@/lib/content/institutions";
import {
  ArrowRightIcon,
  CalendarIcon,
  CheckIcon,
  DownloadIcon,
  PlusIcon,
  TrashIcon,
} from "@/lib/icons";
import { type AdmissionsFormData, admissionsSchema } from "@/lib/schema";
import { cn } from "@/lib/utils";

type Step = {
  readonly key:
    | "course"
    | "student"
    | "parents"
    | "history"
    | "employment"
    | "additional";
  readonly label: string;
};

function stepsForCourse(course: InquiryCourse | undefined): readonly Step[] {
  const steps: Step[] = [
    { key: "course", label: "Course Details" },
    { key: "student", label: "Student Details" },
    { key: "parents", label: "Parent Details" },
    { key: "history", label: course?.historyStepLabel ?? "Qualifications" },
  ];
  if (!course || course.asksEmploymentHistory) {
    steps.push({ key: "employment", label: "Employment History" });
  }
  steps.push({ key: "additional", label: "Additional Info & Signatures" });
  return steps;
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function emptyEmployment() {
  return {
    id: crypto.randomUUID(),
    dates: "",
    employer: "",
    position: "",
    duties: "",
  };
}

function QualificationRow({
  control,
  register,
  index,
  showRemove,
  onRemove,
}: {
  control: Control<AdmissionsFormData>;
  register: UseFormRegister<AdmissionsFormData>;
  index: number;
  showRemove: boolean;
  onRemove: () => void;
}) {
  return (
    <div className="p-5 rounded-xl border border-border bg-surface-muted/50 relative">
      {showRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="absolute top-4 right-4 text-ink-muted hover:text-red-500 transition-colors"
        >
          <Icon icon={TrashIcon} className="size-4" />
        </button>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor={`qualifications-${index}-place`}>
            Place of Study
          </Label>
          <Input
            id={`qualifications-${index}-place`}
            {...register(`qualifications.${index}.place`)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor={`qualifications-${index}-dates`}>
            Dates Attended
          </Label>
          <Input
            id={`qualifications-${index}-dates`}
            placeholder="e.g. 2018 - 2022"
            {...register(`qualifications.${index}.dates`)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor={`qualifications-${index}-awards`}>
            Awards / Grades
          </Label>
          <Input
            id={`qualifications-${index}-awards`}
            placeholder="e.g. GPA 3.8 / A+"
            {...register(`qualifications.${index}.awards`)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label id={`qualifications-${index}-date-obtained-label`}>
            Date Obtained
          </Label>
          <Controller
            control={control}
            name={`qualifications.${index}.dateObtained`}
            render={({ field }) => (
              <Popover>
                <PopoverTrigger
                  render={
                    <Button
                      type="button"
                      aria-labelledby={`qualifications-${index}-date-obtained-label`}
                      className={cn(
                        "w-full h-12 bg-transparent border border-border hover:bg-surface-muted justify-start text-left font-normal text-base text-ink px-4 py-2 shadow-none",
                        !field.value && "text-ink-muted",
                      )}
                    >
                      <Icon icon={CalendarIcon} className="mr-2 h-4 w-4" />
                      {field.value ? (
                        format(new Date(field.value), "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  }
                />
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value ? new Date(field.value) : undefined}
                    onSelect={(date) =>
                      field.onChange(date ? date.toISOString() : null)
                    }
                  />
                </PopoverContent>
              </Popover>
            )}
          />
        </div>
      </div>
    </div>
  );
}

function EmploymentRow({
  register,
  index,
  showRemove,
  onRemove,
}: {
  register: UseFormRegister<AdmissionsFormData>;
  index: number;
  showRemove: boolean;
  onRemove: () => void;
}) {
  return (
    <div className="p-5 rounded-xl border border-border bg-surface-muted/50 relative">
      {showRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="absolute top-4 right-4 text-ink-muted hover:text-red-500 transition-colors"
        >
          <Icon icon={TrashIcon} className="size-4" />
        </button>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor={`employment-${index}-employer`}>
            Employer Name & Address
          </Label>
          <Input
            id={`employment-${index}-employer`}
            {...register(`employment.${index}.employer`)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor={`employment-${index}-dates`}>Dates (From - To)</Label>
          <Input
            id={`employment-${index}-dates`}
            placeholder="e.g. Jan 2021 - Present"
            {...register(`employment.${index}.dates`)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor={`employment-${index}-position`}>Position Held</Label>
          <Input
            id={`employment-${index}-position`}
            {...register(`employment.${index}.position`)}
          />
        </div>
        <div className="flex flex-col gap-2 md:col-span-2">
          <Label htmlFor={`employment-${index}-duties`}>
            Brief Description of Duties
          </Label>
          <Textarea
            id={`employment-${index}-duties`}
            {...register(`employment.${index}.duties`)}
          />
        </div>
      </div>
    </div>
  );
}

export function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPreparingPdf, setIsPreparingPdf] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { control, register, setValue, getValues } =
    useForm<AdmissionsFormData>({
      resolver: zodResolver(admissionsSchema),
      defaultValues: {
        program: "",
        proposedCourse: "",
        title: "",
        surname: "",
        firstName: "",
        dob: null,
        nationality: "",
        telephone: "",
        email: "",
        photo: null,
        specialNeeds: false,
        fatherName: "",
        fatherContact: "",
        fatherEmail: "",
        fatherJob: "",
        motherName: "",
        motherContact: "",
        motherEmail: "",
        motherJob: "",
        secondaryContact: "",
        relationship: "",
        qualifications: [
          {
            id: "1",
            place: "",
            dates: "",
            awards: "",
            dateObtained: null,
          },
        ],
        pendingQualifications: "",
        employment: [
          { id: "1", dates: "", employer: "", position: "", duties: "" },
        ],
        personalStatement: "",
        howDidYouHear: [],
        criminalRecord: null,
        signature: "",
        signatureDate: null,
      },
    });

  const {
    fields: qualificationFields,
    append: appendQualification,
    remove: removeQualification,
  } = useFieldArray({
    control,
    name: "qualifications",
  });

  const {
    fields: employmentFields,
    append: appendEmployment,
    remove: removeEmployment,
    replace: replaceEmployment,
  } = useFieldArray({
    control,
    name: "employment",
  });

  const howDidYouHear = useWatch({ control, name: "howDidYouHear" }) ?? [];
  const selectedProgram = useWatch({ control, name: "program" }) ?? "";
  const course = findInquiryCourse(selectedProgram);
  const steps = stepsForCourse(course);
  const stepIndex = Math.min(currentStep, steps.length - 1);
  const activeStep = steps[stepIndex];

  const addQualification = () => {
    appendQualification({
      id: crypto.randomUUID(),
      place: "",
      dates: "",
      awards: "",
      dateObtained: null,
    });
  };

  const addEmployment = () => {
    appendEmployment(emptyEmployment());
  };

  const selectCourse = (
    value: string | null,
    commit: (value: string) => void,
  ) => {
    commit(value ?? "");
    const next = value ? findInquiryCourse(value) : undefined;
    if (!next?.asksPendingQualifications) setValue("pendingQualifications", "");
    if (!next?.asksEmploymentHistory) replaceEmployment([emptyEmployment()]);
  };

  const downloadPdf = async () => {
    setPdfError(null);
    setIsPreparingPdf(true);
    try {
      const { downloadInquiryPdf } = await import("@/lib/inquiry-pdf");
      await downloadInquiryPdf(getValues());
    } catch (error) {
      setPdfError(
        error instanceof Error
          ? error.message
          : "The PDF could not be created. Please try again.",
      );
    } finally {
      setIsPreparingPdf(false);
    }
  };

  const goToStep = (step: number) => {
    if (step < 0 || step >= steps.length || step === stepIndex) return;

    gsap.to(formRef.current, {
      opacity: 0,
      y: 10,
      duration: 0.2,
      onComplete: () => {
        setCurrentStep(step);
        gsap.fromTo(
          formRef.current,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" },
        );
      },
    });
  };

  const renderStepContent = () => {
    switch (activeStep?.key) {
      case "course":
        return (
          <div className="space-y-6">
            <H3 className="text-xl font-display text-ink mb-6">
              Course Details
            </H3>
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <Label id="program-label">Program</Label>
                <Controller
                  control={control}
                  name="program"
                  render={({ field }) => (
                    <Select
                      onValueChange={(value) =>
                        selectCourse(value, field.onChange)
                      }
                      value={field.value}
                    >
                      <SelectTrigger
                        className="w-full"
                        aria-labelledby="program-label"
                      >
                        <SelectValue placeholder="Select a program" />
                      </SelectTrigger>
                      <SelectContent>
                        {INQUIRY_COURSES.map((option) => (
                          <SelectItem key={option.id} value={option.id}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="proposedCourse">Proposed Course/s</Label>
                <Input
                  id="proposedCourse"
                  placeholder="e.g. Science, Management, BSc Computing..."
                  {...register("proposedCourse")}
                />
              </div>
            </div>
          </div>
        );
      case "student":
        return (
          <div className="space-y-6">
            <H3 className="text-xl font-display text-ink mb-6">
              Student Details
            </H3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" {...register("firstName")} />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="surname">Surname</Label>
                <Input id="surname" {...register("surname")} />
              </div>
              <div className="flex flex-col gap-2">
                <Label id="dob-label">Date of Birth</Label>
                <Controller
                  control={control}
                  name="dob"
                  render={({ field }) => (
                    <Popover>
                      <PopoverTrigger
                        render={
                          <Button
                            type="button"
                            aria-labelledby="dob-label"
                            className={cn(
                              "w-full h-12 bg-transparent border border-border hover:bg-surface-muted justify-start text-left font-normal text-base text-ink px-4 py-2 shadow-none",
                              !field.value && "text-ink-muted",
                            )}
                          >
                            <Icon
                              icon={CalendarIcon}
                              className="mr-2 h-4 w-4"
                            />
                            {field.value ? (
                              format(new Date(field.value), "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        }
                      />
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={
                            field.value ? new Date(field.value) : undefined
                          }
                          onSelect={(date) =>
                            field.onChange(date ? date.toISOString() : null)
                          }
                        />
                      </PopoverContent>
                    </Popover>
                  )}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="nationality">Nationality</Label>
                <Input id="nationality" {...register("nationality")} />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="telephone">Telephone Number</Label>
                <Input id="telephone" type="tel" {...register("telephone")} />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" {...register("email")} />
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <Label htmlFor="photo">Photo Upload</Label>
                <P className="text-xs text-ink-muted">
                  Files stay on this device. They are not sent anywhere and are
                  not included in the PDF you download.
                </P>
                <Input
                  id="photo"
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setValue("photo", e.target.files?.[0] || null)
                  }
                />
              </div>
              <div className="flex items-start space-x-3 md:col-span-2 mt-2">
                <Controller
                  control={control}
                  name="specialNeeds"
                  render={({ field }) => (
                    <Checkbox
                      id="specialNeeds"
                      checked={field.value}
                      onCheckedChange={(checked) =>
                        field.onChange(checked === true)
                      }
                    />
                  )}
                />
                <Label
                  htmlFor="specialNeeds"
                  className="leading-snug cursor-pointer font-normal"
                >
                  Do you have any special needs or medical conditions we should
                  be aware of?
                </Label>
              </div>
            </div>
          </div>
        );
      case "parents":
        return (
          <div className="space-y-8">
            <H3 className="text-xl font-display text-ink mb-6">
              Parent / Guardian Details
            </H3>

            <div className="space-y-4">
              <h4 className="font-semibold text-ink-muted text-sm uppercase tracking-wider">
                Father's Details
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="fatherName">Name</Label>
                  <Input id="fatherName" {...register("fatherName")} />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="fatherContact">Contact Number</Label>
                  <Input
                    id="fatherContact"
                    type="tel"
                    {...register("fatherContact")}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="fatherEmail">Email</Label>
                  <Input
                    id="fatherEmail"
                    type="email"
                    {...register("fatherEmail")}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="fatherJob">Job Designation</Label>
                  <Input id="fatherJob" {...register("fatherJob")} />
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-border/50">
              <h4 className="font-semibold text-ink-muted text-sm uppercase tracking-wider">
                Mother's Details
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="motherName">Name</Label>
                  <Input id="motherName" {...register("motherName")} />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="motherContact">Contact Number</Label>
                  <Input
                    id="motherContact"
                    type="tel"
                    {...register("motherContact")}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="motherEmail">Email</Label>
                  <Input
                    id="motherEmail"
                    type="email"
                    {...register("motherEmail")}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="motherJob">Job Designation</Label>
                  <Input id="motherJob" {...register("motherJob")} />
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-6 border-t border-border/50">
              <h4 className="font-semibold text-ink-muted text-sm uppercase tracking-wider">
                Emergency / Secondary Contact
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="secondaryContact">
                    Secondary Contact Number
                  </Label>
                  <Input
                    id="secondaryContact"
                    type="tel"
                    {...register("secondaryContact")}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="relationship">Relationship to Student</Label>
                  <Input id="relationship" {...register("relationship")} />
                </div>
              </div>
            </div>
          </div>
        );
      case "history":
        return (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <H3 className="text-xl font-display text-ink">
                {course?.historyHeading ?? "Qualifications Achieved"}
              </H3>
              <Button
                type="button"
                size="sm"
                onClick={addQualification}
                className="gap-2 shrink-0 bg-transparent border border-border text-ink hover:bg-surface-muted shadow-none"
              >
                <Icon icon={PlusIcon} className="size-4" /> Add
              </Button>
            </div>

            <div className="space-y-6">
              {qualificationFields.map((field, index) => (
                <QualificationRow
                  key={field.id}
                  control={control}
                  register={register}
                  index={index}
                  showRemove={qualificationFields.length > 1}
                  onRemove={() => removeQualification(index)}
                />
              ))}
            </div>

            {(!course || course.asksPendingQualifications) && (
              <div className="space-y-4 pt-6 border-t border-border/50">
                <H3 className="text-lg font-display text-ink">
                  Qualifications Pending
                </H3>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="pendingQualifications">
                    Are you currently awaiting any results?
                  </Label>
                  <Textarea
                    id="pendingQualifications"
                    placeholder="Please list any exams taken for which results are pending..."
                    className="min-h-[100px]"
                    {...register("pendingQualifications")}
                  />
                </div>
              </div>
            )}
          </div>
        );
      case "employment":
        return (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <H3 className="text-xl font-display text-ink">
                Employment History
              </H3>
              <Button
                type="button"
                size="sm"
                onClick={addEmployment}
                className="gap-2 shrink-0 bg-transparent border border-border text-ink hover:bg-surface-muted shadow-none"
              >
                <Icon icon={PlusIcon} className="size-4" /> Add
              </Button>
            </div>

            <div className="space-y-6">
              {employmentFields.map((field, index) => (
                <EmploymentRow
                  key={field.id}
                  register={register}
                  index={index}
                  showRemove={employmentFields.length > 1}
                  onRemove={() => removeEmployment(index)}
                />
              ))}
            </div>
          </div>
        );
      case "additional":
        return (
          <div className="space-y-8">
            <H3 className="text-xl font-display text-ink mb-6">
              Additional Info & Signatures
            </H3>

            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="personalStatement">Personal Statement</Label>
                <P className="text-xs text-ink-muted">
                  Please provide a brief statement supporting your application.
                </P>
                <Textarea
                  id="personalStatement"
                  className="min-h-[120px]"
                  {...register("personalStatement")}
                />
              </div>

              <fieldset className="flex flex-col gap-3 pt-6">
                <legend className="text-sm font-medium leading-none text-ink">
                  How did you hear of NAMI?
                </legend>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    "Social Media",
                    "Friends / Family",
                    "School / College",
                    "Advertisement",
                    "Website",
                    "Other",
                  ].map((option) => {
                    const optionId = `hear-${slugify(option)}`;
                    return (
                      <div key={option} className="flex items-center space-x-2">
                        <Checkbox
                          id={optionId}
                          checked={howDidYouHear.includes(option)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setValue("howDidYouHear", [
                                ...howDidYouHear,
                                option,
                              ]);
                            } else {
                              setValue(
                                "howDidYouHear",
                                howDidYouHear.filter((o) => o !== option),
                              );
                            }
                          }}
                        />
                        <Label
                          htmlFor={optionId}
                          className="font-normal cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {option}
                        </Label>
                      </div>
                    );
                  })}
                </div>
              </fieldset>

              <div className="flex flex-col gap-2 pt-6">
                <Label htmlFor="criminalRecord">Criminal Convictions</Label>
                <P className="text-xs text-ink-muted">
                  Please upload your Police Record Certification if applicable.
                  Files stay on this device. They are not sent anywhere and are
                  not included in the PDF you download.
                </P>
                <Input
                  id="criminalRecord"
                  type="file"
                  onChange={(e) =>
                    setValue("criminalRecord", e.target.files?.[0] || null)
                  }
                />
              </div>

              <div className="space-y-4 pt-8 border-t border-border/50">
                <H3 className="text-lg font-display text-ink">Declaration</H3>
                <P className="text-sm text-ink-muted">
                  By signing below, I confirm that the information provided in
                  this application is accurate and complete to the best of my
                  knowledge.
                </P>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="signature">
                      Student Signature (Type Name)
                    </Label>
                    <Input id="signature" {...register("signature")} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label id="signatureDate-label">Date</Label>
                    <Controller
                      control={control}
                      name="signatureDate"
                      render={({ field }) => (
                        <Popover>
                          <PopoverTrigger
                            render={
                              <Button
                                type="button"
                                aria-labelledby="signatureDate-label"
                                className={cn(
                                  "w-full h-12 bg-transparent border border-border hover:bg-surface-muted justify-start text-left font-normal text-base text-ink px-4 py-2 shadow-none",
                                  !field.value && "text-ink-muted",
                                )}
                              >
                                <Icon
                                  icon={CalendarIcon}
                                  className="mr-2 h-4 w-4"
                                />
                                {field.value ? (
                                  format(new Date(field.value), "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                              </Button>
                            }
                          />
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={
                                field.value ? new Date(field.value) : undefined
                              }
                              onSelect={(date) =>
                                field.onChange(date ? date.toISOString() : null)
                              }
                            />
                          </PopoverContent>
                        </Popover>
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mx-auto w-full max-w-5xl" ref={containerRef}>
      <div className="bg-surface border border-border rounded-2xl shadow-sm flex flex-col md:flex-row min-h-[600px]">
        <div className="bg-surface-muted w-full md:w-64 lg:w-80 p-6 md:p-8 shrink-0 border-b md:border-b-0 md:border-r border-border rounded-t-2xl md:rounded-tr-none md:rounded-l-2xl">
          <H2 className="font-display text-xl font-semibold text-ink mb-8">
            Inquiry Form
          </H2>
          <ul className="space-y-6">
            {steps.map((step, index) => {
              const isActive = index === stepIndex;
              const isPast = index < stepIndex;

              return (
                <li
                  key={step.key}
                  className="flex items-center gap-4 relative group"
                >
                  {index !== steps.length - 1 && (
                    <div
                      className={cn(
                        "absolute left-[13px] top-8 w-[2px] h-8 -z-10 transition-colors duration-500",
                        isPast ? "bg-accent" : "bg-border",
                      )}
                    />
                  )}

                  <button
                    type="button"
                    onClick={() => isPast && goToStep(index)}
                    disabled={!isPast && !isActive}
                    className={cn(
                      "flex items-center justify-center size-7 rounded-full text-xs font-semibold shrink-0 transition-all duration-300 outline-none",
                      isActive
                        ? "bg-accent text-white ring-4 ring-accent/20 scale-110"
                        : isPast
                          ? "bg-accent text-white cursor-pointer hover:scale-110"
                          : "bg-surface text-ink-muted border border-border",
                    )}
                  >
                    {isPast ? (
                      <Icon icon={CheckIcon} className="size-3" />
                    ) : (
                      index + 1
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => isPast && goToStep(index)}
                    disabled={!isPast && !isActive}
                    className={cn(
                      "text-sm font-medium text-left transition-colors duration-300 outline-none",
                      isActive
                        ? "text-ink"
                        : isPast
                          ? "text-ink cursor-pointer group-hover:text-accent"
                          : "text-ink-muted",
                    )}
                  >
                    {step.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex-1 p-6 md:p-10 lg:p-12 flex flex-col justify-between">
          <div ref={formRef} className="flex-1">
            {renderStepContent()}
          </div>

          <div className="mt-12 pt-6 border-t border-border flex flex-col gap-4">
            {activeStep?.key === "additional" && (
              <P className="text-xs text-ink-muted">
                Your PDF is created on this device. Nothing you have entered
                leaves your browser, and the files you uploaded are not included
                in it.
              </P>
            )}

            {pdfError && (
              <P role="alert" className="text-xs text-accent">
                {pdfError}
              </P>
            )}

            <div className="flex flex-wrap items-center justify-between gap-4">
              <Button
                type="button"
                variant="default"
                onClick={() => goToStep(stepIndex - 1)}
                disabled={stepIndex === 0}
                className="px-6 h-12 border border-border"
              >
                Previous
              </Button>

              {stepIndex < steps.length - 1 ? (
                <Button
                  type="button"
                  onClick={() => goToStep(stepIndex + 1)}
                  className="gap-2 px-6 h-12"
                >
                  Next Step <Icon icon={ArrowRightIcon} className="size-4" />
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="default"
                  onClick={downloadPdf}
                  disabled={isPreparingPdf}
                  className="gap-2 px-6 h-12 border border-border"
                >
                  {isPreparingPdf ? "Preparing PDF" : "Download PDF"}
                  <Icon icon={DownloadIcon} className="size-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AdmissionsFormSection() {
  return (
    <section className="bg-surface-muted section-y gutter-x" id="apply">
      <div className="text-center mb-12 max-w-3xl mx-auto">
        <H2 className="font-display mb-4 text-3xl sm:text-4xl lg:text-5xl">
          Start Your Application
        </H2>
        <P className="text-ink-muted text-lg">
          Tell us about yourself in the inquiry form below, then download your
          answers as a PDF. Everything stays on your device.
        </P>
      </div>

      <MultiStepForm />
    </section>
  );
}
