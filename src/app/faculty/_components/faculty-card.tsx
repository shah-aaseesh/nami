"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { P } from "@/components/ui/typography";
import type { Leader } from "@/lib/content";
import { cn } from "@/lib/utils";

export function FacultyCard({
  leader,
  index,
  isFirstGroup = false,
  isScrollable = false,
  isSolo = false,
  className,
}: {
  readonly leader: Leader;
  readonly index: number;
  readonly isFirstGroup?: boolean;
  readonly isScrollable?: boolean;
  readonly isSolo?: boolean;
  readonly className?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className={cn(
          "group flex flex-col snap-center shrink-0",
          className
            ? className
            : cn(
                "w-[75vw] max-w-[260px] sm:w-[40vw] sm:max-w-[280px]",
                isScrollable
                  ? "lg:w-[calc((100%-6rem)/4)] lg:max-w-none"
                  : isSolo
                    ? "w-full max-w-[280px] sm:max-w-[320px] lg:max-w-sm"
                    : "lg:w-[calc(25%-1.5rem)] lg:max-w-none",
              ),
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
          <P className="mt-2 text-sm text-ink-muted leading-relaxed line-clamp-3">
            {leader.brief}
          </P>
          <div className="mt-auto pt-3 flex items-center justify-start">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setOpen(true)}
              className="self-start gap-1.5 px-3.5 border-accent/40 text-accent hover:bg-accent hover:text-white font-medium transition-colors cursor-pointer text-xs rounded-md shadow-2xs"
            >
              <span>Read full bio</span>
              <span aria-hidden="true">&rarr;</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Full Bio Modal Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg sm:max-w-2xl max-h-[85vh] flex flex-col p-6 sm:p-8">
          <div className="flex items-start gap-4 sm:gap-5 pb-4 border-b border-border/70">
            {leader.portrait && (
              <div className="relative size-16 sm:size-20 shrink-0 overflow-hidden rounded-2xl border border-border/60 shadow-md">
                <Image
                  alt={leader.portrait.alt}
                  className="object-cover object-top"
                  fill
                  sizes="80px"
                  src={leader.portrait.src}
                />
              </div>
            )}
            <DialogHeader className="min-w-0 flex-1 text-left">
              <p className="font-body text-xs font-bold uppercase tracking-wider text-accent">
                {leader.title}
              </p>
              <DialogTitle className="mt-1 text-xl sm:text-2xl font-display font-medium text-ink">
                {leader.name}
              </DialogTitle>
            </DialogHeader>
          </div>

          <div className="flex-1 overflow-y-auto pt-4 pr-1 space-y-3.5">
            {(leader.bio ?? leader.brief).split("\n\n").map((para) => (
              <p
                className="text-xs sm:text-sm leading-relaxed text-ink/85 font-body"
                key={para.slice(0, 30)}
              >
                {para}
              </p>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
