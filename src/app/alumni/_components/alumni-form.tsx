"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowReloadHorizontalIcon,
  Mail01Icon,
  SentIcon,
  SparklesIcon,
  Tick02Icon,
} from "@hugeicons/core-free-icons";
import type { Route } from "next";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { buttonVariants } from "@/components/ui/button";
import {
  CheckboxField,
  SelectField,
  TextareaField,
  TextField,
} from "@/components/ui/form";
import { Icon } from "@/components/ui/icon";
import { H3, H4, P } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

const alumniStorySchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name"),
  email: z.string().trim().email("Please enter a valid email address"),
  phone: z.string().trim().optional(),
  linkedin: z.string().trim().optional(),
  wing: z.string().min(1, "Please select your academic wing"),
  program: z.string().trim().min(2, "Please enter your programme name"),
  graduationYear: z.string().trim().min(4, "Please enter your graduation year"),
  currentRole: z.string().trim().min(2, "Please enter your current role or profession"),
  currentOrg: z.string().trim().min(2, "Please enter your current organisation or university"),
  location: z.string().trim().min(2, "Please enter your current city and country"),
  storyHeadline: z.string().trim().min(5, "Please give a short headline or key takeaway"),
  experience: z.string().trim().min(20, "Please share a few sentences about your experience (min 20 characters)"),
  advice: z.string().trim().optional(),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must agree to share your experience with NAMI",
  }),
});

type AlumniStoryFormData = z.infer<typeof alumniStorySchema>;

const WING_OPTIONS = [
  { value: "Cambridge A-Levels", label: "Cambridge A-Levels (NAMI College)" },
  { value: "Northampton UK Degree", label: "BSc / MSc / BBA / MBA (Northampton UK)" },
  { value: "NEB +2 Science/Management", label: "NEB +2 (Science / Management)" },
  { value: "School", label: "NAMI International School" },
] as const;

function createAlumniMailto(email: string, values: AlumniStoryFormData): string {
  const subject = `Alumni Experience Submission — ${values.fullName} (${values.graduationYear})`;
  const body = [
    `ALUMNI EXPERIENCE & SPOTLIGHT SUBMISSION`,
    `========================================`,
    ``,
    `1. PERSONAL & CONTACT DETAILS`,
    `Full Name: ${values.fullName}`,
    `Email: ${values.email}`,
    `Phone/WhatsApp: ${values.phone || "Not provided"}`,
    `LinkedIn / Portfolio: ${values.linkedin || "Not provided"}`,
    ``,
    `2. NAMI ACADEMIC BACKGROUND`,
    `Institution / Wing: ${values.wing}`,
    `Programme / Course: ${values.program}`,
    `Graduation Year / Batch: ${values.graduationYear}`,
    ``,
    `3. CURRENT PROFESSIONAL PROFILE`,
    `Current Role / Designation: ${values.currentRole}`,
    `Current Organisation: ${values.currentOrg}`,
    `Location (City, Country): ${values.location}`,
    ``,
    `4. ALUMNI EXPERIENCE & STORY`,
    `Headline / Summary: "${values.storyHeadline}"`,
    ``,
    `Experience & Reflection:`,
    `${values.experience}`,
    ``,
    values.advice ? `Advice for Current Students:\n${values.advice}\n` : null,
    `Consent to publish: Yes`,
  ]
    .filter((line) => line !== null)
    .join("\r\n");

  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function AlumniForm({ email }: { email: string }) {
  const [submittedData, setSubmittedData] = useState<AlumniStoryFormData | null>(
    null,
  );
  const [mailtoLink, setMailtoLink] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, isValid },
  } = useForm<AlumniStoryFormData>({
    resolver: zodResolver(alumniStorySchema),
    mode: "onTouched",
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      linkedin: "",
      wing: "",
      program: "",
      graduationYear: "",
      currentRole: "",
      currentOrg: "",
      location: "",
      storyHeadline: "",
      experience: "",
      advice: "",
      consent: false,
    },
  });

  const onSubmit = (data: AlumniStoryFormData) => {
    const link = createAlumniMailto(email, data);
    setSubmittedData(data);
    setMailtoLink(link);
    window.location.href = link;
  };

  const handleReset = () => {
    reset();
    setSubmittedData(null);
    setMailtoLink(null);
  };

  return (
    <section
      className="gutter-x section-y border-t border-border bg-gradient-to-b from-surface via-primary-100/20 to-neutral-100/40 relative overflow-hidden"
      id="share-experience"
    >
      <div className="mx-auto max-w-page relative">
        <SectionHeader
          eyebrow={
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-100 border border-primary-200/80 px-3 py-0.5 text-xs font-semibold tracking-wider text-primary-700 uppercase">
              <span className="size-1.5 rounded-full bg-primary-700" />
              SHARE YOUR STORY
            </span>
          }
          layout="split"
          title="Share Your NAMI Experience"
          description="Are you a NAMI alumnus? Share your journey, professional milestones, and memories with us to inspire the next generation and get featured in our alumni spotlights."
        />

        <div className="mt-12 lg:mt-16">
          {submittedData && mailtoLink ? (
            <Reveal>
              <div className="mx-auto max-w-2xl relative overflow-hidden rounded-3xl border border-primary-200 bg-surface-raised p-8 text-center sm:p-12 shadow-lg shadow-primary-900/5 before:absolute before:inset-x-0 before:top-0 before:h-1.5 before:bg-gradient-to-r before:from-primary-700 before:via-primary-500 before:to-primary-800">
                <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <Icon icon={Tick02Icon} className="size-8 text-emerald-600" />
                </div>
                <H3 className="font-display text-2xl text-ink sm:text-3xl">
                  Thank You, {submittedData.fullName}!
                </H3>
                <P className="mx-auto mt-3 max-w-lg text-ink-muted text-base sm:text-lg">
                  Your story has been formatted. Click below if your email client
                  didn&apos;t open automatically to send it to{" "}
                  <span className="font-semibold text-primary-700">{email}</span>.
                </P>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                  <Link
                    href={mailtoLink as Route}
                    className={cn(
                      buttonVariants({ size: "lg", variant: "default" }),
                      "inline-flex items-center gap-2 bg-primary-700 hover:bg-primary-800 text-white shadow-md shadow-primary-700/20",
                    )}
                  >
                    <Icon icon={SentIcon} className="size-4" />
                    <span>Send via Email</span>
                  </Link>
                  <button
                    type="button"
                    onClick={handleReset}
                    className={cn(
                      buttonVariants({ size: "lg", variant: "outline" }),
                      "inline-flex items-center gap-2 border-primary-200 text-ink hover:border-primary-400 hover:text-primary-700",
                    )}
                  >
                    <Icon icon={ArrowReloadHorizontalIcon} className="size-4" />
                    <span>Submit Another Story</span>
                  </button>
                </div>
              </div>
            </Reveal>
          ) : (
            <Reveal>
              <div className="mx-auto max-w-6xl relative overflow-hidden rounded-3xl border border-primary-200/80 bg-surface-raised p-6 sm:p-8 lg:p-10 shadow-lg shadow-primary-900/5 before:absolute before:inset-x-0 before:top-0 before:h-1.5 before:bg-gradient-to-r before:from-primary-700 before:via-primary-500 before:to-primary-800">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                >
                  <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
                    {/* LEFT COLUMN: Profile, NAMI Background & Career */}
                    <div className="space-y-8">
                      {/* Section 1: Personal & Contact */}
                      <div className="rounded-2xl border border-border/70 bg-neutral-50/50 p-5 sm:p-6 space-y-4">
                        <div className="flex items-center gap-2.5 border-b border-primary-100 pb-3">
                          <div className="flex size-7 items-center justify-center rounded-full bg-primary-700 text-white font-bold text-xs shadow-xs">
                            1
                          </div>
                          <H4 className="text-base font-semibold text-ink">
                            Personal & Contact Details
                          </H4>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <TextField
                            control={control}
                            name="fullName"
                            label="Full Name"
                            placeholder="e.g. Aarav Sharma"
                            required
                          />
                          <TextField
                            control={control}
                            name="email"
                            label="Email Address"
                            type="email"
                            placeholder="e.g. aarav@example.com"
                            required
                          />
                          <TextField
                            control={control}
                            name="phone"
                            label="Phone / WhatsApp"
                            placeholder="e.g. +977 98XXXXXXXX"
                          />
                          <TextField
                            control={control}
                            name="linkedin"
                            label="LinkedIn Profile URL"
                            placeholder="e.g. linkedin.com/in/aarav"
                          />
                        </div>
                      </div>

                      {/* Section 2: Academic Background */}
                      <div className="rounded-2xl border border-border/70 bg-neutral-50/50 p-5 sm:p-6 space-y-4">
                        <div className="flex items-center gap-2.5 border-b border-primary-100 pb-3">
                          <div className="flex size-7 items-center justify-center rounded-full bg-primary-700 text-white font-bold text-xs shadow-xs">
                            2
                          </div>
                          <H4 className="text-base font-semibold text-ink">
                            Your NAMI Academic Background
                          </H4>
                        </div>

                        <div className="space-y-4">
                          <SelectField
                            control={control}
                            name="wing"
                            label="Academic Wing"
                            placeholder="Select wing"
                            options={WING_OPTIONS}
                            required
                          />

                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <TextField
                              control={control}
                              name="program"
                              label="Programme / Degree"
                              placeholder="e.g. BSc (Hons) Computing"
                              required
                            />
                            <TextField
                              control={control}
                              name="graduationYear"
                              label="Graduation Year / Batch"
                              placeholder="e.g. 2021"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      {/* Section 3: Professional Endeavour */}
                      <div className="rounded-2xl border border-border/70 bg-neutral-50/50 p-5 sm:p-6 space-y-4">
                        <div className="flex items-center gap-2.5 border-b border-primary-100 pb-3">
                          <div className="flex size-7 items-center justify-center rounded-full bg-primary-700 text-white font-bold text-xs shadow-xs">
                            3
                          </div>
                          <H4 className="text-base font-semibold text-ink">
                            Current Professional Endeavour
                          </H4>
                        </div>

                        <div className="space-y-4">
                          <TextField
                            control={control}
                            name="currentRole"
                            label="Current Designation / Role"
                            placeholder="e.g. Senior Software Engineer"
                            required
                          />

                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <TextField
                              control={control}
                              name="currentOrg"
                              label="Company / University"
                              placeholder="e.g. Leapfrog Technology"
                              required
                            />
                            <TextField
                              control={control}
                              name="location"
                              label="City & Country"
                              placeholder="e.g. Kathmandu, Nepal"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* RIGHT COLUMN: Experience, Advice & Consent/Submit */}
                    <div className="flex flex-col justify-between space-y-6">
                      {/* Section 4: Story & Experience */}
                      <div className="rounded-2xl border border-border/70 bg-neutral-50/50 p-5 sm:p-6 space-y-4 flex-1">
                        <div className="flex items-center gap-2.5 border-b border-primary-100 pb-3">
                          <div className="flex size-7 items-center justify-center rounded-full bg-primary-700 text-white font-bold text-xs shadow-xs">
                            4
                          </div>
                          <H4 className="text-base font-semibold text-ink">
                            Share Your Story & Experience
                          </H4>
                        </div>

                        <div className="space-y-4">
                          <TextField
                            control={control}
                            name="storyHeadline"
                            label="Story Headline / Summary"
                            placeholder="e.g. How NAMI gave me the technical foundation to build AI products globally"
                            required
                          />

                          <TextareaField
                            control={control}
                            name="experience"
                            label="Your NAMI Experience & Journey"
                            placeholder="Tell us about your learning experience, faculty, campus life, and how NAMI prepared you for your career..."
                            rows={4}
                            required
                          />

                          <TextareaField
                            control={control}
                            name="advice"
                            label="Advice for Current Students (Optional)"
                            placeholder="What advice would you give to current NAMI students pursuing their goals?"
                            rows={3}
                          />
                        </div>
                      </div>

                      {/* Section 5: Consent & Submit Box */}
                      <div className="rounded-2xl bg-primary-100/40 p-5 sm:p-6 border border-primary-200/80 space-y-4">
                        <CheckboxField
                          control={control}
                          name="consent"
                          label="I consent to NAMI College featuring my profile, testimonial, and career updates on the NAMI website, alumni spotlights, and promotional publications."
                          required
                        />

                        <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-t border-primary-200/60">
                          <P className="text-xs text-ink-muted">
                            Reviewed by the NAMI Alumni Relations team.
                          </P>

                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className={cn(
                              buttonVariants({ size: "lg", variant: "default" }),
                              "w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 font-medium bg-primary-700 hover:bg-primary-800 text-white shadow-md shadow-primary-700/25 transition-all duration-200 cursor-pointer",
                            )}
                          >
                            <Icon icon={SparklesIcon} className="size-4" />
                            <span>Submit Experience</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
