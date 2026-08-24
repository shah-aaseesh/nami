"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import type { ContentImage } from "@/lib/content";
import { gsap } from "@/lib/gsap";
import { ChevronDownIcon, ChevronUpIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

const HOLD_SECONDS = 3.2;
const SLIDE_SECONDS = 0.9;
const AUTOPLAY_MS = (HOLD_SECONDS + SLIDE_SECONDS) * 1000;
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export function UpdatesCarousel({
  className,
  images,
}: {
  className?: string;
  images: readonly ContentImage[];
}) {
  const track = useRef<HTMLUListElement>(null);
  const stepRef = useRef(0);
  const [index, setIndex] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const count = images.length;
  const canSlide = count > 1;

  useEffect(() => {
    const query = window.matchMedia(REDUCED_MOTION_QUERY);
    setPrefersReducedMotion(query.matches);
    const onChange = (event: MediaQueryListEvent) =>
      setPrefersReducedMotion(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const el = track.current;
    return () => {
      if (el !== null) gsap.killTweensOf(el);
    };
  }, []);

  const navigate = useCallback(
    (direction: 1 | -1) => {
      const el = track.current;
      if (el === null || count < 2) return;

      const from = stepRef.current % count;
      const next = (from + direction + count) % count;
      const wrapsForward = direction === 1 && next === 0;
      const wrapsBackward = direction === -1 && from === 0;

      gsap.killTweensOf(el);
      gsap.set(el, { yPercent: -100 * (wrapsBackward ? count : from) });

      stepRef.current = next;
      setIndex(next);

      gsap.to(el, {
        duration: prefersReducedMotion ? 0 : SLIDE_SECONDS,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.set(el, { yPercent: -100 * next });
        },
        yPercent: -100 * (wrapsForward ? count : next),
      });
    },
    [count, prefersReducedMotion],
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: index is an intentional re-key — every advance, by arrow or by autoplay, restarts the hold countdown.
  useEffect(() => {
    if (!canSlide || hovering || focusWithin || prefersReducedMotion) return;
    const id = window.setInterval(() => {
      if (!document.hidden) navigate(1);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [canSlide, focusWithin, hovering, index, navigate, prefersReducedMotion]);

  const [first] = images;
  const loopSlide =
    first === undefined || !canSlide
      ? []
      : [{ duplicate: true, image: first, key: `${first.src}-loop` }];
  const slides = [
    ...images.map((image) => ({ duplicate: false, image, key: image.src })),
    ...loopSlide,
  ];

  if (slides.length === 0) return null;

  return (
    <section
      aria-label="Notice images"
      aria-roledescription="carousel"
      className={cn("relative overflow-hidden", className)}
      onBlurCapture={() => setFocusWithin(false)}
      onFocusCapture={() => setFocusWithin(true)}
      onPointerEnter={() => setHovering(true)}
      onPointerLeave={() => setHovering(false)}
    >
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

      {canSlide ? (
        <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between">
          <div className="flex justify-center bg-linear-to-b from-neutral-950/55 via-neutral-950/20 to-transparent p-3 pb-6">
            <Button
              aria-label="Previous notice"
              className="pointer-events-auto rounded-full focus-visible:ring-3 focus-visible:ring-primary-foreground/70"
              onClick={() => navigate(-1)}
              size="icon-lg"
              type="button"
            >
              <Icon icon={ChevronUpIcon} />
            </Button>
          </div>

          <div className="flex justify-center bg-linear-to-t from-neutral-950/55 via-neutral-950/20 to-transparent p-3 pt-6">
            <Button
              aria-label="Next notice"
              className="pointer-events-auto rounded-full focus-visible:ring-3 focus-visible:ring-primary-foreground/70"
              onClick={() => navigate(1)}
              size="icon-lg"
              type="button"
            >
              <Icon icon={ChevronDownIcon} />
            </Button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
