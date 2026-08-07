"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import {
  GALLERY_CATEGORIES,
  type GalleryCategory,
  type GalleryItem,
} from "@/lib/content";
import { Flip, gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { galleryCategoryLabel } from "./gallery-copy";

type FilterId = GalleryCategory | "all";

const ALL_FILTERS: readonly FilterId[] = ["all", ...GALLERY_CATEGORIES];

function isVisible(active: ReadonlySet<FilterId>, category: GalleryCategory) {
  return active.has("all") || active.has(category);
}

function isAllOn(active: ReadonlySet<FilterId>) {
  if (active.has("all")) return true;
  for (const c of GALLERY_CATEGORIES) if (!active.has(c)) return false;
  return true;
}

export function GalleryGrid({ items }: { items: readonly GalleryItem[] }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<ReadonlySet<FilterId>>(
    () => new Set<FilterId>(["all"]),
  );
  const prevActiveRef = useRef(active);

  useGSAP(
    () => {
      const root = rootRef.current;
      const stage = stageRef.current;
      if (!root || !stage) return;
      if (prevActiveRef.current === active) return;
      prevActiveRef.current = active;

      const tiles = Array.from(
        root.querySelectorAll<HTMLElement>("[data-gallery-tile]"),
      );
      if (tiles.length === 0) return;

      const visible = new Set<string>();
      for (const item of items) {
        if (isVisible(active, item.category)) visible.add(item.id);
      }

      const prevHeight = stage.offsetHeight;

      const state = Flip.getState(tiles);
      tiles.forEach((tile) => {
        const id = tile.dataset.galleryTile ?? "";
        tile.style.display = visible.has(id) ? "inline-block" : "none";
      });

      const nextHeight = stage.offsetHeight;

      stage.style.height = `${prevHeight}px`;
      const heightTween = gsap.to(stage, {
        height: nextHeight,
        duration: 0.7,
        ease: "power1.inOut",
      });

      const flip = Flip.from(state, {
        duration: 0.7,
        scale: true,
        ease: "power1.inOut",
        stagger: 0.04,
        absolute: true,
        onEnter: (elements) =>
          gsap.fromTo(
            elements,
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 0.6 },
          ),
        onLeave: (elements) =>
          gsap.to(elements, { opacity: 0, scale: 0.8, duration: 0.4 }),
        onComplete: () => {
          stage.style.height = "";
          heightTween.kill();
        },
      });

      return () => {
        flip.kill();
        heightTween.kill();
        stage.style.height = "";
      };
    },
    { dependencies: [active, items], scope: rootRef },
  );

  const toggle = (id: FilterId) => {
    setActive((prev) => {
      const next = new Set(prev);
      if (id === "all") {
        if (isAllOn(prev)) {
          next.clear();
        } else {
          next.clear();
          next.add("all");
        }
      } else if (next.has("all")) {
        next.delete("all");
        next.add(id);
      } else if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div ref={rootRef} className="mt-16 lg:mt-24">
      <div className="flex flex-wrap items-center justify-center gap-3">
        {ALL_FILTERS.map((id) => {
          const isAll = id === "all";
          const on = isAll ? isAllOn(active) : active.has(id);
          return (
            <button
              aria-pressed={on}
              className={cn(
                "rounded-full border px-4 py-2.5 sm:px-5 sm:py-2 font-body text-xs font-medium uppercase tracking-widest transition-colors duration-200 cursor-pointer min-h-[40px] flex items-center justify-center",
                on
                  ? "border-accent bg-accent text-accent-ink"
                  : "border-border text-ink-muted hover:border-ink hover:text-ink",
              )}
              key={id}
              onClick={() => toggle(id)}
              type="button"
            >
              {isAll ? "All" : galleryCategoryLabel[id]}
            </button>
          );
        })}
      </div>

      <div
        className="relative mt-12 flex flex-wrap justify-center gap-4 overflow-hidden lg:gap-6"
        ref={stageRef}
      >
        {items.map((item) => (
          <div
            className="relative h-36 w-48 shrink-0 overflow-hidden rounded-xl bg-muted sm:h-48 sm:w-72 lg:h-56 lg:w-80"
            data-gallery-tile={item.id}
            key={item.id}
          >
            <Image
              alt={item.image.alt}
              className="size-full object-cover"
              height={item.image.height}
              loading="lazy"
              sizes="(max-width: 640px) 60vw, (max-width: 1024px) 30vw, 20vw"
              src={item.image.src}
              width={item.image.width}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
