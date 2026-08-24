import type { CareerPlacementCopy } from "@/components/shared/career-placement";
import type { ContentImage, EmploymentType, SectionCopy } from "@/lib/content";

const vacancies: SectionCopy = {
  navLabel: "Vacancies",
  eyebrow: "Vacancies",
  heading: "What the group is recruiting for.",
  standfirst:
    "Teaching, technical and administrative posts across the school, the college and the institute — listed here for as long as they stay open.",
  cta: null,
  emptyState:
    "There are no vacancies open at the moment. New openings will appear here as the group announces them.",
};

const partnersPanel: ContentImage = {
  src: "/nami/event-climate-panel.jpg",
  alt: "A panel discussion in a wood-panelled conference room, a speaker addressing a seated audience with a microphone while the other panellists listen from the front row.",
  width: 800,
  height: 533,
};

const placement: CareerPlacementCopy = {
  eyebrow: "Career Placement",
  heading: "The organisations that work with NAMI.",
  image: partnersPanel,
  label: "NAMI industry and technology partner logos",
};

export const careersCopy = {
  meta: {
    title: "Careers",
    description:
      "Careers at NAMI, Kathmandu — teaching, technical and administrative vacancies across NAMI International School, NAMI College and Naaya Aayam Multi-Disciplinary Institute are posted here as they open.",
  },
  masthead: {
    eyebrow: "Careers",
    heading: "Teach, and keep learning.",
    standfirst:
      "NAMI has taught in Kathmandu since 2012, across a school, a college and an institute. Every role the group is currently hiring for is below.",
  },
  vacancies,
  placement,
  postedLabel: "Posted",
  closesLabel: "Applications close",
  locationLabel: "Location",
} as const;

export const employmentTypeLabel: Readonly<Record<EmploymentType, string>> = {
  "full-time": "Full time",
  "part-time": "Part time",
  contract: "Contract",
  internship: "Internship",
};
