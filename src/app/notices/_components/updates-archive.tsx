"use client";

import { useRef, useState } from "react";
import {
  type FilterOption,
  SegmentedFilter,
} from "@/components/shared/filter-controls";
import { buttonVariants } from "@/components/ui/button";
import { Eyebrow, H2, P } from "@/components/ui/typography";
import type { EntityRole, NamedEntity, Update } from "@/lib/content";
import { FULL_MOTION_QUERY, gsap, useGSAP } from "@/lib/gsap";
import {
  INSTITUTION_ROLES,
  type InstitutionFilter,
  institutionLabel,
  matchesInstitution,
} from "@/lib/institution-filter";
import { cn } from "@/lib/utils";
import { noticesCopy } from "./notices-copy";
import { UpdateCard } from "./update-card";
import {
  ALL_CATEGORIES,
  ALL_YEARS,
  DEFAULT_UPDATE_KIND,
  matchesUpdateCategory,
  matchesUpdateKind,
  matchesYear,
  UPDATE_CATEGORIES,
  UPDATE_KINDS,
  type UpdateCategoryFilter,
  type UpdateKindFilter,
  upcomingFirst,
  type YearFilter,
  yearsOf,
} from "./updates-filter";
import { PAGE_SIZE, UpdatesPagination } from "./updates-pagination";
import { type SidebarOption, UpdatesSidebar } from "./updates-sidebar";
import { UpdatesSidebarPin } from "./updates-sidebar-pin";

const RESULTS_ID = "updates-results";

const CARD_IMAGE_SIZES =
  "(min-width: 1568px) 336px, (min-width: 1024px) 22vw, (min-width: 640px) 44vw, 90vw";

export function UpdatesArchive({
  entities,
  initialCategory,
  initialInstitution,
  initialKind,
  items,
  today,
}: {
  readonly entities: Readonly<Record<EntityRole, NamedEntity>>;
  readonly initialCategory: UpdateCategoryFilter;
  readonly initialInstitution: InstitutionFilter;
  readonly initialKind: UpdateKindFilter;
  readonly items: readonly Update[];
  readonly today: string;
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const appliedRef = useRef(
    `${initialInstitution}|${initialKind}|${ALL_YEARS}|${initialCategory}|1`,
  );
  const [institution, setInstitution] =
    useState<InstitutionFilter>(initialInstitution);
  const [kind, setKind] = useState<UpdateKindFilter>(initialKind);
  const [year, setYear] = useState<YearFilter>(ALL_YEARS);
  const [category, setCategory] =
    useState<UpdateCategoryFilter>(initialCategory);
  const [page, setPage] = useState(1);

  const byKindAndInstitution = items.filter(
    (item) =>
      matchesUpdateKind(item, kind) && matchesInstitution(item, institution),
  );

  const years = yearsOf(byKindAndInstitution);
  const activeYear = years.includes(year) ? year : ALL_YEARS;

  const visible = upcomingFirst(
    byKindAndInstitution.filter(
      (item) =>
        matchesYear(item, activeYear) && matchesUpdateCategory(item, category),
    ),
    today,
  );

  const pageCount = Math.max(1, Math.ceil(visible.length / PAGE_SIZE));
  const current = Math.min(page, pageCount);
  const shown = visible.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  useGSAP(
    () => {
      const stage = stageRef.current;
      const selection = `${institution}|${kind}|${activeYear}|${category}|${current}`;
      if (!stage || appliedRef.current === selection) return;
      appliedRef.current = selection;

      const cards = stage.querySelectorAll<HTMLElement>("[data-update-entry]");
      if (cards.length === 0) return;

      const mm = gsap.matchMedia();
      mm.add(FULL_MOTION_QUERY, () => {
        const tween = gsap.from(cards, {
          autoAlpha: 0,
          y: 16,
          duration: 0.5,
          ease: "power2.out",
          stagger: { amount: 0.4 },
        });
        return () => tween.kill();
      });

      return () => mm.revert();
    },
    {
      dependencies: [institution, kind, activeYear, category, current],
      scope: stageRef,
    },
  );

  const institutionOptions: readonly FilterOption<InstitutionFilter>[] = [
    { id: "all", label: noticesCopy.allInstitutions },
    ...INSTITUTION_ROLES.map((role) => ({
      accessibleLabel: noticesCopy.institutionOptionLabel(
        institutionLabel[role],
        entities[role].name,
      ),
      id: role as InstitutionFilter,
      label: institutionLabel[role],
    })),
  ];

  const kindOptions: readonly SidebarOption<UpdateKindFilter>[] =
    UPDATE_KINDS.map((value) => ({
      id: value,
      label: noticesCopy.kindOption(value),
    }));

  const yearOptions: readonly SidebarOption<YearFilter>[] = [
    { id: ALL_YEARS, label: noticesCopy.allYears },
    ...years.map((value) => ({ id: value, label: value })),
  ];

  const categoryOptions: readonly SidebarOption<UpdateCategoryFilter>[] = [
    { id: ALL_CATEGORIES, label: noticesCopy.allCategories },
    ...UPDATE_CATEGORIES.map((value) => ({
      id: value,
      label: noticesCopy.categoryOption(value),
    })),
  ];

  const selectInstitution = (next: InstitutionFilter) => {
    setInstitution(next);
    setPage(1);
  };

  const selectKind = (next: UpdateKindFilter) => {
    setKind(next);
    setPage(1);
  };

  const selectYear = (next: YearFilter) => {
    setYear(next);
    setPage(1);
  };

  const selectCategory = (next: UpdateCategoryFilter) => {
    setCategory(next);
    setPage(1);
  };

  const resetFilters = () => {
    setInstitution("all");
    setKind(DEFAULT_UPDATE_KIND);
    setYear(ALL_YEARS);
    setCategory(ALL_CATEGORIES);
    setPage(1);
  };

  const hasUnattributed = items.some(
    (item) => matchesUpdateKind(item, kind) && item.institution === null,
  );

  return (
    <section className="gutter-x section-y border-t border-border">
      <div className="mx-auto max-w-page lg:grid lg:grid-cols-12 lg:gap-x-10">
        <UpdatesSidebarPin className="lg:col-span-3">
          <UpdatesSidebar
            category={category}
            categoryOptions={categoryOptions}
            controls={RESULTS_ID}
            kind={kind}
            kindOptions={kindOptions}
            onSelectCategory={selectCategory}
            onSelectKind={selectKind}
            onSelectYear={selectYear}
            year={activeYear}
            yearOptions={yearOptions}
          />
        </UpdatesSidebarPin>

        <div className="mt-10 lg:col-span-9 lg:mt-0">
          <div className="border-b border-border pb-6">
            <SegmentedFilter
              controls={RESULTS_ID}
              legend={noticesCopy.institutionGroupLabel}
              onSelect={selectInstitution}
              options={institutionOptions}
              value={institution}
            />

            {institution === "all" || !hasUnattributed ? null : (
              <P className="mt-6 max-w-md text-sm">
                {noticesCopy.unattributedNote}
              </P>
            )}
          </div>

          <div className="mt-10 lg:mt-12" id={RESULTS_ID} ref={stageRef}>
            {visible.length === 0 ? (
              <div className="max-w-xl">
                <Eyebrow>{noticesCopy.empty.eyebrow}</Eyebrow>
                <H2 className="mt-4">{noticesCopy.empty.heading}</H2>
                <P className="mt-6">{noticesCopy.empty.body}</P>
                <button
                  className={cn(buttonVariants({ size: "lg" }), "mt-10")}
                  onClick={resetFilters}
                  type="button"
                >
                  {noticesCopy.empty.reset}
                </button>
              </div>
            ) : (
              <>
                <ul className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-16">
                  {shown.map((item) => (
                    <UpdateCard
                      item={item}
                      key={item.id}
                      sizes={CARD_IMAGE_SIZES}
                      today={today}
                    />
                  ))}
                </ul>

                {pageCount === 1 ? null : (
                  <div className="mt-14 border-t border-border pt-8 lg:mt-20">
                    <UpdatesPagination
                      current={current}
                      onSelect={setPage}
                      pageCount={pageCount}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
