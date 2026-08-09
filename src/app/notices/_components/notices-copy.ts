import type { Crumb } from "@/components/seo/structured-data";
import type { UpdateKind } from "@/lib/content";

export const noticesTrail: readonly Crumb[] = [
  { name: "Home", path: "/" },
  { name: "News & notices", path: "/notices" },
];

export const updateKindLabel: Record<UpdateKind, string> = {
  notice: "Notice",
  event: "Event",
  news: "News",
};

const updateKindPlural: Record<UpdateKind, string> = {
  notice: "Notices",
  event: "Events",
  news: "News",
};

export const noticesCopy = {
  meta: {
    title: "News and notices",
    description:
      "Everything NAMI publishes in one place — standing notices, upcoming events and the record of what the school, the college and the institute have hosted in Kathmandu, filterable by institution.",
  },
  masthead: {
    eyebrow: "News & notices",
    heading: "What NAMI is announcing.",
    standfirst:
      "One board for notices, events and news from the school, the college and the institute.",
  },
  institutionGroupLabel: "Filter by institution",
  kindGroupLabel: "Filter by type",
  yearGroupLabel: "Filter by year",
  allInstitutions: "All",
  allYears: "All",
  kindOption: (kind: UpdateKind) => updateKindPlural[kind],
  institutionOptionLabel: (label: string, name: string | null) =>
    name === null ? label : `${label} — ${name}`,
  unattributedNote:
    "Some updates are not yet attributed to an institution, and appear under All only.",
  resultsLabel: "Updates",
  upcomingLabel: "Upcoming",
  publishedLabel: "Published",
  pagination: {
    label: "Update pages",
    previous: "Previous",
    next: "Next",
    page: (page: number) => `Page ${page}`,
  },
  empty: {
    eyebrow: "Nothing here",
    heading: "No update matches that pair.",
    body: "Widen one of the two filters and the board fills again. Everything NAMI has published is still on this page.",
    reset: "Reset filters",
  },
  emptyArchive:
    "There is nothing to announce right now. Notices, events and news will appear here as the group publishes them.",
} as const;
