"use client";

import { useRef } from "react";
import { gsap, matchMotion, SplitText, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

export type SiteFooterWordmarkProps = {
  lead: string;
  tail: string | null;
  className?: string;
};

export function SiteFooterWordmark({
  className,
  lead,
  tail,
}: SiteFooterWordmarkProps) {
  const root = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () =>
      matchMotion(
        {
          motion: () => {
            const el = root.current;
            if (!el) return;

            const split = SplitText.create(el, {
              type: "lines",
              mask: "lines",
              aria: "auto",
              autoSplit: true,
              onSplit: (self) =>
                gsap.from(self.lines, {
                  yPercent: 110,
                  duration: 1.1,
                  ease: "power4.out",
                  stagger: 0.09,
                  scrollTrigger: { trigger: el, start: "top 90%", once: true },
                }),
            });

            return () => {
              split.revert();
            };
          },
        },
        root,
      ),
    { scope: root },
  );

  return (
    <h2 className={cn("font-display text-ink", className)} ref={root}>
      <span className="block text-10xl font-semibold">{lead}</span>
      {tail === null ? null : (
        <span className="block text-6xl font-light">{tail}</span>
      )}
    </h2>
  );
}
