import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/shared/section-header";
import { Eyebrow, H4, P } from "@/components/ui/typography";
import type {
  BachelorsProgramme,
  BachelorsProgrammesCopy,
} from "./bachelors-copy";

const CARD_SIZES =
  "(min-width: 1568px) 480px, (min-width: 1024px) 30vw, (min-width: 640px) 46vw, 90vw";

function CourseCard({
  copy,
  course,
}: {
  readonly copy: BachelorsProgrammesCopy;
  readonly course: BachelorsProgramme;
}) {
  const lead = course.summary[0] ?? null;

  return (
    <li className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface-raised transition-colors hover:border-border-strong">
      <div className="flex flex-1 flex-col gap-4 p-6 lg:p-8">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
          <Eyebrow as="span">{course.qualification}</Eyebrow>

          {course.startingFrom === null ? null : (
            <Eyebrow as="span" className="text-ink-muted">
              {`${copy.startingLabel} ${course.startingFrom}`}
            </Eyebrow>
          )}
        </div>

        <H4 as="h3" className="text-ink">
          <Link
            className="transition-colors after:absolute after:inset-0 group-hover:text-accent"
            href={`/institutions/bachelors/${course.key}`}
          >
            {course.title}
          </Link>
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
        <SectionHeader
          eyebrow={copy.heading}
          title={copy.eyebrow ?? "Programmes"}
          description={copy.standfirst}
        />
      </div>

      <div className="mx-auto mt-14 max-w-page lg:mt-20">
        <ul
          aria-label={copy.eyebrow}
          className="grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3"
        >
          {copy.items.map((course) => (
            <CourseCard copy={copy} course={course} key={course.key} />
          ))}
        </ul>
      </div>
    </section>
  );
}
