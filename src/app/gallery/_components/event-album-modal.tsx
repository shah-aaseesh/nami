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
import { Icon } from "@/components/ui/icon";
import { H2, P } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import type { EventAlbum, EventPhoto } from "./gallery-copy";

export function EventAlbumModal({
  album,
  onClose,
}: {
  readonly album: EventAlbum | null;
  readonly onClose: () => void;
}) {
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  // Close on Escape key or navigate in lightbox
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (activePhotoIndex !== null) {
          setActivePhotoIndex(null);
        } else {
          onClose();
        }
      } else if (activePhotoIndex !== null) {
        if (e.key === "ArrowRight" && album) {
          setActivePhotoIndex((prev) =>
            prev === null ? null : (prev + 1) % album.photos.length,
          );
        } else if (e.key === "ArrowLeft" && album) {
          setActivePhotoIndex((prev) =>
            prev === null
              ? null
              : (prev - 1 + album.photos.length) % album.photos.length,
          );
        }
      }
    },
    [activePhotoIndex, album, onClose],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (album) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [album]);

  if (!album) return null;

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
    <>
      {/* 1. Main Modal Backdrop */}
      <div
        aria-modal="true"
        className="fixed inset-0 z-50 flex flex-col bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
        role="dialog"
      >
        {/* Modal Top Header Bar */}
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-white/15 bg-neutral-950/90 px-4 py-3.5 sm:px-8 sm:py-4 backdrop-blur-lg">
          <div className="flex items-center gap-3 min-w-0">
            <button
              aria-label="Back to all event folders"
              className="group flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-white/20"
              onClick={onClose}
              type="button"
            >
              <Icon
                className="size-3.5 transition-transform group-hover:-translate-x-1"
                icon={ArrowLeft01Icon}
              />
              <span className="hidden sm:inline">All Event Folders</span>
              <span className="sm:hidden">Back</span>
            </button>

            <span
              className={cn(
                "rounded-full px-3 py-0.5 text-xs font-semibold uppercase tracking-wider border",
                getInstitutionBadgeClass(album.institution),
              )}
            >
              {album.institutionLabel}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-neutral-400 font-medium">
              {album.photos.length} Photographs
            </span>
            <button
              aria-label="Close album modal"
              className="flex size-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-[#BD1B21] hover:text-white"
              onClick={onClose}
              type="button"
            >
              <Icon className="size-5" icon={Cancel01Icon} />
            </button>
          </div>
        </header>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 lg:p-12">
          <div className="mx-auto max-w-6xl">
            {/* Event Album Overview Banner */}
            <div className="mb-8 sm:mb-12 rounded-3xl bg-neutral-900 border border-white/10 p-6 sm:p-10 shadow-2xl">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/90">
                  <Icon
                    className="size-3.5 text-[#FFAD00]"
                    icon={Folder01Icon}
                  />
                  {album.category}
                </span>
                <span className="text-xs text-neutral-400 font-medium">
                  • {album.date}
                </span>
              </div>

              <H2 className="mt-3 text-white text-3xl sm:text-4xl font-bold sm:font-normal font-display">
                {album.title}
              </H2>

              <P className="mt-3 text-neutral-300 text-sm sm:text-base leading-relaxed max-w-3xl">
                {album.description}
              </P>
            </div>

            {/* Instagram-Style Photo Grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
              {album.photos.map((photo, index) => (
                <button
                  className="group relative aspect-4/3 w-full overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 shadow-md text-start transition-all duration-300 hover:border-[#BD1B21] hover:shadow-xl cursor-pointer"
                  key={photo.id}
                  onClick={() => setActivePhotoIndex(index)}
                  type="button"
                >
                  <Image
                    alt={photo.alt}
                    className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    height={photo.height}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    src={photo.src}
                    width={photo.width}
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/25 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
                    <span className="flex size-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-xs shadow-md group-hover:scale-105 transition-transform">
                      <Icon className="size-5" icon={ViewIcon} />
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Interactive Fullscreen Cinema Lightbox */}
      {currentPhoto && (
        <div
          aria-modal="true"
          className="fixed inset-0 z-[9999] flex flex-col justify-between bg-black/92 backdrop-blur-md p-4 sm:p-6 lg:p-8 animate-in fade-in duration-200 select-none cursor-zoom-out"
          onClick={() => setActivePhotoIndex(null)}
          role="dialog"
        >
          {/* Lightbox Header Bar */}
          <div
            className="flex w-full max-w-7xl mx-auto items-center justify-between text-white z-20 cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 min-w-0">
              <span
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider border shadow-sm",
                  getInstitutionBadgeClass(album.institution),
                )}
              >
                {album.institutionLabel}
              </span>
              <span className="hidden sm:inline-block text-xs text-white/80 font-medium truncate max-w-md">
                {album.title}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="rounded-full bg-white/10 backdrop-blur-md px-3 py-1 font-mono text-xs text-white/90 border border-white/15">
                {activePhotoIndex !== null ? activePhotoIndex + 1 : 1} /{" "}
                {album.photos.length}
              </span>

              <button
                aria-label="Close fullscreen photo view"
                className="flex size-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all duration-150 hover:bg-[#BD1B21] hover:scale-105 border border-white/15 cursor-pointer shadow-lg"
                onClick={() => setActivePhotoIndex(null)}
                type="button"
              >
                <Icon className="size-5" icon={Cancel01Icon} />
              </button>
            </div>
          </div>

          {/* Center High-Res Image with Prev / Next Navigation */}
          <div
            className="relative flex flex-1 items-center justify-center w-full max-w-7xl mx-auto my-auto py-3 cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Prev Button */}
            {album.photos.length > 1 && (
              <button
                aria-label="Previous photograph"
                className="absolute left-1 sm:left-4 z-30 flex size-11 sm:size-12 items-center justify-center rounded-full bg-black/60 text-white border border-white/20 backdrop-blur-md transition-all duration-150 hover:bg-[#BD1B21] hover:scale-110 hover:border-[#BD1B21] cursor-pointer shadow-2xl"
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
                <Icon className="size-6" icon={ArrowLeft01Icon} />
              </button>
            )}

            {/* Pure Unboxed Expanded Image */}
            <div className="relative flex items-center justify-center max-h-[86vh] sm:max-h-[90vh] max-w-full">
              <img
                alt={currentPhoto.alt}
                className="max-h-[84vh] sm:max-h-[88vh] max-w-[94vw] lg:max-w-[90vw] w-auto h-auto object-contain rounded-xl sm:rounded-2xl shadow-2xl animate-in zoom-in-95 duration-200 transition-all pointer-events-auto"
                src={currentPhoto.src}
              />
            </div>

            {/* Next Button */}
            {album.photos.length > 1 && (
              <button
                aria-label="Next photograph"
                className="absolute right-1 sm:right-4 z-30 flex size-11 sm:size-12 items-center justify-center rounded-full bg-black/60 text-white border border-white/20 backdrop-blur-md transition-all duration-150 hover:bg-[#BD1B21] hover:scale-110 hover:border-[#BD1B21] cursor-pointer shadow-2xl"
                onClick={(e) => {
                  e.stopPropagation();
                  setActivePhotoIndex(
                    (prev) =>
                      (prev === null ? 0 : prev + 1) % album.photos.length,
                  );
                }}
                type="button"
              >
                <Icon className="size-6" icon={ArrowRight01Icon} />
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
