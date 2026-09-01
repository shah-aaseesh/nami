import type { Crumb } from "@/components/seo/structured-data";
import type { ContentImage } from "@/lib/content";
import {
  basketballPrizeGiving,
  convocationCeremony,
  mustangTrip,
  scienceLaboratory,
} from "@/lib/content/local/images";

const schoolNationalDressDay: ContentImage = {
  src: "/nami/school/nami-school-national-dress-day.jpg",
  alt: "NAMI International School pupils in Nepali national dress standing in namaste on a classroom floor.",
  width: 1000,
  height: 750,
};

export const galleryTrail: readonly Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Gallery", path: "/gallery" },
];

export type CuratedAlbum = {
  readonly id: string;
  readonly title: string;
  readonly category: string;
  readonly institution?: string | null;
  readonly tag: string;
  readonly description: string;
  readonly image: ContentImage;
  readonly countLabel: string;
};

export const curatedAlbums: readonly CuratedAlbum[] = [
  {
    id: "mustang-expedition",
    title: "Mustang Academic Fieldwork",
    category: "student-life",
    institution: "college",
    tag: "Field Excursion",
    description:
      "A-Level scholars on geological and environmental field exploration across the Mustang valley ridge.",
    image: mustangTrip,
    countLabel: "A-Levels • Field Trip",
  },
  {
    id: "convocations-orientations",
    title: "Convocations & Graduations",
    category: "graduation",
    institution: "institute",
    tag: "Milestones",
    description:
      "Graduation ceremonies, academic orientations, and ELITE symposiums celebrating our degree holders.",
    image: convocationCeremony,
    countLabel: "Bachelors & Masters",
  },
  {
    id: "campus-labs-infrastructure",
    title: "Labs, Libraries & Spaces",
    category: "academics",
    institution: null,
    tag: "Infrastructure",
    description:
      "State-of-the-art chemistry laboratories, computer suites, and multi-floor silent reading halls.",
    image: scienceLaboratory,
    countLabel: "All Wings • Facilities",
  },
  {
    id: "sports-tournaments",
    title: "Sports & Athletics",
    category: "sports",
    institution: null,
    tag: "Tournaments",
    description:
      "Annual inter-house basketball championships, outdoor tournaments, and playground activities.",
    image: basketballPrizeGiving,
    countLabel: "Tournaments & Games",
  },
  {
    id: "school-celebrations",
    title: "School Life & Culture",
    category: "events",
    institution: "primary",
    tag: "Culture & Arts",
    description:
      "National dress day, cultural performances, and early-years classroom explorations at NAMI School.",
    image: schoolNationalDressDay,
    countLabel: "Primary School",
  },
];

export const galleryCategories = [
  { id: "all", label: "All Themes" },
  { id: "events", label: "Events & Festivals" },
  { id: "academics", label: "Labs & Academics" },
  { id: "student-life", label: "Excursions & Fieldwork" },
  { id: "sports", label: "Sports & Games" },
  { id: "graduation", label: "Convocations" },
  { id: "campus", label: "Campus Spaces" },
] as const;

export const galleryCopy = {
  meta: {
    title: "Gallery & Visual Archive",
    description:
      "Explore the photographic record of NAMI in Kathmandu — campus life, science laboratories, academic field trips, sports tournaments, and graduation ceremonies.",
  },
  masthead: {
    eyebrow: "VISUAL ARCHIVE",
    heading: "Life & Moments at NAMI.",
    standfirst:
      "Explore our photographic archive spanning classroom breakthroughs, fieldwork expeditions, inter-house tournaments, and annual convocations across all three wings.",
  },
  albumsSection: {
    eyebrow: "FEATURED COLLECTIONS",
    heading: "Curated Moments",
    standfirst:
      "Browse hand-picked story albums from landmark events, expeditions, and campus life.",
  },
  allLabel: "All Wings",
  filterGroupLabel: "Filter by academic wing",
  categoryGroupLabel: "Filter by category",
  searchPlaceholder:
    "Search moments (e.g. Mustang, Lab, Basketball, Library)...",
  layoutMosaic: "Masonry Mosaic",
  layoutGrid: "Uniform Grid",
  viewingAlbumPrefix: "Viewing Collection",
  clearFilter: "Clear filter",
  resetAll: "Reset all filters",
  filterOptionLabel: (label: string, name: string | null) =>
    name === null ? label : `${label} — ${name}`,
  unattributedNote:
    "Some photographs are not yet attributed to an institution, and appear under All only.",
  emptyState:
    "No photographs matched your selected filters or search query. Try resetting filters to explore the whole archive.",
  emptyArchive:
    "There are no photographs on record yet. They will appear here as the group publishes them.",
} as const;
