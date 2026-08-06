import Image from "next/image";
import { Parallax } from "@/components/motion/parallax";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Eyebrow, H3, H5, P, Standfirst } from "@/components/ui/typography";
import type { RichText } from "@/lib/content";
import { content } from "@/lib/content";
import { cn } from "@/lib/utils";

const LEDGER_PLACEMENT = [
  "lg:col-span-7",
  "lg:col-span-4 lg:col-start-9",
  "lg:col-span-5 lg:col-start-2",
  "lg:col-span-6 lg:col-start-7",
];

function Prose({ body }: { body: RichText }) {
  // The html arm is the WordPress path; rendering it needs a sanitizer that does not exist yet.
  if (body.kind === "html") return null;

  return (
    <div className="flex flex-col gap-4">
      {body.paragraphs.map((paragraph) => (
        <P key={paragraph}>{paragraph}</P>
      ))}
    </div>
  );
}

function Highlights({
  className,
  items,
}: {
  className?: string;
  items: readonly string[];
}) {
  if (items.length === 0) return null;

  return (
    <ul className={cn("grid gap-x-8 gap-y-4", className)}>
      {items.map((item) => (
        <li
          className="border-t pt-4 font-body text-sm text-ink-muted"
          key={item}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

export async function CampusLife() {
  const [copy, pillars] = await Promise.all([
    content.getHomeCopy(),
    content.getCampusLife(),
  ]);

  const section = copy.sections.campusLife;
  const feature = pillars[0] ?? null;
  const ledger = pillars.slice(1);
  const band = pillars.find((pillar) => pillar.image !== null)?.image ?? null;

  return (
    <section
      className="field-ink relative isolate overflow-hidden gutter-x section-y"
      id="campus-life"
    >
      <div className="mx-auto max-w-page">
        {section.eyebrow === null ? null : (
          <Reveal className="flex items-center gap-5 lg:w-7/12">
            <Eyebrow>{section.eyebrow}</Eyebrow>
            <span className="h-px flex-1 bg-border" />
          </Reveal>
        )}

        <SplitText
          as="h2"
          className="mt-8 font-display text-5xl font-semibold lg:mt-12 lg:w-8/12"
        >
          {section.heading}
        </SplitText>

        {band === null ? null : (
          <figure className="mt-14 lg:absolute lg:inset-y-0 lg:right-0 lg:-z-10 lg:mt-0 lg:w-5/12">
            <div className="relative aspect-video overflow-hidden lg:aspect-auto lg:h-full">
              <Parallax className="absolute inset-0" speed={0.97}>
                <Image
                  alt={band.alt}
                  className="scale-110 object-cover"
                  fill
                  loading="lazy"
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  src={band.src}
                />
              </Parallax>
              <span className="pointer-events-none absolute inset-0 hidden bg-linear-to-r from-surface from-20% to-transparent to-70% lg:block" />
            </div>
          </figure>
        )}

        {pillars.length === 0 && section.emptyState !== null ? (
          <P className="mt-16 lg:w-5/12">{section.emptyState}</P>
        ) : null}

        {feature === null ? null : (
          <Reveal
            className="mt-16 flex flex-col gap-8 lg:mt-24 lg:w-7/12"
            delay={0.25}
            stagger={0.08}
          >
            <RevealItem>
              <H3>{feature.title}</H3>
            </RevealItem>
            <RevealItem>
              <Standfirst>{feature.lead}</Standfirst>
            </RevealItem>
            <RevealItem>
              <Prose body={feature.body} />
            </RevealItem>
            <RevealItem>
              <Highlights
                className="sm:grid-cols-2"
                items={feature.highlights}
              />
            </RevealItem>
          </Reveal>
        )}

        {ledger.length === 0 ? null : (
          <Reveal
            className="mt-16 grid gap-x-8 gap-y-10 lg:mt-24 lg:w-8/12 lg:grid-cols-12"
            delay={0.4}
            stagger={0.08}
          >
            {ledger.map((pillar, index) => (
              <RevealItem
                className={cn(
                  "flex flex-col gap-8 border-t border-border-strong pt-8",
                  LEDGER_PLACEMENT[index % LEDGER_PLACEMENT.length],
                )}
                key={pillar.id}
              >
                <H5 as="h3">{pillar.title}</H5>
                <P>{pillar.lead}</P>
                <Highlights items={pillar.highlights} />
              </RevealItem>
            ))}
          </Reveal>
        )}
      </div>
    </section>
  );
}
