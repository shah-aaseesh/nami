import type { EntityRole } from "@/lib/content";

export type InstitutionFilter = EntityRole | "all";

export type InstitutionScoped = {
  readonly institution: EntityRole | null;
};

export const INSTITUTION_PARAM = "institution";

export const INSTITUTION_ROLES: readonly EntityRole[] = [
  "school",
  "college",
  "institute",
];

export const institutionLabel: Record<EntityRole, string> = {
  school: "School",
  college: "College",
  institute: "Institute",
};

export function parseInstitutionFilter(
  value: string | readonly string[] | undefined,
): InstitutionFilter {
  if (typeof value !== "string") return "all";
  const candidate = value.trim().toLowerCase();
  return INSTITUTION_ROLES.find((role) => role === candidate) ?? "all";
}

export function matchesInstitution(
  item: InstitutionScoped,
  filter: InstitutionFilter,
): boolean {
  return filter === "all" || item.institution === filter;
}

export function countByInstitution(
  items: readonly InstitutionScoped[],
  filter: InstitutionFilter,
): number {
  return items.reduce(
    (total, item) => (matchesInstitution(item, filter) ? total + 1 : total),
    0,
  );
}

export function countUnattributed(items: readonly InstitutionScoped[]): number {
  return items.reduce(
    (total, item) => (item.institution === null ? total + 1 : total),
    0,
  );
}
