import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeader } from "@/components/shared/section-header";
import type { Affiliation } from "@/lib/content";

export type InstitutionAwardingCopy = {
  readonly eyebrow: string;
  readonly heading: string;
  readonly standfirst: string;
  readonly sinceLabel: string;
};

function logoSrcOf(logo: Affiliation["logo"]): string | null {
  if (logo === null) return null;
  return typeof logo === "string" ? logo : logo.src;
}

function selectAwardingBodies(
  affiliations: readonly Affiliation[],
  levelSlug: string,
): readonly Affiliation[] {
  return affiliations
    .filter((item) => item.levelSlug === levelSlug)
    .sort((first, second) => first.sinceYear - second.sinceYear);
}

function SinglePartnerCard({
  item,
  sinceLabel,
}: {
  readonly item: Affiliation;
  readonly sinceLabel: string;
}) {
  const logo = logoSrcOf(item.logo);

  return (
    <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-surface-raised p-6 shadow-xs sm:p-8">
      <div className="grid grid-cols-1 items-center gap-6 sm:grid-cols-12 sm:gap-8">
        {/* Left: Logo & Status */}
        <div className="flex flex-col items-center sm:col-span-4 sm:items-start">
          {logo === null ? null : (
            <div className="relative h-20 w-44 rounded-xl border border-border/60 bg-white p-3 shadow-2xs">
              <Image
                alt={item.body}
                className="object-contain"
                fill
                sizes="176px"
                src={logo}
              />
            </div>
          )}
          <span className="mt-3.5 inline-flex items-center rounded-full bg-accent/10 px-3 py-1 font-body text-xs font-medium text-accent">
            {`${sinceLabel} ${item.sinceYear}`}
          </span>
        </div>

        {/* Right: Partner Details */}
        <div className="space-y-2.5 text-center sm:col-span-8 sm:text-left">
          <h3 className="font-display text-xl font-medium text-ink sm:text-2xl">
            {item.body}
          </h3>

          {item.scope === null ? null : (
            <p className="font-body text-sm text-ink-muted leading-relaxed sm:text-base">
              {item.scope}
            </p>
          )}

          {item.note === null ? null : (
            <div className="pt-1">
              <span className="inline-flex items-center gap-2 font-body text-xs font-medium text-accent">
                <span className="size-1.5 rounded-full bg-accent" />
                <span>{item.note}</span>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function MultiPartnerCard({
  item,
  sinceLabel,
}: {
  readonly item: Affiliation;
  readonly sinceLabel: string;
}) {
  const logo = logoSrcOf(item.logo);

  return (
    <li className="flex flex-col items-center rounded-2xl border border-border bg-surface-raised p-6 text-center shadow-xs">
      <span className="rounded-full bg-accent/10 px-3 py-1 font-body text-xs font-medium text-accent">
        {`${sinceLabel} ${item.sinceYear}`}
      </span>

      {logo === null ? null : (
        <div className="relative mt-4 h-16 w-36 rounded-xl border border-border/60 bg-white p-2.5 shadow-2xs">
          <Image
            alt={item.body}
            className="object-contain"
            fill
            sizes="144px"
            src={logo}
          />
        </div>
      )}

      <h3 className="mt-5 font-display text-lg font-medium text-ink">
        {item.body}
      </h3>

      {item.scope === null ? null : (
        <p className="mt-2 font-body text-sm text-ink-muted leading-relaxed">
          {item.scope}
        </p>
      )}

      {item.note === null ? null : (
        <span className="mt-auto pt-4 font-body text-xs font-medium text-accent">
          {item.note}
        </span>
      )}
    </li>
  );
}

export function InstitutionAwarding({
  affiliations,
  copy,
  id,
  levelSlug,
}: {
  readonly affiliations: readonly Affiliation[];
  readonly copy: InstitutionAwardingCopy;
  readonly id?: string;
  readonly levelSlug: string;
}) {
  const awardingBodies = selectAwardingBodies(affiliations, levelSlug);
  const firstBody = awardingBodies[0];

  if (!firstBody) return null;

  return (
    <section className="gutter-x section-y border-t border-border/40" id={id}>
      <div className="mx-auto max-w-page">
        <SectionHeader
          description={copy.standfirst}
          eyebrow={copy.heading}
          title={copy.eyebrow ?? "Awarding Body"}
        />

        <Reveal className="mt-8 sm:mt-10 lg:mt-12" y={16}>
          {awardingBodies.length === 1 ? (
            <SinglePartnerCard item={firstBody} sinceLabel={copy.sinceLabel} />
          ) : (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {awardingBodies.map((item) => (
                <MultiPartnerCard
                  item={item}
                  key={item.id}
                  sinceLabel={copy.sinceLabel}
                />
              ))}
            </ul>
          )}
        </Reveal>
      </div>
    </section>
  );
}
