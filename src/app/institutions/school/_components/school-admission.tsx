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
        "group relative flex shrink-0 snap-center flex-col items-center justify-center transition-all duration-300",
        "w-[175px] h-[175px] sm:w-[185px] sm:h-[185px] md:w-[195px] md:h-[195px] lg:w-[165px] lg:h-[165px] xl:w-[215px] xl:h-[215px] 2xl:w-[205px] 2xl:h-[205px]",
        // 4 in top (0, 2, 4, 6) and 3 in down (1, 3, 5) with calibrated vertical stagger
        isEven ? "mt-14 sm:mt-16 md:mt-18 xl:mt-22 2xl:mt-24" : "mt-0",
      )}
      data-reveal-item=""
    >
      {/* Outer Dashed Decorative Border */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-3 sm:inset-3 rotate-45 rounded-2xl sm:rounded-3xl border border-dashed border-primary-300/60 transition-all duration-300 group-hover:border-primary-500 group-hover:scale-102"
      />

      {/* Main Diamond Shape — Brand Red Card */}
      <div className="absolute inset-3.5 sm:inset-4 rotate-45 rounded-2xl sm:rounded-3xl border border-primary-700/30 bg-primary-800 shadow-xl shadow-primary-950/15 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-primary-950/25 group-hover:scale-105" />

      {/* Top Apex: Circular Step Number Badge */}
      <div
        className={cn(
          "absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex size-8 sm:size-8.5 lg:size-9 xl:size-10 items-center justify-center rounded-full font-display text-xs sm:text-xs xl:text-sm font-bold shadow-md ring-4 ring-surface transition-transform duration-300 group-hover:scale-110",
          STEP_BADGE_CLASS,
        )}
      >
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* Bottom Apex: Step Icon Badge (dark bg matching number badge) */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-20 flex size-8 sm:size-8.5 lg:size-9 xl:size-10 items-center justify-center rounded-full bg-neutral-950 text-white shadow-md ring-4 ring-surface transition-transform duration-300 group-hover:scale-110">
        <Icon
          className="size-3.5 sm:size-4 xl:size-4.5 text-white"
          icon={IconComponent}
        />
      </div>

      {/* Upright Center Text Content — Generous padding and clear breathing room */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-3.5 sm:px-4 lg:px-3.5 xl:px-4 py-1.5 max-w-[140px] sm:max-w-[150px] md:max-w-[160px] lg:max-w-[140px] xl:max-w-[165px] 2xl:max-w-[175px]">
        <h4 className="font-display text-[11px] sm:text-xs xl:text-sm font-bold text-white uppercase tracking-wider leading-snug transition-colors group-hover:text-primary-100 line-clamp-2">
          {step.title}
        </h4>

        <p className="mt-1 sm:mt-1.5 text-[9.5px] sm:text-[10.5px] xl:text-[11.5px] font-normal leading-relaxed text-primary-100/90 line-clamp-3">
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
      className="bg-surface text-ink gutter-x pt-10 sm:pt-12 lg:pt-16 pb-2 sm:pb-4 lg:pb-6"
      id={id}
    >
      <div className="mx-auto max-w-page">
        <SectionHeader
          eyebrow={copy.heading}
          title={copy.eyebrow ?? "Admissions"}
          description={copy.standfirst}
        />

        {/* 7-Step Zig-Zag Diamond Flow — Seamless swipe on sm/md, Centered on lg/xl */}
        <div className="mt-6 sm:mt-8 lg:mt-10 w-full">
          <div className="overflow-x-auto snap-x snap-mandatory scrollbar-hide pt-4 pb-6 sm:pt-5 sm:pb-8 lg:pt-5 lg:pb-8 -mx-[var(--gutter-x)] px-[var(--gutter-x)] lg:mx-0 lg:px-0 lg:overflow-visible flex lg:justify-center w-full">
            <ol className="flex items-start -space-x-3 sm:-space-x-5 md:-space-x-6 lg:-space-x-7 xl:-space-x-8 2xl:-space-x-9 w-max lg:w-full lg:justify-center px-6 sm:px-8 lg:px-0">
              {copy.steps.map((step, index) => (
                <DiamondStepCard index={index} key={step.title} step={step} />
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
