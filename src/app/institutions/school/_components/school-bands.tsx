import { Reveal, RevealItem } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Icon } from "@/components/ui/icon";
import { Eyebrow, P, Standfirst } from "@/components/ui/typography";
import type { Affiliation } from "@/lib/content";
import { CheckIcon } from "@/lib/icons";

export type SchoolStream = {
  readonly name: string;
  readonly note: string;
  readonly subjects: readonly string[];
};

export type SchoolBand = {
  readonly label: string;
  readonly affiliationSlug: string;
  readonly sinceLabel: string;
  readonly enrolment: string | null;
  readonly body: string;
  readonly notes: readonly string[];
  readonly streams: readonly SchoolStream[];
};

export type SchoolBandsCopy = {
  readonly eyebrow: string;
  readonly heading: string;
  readonly standfirst: string;
  readonly primary: SchoolBand;
  readonly secondary: SchoolBand;
};

function BandRung({
  affiliations,
  band,
}: {
  readonly affiliations: readonly Affiliation[];
  readonly band: SchoolBand;
}) {
  const affiliation =
    affiliations.find((item) => item.slug === band.affiliationSlug) ?? null;

  return (
    <RevealItem className="grid gap-y-8 border-b border-border py-10 lg:grid-cols-12 lg:gap-x-10 lg:py-16">
      <div className="lg:col-span-4">
        <h3 className="font-display text-5xl font-normal text-balance text-ink">
          {band.label}
        </h3>

        {affiliation === null ? null : (
          <p className="mt-5 font-body text-xs font-medium tracking-widest text-accent uppercase">
            {band.sinceLabel} {affiliation.sinceYear}
          </p>
        )}

        {band.enrolment === null ? null : (
          <p className="mt-3 font-body text-sm text-ink-muted">
            {band.enrolment}
          </p>
        )}
      </div>

      <div className="lg:col-span-7 lg:col-start-6">
        <P className="max-w-2xl text-lg text-ink">{band.body}</P>

        {band.notes.length === 0 ? null : (
          <ul className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {band.notes.map((note) => (
              <li
                className="flex gap-3 font-body text-sm text-ink-muted"
                key={note}
              >
                <Icon
                  className="mt-1 size-4 shrink-0 text-accent"
                  icon={CheckIcon}
                />
                {note}
              </li>
            ))}
          </ul>
        )}

        {band.streams.length === 0 ? null : (
          <div className="mt-12 grid gap-10 sm:grid-cols-2">
            {band.streams.map((stream) => (
              <div className="border-t border-border pt-6" key={stream.name}>
                <h4 className="font-display text-2xl font-normal text-ink">
                  {stream.name}
                </h4>
                <p className="mt-3 font-body text-sm text-ink-muted">
                  {stream.note}
                </p>
                <ul className="mt-6 flex flex-col gap-2">
                  {stream.subjects.map((subject) => (
                    <li
                      className="font-body text-sm text-ink-muted"
                      key={subject}
                    >
                      {subject}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </RevealItem>
  );
}

export function SchoolBands({
  affiliations,
  copy,
  id,
}: {
  readonly affiliations: readonly Affiliation[];
  readonly copy: SchoolBandsCopy;
  readonly id?: string;
}) {
  return (
    <section className="field-teal gutter-x section-y" id={id}>
      <div className="mx-auto max-w-page">
        <Reveal stagger={0.08}>
          <RevealItem className="flex items-center gap-5">
            <Eyebrow>{copy.eyebrow}</Eyebrow>
            <span className="h-px flex-1 bg-border" />
          </RevealItem>

          <SplitText
            as="h2"
            className="mt-6 max-w-4xl font-display text-5xl font-normal text-balance text-ink lg:mt-8"
          >
            {copy.heading}
          </SplitText>

          <RevealItem className="mt-6 max-w-2xl">
            <Standfirst>{copy.standfirst}</Standfirst>
          </RevealItem>
        </Reveal>

        <Reveal
          className="mt-14 border-t border-border lg:mt-20"
          stagger={0.1}
          y={28}
        >
          <BandRung affiliations={affiliations} band={copy.primary} />

          <BandRung affiliations={affiliations} band={copy.secondary} />
        </Reveal>
      </div>
    </section>
  );
}
