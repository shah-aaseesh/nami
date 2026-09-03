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
    eyebrow: "Transform yourself, to lead the world",
    headline: "Naaya Aayam Multi-Disciplinary Institute",
    standfirst:
      "At NAMI, we provide a comprehensive academic pathway from Grade 1 to Master’s degree, empowering learners through world-class education, holistic development and leadership to transform themselves and lead the world.",
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
      heading:
        "A Nepali entity committed to delivering education of global standards.",
      standfirst: null,
      cta: null,
      emptyState: null,
    },
    levels: {
      navLabel: "Institutions",
      eyebrow: "NAMI Entities",
      heading: "One Name, Independently Accredited Educational Institutions.",
      standfirst: null,
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
      eyebrow: null,
      heading: "Accredited for Excellence.",
      standfirst: null,
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
      eyebrow: "Our Milestones",
      heading: "NAMI, by the Numbers.",
      standfirst:
        "Over a decade of academic excellence, shaped across four learning tiers and a thriving community of thousands.",
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
      heading: "",
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
