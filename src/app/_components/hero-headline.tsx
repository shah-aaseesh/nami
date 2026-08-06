"use client";

import { useRef } from "react";
import { gsap, matchMotion, SplitText, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

export type HeroHeadlineProps = {
  lead: string;
  tail: string | null;
  className?: string;
};

export function HeroHeadline({ lead, tail, className }: HeroHeadlineProps) {
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
    <h1
      className={cn(
        "font-editorial text-6xl font-normal tracking-normal text-ink",
        className,
      )}
      ref={root}
    >
      <span className="block">{lead}</span>
      {tail === null ? null : <span className="block">{tail}</span>}
    </h1>
  );
}
