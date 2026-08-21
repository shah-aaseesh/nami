import type { AboutCopy } from "../types";
import { auditoriumGathering, readingHall, studentsOnCampus } from "./images";
import { placeholderAwards } from "./placeholders";

export const aboutCopy: AboutCopy = {
  metaTitle: "About NAMI",
  metaDescription:
    "The institution behind NAMI in Kathmandu — its story and scale, mission and vision, the people who govern and teach it, and the red lotus the five values its petals carry.",
  title: "The institution behind NAMI.",
  standfirst:
    "One institute, two schools, and the five values carried in the petals of a red lotus.",
  openingImage: readingHall,
  overviewImage: studentsOnCampus,
  statsImage: readingHall,
  creedImage: auditoriumGathering,
  awards: placeholderAwards,
  sections: {
    chronology: {
      navLabel: "About NAMI",
      eyebrow: "NAMI since 2012",
      heading: "Three names, one institution.",
      standfirst: null,
      cta: null,
      emptyState: null,
    },
    emblem: {
      navLabel: "The red lotus",
      eyebrow: "The emblem",
      heading: "The red lotus.",
      standfirst: null,
      cta: null,
      emptyState: null,
    },
    creed: {
      navLabel: "Motto, mission & vision",
      eyebrow: "Motto, mission & vision",
      heading: "What NAMI stands for.",
      standfirst: null,
      cta: null,
      emptyState: null,
    },
    recognition: {
      navLabel: "Accreditation",
      eyebrow: "Recognition",
      heading: "Who awards what NAMI teaches.",
      standfirst: "Each year below is the year that recognition began.",
      cta: null,
      emptyState: null,
    },
    awards: {
      navLabel: "Awards",
      eyebrow: "Awards & honours",
      heading: "What NAMI has been awarded.",
      standfirst:
        "Distinctions the institution and its students have carried home, and the bodies that conferred them.",
      cta: null,
      emptyState:
        "NAMI is compiling its awards record — this space is reserved for it.",
    },
    stats: {
      navLabel: "NAMI in numbers",
      eyebrow: "The record",
      heading: "The institution, in numbers.",
      standfirst:
        "A decade of teaching across four academic levels, measured in the people it has graduated.",
      cta: null,
      emptyState: null,
    },
    testimonials: {
      navLabel: "Alumni",
      eyebrow: "Alumni",
      heading: "Where our graduates are now.",
      standfirst: null,
      cta: null,
      emptyState:
        "NAMI is collecting alumni stories — this space is reserved for them.",
    },
  },
};
