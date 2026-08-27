"use client";

import Image from "next/image";
import { useState } from "react";
import { P } from "@/components/ui/typography";
import type { Leader } from "@/lib/content";
import { cn } from "@/lib/utils";

export function FacultyCard({
  leader,
  index,
  isFirstGroup = false,
  isScrollable = false,
  isSolo = false,
}: {
  readonly leader: Leader;
  readonly index: number;
  readonly isFirstGroup?: boolean;
  readonly isScrollable?: boolean;
  readonly isSolo?: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const isLong = leader.brief.length > 90;

  return (
    <div
      className={cn(
        "group flex flex-col snap-center shrink-0 w-[75vw] max-w-[260px] sm:w-[40vw] sm:max-w-[280px]",
        isScrollable
          ? "lg:w-[calc((100%-6rem)/4)] lg:max-w-none"
          : isSolo
            ? "w-full max-w-[280px] sm:max-w-[320px] lg:max-w-sm"
            : "lg:w-[calc(25%-1.5rem)] lg:max-w-none",
      )}
    >
      <div className="relative aspect-4/5 w-full overflow-hidden rounded-2xl bg-neutral-100 border border-border/40">
        {leader.portrait ? (
          <Image
            alt={leader.portrait.alt}
            className="absolute inset-0 object-cover object-top transition-transform duration-700 group-hover:scale-105"
            fetchPriority={isFirstGroup && index === 0 ? "high" : "auto"}
            fill
            loading={isFirstGroup && index === 0 ? "eager" : "lazy"}
            sizes="(max-width: 640px) 260px, (max-width: 1024px) 280px, 25vw"
            src={leader.portrait.src}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-neutral-100 text-neutral-300">
            <svg className="size-16" fill="currentColor" viewBox="0 0 24 24">
              <title>Faculty portrait silhouette</title>
              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
        )}
        <div className="absolute inset-0 ring-1 ring-inset ring-ink/10 rounded-2xl" />
      </div>

      <div className="mt-4 flex flex-col flex-1">
        <p className="font-body text-xs font-bold uppercase tracking-wider text-accent">
          {leader.title}
        </p>
        <h3 className="mt-1 font-display text-lg font-medium text-ink">
          {leader.name}
        </h3>
        <P
          className={cn(
            "mt-2 text-sm text-ink-muted leading-relaxed transition-all duration-200",
            !expanded && "line-clamp-3",
          )}
        >
          {leader.brief}
        </P>
        {isLong && (
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            className="mt-2 self-start font-body text-xs font-semibold text-accent hover:underline cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded-xs"
          >
            {expanded ? "Read less" : "Read more"}
          </button>
        )}
      </div>
    </div>
  );
}
