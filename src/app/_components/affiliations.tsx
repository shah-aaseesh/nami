import type { Route } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Eyebrow, H3, H4, H5, P, Standfirst } from "@/components/ui/typography";
import type { Affiliation, Partner, SectionCopy } from "@/lib/content";
import { content } from "@/lib/content";
import { cn } from "@/lib/utils";

function SectionHead({
  copy,
  standfirstClassName,
}: {
  copy: SectionCopy;
  standfirstClassName: string;
}) {
  return (
    <>
      {copy.eyebrow === null ? null : (
        <Reveal className="flex items-center gap-5 lg:w-7/12">
          <Eyebrow>{copy.eyebrow}</Eyebrow>
          <span className="h-px flex-1 bg-border" />
        </Reveal>
      )}

      <SplitText
        as="h2"
        className="mt-8 font-display text-5xl font-semibold lg:mt-12 lg:w-8/12"
      >
        {copy.heading}
      </SplitText>

      {copy.standfirst === null ? null : (
        <Reveal className={standfirstClassName} delay={0.25}>
          <Standfirst>{copy.standfirst}</Standfirst>
        </Reveal>
      )}
    </>
  );
}

function AffiliationRow({ item }: { item: Affiliation }) {
  return (
    <li
      className="grid gap-y-6 border-t py-10 lg:grid-cols-12 lg:gap-x-8 lg:py-12"
      data-reveal-item=""
    >
      <p className="lg:col-span-2">
        <span className="block font-body text-sm text-ink-muted">Since</span>
        <H3 as="span" className="block">
          {item.sinceYear}
        </H3>
      </p>

      <H4 as="h3" className="lg:col-span-5 lg:col-start-4">
        {item.body}
      </H4>

      <div className="lg:col-span-3 lg:col-start-10">
        <P>{item.scope}</P>
        {item.note === null ? null : (
          <p className="mt-4 font-body text-sm font-medium text-accent">
            {item.note}
          </p>
        )}
      </div>
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

function LeadPartner({ partner, index }: { partner: Partner; index: number }) {
  return (
    <li
      className={cn(
        "lg:col-span-5",
        index % 2 === 0 ? "lg:col-start-1" : "lg:col-start-8 lg:mt-24",
      )}
      data-reveal-item=""
    >
      <H4 as="h3">
        <PartnerName partner={partner} />
      </H4>
      {partner.blurb === null ? null : <P className="mt-4">{partner.blurb}</P>}
    </li>
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
    <>
      <section className="gutter-x section-y" id="affiliations">
        <div className="mx-auto max-w-page">
          <SectionHead
            copy={accreditation}
            standfirstClassName="mt-12 lg:mt-14 lg:ms-auto lg:w-5/12"
          />

          {affiliations.length === 0 ? null : (
            <Reveal className="mt-16 lg:mt-24" delay={0.4} stagger={0.08}>
              <ul>
                {affiliations.map((item) => (
                  <AffiliationRow item={item} key={item.id} />
                ))}
              </ul>
            </Reveal>
          )}

          {affiliations.length === 0 && accreditation.emptyState !== null ? (
            <P className="mt-16 lg:w-5/12">{accreditation.emptyState}</P>
          ) : null}
        </div>
      </section>

      <section className="gutter-x section-y" id="partners">
        <div className="mx-auto max-w-page">
          <SectionHead
            copy={industry}
            standfirstClassName="mt-12 lg:mt-14 lg:w-5/12"
          />

          {leadPartners.length === 0 ? null : (
            <Reveal className="mt-16 lg:mt-24" delay={0.4} stagger={0.08}>
              <ul className="flex flex-col gap-12 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-0">
                {leadPartners.map((partner, index) => (
                  <LeadPartner
                    index={index}
                    key={partner.id}
                    partner={partner}
                  />
                ))}
              </ul>
            </Reveal>
          )}

          {networkPartners.length === 0 ? null : (
            <Reveal className="mt-16 lg:mt-24">
              <ul className="flex flex-wrap items-baseline gap-x-6 gap-y-3">
                {networkPartners.map((partner, index) => (
                  <li className="flex items-baseline gap-x-6" key={partner.id}>
                    <H5 as="span">
                      <PartnerName partner={partner} />
                    </H5>
                    {index === networkPartners.length - 1 ? null : (
                      <span
                        aria-hidden="true"
                        className="font-body text-xl text-accent"
                      >
                        /
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </Reveal>
          )}

          {partners.length === 0 && industry.emptyState !== null ? (
            <P className="mt-16 lg:w-5/12">{industry.emptyState}</P>
          ) : null}
        </div>
      </section>
    </>
  );
}
