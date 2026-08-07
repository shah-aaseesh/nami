import { entryOf, isoDate } from "../identifiers";
import { placeholderData, placeholderText } from "../placeholder-registry";
import type { ContentLink, Update } from "../types";

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

export const placeholderNews: readonly Update[] = [
  placeholderData<Update>("updates[news-placeholder-long]", "update", {
    ...entryOf("news-placeholder-long"),
    kind: "news",
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
    title: "Placeholder news story",
    excerpt: "Placeholder copy awaiting a real NAMI announcement.",
    publishedAt: isoDate("2023-09-05"),
    happensAt: null,
    venue: null,
    link: null,
    image: null,
  }),
];
