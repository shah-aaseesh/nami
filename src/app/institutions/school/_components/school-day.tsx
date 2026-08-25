"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { SectionHeader } from "@/components/shared/section-header";
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Icon } from "@/components/ui/icon";
import { STACK_QUERY } from "@/hooks/motion/use-pinned-cards";
import type { ContentImage } from "@/lib/content";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { ArrowLeftIcon, ArrowRightIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

export type SchoolDayMoment = {
  readonly title: string;
  readonly body: string;
  readonly photo?: ContentImage;
};

export type SchoolDayCopy = {
  readonly eyebrow: string;
  readonly heading: string;
  readonly standfirst: string;
  readonly campusLabel: string;
  readonly campus: readonly SchoolDayMoment[];
};

const SPOTLIGHT_SIZES =
  "(min-width: 1568px) 720px, (min-width: 1024px) 50vw, (min-width: 640px) 90vw, 100vw";
const REFRESH_DELAY_MS = 350;
const PIN_TOP = 112;

export function SchoolDay({
  copy,
  id,
}: {
  readonly copy: SchoolDayCopy;
  readonly id?: string;
}) {
  const [activeTitle, setActiveTitle] = useState<string>(
    copy.campus[0]?.title ?? "",
  );
  const [openValues, setOpenValues] = useState<string[]>([
    copy.campus[0]?.title ?? "",
  ]);

  const trackRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const refreshTimer = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (refreshTimer.current !== null) {
        window.clearTimeout(refreshTimer.current);
      }
    },
    [],
  );

  function triggerScrollRefresh() {
    if (refreshTimer.current !== null) {
      window.clearTimeout(refreshTimer.current);
    }
    refreshTimer.current = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, REFRESH_DELAY_MS);
  }

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(STACK_QUERY, () => {
        const track = trackRef.current;
        const spotlight = spotlightRef.current;
        if (!track || !spotlight) return;

        const trigger = ScrollTrigger.create({
          end: () =>
            `+=${Math.max(0, track.offsetHeight - spotlight.offsetHeight)}`,
          invalidateOnRefresh: true,
          pin: spotlight,
          pinSpacing: false,
          start: `top ${PIN_TOP}px`,
          trigger: track,
        });

        return () => trigger.kill();
      });

      return () => mm.revert();
    },
    { scope: trackRef },
  );

  function handleAccordionChange(nextValues: string[]) {
    setOpenValues(nextValues);
    if (nextValues.length > 0) {
      const latest = nextValues[nextValues.length - 1];
      if (latest) {
        setActiveTitle(latest);
      }
    }
    triggerScrollRefresh();
  }

  function handleSelectIndex(index: number) {
    const target = copy.campus[index];
    if (!target) return;
    setActiveTitle(target.title);
    setOpenValues([target.title]);
    triggerScrollRefresh();
  }

  const currentIndex = copy.campus.findIndex(
    (item) => item.title === activeTitle,
  );
  const safeCurrentIndex = currentIndex >= 0 ? currentIndex : 0;

  function handlePrev() {
    const prevIndex =
      safeCurrentIndex > 0 ? safeCurrentIndex - 1 : copy.campus.length - 1;
    handleSelectIndex(prevIndex);
  }

  function handleNext() {
    const nextIndex =
      safeCurrentIndex < copy.campus.length - 1 ? safeCurrentIndex + 1 : 0;
    handleSelectIndex(nextIndex);
  }

  return (
    <section
      className="field-brand gutter-x pt-[var(--spacing-section-py)] pb-10 sm:pb-14 lg:pb-16"
      id={id}
    >
      <div className="mx-auto max-w-page">
        <SectionHeader
          eyebrow={copy.heading}
          title={copy.eyebrow ?? "A day at NAMI"}
          description={copy.standfirst}
        />

        <div className="mt-10 lg:mt-14">
          <div
            ref={trackRef}
            className="lg:grid lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16 lg:items-start"
          >
            {/* Left Column: Pinned Spotlight Stage */}
            <div ref={spotlightRef} className="hidden lg:block lg:col-span-6">
              <div className="space-y-4">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-2xl">
                  {copy.campus.map((entry, index) => {
                    const isCurrent = entry.title === activeTitle;
                    if (!entry.photo) return null;
                    return (
                      <div
                        key={entry.title}
                        className={cn(
                          "absolute inset-0 transition-opacity duration-300 ease-out",
                          isCurrent
                            ? "opacity-100 z-10"
                            : "opacity-0 z-0 pointer-events-none",
                        )}
                      >
                        <Image
                          alt={entry.photo.alt}
                          className="h-full w-full object-cover"
                          fill
                          priority={index === 0}
                          sizes={SPOTLIGHT_SIZES}
                          src={entry.photo.src}
                        />
                      </div>
                    );
                  })}
                </div>

                {/* Below image: Title on left, Arrow buttons on right */}
                <div className="flex items-center justify-between gap-4 pt-2">
                  <h4 className="font-display text-2xl xl:text-3xl font-medium text-white">
                    {activeTitle}
                  </h4>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={handlePrev}
                      aria-label="Previous facility"
                      className="flex size-10 items-center justify-center rounded-full border border-white/30 text-white transition-colors duration-150 hover:bg-white/15 hover:border-white active:bg-white/25 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    >
                      <Icon icon={ArrowLeftIcon} className="size-4" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      aria-label="Next facility"
                      className="flex size-10 items-center justify-center rounded-full border border-white/30 text-white transition-colors duration-150 hover:bg-white/15 hover:border-white active:bg-white/25 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    >
                      <Icon icon={ArrowRightIcon} className="size-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Editorial Accordion List */}
            <div className="lg:col-span-6">
              <Accordion
                className="border-t border-primary-800/80"
                value={openValues}
                onValueChange={handleAccordionChange}
              >
                {copy.campus.map((entry, index) => {
                  const isCurrent = entry.title === activeTitle;
                  return (
                    <AccordionItem
                      key={entry.title}
                      value={entry.title}
                      className="border-b border-primary-800/80 transition-colors duration-200"
                    >
                      <AccordionTrigger
                        onClick={() => setActiveTitle(entry.title)}
                        className="py-5 px-1 sm:px-2 text-start group"
                      >
                        <div className="flex items-baseline gap-4 sm:gap-6 min-w-0 flex-1">
                          <span
                            className={cn(
                              "font-body text-sm font-medium tabular-nums shrink-0 transition-colors",
                              isCurrent
                                ? "text-white font-bold"
                                : "text-primary-300 group-hover:text-white",
                            )}
                          >
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span
                            className={cn(
                              "font-display text-lg sm:text-xl font-normal leading-snug transition-colors",
                              isCurrent
                                ? "text-white"
                                : "text-primary-100 group-hover:text-white",
                            )}
                          >
                            {entry.title}
                          </span>
                        </div>
                      </AccordionTrigger>

                      <AccordionPanel className="px-1 sm:px-2 pb-6 pt-0">
                        {entry.photo && (
                          <div className="relative aspect-video w-full overflow-hidden rounded-2xl mb-4 lg:hidden shadow-lg">
                            <Image
                              alt={entry.photo.alt}
                              className="object-cover"
                              fill
                              sizes="(max-width: 1023px) 100vw, 400px"
                              src={entry.photo.src}
                            />
                          </div>
                        )}
                        <p className="pl-8 sm:pl-10 font-body text-sm sm:text-base leading-relaxed text-primary-200">
                          {entry.body}
                        </p>
                      </AccordionPanel>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
