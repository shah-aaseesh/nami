"use client";

import Image from "next/image";
import type { CSSProperties, RefObject } from "react";
import { useEffect, useRef, useState } from "react";
import type { ContentImage } from "@/lib/content";
import { gsap, Observer, ScrollTrigger, useGSAP } from "@/lib/gsap";

export type CareerPartner = {
  readonly id: string;
  readonly name: string;
  readonly tag: string;
  readonly logo: ContentImage | null;
};

const SPIN_SECONDS = 90;
const MAX_BOOST = 3;
const PLATE_WIDTH = 288;
const MIN_PLATE_WIDTH = 240;
const PLATE_WIDTH_RATIO = 0.3;
const PLATE_GAP = 32;
const VELOCITY_DIVISOR = 600;

function ringRadius(count: number, plateWidth: number) {
  if (count < 3) return 0;
  return Math.round((plateWidth + PLATE_GAP) / 2 / Math.tan(Math.PI / count));
}

function useRailPlateWidth(rail: RefObject<HTMLDivElement | null>) {
  const [plateWidth, setPlateWidth] = useState(PLATE_WIDTH);

  useEffect(() => {
    const railEl = rail.current;
    if (!railEl) return;

    const resizeObserver = new ResizeObserver(([entry]) => {
      const width = entry?.contentRect.width;
      if (width === undefined) return;
      setPlateWidth(
        gsap.utils.clamp(
          MIN_PLATE_WIDTH,
          PLATE_WIDTH,
          width * PLATE_WIDTH_RATIO,
        ),
      );
    });

    resizeObserver.observe(railEl);
    return () => resizeObserver.disconnect();
  }, [rail]);

  return plateWidth;
}

function PartnerPlate({ partner }: { readonly partner: CareerPartner }) {
  return (
    <div className="flex h-full flex-col justify-center gap-4 rounded-2xl border border-border bg-surface-raised px-5 py-6 md:h-40 md:px-6">
      {partner.logo === null ? (
        <p className="font-display text-xl font-normal text-balance text-ink">
          {partner.name}
        </p>
      ) : (
        <Image
          alt={partner.logo.alt}
          className="h-10 w-auto object-contain object-left"
          height={partner.logo.height}
          loading="lazy"
          sizes="160px"
          src={partner.logo.src}
          width={partner.logo.width}
        />
      )}

      <p className="font-body text-xs font-medium tracking-widest text-accent uppercase">
        {partner.tag}
      </p>
    </div>
  );
}

export function PartnerCarousel({
  items,
  label,
}: {
  readonly items: readonly CareerPartner[];
  readonly label: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLUListElement>(null);
  const plateWidth = useRailPlateWidth(root);

  useGSAP(
    () => {
      const stageEl = stage.current;
      const rootEl = root.current;
      if (!stageEl || !rootEl) return;

      const spin = { angle: 0 };
      const loop = gsap.to(spin, {
        angle: -360,
        duration: SPIN_SECONDS,
        ease: "none",
        repeat: -1,
        onUpdate: () => {
          stageEl.style.setProperty("--ring-spin", `${spin.angle}deg`);
        },
      });

      // Park the playhead far into the future so a negative timeScale never
      // reaches totalTime 0, which would stop the loop dead.
      loop.totalTime(SPIN_SECONDS * 1000);

      const trigger = ScrollTrigger.create({
        trigger: rootEl,
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) => {
          if (self.isActive) loop.play();
          else loop.pause();
        },
      });

      if (!trigger.isActive) loop.pause();

      const observer = Observer.create({
        type: "wheel,touch,scroll",
        onChangeY: (self) => {
          if (!trigger.isActive) return;

          const boost =
            1 +
            gsap.utils.clamp(
              0,
              MAX_BOOST,
              Math.abs(self.velocityY) / VELOCITY_DIVISOR,
            );
          gsap.to(loop, {
            timeScale: (self.deltaY > 0 ? 1 : -1) * boost,
            duration: 0.35,
            overwrite: true,
          });
        },
        onStop: () => {
          gsap.to(loop, { timeScale: 1, duration: 0.9, overwrite: true });
        },
        onStopDelay: 0.2,
      });

      return () => {
        observer.kill();
        trigger.kill();
      };
    },
    { scope: root },
  );

  if (items.length === 0) return null;

  const radius = ringRadius(items.length, plateWidth);
  const step = 360 / items.length;

  return (
    <div className="relative overflow-hidden" ref={root}>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-linear-to-r from-surface to-transparent md:w-40" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-linear-to-l from-surface to-transparent md:w-40" />

      <div className="md:h-40 md:[perspective:1500px]">
        <ul
          aria-label={label}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 md:relative md:block md:h-full md:snap-none md:overflow-x-visible md:pb-0 md:[transform-style:preserve-3d] md:[transform:translateZ(calc(-1*var(--ring-radius)))_rotateY(var(--ring-spin))]"
          ref={stage}
          style={
            {
              "--ring-radius": `${radius}px`,
              "--ring-plate-width": `${plateWidth}px`,
              "--ring-step": `${step.toFixed(4)}deg`,
              "--ring-spin": "0deg",
            } as CSSProperties
          }
          // biome-ignore lint/a11y/noNoninteractiveTabindex: below md the rail is a horizontal scroll region with no focusable child, so WCAG 2.1.1 (axe scrollable-region-focusable) requires it be reachable by keyboard.
          tabIndex={0}
        >
          {items.map((partner, index) => (
            <li
              className="w-64 shrink-0 snap-start md:absolute md:top-1/2 md:left-1/2 md:w-[var(--ring-plate-width)] md:[backface-visibility:hidden] md:[transform:translate(-50%,-50%)_rotateY(calc(var(--ring-index)*var(--ring-step)))_translateZ(var(--ring-radius))]"
              key={partner.id}
              style={{ "--ring-index": String(index) } as CSSProperties}
            >
              <PartnerPlate partner={partner} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
