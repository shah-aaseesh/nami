"use client";

import { type KeyboardEvent, useCallback, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import type { Testimonial } from "@/lib/content";
import { ArrowRightIcon } from "@/lib/icons";
import { TestimonialCard } from "./testimonials-card";

function slideTargets(track: HTMLElement): readonly number[] {
  const first = track.firstElementChild;
  if (!(first instanceof HTMLElement)) return [];

  return Array.from(track.children, (slide) =>
    slide instanceof HTMLElement ? slide.offsetLeft - first.offsetLeft : 0,
  );
}

export function TestimonialsCarousel({
  items,
  label,
}: {
  items: readonly Testimonial[];
  label: string;
}) {
  const track = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);

  const goTo = useCallback((slide: number) => {
    const el = track.current;
    if (el === null) return;

    const targets = slideTargets(el);
    const left = targets[Math.min(Math.max(slide, 0), targets.length - 1)];
    if (left === undefined) return;

    el.scrollTo({
      left,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  }, []);

  const syncIndex = useCallback(() => {
    const el = track.current;
    if (el === null) return;

    const targets = slideTargets(el);
    let nearest = 0;
    targets.forEach((left, slide) => {
      const best = targets[nearest] ?? 0;
      if (Math.abs(left - el.scrollLeft) < Math.abs(best - el.scrollLeft) - 1) {
        nearest = slide;
      }
    });
    setIndex(nearest);
  }, []);

  const onKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    const keys: Record<string, number> = {
      ArrowLeft: index - 1,
      ArrowRight: index + 1,
      Home: 0,
      End: items.length - 1,
    };
    const slide = keys[event.key];
    if (slide === undefined) return;

    event.preventDefault();
    goTo(slide);
  };

  const atStart = index === 0;
  const atEnd = index === items.length - 1;

  return (
    <div>
      <div className="flex items-center justify-end gap-5">
        <p
          aria-hidden="true"
          className="font-body text-sm text-ink-muted tabular-nums"
        >
          {String(index + 1).padStart(2, "0")} /{" "}
          {String(items.length).padStart(2, "0")}
        </p>
        <p aria-live="polite" className="sr-only">
          Testimonial {index + 1} of {items.length}
        </p>

        <div className="flex items-center gap-2">
          <Button
            aria-disabled={atStart}
            aria-label="Previous testimonial"
            className="rounded-full aria-disabled:opacity-40"
            onClick={() => goTo(index - 1)}
            size="icon"
            variant="quiet"
          >
            <Icon className="rotate-180" icon={ArrowRightIcon} />
          </Button>
          <Button
            aria-disabled={atEnd}
            aria-label="Next testimonial"
            className="rounded-full aria-disabled:opacity-40"
            onClick={() => goTo(index + 1)}
            size="icon"
            variant="quiet"
          >
            <Icon icon={ArrowRightIcon} />
          </Button>
        </div>
      </div>

      <ul
        aria-label={label}
        aria-roledescription="carousel"
        className="mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto [scrollbar-width:none] sm:gap-6 lg:mt-8"
        onKeyDown={onKeyDown}
        onScroll={syncIndex}
        ref={track}
        // biome-ignore lint/a11y/noNoninteractiveTabindex: a scrollable region must be reachable by keyboard
        tabIndex={0}
      >
        {items.map((testimonial, slide) => (
          <li
            aria-label={`${slide + 1} of ${items.length}`}
            aria-roledescription="slide"
            className="w-full shrink-0 snap-start"
            key={testimonial.id}
          >
            <TestimonialCard className="h-full" testimonial={testimonial} />
          </li>
        ))}
      </ul>
    </div>
  );
}
