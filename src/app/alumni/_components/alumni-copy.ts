import type { CareersMastheadCopy } from "@/app/careers/_components/careers-masthead";
import type { SectionCopy } from "@/lib/content";
import { convocationCeremony } from "@/lib/content/local/images";

export type AlumniMetric = {
  readonly stat: string;
  readonly label: string;
  readonly detail: string;
};

export type AlumniEmployer = {
  readonly id: string;
  readonly name: string;
  readonly sector: string;
  readonly logoSrc?: string | null;
};

export const alumniEmployers: readonly AlumniEmployer[] = [
  {
    id: "leapfrog",
    name: "Leapfrog Technology",
    sector: "Software & AI Solutions",
  },
  {
    id: "nabil-bank",
    name: "Nabil Bank",
    sector: "Commercial Banking",
  },
  {
    id: "northampton",
    name: "University of Northampton",
    sector: "Higher Education (UK)",
    logoSrc: "/universities/northampton.png",
  },
  {
    id: "wwf-nepal",
    name: "WWF Nepal",
    sector: "Conservation & Climate",
  },
  {
    id: "cotiviti",
    name: "Cotiviti Nepal",
    sector: "Healthcare Informatics",
  },
  {
    id: "cambridge",
    name: "Cambridge International",
    sector: "Global Education",
    logoSrc: "/universities/cambridge.png",
  },
  {
    id: "f1soft",
    name: "F1Soft International",
    sector: "Fintech & Cloud Engineering",
  },
  {
    id: "standard-chartered",
    name: "Standard Chartered Bank",
    sector: "Global Banking",
  },
  {
    id: "ku",
    name: "Kathmandu University",
    sector: "Academic Research",
    logoSrc: "/universities/Kathmandu_University_Logo.webp",
  },
  {
    id: "cloudfactory",
    name: "CloudFactory",
    sector: "Data & AI Operations",
  },
  {
    id: "icimod",
    name: "ICIMOD",
    sector: "Environmental Research",
  },
  {
    id: "hertfordshire",
    name: "University of Hertfordshire",
    sector: "Higher Education (UK)",
    logoSrc: "/universities/hertfordshire.png",
  },
  {
    id: "sanima-bank",
    name: "Sanima Bank",
    sector: "Banking & Financial Services",
  },
  {
    id: "genese",
    name: "Genese Solutions",
    sector: "Cloud Architecture & DevOps",
  },
  {
    id: "bajra",
    name: "Bajra Technologies",
    sector: "Enterprise Software",
  },
  {
    id: "unccd",
    name: "United Nations (UNCCD)",
    sector: "Global Sustainable Dev",
  },
  {
    id: "pathao",
    name: "Pathao Nepal",
    sector: "Consumer Tech & Mobility",
  },
];

export const alumniCopy = {
  meta: {
    title: "Alumni Network",
    description:
      "Explore the achievements of over 8,000 NAMI graduates leading innovation across computing, environmental science, business, and research worldwide.",
  },
  masthead: {
    eyebrow: "ALUMNI NETWORK",
    heading: "8,000+ Alumni",
    standfirst:
      "From Kathmandu to global institutions across 15+ countries, NAMI graduates are leading innovation in computing, sustainable development, business, and research.",
    cta: "Hear from our alumni",
    image: convocationCeremony,
  } satisfies CareersMastheadCopy,
  metrics: {
    eyebrow: "COMMUNITY & SCALE",
    heading: "A Legacy of Excellence Across Fourteen Years",
    standfirst:
      "Our alumni form a connected global community of researchers, technology leaders, entrepreneurs, and scholars.",
    items: [
      {
        stat: "8,000+",
        label: "Total Alumni",
        detail: "Graduates across all academic programmes since 2012.",
      },
      {
        stat: "5,000+",
        label: "NEB 10+2 Alumni",
        detail:
          "Science and Management graduates advancing into top institutions.",
      },
      {
        stat: "2,500+",
        label: "UG & PG Degree Holders",
        detail: "Northampton UK accredited Bachelor and Master degree holders.",
      },
      {
        stat: "500+",
        label: "Cambridge A-Level Scholars",
        detail:
          "Studying in world-leading universities across the UK, US, and Australia.",
      },
    ] as const satisfies readonly AlumniMetric[],
  },
  employers: {
    navLabel: "Employers",
    eyebrow: "CAREER DESTINATIONS",
    heading: "Where our alumni are working.",
    standfirst:
      "From global technology companies and leading commercial banks to international conservation bodies and research institutes, NAMI graduates are making an impact worldwide.",
    cta: null,
    emptyState: null,
  } satisfies SectionCopy,
  testimonials: {
    navLabel: "Alumni Stories",
    eyebrow: "ALUMNI STORIES",
    heading: "In their own words.",
    standfirst:
      "Hear directly from NAMI graduates about their time at the college and where it took them.",
    cta: null,
    emptyState: null,
  } satisfies SectionCopy,
  connect: {
    eyebrow: "STAY IN TOUCH",
    heading: "Are You a NAMI Graduate?",
    standfirst:
      "Reconnect with your batch, update your career milestones, submit an alumni spotlight, or join our student mentorship circle.",
    email: "alumni@nami.edu.np",
  },
} as const;
