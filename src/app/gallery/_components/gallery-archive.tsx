"use client";

import { useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import { Reveal } from "@/components/motion/reveal";
import {
  type FilterOption,
  SegmentedFilter,
} from "@/components/shared/filter-controls";
import { P } from "@/components/ui/typography";
import type {
  ContentImage,
  EntityRole,
  GalleryItem,
  NamedEntity,
} from "@/lib/content";
import { Flip, FULL_MOTION_QUERY, gsap, useGSAP } from "@/lib/gsap";
import {
  countUnattributed,
  INSTITUTION_PARAM,
  INSTITUTION_ROLES,
  type InstitutionFilter,
  institutionLabel,
  matchesInstitution,
  parseInstitutionFilter,
} from "@/lib/institution-filter";
import { galleryCopy } from "./gallery-copy";
import { GalleryTile } from "./gallery-tile";

const ROWS_PER_COLUMN = 60;
const GUTTER_ROWS = 4;

const MOSAIC_CLASS =
  "relative grid grid-flow-row-dense grid-cols-2 gap-x-[var(--gallery-gutter)] overflow-hidden auto-rows-[var(--gallery-row)] [--gallery-gutter:calc(4*var(--gallery-row))] [--gallery-row:calc(100cqw/124)] sm:grid-cols-3 sm:[--gallery-row:calc(100cqw/188)] md:grid-cols-4 md:[--gallery-row:calc(100cqw/252)] lg:grid-cols-5 lg:[--gallery-row:calc(100cqw/316)] 2xl:grid-cols-6 2xl:[--gallery-row:calc(100cqw/380)]";

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

export function GalleryArchive({
  entities,
  items,
}: {
  readonly entities: Readonly<Record<EntityRole, NamedEntity>>;
  readonly items: readonly GalleryItem[];
}) {
  const searchParams = useSearchParams();
  const initialFilter = parseInstitutionFilter(
    searchParams.get(INSTITUTION_PARAM) ?? undefined,
  );
  const stageRef = useRef<HTMLDivElement>(null);
  const snapshotRef = useRef<Snapshot | null>(null);
  const [filter, setFilter] = useState<InstitutionFilter>(initialFilter);

  useGSAP(
    () => {
      const stage = stageRef.current;
      const snapshot = snapshotRef.current;
      if (!stage || !snapshot) return;
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
    { dependencies: [filter], scope: stageRef },
  );

  const takeSnapshot = () => {
    const stage = stageRef.current;
    if (!stage) return;
    snapshotRef.current = {
      state: Flip.getState(
        stage.querySelectorAll<HTMLElement>("[data-gallery-tile]"),
      ),
      height: stage.offsetHeight,
    };
  };

  const selectFilter = (next: InstitutionFilter) => {
    if (next === filter) return;
    takeSnapshot();
    setFilter(next);
  };

  const institutionOptions: readonly FilterOption<InstitutionFilter>[] = [
    { id: "all", label: galleryCopy.allLabel },
    ...INSTITUTION_ROLES.map((role) => ({
      accessibleLabel: galleryCopy.filterOptionLabel(
        institutionLabel[role],
        entities[role].name,
      ),
      id: role as InstitutionFilter,
      label: institutionLabel[role],
    })),
  ];

  const isVisible = (item: GalleryItem) => matchesInstitution(item, filter);

  const shown = items.reduce(
    (total, item) => (isVisible(item) ? total + 1 : total),
    0,
  );
  const unattributed = countUnattributed(items);

  return (
    <>
      <section className="gutter-x section-y-compact border-y border-border">
        <div className="mx-auto max-w-page">
          <SegmentedFilter
            controls={MOSAIC_ID}
            legend={galleryCopy.filterGroupLabel}
            onSelect={selectFilter}
            options={institutionOptions}
            value={filter}
          />

          {filter === "all" || unattributed === 0 ? null : (
            <P className="mt-6 max-w-md border-t border-border pt-4 text-sm lg:mt-8">
              {galleryCopy.unattributedNote}
            </P>
          )}
        </div>
      </section>

      <section className="gutter-x section-y">
        <div className="mx-auto max-w-page">
          {shown === 0 ? (
            <P className="max-w-xl">{galleryCopy.emptyState}</P>
          ) : null}

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
        </div>
      </section>
    </>
  );
}
