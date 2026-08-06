"use client";

import { useRef } from "react";
import { gsap, matchMotion, ScrollTrigger, useGSAP } from "@/lib/gsap";

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
    () =>
      matchMotion(
        {
          motion: () => {
            const el = node.current;
            if (el === null) return;

            const counter = { v: 0 };
            gsap.set(counter, { v: 0 });
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
              start: "top 90%",
              once: true,
              onEnter: () => tween.play(),
            });

            return () => trigger.kill();
          },
        },
        node,
      ),
    { scope: node },
  );

  return (
    <span className={className} ref={node}>
      {format(value)}
      {suffix}
    </span>
  );
}
