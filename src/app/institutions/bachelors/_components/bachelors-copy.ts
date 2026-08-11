import type { InstitutionGalleryCopy } from "@/components/shared/institution-gallery";
import type { InstitutionNoticesCopy } from "@/components/shared/institution-notices";
import type {
  ContentImage,
  ContentLink,
  PartnerKind,
  SectionCopy,
} from "@/lib/content";
import { richText } from "@/lib/content";
import type { BachelorsAwardingCopy } from "./bachelors-awarding";
import type { BachelorsPartnersCopy } from "./bachelors-partners";

export type ProgrammeModule = {
  readonly code: string;
  readonly title: string;
};

export type ProgrammeStage = {
  readonly key: string;
  readonly label: string;
  readonly note: string | null;
  readonly modules: readonly ProgrammeModule[];
};

export type BachelorsProgramme = {
  readonly key: string;
  readonly qualification: string;
  readonly title: string;
  readonly image: ContentImage;
  readonly awardingBody: string;
  readonly startingFrom: string | null;
  readonly format: string | null;
  readonly summary: readonly string[];
  readonly entryLabel: string;
  readonly entry: readonly string[];
  readonly careersLabel: string;
  readonly careers: string | null;
  readonly pendingNote: string | null;
  readonly stages: readonly ProgrammeStage[];
};

export type BachelorsProgrammesCopy = {
  readonly eyebrow: string;
  readonly heading: string;
  readonly standfirst: string;
  readonly awardedLabel: string;
  readonly startingLabel: string;
  readonly pendingLabel: string;
  readonly items: readonly BachelorsProgramme[];
};

export type BachelorsMastheadCopy = {
  readonly heroLabel: string;
  readonly slides: readonly ContentImage[];
  readonly logo: ContentImage;
  readonly motto: string;
  readonly heading: string;
  readonly standfirst: string;
  readonly cta: ContentLink;
};

// Stand-in portrait until the institute supplies its own — Asmit directive 2026-08-11.
const academicHeadPortrait: ContentImage = {
  src: "/nami/principal-philip-badikar-hilario.jpg",
  alt: "Stand-in portrait: an educator in a checked jacket holding a folder.",
  width: 233,
  height: 430,
};

const readingRoom: ContentImage = {
  src: "/nami/level-bachelor-master.jpg",
  alt: "NAMI's library, metal shelving stacked with books and a newspaper rack standing behind the library help desk.",
  width: 1200,
  height: 900,
};

const scienceLaboratory: ContentImage = {
  src: "/nami/campus-science-lab.jpg",
  alt: "A NAMI chemistry laboratory, reagent bottles ranked on shelves above long benches fitted with sinks, burettes and retort stands.",
  width: 1280,
  height: 853,
};

const readingHall: ContentImage = {
  src: "/nami/campus-library.jpg",
  alt: "A NAMI reading hall, long study desks ranked beneath ceiling fans with a projection screen at the far end and a silence notice on the wall.",
  width: 1280,
  height: 853,
};

const plantationProgramme: ContentImage = {
  src: "/nami/event-plantation-2022.jpg",
  alt: "Staff and volunteers crouched on the grass settling a sapling into the ground, one of them wearing a Nepal Prakriti Pathshala shirt from Wildlife Conservation Nepal.",
  width: 800,
  height: 753,
};

const auditoriumGathering: ContentImage = {
  src: "/nami/campus-auditorium.jpg",
  alt: "Students and staff seated on sofas and stacking chairs in the NAMI auditorium, maroon acoustic panelling on the wall behind them.",
  width: 999,
  height: 666,
};

const heroSlides: readonly ContentImage[] = [
  readingRoom,
  scienceLaboratory,
  readingHall,
];

const masthead: BachelorsMastheadCopy = {
  heroLabel: "NAMI campus at New Baneshwor",
  slides: heroSlides,
  logo: {
    src: "/logo.png",
    alt: "NAMI logo",
    width: 250,
    height: 96,
  },
  motto: "Transform yourself, to lead the world",
  heading: "NAAYA AAYAM MULTI-DISCIPLINARY INSTITUTE",
  standfirst:
    "Nepal’s premium educational institution in partnership with the University of Northampton, UK and Kathmandu University.",
  cta: {
    label: "Start an application",
    href: "/admissions",
    destination: "internal",
  },
};

const awarding: BachelorsAwardingCopy = {
  eyebrow: "Awarding universities",
  heading: "The universities awarding the degrees taught on this campus.",
  standfirst:
    "Since 2012, every degree taught at New Baneshwor has been awarded by the University of Northampton. From August 2026, Kathmandu University joins it, awarding the BSc in Environmental Studies.",
  sinceLabel: "Since",
  offerNote:
    "All decisions regarding an offer letter for a University of Northampton programme are made by the University of Northampton, UK.",
};

const undergraduateEntry: readonly string[] = [
  "Minimum of 55% (2.2 GPA) or equivalent in +2 (NEB).",
  "Minimum of 60% in CBSE.",
  "280 UCAS tariff points in A Levels.",
  "Minimum of 60 marks in English at +2 or CBSE, or an IELTS score of 6 with no band less than 5.5.",
  "Students awaiting results, and students who have completed a foundation or bridge course (Level 3) from a recognised institution, are also encouraged to apply.",
];

const northamptonAward = "The University of Northampton, UK";

const programmes: BachelorsProgrammesCopy = {
  eyebrow: "Academics",
  heading: "Every degree taught here, and who awards it.",
  standfirst:
    "Every degree running on this campus today is awarded by the University of Northampton, UK. Environmental Studies is awarded by Kathmandu University and begins in August 2026.",
  awardedLabel: "Awarded by",
  startingLabel: "Begins",
  pendingLabel: "Programme detail",
  items: [
    {
      key: "computer-science",
      qualification: "BSc (Hons)",
      title: "Computer Science",
      image: readingRoom,
      awardingBody: northamptonAward,
      startingFrom: null,
      format: "Three-year degree",
      summary: [
        "A three-year degree available in three majors — Computing, Software Engineering and Computer Networks Engineering — giving an insight into the computing industry and the reach computer technology has on the world.",
        "It covers software engineering methods, database implementation and system design with multiple users and platforms in mind, alongside the theory and practical implications of knowledge-based systems, neural networks and evolutionary algorithms in artificial intelligence.",
      ],
      entryLabel: "Eligibility",
      entry: undergraduateEntry,
      careersLabel: "Career prospect",
      careers:
        "Software industries, internet service providers, banks, airlines, hydropower, automobile industries and educational institutions — and research, inside an organisation or independently as a consultant.",
      pendingNote: null,
      stages: [
        {
          key: "cs-year-1",
          label: "Year I",
          note: "All computing students share the same modules in the first year.",
          modules: [
            { code: "CSY1062", title: "Computer Communications" },
            { code: "CSY1061", title: "Computer Systems" },
            { code: "CSY1063", title: "Web Development" },
            { code: "CSY1064", title: "Software Engineering Fundamentals" },
            { code: "CSY1020", title: "Problem Solving & Programming" },
            { code: "CSY1060", title: "Mathematics for Computer Science" },
          ],
        },
        {
          key: "cs-year-2",
          label: "Year II",
          note: "Students must take all compulsory modules.",
          modules: [
            { code: "CSY2092", title: "Operating Systems" },
            { code: "CSY2087", title: "Data Structures and Algorithms" },
            { code: "CSY2088", title: "Group Project" },
            { code: "CSY2089", title: "Web Programming" },
            { code: "CSY2080", title: "Relational Databases" },
            {
              code: "CSY2094",
              title: "Software Systems Design & Development",
            },
          ],
        },
        {
          key: "cs-year-3",
          label: "Year III",
          note: "In years two and three students choose a specialism from a range of topics.",
          modules: [
            { code: "CSY4022", title: "Computing Dissertation" },
            { code: "CSY3058", title: "Media Technology" },
            {
              code: "CSY3062",
              title: "Cyber Security and Applied Cryptography",
            },
            { code: "CSY3059", title: "Modern Databases" },
            { code: "CSY3060", title: "Advanced AI and Applications" },
          ],
        },
      ],
    },
    {
      key: "environmental-science",
      qualification: "BSc (Hons)",
      title: "Environmental Science",
      image: scienceLaboratory,
      awardingBody: northamptonAward,
      startingFrom: null,
      format: "Three-year degree",
      summary: [
        "A three-year degree combining ecology and physical science to evaluate environmental issues and propose appropriate solutions, and to recognise their relevance to society at national and global levels.",
        "Students examine research design and methodology across field and laboratory work — data collection, qualitative analysis and statistical tools — with field and lab activities running through the course so scientific concepts are developed in practice.",
      ],
      entryLabel: "Eligibility",
      entry: undergraduateEntry,
      careersLabel: "Career prospect",
      careers:
        "Environmental monitoring, conservation and natural resource management, climate change and CDM projects, IEE, EIA and environmental consultancy, and international agencies including UNEP, UNDP, FAO, WWF, WHO, UNICEF, the World Bank and ADB.",
      pendingNote: null,
      stages: [
        {
          key: "env-year-1",
          label: "Year I",
          note: "Students must take all compulsory modules for their pathway.",
          modules: [
            { code: "ENV1002", title: "Introduction to Ecology" },
            { code: "ENV1110", title: "Global Environmental Issues" },
            { code: "GEO1108", title: "Geohazards" },
            { code: "ENV1128", title: "Lab and Field Skills" },
            { code: "ENV1126", title: "Life on Earth" },
            { code: "ENV1127", title: "Environmental Pollution" },
          ],
        },
        {
          key: "env-year-2",
          label: "Year II",
          note: null,
          modules: [
            { code: "GEO2038", title: "Research Methods" },
            {
              code: "ENV2125",
              title: "International Environmental Policy & Control",
            },
            {
              code: "ENV2140",
              title: "Terrestrial and Freshwater Ecosystems",
            },
            { code: "ENV2103", title: "Biogeography" },
            { code: "ENV2124", title: "Field Work Module" },
            { code: "ENV2142", title: "Impacts of Pollution" },
          ],
        },
        {
          key: "env-year-3",
          label: "Year III",
          note: "Students must take all compulsory modules.",
          modules: [
            { code: "ENV4101", title: "Research Project and Dissertation" },
            {
              code: "ENV3013",
              title: "Sustainable Development: Land Use and Planning",
            },
            { code: "ENV3143", title: "Sustainable Resources Management" },
            { code: "ENV3144", title: "Pollution Monitoring and Control" },
            { code: "GEO3124", title: "Water Resource Management" },
          ],
        },
      ],
    },
    {
      key: "environmental-studies",
      qualification: "BSc",
      title: "Environmental Studies",
      image: plantationProgramme,
      awardingBody: "Kathmandu University",
      startingFrom: "August 2026",
      format: null,
      summary: [
        "A Bachelor’s programme in Environmental Studies affiliated with Kathmandu University, combining environmental science, sustainability, policy development and practical field-based learning.",
        "It is a separate degree from the BSc (Hons) Environmental Science taught here, and it is awarded by Kathmandu University rather than the University of Northampton.",
      ],
      entryLabel: "Eligibility",
      entry: [],
      careersLabel: "Career prospect",
      careers: null,
      pendingNote:
        "The first intake is August 2026. Modules, entry requirements and career detail have not been published yet — the admissions team can tell you what is confirmed so far.",
      stages: [],
    },
    {
      key: "business-administration",
      qualification: "Bachelor",
      title: "Business Administration",
      image: auditoriumGathering,
      awardingBody: northamptonAward,
      startingFrom: null,
      format: "Three-year degree",
      summary: [
        "A three-year degree for students building a career in the financial sector, the service sector, hospitality, or their own small business — developing interpersonal, team-building, critical-thinking, leadership and entrepreneurial skills alongside the management concepts.",
        "The learning pedagogy runs through advanced classroom lectures, management activities, group work, discussions, debates and case studies. Students need a minimum of 80 percent attendance to qualify for the examinations.",
      ],
      entryLabel: "Standard entry requirements",
      entry: undergraduateEntry,
      careersLabel: "Career prospect",
      careers:
        "Marketing, business and finance, for candidates with excellent communication and interpersonal skills who want the management and business aspects of any industry.",
      pendingNote: null,
      stages: [
        {
          key: "bba-stage-1",
          label: "Stage I",
          note: "Students must take all modules.",
          modules: [
            { code: "MKT1001", title: "Foundation of Marketing" },
            {
              code: "ACC1003",
              title: "Introductory Finance and Accounting",
            },
            { code: "BUS1001", title: "Business Environment" },
            { code: "BUS1009", title: "Business in Society" },
            { code: "MKT1003", title: "Enterprise and Opportunity" },
            { code: "HRM1004", title: "Managing People" },
          ],
        },
        {
          key: "bba-stage-2",
          label: "Stage II",
          note: null,
          modules: [
            { code: "BUS2002", title: "Strategic Business Analysis" },
            { code: "HRM2003", title: "Managing Human Resources" },
            { code: "BSO2003", title: "Operations Management 1" },
            {
              code: "ACC2004",
              title: "Managing Finance & Financial Decisions",
            },
            {
              code: "BSO2016",
              title: "Project Management: Planning and Control",
            },
            { code: "MKT2006", title: "Brand Management" },
          ],
        },
        {
          key: "bba-stage-3",
          label: "Stage III",
          note: "Students take the compulsory modules plus one of BUS4001, HRM4001 or ECN4001.",
          modules: [
            {
              code: "MKT3026",
              title: "Opportunity, Innovation and Entrepreneurship",
            },
            { code: "BUS3002", title: "Debates in Strategic Management" },
            { code: "BUS3001", title: "Social Responsibility of Business" },
            { code: "BUS3003", title: "Global Business Development" },
            { code: "BUS4001", title: "Business Dissertation" },
          ],
        },
      ],
    },
    {
      key: "msc-computing",
      qualification: "MSc",
      title: "Computing",
      image: readingHall,
      awardingBody: northamptonAward,
      startingFrom: null,
      format: "Postgraduate degree",
      summary: [
        "A postgraduate programme built on current global practice in computing, addressing the demand for exceptional leaders in a digital economy the course puts at a global value of $11.5 trillion.",
        "It deepens research and analytical skills and lets students explore individual interests through a thesis, with an emphasis on technical proficiency and business acumen together.",
      ],
      entryLabel: "Eligibility",
      entry: [
        "An IT or computer-related Bachelor’s degree from a reputed institution.",
        "A Bachelor of Honours degree with 2:2 or above, or equivalent, in a computing-related subject area.",
      ],
      careersLabel: "Career prospect",
      careers:
        "Software and IT, cyber security, communication, teaching, consulting, programming, research and digital marketing.",
      pendingNote: null,
      stages: [
        {
          key: "msc-modules",
          label: "Modules",
          note: null,
          modules: [
            { code: "CSYM017", title: "Databases" },
            { code: "CSYM025", title: "Visual Object Software" },
            { code: "CSYM028", title: "Modern Computer Architecture" },
            { code: "CSYM015", title: "Intelligent Systems" },
            { code: "CSYM019", title: "Internet Programming" },
            {
              code: "CSYM030",
              title: "Mobile Device Software Development",
            },
            { code: "CSYM023", title: "Dissertation" },
          ],
        },
      ],
    },
  ],
};

const partners: BachelorsPartnersCopy = {
  eyebrow: "Industry network",
  heading: "The organisations our students meet before they graduate.",
  label: "NAMI industry and technology partners",
};

const alumni: SectionCopy = {
  navLabel: "Voices",
  eyebrow: "Students and alumni",
  heading: "Six voices, on what the degree is actually worth.",
  standfirst:
    "In their own words — on the British system of learning, the workload, and where the degree has carried them.",
  cta: null,
  emptyState: "Student and alumni stories will appear here as they are shared.",
};

const gallery: InstitutionGalleryCopy = {
  eyebrow: "The campus",
  heading: "Degree years, photographed.",
  standfirst:
    "Convocations, panels, field days and the ordinary weeks between them — the institute’s own record of what a degree here looks like.",
  ctaLabel: "All institute photographs",
};

const notices: InstitutionNoticesCopy = {
  eyebrow: "Notice board",
  heading: "What the institute is announcing.",
  standfirst:
    "Registration windows, submission deadlines and standing notices for undergraduate and postgraduate students.",
  ctaLabel: "All institute notices",
  emptyState:
    "There is no institute notice standing right now. Everything the institute has published stays on the notice board.",
};

const partnerTags: Readonly<Record<string, string>> = {
  "aws-academy": "Cloud computing",
  "startup-discovery-asia": "Startup ecosystem",
  "sanima-bank": "Banking",
  "sunrise-bank": "Banking",
  "nic-asia-capital": "Capital markets",
  "cloud-factory": "Cloud and technology",
  "bajra-technologies": "Technology",
  "buddha-tech": "Technology",
  "palm-mind-technology": "Technology",
  "clock-business-technology": "Business technology",
  "ap1-television": "Media",
  "annapurna-media-network": "Media",
  "machan-country-villa": "Hospitality",
  "nyef-lalitpur": "Entrepreneurship",
  "intern-nepal-recruit-nepal": "Recruitment",
  sabco: "Business services",
};

const partnerKindTags: Readonly<Record<PartnerKind, string>> = {
  industry: "Industry partner",
  technology: "Technology partner",
  ecosystem: "Ecosystem partner",
};

export const bachelorsCopy = {
  meta: {
    title: "Naaya Aayam Multi-Disciplinary Institute",
    description:
      "Naaya Aayam Multi-Disciplinary Institute teaches partner-university degrees at New Baneshwor, Kathmandu — BSc (Hons) Computer Science, BSc (Hons) Environmental Science, Bachelor in Business Administration and MSc Computing awarded by the University of Northampton, UK, and BSc Environmental Studies awarded by Kathmandu University from August 2026.",
  },
  levelSlug: "bachelors",
  masthead,
  awarding,
  academicHead: {
    slug: "leader-nischal-khadka",
    eyebrow: "From the Academic Head",
    heading: "A welcome to the Undergraduate and Graduate programmes at NAMI.",
    portrait: academicHeadPortrait,
    message: richText(
      "I extend a warm welcome to the Undergraduate and Graduate Program at NAMI, in partnership with the University of Northampton (UON), United Kingdom.",
      "As a valued student, you become part of a community known for its exceptional talents, energy, creativity, focus, and hard work.",
      "I encourage you to seize the outstanding opportunities in both academic and non-academic realms by actively engaging in classroom and extracurricular activities.",
      "These experiences aim to nurture your creativity, refine communication etiquette, and enhance team-building and leadership skills.",
    ),
  },
  programmes,
  partners,
  alumni,
  gallery,
  notices,
  partnerTags,
  partnerKindTags,
} as const;
