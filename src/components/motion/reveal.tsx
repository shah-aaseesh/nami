"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const REVEAL_Y = 40;
const REVEAL_DURATION = 0.9;
const REVEAL_START_PERCENT = 85;

export const REVEAL_START = `top ${REVEAL_START_PERCENT}%`;

// Between REVEAL_START and the trigger's default end ("bottom top") the server
// has already painted this element, so an entrance from-state would hide it.
export function isInsideRevealWindow(el: Element) {
  const rect = el.getBoundingClientRect();
  return (
    rect.bottom > 0 &&
    rect.top <= window.innerHeight * (REVEAL_START_PERCENT / 100)
  );
}

export type RevealProps = {
  children: ReactNode;
  className?: string;
  y?: number;
  stagger?: number;
  duration?: number;
};

export function Reveal({
  children,
  className,
  y = REVEAL_Y,
  stagger = 0,
  duration = REVEAL_DURATION,
}: RevealProps) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      if (isInsideRevealWindow(el)) return;

      const marked = el.querySelectorAll("[data-reveal-item]");
      const targets =
        stagger > 0 ? (marked.length > 0 ? marked : el.children) : el;

      gsap.fromTo(
        targets,
        {
          y,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration,
          ease: "power3.out",
          stagger,
          scrollTrigger: { trigger: el, start: REVEAL_START, once: true },
        },
      );
    },
    { scope: root },
  );

  return (
    <div className={className} ref={root}>
      {children}
    </div>
  );
}

export function RevealItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className} data-reveal-item="">
      {children}
    </div>
  );
}
