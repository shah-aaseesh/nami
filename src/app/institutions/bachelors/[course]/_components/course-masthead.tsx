"use client";

import { useState } from "react";
import Image from "next/image";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Icon } from "@/components/ui/icon";
import { Eyebrow, Standfirst } from "@/components/ui/typography";
import { ChevronDownIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import type { BachelorsProgramme } from "../../_components/bachelors-copy";
import { courseDetailCopy } from "./course-detail-copy";

const PLATE_SIZES = "(min-width: 1024px) 1200px, 100vw";

const FACT_GRID_COLS: Record<number, string> = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-4",
};

type CourseFact = {
  readonly label: string;
  readonly value: string;
};

function totalCreditsOf(course: BachelorsProgramme): number {
  return course.stages.reduce(
    (total, stage) =>
      total + stage.modules.reduce((sum, module) => sum + module.credits, 0),
    0,
  );
}

function factsOf(course: BachelorsProgramme): readonly CourseFact[] {
  if (course.keyFacts && course.keyFacts.length > 0) {
    return course.keyFacts;
  }
  const credits = totalCreditsOf(course);
  const facts: CourseFact[] = [
    { label: "Programme Name", value: course.fullTitle },
    { label: "Level", value: "Undergraduate Degree" },
    { label: "Duration", value: course.format ?? "3 years" },
    { label: "Location", value: "New Baneshwor, Kathmandu" },
    { label: "Awarding Institution", value: course.awardingBody },
    { label: "Mode", value: "Full Time" },
  ];

  if (credits > 0) {
    facts.push({
      label: "Total Credits",
      value: String(credits),
    });
  }

  if (course.startingFrom !== null) {
    facts.push({
      label: courseDetailCopy.intakeLabel,
      value: course.startingFrom,
    });
  }

  return facts;
}

function splitLeadText(lead: string): {
  initial: string;
  expanded: string | null;
} {
  const periodIndex = lead.indexOf(". ");
  if (periodIndex !== -1) {
    return {
      initial: lead.slice(0, periodIndex + 1),
      expanded: lead.slice(periodIndex + 2).trim(),
    };
  }
  return { initial: lead, expanded: null };
}

export function CourseMasthead({
  course,
  eyebrow,
}: {
  readonly course: BachelorsProgramme;
  readonly eyebrow?: string;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const facts = factsOf(course);
  const lead = course.summary[0] ?? null;
  const leadParts = lead !== null ? splitLeadText(lead) : null;

  return (
    <section className="gutter-x section-y-masthead">
      <div className="mx-auto max-w-page space-y-6 sm:space-y-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-10 items-end">
          <Reveal className="lg:col-span-7" stagger={0.08}>
            {eyebrow ? (
              <RevealItem>
                <Eyebrow>{eyebrow}</Eyebrow>
              </RevealItem>
            ) : null}
            <SplitText
              as="h1"
              className={cn(
                "font-display text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold sm:font-normal text-balance text-accent",
                eyebrow && "mt-3",
              )}
            >
              {course.fullTitle}
            </SplitText>
          </Reveal>

          {leadParts === null ? null : (
            <Reveal className="mt-5 max-w-xl text-neutral-700 lg:col-span-5 lg:mt-0">
              <div className="space-y-2">
                <p className="text-sm sm:text-base font-body text-ink-muted leading-relaxed">
                  {leadParts.initial}
                </p>

                {leadParts.expanded ? (
                  <>
                    <div
                      className={cn(
                        "grid transition-all duration-300 ease-in-out overflow-hidden",
                        isExpanded
                          ? "grid-rows-[1fr] opacity-100 mt-2"
                          : "grid-rows-[0fr] opacity-0 mt-0",
                      )}
                    >
                      <div className="overflow-hidden">
                        <p className="text-sm sm:text-base font-body text-ink-muted leading-relaxed">
                          {leadParts.expanded}
                        </p>
                      </div>
                    </div>

                    <button
                      aria-expanded={isExpanded}
                      className="group inline-flex items-center gap-1.5 font-body text-xs font-semibold uppercase tracking-wider text-accent transition-colors hover:text-primary-800 cursor-pointer pt-0.5"
                      onClick={() => setIsExpanded((prev) => !prev)}
                      type="button"
                    >
                      <span>{isExpanded ? "Read Less" : "Read More"}</span>
                      <Icon
                        className={cn(
                          "size-3.5 transition-transform duration-300",
                          isExpanded
                            ? "rotate-180"
                            : "group-hover:translate-y-0.5",
                        )}
                        icon={ChevronDownIcon}
                      />
                    </button>
                  </>
                ) : null}
              </div>
            </Reveal>
          )}
        </div>

        <figure className="overflow-hidden rounded-3xl bg-muted border border-border/60 shadow-md">
          <Image
            alt={course.image.alt}
            className="aspect-4/3 w-full object-cover object-left-top origin-top-left sm:aspect-video"
            fetchPriority="high"
            height={course.image.height}
            loading="eager"
            sizes={PLATE_SIZES}
            src={course.image.src}
            width={course.image.width}
          />
        </figure>

        <div className="rounded-2xl border border-accent/25 bg-accent/[0.03] p-6 sm:p-8 shadow-xs">
          <div className="mb-5 pb-3.5 border-b border-accent/20 flex items-center gap-2.5">
            <span className="size-2 rounded-full bg-accent" />
            <h2 className="font-display text-xl sm:text-2xl font-bold text-ink tracking-tight">
              Key Facts
            </h2>
          </div>
          <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 w-full">
            {facts.map((fact) => (
              <div
                key={fact.label}
                className="space-y-1.5 rounded-xl bg-surface p-4 sm:p-5 border border-border/80 shadow-2xs hover:border-accent/40 transition-colors"
              >
                <span className="block font-body text-xs font-semibold tracking-wider text-accent uppercase">
                  {fact.label}
                </span>
                <dd className="font-display text-base sm:text-lg font-bold text-balance text-ink">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
