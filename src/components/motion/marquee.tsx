"use client";

import type { ReactNode } from "react";
import { useRef, useState } from "react";
import { gsap, matchMotion, Observer, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

export type MarqueeProps = {
  children: ReactNode;
  label: string;
  className?: string;
  trackClassName?: string;
  speed?: number;
  reverse?: boolean;
  copies?: number;
  velocity?: boolean;
  maxBoost?: number;
};

export function Marquee({
  children,
  label,
  className,
  trackClassName,
  speed = 80,
  reverse = false,
  copies = 2,
  velocity = true,
  maxBoost = 3,
}: MarqueeProps) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);

  useGSAP(
    () =>
      matchMotion(
        {
          motion: () => {
            setReduced(false);
            const el = track.current;
            if (!el) return;

            const base = reverse ? -1 : 1;
            const loop = gsap.to(el, {
              xPercent: -100 / copies,
              duration: el.scrollWidth / copies / speed,
              ease: "none",
              repeat: -1,
            });
            loop.timeScale(base);

            if (!velocity) return;

            const observer = Observer.create({
              type: "wheel,touch,scroll",
              onChangeY: (self) => {
                const boost =
                  1 +
                  gsap.utils.clamp(0, maxBoost, Math.abs(self.velocityY) / 600);
                const heading = self.deltaY > 0 ? 1 : -1;
                gsap.to(loop, {
                  timeScale: base * heading * boost,
                  duration: 0.35,
                  overwrite: true,
                });
              },
              onStop: () => {
                gsap.to(loop, {
                  timeScale: base,
                  duration: 0.9,
                  overwrite: true,
                });
              },
              onStopDelay: 0.2,
            });

            return () => observer.kill();
          },
          reduced: () => {
            setReduced(true);
          },
        },
        root,
      ),
    { scope: root },
  );

  const copyKeys = Array.from(
    { length: reduced ? 1 : copies },
    (_, index) => `marquee-copy-${index}`,
  );

  return (
    // biome-ignore lint/a11y/useSemanticElements: <fieldset> groups form controls; this names the scroll container that the reduced-motion path makes focusable.
    <div
      aria-label={label}
      className={cn(
        reduced ? "overflow-x-auto overflow-y-hidden" : "overflow-hidden",
        className,
      )}
      ref={root}
      role="group"
      tabIndex={reduced ? 0 : undefined}
    >
      <div
        className={cn("flex w-max will-change-transform", trackClassName)}
        ref={track}
      >
        {copyKeys.map((copyKey, index) => (
          <div
            aria-hidden={index > 0 ? "true" : undefined}
            className="flex shrink-0"
            key={copyKey}
          >
            {children}
          </div>
        ))}
      </div>
    </div>
  );
}
