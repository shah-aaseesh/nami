"use client";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Icon } from "@/components/ui/icon";
import type { ContentImage } from "@/lib/content";
import { ArrowLeftIcon, ArrowRightIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

export type SchoolHeroSlide = ContentImage & {
  readonly caption: string;
};

// Keep in sync with --animate-hero-progress in globals.css.
const AUTOPLAY_MS = 6500;

function usePrefersReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReducedMotion(query.matches);
    onChange();
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return reducedMotion;
}

export function SchoolHeroSlider({
  className,
  label,
  slides,
}: {
  readonly className?: string;
  readonly label: string;
  readonly slides: readonly SchoolHeroSlide[];
}) {
  const [emblaRef, api] = useEmblaCarousel({ duration: 30, loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  const hasMany = slides.length > 1;
  const autoplays = hasMany && !reducedMotion;

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setSelectedIndex(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: selectedIndex is an intentional re-key — every slide change (arrows, dots, swipe) must restart the autoplay countdown.
  useEffect(() => {
    if (!api || !autoplays || isPaused) return;
    const id = window.setInterval(() => {
      if (!document.hidden) api.scrollNext();
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [api, autoplays, isPaused, selectedIndex]);

  const scrollTo = useCallback((index: number) => api?.scrollTo(index), [api]);
  const scrollPrev = useCallback(() => api?.scrollPrev(), [api]);
  const scrollNext = useCallback(() => api?.scrollNext(), [api]);

  const pause = useCallback(() => setIsPaused(true), []);
  const resume = useCallback(() => setIsPaused(false), []);

  if (slides.length === 0) return null;

  const current = slides[selectedIndex] ?? slides[0];
  if (current === undefined) return null;

  return (
    // biome-ignore lint/a11y/useSemanticElements: the ARIA carousel pattern pairs role="region" with aria-roledescription="carousel"; there is no semantic HTML equivalent.
    <div
      aria-label={label}
      aria-roledescription="carousel"
      className={cn("absolute inset-0", className)}
      onBlurCapture={resume}
      onFocusCapture={pause}
      onPointerEnter={pause}
      onPointerLeave={resume}
      role="region"
    >
      <div className="h-full  overflow-hidden" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((slide, index) => (
            // biome-ignore lint/a11y/useSemanticElements: the ARIA carousel pattern pairs role="group" with aria-roledescription="slide"; the suggested <fieldset> is for grouping form controls and would be wrong here.
            <div
              aria-label={`${index + 1} of ${slides.length}`}
              aria-roledescription="slide"
              className="relative h-full min-w-0 shrink-0 grow-0 basis-full"
              key={slide.src}
              role="group"
            >
              <Image
                alt={slide.alt}
                className={cn(
                  "size-full object-cover transition-transform duration-[8000ms] ease-linear motion-reduce:transform-none motion-reduce:transition-none",
                  index === selectedIndex && !reducedMotion
                    ? "scale-105"
                    : "scale-100",
                )}
                draggable={false}
                fetchPriority={index === 0 ? "high" : "auto"}
                height={slide.height}
                loading={index === 0 ? "eager" : "lazy"}
                priority={index === 0}
                sizes="(max-width: 1440px) 100vw, 1440px"
                src={slide.src}
                width={slide.width}
              />
            </div>
          ))}
        </div>
      </div>

      {hasMany && (
        <p
          aria-hidden
          className="absolute top-4 right-4 hidden animate-hero-fade rounded-full border border-white/15 bg-neutral-950/35 px-4 py-2 font-body text-xs font-medium text-white/90 backdrop-blur motion-reduce:animate-none sm:top-8 sm:right-8 md:block"
          key={current.src}
        >
          {current.caption}
        </p>
      )}

      {hasMany && (
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 p-5 sm:p-8 lg:p-10">
          <div className="flex max-w-44 flex-1 items-center gap-2 sm:max-w-60">
            {slides.map((slide, index) => {
              const active = index === selectedIndex;
              return (
                <button
                  aria-current={active}
                  aria-label={`Show slide ${index + 1} of ${slides.length} — ${slide.caption}`}
                  className="group flex h-6 flex-1 items-center"
                  key={slide.src}
                  onClick={() => scrollTo(index)}
                  type="button"
                >
                  <span className="relative block h-1 w-full overflow-hidden rounded-full bg-white/25 transition-colors group-hover:bg-white/40">
                    <span
                      className={cn(
                        "absolute inset-0 origin-left rounded-full bg-white",
                        index < selectedIndex && "scale-x-100",
                        index > selectedIndex && "scale-x-0",
                        active &&
                          (autoplays
                            ? "animate-hero-progress motion-reduce:animate-none motion-reduce:scale-x-100"
                            : "scale-x-100"),
                        active && isPaused && "[animation-play-state:paused]",
                      )}
                      key={selectedIndex}
                    />
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <p
              aria-hidden
              className="hidden font-body text-sm font-medium tabular-nums text-white/80 sm:block"
            >
              {String(selectedIndex + 1).padStart(2, "0")}
              <span className="mx-1 text-white/50">/</span>
              {String(slides.length).padStart(2, "0")}
            </p>
            <button
              aria-label="Previous slide"
              className="flex size-10 items-center justify-center rounded-full border border-white/15 bg-neutral-950/40 text-white backdrop-blur transition-colors hover:bg-neutral-950/60"
              onClick={scrollPrev}
              type="button"
            >
              <Icon className="size-5" icon={ArrowLeftIcon} />
            </button>
            <button
              aria-label="Next slide"
              className="flex size-10 items-center justify-center rounded-full border border-white/15 bg-neutral-950/40 text-white backdrop-blur transition-colors hover:bg-neutral-950/60"
              onClick={scrollNext}
              type="button"
            >
              <Icon className="size-5" icon={ArrowRightIcon} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
