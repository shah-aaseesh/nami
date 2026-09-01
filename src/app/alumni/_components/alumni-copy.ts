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
    logoSrc: "/career logos/Leapfrog.png.webp",
  },
  {
    id: "khalti",
    name: "Khalti Digital Wallet",
    sector: "Fintech & Payments",
    logoSrc: "/career logos/640px-Khalti_Digital_Wallet_Logo.png.jpg.webp",
  },
  {
    id: "esewa",
    name: "eSewa",
    sector: "Digital Payments",
    logoSrc: "/career logos/esewa.png.webp",
  },
  {
    id: "fonepay",
    name: "Fonepay",
    sector: "Payment Network",
    logoSrc: "/career logos/fonepay-1.png.webp",
  },
  {
    id: "ime-pay",
    name: "IME Pay",
    sector: "Fintech & Digital Wallet",
    logoSrc: "/career logos/IME-Pay-Logo.png.webp",
  },
  {
    id: "cloud-factory",
    name: "CloudFactory",
    sector: "Data & AI Solutions",
    logoSrc: "/career logos/cloud-factory.png.webp",
  },
  {
    id: "pathao",
    name: "Pathao Nepal",
    sector: "Consumer Tech & Mobility",
    logoSrc:
      "/career logos/Pathao-Logo_Horizontal_with_TagLine-e1706002895600.png.webp",
  },
  {
    id: "genese",
    name: "Genese Solutions",
    sector: "Cloud & DevOps",
    logoSrc: "/career logos/genese.png.webp",
  },
  {
    id: "logpoint",
    name: "Logpoint",
    sector: "Cybersecurity & SIEM",
    logoSrc: "/career logos/logpoint.png.webp",
  },
  {
    id: "treeleaf",
    name: "Treeleaf Technologies",
    sector: "AI & Embedded Systems",
    logoSrc: "/career logos/Treeleaf-final.jpeg.webp",
  },
  {
    id: "yarsa-labs",
    name: "Yarsa Labs",
    sector: "Software Engineering",
    logoSrc: "/career logos/yarsa-labs-full.png.webp",
  },
  {
    id: "programiz",
    name: "Programiz",
    sector: "EdTech & Learning Platforms",
    logoSrc: "/career logos/programiz.png.webp",
  },
  {
    id: "ekbana",
    name: "Ekbana Solutions",
    sector: "Enterprise Software",
    logoSrc: "/career logos/ekbana.png.webp",
  },
  {
    id: "swift-technology",
    name: "Swift Technology",
    sector: "Financial Technology",
    logoSrc: "/career logos/SWIFT-LOGO-WEBSITE-1.png.webp",
  },
  {
    id: "dishhome",
    name: "DishHome",
    sector: "Broadcasting & Telecom",
    logoSrc: "/career logos/DishHome_Logo.svg_.png.webp",
  },
  {
    id: "karkhana",
    name: "Karkhana",
    sector: "Education & Innovation",
    logoSrc: "/career logos/karkhana.png.webp",
  },
  {
    id: "broadway",
    name: "Broadway Infosys",
    sector: "Professional IT Training",
    logoSrc: "/career logos/broadway.png.webp",
  },
  {
    id: "clockb",
    name: "Clock B Business Technology",
    sector: "Business Strategy & Tech",
    logoSrc: "/career logos/clockb.png.webp",
  },
  {
    id: "info-developers",
    name: "InfoDevelopers",
    sector: "Banking & Core Software",
    logoSrc: "/career logos/info-developers.png.webp",
  },
  {
    id: "adex-international",
    name: "Adex International",
    sector: "Technology Consulting",
    logoSrc: "/career logos/Purple-Adex-Logo-1_1680601855.png.webp",
  },
  {
    id: "dlytica",
    name: "Dlytica",
    sector: "Data Analytics & Cloud",
    logoSrc: "/career logos/Dlytica.png.webp",
  },
  {
    id: "intuji",
    name: "Intuji",
    sector: "Digital Transformation",
    logoSrc: "/career logos/intuji.png.webp",
  },
  {
    id: "logicabeans",
    name: "LogicaBeans",
    sector: "Enterprise Solutions",
    logoSrc: "/career logos/logicabeans-logo-software-company-2.png.webp",
  },
  {
    id: "lis-nepal",
    name: "LIS Nepal",
    sector: "Analytics & Retail Solutions",
    logoSrc: "/career logos/lis-logo.png.webp",
  },
  {
    id: "techkraft",
    name: "TechKraft",
    sector: "Product Development",
    logoSrc: "/career logos/techkraft.jpg.webp",
  },
  {
    id: "spiralogics",
    name: "Spiralogics",
    sector: "Custom Healthcare Tech",
    logoSrc: "/career logos/spiralogics.png.webp",
  },
  {
    id: "eminence-ways",
    name: "Eminence Ways",
    sector: "Information Security",
    logoSrc: "/career logos/eminence-ways.png.webp",
  },
  {
    id: "diyo-ai",
    name: "Diyo AI",
    sector: "Artificial Intelligence",
    logoSrc: "/career logos/Diyo-Ai.png.webp",
  },
  {
    id: "code-himalaya",
    name: "Code Himalaya",
    sector: "Mobile & Web Apps",
    logoSrc: "/career logos/Code-Himalaya-e1709001522785.png.webp",
  },
  {
    id: "quickfox",
    name: "Quickfox Consulting",
    sector: "Management Consulting",
    logoSrc: "/career logos/37.-Quickfox-Consulting-e1715081130304.png.webp",
  },
  {
    id: "wise-yak",
    name: "Wise Yak",
    sector: "HealthTech & AI",
    logoSrc: "/career logos/Wise-yak-logo.png.webp",
  },
  {
    id: "waft-tech",
    name: "Waft Technology",
    sector: "Cloud & Web Platforms",
    logoSrc: "/career logos/waft.png.webp",
  },
  {
    id: "tuna-tech",
    name: "Tuna Technology",
    sector: "Software Solutions",
    logoSrc: "/career logos/tuna.png.webp",
  },
  {
    id: "slash-plus",
    name: "Slash Plus",
    sector: "Product Design & Tech",
    logoSrc: "/career logos/Slashlogo-e1715081500251.png.webp",
  },
  {
    id: "prixa",
    name: "Prixa",
    sector: "Digital Health Solutions",
    logoSrc: "/career logos/prixa.png.webp",
  },
  {
    id: "palm-mind",
    name: "Palm Mind",
    sector: "Software & Technology",
    logoSrc: "/career logos/palm-mind.png.webp",
  },
  {
    id: "dynamic-technosoft",
    name: "Dynamic Technosoft",
    sector: "Enterprise ERP",
    logoSrc: "/career logos/dynamic_technosoft_logo.png.webp",
  },
  {
    id: "extensodata",
    name: "ExtensoData",
    sector: "Big Data & AI",
    logoSrc: "/career logos/extensodata_logo-1.jpg.webp",
  },
  {
    id: "codroidhub",
    name: "CodroidHub",
    sector: "Mobile Development",
    logoSrc: "/career logos/codroidhub_logo.jpeg.webp",
  },
  {
    id: "datahub",
    name: "DataHub",
    sector: "Cloud & Data Centers",
    logoSrc: "/career logos/datahub.png.webp",
  },
  {
    id: "aqore",
    name: "Aqore",
    sector: "Staffing Software",
    logoSrc: "/career logos/aqore-e1707312849329.jpg.webp",
  },
  {
    id: "grit",
    name: "Grit",
    sector: "Creative & Digital Agency",
    logoSrc: "/career logos/grit1.png.webp",
  },
  {
    id: "sunya-ek",
    name: "Sunya Ek",
    sector: "Software Innovations",
    logoSrc: "/career logos/sunya-ek.png.webp",
  },
  {
    id: "inspiring-lab",
    name: "Inspiring Lab",
    sector: "Research & Development",
    logoSrc: "/career logos/inspiring-lab.jpg.webp",
  },
  {
    id: "cypher",
    name: "Cypher",
    sector: "Security & Technology",
    logoSrc: "/career logos/cypher.jpg.webp",
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
