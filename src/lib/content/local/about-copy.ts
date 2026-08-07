import type { AboutCopy } from "../types";
import { auditoriumGathering, readingHall, studentsOnCampus } from "./images";

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
      navLabel: "Mission & vision",
      eyebrow: "What the institution is for",
      heading: "What the institution is for.",
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
    stats: {
      navLabel: "NAMI in numbers",
      eyebrow: "The record",
      heading: "The institution, in numbers.",
      standfirst:
        "A decade of teaching across four academic levels, measured in the people it has graduated.",
      cta: null,
      emptyState: null,
    },
    leadership: {
      navLabel: "Leadership",
      eyebrow: "The people behind NAMI",
      heading: "The people behind NAMI.",
      standfirst:
        "A board, a management team and academic heads who keep the institution accountable to its motto.",
      cta: null,
      emptyState: null,
    },
    testimonials: {
      navLabel: "Alumni",
      eyebrow: "Alumni",
      heading: "Where NAMIANS end up.",
      standfirst: null,
      cta: null,
      emptyState:
        "NAMI is collecting alumni stories — this space is reserved for them.",
    },
  },
};
