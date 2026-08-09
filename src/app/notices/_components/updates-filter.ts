import type {
  IsoDate,
  Update,
  UpdateCategory,
  UpdateKind,
} from "@/lib/content";
import { PROVISIONAL_UPDATE_CATEGORIES } from "@/lib/content/types";

export type UpdateKindFilter = UpdateKind;

export type YearFilter = string;

export type UpdateCategoryFilter = UpdateCategory | "all";

export const UPDATE_KIND_PARAM = "kind";

export const UPDATE_CATEGORY_PARAM = "category";

export const DEFAULT_UPDATE_KIND: UpdateKindFilter = "notice";

export const ALL_YEARS: YearFilter = "all";

export const ALL_CATEGORIES: UpdateCategoryFilter = "all";

export const UPDATE_KINDS: readonly UpdateKind[] = ["notice", "event", "news"];

export const UPDATE_CATEGORIES: readonly UpdateCategory[] =
  PROVISIONAL_UPDATE_CATEGORIES;

export function parseUpdateKindFilter(
  value: string | readonly string[] | undefined,
): UpdateKindFilter {
  if (typeof value !== "string") return DEFAULT_UPDATE_KIND;
  const candidate = value.trim().toLowerCase();
  return UPDATE_KINDS.find((kind) => kind === candidate) ?? DEFAULT_UPDATE_KIND;
}

export function matchesUpdateKind(item: Update, filter: UpdateKindFilter) {
  return item.kind === filter;
}

export function parseUpdateCategoryFilter(
  value: string | readonly string[] | undefined,
): UpdateCategoryFilter {
  if (typeof value !== "string") return ALL_CATEGORIES;
  const candidate = value.trim().toLowerCase();
  return (
    UPDATE_CATEGORIES.find((category) => category === candidate) ??
    ALL_CATEGORIES
  );
}

export function matchesUpdateCategory(
  item: Update,
  filter: UpdateCategoryFilter,
) {
  return filter === ALL_CATEGORIES || item.category === filter;
}

function day(value: IsoDate) {
  return value.slice(0, 10);
}

export function yearOf(item: Update) {
  return item.publishedAt.slice(0, 4);
}

export function matchesYear(item: Update, filter: YearFilter) {
  return filter === ALL_YEARS || yearOf(item) === filter;
}

export function yearsOf(items: readonly Update[]) {
  return [...new Set(items.map(yearOf))].sort((a, b) => b.localeCompare(a));
}

export function isUpcoming(item: Update, today: string) {
  return item.happensAt !== null && day(item.happensAt) >= today;
}

export function upcomingFirst(items: readonly Update[], today: string) {
  const upcoming = items
    .filter((item) => isUpcoming(item, today))
    .sort((a, b) =>
      day(a.happensAt ?? a.publishedAt).localeCompare(
        day(b.happensAt ?? b.publishedAt),
      ),
    );
  const rest = items.filter((item) => !isUpcoming(item, today));
  return [...upcoming, ...rest];
}
