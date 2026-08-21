"use client";

import type { UseEmblaCarouselType } from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

type EmblaApi = UseEmblaCarouselType[1];

const AUTOPLAY_MS = 4000;
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export function useCarouselAutoplay({
  api,
  enabled,
  intervalMs = AUTOPLAY_MS,
  selectedIndex,
}: {
  readonly api: EmblaApi;
  readonly enabled: boolean;
  readonly intervalMs?: number;
  readonly selectedIndex: number;
}) {
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(REDUCED_MOTION_QUERY);
    setPrefersReducedMotion(query.matches);
    const onChange = (event: MediaQueryListEvent) =>
      setPrefersReducedMotion(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: selectedIndex is an intentional re-key — every slide change (arrows, dots, swipe) must restart the autoplay countdown.
  useEffect(() => {
    if (!api || !enabled || isPaused || prefersReducedMotion) return;
    const id = window.setInterval(() => {
      if (!document.hidden) api.scrollNext();
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [api, enabled, intervalMs, isPaused, prefersReducedMotion, selectedIndex]);

  const pause = useCallback(() => setIsPaused(true), []);
  const resume = useCallback(() => setIsPaused(false), []);

  return { pause, resume };
}
