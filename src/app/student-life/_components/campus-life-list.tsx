import Image from "next/image";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { H3, P } from "@/components/ui/typography";
import type { CampusLifePillar } from "@/lib/content";
import { paragraphsOf } from "@/lib/content/rich-text";

export function CampusLifeList({
  pillars,
}: {
  pillars: readonly CampusLifePillar[];
}) {
  return (
    <div className="mt-24 flex flex-col gap-y-24 lg:gap-y-40">
      {pillars.map((pillar, index) => {
        const isEven = index % 2 === 0;
        const paragraphs = paragraphsOf(pillar.body);

        return (
          <Reveal
            key={pillar.id}
            className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-x-10"
          >
            <div
              className={`lg:col-span-5 lg:flex lg:flex-col lg:justify-center ${
                isEven ? "lg:col-start-1" : "lg:col-start-8"
              }`}
            >
              <RevealItem>
                <H3>{pillar.title}</H3>
              </RevealItem>
              <RevealItem>
                <p className="mt-4 text-xl font-medium text-ink-muted">
                  {pillar.lead}
                </p>
              </RevealItem>
              <RevealItem className="mt-6 flex flex-col gap-4">
                {paragraphs.map((p) => (
                  <P key={p}>{p}</P>
                ))}
              </RevealItem>
              {pillar.highlights.length > 0 && (
                <RevealItem className="mt-8">
                  <ul className="flex flex-col gap-3">
                    {pillar.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex items-start gap-3 text-ink-muted"
                      >
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </RevealItem>
              )}
            </div>

            <RevealItem
              className={`relative aspect-square w-full overflow-hidden rounded-xl bg-surface-raised lg:col-span-6 lg:aspect-auto lg:h-[600px] ${
                isEven
                  ? "lg:col-start-7 lg:row-start-1"
                  : "lg:col-start-1 lg:row-start-1"
              }`}
            >
              {pillar.image ? (
                <Image
                  src={pillar.image}
                  alt={pillar.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-surface-raised p-8 text-center text-ink-muted">
                  <span className="text-sm uppercase tracking-widest opacity-50">
                    Media coming soon
                  </span>
                </div>
              )}
            </RevealItem>
          </Reveal>
        );
      })}
    </div>
  );
}
