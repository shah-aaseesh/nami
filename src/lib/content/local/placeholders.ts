import { entryOf, isoDate } from "../identifiers";
import {
  placeholderData,
  placeholderImage,
  placeholderText,
} from "../placeholder-registry";
import type { ContentImage, ContentLink, Testimonial, Update } from "../types";

export const heroImage: ContentImage = placeholderImage("images/hero-16x9", {
  src: "/placeholder/hero-16x9.png",
  alt: "Placeholder image, 16:9",
  width: 1600,
  height: 900,
});

export const levelImage: ContentImage = placeholderImage("images/level-4x3", {
  src: "/placeholder/level-4x3.png",
  alt: "Placeholder image, 4:3",
  width: 1200,
  height: 900,
});

export const campusImage: ContentImage = placeholderImage("images/campus-3x2", {
  src: "/placeholder/campus-3x2.png",
  alt: "Placeholder image, 3:2",
  width: 1200,
  height: 800,
});

export const logoImage: ContentImage = placeholderImage("images/logo-3x1", {
  src: "/placeholder/logo-3x1.png",
  alt: "Placeholder logo",
  width: 600,
  height: 200,
});

export const portraitImage: ContentImage = placeholderImage(
  "images/portrait-1x1",
  {
    src: "/placeholder/portrait-1x1.png",
    alt: "Placeholder portrait",
    width: 600,
    height: 600,
  },
);

export const contactPhone = placeholderText(
  "institution.contact.phone",
  "contact",
  "+977-1-4XXXXXX",
);

export const contactEmail = placeholderText(
  "institution.contact.email",
  "contact",
  "admissions@nami.example",
);

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
  label: "View admission notice",
  href: placeholderText(
    "admissionCalls[admission-plus-two].link.href",
    "link",
    "https://nami.example/admissions/plus-two",
  ),
  destination: "external",
};

export const bachelorMasterAdmissionLink: ContentLink = {
  label: "View admission notice",
  href: placeholderText(
    "admissionCalls[admission-bachelor-master].link.href",
    "link",
    "https://nami.example/admissions/bachelor-master",
  ),
  destination: "external",
};

export const placeholderTestimonials: readonly Testimonial[] = [
  placeholderData("testimonials[placeholder-alumna-a]", "testimonial", {
    ...entryOf("placeholder-alumna-a"),
    quote:
      "Placeholder testimonial. A short pull-quote sits here, roughly this long.",
    name: "Placeholder Alumna A",
    programme: "BSc (Hons) Computer Science",
    graduatedYear: 2022,
    portrait: portraitImage,
  }),
  placeholderData("testimonials[placeholder-alumnus-b]", "testimonial", {
    ...entryOf("placeholder-alumnus-b"),
    quote:
      "Placeholder testimonial. A medium-length alumni story sits here — two sentences describing what the programme led to, at the length a real quote is likely to run once NAMI has collected them.",
    name: "Placeholder Alumnus B",
    programme: "Cambridge International A-Level",
    graduatedYear: 2019,
    portrait: portraitImage,
  }),
  placeholderData("testimonials[placeholder-alumna-c]", "testimonial", {
    ...entryOf("placeholder-alumna-c"),
    quote:
      "Placeholder testimonial. The longest of the three, so the layout is judged against the worst case rather than the best: three or four sentences of a graduate describing the teaching, the campus and where they went next, running past the point where a card would want to truncate, so that truncation and overflow behaviour can be seen before real copy arrives.",
    name: "Placeholder Alumna C",
    programme: "MSc Computer Science",
    graduatedYear: 2024,
    portrait: portraitImage,
  }),
];

export const placeholderUpdates: readonly Update[] = [
  placeholderData("updates[placeholder-notice-admissions]", "update", {
    ...entryOf("placeholder-notice-admissions"),
    kind: "notice" as const,
    title: "Placeholder notice — admissions open for the 2026 intake",
    excerpt:
      "Placeholder copy standing in for a real notice, at about the length a notice board entry runs.",
    publishedAt: isoDate("2026-08-01"),
    happensAt: null,
    venue: null,
    link: {
      label: "Read the notice",
      href: "https://nami.example/notices/placeholder-admissions",
      destination: "external",
    },
    image: null,
  }),
  placeholderData("updates[placeholder-event-orientation]", "update", {
    ...entryOf("placeholder-event-orientation"),
    kind: "event" as const,
    title: "Placeholder event — orientation programme",
    excerpt:
      "Placeholder copy standing in for an event listing, with a date and a venue so the layout can be judged.",
    publishedAt: isoDate("2026-07-28"),
    happensAt: isoDate("2026-09-05"),
    venue: "Placeholder Hall, Gokarneshwor-7 campus",
    link: null,
    image: campusImage,
  }),
  placeholderData("updates[placeholder-news-incubation]", "update", {
    ...entryOf("placeholder-news-incubation"),
    kind: "news" as const,
    title: "Placeholder news — a story from the incubation centre",
    excerpt:
      "Placeholder copy standing in for a news item. This one runs longer than the others so a mixed-length editorial list can be judged honestly before real stories arrive.",
    publishedAt: isoDate("2026-07-10"),
    happensAt: null,
    venue: null,
    link: null,
    image: campusImage,
  }),
  placeholderData("updates[placeholder-notice-examination]", "update", {
    ...entryOf("placeholder-notice-examination"),
    kind: "notice" as const,
    title: "Placeholder notice — examination timetable published",
    excerpt: "Placeholder copy. A short notice, to vary the list.",
    publishedAt: isoDate("2026-06-20"),
    happensAt: null,
    venue: null,
    link: null,
    image: null,
  }),
];
