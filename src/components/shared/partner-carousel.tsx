"use client";

import Image from "next/image";
import { useRef } from "react";
import { Marquee } from "@/components/motion/marquee";
import type { ContentImage } from "@/lib/content";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

export type CareerPartner = {
  readonly id: string;
  readonly name: string;
  readonly logo: ContentImage | null;
};

type LogoRow = {
  readonly key: string;
  readonly logos: readonly CareerPartner[];
  readonly reverse: boolean;
  readonly speed: number;
};

const FORWARD_SPEED = 45;
const REVERSE_SPEED = 35;

function splitRows(items: readonly CareerPartner[]): readonly LogoRow[] {
  const half = Math.ceil(items.length / 2);

  return [
    { logos: items.slice(0, half), reverse: false, speed: FORWARD_SPEED },
    { logos: items.slice(half), reverse: true, speed: REVERSE_SPEED },
  ]
    .filter((row) => row.logos.length > 0)
    .map((row) => ({
      ...row,
      key: row.logos.map((logo) => logo.id).join("|"),
    }));
}

function PartnerTile({ partner }: { readonly partner: CareerPartner }) {
  if (partner.logo === null) {
    return (
      <li className="flex shrink-0 items-center justify-center px-2">
        <span className="font-display text-sm sm:text-base font-medium text-ink-muted">
          {partner.name}
        </span>
      </li>
    );
  }

  return (
    <li className="flex shrink-0 items-center justify-center px-1 sm:px-1.5">
      <span className="sr-only">{partner.name}</span>
      <Image
        alt={partner.name}
        className="h-auto max-h-12 sm:max-h-16 lg:max-h-20 w-24 sm:w-32 lg:w-40 xl:w-44 object-contain transition-transform duration-300 hover:scale-105"
        height={partner.logo.height}
        loading="lazy"
        sizes="(min-width: 1280px) 176px, (min-width: 1024px) 160px, (min-width: 640px) 128px, 96px"
        src={partner.logo.src}
        width={partner.logo.width}
      />
    </li>
  );
}

function PartnerRow({
  className,
  label,
  logos,
}: {
  readonly className?: string;
  readonly label?: string;
  readonly logos: readonly CareerPartner[];
}) {
  return (
    <ul
      aria-label={label}
      className={cn("flex items-center gap-1.5 sm:gap-2 lg:gap-2.5", className)}
    >
      {logos.map((partner) => (
        <PartnerTile key={partner.id} partner={partner} />
      ))}
    </ul>
  );
}

export function PartnerCarousel({
  items,
  label,
}: {
  readonly items: readonly CareerPartner[];
  readonly label: string;
}) {
  const rows = useRef<HTMLDivElement>(null);

  // Marquee exposes no pause handle, so reach the loop through the tween that
  // targets its track — the only child of the labelled group it renders.
  const setPaused = (paused: boolean) => {
    const root = rows.current;
    if (root === null) return;

    for (const track of root.querySelectorAll<HTMLElement>(
      '[role="group"] > div',
    )) {
      for (const tween of gsap.getTweensOf(track)) {
        if (paused) tween.pause();
        else tween.resume();
      }
    }
  };

  const logoRows = splitRows(items);
  const rowLabel = (position: number) =>
    logoRows.length === 1
      ? label
      : `${label} (${position + 1} of ${logoRows.length})`;

  return (
    <div
      className="flex flex-col gap-2 sm:gap-3"
      onBlurCapture={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      ref={rows}
    >
      {logoRows.map((row, position) => (
        <Marquee
          key={row.key}
          label={rowLabel(position)}
          reverse={row.reverse}
          speed={row.speed}
        >
          <PartnerRow className="pe-1.5 sm:pe-2 lg:pe-2.5" logos={row.logos} />
        </Marquee>
      ))}
    </div>
  );
}
