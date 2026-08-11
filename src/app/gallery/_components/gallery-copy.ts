import type { Crumb } from "@/components/seo/structured-data";

export const galleryTrail: readonly Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Gallery", path: "/gallery" },
];

export const galleryCopy = {
  meta: {
    title: "Gallery",
    description:
      "The NAMI group's photographic record of the year in Kathmandu — classrooms and campuses, tournaments and service camps, orientations and convocations, filterable by institution.",
  },
  masthead: {
    eyebrow: "Gallery",
    heading: "A year, in pictures.",
    standfirst:
      "Classrooms and campuses, tournaments and service camps, orientations and convocations. One archive across the school, the college and the institute — filter it by institution, or read the whole year straight through.",
  },
  allLabel: "All",
  filterGroupLabel: "Filter by institution",
  filterOptionLabel: (label: string, name: string | null) =>
    name === null ? label : `${label} — ${name}`,
  unattributedNote:
    "Some photographs are not yet attributed to an institution, and appear under All only.",
  emptyState:
    "Nothing in the archive is attributed to this institution yet. Choose All to see the whole year.",
  emptyArchive:
    "There are no photographs on record yet. They will appear here as the group publishes them.",
} as const;
