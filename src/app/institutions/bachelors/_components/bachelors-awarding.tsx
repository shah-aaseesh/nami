import Image from "next/image";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Eyebrow, Standfirst } from "@/components/ui/typography";
import type { Affiliation } from "@/lib/content";

export type BachelorsAwardingCopy = {
  readonly eyebrow: string;
  readonly heading: string;
  readonly standfirst: string;
  readonly sinceLabel: string;
  readonly offerNote: string;
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

function AwardingBodyCard({
  item,
  sinceLabel,
}: {
  readonly item: Affiliation;
  readonly sinceLabel: string;
}) {
  const logo = logoSrcOf(item.logo);

  return (
    <li className="flex flex-col items-center rounded-3xl bg-primary-100 p-6 text-center xl:p-8">
      <Eyebrow
        as="span"
        className="rounded-full bg-primary-200 px-3 py-1 text-primary-800"
      >
        {`${sinceLabel} ${item.sinceYear}`}
      </Eyebrow>

      {logo === null ? null : (
        <div className="mt-4 flex w-full items-center justify-center rounded-2xl bg-neutral-50 p-4">
          <div className="relative h-16 w-32 md:h-20 md:w-40">
            <Image
              alt={item.body}
              className="object-contain"
              fill
              sizes="(max-width: 767px) 128px, 160px"
              src={logo}
            />
          </div>
        </div>
      )}

      <h3 className="mt-6 font-display text-2xl font-normal text-balance text-primary-800">
        {item.body}
      </h3>

      <p className="mt-3 font-body text-sm text-pretty text-neutral-700">
        {item.scope}
      </p>

      {item.note === null ? null : (
        <Eyebrow className="mt-auto pt-4 text-primary-700">{item.note}</Eyebrow>
      )}
    </li>
  );
}

export function BachelorsAwarding({
  affiliations,
  copy,
  id,
  levelSlug,
}: {
  readonly affiliations: readonly Affiliation[];
  readonly copy: BachelorsAwardingCopy;
  readonly id?: string;
  readonly levelSlug: string;
}) {
  const awardingBodies = selectAwardingBodies(affiliations, levelSlug);

  if (awardingBodies.length === 0) return null;

  return (
    <section className="field-brand gutter-x section-y" id={id}>
      <div className="mx-auto max-w-page">
        <Reveal stagger={0.08}>
          <RevealItem className="flex items-center gap-5">
            <Eyebrow>{copy.eyebrow}</Eyebrow>
            <span className="h-px flex-1 bg-border" />
          </RevealItem>

          <div className="mt-6 flex flex-col gap-6 lg:mt-8 lg:flex-row lg:items-end lg:justify-between lg:gap-x-16">
            <SplitText
              as="h2"
              className="font-display text-4xl font-normal text-balance text-ink lg:max-w-2xl lg:text-5xl"
            >
              {copy.heading}
            </SplitText>

            <RevealItem className="lg:max-w-md">
              <Standfirst>{copy.standfirst}</Standfirst>
            </RevealItem>
          </div>
        </Reveal>

        <Reveal className="mt-14 lg:mt-20" stagger={0.12} y={24}>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {awardingBodies.map((item) => (
              <AwardingBodyCard
                item={item}
                key={item.id}
                sinceLabel={copy.sinceLabel}
              />
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
