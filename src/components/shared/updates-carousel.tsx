"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { ContentImage } from "@/lib/content";
import { cn } from "@/lib/utils";

export function UpdatesCarousel({
  className,
  images,
}: {
  className?: string;
  images: readonly ContentImage[];
}) {
  if (images.length === 0) return null;

  const hasMany = images.length > 1;

  return (
    <Carousel
      aria-label="Notice images"
      aria-roledescription="carousel"
      autoplay={hasMany}
      autoplayIntervalMs={2500}
      className={cn("relative size-full overflow-hidden", className)}
      opts={{ axis: "y", duration: 25, loop: true }}
    >
      <CarouselContent
        className="h-full -mt-0"
        viewportClassName="size-full overflow-hidden"
      >
        {images.map((image) => (
          <CarouselItem
            className="relative size-full basis-full pt-0"
            key={image.src}
          >
            <Image
              alt={image.alt}
              className="object-cover"
              fill
              loading="lazy"
              sizes="(min-width: 1024px) 42vw, 100vw"
              src={image.src}
            />
          </CarouselItem>
        ))}
      </CarouselContent>

      {hasMany && (
        <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between">
          <div className="flex justify-center bg-linear-to-b from-neutral-950/55 via-neutral-950/20 to-transparent p-3 pb-6">
            <CarouselPrevious
              aria-label="Previous notice"
              className="pointer-events-auto rounded-full focus-visible:ring-3 focus-visible:ring-primary-foreground/70"
              size="icon-lg"
            />
          </div>

          <div className="flex justify-center bg-linear-to-t from-neutral-950/55 via-neutral-950/20 to-transparent p-3 pt-6">
            <CarouselNext
              aria-label="Next notice"
              className="pointer-events-auto rounded-full focus-visible:ring-3 focus-visible:ring-primary-foreground/70"
              size="icon-lg"
            />
          </div>
        </div>
      )}
    </Carousel>
  );
}
