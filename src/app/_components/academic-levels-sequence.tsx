"use client";

import Image from "next/image";
import { useRef } from "react";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { H3, P } from "@/components/ui/typography";
import type { ContentImage } from "@/lib/content";
import { FULL_MOTION_QUERY, gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

export type LevelPanel = {
  readonly id: string;
  readonly title: string;
  readonly stage: string;
  readonly paragraphs: readonly string[];
  readonly highlights: readonly string[];
  readonly campus: string | null;
  readonly image: ContentImage | null;
};

const PIN_QUERY = `${FULL_MOTION_QUERY} and (pointer: fine) and (min-width: 64rem)`;

const PANEL_WIDTH = [
  "motion-safe:pointer-fine:lg:w-224",
  "motion-safe:pointer-fine:lg:w-176",
];

const TEXT_ANCHOR = [
  "motion-safe:pointer-fine:lg:self-start",
  "motion-safe:pointer-fine:lg:self-end",
];

export function AcademicLevelsSequence({
  panels,
}: {
  panels: readonly LevelPanel[];
}) {
  const stage = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia(stage);

      mm.add(PIN_QUERY, () => {
        const frame = stage.current;
        const track = rail.current;
        if (!frame || !track) return;

        const distance = () => {
          const inset = frame.getBoundingClientRect().left;
          const visible = document.documentElement.clientWidth - inset * 2;
          return Math.max(0, track.scrollWidth - visible);
        };

        if (distance() === 0) return;

        const timeline = gsap.timeline({ defaults: { ease: "none" } });
        timeline.to(track, { x: () => -distance() }, 0);
        timeline.to(
          gsap.utils.toArray<HTMLElement>("[data-level-image]", track),
          { xPercent: 4 },
          0,
        );

        ScrollTrigger.create({
          animation: timeline,
          anticipatePin: 1,
          end: () => `+=${distance()}`,
          invalidateOnRefresh: true,
          pin: frame,
          scrub: true,
          start: "top top",
          trigger: frame,
        });
      });

      return () => mm.revert();
    },
    { scope: stage },
  );

  return (
    <div
      className="mt-16 lg:mt-24 motion-safe:pointer-fine:lg:flex motion-safe:pointer-fine:lg:h-svh motion-safe:pointer-fine:lg:py-16"
      ref={stage}
    >
      <ol
        className="flex flex-col gap-20 motion-safe:pointer-fine:lg:h-full motion-safe:pointer-fine:lg:w-max motion-safe:pointer-fine:lg:shrink-0 motion-safe:pointer-fine:lg:flex-row motion-safe:pointer-fine:lg:gap-16 motion-safe:pointer-fine:lg:will-change-transform"
        ref={rail}
      >
        {panels.map((panel, index) => (
          <li
            className={cn(
              "flex flex-col gap-8 motion-safe:pointer-fine:lg:h-full motion-safe:pointer-fine:lg:shrink-0 motion-safe:pointer-fine:lg:flex-row motion-safe:pointer-fine:lg:gap-12",
              PANEL_WIDTH[index % 2],
            )}
            key={panel.id}
          >
            {panel.image === null ? null : (
              <figure className="relative aspect-video overflow-hidden sm:w-10/12 lg:w-5/12 motion-safe:pointer-fine:lg:aspect-auto motion-safe:pointer-fine:lg:h-full motion-safe:pointer-fine:lg:w-2/5">
                <div className="absolute inset-0" data-level-image="">
                  <Image
                    alt={panel.image.alt}
                    className="scale-110 object-cover"
                    fill
                    loading="lazy"
                    sizes="(min-width: 1024px) 36vw, (min-width: 640px) 83vw, 100vw"
                    src={panel.image.src}
                  />
                </div>
              </figure>
            )}

            <Reveal
              className={cn(
                "flex max-w-3xl flex-col gap-6 motion-safe:pointer-fine:lg:w-3/5",
                TEXT_ANCHOR[index % 2],
              )}
              stagger={0.08}
            >
              <RevealItem className="flex items-center gap-5">
                <span className="font-display text-sm font-semibold tracking-widest text-accent tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="h-px flex-1 bg-border" />
                {panel.campus === null ? null : (
                  <span className="font-body text-sm text-ink-muted">
                    {panel.campus}
                  </span>
                )}
              </RevealItem>

              <RevealItem>
                <H3>{panel.title}</H3>
                <p className="mt-3 font-body text-sm text-ink-muted">
                  {panel.stage}
                </p>
              </RevealItem>

              {panel.paragraphs.length === 0 ? null : (
                <RevealItem className="flex flex-col gap-4">
                  {panel.paragraphs.map((paragraph) => (
                    <P key={paragraph}>{paragraph}</P>
                  ))}
                </RevealItem>
              )}

              {panel.highlights.length === 0 ? null : (
                <RevealItem>
                  <ul className="flex flex-wrap gap-x-6 gap-y-3">
                    {panel.highlights.map((highlight) => (
                      <li
                        className="border-b pb-1 font-body text-sm text-ink-muted"
                        key={highlight}
                      >
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </RevealItem>
              )}
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  );
}
