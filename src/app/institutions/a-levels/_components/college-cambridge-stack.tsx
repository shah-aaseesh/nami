"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { STACK_QUERY, usePinnedCards } from "@/hooks/motion/use-pinned-cards";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

export function CollegeCambridgeStack({
  children,
  className,
}: {
  readonly children: ReactNode;
  readonly className?: string;
}) {
  const stack = useRef<HTMLUListElement>(null);

  usePinnedCards(stack);

  return (
    <ul className={className} ref={stack}>
      {children}
    </ul>
  );
}

export function CollegeCambridgeHold({
  children,
  className,
}: {
  readonly children: ReactNode;
  readonly className?: string;
}) {
  const hold = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(STACK_QUERY, () => {
        const column = hold.current;
        const section = column?.closest("section");
        if (!column || !section) return;

        const panels = section.querySelectorAll<HTMLElement>(
          "[data-pinned-panel]",
        );
        const panel = panels[0];
        if (!panel || panels.length < 2) return;

        // ScrollSmoother transforms the content, so `position: sticky` never holds.
        // Riding the first card's scrubbed `y` spans exactly the stack sequence.
        const setY = gsap.quickSetter(column, "y", "px");
        const ride = () => setY(Number(gsap.getProperty(panel, "y")));

        let riding = false;
        const setRiding = (next: boolean) => {
          if (riding === next) return;
          riding = next;
          if (next) gsap.ticker.add(ride);
          else gsap.ticker.remove(ride);
        };

        const gate = ScrollTrigger.create({
          end: "bottom top",
          onToggle: (self) => setRiding(self.isActive),
          start: "top bottom",
          trigger: section,
        });
        setRiding(gate.isActive);

        return () => {
          setRiding(false);
          gate.kill();
          gsap.set(column, { y: 0 });
        };
      });

      return () => mm.revert();
    },
    { scope: hold },
  );

  return (
    <div className={cn("pointer-events-none", className)} ref={hold}>
      <div className="pointer-events-auto">{children}</div>
    </div>
  );
}
