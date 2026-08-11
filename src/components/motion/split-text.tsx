"use client";

import { useRef } from "react";
import { SplitText as GsapSplitText, gsap, useGSAP } from "@/lib/gsap";

type SplitTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";

type SplitUnit = "lines" | "words" | "chars";

const SPLIT_TYPE: Record<SplitUnit, string> = {
  lines: "lines",
  words: "words,lines",
  chars: "chars,words,lines",
};

const AT_FOLD_Y_PERCENT = 10;
const BELOW_FOLD_Y_PERCENT = 110;
const AT_FOLD_DURATION = 0.6;
const BELOW_FOLD_DURATION = 1;

export type SplitTextProps = {
  children: string;
  as?: SplitTag;
  className?: string;
  type?: SplitUnit;
  yPercent?: number;
  stagger?: number;
  duration?: number;
  delay?: number;
  ease?: string;
  atFold?: boolean;
  start?: string;
  once?: boolean;
};

export function SplitText({
  children,
  as = "h2",
  className,
  type = "lines",
  yPercent,
  stagger = 0.08,
  duration,
  delay = 0,
  ease = "power4.out",
  atFold = false,
  start = "top 85%",
  once = true,
}: SplitTextProps) {
  const root = useRef<HTMLElement | null>(null);
  const isHeading = as.length === 2 && as.startsWith("h");
  const fromYPercent =
    yPercent ?? (atFold ? AT_FOLD_Y_PERCENT : BELOW_FOLD_Y_PERCENT);
  const runDuration =
    duration ?? (atFold ? AT_FOLD_DURATION : BELOW_FOLD_DURATION);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;

      const split = GsapSplitText.create(el, {
        type: SPLIT_TYPE[type],
        mask: type,
        aria: "auto",
        autoSplit: true,
        onSplit: (self) =>
          gsap.fromTo(
            self[type],
            {
              yPercent: fromYPercent,
            },
            {
              yPercent: 0,
              duration: runDuration,
              delay,
              ease,
              stagger,
              scrollTrigger: atFold ? undefined : { trigger: el, start, once },
            },
          ),
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
