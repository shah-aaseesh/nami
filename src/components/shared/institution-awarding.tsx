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
    <div className="mx-auto max-w-md rounded-3xl bg-white p-6 sm:p-8 text-center shadow-xl">
      <div className="flex flex-col items-center">
        {/* 1. Since <year> */}
        <span className="rounded-full border border-primary-100 bg-primary-50 px-3.5 py-1 font-body text-xs font-semibold text-primary-800">
          {`${sinceLabel} ${item.sinceYear}`}
        </span>

        {/* 2. Logo */}
        {logo === null ? null : (
          <div className="relative mt-5 h-20 w-44">
            <Image
              alt={item.body}
              className="object-contain"
              fill
              sizes="176px"
              src={logo}
            />
          </div>
        )}

        {/* 3. Name */}
        <h3 className="mt-5 font-display text-xl sm:text-2xl font-medium text-neutral-950">
          {item.body}
        </h3>

        {/* 4. Additional detail if present */}
        {item.note === null ? null : (
          <p className="mt-3 font-body text-xs sm:text-sm font-medium text-primary-700">
            {item.note}
          </p>
        )}
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
    <li className="flex flex-col items-center rounded-3xl bg-white p-6 sm:p-8 text-center shadow-xl">
      {/* 1. Since <year> */}
      <span className="rounded-full border border-primary-100 bg-primary-50 px-3.5 py-1 font-body text-xs font-semibold text-primary-800">
        {`${sinceLabel} ${item.sinceYear}`}
      </span>

      {/* 2. Logo */}
      {logo === null ? null : (
        <div className="relative mt-5 h-20 w-44">
          <Image
            alt={item.body}
            className="object-contain"
            fill
            sizes="176px"
            src={logo}
          />
        </div>
      )}

      {/* 3. Name */}
      <h3 className="mt-5 font-display text-xl sm:text-2xl font-medium text-neutral-950">
        {item.body}
      </h3>

      {/* 4. Additional detail if present */}
      {item.note === null ? null : (
        <span className="mt-auto pt-4 font-body text-xs sm:text-sm font-medium text-primary-700">
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
    <section className="field-brand gutter-x section-y" id={id}>
      <div className="mx-auto max-w-page">
        <SectionHeader
          description={copy.standfirst}
          eyebrow={copy.heading}
          title={copy.eyebrow ?? "Awarding Body"}
        />

        <Reveal className="mt-10 sm:mt-12 lg:mt-14" y={16}>
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
