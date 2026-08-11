"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const REVEAL_Y = 40;
const REVEAL_DURATION = 0.9;

export type RevealProps = {
  children: ReactNode;
  className?: string;
  y?: number;
  stagger?: number;
};

export function Reveal({
  children,
  className,
  y = REVEAL_Y,
  stagger = 0,
}: RevealProps) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;

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
          duration: REVEAL_DURATION,
          ease: "power3.out",
          stagger,
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
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
