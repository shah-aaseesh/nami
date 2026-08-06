"use client";

import { useRef } from "react";
import { gsap, matchMotion, useGSAP } from "@/lib/gsap";

const numberFormat = new Intl.NumberFormat("en-US");

export type StatsCounterProps = {
  value: number;
  suffix: string | null;
};

export function StatsCounter({ value, suffix }: StatsCounterProps) {
  const figure = useRef<HTMLSpanElement>(null);

  useGSAP(
    () =>
      matchMotion(
        {
          motion: () => {
            const el = figure.current;
            if (!el) return;

            const tally = { value: 0 };
            el.textContent = numberFormat.format(0);

            gsap.to(tally, {
              value,
              duration: 1.4,
              ease: "power2.out",
              scrollTrigger: { trigger: el, start: "top 85%", once: true },
              onUpdate: () => {
                el.textContent = numberFormat.format(Math.round(tally.value));
              },
            });
          },
          reduced: () => {
            const el = figure.current;
            if (!el) return;
            el.textContent = numberFormat.format(value);
          },
        },
        figure,
      ),
    { scope: figure },
  );

  return (
    <>
      <span className="tabular-nums" ref={figure}>
        {numberFormat.format(value)}
      </span>
      {suffix}
    </>
  );
}
