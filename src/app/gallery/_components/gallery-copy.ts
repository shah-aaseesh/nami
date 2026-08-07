import type { Crumb } from "@/components/seo/structured-data";
import type { GalleryCategory } from "@/lib/content";

export const galleryTrail: readonly Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Gallery", path: "/gallery" },
];

export const galleryCategoryLabel: Record<GalleryCategory, string> = {
  campus: "Campus",
  events: "Events",
  sports: "Sports",
  academics: "Academics",
  "student-life": "Student Life",
  graduation: "Graduation",
};

export const galleryCopy = {
  meta: {
    title: "Gallery",
    description:
      "Twenty photographs from a year at NAMI, Kathmandu — campus, events, sport, academics, student life and graduation, filtered by category.",
  },
  masthead: {
    eyebrow: "Gallery",
    heading: "A year, in pictures.",
    standfirst:
      "Campus and classrooms, tournaments and service camps, convocations and quiet corners — twenty photographs from the year, sorted by category.",
  },
} as const;
