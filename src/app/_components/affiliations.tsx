import type { Route } from "next";
import Link from "next/link";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Eyebrow, H5, H6, P, Standfirst } from "@/components/ui/typography";
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

        <SplitText
          as="h2"
          className="mt-6 font-display text-5xl font-semibold lg:mt-8"
        >
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

function AffiliationEntry({ item }: { item: Affiliation }) {
  return (
    <li className="border-t pt-6" data-reveal-item="">
      <Eyebrow as="span" className="block">{`Since ${item.sinceYear}`}</Eyebrow>
      <H6 as="h3" className="mt-4">
        {item.body}
      </H6>
      <P className="mt-3 text-sm">{item.scope}</P>
      {item.note === null ? null : (
        <p className="mt-3 font-body text-sm font-medium text-accent">
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

export async function Affiliations() {
  const [copy, affiliations, partners] = await Promise.all([
    content.getHomeCopy(),
    content.getAffiliations(),
    content.getPartners(),
  ]);

  const accreditation = copy.sections.affiliations;
  const industry = copy.sections.partners;
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

        {affiliations.length === 0 ? (
          accreditation.emptyState === null ? null : (
            <P className="mt-12 lg:w-5/12">{accreditation.emptyState}</P>
          )
        ) : (
          <Reveal className="mt-12 lg:mt-16" delay={0.4} stagger={0.08}>
            <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {affiliations.map((item) => (
                <AffiliationEntry item={item} key={item.id} />
              ))}
            </ul>
          </Reveal>
        )}

        <section
          className="mt-20 border-t pt-16 lg:mt-28 lg:pt-20"
          id="partners"
        >
          <SectionHead copy={industry} />

          {partners.length === 0 && industry.emptyState !== null ? (
            <P className="mt-12 lg:w-5/12">{industry.emptyState}</P>
          ) : null}

          {leadPartners.length === 0 ? null : (
            <Reveal
              className="mt-12 grid gap-x-8 gap-y-8 lg:mt-16 lg:grid-cols-2"
              delay={0.4}
              stagger={0.08}
            >
              {leadPartners.map((partner) => (
                <RevealItem key={partner.id}>
                  <H5 as="h3">
                    <PartnerName partner={partner} />
                  </H5>
                  {partner.blurb === null ? null : (
                    <P className="mt-3 text-sm">{partner.blurb}</P>
                  )}
                </RevealItem>
              ))}
            </Reveal>
          )}

          {networkPartners.length === 0 ? null : (
            <Reveal className="mt-12 border-t pt-10 lg:mt-16">
              <ul className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
                {networkPartners.map((partner, index) => (
                  <li className="flex items-baseline gap-x-5" key={partner.id}>
                    <H6 as="span">
                      <PartnerName partner={partner} />
                    </H6>
                    {index === networkPartners.length - 1 ? null : (
                      <span
                        aria-hidden="true"
                        className="font-body text-base text-accent"
                      >
                        /
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
        </section>
      </div>
    </section>
  );
}
