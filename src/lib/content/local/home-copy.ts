import type { HomeCopy } from "../types";
import {
  bachelorOrientation,
  climatePanel,
  convocationCeremony,
  mustangTrip,
  scienceLaboratoryTwo,
} from "./images";

export const homeCopy: HomeCopy = {
  hero: {
    eyebrow: "Naaya Aayam Multi-Disciplinary Institute · Kathmandu",
    headline: "Transform yourself, to lead the world",
    standfirst:
      "Grade 1 to a Master's degree on one academic pathway — NEB, Cambridge and British qualifications, taught in Kathmandu.",
    primaryCta: {
      label: "Start an application",
      href: "/admissions",
      destination: "internal",
    },
    secondaryCta: {
      label: "Our story",
      href: "/about",
      destination: "internal",
    },
    images: [
      mustangTrip,
      scienceLaboratoryTwo,
      climatePanel,
      convocationCeremony,
      bachelorOrientation,
    ],
  },
  sections: {
    about: {
      navLabel: "About NAMI",
      eyebrow: "NAMI since 2012",
      heading: "A Nepali institution, built to world standards.",
      standfirst: null,
      cta: null,
      emptyState: null,
    },
    levels: {
      navLabel: "Institutions",
      eyebrow: "Institutions and training",
      heading: "Under one name, separately accredited.",
      standfirst:
        "Grade 1 to a Master's degree, and short-term vocational training alongside them. Each stands on its own accreditation.",
      cta: null,
      emptyState: null,
    },
    programmes: {
      navLabel: "Programmes",
      eyebrow: "What you can study",
      heading:
        "British degrees, Cambridge A-Levels, NEB — taught in Kathmandu.",
      standfirst: null,
      cta: null,
      emptyState: null,
    },
    affiliations: {
      navLabel: "Accreditation",
      eyebrow: "Recognition",
      heading: "Accredited where it counts.",
      standfirst:
        "Every programme carries the seal of the board or university that awards it.",
      cta: null,
      emptyState: null,
    },
    partners: {
      navLabel: "Industry partners",
      eyebrow: "Industry",
      heading: "The people our students work with before they graduate.",
      standfirst:
        "Internships, mentorship, placements and collaborative research across banking, technology, media and hospitality.",
      cta: null,
      emptyState: null,
    },
    campusLife: {
      navLabel: "College life",
      eyebrow: "Beyond the timetable",
      heading: "Where ideas get built.",
      standfirst: null,
      cta: null,
      emptyState: null,
    },
    stats: {
      navLabel: "NAMI in numbers",
      eyebrow: "The record",
      heading: "The institution, in numbers.",
      standfirst: null,
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
    updates: {
      navLabel: "Notices",
      eyebrow: "Notices",
      heading: "What's happening at NAMI.",
      standfirst: null,
      cta: {
        label: "View all notices",
        href: "/notices",
        destination: "internal",
      },
      emptyState: "No current notices.",
    },
    admission: {
      navLabel: "Admissions",
      eyebrow: "Admissions",
      heading: "Start where you are.",
      standfirst: "Every level has its own entry route. Pick yours.",
      cta: null,
      emptyState: null,
    },
  },
};
