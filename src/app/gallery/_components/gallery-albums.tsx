"use client";

import Image from "next/image";
import { useState } from "react";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";
import { type EventAlbum, instituteFilters } from "./gallery-copy";

export function GalleryAlbums({
  albums,
  onSelectAlbum,
}: {
  readonly albums: readonly EventAlbum[];
  readonly onSelectAlbum: (album: EventAlbum) => void;
}) {
  const [selectedInstitute, setSelectedInstitute] = useState<string>("all");

  const filteredAlbums =
    selectedInstitute === "all"
      ? albums
      : albums.filter((album) => album.institution === selectedInstitute);

  return (
    <section className="gutter-x pb-16 sm:pb-24" id="gallery-albums">
      <div className="mx-auto max-w-page">
        {/* 1. Institute Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-border pb-6">
          {instituteFilters.map((filter) => {
            const isActive = selectedInstitute === filter.id;
            const count =
              filter.id === "all"
                ? albums.length
                : albums.filter((a) => a.institution === filter.id).length;

            return (
              <button
                className={cn(
                  "group flex items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-all cursor-pointer",
                  isActive
                    ? "bg-[#BD1B21] text-white shadow-md shadow-[#BD1B21]/25"
                    : "bg-surface-raised border border-border text-ink-muted hover:border-[#BD1B21]/50 hover:text-ink",
                )}
                key={filter.id}
                onClick={() => setSelectedInstitute(filter.id)}
                type="button"
              >
                <span>{filter.label}</span>
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[11px] font-bold",
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-muted text-ink-muted group-hover:text-ink",
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* 2. Tall / Longer Portrait Event Folders Grid (No Icons) */}
        <Reveal
          className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
          stagger={0.05}
          y={16}
        >
          {filteredAlbums.map((album) => (
            <RevealItem className="h-full" key={album.id}>
              <button
                className="group relative aspect-3/4 w-full overflow-hidden rounded-2xl bg-neutral-950 text-left transition-all duration-500 hover:shadow-2xl hover:ring-2 hover:ring-[#BD1B21]/60 cursor-pointer"
                onClick={() => onSelectAlbum(album)}
                type="button"
              >
                {/* 1. Cover Photograph (Longer aspect ratio) */}
                <Image
                  alt={album.coverImage.alt}
                  className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  height={album.coverImage.height}
                  sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  src={album.coverImage.src}
                  width={album.coverImage.width}
                />

                {/* 2. Gradient Backdrop for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent opacity-85 transition-opacity duration-300 group-hover:opacity-95" />

                {/* 3. Folder Name (Clean & Direct) */}
                <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-6">
                  <h3 className="font-display text-lg sm:text-xl font-medium text-white leading-snug line-clamp-2 drop-shadow-sm">
                    {album.title}
                  </h3>
                </div>
              </button>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
