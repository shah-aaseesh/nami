import { entryOf } from "../identifiers";
import type { AboutCopy, Award } from "../types";
import { auditoriumGathering, readingHall, studentsOnCampus } from "./images";

const awards: readonly Award[] = [
  {
    ...entryOf("award-excellence-in-teaching"),
    title: "Excellence in Teaching and Learning",
    awardingBody: "National education awards panel",
    year: 2024,
    citation: null,
  },
  {
    ...entryOf("award-best-emerging-institution"),
    title: "Best Emerging Institution",
    awardingBody: "Regional schools association",
    year: 2022,
    citation: null,
  },
  {
    ...entryOf("award-outstanding-student-achievement"),
    title: "Outstanding Student Achievement",
    awardingBody: "Inter-college academic council",
    year: 2020,
    citation: null,
  },
  {
    ...entryOf("award-campus-sustainability"),
    title: "Campus Sustainability Commendation",
    awardingBody: "City sustainability forum",
    year: 2018,
    citation: null,
  },
];

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
  awards,
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
      eyebrow: "Mission & vision",
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
      navLabel: "Testimonials",
      eyebrow: "Student voices",
      heading: "What our students say.",
      standfirst: null,
      cta: null,
      emptyState:
        "Student stories are being collected — this space is reserved for them.",
    },
  },
};
