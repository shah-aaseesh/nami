"use client";

import type { UseEmblaCarouselType } from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

type EmblaApi = UseEmblaCarouselType[1];

const AUTOPLAY_MS = 2500;

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

  // biome-ignore lint/correctness/useExhaustiveDependencies: selectedIndex is an intentional re-key — every slide change (arrows, dots, swipe) must restart the autoplay countdown.
  useEffect(() => {
    if (!api || !enabled || isPaused) return;
    const id = window.setInterval(() => {
      if (!document.hidden) {
        if (api.canScrollNext()) {
          api.scrollNext();
        } else {
          api.scrollTo(0);
        }
      }
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [api, enabled, intervalMs, isPaused, selectedIndex]);

  const pause = useCallback(() => setIsPaused(true), []);
  const resume = useCallback(() => setIsPaused(false), []);

  return { pause, resume };
}
