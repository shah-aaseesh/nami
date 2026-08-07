"use client";

import { useRef } from "react";
import { Icon } from "@/components/ui/icon";
import { Eyebrow, H2, H3, P } from "@/components/ui/typography";
import { gsap, useGSAP } from "@/lib/gsap";
import { CheckIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

export type HighlightCard = {
  readonly id: string;
  readonly number: string;
  readonly title: string;
  readonly subtitle: string;
  readonly description: string;
  readonly points: readonly string[];
  readonly badge: string;
  readonly accentClass: string;
};

export function PinnedHighlightsPanels({
  cards,
  levelTitle,
}: {
  readonly cards: readonly HighlightCard[];
  readonly levelTitle: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsWrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      const cardsWrapper = cardsWrapperRef.current;
      if (!container || !cardsWrapper) return;

      const mm = gsap.matchMedia();

      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          const panels = gsap.utils.toArray<HTMLElement>(
            "[data-pinned-panel]",
            cardsWrapper,
          );
          if (panels.length <= 1) return;

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: cardsWrapper,
              start: "top 15%",
              end: () => `+=${panels.length * 90}%`,
              pin: true,
              scrub: 0.8,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          panels.forEach((panel, i) => {
            if (i === 0) return;
            timeline.fromTo(
              panel,
              { yPercent: 100, opacity: 0.9 },
              { yPercent: 0, opacity: 1, ease: "none" },
            );
            const prevPanel = panels[i - 1];
            if (prevPanel) {
              timeline.to(
                prevPanel,
                { scale: 0.94, opacity: 0.25, ease: "none" },
                "<",
              );
            }
          });
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <section
      className="relative overflow-hidden field-ink gutter-x section-y"
      ref={containerRef}
    >
      <div className="mx-auto max-w-page">
        <div className="mb-10 lg:mb-14">
          <Eyebrow className="text-primary-400">Program Highlights</Eyebrow>
          <H2 className="mt-4 text-neutral-50">
            Academic Distinctives of {levelTitle}
          </H2>
          <P className="mt-4 text-neutral-400">
            Scroll down to explore the core pillars and educational advantages
            that define the {levelTitle} experience at NAMI.
          </P>
        </div>

        <div
          className={cn(
            "relative",
            cards.length > 1 &&
              "md:h-[500px] lg:h-[540px] md:overflow-hidden md:rounded-3xl",
          )}
          ref={cardsWrapperRef}
        >
          {cards.map((card, idx) => (
            <article
              className={cn(
                "relative top-0 left-0 mb-6 last:mb-0 flex w-full flex-col justify-between rounded-2xl border border-neutral-800 bg-neutral-900/95 p-5 sm:p-6 shadow-2xl backdrop-blur-md md:p-10 lg:p-12",
                cards.length > 1 && "md:absolute md:mb-0 md:h-full",
                card.accentClass,
              )}
              data-pinned-panel=""
              key={card.id}
              style={{ zIndex: idx + 1 }}
            >
              <div>
                <div className="flex items-center justify-between gap-4">
                  <span className="font-display font-light text-3xl sm:text-4xl text-primary-400 tabular-nums lg:text-5xl">
                    {card.number}
                  </span>
                  <span className="rounded-full border border-neutral-700 bg-neutral-800 px-3 sm:px-4 py-1 font-body text-[10px] sm:text-xs font-medium uppercase tracking-widest text-neutral-300">
                    {card.badge}
                  </span>
                </div>
                <H3 className="mt-4 sm:mt-6 text-xl sm:text-2xl font-medium text-neutral-50 lg:text-3xl">
                  {card.title}
                </H3>
                <p className="mt-2 font-body text-xs sm:text-sm font-medium text-neutral-400">
                  {card.subtitle}
                </p>
                <P className="mt-3 sm:mt-4 max-w-3xl text-sm sm:text-base text-neutral-300 leading-relaxed">
                  {card.description}
                </P>
              </div>

              <div className="mt-6 sm:mt-8 border-neutral-800/80 border-t pt-5 sm:pt-6">
                <ul className="grid grid-cols-1 gap-2.5 sm:gap-3 text-neutral-200 text-xs sm:text-sm sm:grid-cols-2">
                  {card.points.map((point) => (
                    <li className="flex items-start gap-2" key={point}>
                      <Icon
                        className="mt-0.5 size-4 shrink-0 text-primary-400"
                        icon={CheckIcon}
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
