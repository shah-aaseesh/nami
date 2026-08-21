"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { gsap, Observer, useGSAP } from "@/lib/gsap";
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

  useGSAP(
    () => {
      const el = track.current;
      if (!el) return;

      const base = reverse ? -1 : 1;
      let measuredWidth = el.scrollWidth / copies;
      const duration = measuredWidth / speed;

      const loop = gsap.to(el, {
        xPercent: -100 / copies,
        duration,
        ease: "none",
        repeat: -1,
      });

      // Advance totalTime safely into the future so that playing backward
      // (timeScale < 0) never hits the 0 boundary, which would stop it.
      loop.totalTime(duration * 1000);
      loop.timeScale(base);

      // BUG-023: late-settling content (lazy images) bakes a wrong duration
      // in at mount; re-measure and retime, holding progress steady so it doesn't jump.
      let resizeTimeout: number | undefined;
      const retime = () => {
        const nextWidth = el.scrollWidth / copies;
        if (Math.abs(nextWidth - measuredWidth) < 1) return;

        const progress = loop.progress();
        const nextDuration = nextWidth / speed;

        loop.duration(nextDuration);
        loop.totalTime(nextDuration * 1000 + progress * nextDuration);

        measuredWidth = nextWidth;
      };

      const resizeObserver = new ResizeObserver(() => {
        window.clearTimeout(resizeTimeout);
        resizeTimeout = window.setTimeout(retime, 120);
      });
      resizeObserver.observe(el);

      if (!velocity) {
        return () => {
          window.clearTimeout(resizeTimeout);
          resizeObserver.disconnect();
        };
      }

      const observer = Observer.create({
        type: "wheel,touch,scroll",
        onChangeY: (self) => {
          const boost =
            1 + gsap.utils.clamp(0, maxBoost, Math.abs(self.velocityY) / 600);
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

      return () => {
        window.clearTimeout(resizeTimeout);
        resizeObserver.disconnect();
        observer.kill();
      };
    },
    { scope: root },
  );

  const copyKeys = Array.from(
    { length: copies },
    (_, index) => `marquee-copy-${index}`,
  );

  return (
    // biome-ignore lint/a11y/useSemanticElements: <fieldset> groups form controls; this names a scroll region, not a form group.
    <div
      aria-label={label}
      className={cn("overflow-hidden", className)}
      ref={root}
      role="group"
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
