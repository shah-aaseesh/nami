"use client";

import { useRef } from "react";
import { Eyebrow, H6, P, Standfirst } from "@/components/ui/typography";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

export type SchoolAdmissionStep = {
  readonly title: string;
  readonly body: string;
};

export type SchoolAdmissionCopy = {
  readonly eyebrow: string;
  readonly heading: string;
  readonly standfirst: string;
  readonly stepLabel: string;
  readonly steps: readonly SchoolAdmissionStep[];
};

const VISIBLE_CARDS = 3.5;
const RING_RADIUS = 23;
const RING_LENGTH = 2 * Math.PI * RING_RADIUS;

function StepRing({
  label,
  position,
  total,
}: {
  readonly label: string;
  readonly position: number;
  readonly total: number;
}) {
  return (
    <span className="relative grid size-12 shrink-0 place-items-center">
      <svg
        aria-hidden="true"
        className="absolute inset-0 size-full -rotate-90"
        fill="none"
        viewBox="0 0 48 48"
      >
        <circle
          className="stroke-border"
          cx="24"
          cy="24"
          r={RING_RADIUS}
          strokeWidth="1"
        />
        <circle
          className="stroke-accent"
          cx="24"
          cy="24"
          r={RING_RADIUS}
          strokeDasharray={RING_LENGTH}
          strokeDashoffset={RING_LENGTH * (1 - position / total)}
          strokeLinecap="round"
          strokeWidth="1.5"
        />
      </svg>

      <span className="relative font-display text-lg text-accent">
        <span className="sr-only">{label} </span>
        {position}
      </span>
    </span>
  );
}

export function SchoolAdmission({
  copy,
  id,
}: {
  readonly copy: SchoolAdmissionCopy;
  readonly id?: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);

  const total = copy.steps.length;
  const isScrollable = total > VISIBLE_CARDS;

  useGSAP(
    () => {
      if (!isScrollable) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const track = trackRef.current;
        const section = sectionRef.current;
        if (!track || !section) return;

        const getScrollAmount = () => track.scrollWidth - track.offsetWidth;

        const tween = gsap.to(track, {
          x: () => -getScrollAmount(),
          ease: "none",
        });

        ScrollTrigger.create({
          animation: tween,
          end: () => `+=${getScrollAmount()}`,
          invalidateOnRefresh: true,
          pin: true,
          scrub: 1,
          snap: {
            duration: 0.2,
            ease: "power1.inOut",
            snapTo: 1 / (total - VISIBLE_CARDS),
          },
          start: "top top",
          trigger: section,
        });
      });

      return () => mm.revert();
    },
    { dependencies: [isScrollable, total], scope: sectionRef },
  );

  if (total === 0) return null;

  return (
    <section className="gutter-x section-y" id={id} ref={sectionRef}>
      <div className="mx-auto max-w-page overflow-hidden">
        <div className="flex items-center gap-5">
          <Eyebrow>{copy.eyebrow}</Eyebrow>
          <span className="h-px flex-1 bg-border" />
        </div>

        <div className="mt-6 flex flex-col gap-6 lg:mt-8 lg:flex-row lg:items-end lg:justify-between lg:gap-x-16">
          <h2 className="font-display text-4xl font-normal text-balance text-ink lg:max-w-2xl lg:text-5xl">
            {copy.heading}
          </h2>

          <div className="lg:max-w-md">
            <Standfirst>{copy.standfirst}</Standfirst>
          </div>
        </div>

        <ol
          className="scrollbar-hide mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 sm:gap-8 lg:mt-20 lg:overflow-x-visible lg:pb-0"
          ref={trackRef}
        >
          {copy.steps.map((step, index) => (
            <li
              className="flex w-[78vw] max-w-80 shrink-0 snap-start flex-col gap-5 rounded-2xl border border-border bg-surface-raised p-6 sm:w-[46vw] lg:w-[calc((100%-6rem)/3.5)] lg:max-w-none lg:p-8"
              key={step.title}
            >
              <StepRing
                label={copy.stepLabel}
                position={index + 1}
                total={total}
              />

              <div>
                <H6 as="h3" className="text-ink">
                  {step.title}
                </H6>
                <P className="mt-3 text-sm text-ink-muted">{step.body}</P>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
