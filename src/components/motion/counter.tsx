"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

const START_RATIO = 0.9;

export type CounterProps = {
  value: number;
  suffix?: string;
  className?: string;
  duration?: number;
};

function format(value: number): string {
  return Math.round(value).toLocaleString("en-US");
}

export function Counter({
  value,
  suffix = "",
  className,
  duration = 2,
}: CounterProps) {
  const node = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = node.current;
      if (el === null) return;

      const startsBelowFold =
        el.getBoundingClientRect().top >= window.innerHeight * START_RATIO;
      if (!startsBelowFold) return;

      const counter = { v: 0 };
      el.textContent = `${format(counter.v)}${suffix}`;

      const tween = gsap.to(counter, {
        v: value,
        duration,
        ease: "power2.out",
        paused: true,
        onUpdate: () => {
          el.textContent = `${format(counter.v)}${suffix}`;
        },
      });

      const trigger = ScrollTrigger.create({
        trigger: el,
        start: `top ${START_RATIO * 100}%`,
        once: true,
        onEnter: () => tween.play(),
      });

      return () => trigger.kill();
    },
    { scope: node },
  );

  return (
    <span className={className} ref={node}>
      {format(value)}
      {suffix}
    </span>
  );
}
