import Image from "next/image";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Eyebrow, P, Standfirst } from "@/components/ui/typography";
import type { Affiliation, SectionCopy } from "@/lib/content";
import { content } from "@/lib/content";

function SectionHead({ copy }: { copy: SectionCopy }) {
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

        <SplitText as="h2" className="mt-4 font-display text-5xl lg:mt-6">
          {copy.heading}
        </SplitText>
      </div>

      {copy.standfirst === null ? null : (
        <RevealItem className="mt-6 lg:col-span-4 lg:col-start-9 lg:mt-0">
          <Standfirst>{copy.standfirst}</Standfirst>
        </RevealItem>
      )}
    </Reveal>
  );
}

function AffiliationStation({ item }: { item: Affiliation }) {
  return (
    <li
      className="group relative border-t border-border-strong pt-6 flex flex-col h-full transition-transform duration-500 ease-out hover:-translate-y-2"
      data-reveal-item=""
    >
      <span
        aria-hidden="true"
        className="absolute -top-px left-0 h-0.5 w-12 bg-accent transition-all duration-500 ease-out group-hover:w-full"
      />

      {item.logo && (
        <div className="relative h-16 w-full max-w-[160px] mb-6">
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
        <p className="mt-1.5 font-display text-4xl text-accent">
          {item.sinceYear}
        </p>
        <h3 className="mt-4 font-display text-2xl font-medium text-ink">
          {item.body}
        </h3>
        <p className="mt-2 text-sm text-ink-muted leading-relaxed">
          {item.scope}
        </p>

        {item.note && (
          <p className="mt-auto pt-4 text-xs font-medium text-ink-muted opacity-80">
            {item.note}
          </p>
        )}
      </div>
    </li>
  );
}

export async function Affiliations({ section }: { section: SectionCopy }) {
  const affiliations = await content.getAffiliations();
  const timeline = [...affiliations].sort((a, b) => a.sinceYear - b.sinceYear);

  return (
    <section className="gutter-x section-y" id="affiliations">
      <div className="mx-auto max-w-page">
        <SectionHead copy={section} />

        {timeline.length === 0 ? (
          section.emptyState === null ? null : (
            <P className="mt-12 lg:w-5/12">{section.emptyState}</P>
          )
        ) : (
          <Reveal className="mt-8 lg:mt-10" stagger={0.08}>
            <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
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
