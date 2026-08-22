"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import {
  type Control,
  type FieldPath,
  useFieldArray,
  useForm,
  useWatch,
} from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  CheckboxField,
  CheckboxGroupField,
  DateField,
  FileField,
  SelectField,
  TextareaField,
  TextField,
} from "@/components/ui/form";
import { Icon } from "@/components/ui/icon";
import { H2, H3, P } from "@/components/ui/typography";
import {
  findInquiryCourse,
  INQUIRY_COURSES,
  type InquiryCourse,
} from "@/lib/content/institutions";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  DownloadIcon,
  PlusIcon,
  TrashIcon,
} from "@/lib/icons";
import {
  type AdmissionsFormData,
  admissionsSchema,
  isGuardianLedProgram,
} from "@/lib/schema";
import { cn } from "@/lib/utils";

type StepKey =
  | "course"
  | "student"
  | "parents"
  | "history"
  | "employment"
  | "additional";

type Step = {
  readonly key: StepKey;
  readonly label: string;
};

const PROGRAM_OPTIONS = INQUIRY_COURSES.map((course) => ({
  value: course.id,
  label: course.label,
}));

const HEAR_OPTIONS = [
  "Social Media",
  "Friends / Family",
  "School / College",
  "Advertisement",
  "Website",
  "Other",
] as const;

const STEP_FIELDS: Record<StepKey, readonly FieldPath<AdmissionsFormData>[]> = {
  course: ["program", "proposedCourse"],
  student: [
    "firstName",
    "surname",
    "dob",
    "nationality",
    "telephone",
    "email",
    "photo",
    "specialNeeds",
  ],
  parents: [
    "fatherName",
    "fatherContact",
    "fatherEmail",
    "fatherJob",
    "motherName",
    "motherContact",
    "motherEmail",
    "motherJob",
    "secondaryContact",
    "relationship",
  ],
  history: ["qualifications", "pendingQualifications"],
  employment: ["employment"],
  additional: [
    "personalStatement",
    "howDidYouHear",
    "signature",
    "signatureDate",
  ],
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
  index,
  onRemove,
}: {
  control: Control<AdmissionsFormData>;
  index: number;
  onRemove: () => void;
}) {
  return (
    <div className="p-5 rounded-xl border border-border bg-muted/50 relative">
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove qualification ${index + 1}`}
        className="absolute top-4 right-4 text-ink-muted hover:text-accent transition-colors"
      >
        <Icon icon={TrashIcon} className="size-4" />
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        <TextField
          control={control}
          name={`qualifications.${index}.place`}
          label="Place of Study"
          required
        />
        <TextField
          control={control}
          name={`qualifications.${index}.dates`}
          label="Dates Attended"
          placeholder="e.g. 2018 - 2022"
        />
        <TextField
          control={control}
          name={`qualifications.${index}.awards`}
          label="Awards / Grades"
          placeholder="e.g. GPA 3.8 / A+"
        />
        <DateField
          control={control}
          name={`qualifications.${index}.dateObtained`}
          label="Date Obtained"
        />
      </div>
    </div>
  );
}

function EmploymentRow({
  control,
  index,
  showRemove,
  onRemove,
}: {
  control: Control<AdmissionsFormData>;
  index: number;
  showRemove: boolean;
  onRemove: () => void;
}) {
  return (
    <div className="p-5 rounded-xl border border-border bg-muted/50 relative">
      {showRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove employment entry ${index + 1}`}
          className="absolute top-4 right-4 text-ink-muted hover:text-accent transition-colors"
        >
          <Icon icon={TrashIcon} className="size-4" />
        </button>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        <TextField
          control={control}
          name={`employment.${index}.employer`}
          label="Employer Name & Address"
        />
        <TextField
          control={control}
          name={`employment.${index}.dates`}
          label="Dates (From - To)"
          placeholder="e.g. Jan 2021 - Present"
        />
        <TextField
          control={control}
          name={`employment.${index}.position`}
          label="Position Held"
        />
        <div className="md:col-span-2">
          <TextareaField
            control={control}
            name={`employment.${index}.duties`}
            label="Brief Description of Duties"
          />
        </div>
      </div>
    </div>
  );
}

export function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPreparingPdf, setIsPreparingPdf] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [pdfError, setPdfError] = useState<string | null>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const confirmationRef = useRef<HTMLHeadingElement>(null);

  const [focusStepKey, setFocusStepKey] = useState<StepKey | null>(null);

  const { control, setValue, getValues, trigger, getFieldState, formState } =
    useForm<AdmissionsFormData>({
      resolver: zodResolver(admissionsSchema),
      mode: "onTouched",
      defaultValues: {
        program: "",
        proposedCourse: "",
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

  const selectedProgram = useWatch({ control, name: "program" }) ?? "";
  const guardianLed = isGuardianLedProgram(selectedProgram);
  const course = findInquiryCourse(selectedProgram);
  const steps = stepsForCourse(course);
  const stepIndex = Math.min(currentStep, steps.length - 1);
  const activeStep = steps[stepIndex];
  const activeStepKey = activeStep?.key;

  const stepHasError = (key: StepKey) =>
    STEP_FIELDS[key].some(
      (name) => getFieldState(name, formState).error !== undefined,
    );

  useEffect(() => {
    if (!isSubmitted) return;
    confirmationRef.current?.focus();
  }, [isSubmitted]);

  useEffect(() => {
    if (focusStepKey === null || activeStepKey !== focusStepKey) return;
    setFocusStepKey(null);
    void trigger(STEP_FIELDS[focusStepKey], { shouldFocus: true });
  }, [focusStepKey, activeStepKey, trigger]);

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

  const selectCourse = (value: string) => {
    const next = value ? findInquiryCourse(value) : undefined;
    if (!next?.asksPendingQualifications) setValue("pendingQualifications", "");
    if (!next?.asksEmploymentHistory) replaceEmployment([emptyEmployment()]);
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

  const goToNextStep = async () => {
    if (!activeStep) return;
    const passed = await trigger(STEP_FIELDS[activeStep.key], {
      shouldFocus: true,
    });
    if (!passed) return;
    goToStep(stepIndex + 1);
  };

  const submitForm = async () => {
    setSubmitError(null);

    const passed = await trigger(undefined, { shouldFocus: true });
    if (!passed) {
      const firstBrokenStep = steps.findIndex((step) =>
        STEP_FIELDS[step.key].some(
          (name) => getFieldState(name).error !== undefined,
        ),
      );
      setSubmitError(
        "Some answers still need attention. Check the highlighted steps, then submit again.",
      );
      const target = steps[firstBrokenStep];
      if (target && firstBrokenStep !== stepIndex) {
        setFocusStepKey(target.key);
        goToStep(firstBrokenStep);
      }
      return;
    }

    setPdfError(null);
    setIsSubmitted(true);
  };

  const resumeEditing = () => {
    setPdfError(null);
    setIsSubmitted(false);
  };

  const downloadPdf = async () => {
    setPdfError(null);
    setIsPreparingPdf(true);
    try {
      const { downloadInquiryPdf } = await import("@/lib/inquiry-pdf");
      await downloadInquiryPdf(admissionsSchema.parse(getValues()));
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

  const renderStepContent = () => {
    switch (activeStep?.key) {
      case "course":
        return (
          <div className="space-y-6">
            <H3 className="text-xl font-display text-ink mb-6">
              Course Details
            </H3>
            <div className="space-y-4">
              <SelectField
                control={control}
                name="program"
                label="Program"
                options={PROGRAM_OPTIONS}
                placeholder="Select a program"
                required
                onValueChange={selectCourse}
              />
              <TextField
                control={control}
                name="proposedCourse"
                label="Proposed Course/s"
                placeholder="e.g. Science, Management, BSc Computing..."
              />
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
              <TextField
                control={control}
                name="firstName"
                label="First Name"
                autoComplete="given-name"
                required
              />
              <TextField
                control={control}
                name="surname"
                label="Surname"
                autoComplete="family-name"
                required
              />
              <DateField
                control={control}
                name="dob"
                label="Date of Birth"
                required
              />
              <TextField
                control={control}
                name="nationality"
                label="Nationality"
                autoComplete="country-name"
                required
              />
              <TextField
                control={control}
                name="telephone"
                label="Telephone Number"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                required={!guardianLed}
              />
              <TextField
                control={control}
                name="email"
                label="Email Address"
                type="email"
                inputMode="email"
                autoComplete="email"
                required={!guardianLed}
              />
              <div className="md:col-span-2">
                <FileField
                  control={control}
                  name="photo"
                  label="Photo Upload"
                  accept="image/*"
                  description="Files stay on this device. They are not sent anywhere and are not included in the PDF you download."
                />
              </div>
              <CheckboxField
                control={control}
                name="specialNeeds"
                label="Do you have any special needs or medical conditions we should be aware of?"
                className="md:col-span-2 mt-2"
              />
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
                <TextField
                  control={control}
                  name="fatherName"
                  label="Father's Name"
                />
                <TextField
                  control={control}
                  name="fatherContact"
                  label="Father's Contact Number"
                  type="tel"
                  inputMode="tel"
                />
                <TextField
                  control={control}
                  name="fatherEmail"
                  label="Father's Email"
                  type="email"
                  inputMode="email"
                />
                <TextField
                  control={control}
                  name="fatherJob"
                  label="Father's Job Designation"
                />
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-border/50">
              <h4 className="font-semibold text-ink-muted text-sm uppercase tracking-wider">
                Mother's Details
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TextField
                  control={control}
                  name="motherName"
                  label="Mother's Name"
                />
                <TextField
                  control={control}
                  name="motherContact"
                  label="Mother's Contact Number"
                  type="tel"
                  inputMode="tel"
                />
                <TextField
                  control={control}
                  name="motherEmail"
                  label="Mother's Email"
                  type="email"
                  inputMode="email"
                />
                <TextField
                  control={control}
                  name="motherJob"
                  label="Mother's Job Designation"
                />
              </div>
            </div>

            <div className="space-y-4 pt-6 border-t border-border/50">
              <h4 className="font-semibold text-ink-muted text-sm uppercase tracking-wider">
                Emergency / Secondary Contact
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TextField
                  control={control}
                  name="secondaryContact"
                  label="Secondary Contact Number"
                  type="tel"
                  inputMode="tel"
                />
                <TextField
                  control={control}
                  name="relationship"
                  label="Relationship to Student"
                />
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
                className="gap-2 shrink-0 bg-transparent border border-border text-ink hover:bg-muted shadow-none"
              >
                <Icon icon={PlusIcon} className="size-4" /> Add
              </Button>
            </div>

            <div className="space-y-6">
              {qualificationFields.length === 0 ? (
                <P className="text-sm text-ink-muted">
                  No entries added. If you have not studied anywhere before,
                  leave this empty and continue.
                </P>
              ) : (
                qualificationFields.map((field, index) => (
                  <QualificationRow
                    key={field.id}
                    control={control}
                    index={index}
                    onRemove={() => removeQualification(index)}
                  />
                ))
              )}
            </div>

            {(!course || course.asksPendingQualifications) && (
              <div className="space-y-4 pt-6 border-t border-border/50">
                <H3 className="text-lg font-display text-ink">
                  Qualifications Pending
                </H3>
                <TextareaField
                  control={control}
                  name="pendingQualifications"
                  label="Are you currently awaiting any results?"
                  placeholder="Please list any exams taken for which results are pending..."
                  className="min-h-[100px]"
                />
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
                className="gap-2 shrink-0 bg-transparent border border-border text-ink hover:bg-muted shadow-none"
              >
                <Icon icon={PlusIcon} className="size-4" /> Add
              </Button>
            </div>

            <div className="space-y-6">
              {employmentFields.map((field, index) => (
                <EmploymentRow
                  key={field.id}
                  control={control}
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
              <TextareaField
                control={control}
                name="personalStatement"
                label="Personal Statement"
                description="Please provide a brief statement supporting your application."
                className="min-h-[120px]"
              />

              <div className="pt-6">
                <CheckboxGroupField
                  control={control}
                  name="howDidYouHear"
                  legend="How did you hear of NAMI?"
                  options={HEAR_OPTIONS}
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
                  <TextField
                    control={control}
                    name="signature"
                    label="Student Signature (Type Name)"
                    autoComplete="name"
                    required={!guardianLed}
                  />
                  <DateField
                    control={control}
                    name="signatureDate"
                    label="Date"
                    required={!guardianLed}
                  />
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
        <div className="bg-muted w-full md:w-64 lg:w-80 p-6 md:p-8 shrink-0 border-b md:border-b-0 md:border-r border-border rounded-t-2xl md:rounded-tr-none md:rounded-l-2xl">
          <H2 className="font-display text-xl font-semibold text-ink mb-8">
            Inquiry Form
          </H2>
          <ul className="space-y-6">
            {steps.map((step, index) => {
              const isActive = !isSubmitted && index === stepIndex;
              const isPast = isSubmitted || index < stepIndex;
              const hasError = stepHasError(step.key);
              const canJump = !isSubmitted && (isPast || hasError);

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
                    onClick={() => canJump && goToStep(index)}
                    disabled={!canJump && !isActive}
                    className={cn(
                      "flex items-center justify-center size-7 rounded-full text-xs font-semibold shrink-0 transition-all duration-300",
                      isActive && "ring-4 ring-accent/20 scale-110",
                      canJump && "cursor-pointer",
                      hasError
                        ? "bg-surface text-accent border-2 border-accent"
                        : isActive
                          ? "bg-accent text-white"
                          : isPast
                            ? "bg-accent text-white hover:scale-110"
                            : "bg-surface text-ink-muted border border-border",
                    )}
                  >
                    {isPast && !hasError ? (
                      <Icon icon={CheckIcon} className="size-3" />
                    ) : (
                      index + 1
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => canJump && goToStep(index)}
                    disabled={!canJump && !isActive}
                    className={cn(
                      "text-sm font-medium text-left rounded-sm transition-colors duration-300",
                      canJump && "cursor-pointer",
                      hasError
                        ? "text-accent"
                        : isActive
                          ? "text-ink"
                          : isPast
                            ? "text-ink group-hover:text-accent"
                            : "text-ink-muted",
                    )}
                  >
                    {step.label}
                    {hasError && (
                      <span className="sr-only"> — needs attention</span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <form
          noValidate
          onSubmit={(event) => event.preventDefault()}
          className="flex-1 p-6 md:p-10 lg:p-12 flex flex-col justify-between"
        >
          {isSubmitted ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center gap-6 py-12">
              <span className="flex items-center justify-center size-16 rounded-full bg-accent text-accent-ink">
                <Icon icon={CheckIcon} className="size-7" />
              </span>

              <div className="max-w-md space-y-3">
                <H3
                  ref={confirmationRef}
                  tabIndex={-1}
                  className="text-2xl font-display text-ink"
                >
                  Your inquiry form is complete
                </H3>
                <P className="text-ink-muted">
                  Every answer has been checked. Download your summary as a PDF
                  and bring it with you, or go back if you want to change
                  something.
                </P>
              </div>

              {pdfError && (
                <P role="alert" className="text-xs text-accent">
                  {pdfError}
                </P>
              )}

              <div className="flex flex-col md:flex-row items-center gap-3">
                <Button
                  type="button"
                  size="lg"
                  onClick={downloadPdf}
                  disabled={isPreparingPdf}
                  className="gap-2 px-6"
                >
                  {isPreparingPdf ? "Preparing PDF" : "Download PDF"}
                  <Icon icon={DownloadIcon} className="size-4" />
                </Button>
                <Button
                  type="button"
                  size="lg"
                  onClick={resumeEditing}
                  className="gap-2 px-6 bg-transparent border border-border text-ink hover:bg-muted shadow-none"
                >
                  <Icon icon={ArrowLeftIcon} className="size-4" /> Edit answers
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div ref={formRef} className="flex-1">
                {renderStepContent()}
              </div>

              <div className="mt-12 pt-6 border-t border-border flex flex-col gap-4">
                {submitError && (
                  <P role="alert" className="text-xs text-accent">
                    {submitError}
                  </P>
                )}

                <div className="flex flex-wrap items-center justify-between gap-4">
                  <Button
                    type="button"
                    size="lg"
                    variant="default"
                    onClick={() => goToStep(stepIndex - 1)}
                    disabled={stepIndex === 0}
                    className="px-6 border border-border"
                  >
                    Previous
                  </Button>

                  {stepIndex < steps.length - 1 ? (
                    <Button
                      type="button"
                      size="lg"
                      onClick={goToNextStep}
                      className="gap-2 px-6"
                    >
                      Next Step{" "}
                      <Icon icon={ArrowRightIcon} className="size-4" />
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      size="lg"
                      onClick={submitForm}
                      className="gap-2 px-6"
                    >
                      Submit form <Icon icon={CheckIcon} className="size-4" />
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export function AdmissionsFormSection() {
  return (
    <section className="bg-muted section-y gutter-x" id="apply">
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
