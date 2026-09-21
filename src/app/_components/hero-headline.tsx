"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const AT_FOLD_Y_PERCENT = 10;
const AT_FOLD_DURATION = 0.6;

export type HeroHeadlineProps = {
  headline?: string;
  lead?: string;
  tail?: string | null;
  className?: string;
};

export function HeroHeadline({
  headline,
  lead,
  tail,
  className,
}: HeroHeadlineProps) {
  const root = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;

      const split = SplitText.create(el, {
        type: "lines",
        mask: "lines",
        aria: "auto",
        autoSplit: true,
        onSplit: (self) =>
          gsap.fromTo(
            self.lines,
            {
              yPercent: AT_FOLD_Y_PERCENT,
            },
            {
              yPercent: 0,
              duration: AT_FOLD_DURATION,
              ease: "power4.out",
              stagger: 0.09,
            },
          ),
      });

      return () => {
        split.revert();
      };
    },
    { scope: root },
  );

  return (
    <h1
      className={cn(
        "font-display text-[1.4rem] min-[360px]:text-[1.5rem] min-[390px]:text-[1.65rem] sm:text-4xl lg:text-[2.6rem] xl:text-[3.15rem] 2xl:text-6xl font-semibold sm:font-normal tracking-tight leading-[1.12] text-balance text-ink whitespace-nowrap lg:whitespace-normal",
        className,
      )}
      ref={root}
    >
      {headline ? (
        headline
      ) : (
        <>
          <span className="inline lg:block">{lead}{tail ? " " : ""}</span>
          {tail === null || tail === undefined ? null : (
            <span className="inline lg:block">{tail}</span>
          )}
        </>
      )}
    </h1>
  );
}
