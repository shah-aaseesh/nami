import type { EmploymentType, SectionCopy } from "@/lib/content";

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

export const careersCopy = {
  meta: {
    title: "Careers",
    description:
      "Careers at NAMI, Kathmandu — teaching, technical and administrative vacancies across NAMI International School, NAMI College and Naaya Aayam Multi-Disciplinary Institute are posted here as they open.",
  },
  masthead: {
    eyebrow: "Careers",
    heading: "A place to teach, and to keep learning.",
    standfirst:
      "NAMI has taught in Kathmandu since 2012 across a school, a college and an institute. Everything the group is hiring for is published on this page.",
  },
  vacancies,
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
