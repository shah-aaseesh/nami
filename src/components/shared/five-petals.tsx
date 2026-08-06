"use client";

import { useRef } from "react";
import { Eyebrow, H6, P } from "@/components/ui/typography";
import { gsap, matchMotion, ScrollTrigger, useGSAP } from "@/lib/gsap";

export type Petal = {
  id: string;
  name: string;
  meaning: string;
};

export function FivePetals({ petals }: { petals: readonly Petal[] }) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () =>
      matchMotion(
        {
          motion: () => {
            const elements = gsap.utils.toArray<HTMLElement>(".petal-card");

            ScrollTrigger.batch(elements, {
              start: "top 85%",
              once: true,
              onEnter: (batch) => {
                gsap.fromTo(
                  batch,
                  { opacity: 0, y: 30 },
                  {
                    opacity: 1,
                    y: 0,
                    stagger: 0.1,
                    duration: 0.8,
                    ease: "power2.out",
                  },
                );
              },
            });
          },
        },
        container,
      ),
    { scope: container },
  );

  return (
    <div className="mx-auto max-w-page" ref={container}>
      <div className="mb-10 lg:mb-12">
        <Eyebrow>The Five Petals & Core Values</Eyebrow>
      </div>

      <dl className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-5">
        {petals.map((petal, i) => (
          <div
            className="petal-card border-t border-border pt-5"
            key={petal.id}
          >
            <div className="mb-3 font-display text-sm tracking-wide text-accent/80">
              Petal 0{i + 1}
            </div>
            <H6 as="dt">{petal.name}</H6>
            <P as="dd" className="mt-3 text-ink-muted leading-relaxed">
              {petal.meaning}
            </P>
          </div>
        ))}
      </dl>
    </div>
  );
}
