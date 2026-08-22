"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { FULL_MOTION_QUERY, gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

const LAPTOP_QUERY = `${FULL_MOTION_QUERY} and (min-width: 1024px) and (max-width: 1279px)`;
const DESKTOP_QUERY = `${FULL_MOTION_QUERY} and (min-width: 1280px)`;
const LAPTOP_VISIBLE_CARDS = 2;
const DESKTOP_VISIBLE_CARDS = 3;
const PIN_TOP = 96;

export function SchoolAdmissionTrack({
  children,
  heading,
  label,
  total,
}: {
  readonly children: ReactNode;
  readonly heading: ReactNode;
  readonly label: string;
  readonly total: number;
}) {
  const railRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      const pinTrack = (visibleCards: number) => {
        if (total <= visibleCards) return;

        const track = trackRef.current;
        const rail = railRef.current;
        if (!track || !rail) return;

        const getScrollAmount = () => track.scrollWidth - track.offsetWidth;

        const tween = gsap.to(track, {
          x: () => -getScrollAmount(),
          ease: "none",
        });

        ScrollTrigger.create({
          animation: tween,
          end: () => `+=${getScrollAmount()}`,
          invalidateOnRefresh: true,
          pin: true,
          scrub: 1,
          snap: {
            duration: 0.2,
            ease: "power1.inOut",
            snapTo: 1 / (total - visibleCards),
          },
          start: `top ${PIN_TOP}px`,
          trigger: rail,
        });
      };

      mm.add(LAPTOP_QUERY, () => pinTrack(LAPTOP_VISIBLE_CARDS));
      mm.add(DESKTOP_QUERY, () => pinTrack(DESKTOP_VISIBLE_CARDS));

      return () => mm.revert();
    },
    { dependencies: [total], scope: railRef },
  );

  return (
    <div className="mx-auto max-w-page overflow-hidden" ref={railRef}>
      {heading}

      <section
        aria-label={label}
        className="scrollbar-hide mt-14 snap-x snap-mandatory overflow-x-auto pb-2 lg:mt-20 lg:overflow-x-visible lg:pb-0"
        // biome-ignore lint/a11y/noNoninteractiveTabindex: below lg this is the horizontal scroll region and its cards hold no focusable child, so WCAG 2.1.1 (axe scrollable-region-focusable) requires it be keyboard-reachable. It must stay off the <ol>, which GSAP translates off-screen at lg+, taking the focus ring with it.
        tabIndex={0}
      >
        <ol className="flex gap-6 sm:gap-8" ref={trackRef}>
          {children}
        </ol>
      </section>
    </div>
  );
}
