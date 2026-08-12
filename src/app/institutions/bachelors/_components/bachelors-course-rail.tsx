import Image from "next/image";
import { Eyebrow, H4, P, Standfirst } from "@/components/ui/typography";
import type {
  BachelorsProgramme,
  BachelorsProgrammesCopy,
} from "./bachelors-copy";
import { BachelorsCourseTrack } from "./bachelors-course-track";

const CARD_SIZES =
  "(min-width: 1568px) 480px, (min-width: 1024px) 30vw, (min-width: 640px) 46vw, 78vw";

function CourseCard({
  copy,
  course,
}: {
  readonly copy: BachelorsProgrammesCopy;
  readonly course: BachelorsProgramme;
}) {
  const lead = course.summary[0] ?? null;

  return (
    <li className="group flex w-4/5 shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-border bg-surface-raised sm:w-1/2 lg:w-1/3">
      <div className="flex flex-1 flex-col gap-4 p-6 lg:p-8">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
          <Eyebrow as="span">{course.qualification}</Eyebrow>

          {course.startingFrom === null ? null : (
            <span className="font-body text-xs font-medium tracking-widest text-ink-muted uppercase">
              {`${copy.startingLabel} ${course.startingFrom}`}
            </span>
          )}
        </div>

        <H4 as="h3" className="text-ink">
          {course.title}
        </H4>

        {lead === null ? null : <P className="line-clamp-3 text-sm">{lead}</P>}

        <p className="mt-auto border-t border-border pt-4 font-body text-sm text-ink">
          <span className="text-ink-muted">{`${copy.awardedLabel} `}</span>
          {course.awardingBody}
        </p>
      </div>

      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        <Image
          alt={course.image.alt}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          fill
          loading="lazy"
          sizes={CARD_SIZES}
          src={course.image.src}
        />
      </div>
    </li>
  );
}

export function BachelorsCourseRail({
  copy,
  id,
}: {
  readonly copy: BachelorsProgrammesCopy;
  readonly id?: string;
}) {
  const total = copy.items.length;

  if (total === 0) return null;

  return (
    <section className="gutter-x section-y" id={id}>
      <div className="mx-auto max-w-page">
        <div className="flex items-center gap-5">
          <Eyebrow>{copy.eyebrow}</Eyebrow>
          <span className="h-px flex-1 bg-border" />
        </div>

        <div className="mt-6 flex flex-col gap-6 lg:mt-8 lg:flex-row lg:items-end lg:justify-between lg:gap-x-16">
          <h2 className="font-display text-4xl font-normal text-balance text-ink lg:max-w-2xl lg:text-5xl">
            {copy.heading}
          </h2>

          <div className="lg:max-w-md">
            <Standfirst>{copy.standfirst}</Standfirst>
          </div>
        </div>
      </div>

      <div className="mt-14 lg:mt-20">
        <BachelorsCourseTrack label={copy.eyebrow} total={total}>
          {copy.items.map((course) => (
            <CourseCard copy={copy} course={course} key={course.key} />
          ))}
        </BachelorsCourseTrack>
      </div>
    </section>
  );
}
