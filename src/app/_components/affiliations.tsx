import type { Route } from "next";
import Link from "next/link";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Eyebrow, H1, H5, H6, P, Standfirst } from "@/components/ui/typography";
import type { Affiliation, Partner, SectionCopy } from "@/lib/content";
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
    <li className="relative border-t pt-6" data-reveal-item="">
      <span
        aria-hidden="true"
        className="absolute -top-px left-0 h-0.5 w-10 bg-accent"
      />
      <Eyebrow as="span" className="block text-ink-muted">
        Since
      </Eyebrow>
      <H1 as="p" className="mt-2 text-accent">
        {item.sinceYear}
      </H1>
      <H6 as="h3" className="mt-4">
        {item.body}
      </H6>
      <P className="mt-3 text-sm">{item.scope}</P>
      {item.note === null ? null : (
        <p className="mt-5 inline-block rounded-lg border px-3 py-2 font-body text-xs text-ink">
          {item.note}
        </p>
      )}
    </li>
  );
}

function PartnerName({ partner }: { partner: Partner }) {
  if (partner.href === null) return <>{partner.name}</>;

  return (
    <Link
      className="transition-colors hover:text-accent motion-reduce:transition-none"
      href={partner.href as Route}
      rel="noopener noreferrer"
      target="_blank"
    >
      {partner.name}
    </Link>
  );
}

function LeadPartner({ partner }: { partner: Partner }) {
  return (
    <RevealItem className="border-t pt-6">
      <Eyebrow as="span" className="block">
        {partner.kind}
      </Eyebrow>
      <H5 as="h3" className="mt-4">
        <PartnerName partner={partner} />
      </H5>
      {partner.blurb === null ? null : (
        <P className="mt-3 text-sm">{partner.blurb}</P>
      )}
    </RevealItem>
  );
}

export async function Affiliations() {
  const [copy, affiliations, partners] = await Promise.all([
    content.getHomeCopy(),
    content.getAffiliations(),
    content.getPartners(),
  ]);

  const accreditation = copy.sections.affiliations;
  const industry = copy.sections.partners;
  const timeline = [...affiliations].sort((a, b) => a.sinceYear - b.sinceYear);
  const leadPartners = partners.filter(
    (partner) => partner.kind !== "industry",
  );
  const networkPartners = partners.filter(
    (partner) => partner.kind === "industry",
  );

  return (
    <section className="gutter-x section-y" id="affiliations">
      <div className="mx-auto max-w-page">
        <SectionHead copy={accreditation} />

        {timeline.length === 0 ? (
          accreditation.emptyState === null ? null : (
            <P className="mt-12 lg:w-5/12">{accreditation.emptyState}</P>
          )
        ) : (
          <Reveal
            className="field-ink mt-12 rounded-3xl p-8 sm:p-10 lg:mt-16 lg:p-12 xl:p-14"
            delay={0.2}
            stagger={0.08}
          >
            <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
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
