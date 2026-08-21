"use client";

import Image from "next/image";
import { useRef } from "react";
import type { ContentImage } from "@/lib/content";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const HOLD_SECONDS = 3.2;
const SLIDE_SECONDS = 0.9;

export function UpdatesCarousel({
  className,
  images,
}: {
  className?: string;
  images: readonly ContentImage[];
}) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      const el = track.current;
      if (el === null || images.length < 2) return;

      const timeline = gsap.timeline({ repeat: -1 });

      for (let step = 1; step <= images.length; step += 1) {
        timeline.to(el, {
          delay: HOLD_SECONDS,
          duration: SLIDE_SECONDS,
          ease: "power2.inOut",
          yPercent: -100 * step,
        });
      }

      timeline.set(el, { yPercent: 0 });
    },
    { dependencies: [images.length], scope: root },
  );

  const [first] = images;
  const loopSlide =
    first === undefined || images.length < 2
      ? []
      : [{ duplicate: true, image: first, key: `${first.src}-loop` }];
  const slides = [
    ...images.map((image) => ({ duplicate: false, image, key: image.src })),
    ...loopSlide,
  ];

  if (slides.length === 0) return null;

  return (
    <div className={cn("overflow-hidden", className)} ref={root}>
      <ul className="flex h-full flex-col will-change-transform" ref={track}>
        {slides.map((slide) => (
          <li
            aria-hidden={slide.duplicate ? "true" : undefined}
            className="relative h-full shrink-0"
            key={slide.key}
          >
            <Image
              alt={slide.image.alt}
              className="object-cover"
              fill
              loading="lazy"
              sizes="(min-width: 1024px) 42vw, 100vw"
              src={slide.image.src}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
