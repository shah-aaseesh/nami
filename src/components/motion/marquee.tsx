"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { gsap, matchMotion, Observer, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

export type MarqueeProps = {
  children: ReactNode;
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

  useGSAP(
    () =>
      matchMotion(
        {
          motion: () => {
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
            const el = track.current;
            if (!el) return;
            gsap.set(root.current, { overflowX: "auto" });
            gsap.set(Array.from(el.children).slice(1), { display: "none" });
          },
        },
        root,
      ),
    { scope: root },
  );

  const copyKeys = Array.from(
    { length: copies },
    (_, index) => `marquee-copy-${index}`,
  );

  return (
    <div className={cn("overflow-hidden", className)} ref={root}>
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
