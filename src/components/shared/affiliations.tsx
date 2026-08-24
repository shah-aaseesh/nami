import Image from "next/image";
import { Marquee } from "@/components/motion/marquee";
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

        <SplitText as="h2" className="mt-4 lg:mt-6">
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

function logoSrcOf(logo: Affiliation["logo"]): string | null {
  if (logo === null) return null;
  return typeof logo === "string" ? logo : logo.src;
}

function AffiliationMark({ item }: { item: Affiliation }) {
  const logo = logoSrcOf(item.logo);

  if (logo === null) {
    return (
      <p className="flex h-20 w-40 shrink-0 items-center justify-center text-center font-display text-base text-ink lg:h-24 lg:w-48">
        {item.body}
      </p>
    );
  }

  return (
    <div className="relative h-20 w-40 shrink-0 lg:h-24 lg:w-48">
      <Image
        alt={item.body}
        className="object-contain"
        fill
        sizes="192px"
        src={logo}
      />
    </div>
  );
}

function AffiliationRow({ items }: { items: readonly Affiliation[] }) {
  return (
    <div className="flex items-center gap-10 pe-10 lg:gap-14 lg:pe-14">
      {items.map((item) => (
        <AffiliationMark item={item} key={item.id} />
      ))}
    </div>
  );
}

function deduplicateAffiliations(
  items: readonly Affiliation[],
): readonly Affiliation[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = `${item.body}::${logoSrcOf(item.logo)}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export async function Affiliations({ section }: { section: SectionCopy }) {
  const affiliations = await content.getAffiliations();
  const timeline = deduplicateAffiliations(
    [...affiliations].sort((a, b) => a.sinceYear - b.sinceYear),
  );

  return (
    <section className="gutter-x section-y" id="affiliations">
      <div className="mx-auto max-w-page">
        <SectionHead copy={section} />

        {timeline.length === 0 ? (
          section.emptyState === null ? null : (
            <P className="mt-12 lg:w-5/12">{section.emptyState}</P>
          )
        ) : (
          <Reveal className="mt-10 lg:mt-14" y={32}>
            <Marquee
              copies={3}
              label={section.eyebrow ?? section.heading}
              speed={45}
            >
              <AffiliationRow items={timeline} />
            </Marquee>
          </Reveal>
        )}
      </div>
    </section>
  );
}
