import type { AboutCopy } from "../types";
import { auditoriumGathering, readingHall } from "./images";

export const aboutCopy: AboutCopy = {
  metaTitle: "About",
  metaDescription:
    "The institution behind NAMI College in Kathmandu — its overview, mission and vision, the red lotus emblem and the five values its petals carry, and who awards what it teaches.",
  title: "The institution behind NAMI College.",
  standfirst:
    "One institute, two schools, and the five values carried in the petals of a red lotus.",
  openingImage: readingHall,
  creedImage: auditoriumGathering,
  sections: {
    chronology: {
      heading: "Three names, one institution.",
      standfirst: null,
    },
    emblem: {
      heading: "The red lotus.",
      standfirst: null,
    },
    creed: {
      heading: "What the institution is for.",
      standfirst: null,
    },
    recognition: {
      heading: "Who awards what NAMI teaches.",
      standfirst: "Each year below is the year that recognition began.",
    },
  },
};
