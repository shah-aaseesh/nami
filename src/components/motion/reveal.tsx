"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { gsap, matchMotion, useGSAP } from "@/lib/gsap";

export type RevealProps = {
  children: ReactNode;
  className?: string;
  y?: number;
  x?: number;
  fade?: boolean;
  atFold?: boolean;
  stagger?: number;
  duration?: number;
  delay?: number;
  ease?: string;
  start?: string;
  once?: boolean;
};

export function Reveal({
  children,
  className,
  y = 40,
  x = 0,
  atFold = false,
  fade = !atFold,
  stagger = 0,
  duration = 0.9,
  delay = 0,
  ease = "power3.out",
  start = "top 85%",
  once = true,
}: RevealProps) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () =>
      matchMotion(
        {
          motion: () => {
            const el = root.current;
            if (!el) return;

            const marked = el.querySelectorAll("[data-reveal-item]");
            const targets =
              stagger > 0 ? (marked.length > 0 ? marked : el.children) : el;

            gsap.from(targets, {
              y,
              x,
              opacity: fade ? 0 : 1,
              duration,
              delay,
              ease,
              stagger,
              scrollTrigger: atFold ? undefined : { trigger: el, start, once },
            });
          },
        },
        root,
      ),
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
