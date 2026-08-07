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
  yPercent = 110,
  stagger = 0.08,
  duration = 1,
  delay = 0,
  ease = "power4.out",
  atFold = false,
  start = "top 85%",
  once = true,
}: SplitTextProps) {
  const root = useRef<HTMLElement | null>(null);
  const isHeading = as.length === 2 && as.startsWith("h");

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;

      let currentTween: gsap.core.Tween | null = null;
      const split = GsapSplitText.create(el, {
        type: SPLIT_TYPE[type],
        mask: type,
        aria: "auto",
        autoSplit: true,
        onSplit: (self) => {
          currentTween?.kill();
          currentTween = gsap.fromTo(
            self[type],
            {
              yPercent,
            },
            {
              yPercent: 0,
              duration,
              delay,
              ease,
              stagger,
              scrollTrigger: atFold ? undefined : { trigger: el, start, once },
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
