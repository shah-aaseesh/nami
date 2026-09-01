"use client";

import {
  Briefcase02Icon,
  CheckmarkCircle02Icon,
  QuoteUpIcon,
  SparklesIcon,
} from "@hugeicons/core-free-icons";
import { useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Icon } from "@/components/ui/icon";
import { Eyebrow, H2, H6, Standfirst } from "@/components/ui/typography";
import { FULL_MOTION_QUERY, gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import type { FirstJobStory } from "./careers-copy";

const PIN_QUERY = `${FULL_MOTION_QUERY} and (min-width: 1024px)`;
const PIN_TOP = 110;

function initialsOf(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function CareersFirstJob({
  copy,
  stories,
}: {
  readonly copy: {
    readonly eyebrow: string;
    readonly heading: string;
    readonly standfirst: string;
  };
  readonly stories: readonly FirstJobStory[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(PIN_QUERY, () => {
        const container = containerRef.current;
        const sticky = stickyRef.current;
        if (!container || !sticky) return;

        const pinTrigger = ScrollTrigger.create({
          trigger: container,
          start: `top ${PIN_TOP}px`,
          end: () =>
            `+=${Math.max(0, container.offsetHeight - sticky.offsetHeight - 40)}`,
          pin: sticky,
          pinSpacing: false,
          invalidateOnRefresh: true,
        });

        const cards =
          container.querySelectorAll<HTMLElement>("[data-story-card]");
        const storyTriggers = Array.from(cards).map((card, index) =>
          ScrollTrigger.create({
            trigger: card,
            start: "top center",
            end: "bottom center",
            onEnter: () => setActiveStoryIndex(index),
            onEnterBack: () => setActiveStoryIndex(index),
          }),
        );

        return () => {
          pinTrigger.kill();
          for (const st of storyTriggers) st.kill();
        };
      });

      return () => mm.revert();
    },
    { dependencies: [stories.length], scope: containerRef },
  );

  return (
    <section
      className="gutter-x section-y bg-neutral-100/60 border-y border-border/80"
      id="first-job-stories"
    >
      <div
        className="mx-auto max-w-page grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
        ref={containerRef}
      >
        {/* Sticky Left Column */}
        <div className="lg:col-span-5" ref={stickyRef}>
          <Eyebrow>{copy.eyebrow}</Eyebrow>
          <H2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-normal text-balance text-ink">
            {copy.heading}
          </H2>
          <Standfirst className="mt-5 text-ink-muted leading-relaxed max-w-md">
            {copy.standfirst}
          </Standfirst>

          {/* Key Placement Metrics */}
          <div className="mt-8 flex flex-wrap gap-2.5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-100/90 px-3.5 py-1.5 text-xs font-semibold text-primary-700 ring-1 ring-primary-200">
              <Icon className="size-4" icon={CheckmarkCircle02Icon} />
              100% Placement Guidance
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-raised px-3.5 py-1.5 text-xs font-medium text-ink-muted ring-1 ring-border/80">
              <Icon className="size-3.5 text-accent" icon={SparklesIcon} />
              Direct Corporate Referrals
            </span>
          </div>
        </div>

        {/* Vertical Scrolling Story Cards on the Right */}
        <div className="lg:col-span-7 space-y-8 sm:space-y-10">
          {stories.map((story, index) => (
            <article
              className={cn(
                "group relative rounded-3xl border bg-surface-raised p-7 sm:p-9 lg:p-10 shadow-xs transition-all duration-300",
                activeStoryIndex === index
                  ? "border-primary-700/60 shadow-md ring-1 ring-primary-700/20"
                  : "border-border/80 hover:border-border-strong",
              )}
              data-story-card=""
              key={story.id}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3.5 py-1 text-xs font-semibold text-accent border border-accent/20">
                    <Icon className="size-3.5" icon={Briefcase02Icon} />
                    {story.company}
                  </span>
                  <span className="inline-block rounded-md bg-muted px-2.5 py-1 font-body text-xs font-medium text-ink-muted">
                    {story.supportType}
                  </span>
                </div>
                <span className="text-sm font-mono font-bold text-ink-muted/50 group-hover:text-accent transition-colors">
                  0{index + 1}
                </span>
              </div>

              <blockquote className="mt-6 relative">
                <Icon
                  className="size-8 text-accent/15 absolute -top-3 -left-2 pointer-events-none"
                  icon={QuoteUpIcon}
                />
                <p className="font-display text-lg sm:text-xl font-normal text-ink text-pretty leading-relaxed relative z-1">
                  &ldquo;{story.quote}&rdquo;
                </p>
              </blockquote>

              <div className="mt-8 pt-6 border-t border-border/60 flex items-center gap-4">
                <Avatar size="md">
                  {story.portrait ? (
                    <AvatarImage
                      alt=""
                      height={story.portrait.height}
                      src={story.portrait.src}
                      width={story.portrait.width}
                    />
                  ) : null}
                  <AvatarFallback delay={story.portrait ? 400 : 0}>
                    {initialsOf(story.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <H6
                    as="h4"
                    className="text-base font-semibold text-ink truncate"
                  >
                    {story.name}
                  </H6>
                  <span className="block font-body text-xs font-semibold text-accent truncate">
                    {story.role}
                  </span>
                  <span className="block font-body text-xs text-ink-muted truncate">
                    {story.degree} &bull; Class of {story.graduatedYear}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
