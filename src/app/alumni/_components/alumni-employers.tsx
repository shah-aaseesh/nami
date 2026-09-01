"use client";

import Image from "next/image";
import { useRef } from "react";
import { Marquee } from "@/components/motion/marquee";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeader } from "@/components/shared/section-header";
import type { SectionCopy } from "@/lib/content";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import type { AlumniEmployer } from "./alumni-copy";

function EmployerMark({ employer }: { readonly employer: AlumniEmployer }) {
  if (employer.logoSrc) {
    return (
      <div className="relative h-12 w-28 shrink-0 sm:h-16 sm:w-36 lg:h-20 lg:w-48 transition-transform duration-300 hover:scale-105">
        <Image
          alt={employer.name}
          className="object-contain"
          fill
          sizes="(min-width: 1024px) 192px, (min-width: 640px) 144px, 112px"
          src={employer.logoSrc}
        />
      </div>
    );
  }

  return (
    <div className="flex h-12 shrink-0 items-center justify-center px-3 sm:h-16 sm:px-5 lg:h-20 lg:px-7">
      <span className="font-display text-sm sm:text-base lg:text-lg font-medium tracking-tight text-ink-muted/90 hover:text-ink transition-colors whitespace-nowrap">
        {employer.name}
      </span>
    </div>
  );
}

function EmployerRow({
  className,
  employers,
}: {
  readonly className?: string;
  readonly employers: readonly AlumniEmployer[];
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-6 pe-6 sm:gap-10 sm:pe-10 lg:gap-14 lg:pe-14",
        className,
      )}
    >
      {employers.map((employer) => (
        <EmployerMark employer={employer} key={employer.id} />
      ))}
    </div>
  );
}

export function AlumniEmployers({
  employers,
  section,
}: {
  readonly employers: readonly AlumniEmployer[];
  readonly section: SectionCopy;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const setPaused = (paused: boolean) => {
    const root = containerRef.current;
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

  const half = Math.ceil(employers.length / 2);
  const rowOne = employers.slice(0, half);
  const rowTwo = employers.slice(half);

  return (
    <section
      className="gutter-x section-y overflow-hidden"
      id="alumni-employers"
    >
      <div className="mx-auto max-w-page">
        <SectionHeader
          description={section.standfirst}
          eyebrow={section.heading}
          layout="split"
          title={section.eyebrow ?? "Where Our Alumni Work"}
        />

        <Reveal className="mt-8 sm:mt-12 flex flex-col gap-3 sm:gap-5" y={24}>
          <div
            className="flex flex-col gap-3 sm:gap-5"
            onBlurCapture={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onPointerEnter={() => setPaused(true)}
            onPointerLeave={() => setPaused(false)}
            ref={containerRef}
          >
            <Marquee
              copies={2}
              label={`${section.heading} - Row 1`}
              reverse={false}
              speed={36}
            >
              <EmployerRow employers={rowOne} />
            </Marquee>

            <Marquee
              copies={2}
              label={`${section.heading} - Row 2`}
              reverse={true}
              speed={30}
            >
              <EmployerRow employers={rowTwo} />
            </Marquee>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
