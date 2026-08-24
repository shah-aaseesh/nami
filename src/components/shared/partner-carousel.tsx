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
  // Partners share one placeholder mark, so the name is text and the image is decorative.
  return (
    <li
      className={cn(
        "flex h-24 w-52 shrink-0 items-center justify-center overflow-hidden rounded-xl border bg-surface-raised md:h-28 md:w-64 lg:h-32 lg:w-80",
        partner.logo === null && "border-dashed",
      )}
    >
      <span className="sr-only">{partner.name}</span>
      {partner.logo !== null && (
        <Image
          alt=""
          className="h-3/5 w-3/4 object-contain"
          height={partner.logo.height}
          loading="lazy"
          sizes="(min-width: 1024px) 240px, (min-width: 768px) 192px, 156px"
          src={partner.logo.src}
          width={partner.logo.width}
        />
      )}
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
      className={cn("flex items-center gap-3 md:gap-4", className)}
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
      className="flex flex-col gap-3 md:gap-4"
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
          <PartnerRow className="pe-3 md:pe-4" logos={row.logos} />
        </Marquee>
      ))}
    </div>
  );
}
