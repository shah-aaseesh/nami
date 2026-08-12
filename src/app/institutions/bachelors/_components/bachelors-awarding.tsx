import Image from "next/image";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Eyebrow, Standfirst } from "@/components/ui/typography";
import type { Affiliation, ContentId } from "@/lib/content";
import { contentId } from "@/lib/content";

export type BachelorsAwardingCopy = {
  readonly eyebrow: string;
  readonly heading: string;
  readonly standfirst: string;
  readonly sinceLabel: string;
  readonly offerNote: string;
};

const EVIDENCED_AWARDING_BODY_IDS: ReadonlySet<ContentId> = new Set([
  contentId("northampton"),
  contentId("kathmandu-university"),
]);

function logoSrcOf(logo: Affiliation["logo"]): string | null {
  if (logo === null) return null;
  return typeof logo === "string" ? logo : logo.src;
}

function selectAwardingBodies(
  affiliations: readonly Affiliation[],
  levelSlug: string,
): readonly Affiliation[] {
  return affiliations
    .filter(
      (item) =>
        item.levelSlug === levelSlug &&
        EVIDENCED_AWARDING_BODY_IDS.has(item.id),
    )
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
    <li className="flex flex-col items-center rounded-3xl border border-border bg-surface-raised p-6 text-center xl:p-8">
      <Eyebrow
        as="span"
        className="rounded-full bg-surface px-3 py-1 ring-1 ring-border"
      >
        {`${sinceLabel} ${item.sinceYear}`}
      </Eyebrow>

      {logo === null ? null : (
        <div className="mt-4 flex w-full items-center justify-center rounded-2xl bg-surface p-4">
          <div className="relative h-16 w-32 md:h-20 md:w-40">
            <Image
              alt={item.body}
              className="object-contain"
              fill
              sizes="(max-width: 639px) 128px, 160px"
              src={logo}
            />
          </div>
        </div>
      )}

      <h3 className="mt-6 font-display text-2xl font-normal text-balance text-ink">
        {item.body}
      </h3>

      <p className="mt-3 font-body text-sm text-pretty text-ink-muted">
        {item.scope}
      </p>

      {item.note === null ? null : (
        <Eyebrow className="mt-auto pt-4">{item.note}</Eyebrow>
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
    <section className="gutter-x section-y" id={id}>
      <div className="mx-auto max-w-page">
        <div className="grid items-start gap-x-10 gap-y-12 lg:grid-cols-2 lg:gap-x-8 xl:grid-cols-12 xl:gap-x-16">
          <Reveal className="xl:col-span-5" stagger={0.08}>
            <RevealItem className="flex items-center gap-5">
              <Eyebrow>{copy.eyebrow}</Eyebrow>
              <span className="h-px flex-1 bg-border" />
            </RevealItem>

            <SplitText
              as="h2"
              className="mt-6 font-display text-4xl font-normal text-balance text-ink lg:mt-8 xl:text-5xl"
            >
              {copy.heading}
            </SplitText>

            <RevealItem className="mt-6 max-w-xl">
              <Standfirst>{copy.standfirst}</Standfirst>
            </RevealItem>
          </Reveal>

          <Reveal
            className="xl:col-span-6 xl:col-start-7"
            stagger={0.12}
            y={24}
          >
            <ul className="grid gap-4 xl:gap-6 sm:grid-cols-2">
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
      </div>
    </section>
  );
}
