"use client";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { type ReactNode, useCallback, useEffect, useState } from "react";
import { useCarouselAutoplay } from "@/hooks/motion/use-carousel-autoplay";
import type { ContentImage } from "@/lib/content";
import { cn } from "@/lib/utils";

export type SharedHeroSlide = ContentImage;

export function SharedHeroSlider({
  children,
  className,
  label,
  slides,
}: {
  readonly children: ReactNode;
  readonly className?: string;
  readonly label: string;
  readonly slides: readonly SharedHeroSlide[];
}) {
  const [emblaRef, api] = useEmblaCarousel({ duration: 30, loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const hasMany = slides.length > 1;

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

  const { pause, resume } = useCarouselAutoplay({
    api,
    enabled: hasMany,
    selectedIndex,
  });

  const scrollTo = useCallback((index: number) => api?.scrollTo(index), [api]);

  return (
    // biome-ignore lint/a11y/useSemanticElements: the ARIA carousel pattern pairs role="region" with aria-roledescription="carousel"; there is no semantic HTML equivalent.
    <div
      aria-label={label}
      aria-roledescription="carousel"
      onBlurCapture={resume}
      onFocusCapture={pause}
      role="region"
    >
      <div className={cn("relative isolate overflow-hidden", className)}>
        <div
          className="absolute inset-0 overflow-hidden"
          onPointerEnter={pause}
          onPointerLeave={resume}
          ref={emblaRef}
        >
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
                    "size-full object-cover transition-transform duration-[8000ms] ease-linear",
                    index === selectedIndex ? "scale-105" : "scale-100",
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

        {children}
      </div>

      {hasMany && (
        <div
          className="field-brand mx-auto mt-4 w-fit rounded-full px-4 py-2 sm:mt-5"
          onPointerEnter={pause}
          onPointerLeave={resume}
        >
          <div className="flex items-center gap-2">
            {slides.map((slide, index) => {
              const active = index === selectedIndex;
              return (
                <button
                  aria-current={active}
                  aria-label={`Show slide ${index + 1} of ${slides.length}`}
                  className="group p-1.5"
                  key={slide.src}
                  onClick={() => scrollTo(index)}
                  type="button"
                >
                  <span
                    className={cn(
                      "block size-2 rounded-full transition-colors",
                      active
                        ? "bg-ink"
                        : "bg-ink-muted/60 group-hover:bg-ink-muted",
                    )}
                  />
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
