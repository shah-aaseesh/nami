"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from "@/components/ui/carousel";
import { useCarouselAutoplay } from "@/hooks/motion/use-carousel-autoplay";
import type { ContentImage } from "@/lib/content";

export type CareerPartner = {
  readonly id: string;
  readonly name: string;
  readonly logo: ContentImage | null;
};

type LogoPage = {
  readonly key: string;
  readonly logos: readonly CareerPartner[];
};

const LOGOS_PER_PAGE = 9;
const PAGE_INTERVAL_MS = 5000;

function paginate(items: readonly CareerPartner[]): readonly LogoPage[] {
  const pages: LogoPage[] = [];

  for (let start = 0; start < items.length; start += LOGOS_PER_PAGE) {
    const logos = items.slice(start, start + LOGOS_PER_PAGE);
    pages.push({ key: logos.map((logo) => logo.id).join("|"), logos });
  }

  return pages;
}

export function PartnerCarousel({
  items,
  label,
}: {
  readonly items: readonly CareerPartner[];
  readonly label: string;
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);

  const pages = paginate(items);

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

  useCarouselAutoplay({
    api,
    enabled: pages.length > 1 && !hovering && !focusWithin,
    intervalMs: PAGE_INTERVAL_MS,
    selectedIndex,
  });

  return (
    <div
      onBlurCapture={() => setFocusWithin(false)}
      onFocusCapture={() => setFocusWithin(true)}
      onPointerEnter={() => setHovering(true)}
      onPointerLeave={() => setHovering(false)}
    >
      <Carousel
        aria-label={label}
        aria-roledescription="carousel"
        opts={{ duration: 24, loop: true }}
        setApi={setApi}
      >
        <CarouselContent>
          {pages.map((page, position) => (
            <CarouselItem
              aria-label={`${position + 1} of ${pages.length}`}
              key={page.key}
            >
              <ul className="grid grid-cols-3 gap-3 md:gap-4">
                {page.logos.map((partner) => (
                  <li className="aspect-square" key={partner.id}>
                    {partner.logo === null ? (
                      <span className="block size-full rounded-xl border border-dashed">
                        <span className="sr-only">{partner.name}</span>
                      </span>
                    ) : (
                      <Image
                        alt={partner.name}
                        className="size-full object-contain p-3 md:p-4"
                        height={partner.logo.height}
                        loading="lazy"
                        sizes="(min-width: 1024px) 18vw, 31vw"
                        src={partner.logo.src}
                        width={partner.logo.width}
                      />
                    )}
                  </li>
                ))}
              </ul>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselDots className="mt-8" dotLabel="Go to logo page" />
      </Carousel>
    </div>
  );
}
