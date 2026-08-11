"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from "@/components/ui/carousel";
import type { ContentImage } from "@/lib/content";
import { cn } from "@/lib/utils";

export function HeroSlider({
  className,
  label,
  slides,
}: {
  readonly className?: string;
  readonly label: string;
  readonly slides: readonly ContentImage[];
}) {
  if (slides.length === 0) return null;

  return (
    <Carousel
      aria-label={label}
      aria-roledescription="carousel"
      className={cn("flex flex-col gap-4", className)}
      opts={{ align: "start", loop: true }}
    >
      <CarouselContent viewportClassName="rounded-3xl">
        {slides.map((slide, position) => (
          <CarouselItem key={slide.src}>
            <div className="relative aspect-3/2 w-full overflow-hidden bg-surface-raised sm:aspect-16/9 lg:aspect-21/9">
              <Image
                alt={slide.alt}
                className="size-full object-cover"
                draggable={false}
                fetchPriority={position === 0 ? "high" : "auto"}
                height={slide.height}
                loading={position === 0 ? "eager" : "lazy"}
                priority={position === 0}
                sizes="(max-width: 1024px) 100vw, 1200px"
                src={slide.src}
                width={slide.width}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselDots
        getDotLabel={(index) => `Show image ${index + 1} of ${slides.length}`}
      />
    </Carousel>
  );
}
