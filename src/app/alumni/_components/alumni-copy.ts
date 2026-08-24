import type { CareerPlacementCopy } from "@/components/shared/career-placement";
import { convocationCeremony } from "@/lib/content/local/images";
import type { ContentImage } from "@/lib/content/types";

export type AlumniProfile = {
  readonly id: string;
  readonly name: string;
  readonly role: string;
  readonly organization: string;
  readonly location: string;
  readonly degree: string;
  readonly institution: "institute" | "college" | "school";
  readonly category: "undergraduate" | "a-levels" | "school-plus-two";
  readonly quote: string;
  readonly keyHighlights: readonly string[];
  readonly portrait?: ContentImage;
};

export type AlumniMetric = {
  readonly stat: string;
  readonly label: string;
  readonly detail: string;
};

export type AlumniInitiative = {
  readonly title: string;
  readonly description: string;
  readonly tag: string;
};

const alumniPlacementImage: ContentImage = {
  src: "/nami/event-elite-2023.jpg",
  alt: "NAMI students and graduates celebrating achievements at the ELITE award symposium.",
  width: 999,
  height: 843,
};

export const alumniCopy = {
  meta: {
    title: "Alumni Network",
    description:
      "Explore the achievements of over 8,000 NAMI graduates leading innovation across computing, environmental science, business, and research worldwide.",
  },
  masthead: {
    eyebrow: "GLOBAL ALUMNI NETWORK",
    heading: "8,000+ Alumni. Infinite Possibilities.",
    standfirst:
      "From Kathmandu to global institutions across 15+ countries, NAMI graduates are leading innovation in computing, sustainable development, business, and research.",
    cta: "Explore Alumni Stories",
    secondaryCta: "Join the Network",
    image: convocationCeremony,
  },
  metrics: {
    eyebrow: "COMMUNITY & SCALE",
    heading: "A Legacy of Excellence Across Fourteen Years",
    standfirst:
      "Our alumni form a connected global community of researchers, technology leaders, entrepreneurs, and scholars making a measurable impact across industries.",
    items: [
      {
        stat: "8,000+",
        label: "Total Alumni Network",
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
  stories: {
    eyebrow: "GRADUATE PROFILES",
    heading: "Stories of Purpose, Leadership & Impact",
    standfirst:
      "Discover how our graduates translate rigorous British and national curricula into transformative careers worldwide.",
  },
  initiatives: {
    eyebrow: "ALUMNI ENGAGEMENT",
    heading: "Giving Back to the Next Generation",
    standfirst:
      "The NAMI Alumni Association provides lifelong community connections, student mentorship programs, seed grants, and executive networking.",
    items: [
      {
        title: "Industry Mentorship & Portfolio Reviews",
        description:
          "Alumni software engineers, analysts, and founders guide graduating cohorts through technical interviews, architecture reviews, and career planning.",
        tag: "Mentorship",
      },
      {
        title: "Startup Incubation & SDA Seed Support",
        description:
          "Collaborating with Naaya Aayam Avinaya Prerana Kendra (SDA) to mentor student ventures, review pitches, and provide initial angel networks.",
        tag: "Entrepreneurship",
      },
      {
        title: "Guest Masterclasses & Global Panels",
        description:
          "Returning alumni host specialised masterclasses in AI engineering, environmental governance, climate policy, and capital markets.",
        tag: "Academic Exchange",
      },
      {
        title: "Annual Convocation & Alumni Homecoming",
        description:
          "An annual winter celebration bringing together cohorts from 2012 to present for keynote sessions, awards, and collaborative alumni partnerships.",
        tag: "Community",
      },
    ] as const satisfies readonly AlumniInitiative[],
  },
  placement: {
    eyebrow: "GLOBAL PLACEMENT & PARTNERS",
    heading: "Where Our Alumni Lead & Innovate",
    image: alumniPlacementImage,
    label: "NAMI alumni employer and partner logos",
  } satisfies CareerPlacementCopy,
  connect: {
    eyebrow: "STAY IN TOUCH",
    heading: "Are You a NAMI Graduate?",
    standfirst:
      "Reconnect with your batch, update your career milestones, submit an alumni spotlight, or join our student mentorship circle.",
    email: "alumni@nami.edu.np",
  },
} as const;

export const ALUMNI_PROFILES: readonly AlumniProfile[] = [
  {
    id: "devashree-niroula",
    name: "Devashree Niroula",
    role: "Research & Outreach Specialist",
    organization: "UNCCD (United Nations)",
    location: "Bonn, Germany",
    degree: "BSc (Hons) Environmental Science",
    institution: "institute",
    category: "undergraduate",
    quote:
      "The fieldwork at NAMI turned an interest in environmental science into a career. I now work on research and outreach for the UNCCD in Bonn, Germany.",
    keyHighlights: [
      "Northampton UK Environmental Science graduate",
      "Lead author on global land restoration field reports",
      "Regular guest speaker at NAMI climate policy symposiums",
    ],
  },
  {
    id: "ronak-bastola",
    name: "Ronak Bastola",
    role: "Senior Software Engineer",
    organization: "Fintech & Cloud Systems",
    location: "Kathmandu, Nepal",
    degree: "BSc (Hons) Computing (Software Engineering)",
    institution: "institute",
    category: "undergraduate",
    quote:
      "The Northampton computing curriculum is hands-on from the first semester. My mentor review sessions were the reason I passed my first technical interview.",
    keyHighlights: [
      "Specialised in distributed cloud systems and real-time APIs",
      "Active technical mentor for NAMI hackathons and capstone projects",
      "Conducted 20+ mock technical interviews for final-year cohorts",
    ],
  },
  {
    id: "pragati-rai",
    name: "Pragati Rai",
    role: "Policy & Academic Researcher",
    organization: "International Research Network",
    location: "London, UK",
    degree: "Cambridge GCE A-Level",
    institution: "college",
    category: "a-levels",
    quote:
      "The A-Level load pushed me harder than I expected, and no weak essay ever got past my teachers. I left knowing how to argue a point properly.",
    keyHighlights: [
      "High distinction in Cambridge A-Level Humanities",
      "Completed postgraduate studies in international public policy",
      "Published commentator on South Asian educational reforms",
    ],
  },
  {
    id: "yamato-sherpa",
    name: "Yamato Sherpa",
    role: "Founder & Managing Director",
    organization: "Revmandu",
    location: "Kathmandu, Nepal",
    degree: "Bachelor of Business Administration (BBA)",
    institution: "institute",
    category: "undergraduate",
    quote:
      "The BBA modules are demanding and the lecturers have actually worked in what they teach. I got that standard of teaching without leaving Kathmandu.",
    keyHighlights: [
      "Founded sustainable urban logistics enterprise Revmandu",
      "Incubated in partnership with NAMI SDA Innovation Centre",
      "Employs 40+ professionals across supply chain and digital operations",
    ],
  },
  {
    id: "ananda-roy",
    name: "Ananda Roy",
    role: "Corporate Brand Strategist",
    organization: "Global Advisory Group",
    location: "Kathmandu, Nepal",
    degree: "Bachelor of Business Administration (BBA)",
    institution: "institute",
    category: "undergraduate",
    quote:
      "The BBA lecturers taught the theory and then made us defend it in front of the class. That habit is what I fall back on in every meeting I sit in now.",
    keyHighlights: [
      "Northampton Business Administration graduate",
      "Advises regional enterprises on digital transformation and market entry",
      "Mentor in the NAMI Executive Speaker Series",
    ],
  },
  {
    id: "nirdishta-amatya",
    name: "Nirdishta Amatya",
    role: "Ecological Field Researcher",
    organization: "Conservation Initiatives Nepal",
    location: "Kathmandu, Nepal",
    degree: "BSc (Hons) Environmental Science",
    institution: "institute",
    category: "undergraduate",
    quote:
      "Environmental Science here is taught in the field, not only the lecture hall. The British curriculum gave me an international degree without leaving Nepal.",
    keyHighlights: [
      "Field investigator on Himalayan biodiversity conservation projects",
      "Pioneered campus water and biodiversity audits at Gokarneshwor",
      "Keynote contributor to World Environment Day symposiums",
    ],
  },
  {
    id: "pankaj-badu",
    name: "Pankaj Badu",
    role: "Cloud Solutions Architect",
    organization: "Enterprise Cloud Technologies",
    location: "Sydney, Australia",
    degree: "BSc (Hons) Computing",
    institution: "institute",
    category: "undergraduate",
    quote:
      "An internationally recognised computing degree at a cost my family could manage, taught by faculty who knew my name inside the first fortnight.",
    keyHighlights: [
      "Architects multi-region Kubernetes and AWS cloud infrastructure",
      "Certified AWS Solutions Architect Professional",
      "Provides remote code reviews and tech talks for NAMI computing students",
    ],
  },
  {
    id: "aarav-shrestha",
    name: "Aarav Shrestha",
    role: "Data & Systems Engineer",
    organization: "Tech Innovation Labs",
    location: "Kathmandu, Nepal",
    degree: "Cambridge GCE A-Level (Science)",
    institution: "college",
    category: "a-levels",
    quote:
      "Small classes meant every question got a real answer. My physics teacher stayed back most Fridays until A-Level mechanics finally clicked for me.",
    keyHighlights: [
      "Cambridge A-Level Mathematics and Physics top achiever",
      "Graduated in Computer Engineering with distinction",
      "Volunteers as STEM tutor for NAMI secondary school pupils",
    ],
  },
  {
    id: "anisha-gurung",
    name: "Anisha Gurung",
    role: "Operations & Strategy Lead",
    organization: "Regional Ventures",
    location: "Kathmandu, Nepal",
    degree: "Cambridge GCE A-Level (Science)",
    institution: "college",
    category: "a-levels",
    quote:
      "My first university year felt familiar because A-Levels here had already taught me to plan a week, ask sharper questions, and show up on the dull days.",
    keyHighlights: [
      "Cambridge A-Level graduate",
      "Leads operational excellence and strategic partner relations",
      "Key organizer of the NAMI Annual Alumni Gala",
    ],
  },
];
