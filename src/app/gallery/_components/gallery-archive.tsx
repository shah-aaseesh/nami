"use client";

import {
  Cancel01Icon,
  DashboardSquare02Icon,
  FilterIcon,
  Grid02Icon,
  Image01Icon,
  RefreshIcon,
  Search01Icon,
  SparklesIcon,
} from "@hugeicons/core-free-icons";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import { Reveal } from "@/components/motion/reveal";
import {
  type FilterOption,
  SegmentedFilter,
} from "@/components/shared/filter-controls";
import { Icon } from "@/components/ui/icon";
import { H4, P } from "@/components/ui/typography";
import type {
  ContentImage,
  EntityRole,
  GalleryItem,
  NamedEntity,
} from "@/lib/content";
import { Flip, FULL_MOTION_QUERY, gsap, useGSAP } from "@/lib/gsap";
import { INSTITUTION_PARAM } from "@/lib/institution-filter";
import { cn } from "@/lib/utils";
import {
  type CuratedAlbum,
  galleryCategories,
  galleryCopy,
} from "./gallery-copy";
import { GalleryTile } from "./gallery-tile";

const ROWS_PER_COLUMN = 60;
const GUTTER_ROWS = 4;

const MOSAIC_CLASS =
  "relative grid grid-flow-row-dense grid-cols-2 gap-x-[var(--gallery-gutter)] overflow-hidden auto-rows-[var(--gallery-row)] [--gallery-gutter:calc(4*var(--gallery-row))] [--gallery-row:calc(100cqw/124)] sm:grid-cols-3 sm:[--gallery-row:calc(100cqw/188)] md:grid-cols-4 md:[--gallery-row:calc(100cqw/252)] lg:grid-cols-5 lg:[--gallery-row:calc(100cqw/316)] 2xl:grid-cols-6 2xl:[--gallery-row:calc(100cqw/380)]";

const GRID_CLASS =
  "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8";

const TILE_SIZES =
  "(min-width: 1568px) 228px, (min-width: 1536px) 15vw, (min-width: 1024px) 18vw, (min-width: 768px) 23vw, (min-width: 640px) 30vw, 45vw";

const MOSAIC_ID = "gallery-mosaic";

type Snapshot = {
  readonly state: ReturnType<typeof Flip.getState>;
  readonly height: number;
};

function tileRowSpan({ height, width }: ContentImage) {
  const rows = Math.round((height / width) * ROWS_PER_COLUMN);
  return Math.min(Math.max(rows, 24), 108) + GUTTER_ROWS;
}

export type GalleryFilter =
  | "all"
  | "primary"
  | "higher-secondary"
  | "college"
  | "institute";

function parseGalleryFilter(value: string | undefined): GalleryFilter {
  if (!value) return "all";
  const candidate = value.trim().toLowerCase();
  if (
    candidate === "primary" ||
    candidate === "higher-secondary" ||
    candidate === "college" ||
    candidate === "institute"
  ) {
    return candidate;
  }
  if (candidate === "school") return "primary";
  return "all";
}

export function GalleryArchive({
  entities,
  items,
  selectedAlbum,
  onResetAlbum,
}: {
  readonly entities: Readonly<Record<EntityRole, NamedEntity>>;
  readonly items: readonly GalleryItem[];
  readonly selectedAlbum?: CuratedAlbum | null;
  readonly onResetAlbum?: () => void;
}) {
  const searchParams = useSearchParams();
  const initialFilter = parseGalleryFilter(
    searchParams.get(INSTITUTION_PARAM) ?? undefined,
  );
  const stageRef = useRef<HTMLDivElement>(null);
  const snapshotRef = useRef<Snapshot | null>(null);

  const [wingFilter, setWingFilter] = useState<GalleryFilter>(initialFilter);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [layoutMode, setLayoutMode] = useState<"mosaic" | "grid">("mosaic");

  useGSAP(
    () => {
      const stage = stageRef.current;
      const snapshot = snapshotRef.current;
      if (!stage || !snapshot || layoutMode !== "mosaic") return;
      snapshotRef.current = null;

      const mm = gsap.matchMedia();
      mm.add(FULL_MOTION_QUERY, () => {
        const nextHeight = stage.offsetHeight;
        stage.style.height = `${snapshot.height}px`;

        const heightTween = gsap.to(stage, {
          height: nextHeight,
          duration: 0.7,
          ease: "power2.inOut",
        });

        const flip = Flip.from(snapshot.state, {
          absolute: true,
          duration: 0.7,
          ease: "power2.inOut",
          stagger: 0.03,
          onEnter: (elements) =>
            gsap.fromTo(
              elements,
              { autoAlpha: 0, scale: 0.92 },
              { autoAlpha: 1, scale: 1, duration: 0.5, ease: "power2.out" },
            ),
          onLeave: (elements) =>
            gsap.to(elements, {
              autoAlpha: 0,
              scale: 0.92,
              duration: 0.35,
              ease: "power2.in",
            }),
          onComplete: () => {
            stage.style.height = "";
          },
        });

        return () => {
          flip.kill();
          heightTween.kill();
          stage.style.height = "";
        };
      });

      return () => mm.revert();
    },
    {
      dependencies: [wingFilter, categoryFilter, searchQuery, layoutMode],
      scope: stageRef,
    },
  );

  const takeSnapshot = () => {
    const stage = stageRef.current;
    if (!stage || layoutMode !== "mosaic") return;
    snapshotRef.current = {
      state: Flip.getState(
        stage.querySelectorAll<HTMLElement>("[data-gallery-tile]"),
      ),
      height: stage.offsetHeight,
    };
  };

  const selectWingFilter = (next: GalleryFilter) => {
    if (next === wingFilter) return;
    takeSnapshot();
    setWingFilter(next);
  };

  const selectCategory = (catId: string) => {
    if (catId === categoryFilter) return;
    takeSnapshot();
    setCategoryFilter(catId);
  };

  const resetAllFilters = () => {
    takeSnapshot();
    setWingFilter("all");
    setCategoryFilter("all");
    setSearchQuery("");
    onResetAlbum?.();
  };

  const institutionOptions: readonly FilterOption<GalleryFilter>[] = [
    { id: "all", label: galleryCopy.allLabel },
    {
      accessibleLabel: "Primary School",
      id: "primary",
      label: "Primary",
    },
    {
      accessibleLabel: "Higher Secondary (+2 NEB)",
      id: "higher-secondary",
      label: "Higher Secondary",
    },
    {
      accessibleLabel: galleryCopy.filterOptionLabel(
        "A-Level",
        entities.college.name,
      ),
      id: "college",
      label: "A-Level",
    },
    {
      accessibleLabel: galleryCopy.filterOptionLabel(
        "Bachelors/Masters",
        entities.institute.name,
      ),
      id: "institute",
      label: "Bachelors/Masters",
    },
  ];

  // Match items
  const isVisible = (item: GalleryItem) => {
    // Wing filter
    if (wingFilter !== "all" && item.institution !== wingFilter) {
      return false;
    }
    // Category filter
    if (categoryFilter !== "all" && item.category !== categoryFilter) {
      return false;
    }
    // Search query filter
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase().trim();
      const titleMatch = item.title.toLowerCase().includes(q);
      const categoryMatch = item.category.toLowerCase().includes(q);
      const altMatch = item.image?.alt?.toLowerCase().includes(q) ?? false;
      if (!titleMatch && !categoryMatch && !altMatch) {
        return false;
      }
    }
    return true;
  };

  const matchingItems = items.filter(isVisible);
  const isFiltered =
    wingFilter !== "all" ||
    categoryFilter !== "all" ||
    searchQuery.trim() !== "" ||
    !!selectedAlbum;

  return (
    <>
      <section
        className="gutter-x section-y-compact border-y border-border bg-neutral-50/50"
        id="gallery-archive"
      >
        <div className="mx-auto max-w-page space-y-6">
          {/* Top Controls Row: Wing Tabs + Search Bar + Layout Switcher */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Wing Tabs */}
            <div className="overflow-x-auto scrollbar-hide py-1">
              <SegmentedFilter
                controls={MOSAIC_ID}
                legend={galleryCopy.filterGroupLabel}
                onSelect={selectWingFilter}
                options={institutionOptions}
                value={wingFilter}
              />
            </div>

            {/* Search Input & Layout Switcher */}
            <div className="flex items-center gap-3">
              {/* Live Search Input */}
              <div className="relative flex-1 sm:w-72 lg:w-80">
                <Icon
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-ink-muted pointer-events-none"
                  icon={Search01Icon}
                />
                <input
                  aria-label="Search gallery moments"
                  className="w-full h-10 pl-10 pr-9 rounded-xl border border-border/90 bg-surface-raised text-xs font-medium text-ink placeholder:text-ink-muted/70 focus:outline-none focus:ring-2 focus:ring-primary-700/30 focus:border-primary-700 transition-all"
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={galleryCopy.searchPlaceholder}
                  type="text"
                  value={searchQuery}
                />
                {searchQuery ? (
                  <button
                    aria-label="Clear search"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-ink-muted hover:text-ink cursor-pointer"
                    onClick={() => setSearchQuery("")}
                    type="button"
                  >
                    <Icon className="size-3.5" icon={Cancel01Icon} />
                  </button>
                ) : null}
              </div>

              {/* Layout Switcher */}
              <div className="flex items-center p-1 rounded-xl border border-border/90 bg-surface-raised shrink-0 shadow-2xs">
                <button
                  aria-label={galleryCopy.layoutMosaic}
                  className={cn(
                    "p-2 rounded-lg transition-all cursor-pointer flex items-center justify-center",
                    layoutMode === "mosaic"
                      ? "bg-primary-700 text-white shadow-2xs"
                      : "text-ink-muted hover:text-ink",
                  )}
                  onClick={() => setLayoutMode("mosaic")}
                  title={galleryCopy.layoutMosaic}
                  type="button"
                >
                  <Icon className="size-4" icon={DashboardSquare02Icon} />
                </button>
                <button
                  aria-label={galleryCopy.layoutGrid}
                  className={cn(
                    "p-2 rounded-lg transition-all cursor-pointer flex items-center justify-center",
                    layoutMode === "grid"
                      ? "bg-primary-700 text-white shadow-2xs"
                      : "text-ink-muted hover:text-ink",
                  )}
                  onClick={() => setLayoutMode("grid")}
                  title={galleryCopy.layoutGrid}
                  type="button"
                >
                  <Icon className="size-4" icon={Grid02Icon} />
                </button>
              </div>
            </div>
          </div>

          {/* Second Row: Category Theme Pills + Live Counter */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-border/60">
            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-1">
              <span className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-ink-muted pr-1 shrink-0">
                <Icon className="size-3.5 text-accent" icon={FilterIcon} />
                Themes:
              </span>
              {galleryCategories.map((cat) => {
                const isActive = categoryFilter === cat.id;
                return (
                  <button
                    className={cn(
                      "px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 cursor-pointer shrink-0",
                      isActive
                        ? "bg-primary-700 text-white shadow-2xs font-semibold"
                        : "bg-surface-raised border border-border/80 text-ink-muted hover:text-ink hover:border-accent/40",
                    )}
                    key={cat.id}
                    onClick={() => selectCategory(cat.id)}
                    type="button"
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Live Counter & Clear Action */}
            <div className="flex items-center gap-3 shrink-0">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-muted bg-surface-raised px-3 py-1.5 rounded-full border border-border/80 shadow-2xs">
                <Icon className="size-3.5 text-accent" icon={Image01Icon} />
                Showing{" "}
                <strong className="text-ink">{matchingItems.length}</strong> of{" "}
                {items.length} moments
              </span>

              {isFiltered ? (
                <button
                  className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:text-primary-800 transition-colors cursor-pointer"
                  onClick={resetAllFilters}
                  type="button"
                >
                  <Icon className="size-3.5" icon={RefreshIcon} />
                  <span>{galleryCopy.resetAll}</span>
                </button>
              ) : null}
            </div>
          </div>

          {/* Active Album Badge (if filtered via album) */}
          {selectedAlbum ? (
            <div className="flex items-center gap-2 pt-2">
              <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 border border-accent/25 px-3.5 py-1 text-xs font-semibold text-accent">
                <Icon className="size-3.5 text-accent" icon={SparklesIcon} />
                <span>
                  {galleryCopy.viewingAlbumPrefix}:{" "}
                  <strong>{selectedAlbum.title}</strong>
                </span>
                <button
                  aria-label="Remove album filter"
                  className="hover:text-primary-800 ml-1 p-0.5 cursor-pointer"
                  onClick={resetAllFilters}
                  type="button"
                >
                  <Icon className="size-3.5" icon={Cancel01Icon} />
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      {/* Main Gallery Archive Section */}
      <section className="gutter-x section-y">
        <div className="mx-auto max-w-page">
          {matchingItems.length === 0 ? (
            <div className="py-16 text-center max-w-md mx-auto space-y-4">
              <div className="mx-auto size-12 rounded-full bg-muted flex items-center justify-center text-ink-muted">
                <Icon className="size-6" icon={Image01Icon} />
              </div>
              <H4 className="text-lg font-semibold text-ink">
                No moments found
              </H4>
              <P className="text-sm text-ink-muted">{galleryCopy.emptyState}</P>
              <button
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-700 text-white text-xs font-semibold shadow-xs hover:bg-primary-800 transition-colors cursor-pointer mt-2"
                onClick={resetAllFilters}
                type="button"
              >
                <Icon className="size-4" icon={RefreshIcon} />
                <span>{galleryCopy.resetAll}</span>
              </button>
            </div>
          ) : layoutMode === "mosaic" ? (
            <Reveal className="@container" y={32}>
              <div className={MOSAIC_CLASS} id={MOSAIC_ID} ref={stageRef}>
                {items.map((item) => (
                  <GalleryTile
                    className={isVisible(item) ? undefined : "hidden"}
                    item={item}
                    key={item.id}
                    rowSpan={tileRowSpan(item.image)}
                    sizes={TILE_SIZES}
                  />
                ))}
              </div>
            </Reveal>
          ) : (
            <Reveal className={GRID_CLASS} y={32}>
              {matchingItems.map((item) => (
                <div
                  className="group relative aspect-4/3 overflow-hidden rounded-2xl border border-border/80 bg-surface-raised shadow-2xs hover:border-accent/60 hover:shadow-md transition-all duration-300"
                  key={item.id}
                >
                  <Image
                    alt={item.image.alt}
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    src={item.image.src}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 right-3 text-white pointer-events-none">
                    <span className="block font-display text-sm font-semibold truncate drop-shadow-sm">
                      {item.title}
                    </span>
                    <span className="block font-body text-[11px] text-white/80 uppercase tracking-wider mt-0.5">
                      {item.category}
                    </span>
                  </div>
                </div>
              ))}
            </Reveal>
          )}
        </div>
      </section>
    </>
  );
}
