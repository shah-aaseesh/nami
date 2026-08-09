import { entryOf, isoDate } from "../identifiers";
import { placeholderData, placeholderText } from "../placeholder-registry";
import type { ContentLink, Update } from "../types";
import {
  readingHall,
  readingRoom,
  schoolTransport,
  scienceLaboratory,
} from "./images";

export const gokarneshworStreetAddress = placeholderText(
  "institution.campuses[gokarneshwor].streetAddress",
  "address",
  "Placeholder Marg, House No. 00",
);

export const newBaneshworStreetAddress = placeholderText(
  "institution.campuses[new-baneshwor].streetAddress",
  "address",
  "Placeholder Sadak, House No. 00",
);

export const gokarneshworMapUrl = placeholderText(
  "institution.campuses[gokarneshwor].mapUrl",
  "map",
  "https://maps.example/placeholder/gokarneshwor",
);

export const newBaneshworMapUrl = placeholderText(
  "institution.campuses[new-baneshwor].mapUrl",
  "map",
  "https://maps.example/placeholder/new-baneshwor",
);

export const plusTwoAdmissionLink: ContentLink = {
  label: "Visit College Website",
  href: "https://college.nami.edu.np/",
  destination: "external",
};

export const bachelorMasterAdmissionLink: ContentLink = {
  label: "Visit College Website",
  href: "https://college.nami.edu.np/",
  destination: "external",
};

export const preRegistrationNoticeExcerpt = placeholderText(
  "updates[pre-registration-open-for-a-level].excerpt",
  "update",
  "Placeholder summary. NAMI's own notice carries this headline and no body text, so there is nothing yet to quote here.",
);

export const placeholderUpdates: readonly Update[] = [
  placeholderData<Update>("updates[news-placeholder-long]", "update", {
    ...entryOf("news-placeholder-long"),
    kind: "news",
    category: "general",
    institution: null,
    title:
      "Placeholder news story with a headline long enough to wrap onto a second line in the listing",
    excerpt:
      "Placeholder copy standing in for a NAMI announcement. The college publishes events and notices today and no news articles at all, so this entry exists only to show the listing at a realistic length. Replace it with real copy before launch.",
    publishedAt: isoDate("2024-03-15"),
    happensAt: null,
    venue: null,
    link: null,
    image: null,
  }),
  placeholderData<Update>("updates[news-placeholder-medium]", "update", {
    ...entryOf("news-placeholder-medium"),
    kind: "news",
    category: "results",
    institution: null,
    title: "Placeholder news story, medium headline",
    excerpt:
      "Placeholder copy. Nothing here is a statement about NAMI; replace it with a real announcement before launch.",
    publishedAt: isoDate("2023-11-10"),
    happensAt: null,
    venue: null,
    link: null,
    image: null,
  }),
  placeholderData<Update>("updates[news-placeholder-short]", "update", {
    ...entryOf("news-placeholder-short"),
    kind: "news",
    category: "holidays",
    institution: null,
    title: "Placeholder news story",
    excerpt: "Placeholder copy awaiting a real NAMI announcement.",
    publishedAt: isoDate("2023-09-05"),
    happensAt: null,
    venue: null,
    link: null,
    image: null,
  }),

  placeholderData<Update>("updates[school-placeholder-uniform]", "update", {
    ...entryOf("school-placeholder-uniform"),
    kind: "notice",
    category: "admissions",
    institution: "school",
    title: "Placeholder notice — uniform and stationery collection window",
    excerpt:
      "Placeholder copy standing in for a NAMI International School notice. No collection dates, counter timings or contact lines here are real, and nothing in this entry is an instruction to any parent. It exists so the notice board can be judged at a realistic length before the school supplies its own wording.",
    publishedAt: isoDate("2026-07-14"),
    happensAt: null,
    venue: null,
    link: null,
    image: schoolTransport,
  }),
  placeholderData<Update>("updates[school-placeholder-sports-day]", "update", {
    ...entryOf("school-placeholder-sports-day"),
    kind: "event",
    category: "events",
    institution: "school",
    title: "Placeholder event — junior school sports day",
    excerpt:
      "Placeholder copy for a dated school event that has not happened yet. The date below is invented purely to exercise the upcoming state on this page; replace the whole entry before launch.",
    publishedAt: isoDate("2026-06-02"),
    happensAt: isoDate("2026-09-12"),
    venue: "Placeholder Ground",
    link: null,
    image: readingRoom,
  }),
  placeholderData<Update>("updates[school-placeholder-library]", "update", {
    ...entryOf("school-placeholder-library"),
    kind: "news",
    category: "general",
    institution: "school",
    title: "Placeholder news — the junior library reopens after refurbishment",
    excerpt:
      "Placeholder copy. Nothing here describes a real refurbishment, a real reading room or a real reopening at NAMI International School.",
    publishedAt: isoDate("2026-03-19"),
    happensAt: null,
    venue: null,
    link: null,
    image: readingHall,
  }),
  placeholderData<Update>("updates[school-placeholder-parents]", "update", {
    ...entryOf("school-placeholder-parents"),
    kind: "notice",
    category: "examinations",
    institution: "school",
    title: "Placeholder notice — parents' evening scheduling",
    excerpt:
      "Placeholder copy. No meeting slots, no year groups and no arrangements described here are real; the school will supply the notice this stands in for.",
    publishedAt: isoDate("2025-11-05"),
    happensAt: null,
    venue: null,
    link: null,
    image: scienceLaboratory,
  }),

  placeholderData<Update>(
    "updates[college-placeholder-registration]",
    "update",
    {
      ...entryOf("college-placeholder-registration"),
      kind: "notice",
      category: "admissions",
      institution: "college",
      title: "Placeholder notice — A-Level registration window",
      excerpt:
        "Placeholder copy standing in for a college registration notice. The window, the documents and the counter it names are all invented, and the link below points at a placeholder host rather than anywhere real.",
      publishedAt: isoDate("2026-07-28"),
      happensAt: null,
      venue: null,
      link: {
        label: "Placeholder link",
        href: "https://placeholder.example/nami-registration",
        destination: "external",
      },
      image: readingHall,
    },
  ),
  placeholderData<Update>("updates[college-placeholder-quiz]", "update", {
    ...entryOf("college-placeholder-quiz"),
    kind: "event",
    category: "events",
    institution: "college",
    title: "Placeholder event — inter-house quiz final",
    excerpt:
      "Placeholder copy for an upcoming college event. The houses, the format and the date are all invented to show this page carrying something that has not happened yet.",
    publishedAt: isoDate("2026-05-20"),
    happensAt: isoDate("2026-08-29"),
    venue: "Placeholder Hall",
    link: null,
    image: readingRoom,
  }),
  placeholderData<Update>(
    "updates[college-placeholder-orientation]",
    "update",
    {
      ...entryOf("college-placeholder-orientation"),
      kind: "event",
      category: "events",
      institution: "college",
      title: "Placeholder event — A-Level intake orientation",
      excerpt:
        "Placeholder copy for a dated college event that has already passed, so the record below has a fake entry sitting next to the real ones. Replace it before launch.",
      publishedAt: isoDate("2025-08-11"),
      happensAt: isoDate("2025-08-24"),
      venue: "Placeholder Auditorium",
      link: null,
      image: schoolTransport,
    },
  ),
  placeholderData<Update>("updates[college-placeholder-results]", "update", {
    ...entryOf("college-placeholder-results"),
    kind: "news",
    category: "results",
    institution: "college",
    title: "Placeholder news — a note on the last examination session",
    excerpt:
      "Placeholder copy. No grade, cohort or outcome mentioned here is real, and nothing in it should be read as a claim about any NAMI student.",
    publishedAt: isoDate("2025-06-27"),
    happensAt: null,
    venue: null,
    link: null,
    image: scienceLaboratory,
  }),

  placeholderData<Update>("updates[institute-placeholder-thesis]", "update", {
    ...entryOf("institute-placeholder-thesis"),
    kind: "notice",
    category: "examinations",
    institution: "institute",
    title: "Placeholder notice — undergraduate thesis submission",
    excerpt:
      "Placeholder copy standing in for a Naaya Aayam Multi-Disciplinary Institute notice. The deadline, the format and the submission route are invented and must not be acted on.",
    publishedAt: isoDate("2026-07-02"),
    happensAt: null,
    venue: null,
    link: null,
    image: readingRoom,
  }),
  placeholderData<Update>("updates[institute-placeholder-research]", "update", {
    ...entryOf("institute-placeholder-research"),
    kind: "event",
    category: "events",
    institution: "institute",
    title: "Placeholder event — undergraduate research day",
    excerpt:
      "Placeholder copy for an upcoming institute event. No panel, no department and no date here is real; the entry exists to show a third institution filling the upcoming board.",
    publishedAt: isoDate("2026-04-08"),
    happensAt: isoDate("2026-10-03"),
    venue: "Placeholder Campus",
    link: null,
    image: scienceLaboratory,
  }),
  placeholderData<Update>(
    "updates[institute-placeholder-partnership]",
    "update",
    {
      ...entryOf("institute-placeholder-partnership"),
      kind: "news",
      category: "holidays",
      institution: "institute",
      title:
        "Placeholder news — an undated story with no date attached to it at all",
      excerpt:
        "Placeholder copy for an undated institute story, which is the third kind of object this page has to carry. It names no partner, no agreement and no university, because none of it is real.",
      publishedAt: isoDate("2026-01-16"),
      happensAt: null,
      venue: null,
      link: null,
      image: readingHall,
    },
  ),
  placeholderData<Update>("updates[institute-placeholder-careers]", "update", {
    ...entryOf("institute-placeholder-careers"),
    kind: "event",
    category: "events",
    institution: "institute",
    title: "Placeholder event — graduate careers fair",
    excerpt:
      "Placeholder copy for a past institute event. The employers, the turnout and the day are invented and should be replaced with a real account.",
    publishedAt: isoDate("2025-09-30"),
    happensAt: isoDate("2025-10-18"),
    venue: "Placeholder Campus",
    link: null,
    image: schoolTransport,
  }),
];
