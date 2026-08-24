import { Reveal, RevealItem } from "@/components/motion/reveal";
import {
  Eyebrow,
  H2,
  H5,
  P,
  Small,
  Standfirst,
} from "@/components/ui/typography";
import type { SectionCopy, Vacancy } from "@/lib/content";
import { careersCopy, employmentTypeLabel } from "./careers-copy";

const fullDate = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

function SectionHead({ copy }: { readonly copy: SectionCopy }) {
  return (
    <Reveal
      className="lg:grid lg:grid-cols-12 lg:items-end lg:gap-x-8"
      stagger={0.08}
    >
      <div className="lg:col-span-7">
        {copy.eyebrow === null ? null : (
          <RevealItem className="flex items-center gap-5">
            <Eyebrow>{copy.eyebrow}</Eyebrow>
            <span className="h-px flex-1 bg-border" />
          </RevealItem>
        )}

        <RevealItem className="mt-4 lg:mt-6">
          <H2>{copy.heading}</H2>
        </RevealItem>
      </div>

      {copy.standfirst === null ? null : (
        <RevealItem className="mt-6 lg:col-span-4 lg:col-start-9 lg:mt-0">
          <Standfirst>{copy.standfirst}</Standfirst>
        </RevealItem>
      )}
    </Reveal>
  );
}

function VacancyStamp({
  label,
  stamp,
}: {
  readonly label: string;
  readonly stamp: string;
}) {
  return (
    <div>
      <Eyebrow as="dt" className="text-ink-muted">
        {label}
      </Eyebrow>
      <Small as="dd" className="mt-1">
        <time dateTime={stamp}>{fullDate.format(new Date(stamp))}</time>
      </Small>
    </div>
  );
}

function VacancyRow({ item }: { readonly item: Vacancy }) {
  return (
    <li className="border-t border-border pt-6">
      <p className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <Eyebrow as="span">{item.department}</Eyebrow>
        <Eyebrow as="span" className="text-ink-muted">
          {employmentTypeLabel[item.employmentType]}
        </Eyebrow>
      </p>

      <H5 as="h3" className="mt-3">
        {item.title}
      </H5>

      <P className="mt-4 max-w-2xl">{item.summary}</P>

      <dl className="mt-6 flex flex-wrap gap-x-12 gap-y-4">
        <div>
          <Eyebrow as="dt" className="text-ink-muted">
            {careersCopy.locationLabel}
          </Eyebrow>
          <Small as="dd" className="mt-1">
            {item.location}
          </Small>
        </div>

        <VacancyStamp label={careersCopy.postedLabel} stamp={item.postedAt} />

        {item.closesAt === null ? null : (
          <VacancyStamp label={careersCopy.closesLabel} stamp={item.closesAt} />
        )}
      </dl>
    </li>
  );
}

export function CareersVacancies({
  section,
  vacancies,
}: {
  readonly section: SectionCopy;
  readonly vacancies: readonly Vacancy[];
}) {
  return (
    <section className="gutter-x section-y" id="vacancies">
      <div className="mx-auto max-w-page">
        <SectionHead copy={section} />

        {vacancies.length === 0 ? (
          section.emptyState === null ? null : (
            <P className="mt-12 lg:w-5/12">{section.emptyState}</P>
          )
        ) : (
          <ul className="mt-12 flex flex-col gap-10 lg:mt-16 lg:gap-12">
            {vacancies.map((item) => (
              <VacancyRow item={item} key={item.id} />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
