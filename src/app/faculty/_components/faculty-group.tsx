"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Icon } from "@/components/ui/icon";
import { H3, P } from "@/components/ui/typography";
import type { Leader } from "@/lib/content";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { LinkedInIcon, TwitterIcon } from "@/lib/icons";

export function FacultyGroup({
  leaders,
  title,
}: {
  readonly leaders: readonly Leader[];
  readonly title: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isScrollable = leaders.length > 4; // changed to 4 since we make cards smaller

  useGSAP(
    () => {
      if (!isScrollable || !trackRef.current || !sectionRef.current) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const getScrollAmount = () => {
          return trackRef.current
            ? trackRef.current.scrollWidth - trackRef.current.offsetWidth
            : 0;
        };

        const tween = gsap.to(trackRef.current, {
          x: () => -getScrollAmount(),
          ease: "none",
        });

        ScrollTrigger.create({
          trigger: sectionRef.current,
          pin: true,
          animation: tween,
          scrub: 1,
          start: "top top", // reverted start position
          end: () => `+=${getScrollAmount()}`,
          invalidateOnRefresh: true,
          snap: {
            snapTo: 1 / (leaders.length - 4),
            duration: 0.2,
            ease: "power1.inOut",
          },
        });
      });

      return () => mm.revert();
    },
    { dependencies: [isScrollable], scope: sectionRef },
  );

  if (leaders.length === 0) return null;

  return (
    <section className="gutter-x py-10 lg:py-16" ref={sectionRef}>
      <div className="mx-auto max-w-page overflow-hidden">
        <H3 className="font-display text-2xl sm:text-3xl font-medium text-ink lg:text-4xl border-b border-border/60 pb-4 mb-8 sm:mb-12">
          {title}
        </H3>

        <div
          className={
            isScrollable
              ? "flex gap-6 sm:gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide lg:overflow-visible lg:flex-nowrap"
              : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8"
          }
          ref={trackRef}
        >
          {leaders.map((leader) => (
            <div
              className={`group flex flex-col shrink-0 snap-center ${
                isScrollable
                  ? "w-[75vw] max-w-[260px] sm:w-[40vw] sm:max-w-[280px] lg:w-[calc((100%-6rem)/4)] lg:max-w-none"
                  : "w-full"
              }`}
              key={leader.id}
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-neutral-100 border border-border/40">
                {leader.portrait ? (
                  <Image
                    alt={leader.portrait.alt}
                    className="absolute inset-0 object-cover transition-transform duration-700 group-hover:scale-105"
                    fill
                    sizes="(max-width: 640px) 260px, (max-width: 1024px) 280px, 25vw"
                    src={leader.portrait.src}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-neutral-100 text-neutral-300">
                    <svg
                      className="size-16"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <title>Faculty portrait placeholder</title>
                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                )}
                <div className="absolute inset-0 ring-1 ring-inset ring-ink/10 rounded-2xl" />

                {/* Hover Overlay with Social Icons */}
                <div className="absolute inset-0 bg-ink/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center gap-4">
                  <Link
                    href="#"
                    className="flex size-10 items-center justify-center rounded-full bg-white text-ink hover:bg-accent hover:text-white transition-colors translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 duration-500 delay-75"
                  >
                    <Icon icon={LinkedInIcon} className="size-4" />
                    <span className="sr-only">LinkedIn</span>
                  </Link>
                  <Link
                    href="#"
                    className="flex size-10 items-center justify-center rounded-full bg-white text-ink hover:bg-accent hover:text-white transition-colors translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 duration-500 delay-150"
                  >
                    <Icon icon={TwitterIcon} className="size-4" />
                    <span className="sr-only">Twitter</span>
                  </Link>
                </div>
              </div>

              <div className="mt-4">
                <p className="font-body text-[10px] font-bold uppercase tracking-widest text-accent">
                  {leader.title}
                </p>
                <h4 className="mt-1 font-display text-lg font-medium text-ink">
                  {leader.name}
                </h4>
                <P className="mt-2 text-sm text-ink-muted leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
                  {leader.brief}
                </P>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
