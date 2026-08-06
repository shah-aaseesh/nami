"use client";

import { usePathname } from "next/navigation";
import { type ReactNode, useEffect, useRef } from "react";
import { FULL_MOTION_QUERY, gsap, ScrollSmoother, useGSAP } from "@/lib/gsap";

const SMOOTH_SCROLL_QUERY = `${FULL_MOTION_QUERY} and (pointer: fine)`;
const EFFECT_TARGETS = "[data-speed], [data-lag]";

export type SmoothScrollProviderProps = {
  children: ReactNode;
  chrome: ReactNode;
};

export function SmoothScrollProvider({
  children,
  chrome,
}: SmoothScrollProviderProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const scannedPath = useRef(pathname);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add(SMOOTH_SCROLL_QUERY, () => {
      const smoother = ScrollSmoother.create({
        wrapper: wrapperRef.current,
        content: contentRef.current,
        smooth: 1.2,
        effects: true,
      });
      return () => smoother.kill();
    });

    return () => mm.revert();
  });

  useEffect(() => {
    // ScrollSmoother's own `effects: true` scan already covered the first route;
    // this effect exists only for the soft navigations after it.
    if (scannedPath.current === pathname) return;
    scannedPath.current = pathname;

    const smoother = ScrollSmoother.get();
    const content = contentRef.current;
    if (!smoother || !content) return;

    const registered = smoother.effects();
    const targets = Array.from(
      content.querySelectorAll<HTMLElement>(EFFECT_TARGETS),
    );
    if (registered.length === 0 && targets.length === 0) return;

    for (const effect of registered) {
      effect.kill();
    }
    if (targets.length > 0) {
      smoother.effects(targets);
    }
  }, [pathname]);

  return (
    <>
      {chrome}
      <div id="smooth-wrapper" ref={wrapperRef}>
        <div id="smooth-content" ref={contentRef}>
          {children}
        </div>
      </div>
    </>
  );
}
