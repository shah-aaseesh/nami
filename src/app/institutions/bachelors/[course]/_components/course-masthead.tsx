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
  readonly eyebrow: string;
}) {
  const facts = factsOf(course);
  const lead = course.summary[0] ?? null;

  return (
    <section className="gutter-x section-y-masthead">
      <div className="mx-auto max-w-page">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-10 items-end">
          <Reveal className="lg:col-span-7" stagger={0.08}>
            <RevealItem>
              <Eyebrow>{eyebrow}</Eyebrow>
            </RevealItem>
            <SplitText
              as="h1"
              className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-balance"
            >
              {course.fullTitle}
            </SplitText>
          </Reveal>

          {lead === null ? null : (
            <Reveal className="mt-5 max-w-xl text-neutral-700 lg:col-span-5 lg:mt-0">
              <Standfirst>{lead}</Standfirst>
            </Reveal>
          )}
        </div>

        <dl
          className={cn(
            "mt-10 sm:mt-12 grid grid-cols-1 gap-x-8 gap-y-8 border-t border-border/80 pt-8 lg:mt-14",
            FACT_GRID_COLS[facts.length] ?? "sm:grid-cols-4",
          )}
        >
          {facts.map((fact) => (
            <div key={fact.label}>
              <Eyebrow as="dt" className="text-ink-muted">
                {fact.label}
              </Eyebrow>
              <dd className="mt-4 font-display text-2xl font-normal text-balance text-ink">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>

        <figure className="mt-14 overflow-hidden rounded-3xl bg-muted lg:mt-20">
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
      </div>
    </section>
  );
}
