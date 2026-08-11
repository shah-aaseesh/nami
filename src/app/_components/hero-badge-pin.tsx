"use client";

import { type ReactNode, useRef } from "react";
import { FULL_MOTION_QUERY, gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

const PIN_QUERY = `${FULL_MOTION_QUERY} and (pointer: fine) and (min-width: 64rem)`;
const PIN_TOP = 128; // Equivalent to top-32

export type HeroBadgePinProps = {
  children: ReactNode;
  className?: string;
};

export function HeroBadgePin({ children, className }: HeroBadgePinProps) {
  const track = useRef<HTMLDivElement>(null);
  const column = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(PIN_QUERY, () => {
        const trackEl = track.current;
        const columnEl = column.current;
        if (!trackEl || !columnEl) return;

        const trigger = ScrollTrigger.create({
          end: () =>
            `+=${Math.max(0, trackEl.offsetHeight - columnEl.offsetHeight)}`,
          invalidateOnRefresh: true,
          pin: columnEl,
          pinSpacing: false,
          start: `top ${PIN_TOP}px`,
          trigger: trackEl,
        });

        return () => trigger.kill();
      });

      return () => mm.revert();
    },
    { scope: track },
  );

  return (
    <div className={className} ref={track}>
      <div className="z-10" ref={column}>
        {children}
      </div>
    </div>
  );
}
