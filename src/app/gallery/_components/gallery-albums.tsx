"use client";

import Image from "next/image";
import { useState } from "react";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  type EventAlbum,
  instituteFilters,
  institutionClubs,
} from "./gallery-copy";

export function GalleryAlbums({
  albums,
  onSelectAlbum,
}: {
  readonly albums: readonly EventAlbum[];
  readonly onSelectAlbum: (album: EventAlbum) => void;
}) {
  const [selectedInstitute, setSelectedInstitute] = useState<string>("all");
  const [selectedClub, setSelectedClub] = useState<string>("all");

  const handleInstituteChange = (instId: string) => {
    setSelectedInstitute(instId);
    setSelectedClub("all"); // Reset club filter when institution changes
  };

  const currentClubList =
    selectedInstitute !== "all" && institutionClubs[selectedInstitute]
      ? institutionClubs[selectedInstitute]
      : [];

  const filteredAlbums = albums.filter((album) => {
    if (
      selectedInstitute !== "all" &&
      album.institution !== selectedInstitute
    ) {
      return false;
    }
    if (selectedClub !== "all" && album.club !== selectedClub) {
      return false;
    }
    return true;
  });

  const selectedInstObj = instituteFilters.find(
    (f) => f.id === selectedInstitute,
  );

  return (
    <section className="gutter-x pb-16 sm:pb-24" id="gallery-albums">
      <div className="mx-auto max-w-page">
        {/* 1. Filter Control Bar (Institution Tabs + Club Dropdown) */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-border pb-6">
          {/* 1a. Institution Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2">
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
                  onClick={() => handleInstituteChange(filter.id)}
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

          {/* 1b. Club Dropdown Filter (Visible once an institution filter is applied) */}
          {selectedInstitute !== "all" && currentClubList.length > 0 && (
            <div className="flex flex-wrap items-center gap-2.5 pt-2 lg:pt-0 animate-in fade-in slide-in-from-top-1 duration-200">
              <label
                htmlFor="gallery-club-select"
                className="text-xs font-semibold uppercase tracking-wider text-ink-muted whitespace-nowrap"
              >
                Club:
              </label>

              <Select
                value={selectedClub}
                onValueChange={(val: string | null) =>
                  setSelectedClub(val ?? "all")
                }
              >
                <SelectTrigger
                  id="gallery-club-select"
                  size="sm"
                  className="w-56 sm:w-64 rounded-full border-border bg-surface font-medium text-xs sm:text-sm text-ink hover:border-[#BD1B21]/60 transition-colors shadow-xs"
                  aria-label={`Filter ${selectedInstObj?.label ?? "institution"} albums by club`}
                >
                  <SelectValue>
                    {currentClubList.find((c) => c.id === selectedClub)
                      ?.label ?? "All Clubs"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="rounded-xl border-border bg-surface shadow-xl z-50 min-w-56">
                  {currentClubList.map((club) => {
                    const clubCount =
                      club.id === "all"
                        ? albums.filter(
                            (a) => a.institution === selectedInstitute,
                          ).length
                        : albums.filter(
                            (a) =>
                              a.institution === selectedInstitute &&
                              a.club === club.id,
                          ).length;

                    return (
                      <SelectItem
                        key={club.id}
                        value={club.id}
                        className="cursor-pointer text-xs sm:text-sm font-medium py-2 px-3 focus:bg-[#BD1B21]/10 focus:text-[#BD1B21]"
                      >
                        <span className="flex items-center justify-between w-full gap-3">
                          <span>{club.label}</span>
                          <span className="text-[11px] font-semibold text-ink-muted bg-neutral-100 px-2 py-0.5 rounded-full">
                            {clubCount}
                          </span>
                        </span>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>

              {selectedClub !== "all" && (
                <button
                  type="button"
                  onClick={() => setSelectedClub("all")}
                  className="rounded-full px-3 py-1.5 text-xs font-semibold text-[#BD1B21] bg-[#BD1B21]/10 hover:bg-[#BD1B21]/20 transition-colors cursor-pointer"
                >
                  Reset Club
                </button>
              )}
            </div>
          )}
        </div>

        {/* 2. Empty State when no albums match the specific club */}
        {filteredAlbums.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-dashed border-border p-12 text-center bg-surface-raised/40">
            <h4 className="font-display text-lg sm:text-xl font-medium text-ink">
              No Event Folders Found
            </h4>
            <p className="mx-auto mt-2 max-w-md text-sm text-ink-muted">
              No albums were found for the selected club in{" "}
              {selectedInstObj?.label ?? "this institution"}.
            </p>
            <button
              type="button"
              onClick={() => setSelectedClub("all")}
              className="mt-6 inline-flex items-center rounded-full bg-[#BD1B21] px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-md hover:bg-[#a0161b] transition-colors cursor-pointer"
            >
              View All {selectedInstObj?.label ?? "Institution"} Albums
            </button>
          </div>
        ) : (
          /* 3. Tall / Longer Portrait Event Folders Grid */
          <Reveal
            className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
            key={`${selectedInstitute}-${selectedClub}`}
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
                  {/* Cover Photograph */}
                  <Image
                    alt={album.coverImage.alt}
                    className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    height={album.coverImage.height}
                    sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    src={album.coverImage.src}
                    width={album.coverImage.width}
                  />

                  {/* Gradient Backdrop for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent opacity-85 transition-opacity duration-300 group-hover:opacity-95" />

                  {/* Folder Name & Optional Club Tag */}
                  <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-6">
                    {album.clubLabel && (
                      <span className="inline-block mb-1.5 rounded-md bg-white/20 backdrop-blur-xs px-2 py-0.5 text-[11px] font-semibold text-white">
                        {album.clubLabel}
                      </span>
                    )}
                    <h3 className="font-display text-lg sm:text-xl font-medium text-white leading-snug line-clamp-2 drop-shadow-sm">
                      {album.title}
                    </h3>
                  </div>
                </button>
              </RevealItem>
            ))}
          </Reveal>
        )}
      </div>
    </section>
  );
}
