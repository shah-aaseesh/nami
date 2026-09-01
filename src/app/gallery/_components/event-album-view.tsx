"use client";

import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
  Cancel01Icon,
  Folder01Icon,
  ViewIcon,
} from "@hugeicons/core-free-icons";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { Icon } from "@/components/ui/icon";
import { H2, P } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import type { EventAlbum, EventPhoto } from "./gallery-copy";

export function EventAlbumView({
  album,
  onBack,
}: {
  readonly album: EventAlbum;
  readonly onBack: () => void;
}) {
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  // Lightbox keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActivePhotoIndex(null);
      } else if (activePhotoIndex !== null) {
        if (e.key === "ArrowRight") {
          setActivePhotoIndex((prev) =>
            prev === null ? null : (prev + 1) % album.photos.length,
          );
        } else if (e.key === "ArrowLeft") {
          setActivePhotoIndex((prev) =>
            prev === null
              ? null
              : (prev - 1 + album.photos.length) % album.photos.length,
          );
        }
      }
    },
    [activePhotoIndex, album.photos.length],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const currentPhoto: EventPhoto | null =
    activePhotoIndex !== null ? (album.photos[activePhotoIndex] ?? null) : null;

  const getInstitutionBadgeClass = (inst: string) => {
    switch (inst) {
      case "primary":
        return "bg-[#9CC21A]/20 text-[#284540] border-[#9CC21A]/40";
      case "higher-secondary":
        return "bg-[#BD1B21]/15 text-[#BD1B21] border-[#BD1B21]/30";
      case "college":
        return "bg-[#FFAD00]/20 text-[#8A5A00] border-[#FFAD00]/40";
      case "institute":
        return "bg-[#BD1B21]/15 text-[#BD1B21] border-[#BD1B21]/30";
      default:
        return "bg-neutral-100 text-neutral-800 border-neutral-300";
    }
  };

  return (
    <section className="gutter-x pb-16 sm:pb-24 animate-in fade-in duration-300">
      <div className="mx-auto max-w-page">
        {/* 1. Top In-Page Nav Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
          <button
            className="group inline-flex items-center gap-2 rounded-full bg-surface-raised border border-border px-4 py-2 text-xs sm:text-sm font-semibold text-ink transition-all hover:bg-[#BD1B21] hover:text-white hover:border-[#BD1B21] shadow-xs cursor-pointer"
            onClick={onBack}
            type="button"
          >
            <Icon
              className="size-4 transition-transform group-hover:-translate-x-1"
              icon={ArrowLeft01Icon}
            />
            <span>Back to All Event Folders</span>
          </button>

          <div className="flex items-center gap-3">
            <span
              className={cn(
                "rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider border",
                getInstitutionBadgeClass(album.institution),
              )}
            >
              {album.institutionLabel}
            </span>
            <span className="text-xs font-semibold text-ink-muted">
              {album.photos.length} Photographs
            </span>
          </div>
        </div>

        {/* 2. Event Header Overview */}
        <div className="mt-8 mb-10 sm:mb-12">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#BD1B21]/10 text-[#BD1B21] border border-[#BD1B21]/20 px-3 py-0.5 text-xs font-semibold">
              <Icon className="size-3 text-[#BD1B21]" icon={Folder01Icon} />
              {album.category}
            </span>
            <span className="text-xs font-medium text-ink-muted">
              • {album.date}
            </span>
          </div>

          <H2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-normal font-display text-ink tracking-tight">
            {album.title}
          </H2>

          <P className="mt-3 max-w-3xl text-sm sm:text-base text-ink-muted leading-relaxed">
            {album.description}
          </P>
        </div>

        {/* 3. In-Page Instagram Photos Grid */}
        <Reveal
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-6"
          stagger={0.04}
          y={16}
        >
          {album.photos.map((photo, index) => (
            <RevealItem className="h-full" key={photo.id}>
              <button
                className="group relative aspect-4/3 sm:aspect-square w-full overflow-hidden rounded-2xl border border-border bg-neutral-950 text-left shadow-xs transition-all duration-300 hover:shadow-xl hover:border-[#BD1B21]/60 cursor-pointer"
                onClick={() => setActivePhotoIndex(index)}
                type="button"
              >
                <Image
                  alt={photo.alt}
                  className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  height={photo.height}
                  sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  src={photo.src}
                  width={photo.width}
                />

                {/* Hover Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-between p-4">
                  <div className="flex justify-end">
                    <span className="flex size-8 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-xs">
                      <Icon className="size-4" icon={ViewIcon} />
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#FFAD00]">
                      Photo {index + 1} of {album.photos.length}
                    </span>
                    {photo.caption && (
                      <p className="mt-1 line-clamp-2 text-xs text-white leading-relaxed font-body">
                        {photo.caption}
                      </p>
                    )}
                  </div>
                </div>
              </button>
            </RevealItem>
          ))}
        </Reveal>

        {/* 4. Bottom Back Link */}
        <div className="mt-12 sm:mt-16 text-center border-t border-border pt-8">
          <button
            className="inline-flex items-center gap-2 font-body text-xs sm:text-sm font-semibold uppercase tracking-wider text-ink-muted transition-colors hover:text-[#BD1B21] cursor-pointer"
            onClick={onBack}
            type="button"
          >
            <Icon className="size-4" icon={ArrowLeft01Icon} />
            <span>Back to All Event Folders</span>
          </button>
        </div>
      </div>

      {/* 5. Fullscreen Cinema Lightbox */}
      {currentPhoto && (
        <div
          aria-modal="true"
          className="fixed inset-0 z-60 flex flex-col items-center justify-between bg-black/95 p-4 sm:p-8 animate-in fade-in duration-200"
          role="dialog"
        >
          {/* Lightbox Header Bar */}
          <div className="flex w-full max-w-6xl items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <span
                className={cn(
                  "rounded-full px-3 py-0.5 text-xs font-semibold uppercase tracking-wider border",
                  getInstitutionBadgeClass(album.institution),
                )}
              >
                {album.institutionLabel}
              </span>
              <span className="text-xs text-neutral-400 font-medium">
                {activePhotoIndex !== null ? activePhotoIndex + 1 : 1} /{" "}
                {album.photos.length}
              </span>
            </div>

            <button
              aria-label="Close fullscreen photo view"
              className="flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-[#BD1B21] cursor-pointer"
              onClick={() => setActivePhotoIndex(null)}
              type="button"
            >
              <Icon className="size-5" icon={Cancel01Icon} />
            </button>
          </div>

          {/* Center High-Res Image with Prev / Next Navigation */}
          <div className="relative flex flex-1 items-center justify-center w-full max-w-5xl my-4">
            {/* Prev Button */}
            <button
              aria-label="Previous photograph"
              className="absolute left-2 sm:left-4 z-20 flex size-11 items-center justify-center rounded-full bg-black/60 text-white border border-white/20 backdrop-blur-md transition-all hover:bg-[#BD1B21] hover:scale-105 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setActivePhotoIndex(
                  (prev) =>
                    (prev === null ? 0 : prev - 1 + album.photos.length) %
                    album.photos.length,
                );
              }}
              type="button"
            >
              <Icon className="size-5" icon={ArrowLeft01Icon} />
            </button>

            {/* Current Image */}
            <div className="relative max-h-[75vh] w-full aspect-16/10 flex items-center justify-center">
              <Image
                alt={currentPhoto.alt}
                className="max-h-[75vh] w-auto max-w-full rounded-xl object-contain shadow-2xl"
                height={currentPhoto.height}
                priority
                sizes="(min-width: 1024px) 80vw, 100vw"
                src={currentPhoto.src}
                width={currentPhoto.width}
              />
            </div>

            {/* Next Button */}
            <button
              aria-label="Next photograph"
              className="absolute right-2 sm:right-4 z-20 flex size-11 items-center justify-center rounded-full bg-black/60 text-white border border-white/20 backdrop-blur-md transition-all hover:bg-[#BD1B21] hover:scale-105 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setActivePhotoIndex(
                  (prev) =>
                    (prev === null ? 0 : prev + 1) % album.photos.length,
                );
              }}
              type="button"
            >
              <Icon className="size-5" icon={ArrowRight01Icon} />
            </button>
          </div>

          {/* Lightbox Caption Footer */}
          <div className="w-full max-w-3xl text-center">
            <p className="text-sm sm:text-base text-white/90 leading-relaxed font-body">
              {currentPhoto.caption ?? currentPhoto.alt}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
