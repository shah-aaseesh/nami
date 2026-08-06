"use client";

import {
  type KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import type { Testimonial } from "@/lib/content";
import { gsap, matchMotion, useGSAP } from "@/lib/gsap";
import { ArrowRightIcon, QuoteIcon } from "@/lib/icons";
import { TestimonialCard } from "./testimonials-card";

const AUTOPLAY_SECONDS = 5;
const RING_RADIUS = 20;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

function Slide({ testimonial }: { testimonial: Testimonial }) {
  const panel = useRef<HTMLDivElement>(null);

  useGSAP(
    () =>
      matchMotion(
        {
          motion: () => {
            const el = panel.current;
            if (el === null) return;
            gsap.fromTo(
              el,
              { opacity: 0, y: 24 },
              { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
            );
          },
        },
        panel,
      ),
    { scope: panel },
  );

  return (
    <div ref={panel} className="mt-6 lg:mt-8">
      <TestimonialCard panel={false} testimonial={testimonial} />
    </div>
  );
}

export function TestimonialsCarousel({
  items,
  label,
}: {
  items: readonly Testimonial[];
  label: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  const ring = useRef<SVGCircleElement>(null);
  const [index, setIndex] = useState(0);
  const [inView, setInView] = useState(false);

  const count = items.length;
  const current = items[index];

  useEffect(() => {
    const el = root.current;
    if (el === null) return;
    const observer = new IntersectionObserver(
      (entries) => setInView(entries[0]?.isIntersecting ?? false),
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const autoplay = inView && count > 1;
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  const stopRing = useCallback(() => {
    if (tweenRef.current !== null) {
      tweenRef.current.kill();
      tweenRef.current = null;
    }
    const circle = ring.current;
    if (circle !== null) {
      gsap.set(circle, { strokeDashoffset: RING_CIRCUMFERENCE });
    }
  }, []);

  const startRing = useCallback(() => {
    const circle = ring.current;
    if (circle === null) return;
    stopRing();
    if (!autoplay) return;
    tweenRef.current = gsap.to(circle, {
      strokeDashoffset: 0,
      duration: AUTOPLAY_SECONDS,
      ease: "none",
      onComplete: () => {
        tweenRef.current = null;
        setIndex((currentIndex) => (currentIndex + 1) % count);
        startRing();
      },
    });
  }, [autoplay, count, stopRing]);

  useEffect(() => {
    startRing();
    return () => {
      stopRing();
    };
  }, [startRing, stopRing]);

  const goTo = useCallback(
    (slide: number) => {
      setIndex(((slide % count) + count) % count);
      startRing();
    },
    [count, startRing],
  );

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const actions: Record<string, () => void> = {
      ArrowLeft: () => goTo(index - 1),
      ArrowRight: () => goTo(index + 1),
      Home: () => goTo(0),
      End: () => goTo(count - 1),
    };
    const action = actions[event.key];
    if (action === undefined) return;
    event.preventDefault();
    action();
  };

  if (current === undefined) return null;

  return (
    <section
      aria-label={label}
      aria-roledescription="carousel"
      className="outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4"
      onKeyDown={onKeyDown}
      ref={root}
      // biome-ignore lint/a11y/noNoninteractiveTabindex: the carousel region must be reachable by keyboard
      tabIndex={0}
    >
      <div className="rounded-3xl border border-border-strong bg-surface-raised p-6 sm:p-10 lg:p-14">
        <div className="flex flex-col items-start gap-10 lg:flex-row lg:gap-48">
          <div className="flex items-center gap-3">
            <Button
              aria-label="Previous testimonial"
              className="rounded-full"
              onClick={() => goTo(index - 1)}
              size="icon"
              variant="quiet"
            >
              <Icon className="rotate-180" icon={ArrowRightIcon} />
            </Button>
            <div className="relative">
              <Button
                aria-label="Next testimonial"
                className="rounded-full"
                onClick={() => goTo(index + 1)}
                size="icon"
                variant="quiet"
              >
                <Icon icon={ArrowRightIcon} />
              </Button>
              <svg
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 size-full -rotate-90"
                focusable="false"
                viewBox="0 0 44 44"
              >
                <circle
                  className="stroke-accent"
                  cx="22"
                  cy="22"
                  fill="none"
                  r={RING_RADIUS}
                  ref={ring}
                  strokeDasharray={RING_CIRCUMFERENCE}
                  strokeDashoffset={RING_CIRCUMFERENCE}
                  strokeLinecap="round"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>

          <div className="min-w-0 grow">
            <div className="flex items-center justify-between gap-6">
              <Icon
                className="size-8 text-accent lg:size-10"
                icon={QuoteIcon}
              />
              <p
                aria-hidden="true"
                className="font-body text-sm text-ink-muted tabular-nums"
              >
                {String(index + 1).padStart(2, "0")} /{" "}
                {String(count).padStart(2, "0")}
              </p>
            </div>
            <p aria-live="polite" className="sr-only">
              Testimonial {index + 1} of {count}
            </p>
            <Slide key={current.id} testimonial={current} />
          </div>
        </div>
      </div>
    </section>
  );
}
