"use client";

import { type ReactNode, useRef } from "react";
import { STACK_QUERY } from "@/hooks/motion/use-pinned-cards";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

const PIN_TOP = 128;

export function AboutCreedPin({
  children,
  className,
}: {
  readonly children: ReactNode;
  readonly className?: string;
}) {
  const track = useRef<HTMLDivElement>(null);
  const column = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(STACK_QUERY, () => {
        const trackEl = track.current;
        const columnEl = column.current;
        if (!trackEl || !columnEl) return;

        // ScrollSmoother transforms the content, so `position: sticky` never holds.
        // ScrollTrigger's pin rides that same transform, so it does.
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
      <div ref={column}>{children}</div>
    </div>
  );
}
