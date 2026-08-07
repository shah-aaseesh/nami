"use client";

import type { RefObject } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export function usePinnedCards(
  containerRef: RefObject<HTMLElement | null>,
  cardsWrapperRef: RefObject<HTMLElement | null>
) {
  useGSAP(
    () => {
      const container = containerRef.current;
      const cardsWrapper = cardsWrapperRef.current;
      if (!container || !cardsWrapper) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
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
      });
    },
    { scope: containerRef },
  );
}
