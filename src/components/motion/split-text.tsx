"use client";

import { useRef } from "react";
import { isInsideRevealWindow, REVEAL_START } from "@/components/motion/reveal";
import { SplitText as GsapSplitText, gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type SplitTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";

type SplitUnit = "lines" | "words" | "chars";

const SPLIT_TYPE: Record<SplitUnit, string> = {
  lines: "lines",
  words: "words,lines",
  chars: "chars,words,lines",
};

const SPLIT_TAG_STYLES: Record<SplitTag, string> = {
  h1: "font-display text-5xl lg:text-6xl font-normal text-balance text-ink",
  h2: "font-display text-4xl lg:text-5xl font-normal text-balance text-ink",
  h3: "font-display text-3xl lg:text-4xl font-normal text-balance text-ink",
  h4: "font-display text-2xl lg:text-3xl font-normal text-balance text-ink",
  h5: "font-display text-xl lg:text-2xl font-normal text-balance text-ink",
  h6: "font-display text-lg lg:text-xl font-normal text-balance text-ink",
  p: "font-body text-base font-normal text-pretty text-ink-muted",
  span: "",
  div: "",
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

      let disposed = false;
      let split: ReturnType<typeof GsapSplitText.create> | null = null;
      let tween: gsap.core.Tween | null = null;

      const splitText = () => {
        if (disposed) return;

        split = GsapSplitText.create(el, {
          type: SPLIT_TYPE[type],
          mask: type,
          aria: "auto",
          autoSplit: true,
          onSplit: (self) => {
            if (isInsideRevealWindow(el)) return;

            tween = gsap.fromTo(
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
            return tween;
          },
        });

        if (!isHeading) {
          el.setAttribute("role", "img");
        }
      };

      // Splitting against the fallback font's metrics yields line breaks that
      // no longer match once next/font swaps the webfont in (FOUT). Wait for the
      // document's fonts to settle so the masked lines align with the real glyphs.
      if (document.fonts?.ready !== undefined) {
        void document.fonts.ready.then(splitText);
      } else {
        splitText();
      }

      return () => {
        disposed = true;
        tween?.kill();
        split?.revert();
        el.removeAttribute("role");
      };
    },
    { scope: root },
  );

  const Tag = as;

  return (
    <Tag
      className={cn(SPLIT_TAG_STYLES[as], className)}
      ref={(node: HTMLElement | null) => {
        root.current = node;
      }}
    >
      {children}
    </Tag>
  );
}
