import Image from "next/image";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Eyebrow, Standfirst } from "@/components/ui/typography";
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
  const credits = totalCreditsOf(course);
  const facts: CourseFact[] = [
    { label: courseDetailCopy.awardedLabel, value: course.awardingBody },
  ];

  if (course.format !== null) {
    facts.push({ label: courseDetailCopy.formatLabel, value: course.format });
  }

  if (credits > 0) {
    facts.push({
      label: courseDetailCopy.creditsLabel,
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

export function CourseMasthead({
  course,
  eyebrow,
}: {
  readonly course: BachelorsProgramme;
  readonly eyebrow?: string;
}) {
  const facts = factsOf(course);
  const lead = course.summary[0] ?? null;

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
                "font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold sm:font-normal text-balance text-accent",
                eyebrow && "mt-3",
              )}
            >
              {course.fullTitle}
            </SplitText>
          </Reveal>

          {lead === null ? null : (
            <Reveal className="mt-5 max-w-xl text-neutral-700 lg:col-span-5 lg:mt-0">
              <Standfirst className="text-ink-muted text-base sm:text-lg leading-relaxed">
                {lead}
              </Standfirst>
            </Reveal>
          )}
        </div>

        <figure className="overflow-hidden rounded-3xl bg-muted border border-border/60 shadow-md">
          <Image
            alt={course.image.alt}
            className="aspect-4/3 w-full object-cover sm:aspect-video"
            fetchPriority="high"
            height={course.image.height}
            loading="eager"
            sizes={PLATE_SIZES}
            src={course.image.src}
            width={course.image.width}
          />
        </figure>

        <div className="rounded-2xl border border-accent/25 bg-accent/[0.03] p-6 sm:p-8">
          <dl
            className={cn(
              "grid grid-cols-1 divide-y sm:divide-y-0 sm:divide-x divide-accent/30 w-full",
              facts.length === 2
                ? "sm:grid-cols-2"
                : facts.length === 3
                  ? "sm:grid-cols-3"
                  : "sm:grid-cols-4",
            )}
          >
            {facts.map((fact, index) => (
              <div
                key={fact.label}
                className={cn(
                  "space-y-1.5",
                  index === 0
                    ? "sm:pe-6 lg:pe-8 pb-5 sm:pb-0"
                    : index === facts.length - 1
                      ? "sm:ps-6 lg:ps-8 pt-5 sm:pt-0"
                      : "sm:px-6 lg:px-8 py-5 sm:py-0",
                )}
              >
                <span className="block font-body text-xs font-semibold tracking-wider text-accent uppercase">
                  {fact.label}
                </span>
                <dd className="font-display text-xl sm:text-2xl font-normal text-balance text-ink">
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
