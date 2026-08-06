"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { FULL_MOTION_QUERY, gsap, useGSAP } from "@/lib/gsap";

const TILT_QUERY = `${FULL_MOTION_QUERY} and (pointer: fine)`;

export type TiltProps = {
  children: ReactNode;
  className?: string;
  max?: number;
  scale?: number;
  perspective?: number;
  duration?: number;
  ease?: string;
};

export function Tilt({
  children,
  className,
  max = 8,
  scale = 1,
  perspective = 900,
  duration = 0.6,
  ease = "power3.out",
}: TiltProps) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(TILT_QUERY, () => {
        const el = root.current;
        if (!el) return;

        gsap.set(el, {
          transformPerspective: perspective,
          transformStyle: "preserve-3d",
        });

        const rotateX = gsap.quickTo(el, "rotationX", { duration, ease });
        const rotateY = gsap.quickTo(el, "rotationY", { duration, ease });
        const scaleTo = gsap.quickTo(el, "scale", { duration, ease });

        const onMove = (event: PointerEvent) => {
          const rect = el.getBoundingClientRect();
          rotateY(((event.clientX - rect.left) / rect.width - 0.5) * max * 2);
          rotateX(-((event.clientY - rect.top) / rect.height - 0.5) * max * 2);
        };
        const onEnter = () => scaleTo(scale);
        const onLeave = () => {
          rotateX(0);
          rotateY(0);
          scaleTo(1);
        };

        el.addEventListener("pointermove", onMove);
        el.addEventListener("pointerenter", onEnter);
        el.addEventListener("pointerleave", onLeave);

        return () => {
          el.removeEventListener("pointermove", onMove);
          el.removeEventListener("pointerenter", onEnter);
          el.removeEventListener("pointerleave", onLeave);
        };
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div className={className} ref={root}>
      {children}
    </div>
  );
}
