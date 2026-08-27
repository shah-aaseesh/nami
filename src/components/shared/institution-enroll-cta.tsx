"use client";

import type { Route } from "next";
import Link from "next/link";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import type { EntityRole } from "@/lib/content";
import { ArrowRightIcon, DownloadIcon, PhoneIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

export interface InstitutionEnrollCtaProps {
  readonly id?: string;
  readonly institution?: EntityRole;
  readonly eyebrow?: string;
  readonly heading?: string;
  readonly description?: string;
  readonly applyLabel?: string;
  readonly applyHref?: string;
  readonly brochureLabel?: string;
  readonly brochureHref?: string;
  readonly phone?: string;
  readonly className?: string;
}

const DEFAULTS_BY_ROLE: Record<
  EntityRole,
  {
    heading: string;
    description: string;
    brochureLabel: string;
  }
> = {
  school: {
    heading: "Ready to Enroll?",
    description:
      "We are here to guide you through every step of the admissions process. If you have any questions or need assistance, our admissions team is ready to help.",
    brochureLabel: "Brochure",
  },
  college: {
    heading: "Ready to Enroll?",
    description:
      "We are here to guide you through every step of the Cambridge A-Level admissions process. If you have any questions, our admissions desk is here to support you.",
    brochureLabel: "Prospectus",
  },
  institute: {
    heading: "Ready to Enroll?",
    description:
      "We are here to guide you through every step of university admissions. If you have any questions about Northampton UK degree programmes, our advisors are ready to assist.",
    brochureLabel: "Prospectus",
  },
};

export function InstitutionEnrollCta({
  id = "enroll",
  institution = "school",
  eyebrow,
  heading,
  description,
  applyLabel = "Apply Now",
  applyHref = "/admissions",
  brochureLabel,
  brochureHref = "/admissions",
  phone = "+977-1-4917441",
  className,
}: InstitutionEnrollCtaProps) {
  const roleDefaults = DEFAULTS_BY_ROLE[institution] ?? DEFAULTS_BY_ROLE.school;
  const effectiveHeading = heading ?? roleDefaults.heading;
  const effectiveDescription = description ?? roleDefaults.description;
  const effectiveBrochureLabel = brochureLabel ?? roleDefaults.brochureLabel;

  const isSchool = institution === "school";
  const isCollege = institution === "college";
  const isCustomDark = isSchool || isCollege;

  return (
    <section
      className={cn(
        isSchool && "bg-[#0e3b47] text-white",
        isCollege && "bg-[#001b44] text-white",
        !isCustomDark && "field-brand",
        "gutter-x py-10 sm:py-14 lg:py-16",
        className,
      )}
      id={id}
    >
      <div className="mx-auto max-w-4xl text-center">
        <Reveal stagger={0.08}>
          {eyebrow && (
            <RevealItem>
              <span
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest backdrop-blur-xs",
                  isSchool &&
                    "border border-[#2BBCC6]/40 bg-[#2BBCC6]/15 text-[#2BBCC6]",
                  isCollege &&
                    "border border-[#88dbdf]/40 bg-[#88dbdf]/15 text-[#88dbdf]",
                  !isCustomDark &&
                    "border border-white/20 bg-white/10 text-white",
                )}
              >
                <span
                  className={cn(
                    "size-2 rounded-full animate-pulse",
                    isSchool && "bg-[#2BBCC6]",
                    isCollege && "bg-[#88dbdf]",
                    !isCustomDark && "bg-white",
                  )}
                />
                {eyebrow}
              </span>
            </RevealItem>
          )}

          <SplitText
            as="h2"
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium text-balance text-white tracking-tight"
          >
            {effectiveHeading}
          </SplitText>

          <RevealItem className="mt-3 sm:mt-4 mx-auto max-w-2xl">
            <p
              className={cn(
                "font-body text-sm sm:text-base leading-relaxed",
                isCustomDark ? "text-white/85" : "text-primary-100/90",
              )}
            >
              {effectiveDescription}
            </p>
          </RevealItem>

          {/* Action Button Row */}
          <RevealItem className="mt-7 sm:mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {/* Primary Action: Apply Now */}
            <Link
              href={applyHref as Route}
              className={cn(
                buttonVariants({ size: "lg" }),
                isCustomDark
                  ? "bg-[#BD1B21] text-white hover:bg-[#a0161b] font-semibold shadow-lg border border-[#BD1B21]/60"
                  : "bg-white text-primary-800 hover:bg-neutral-100 font-semibold shadow-md",
              )}
            >
              <span>{applyLabel}</span>
              <Icon
                icon={ArrowRightIcon}
                className={cn(
                  "size-4",
                  isCustomDark ? "text-white" : "text-primary-800",
                )}
              />
            </Link>

            {/* Brochure Action: Download Brochure */}
            <Link
              href={brochureHref as Route}
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "border-white/35 bg-white/10 text-white hover:bg-white/20 hover:border-white shadow-sm backdrop-blur-xs",
              )}
            >
              <Icon
                icon={DownloadIcon}
                className={cn(
                  "size-4",
                  isSchool && "text-[#2BBCC6]",
                  isCollege && "text-[#88dbdf]",
                  !isCustomDark && "text-primary-200",
                )}
              />
              <span>{effectiveBrochureLabel}</span>
            </Link>
          </RevealItem>

          {/* Help Line / Contact Link */}
          {phone && (
            <RevealItem
              className={cn(
                "mt-8 flex items-center justify-center gap-2 text-xs sm:text-sm",
                isCustomDark ? "text-white/80" : "text-primary-200",
              )}
            >
              <Icon
                icon={PhoneIcon}
                className={cn(
                  "size-3.5",
                  isSchool && "text-[#2BBCC6]",
                  isCollege && "text-[#88dbdf]",
                  !isCustomDark && "text-primary-300",
                )}
              />
              <span>Need help? Call Admissions at</span>
              <Link
                href={`tel:${phone.replace(/[^+\d]/g, "")}` as Route}
                className="font-semibold text-white underline underline-offset-4 decoration-white/40 hover:decoration-white transition-colors"
              >
                {phone}
              </Link>
            </RevealItem>
          )}
        </Reveal>
      </div>
    </section>
  );
}
