"use client";

import Image from "next/image";
import { Eyebrow, H2, Standfirst } from "@/components/ui/typography";
import type { ContentImage } from "@/lib/content";
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
  if (images.length === 0) return null;

  return (
    <section className="gutter-x section-y overflow-hidden field-brand">
      <div className="mx-auto max-w-page">
        <div className="max-w-2xl">
          <Eyebrow>Campus & Facilities</Eyebrow>
          <H2 className="mt-4">{title}</H2>
          <Standfirst className="mt-4">{subtitle}</Standfirst>
        </div>

        <div className="mt-10 sm:mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:gap-6">
          {images.map((img, idx) => {
            const isTopRow = idx < 2;
            const spanClass = isTopRow
              ? "sm:col-span-1 lg:col-span-6 aspect-[4/3] lg:aspect-[16/9]"
              : "sm:col-span-1 lg:col-span-4 aspect-[4/3] lg:aspect-[4/3]";

            return (
              <figure
                className={cn(
                  "group relative overflow-hidden rounded-media bg-neutral-900 shadow-md transition-transform duration-300 hover:scale-[1.01]",
                  spanClass,
                )}
                key={img.src}
              >
                <Image
                  alt={img.alt}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  height={img.height}
                  sizes={
                    isTopRow
                      ? "(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw"
                      : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  }
                  src={img.src}
                  width={img.width}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />
                <figcaption className="absolute inset-x-0 bottom-0 p-4 sm:p-5 text-white">
                  <p className="font-body text-xs sm:text-sm font-medium leading-snug">
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
