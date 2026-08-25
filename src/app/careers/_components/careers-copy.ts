import type { CareerPlacementCopy } from "@/components/shared/career-placement";
import type { ContentImage, EmploymentType, SectionCopy } from "@/lib/content";

export type BenefitItem = {
  readonly title: string;
  readonly desc: string;
};

const vacanciesSection: SectionCopy = {
  navLabel: "Vacancies",
  eyebrow: "Open Positions",
  heading: "Opportunities across our three academic wings.",
  standfirst:
    "We invite dedicated educators, researchers, and academic professionals to join our faculty and operational teams in Kathmandu.",
  cta: null,
  emptyState:
    "There are no vacancies matching your selected filters at the moment. Explore other departments or write directly to careers@nami.edu.np.",
};

const partnersPanel: ContentImage = {
  src: "/nami/event-climate-panel.jpg",
  alt: "Faculty and guest scholars during an academic panel symposium in the NAMI conference auditorium.",
  width: 800,
  height: 533,
};

const placement: CareerPlacementCopy = {
  eyebrow: "Industry & Academic Network",
  heading: "The organisations and research bodies that collaborate with NAMI.",
  image: partnersPanel,
  label: "NAMI industry and technology partner logos",
};

export const careersCopy = {
  meta: {
    title: "Careers & Faculty Openings",
    description:
      "Explore academic, research, and administrative career opportunities across NAMI International School, NAMI College, and Naaya Aayam Multi-Disciplinary Institute in Kathmandu.",
  },
  masthead: {
    eyebrow: "CAREERS",
    heading: "Careers at NAMI.",
    standfirst:
      "Join an inspiring community of educators, scholars, and professionals dedicated to transformative teaching, research excellence, and world-class learning in Kathmandu.",
    cta: "Explore open positions",
    image: {
      src: "/nami/event-climate-panel.jpg",
      alt: "NAMI faculty and scholars during an academic symposium in the NAMI conference auditorium.",
      width: 800,
      height: 533,
    } as ContentImage,
  },
  benefits: {
    eyebrow: "Perks & Benefits",
    heading: "Comprehensive support for our faculty and staff.",
    standfirst:
      "We believe that high-quality education starts with taking care of our educators. We offer competitive remuneration and holistic staff support.",
    items: [
      {
        title: "Competitive Compensation",
        desc: "Above-market salary scales with structured annual increments, performance incentives, and statutory Provident Fund & Gratuity.",
      },
      {
        title: "Professional Development",
        desc: "Periodic teacher training workshops led directly by Cambridge International and University of Northampton faculty leads.",
      },
      {
        title: "Health & Accidental Coverage",
        desc: "Comprehensive group health insurance and accident protection plans for all permanent faculty and operational members.",
      },
      {
        title: "Tuition Concession for Children",
        desc: "Generous tuition fee waivers and scholarship support for dependent children attending NAMI International School or College.",
      },
      {
        title: "Transit & Cafeteria",
        desc: "Comfortable institutional transport routes covering Kathmandu, Lalitpur, and Bhaktapur, plus hygienic subsidized dining.",
      },
      {
        title: "Paid Sabbatical & Leave",
        desc: "Dedicated paid research leave, exam moderation leave, maternity/paternity support, and annual paid seasonal breaks.",
      },
    ] as readonly BenefitItem[],
  },
  vacancies: vacanciesSection,
  placement,
  postedLabel: "Posted",
  closesLabel: "Deadline",
  locationLabel: "Location",
  departmentLabel: "Wing / Department",
} as const;

export const employmentTypeLabel: Readonly<Record<EmploymentType, string>> = {
  "full-time": "Full Time",
  "part-time": "Part Time",
  contract: "Contract",
  internship: "Internship",
};
