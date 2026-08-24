"use client";

import type { RefObject } from "react";
import { isInsideRevealWindow, REVEAL_START } from "@/components/motion/reveal";
import { FULL_MOTION_QUERY, gsap, useGSAP } from "@/lib/gsap";

const STACK_MIN_WIDTH = 1024;
const STACK_QUERY = `${FULL_MOTION_QUERY} and (min-width: ${STACK_MIN_WIDTH}px)`;
// The stack pin owns `y` from STACK_MIN_WIDTH up; below it nothing drives `y`.
// ENTRANCE_QUERY is `not` STACK_QUERY, so exactly one of the two ever matches.
const ENTRANCE_QUERY = `not ${STACK_QUERY}`;
const STACK_TOP = 128;
const STACK_OFFSET = 20;
const ENTRANCE_Y = 40;
const ENTRANCE_DURATION = 0.9;
const ENTRANCE_STAGGER = 0.08;

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

      mm.add(ENTRANCE_QUERY, () => {
        const cardsWrapper = cardsWrapperRef.current;
        if (!cardsWrapper) return;
        if (isInsideRevealWindow(cardsWrapper)) return;

        const panels = gsap.utils.toArray<HTMLElement>(
          "[data-pinned-panel]",
          cardsWrapper,
        );
        if (panels.length === 0) return;

        gsap.fromTo(
          panels,
          { y: ENTRANCE_Y, opacity: 0 },
          {
            duration: ENTRANCE_DURATION,
            ease: "power3.out",
            opacity: 1,
            scrollTrigger: {
              once: true,
              start: REVEAL_START,
              trigger: cardsWrapper,
            },
            stagger: ENTRANCE_STAGGER,
            y: 0,
          },
        );
      });

      return () => mm.revert();
    },
    { scope: cardsWrapperRef },
  );
}
