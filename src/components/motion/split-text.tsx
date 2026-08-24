"use client";

import { useRef } from "react";
import { isInsideRevealWindow, REVEAL_START } from "@/components/motion/reveal";
import { SplitText as GsapSplitText, gsap, useGSAP } from "@/lib/gsap";

type SplitTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";

type SplitUnit = "lines" | "words" | "chars";

const SPLIT_TYPE: Record<SplitUnit, string> = {
  lines: "lines",
  words: "words,lines",
  chars: "chars,words,lines",
};

const SPLIT_Y_PERCENT = 110;
const SPLIT_DURATION = 1;

export type SplitTextProps = {
  children: string;
  as?: SplitTag;
  className?: string;
  type?: SplitUnit;
  stagger?: number;
};

export function SplitText({
  children,
  as = "h2",
  className,
  type = "lines",
  stagger = 0.08,
}: SplitTextProps) {
  const root = useRef<HTMLElement | null>(null);
  const isHeading = as.length === 2 && as.startsWith("h");

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;

      const split = GsapSplitText.create(el, {
        type: SPLIT_TYPE[type],
        mask: type,
        aria: "auto",
        autoSplit: true,
        onSplit: (self) => {
          if (isInsideRevealWindow(el)) return;

          return gsap.fromTo(
            self[type],
            {
              yPercent: SPLIT_Y_PERCENT,
            },
            {
              yPercent: 0,
              duration: SPLIT_DURATION,
              ease: "power4.out",
              stagger,
              scrollTrigger: { trigger: el, start: REVEAL_START, once: true },
            },
          );
        },
      });

      if (!isHeading) {
        el.setAttribute("role", "img");
      }

      return () => {
        split.revert();
        el.removeAttribute("role");
      };
    },
    { scope: root },
  );

  const Tag = as;

  return (
    <Tag
      className={className}
      ref={(node: HTMLElement | null) => {
        root.current = node;
      }}
    >
      {children}
    </Tag>
  );
}
