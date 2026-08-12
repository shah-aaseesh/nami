"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

// overflow-clip, not overflow-hidden: `hidden` is a programmatically scrollable box, so
// focusing a card link inside the GSAP-transformed track scrolls it and desyncs the pin.
const RAIL = "mx-auto max-w-page overflow-clip";

const VISIBLE_CARDS = 3;
const PINNED_QUERY =
  "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";

export function BachelorsCourseTrack({
  children,
  label,
  total,
}: {
  readonly children: ReactNode;
  readonly label: string;
  readonly total: number;
}) {
  const railRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);

  const isScrollable = total > VISIBLE_CARDS;

  useGSAP(
    () => {
      if (!isScrollable) return;

      const mm = gsap.matchMedia();

      mm.add(PINNED_QUERY, () => {
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
            snapTo: 1 / (total - VISIBLE_CARDS),
          },
          start: "top 96px",
          trigger: rail,
        });
      });

      return () => mm.revert();
    },
    { dependencies: [isScrollable, total], scope: railRef },
  );

  return (
    <div className={RAIL} ref={railRef}>
      <ul
        aria-label={label}
        className="scrollbar-hide flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 sm:gap-8 lg:motion-safe:snap-none lg:motion-safe:overflow-x-visible lg:motion-safe:pb-0"
        ref={trackRef}
      >
        {children}
      </ul>
    </div>
  );
}
