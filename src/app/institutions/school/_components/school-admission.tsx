"use client";

import {
  Calendar03Icon,
  Call02Icon,
  Compass01Icon,
  File01Icon,
  Search01Icon,
  SparklesIcon,
  Tick02Icon,
} from "@hugeicons/core-free-icons";
import { SectionHeader } from "@/components/shared/section-header";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

export type SchoolAdmissionStep = {
  readonly title: string;
  readonly body: string;
};

export type SchoolAdmissionCopy = {
  readonly eyebrow: string;
  readonly heading: string;
  readonly standfirst: string;
  readonly stepLabel: string;
  readonly steps: readonly SchoolAdmissionStep[];
};

const STEP_ICONS = [
  Search01Icon,
  Compass01Icon,
  File01Icon,
  Calendar03Icon,
  Call02Icon,
  Tick02Icon,
  SparklesIcon,
];

// High-contrast badge for cards sitting on crimson section
const STEP_BADGE_CLASS = "bg-neutral-950 text-white";

function DiamondStepCard({
  index,
  step,
}: {
  index: number;
  step: SchoolAdmissionStep;
}) {
  const isEven = index % 2 === 1; // 0, 2, 4, 6 (top 4) | 1, 3, 5 (bottom 3)
  const IconComponent = STEP_ICONS[index % STEP_ICONS.length] ?? SparklesIcon;

  return (
    <li
      className={cn(
        "group relative flex shrink-0 flex-col items-center justify-center transition-all duration-300",
        "w-[220px] h-[220px] sm:w-[240px] sm:h-[240px] md:w-[200px] md:h-[200px] lg:w-[230px] lg:h-[230px] xl:w-[250px] xl:h-[250px]",
        // 4 in top (0, 2, 4, 6) and 3 in down (1, 3, 5)
        isEven ? "md:mt-24 lg:mt-28 xl:mt-32" : "mt-0",
      )}
      data-reveal-item=""
    >
      {/* Outer Dashed Decorative Border (white dashed border on red background) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-3 sm:inset-4 rotate-45 rounded-2xl sm:rounded-3xl border border-dashed border-white/60 transition-all duration-300 group-hover:border-white"
      />

      {/* Main Diamond Shape — Pure white card with clean depth */}
      <div className="absolute inset-4 sm:inset-5 rotate-45 rounded-2xl sm:rounded-3xl border border-white/40 bg-white shadow-xl shadow-black/15 transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105" />

      {/* Top Apex: Circular Step Number Badge */}
      <div
        className={cn(
          "absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex size-9 sm:size-10 lg:size-11 items-center justify-center rounded-full font-display text-xs sm:text-sm font-bold shadow-md ring-4 ring-white transition-transform duration-300 group-hover:scale-110",
          STEP_BADGE_CLASS,
        )}
      >
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* Bottom Apex: Step Icon Badge */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-20 flex size-8 sm:size-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-primary-800 shadow-md ring-4 ring-white transition-all duration-300 group-hover:bg-neutral-950 group-hover:text-white">
        <Icon
          className="size-3.5 sm:size-4 transition-colors group-hover:text-white"
          icon={IconComponent}
        />
      </div>

      {/* Upright Center Text Content — High contrast dark text on white card */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-[150px] sm:max-w-[170px] lg:max-w-[185px]">
        <h4 className="font-display text-xs sm:text-sm font-bold text-neutral-950 uppercase tracking-wide leading-tight transition-colors group-hover:text-primary-800 line-clamp-2">
          {step.title}
        </h4>

        <p className="mt-1.5 text-[11px] sm:text-xs font-normal leading-relaxed text-neutral-600 line-clamp-3">
          {step.body}
        </p>
      </div>
    </li>
  );
}

export function SchoolAdmission({
  copy,
  id = "admissions",
}: {
  readonly copy: SchoolAdmissionCopy;
  readonly id?: string;
}) {
  const total = copy.steps.length;

  if (total === 0) return null;

  return (
    <section
      className="field-brand gutter-x px-6 sm:px-12 lg:px-20 xl:px-28 section-y overflow-hidden"
      id={id}
    >
      <div className="mx-auto max-w-page">
        <SectionHeader
          eyebrow={copy.heading}
          title={copy.eyebrow ?? "Admissions"}
          description={copy.standfirst}
        />

        {/* 7-Step Zig-Zag Diamond Flow — 4 in top, 3 in down across the page */}
        <div className="mt-14 lg:mt-20">
          {/* Desktop & Tablet: 4 Top + 3 Down Interlocking Wave */}
          <div className="hidden md:flex justify-center items-start -space-x-8 lg:-space-x-12 xl:-space-x-14 py-8">
            <ol className="flex justify-center items-start -space-x-8 lg:-space-x-12 xl:-space-x-14 w-full">
              {copy.steps.map((step, index) => (
                <DiamondStepCard index={index} key={step.title} step={step} />
              ))}
            </ol>
          </div>

          {/* Mobile: Clean Stepped List / Grid */}
          <ol className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:hidden pt-4">
            {copy.steps.map((step, index) => {
              const IconComponent =
                STEP_ICONS[index % STEP_ICONS.length] ?? SparklesIcon;

              return (
                <li
                  key={step.title}
                  className="relative flex items-start gap-4 rounded-2xl border border-white/40 bg-white p-5 text-neutral-900 shadow-xl shadow-black/15"
                >
                  <div
                    className={cn(
                      "flex size-10 shrink-0 items-center justify-center rounded-full font-display text-sm font-bold shadow-xs",
                      STEP_BADGE_CLASS,
                    )}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-display text-sm font-bold text-neutral-950 uppercase tracking-wide">
                        {step.title}
                      </h4>
                      <div className="flex size-7 items-center justify-center rounded-full border border-neutral-200 bg-neutral-100 text-primary-800">
                        <Icon className="size-3.5" icon={IconComponent} />
                      </div>
                    </div>
                    <p className="mt-1.5 text-xs text-neutral-600 leading-relaxed">
                      {step.body}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
