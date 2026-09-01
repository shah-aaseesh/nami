import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/shared/section-header";
import { Eyebrow, H4 } from "@/components/ui/typography";
import type {
  BachelorsProgramme,
  BachelorsProgrammesCopy,
} from "./bachelors-copy";

const CARD_SIZES =
  "(min-width: 1568px) 380px, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw";

function CourseCard({
  copy,
  course,
}: {
  readonly copy: BachelorsProgrammesCopy;
  readonly course: BachelorsProgramme;
}) {
  const description = course.shortDescription ?? course.summary[0] ?? null;

  return (
    <li className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/80 bg-surface-raised transition-all duration-300 hover:border-primary-600 hover:shadow-lg hover:shadow-primary-950/5 w-[85vw] max-w-[320px] shrink-0 snap-center sm:w-[calc(50%-0.75rem)] sm:max-w-none sm:shrink-0 lg:w-[calc((100%-3rem)/3)] lg:max-w-[380px] xl:max-w-[400px]">
      {/* Compact Top Content */}
      <div className="flex flex-1 flex-col gap-2.5 p-5 sm:p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
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

        {description && (
          <p className="line-clamp-2 text-xs sm:text-sm text-ink-muted leading-relaxed">
            {description}
          </p>
        )}

        {/* Compact Awarding Line */}
        <p className="mt-auto border-t border-border/70 pt-3 text-xs text-ink">
          <span className="text-ink-muted">{`${copy.awardedLabel} `}</span>
          <span className="font-medium text-ink">{course.awardingBody}</span>
        </p>
      </div>

      {/* Bottom Media Plate */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
        <Image
          alt={course.image.alt}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
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
          eyebrow={copy.eyebrow}
          title={copy.heading}
          description={copy.standfirst ?? undefined}
        />
      </div>

      <div className="mx-auto mt-8 sm:mt-10 lg:mt-12 max-w-page">
        <ul
          aria-label={copy.eyebrow}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 -mx-[var(--gutter-x)] px-[var(--gutter-x)] sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center sm:gap-6 sm:overflow-visible lg:gap-6"
        >
          {copy.items.map((course) => (
            <CourseCard copy={copy} course={course} key={course.key} />
          ))}
        </ul>
      </div>
    </section>
  );
}
