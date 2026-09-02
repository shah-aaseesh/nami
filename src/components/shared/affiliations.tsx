import Image from "next/image";
import { Marquee } from "@/components/motion/marquee";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { P } from "@/components/ui/typography";
import type { Affiliation, SectionCopy } from "@/lib/content";
import { content } from "@/lib/content";

function SectionHead({ copy }: { copy: SectionCopy }) {
  return (
    <SectionHeader
      eyebrow={copy.heading}
      title={copy.eyebrow}
      description={copy.standfirst}
    />
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
      <p className="flex h-12 w-24 shrink-0 items-center justify-center text-center font-display text-xs text-ink sm:h-18 sm:w-36 sm:text-sm lg:h-24 lg:w-48 lg:text-base">
        {item.body}
      </p>
    );
  }

  return (
    <div className="relative h-12 w-24 shrink-0 sm:h-18 sm:w-36 lg:h-24 lg:w-48">
      <Image
        alt={item.body}
        className="object-contain"
        fill
        sizes="(min-width: 1024px) 192px, (min-width: 640px) 144px, 96px"
        src={logo}
      />
    </div>
  );
}

function AffiliationRow({ items }: { items: readonly Affiliation[] }) {
  return (
    <div className="flex items-center gap-5 pe-5 sm:gap-10 sm:pe-10 lg:gap-14 lg:pe-14">
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
    <section className="gutter-x section-y-compact" id="affiliations">
      <div className="mx-auto max-w-page">
        <SectionHead copy={section} />

        {timeline.length === 0 ? (
          section.emptyState === null ? null : (
            <P className="mt-6 lg:w-5/12">{section.emptyState}</P>
          )
        ) : (
          <Reveal className="mt-6 sm:mt-8" y={16}>
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
