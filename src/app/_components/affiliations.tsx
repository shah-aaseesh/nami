import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Eyebrow, P, Standfirst } from "@/components/ui/typography";
import type { Affiliation, SectionCopy } from "@/lib/content";
import { content } from "@/lib/content";

function SectionHead({ copy }: { copy: SectionCopy }) {
  return (
    <div className="lg:grid lg:grid-cols-12 lg:items-end lg:gap-x-8">
      <div className="lg:col-span-7">
        {copy.eyebrow === null ? null : (
          <Reveal className="flex items-center gap-5">
            <Eyebrow>{copy.eyebrow}</Eyebrow>
            <span className="h-px flex-1 bg-border" />
          </Reveal>
        )}

        <SplitText as="h2" className="mt-6 font-display text-5xl lg:mt-8">
          {copy.heading}
        </SplitText>
      </div>

      {copy.standfirst === null ? null : (
        <Reveal
          className="mt-8 lg:col-span-4 lg:col-start-9 lg:mt-0"
          delay={0.25}
        >
          <Standfirst>{copy.standfirst}</Standfirst>
        </Reveal>
      )}
    </div>
  );
}

function AffiliationStation({ item }: { item: Affiliation }) {
  return (
    <li
      className="relative border-t border-border-strong pt-8 flex flex-col h-full"
      data-reveal-item=""
    >
      <span
        aria-hidden="true"
        className="absolute -top-px left-0 h-0.5 w-12 bg-accent"
      />

      {item.logo && (
        <div className="relative h-16 w-full max-w-[160px] mb-8">
          <Image
            src={typeof item.logo === "string" ? item.logo : item.logo.src}
            alt={item.body}
            fill
            sizes="160px"
            className="object-contain object-left"
          />
        </div>
      )}

      <div className="flex flex-col flex-1">
        <Eyebrow
          as="span"
          className="block text-ink-muted uppercase tracking-widest text-xs"
        >
          Since
        </Eyebrow>
        <p className="mt-2 font-display text-4xl text-accent">
          {item.sinceYear}
        </p>
        <h3 className="mt-6 font-display text-2xl font-medium text-ink">
          {item.body}
        </h3>
        <p className="mt-3 text-sm text-ink-muted leading-relaxed">
          {item.scope}
        </p>

        {item.note && (
          <p className="mt-auto pt-6 text-xs font-medium text-ink-muted opacity-80">
            {item.note}
          </p>
        )}
      </div>
    </li>
  );
}

export async function Affiliations() {
  const [copy, affiliations] = await Promise.all([
    content.getHomeCopy(),
    content.getAffiliations(),
  ]);

  const accreditation = copy.sections.affiliations;
  const timeline = [...affiliations].sort((a, b) => a.sinceYear - b.sinceYear);

  return (
    <section className="gutter-x section-y" id="affiliations">
      <div className="mx-auto max-w-page">
        <SectionHead copy={accreditation} />

        {timeline.length === 0 ? (
          accreditation.emptyState === null ? null : (
            <P className="mt-12 lg:w-5/12">{accreditation.emptyState}</P>
          )
        ) : (
          <Reveal className="mt-12 lg:mt-16" delay={0.2} stagger={0.08}>
            <ul className="grid gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
              {timeline.map((item) => (
                <AffiliationStation item={item} key={item.id} />
              ))}
            </ul>
          </Reveal>
        )}
      </div>
    </section>
  );
}
