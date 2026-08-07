"use client";

import Image from "next/image";
import { useRef } from "react";
import { Eyebrow, H2, Standfirst } from "@/components/ui/typography";
import type { ContentImage } from "@/lib/content";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

export function ScrubbedBentoGallery({
  images,
  title = "Learning Environment & Campus Life",
  subtitle = "State-of-the-art facilities, modern science & ICT laboratories, library reading rooms, and vibrant student spaces.",
}: {
  readonly images: readonly ContentImage[];
  readonly title?: string;
  readonly subtitle?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tiles =
          container.querySelectorAll<HTMLElement>("[data-bento-tile]");
        if (tiles.length === 0) return;

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1,
          },
        });

        tiles.forEach((tile, index) => {
          const dir = index % 2 === 0 ? 1 : -1;
          const yDist = 30 + (index % 3) * 20;

          timeline.fromTo(
            tile,
            { y: yDist * dir, scale: 0.94, opacity: 0.8 },
            { y: 0, scale: 1, opacity: 1, ease: "power2.out" },
            0,
          );
        });
      });
    },
    { scope: containerRef },
  );

  if (images.length === 0) return null;

  return (
    <section
      className="gutter-x section-y overflow-hidden field-brand"
      ref={containerRef}
    >
      <div className="mx-auto max-w-page">
        <div className="max-w-2xl">
          <Eyebrow>Campus & Facilities</Eyebrow>
          <H2 className="mt-4">{title}</H2>
          <Standfirst className="mt-4">{subtitle}</Standfirst>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:gap-6">
          {images.map((img, idx) => {
            const isLarge = idx === 0;
            const spanClass = isLarge
              ? "sm:col-span-2 lg:col-span-8 lg:row-span-2 aspect-[16/9] lg:aspect-auto min-h-[300px] lg:min-h-[420px]"
              : idx === 1
                ? "lg:col-span-4 aspect-[4/3]"
                : idx === 2
                  ? "lg:col-span-4 aspect-[4/3]"
                  : "sm:col-span-2 lg:col-span-4 aspect-[16/9]";

            return (
              <figure
                className={cn(
                  "group relative overflow-hidden rounded-media bg-neutral-900 shadow-md transition-transform duration-300 hover:scale-[1.01]",
                  spanClass,
                )}
                data-bento-tile=""
                key={img.src}
              >
                <Image
                  alt={img.alt}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  height={img.height}
                  sizes={
                    isLarge
                      ? "(min-width: 1024px) 66vw, 100vw"
                      : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  }
                  src={img.src}
                  width={img.width}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />
                <figcaption className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <p className="font-body text-sm font-medium leading-snug">
                    {img.alt}
                  </p>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
