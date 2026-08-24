"use client";

import type { RefObject } from "react";
import { FULL_MOTION_QUERY, gsap, useGSAP } from "@/lib/gsap";

const STACK_QUERY = `${FULL_MOTION_QUERY} and (min-width: 1024px)`;
const STACK_TOP = 128;
const STACK_OFFSET = 20;

export function usePinnedCards(cardsWrapperRef: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(STACK_QUERY, () => {
        const cardsWrapper = cardsWrapperRef.current;
        if (!cardsWrapper) return;

        const panels = gsap.utils.toArray<HTMLElement>(
          "[data-pinned-panel]",
          cardsWrapper,
        );
        const lastPanel = panels.at(-1);
        if (lastPanel === undefined || panels.length < 2) return;

        panels.forEach((panel, index) => {
          gsap.set(panel, { zIndex: index + 1 });
        });

        // A transform holds each card on its slot instead of ScrollTrigger's
        // pin, which would snap the stack back to flow the moment it completes.
        panels.slice(0, -1).forEach((panel, index) => {
          const travel = () =>
            Math.max(
              1,
              lastPanel.offsetTop -
                panel.offsetTop -
                (panels.length - 1 - index) * STACK_OFFSET,
            );

          gsap.fromTo(
            panel,
            { y: 0 },
            {
              ease: "none",
              scrollTrigger: {
                end: () => `+=${travel()}`,
                invalidateOnRefresh: true,
                scrub: true,
                start: `top ${STACK_TOP + index * STACK_OFFSET}px`,
                trigger: panel,
              },
              y: travel,
            },
          );
        });
      });

      return () => mm.revert();
    },
    { scope: cardsWrapperRef },
  );
}
