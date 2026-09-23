import type { CareerPlacementCopy } from "@/components/shared/career-placement";
import type { InstitutionAwardingCopy } from "@/components/shared/institution-awarding";
import type { InstitutionGalleryCopy } from "@/components/shared/institution-gallery";
import type { InstitutionNoticesCopy } from "@/components/shared/institution-notices";
import type { ContentImage, ContentLink, SectionCopy } from "@/lib/content";
import { richText } from "@/lib/content";

export type CourseKey =
  | "computer-science"
  | "environmental-science"
  | "environmental-studies"
  | "business-administration"
  | "msc-computing";

export type ModuleStatus = "Compulsory" | "Optional" | "Designated";

export type ProgrammeModule = {
  readonly code: string;
  readonly title: string;
  readonly credits: number;
  readonly status: ModuleStatus | null;
  readonly prerequisites: string | null;
};

export type ProgrammeStage = {
  readonly key: string;
  readonly label: string;
  readonly note: string | null;
  readonly modules: readonly ProgrammeModule[];
};

export type ProgrammeRequirement = {
  readonly label: string;
  readonly requirement: string;
};

export type BachelorsProgramme = {
  readonly key: CourseKey;
  readonly qualification: string;
  readonly title: string;
  readonly fullTitle: string;
  readonly metaDescription: string;
  readonly image: ContentImage;
  readonly awardingBody: string;
  readonly startingFrom: string | null;
  readonly format: string | null;
  readonly summary: readonly string[];
  readonly shortDescription?: string;
  readonly entryLabel: string;
  readonly entry: readonly ProgrammeRequirement[];
  readonly entryNotes: readonly string[];
  readonly careersLabel: string;
  readonly careerSummary: string | null;
  readonly careerSectors: readonly string[];
  readonly pendingNote: string | null;
  readonly stagesNote: string | null;
  readonly stages: readonly ProgrammeStage[];
};

export type BachelorsProgrammesCopy = {
  readonly eyebrow: string;
  readonly heading: string;
  readonly standfirst?: string | null;
  readonly awardedLabel: string;
  readonly startingLabel: string;
  readonly pendingLabel: string;
  readonly items: readonly BachelorsProgramme[];
};

export type BachelorsMastheadCopy = {
  readonly heroLabel: string;
  readonly slides: readonly ContentImage[];
  readonly motto: string;
  readonly heading: string;
  readonly standfirst: string;
  readonly cta: ContentLink;
};

const academicHeadPortrait: ContentImage = {
  src: "/team/nischal-khadka.webp",
  alt: "Studio portrait of Mr. Nischal Khadka, Academic Head at NAMI, arms folded in a dark navy suit and patterned blue tie against a mottled blue-grey backdrop.",
  width: 1507,
  height: 2000,
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
  heroLabel: "NAMI at New Baneshwor",
  slides: heroSlides,
  motto: "Transform yourself, to lead the world",
  heading: "NAAYA AAYAM MULTI-DISCIPLINARY INSTITUTE",
  standfirst:
    "British & KU degree programmes in Kathmandu, partnered with the University of Northampton (UK).",
  cta: {
    label: "Start an application",
    href: "/admissions",
    destination: "internal",
  },
};

const awarding: InstitutionAwardingCopy = {
  eyebrow: "Awarding universities",
  heading: "Partner universities awarding our degrees.",
  standfirst:
    "Taught at NAMI in Kathmandu, awarded by our accredited university partners.",
  sinceLabel: "Since",
};

const undergraduateEntry: readonly ProgrammeRequirement[] = [
  {
    label: "+2 (NEB)",
    requirement: "Minimum of 55% (2.2 GPA) or equivalent.",
  },
  { label: "CBSE", requirement: "Minimum of 60%." },
  { label: "A Levels", requirement: "280 UCAS tariff points." },
  {
    label: "English",
    requirement:
      "Minimum of 60 marks in English at +2 or CBSE, or an IELTS score of 6 with no band less than 5.5.",
  },
];

const bbaEntry: readonly ProgrammeRequirement[] = [
  {
    label: "NEB +2",
    requirement: "55% / 2.2 GPA or equivalent",
  },
  { label: "CBSE", requirement: "60%" },
  { label: "A Levels", requirement: "280 UCAS tariff points" },
  {
    label: "English",
    requirement:
      "60 marks in English at +2/CBSE or IELTS 6.0, no band below 5.5",
  },
];

const undergraduateEntryNotes: readonly string[] = [
  "Students awaiting results, and students who have completed a foundation or bridge course (Level 3) from a recognised institution, are also encouraged to apply.",
  "All decisions regarding an offer letter are made by the University of Northampton, UK.",
];

const northamptonAward = "The University of Northampton, UK";

const programmes: BachelorsProgrammesCopy = {
  eyebrow: "Academics",
  heading: "Degree Programmes",
  standfirst: null,
  awardedLabel: "Awarded by",
  startingLabel: "Begins",
  pendingLabel: "Programme detail",
  items: [
    {
      key: "computer-science",
      qualification: "BSc (Hons)",
      title: "Computer Science",
      fullTitle: "BSc (Hons) Computer Science",
      metaDescription:
        "BSc (Hons) Computer Science at NAMI, Kathmandu — a three-year degree awarded by the University of Northampton, UK, with majors in Computing, Software Engineering and Computer Networks Engineering.",
      image: readingRoom,
      awardingBody: northamptonAward,
      startingFrom: null,
      format: "Three-year degree",
      shortDescription:
        "Three-year honours degree with majors in Software Engineering, Computing Systems, and Networks.",
      summary: [
        "A three-year degree available in three majors — Computing, Software Engineering and Computer Networks Engineering — giving an insight into the computing industry and the reach computer technology has on the world.",
        "In affiliation with the University of Northampton, the three years build the in-depth knowledge and skills the computing streams require. The course is designed so students can explore different ideas and develop innovative improvements to current problems in the industry.",
        "It covers software engineering methods, database implementation and system design with multiple users and platforms in mind, alongside the theory and practical implications of knowledge-based systems, neural networks and evolutionary algorithms in artificial intelligence.",
      ],
      entryLabel: "Eligibility",
      entry: undergraduateEntry,
      entryNotes: undergraduateEntryNotes,
      careersLabel: "Career prospect",
      careerSummary:
        "Graduates join organisational projects directly, without intensive further training, and the research skills built through the dissertation open a second route into research or independent consultancy. Computing is used in every discipline, so the long-term scope of the degree reaches wherever computing reaches.",
      careerSectors: [
        "Software industries",
        "Internet service providers",
        "Banks",
        "Airlines",
        "Hydropower",
        "Automobile industries",
        "Educational institutions",
        "Research and consultancy",
      ],
      pendingNote: null,
      stagesNote:
        "During the first year all computing students share the same modules. In years two and three they have the flexibility to focus on a specialism from a range of topics.",
      stages: [
        {
          key: "cs-year-1",
          label: "Year I",
          note: "Students must take all modules.",
          modules: [
            {
              code: "CSY1062",
              title: "Computer Communications",
              credits: 20,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "CSY1061",
              title: "Computer Systems",
              credits: 20,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "CSY1063",
              title: "Web Development",
              credits: 20,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "CSY1064",
              title: "Software Engineering Fundamentals",
              credits: 20,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "CSY1020",
              title: "Problem Solving & Programming",
              credits: 20,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "CSY1060",
              title: "Mathematics for Computer Science",
              credits: 20,
              status: "Compulsory",
              prerequisites: "None",
            },
          ],
        },
        {
          key: "cs-year-2",
          label: "Year II",
          note: "Students must take all compulsory modules.",
          modules: [
            {
              code: "CSY2092",
              title: "Operating Systems",
              credits: 20,
              status: "Compulsory",
              prerequisites: "CSY1061",
            },
            {
              code: "CSY2087",
              title: "Data Structures and Algorithms",
              credits: 20,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "CSY2088",
              title: "Group Project",
              credits: 20,
              status: "Compulsory",
              prerequisites: "CSY1062 or CSY1063 or CSY1064 or CSY1060",
            },
            {
              code: "CSY2089",
              title: "Web Programming",
              credits: 20,
              status: "Compulsory",
              prerequisites: "CSY1063 and CSY1020",
            },
            {
              code: "CSY2080",
              title: "Relational Databases",
              credits: 20,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "CSY2094",
              title: "Software Systems Design & Development",
              credits: 20,
              status: "Compulsory",
              prerequisites: "CSY1020 and CSY1062 or CSY1063 or CSY1064",
            },
          ],
        },
        {
          key: "cs-year-3",
          label: "Year III",
          note: "Students must take all compulsory modules.",
          modules: [
            {
              code: "CSY4022",
              title: "Computing Dissertation",
              credits: 40,
              status: "Compulsory",
              prerequisites:
                "Students undertaking this module should have successfully completed all level 4 and at least 100 credits at level 5.",
            },
            {
              code: "CSY3058",
              title: "Media Technology",
              credits: 20,
              status: "Compulsory",
              prerequisites: "CSY2089 or CSY2094",
            },
            {
              code: "CSY3062",
              title: "Cyber Security and Applied Cryptography",
              credits: 20,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "CSY3059",
              title: "Modern Databases",
              credits: 20,
              status: "Compulsory",
              prerequisites: "CSY2093 or CSY2080",
            },
            {
              code: "CSY3060",
              title: "Advanced AI and Applications",
              credits: 20,
              status: "Compulsory",
              prerequisites: "None",
            },
          ],
        },
      ],
    },
    {
      key: "environmental-science",
      qualification: "BSc (Hons)",
      title: "Environmental Science",
      fullTitle: "BSc (Hons) Environmental Science",
      metaDescription:
        "BSc (Hons) Environmental Science at NAMI, Kathmandu — a three-year degree awarded by the University of Northampton, UK, combining ecology and physical science with field and laboratory work.",
      image: scienceLaboratory,
      awardingBody: northamptonAward,
      startingFrom: null,
      format: "Three-year degree",
      shortDescription:
        "Three-year honours degree combining ecology, physical science, and practical field and lab research.",
      summary: [
        "A three-year degree combining ecology and physical science to evaluate environmental issues and propose appropriate solutions, and to recognise their relevance to society at national and global levels.",
        "Students undertake a wide variety of activities and encounter new challenges that support the theoretical learning. Accuracy, critical evaluation, the ability to research solutions and apply them in new ways, and the ability to communicate findings to a variety of audiences are all vital skills for an environmental scientist.",
        "Students examine research design and methodology across field and laboratory work — data collection, qualitative analysis and statistical tools — with field and lab activities running through the course so scientific concepts are developed in practice.",
      ],
      entryLabel: "Eligibility",
      entry: undergraduateEntry,
      entryNotes: undergraduateEntryNotes,
      careersLabel: "Career prospect",
      careerSummary:
        "Graduates move into organisational projects directly, without intensive further training, across monitoring, conservation and consultancy work. The same research training supports a career as a researcher or independent consultant, and the sector runs from national monitoring and EIA work to the international agencies operating in Nepal.",
      careerSectors: [
        "Environmental monitoring",
        "Conservation and wildlife",
        "Natural resource management",
        "Climate change and CDM projects",
        "IEE and EIA consultancy",
        "Environmental inspection (MOEST)",
        "International agencies (UNEP, UNDP, FAO, WWF, WHO, UNICEF, World Bank, ADB)",
      ],
      pendingNote: null,
      stagesNote: null,
      stages: [
        {
          key: "env-year-1",
          label: "Year I",
          note: "Students must take all compulsory modules for their pathway.",
          modules: [
            {
              code: "ENV1002",
              title: "Introduction to Ecology",
              credits: 20,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "ENV1110",
              title: "Global Environmental Issues",
              credits: 20,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "GEO1108",
              title: "Geohazards",
              credits: 20,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "ENV1128",
              title: "Lab and Field Skills",
              credits: 20,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "ENV1126",
              title: "Life on Earth",
              credits: 20,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "ENV1127",
              title: "Environmental Pollution",
              credits: 20,
              status: "Compulsory",
              prerequisites: "None",
            },
          ],
        },
        {
          key: "env-year-2",
          label: "Year II",
          note: "Students must take all compulsory modules for their pathway.",
          modules: [
            {
              code: "GEO2038",
              title: "Research Methods",
              credits: 20,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "ENV2125",
              title: "International Environmental Policy & Control",
              credits: 20,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "ENV2140",
              title: "Terrestrial and Freshwater Ecosystems",
              credits: 20,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "ENV2103",
              title: "Biogeography",
              credits: 20,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "ENV2124",
              title: "Field Work Module",
              credits: 20,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "ENV2142",
              title: "Impacts of Pollution",
              credits: 20,
              status: "Compulsory",
              prerequisites: "None",
            },
          ],
        },
        {
          key: "env-year-3",
          label: "Year III",
          note: "Students must take all compulsory modules.",
          modules: [
            {
              code: "ENV4101",
              title: "Research Project and Dissertation",
              credits: 40,
              status: "Compulsory",
              prerequisites: "GEO2038 or equivalent",
            },
            {
              code: "ENV3013",
              title: "Sustainable Development: Land Use and Planning",
              credits: 20,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "ENV3143",
              title: "Sustainable Resources Management",
              credits: 20,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "ENV3144",
              title: "Pollution Monitoring and Control",
              credits: 20,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "GEO3124",
              title: "Water Resource Management",
              credits: 20,
              status: "Compulsory",
              prerequisites: "None",
            },
          ],
        },
      ],
    },
    {
      key: "environmental-studies",
      qualification: "BSc",
      title: "Environmental Studies",
      fullTitle: "BSc Environmental Studies",
      metaDescription:
        "BSc Environmental Studies at NAMI, Kathmandu — awarded by Kathmandu University, with the first intake in August 2026.",
      image: plantationProgramme,
      awardingBody: "Kathmandu University",
      startingFrom: "August 2026",
      format: null,
      shortDescription:
        "Kathmandu University degree integrating environmental science, sustainability policy, and field practice.",
      summary: [
        "A Bachelor’s programme in Environmental Studies affiliated with Kathmandu University, combining environmental science, sustainability, policy development and practical field-based learning.",
        "It is a separate degree from the BSc (Hons) Environmental Science taught here, and it is awarded by Kathmandu University rather than the University of Northampton.",
      ],
      entryLabel: "Eligibility",
      entry: [],
      entryNotes: [],
      careersLabel: "Career prospect",
      careerSummary: null,
      careerSectors: [],
      pendingNote:
        "The first intake is August 2026. Modules, entry requirements and career detail have not been published yet — the admissions team can tell you what is confirmed so far.",
      stagesNote: null,
      stages: [],
    },
    {
      key: "business-administration",
      qualification: "Bachelor",
      title: "Business Administration",
      fullTitle: "Bachelor of Business Administration",
      metaDescription:
        "Bachelor of Business Administration (BBA) at NAMI, Kathmandu — a three-year undergraduate programme awarded by the University of Northampton, UK, preparing students for careers in business, management, finance, marketing and entrepreneurship.",
      image: auditoriumGathering,
      awardingBody: northamptonAward,
      startingFrom: null,
      format: "3 years | 360 credits",
      shortDescription:
        "Build the knowledge, skills and confidence to succeed in the world of business.",
      summary: [
        "The BBA at NAMI, awarded by the University of Northampton, UK, is a three-year undergraduate programme designed to prepare students for careers in business, management, finance, marketing, entrepreneurship and a wide range of professional sectors. Through a combination of academic learning, real-world case studies, business projects, presentations, teamwork, industry engagement and practical activities, students develop the knowledge and professional skills needed to navigate today's dynamic business environment.",
        "Why Study BBA at NAMI? Earn a UK University Award from the University of Northampton, giving you an internationally oriented business education. Develop practical business knowledge through case studies, business simulations, projects, presentations, discussions and problem-solving activities. Cultivate entrepreneurial thinking, gain a global business perspective across interconnected markets, and build practical expertise in finance, accounting, and data-informed decision-making.",
        "Learning Beyond the Classroom: At NAMI, business education goes far beyond textbooks and lectures. Students apply their learning through business simulations, case-study competitions, entrepreneurship activities, student-led projects, pitching sessions, industry and guest-speaker sessions, seminars, workshops, business and management events, student clubs and societies, and leadership initiatives.",
        "Skills You Will Develop: Throughout the programme, students build business and management expertise (strategic thinking, business decision-making, financial awareness, marketing knowledge, project management), professional excellence (communication, presentation, teamwork, leadership, negotiation), and future-focused capabilities (critical thinking, problem-solving, creativity, entrepreneurship, digital and analytical skills, and research skills).",
        "Is BBA Right for You? The BBA is ideal for students who are interested in business and management, want to understand how organisations work, are interested in entrepreneurship or starting their own venture, enjoy collaborating in teams, want to develop leadership acumen, or seek a broad business degree before specialising.",
      ],
      entryLabel: "Entry Requirements",
      entry: bbaEntry,
      entryNotes: undergraduateEntryNotes,
      careersLabel: "Where Can a BBA Take You?",
      careerSummary:
        "A BBA can provide a foundation for careers across a wide range of business functions and sectors. Graduates are prepared for roles such as Business Executive, Marketing Executive, HR Executive, Banking Professional, Business Development Executive, Project Coordinator, Operations Executive, Entrepreneur, Sales Executive, and Management Trainee.",
      careerSectors: [
        "Business Management",
        "Banking and Financial Services",
        "Marketing and Digital Marketing",
        "Human Resource Management",
        "Sales and Business Development",
        "Operations Management",
        "Project Management",
        "Entrepreneurship",
        "Consulting",
        "Customer Relationship Management",
        "Hospitality and Service Management",
        "Business Analysis",
        "Administration and Management",
      ],
      pendingNote: null,
      stagesNote: null,
      stages: [
        {
          key: "bba-stage-1",
          label: "Year 1 — Build Your Business Foundation",
          note: "Focus: Understand business. Develop a broad understanding of how businesses operate across marketing, accounting and finance, business environment, business in society, entrepreneurship, and people management.",
          modules: [
            {
              code: "MKT1001",
              title: "Foundation of Marketing",
              credits: 20,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "ACC1003",
              title: "Introductory Finance and Accounting",
              credits: 20,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "BUS1001",
              title: "Business Environment",
              credits: 20,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "BUS1009",
              title: "Business in Society",
              credits: 20,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "MKT1003",
              title: "Enterprise and Opportunity",
              credits: 20,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "HRM1004",
              title: "Managing People",
              credits: 20,
              status: "Compulsory",
              prerequisites: "None",
            },
          ],
        },
        {
          key: "bba-stage-2",
          label: "Year 2 — Develop Management Expertise",
          note: "Focus: Manage and analyse business. Build deeper knowledge and develop practical management capabilities across strategic business analysis, human resources, operations, financial decision-making, project management, and brand management.",
          modules: [
            {
              code: "BUS2002",
              title: "Strategic Business Analysis",
              credits: 20,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "HRM2003",
              title: "Managing Human Resources",
              credits: 20,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "BSO2003",
              title: "Operations Management 1",
              credits: 20,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "ACC2004",
              title: "Managing Finance & Financial Decisions",
              credits: 20,
              status: "Compulsory",
              prerequisites: "ACC1003",
            },
            {
              code: "BSO2016",
              title: "Project Management: Planning and Control",
              credits: 20,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "MKT2006",
              title: "Brand Management",
              credits: 20,
              status: "Compulsory",
              prerequisites: "None",
            },
          ],
        },
        {
          key: "bba-stage-3",
          label: "Year 3 — Think Strategically and Professionally",
          note: "Focus: Lead, innovate and create solutions. Apply your knowledge to contemporary business challenges through innovation and entrepreneurship, strategic management, corporate social responsibility, global business, and an independent business dissertation (BUS4001).",
          modules: [
            {
              code: "MKT3026",
              title: "Opportunity, Innovation and Entrepreneurship",
              credits: 20,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "BUS3002",
              title: "Debates in Strategic Management",
              credits: 20,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "BUS3001",
              title: "Social Responsibility of Business",
              credits: 20,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "BUS3003",
              title: "Global Business Development",
              credits: 20,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "BUS4001",
              title: "Business Dissertation",
              credits: 40,
              status: "Designated",
              prerequisites: "None",
            },
          ],
        },
      ],
    },
    {
      key: "msc-computing",
      qualification: "MSc",
      title: "Computing",
      fullTitle: "MSc Computing",
      metaDescription:
        "MSc Computing at NAMI, Kathmandu — a postgraduate degree awarded by the University of Northampton, UK, deepening research and analytical skills through a dissertation.",
      image: readingHall,
      awardingBody: northamptonAward,
      startingFrom: null,
      format: "Postgraduate degree",
      shortDescription:
        "Postgraduate programme deepening advanced software engineering, systems architecture, and business leadership.",
      summary: [
        "A postgraduate programme built on current global practice in computing, addressing the demand for exceptional leaders in a digital economy the course puts at a global value of $11.5 trillion.",
        "With the technology and computing industries evolving rapidly, the programme equips participants with the skills to thrive in the field and provides a platform for developing the knowledge and experience that career progression in computing needs.",
        "It deepens research and analytical skills and lets students explore individual interests through a thesis, with an emphasis on technical proficiency and business acumen together.",
      ],
      entryLabel: "Eligibility",
      entry: [
        {
          label: "Bachelor’s degree",
          requirement:
            "An IT or computer-related Bachelor’s degree from a reputed institution.",
        },
        {
          label: "Classification",
          requirement:
            "A Bachelor of Honours degree with 2:2 or above, or equivalent, in a computing-related subject area.",
        },
      ],
      entryNotes: [
        "All decisions regarding an offer letter are made after approval from the University of Northampton, UK.",
      ],
      careersLabel: "Career prospect",
      careerSummary:
        "The MSc suits innovators and problem-solvers who want to deepen technical proficiency and business acumen together. Graduates return to their own company or join new organisations prepared to navigate a computing career, across a spectrum that runs from software and IT to cyber security, consulting and research.",
      careerSectors: [
        "Software and IT",
        "Cyber security",
        "Communication",
        "Teaching",
        "Consulting",
        "Programming",
        "Research",
        "Digital marketing",
      ],
      pendingNote: null,
      stagesNote: null,
      stages: [
        {
          key: "msc-modules",
          label: "Modules",
          note: null,
          modules: [
            {
              code: "CSYM017",
              title: "Databases",
              credits: 20,
              status: null,
              prerequisites: null,
            },
            {
              code: "CSYM025",
              title: "Visual Object Software",
              credits: 20,
              status: null,
              prerequisites: null,
            },
            {
              code: "CSYM028",
              title: "Modern Computer Architecture",
              credits: 20,
              status: null,
              prerequisites: null,
            },
            {
              code: "CSYM015",
              title: "Intelligent Systems",
              credits: 20,
              status: null,
              prerequisites: null,
            },
            {
              code: "CSYM019",
              title: "Internet Programming",
              credits: 20,
              status: null,
              prerequisites: null,
            },
            {
              code: "CSYM030",
              title: "Mobile Device Software Development",
              credits: 20,
              status: null,
              prerequisites: null,
            },
            {
              code: "CSYM023",
              title: "Dissertation",
              credits: 60,
              status: null,
              prerequisites: null,
            },
          ],
        },
      ],
    },
  ],
};

const placementPanel: ContentImage = {
  src: "/nami/event-climate-panel.jpg",
  alt: "A panel discussion in a wood-panelled conference room, a speaker addressing a seated audience with a microphone while the other panellists listen from the front row.",
  width: 800,
  height: 533,
};

const partners: CareerPlacementCopy = {
  eyebrow: "Career Placement",
  heading: "Industry partners and career placements.",
  image: placementPanel,
  label: "NAMI industry and technology partner logos",
};

const alumni: SectionCopy = {
  navLabel: "Voices",
  eyebrow: "Student voices",
  heading: "In their own words, on what the degree is actually worth.",
  standfirst:
    "Hear directly from our students on the British system of learning, practical innovation, and personal growth at NAMI.",
  cta: null,
  emptyState: "Student stories will appear here as they are shared.",
};

const gallery: InstitutionGalleryCopy = {
  eyebrow: "The college",
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
    portrait: academicHeadPortrait,
    message: richText(
      "On behalf of the entire NAMI family, it is my great pleasure to warmly welcome all our new and returning students as you begin or continue academic journey with NAMI across our undergraduate and postgraduate programmes.",
      "As you begin or continue your journey at NAMI, we are pleased to welcome you to a community where learning goes beyond the classroom. We want your time at NAMI to be an opportunity to gain knowledge, discover your strengths, explore new ideas and build the confidence to pursue your ambitions. At NAMI, we are committed to creating an environment that encourages students to learn, explore, innovate and achieve their full potential.",
      "Our students are at the heart of everything we do. You will be joining a community of talented, enthusiastic and ambitious individuals who bring diverse perspectives, experiences and ideas to our learning environment. I encourage you to engage with your peers, collaborate with others and make the most of every opportunity to learn and grow together.",
      "At NAMI, education extends beyond the classroom. Alongside your academic studies, you will have opportunities to participate in student clubs and societies, projects, events, leadership activities, industry engagement and a wide range of co-curricular and extracurricular initiatives. These experiences complement your academic learning and help you develop the knowledge, skills, confidence and professional attributes needed to thrive in an ever-changing world.",
      "I encourage you to make the most of your time at NAMI by taking opportunities available to you, both within and beyond the classroom. Stay curious, ask questions, share your ideas, take on new challenges and play an active role in the NAMI community. Each experience will contribute to your personal and academic growth, helping you develop confidence, strengthen your communication and teamwork. It will build the leadership, creativity, critical thinking and problem-solving skills that will serve you well in the future.",
      "Our faculty and staff are committed to supporting you throughout your journey. We are here to provide academic guidance, mentorship and opportunities for personal and professional development. Your success matters to us and we encourage you to seek guidance and support whenever you need it.",
      "I hope your time at NAMI will be rewarding, inspiring and transformative. Embrace every opportunity, learn from every experience and contribute positively to our community. Your time at NAMI is not simply about earning a qualification; it is about developing the knowledge, confidence, values and capabilities to make a meaningful contribution to society and the world of work.",
      "Once again, I warmly welcome you to NAMI. We are pleased to have you as part of our academic community and I look forward to seeing you grow with confidence, pursue your aspirations and make the most of the opportunities ahead.",
      "Warmest wishes for a successful, fulfilling and inspiring academic journey.",
    ),
  },
  programmes,
  partners,
  alumni,
  gallery,
  notices,
} as const;
