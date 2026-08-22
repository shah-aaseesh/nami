"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useCarouselAutoplay } from "@/hooks/motion/use-carousel-autoplay";
import type { ContentImage } from "@/lib/content";
import { cn } from "@/lib/utils";

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
                  <li
                    className={cn(
                      "flex aspect-2/1 items-center justify-center overflow-hidden rounded-xl border bg-surface-raised lg:aspect-3/1",
                      partner.logo === null && "border-dashed",
                    )}
                    key={partner.id}
                  >
                    {partner.logo === null ? (
                      <span className="sr-only">{partner.name}</span>
                    ) : (
                      <Image
                        alt={partner.name}
                        className="h-2/5 w-1/2 object-contain"
                        height={partner.logo.height}
                        loading="lazy"
                        sizes="(min-width: 1440px) 136px, (min-width: 1024px) 9vw, 15vw"
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
      </Carousel>
    </div>
  );
}
