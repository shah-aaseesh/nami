"use client";

import Image from "next/image";
import { Parallax } from "@/components/motion/parallax";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { H2, P, Standfirst } from "@/components/ui/typography";
import type { CampusLifePillar } from "@/lib/content";
import { paragraphsOf } from "@/lib/content/rich-text";

import { CampusLifePin } from "./campus-life-pin";

export function CampusLifeList({
  pillars,
}: {
  pillars: readonly CampusLifePillar[];
}) {
  return (
    <div className="flex flex-col">
      {pillars.map((pillar, index) => {
        const isEven = index % 2 === 0;
        const number = String(index + 1).padStart(2, "0");
        const paragraphs = paragraphsOf(pillar.body);

        return (
          <section
            key={pillar.id}
            id={pillar.id}
            className="gutter-x section-y border-t border-border first:border-0"
          >
            <div className="mx-auto max-w-page">
              <Reveal className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
                <CampusLifePin
                  className={`lg:col-span-5 ${
                    isEven ? "lg:col-start-1" : "lg:col-start-8"
                  }`}
                >
                  <RevealItem>
                    <span className="mb-6 block font-display text-4xl text-accent sm:text-5xl">
                      {number}
                    </span>
                    <H2>{pillar.title}</H2>
                  </RevealItem>
                  <RevealItem className="mt-6">
                    <Standfirst>{pillar.lead}</Standfirst>
                  </RevealItem>
                </CampusLifePin>

                <div
                  className={`lg:col-span-6 lg:pt-16 ${
                    isEven ? "lg:col-start-7" : "lg:col-start-1 lg:row-start-1"
                  }`}
                >
                  <RevealItem className="flex flex-col gap-5">
                    {paragraphs.map((p) => (
                      <P key={p}>{p}</P>
                    ))}
                  </RevealItem>

                  {pillar.highlights.length > 0 && (
                    <RevealItem className="mt-10 border-l-2 border-accent/30 pl-6">
                      <ul className="flex flex-col gap-4">
                        {pillar.highlights.map((highlight) => (
                          <li
                            key={highlight}
                            className="text-lg font-medium text-ink"
                          >
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </RevealItem>
                  )}
                </div>
              </Reveal>

              {pillar.image && (
                <Reveal className="mt-12 lg:mt-16" y={32}>
                  <Parallax
                    speed={1.05}
                    className="relative h-[34vh] w-full overflow-hidden rounded-3xl lg:h-[48vh]"
                  >
                    <Image
                      src={
                        typeof pillar.image === "string"
                          ? pillar.image
                          : pillar.image.src
                      }
                      alt={pillar.image.alt || pillar.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 1200px"
                    />
                  </Parallax>
                </Reveal>
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}
