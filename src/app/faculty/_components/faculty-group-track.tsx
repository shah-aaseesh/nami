"use client";

import { type ReactNode, useRef } from "react";
import { FULL_MOTION_QUERY, gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

const PIN_QUERY = `${FULL_MOTION_QUERY} and (min-width: 1024px)`;
const PIN_TOP = 96;

export function FacultyGroupTrack({
  children,
  heading,
}: {
  readonly children: ReactNode;
  readonly heading: ReactNode;
}) {
  const rail = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(PIN_QUERY, () => {
        const railEl = rail.current;
        const trackEl = track.current;
        if (!railEl || !trackEl) return;

        const distance = () =>
          Math.max(0, trackEl.scrollWidth - trackEl.offsetWidth);

        if (distance() === 0) return;

        const cardStops = () => {
          const span = distance();
          const cards = trackEl.querySelectorAll<HTMLElement>(":scope > *");
          const origin = cards[0]?.offsetLeft ?? 0;
          return Array.from(cards, (card) =>
            Math.min(1, (card.offsetLeft - origin) / span),
          );
        };

        const tween = gsap.to(trackEl, { ease: "none", x: () => -distance() });

        const trigger = ScrollTrigger.create({
          animation: tween,
          end: () => `+=${distance()}`,
          invalidateOnRefresh: true,
          pin: true,
          scrub: 1,
          snap: {
            duration: 0.2,
            ease: "power1.inOut",
            snapTo: (progress) =>
              distance() === 0 ? 0 : gsap.utils.snap(cardStops(), progress),
          },
          start: `top ${PIN_TOP}px`,
          trigger: railEl,
        });

        return () => {
          trigger.kill();
          tween.kill();
        };
      });

      return () => mm.revert();
    },
    { scope: rail },
  );

  return (
    <div className="mx-auto max-w-page overflow-x-clip py-2" ref={rail}>
      {heading}

      <div
        className="flex items-start gap-6 sm:gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide lg:snap-none lg:overflow-x-visible pb-4"
        ref={track}
      >
        {children}
      </div>
    </div>
  );
}
