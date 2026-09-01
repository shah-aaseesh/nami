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

export type AlumniStory = {
  readonly id: string;
  readonly name: string;
  readonly avatar: string;
  readonly programme: string;
  readonly graduationYear: string;
  readonly institution: "college" | "institute" | "higher-secondary";
  readonly institutionLabel: string;
  readonly currentRole: string;
  readonly company: string;
  readonly sector: string;
  readonly location: string;
  readonly summaryHighlights: readonly string[];
  readonly keyQuote: string;
  readonly pdfData: {
    readonly documentId: string;
    readonly title: string;
    readonly bioSummary: string;
    readonly academicJourney: string;
    readonly careerMilestones: readonly {
      readonly year: string;
      readonly title: string;
      readonly organization: string;
      readonly description: string;
    }[];
    readonly interviewQnA: readonly {
      readonly question: string;
      readonly answer: string;
    }[];
    readonly skillsAcquired: readonly string[];
  };
};

export const alumniStories: readonly AlumniStory[] = [
  {
    id: "pragati-rai",
    name: "Pragati Rai",
    avatar: "/nami/alumna-pragati-rai.jpg",
    programme: "Cambridge A-Levels (Science)",
    graduationYear: "Batch of 2018",
    institution: "college",
    institutionLabel: "Cambridge A-Levels",
    currentRole: "Lead Cloud Systems Engineer",
    company: "Leapfrog Technology",
    sector: "Cloud & AI Infrastructure",
    location: "Kathmandu / USA Remote",
    summaryHighlights: [
      "Top-scoring Cambridge A-Levels graduate in Mathematics and Physics.",
      "Spearheaded enterprise cloud migrations and generative AI deployment pipelines.",
      "Active mentor for junior women in STEM through NAMI's peer mentorship circle.",
    ],
    keyQuote:
      "NAMI taught me analytical rigor. The Cambridge faculty encouraged us to dissect problems rather than memorize formulas, which became my biggest advantage in tech.",
    pdfData: {
      documentId: "NAMI-ALM-2018-042",
      title: "Alumni Spotlight Case Study: Pragati Rai",
      bioSummary:
        "Pragati graduated from NAMI College with distinction in Cambridge A-Levels. She pursued Software Engineering and quickly rose to lead mission-critical cloud reliability engineering teams at Leapfrog Technology.",
      academicJourney:
        "Completed AS & A2 levels with straight A grades in Physics, Mathematics, and Chemistry. Led the Science & Astronomy Club and served as Student Council Academic Secretary.",
      careerMilestones: [
        {
          year: "2018",
          title: "Cambridge A-Levels Distinction",
          organization: "NAMI College",
          description:
            "Awarded Academic Excellence Trophy for highest composite percentile in Cambridge Science stream.",
        },
        {
          year: "2021",
          title: "Associate DevOps Engineer",
          organization: "Genese Solutions",
          description:
            "Architected AWS cloud automation pipelines and containerization for regional banking apps.",
        },
        {
          year: "2023 – Present",
          title: "Lead Cloud Systems Engineer",
          organization: "Leapfrog Technology",
          description:
            "Leading a distributed team building resilient cloud architecture and high-throughput AI microservices.",
        },
      ],
      interviewQnA: [
        {
          question: "How did NAMI prepare you for leadership in tech?",
          answer:
            "The laboratory environment and Cambridge curriculum fostered an inquiry-first mindset. When tackling unexpected software bottlenecks today, I rely on the exact problem-decomposition techniques I practiced in NAMI laboratories.",
        },
        {
          question: "What advice do you have for current students?",
          answer:
            "Build practical projects early. Participate in student clubs, hackathons, and research excursions. The friendships and network you cultivate at NAMI stay with you across your entire career.",
        },
      ],
      skillsAcquired: [
        "Distributed Systems",
        "Cloud Architecture (AWS)",
        "Kubernetes & Docker",
        "Analytical Problem Solving",
        "Team Mentorship",
      ],
    },
  },
  {
    id: "aayush-shrestha",
    name: "Aayush Shrestha",
    avatar: "/team/robin-rana.webp",
    programme: "BSc (Hons) Computing",
    graduationYear: "Batch of 2020",
    institution: "institute",
    institutionLabel: "Bachelors (Northampton UK)",
    currentRole: "Senior AI & Data Specialist",
    company: "CloudFactory",
    sector: "Artificial Intelligence & Data Ops",
    location: "Kathmandu & UK",
    summaryHighlights: [
      "Graduated with First Class Honours from the University of Northampton UK programme.",
      "Built machine learning models deployed across global medical imaging datasets.",
      "Delivered guest keynote lectures at NAMI's annual ELITE Tech Symposium.",
    ],
    keyQuote:
      "Having a British university curriculum in Nepal gave us a direct international benchmark. Our capstone projects were audited to UK university standards.",
    pdfData: {
      documentId: "NAMI-ALM-2020-109",
      title: "Alumni Spotlight Case Study: Aayush Shrestha",
      bioSummary:
        "Aayush completed his BSc (Hons) in Computing with First Class Honours from the University of Northampton at NAMI. He currently designs enterprise AI data preparation pipelines at CloudFactory.",
      academicJourney:
        "Excelled in algorithms, artificial intelligence, and database design. Won 1st Prize at the NAMI ELITE IT Innovation competition with an automated natural hazard alert prototype.",
      careerMilestones: [
        {
          year: "2020",
          title: "BSc (Hons) First Class Honours",
          organization: "University of Northampton / NAMI",
          description:
            "Graduated with distinction in Computing and published undergraduate paper on localized NLP datasets.",
        },
        {
          year: "2021",
          title: "Machine Learning Associate",
          organization: "Diyo AI",
          description:
            "Trained neural network classifiers for automated document OCR and identity verification.",
        },
        {
          year: "2023 – Present",
          title: "Senior AI & Data Specialist",
          organization: "CloudFactory",
          description:
            "Managing large-scale data labelling and model validation pipelines for Fortune 500 AI clients.",
        },
      ],
      interviewQnA: [
        {
          question: "Why chose Northampton UK at NAMI?",
          answer:
            "The international curriculum and faculty mentorship were unmatched. We studied the same modules as students in the UK while building solutions directly relevant to our region.",
        },
        {
          question: "How valuable was the campus research environment?",
          answer:
            "The high-spec computer laboratories, central digital libraries, and collaborative culture allowed us to test real-world software prototypes 24/7.",
        },
      ],
      skillsAcquired: [
        "Machine Learning Pipelines",
        "Python & PyTorch",
        "Data Engineering",
        "Agile Software Development",
      ],
    },
  },
  {
    id: "sneha-karki",
    name: "Sneha Karki",
    avatar: "/team/samjhana-phuyal.webp",
    programme: "BSc (Hons) Environmental Science",
    graduationYear: "Batch of 2019",
    institution: "institute",
    institutionLabel: "Bachelors (Northampton UK)",
    currentRole: "Climate Resilience Lead",
    company: "ICIMOD",
    sector: "Environmental Policy & Research",
    location: "South Asia Regional Office",
    summaryHighlights: [
      "Led biodiversity fieldwork studies across the Mustang and Sindhupalchowk watersheds.",
      "Author of published research on Himalayan glacier retreat and community adaptation.",
      "Recipient of the UK University Vice-Chancellor's International Scholar Commendation.",
    ],
    keyQuote:
      "Field excursions at NAMI were transformative. We didn't just learn about ecology in classrooms—we measured soil pH and analyzed high-altitude river samples on mountain ridges.",
    pdfData: {
      documentId: "NAMI-ALM-2019-078",
      title: "Alumni Spotlight Case Study: Sneha Karki",
      bioSummary:
        "Sneha graduated in Environmental Science from NAMI / University of Northampton. She now leads regional community climate adaptation research across the Hindu Kush Himalaya at ICIMOD.",
      academicJourney:
        "Specialized in hydrology, GIS mapping, and environmental impact assessments. Spearheaded the NAMI Eco-Vision Club and community tree plantation drives.",
      careerMilestones: [
        {
          year: "2019",
          title: "BSc Environmental Science Honours",
          organization: "NAMI / University of Northampton",
          description:
            "Recognized with Best Undergraduate Thesis Award for watershed conservation modeling.",
        },
        {
          year: "2020",
          title: "Research Officer",
          organization: "Wildlife Conservation Nepal",
          description:
            "Conducted environmental education and wildlife habitat restoration projects across 5 districts.",
        },
        {
          year: "2023 – Present",
          title: "Climate Resilience Lead",
          organization: "ICIMOD",
          description:
            "Directing international stakeholder working groups on transboundary water resource sustainability.",
        },
      ],
      interviewQnA: [
        {
          question: "What made the Environmental Science program unique?",
          answer:
            "The blend of hands-on laboratory chemistry and rigorous mountain fieldwork. NAMI provided full lab instrumentation that allowed us to publish legitimate research early in our careers.",
        },
        {
          question: "What is your message to prospective students?",
          answer:
            "Environmental science is the defining field of our century. NAMI gives you the global credibility and local practical exposure to create tangible impact.",
        },
      ],
      skillsAcquired: [
        "GIS & Remote Sensing",
        "Environmental Impact Assessment",
        "Policy Analysis",
        "Field Research & Sampling",
      ],
    },
  },
  {
    id: "rohan-sharma",
    name: "Rohan Sharma",
    avatar: "/team/suresh-raj-ghimire.webp",
    programme: "NEB +2 Science (Physics & Mathematics)",
    graduationYear: "Batch of 2017",
    institution: "higher-secondary",
    institutionLabel: "Higher Secondary (+2)",
    currentRole: "Biomedical Technology Researcher",
    company: "University of Sydney",
    sector: "Biotechnology & Health Systems",
    location: "Sydney, Australia",
    summaryHighlights: [
      "Distinction in NEB Board examinations with highest college score in Physics.",
      "Awarded full international postgraduate research fellowship in Australia.",
      "Co-inventor of patented low-cost digital diagnostic biosensors for remote clinics.",
    ],
    keyQuote:
      "The dedicated faculty at NAMI built my foundational discipline. Daily conceptual problem sets in +2 Science gave me the confidence to compete globally.",
    pdfData: {
      documentId: "NAMI-ALM-2017-015",
      title: "Alumni Spotlight Case Study: Rohan Sharma",
      bioSummary:
        "After graduating with top honors in +2 Science from NAMI, Rohan completed biomedical engineering and now leads translational diagnostic device research in Australia.",
      academicJourney:
        "Achieved straight A+ grades in NEB Higher Secondary Science. Participated actively in the Science Exhibition and Inter-School Mathematics Olympiad.",
      careerMilestones: [
        {
          year: "2017",
          title: "+2 Science Distinction",
          organization: "NAMI Higher Secondary",
          description:
            "Ranked in top 1% nationwide in National Examinations Board Physics & Chemistry.",
        },
        {
          year: "2021",
          title: "B.Eng Biomedical Engineering",
          organization: "Australia Institute of Tech",
          description:
            "First Class Honours and recipient of Academic Dean's Award.",
        },
        {
          year: "2023 – Present",
          title: "Doctoral Fellow & Research Associate",
          organization: "University of Sydney",
          description:
            "Designing wearable microfluidic health monitors for continuous patient vital surveillance.",
        },
      ],
      interviewQnA: [
        {
          question:
            "How did NAMI's +2 program prepare you for university abroad?",
          answer:
            "The rigorous testing schedule, disciplined laboratory practicals, and encouraging teachers meant I experienced zero shock when transitioning to international engineering courses.",
        },
        {
          question: "What memories stand out from your time at NAMI?",
          answer:
            "The late afternoons in the chemistry lab and basketball tournaments. NAMI balanced hard academic focus with vibrant student life.",
        },
      ],
      skillsAcquired: [
        "Biomedical Instrumentation",
        "Signal Processing",
        "Mathematical Modeling",
        "Experimental Design",
      ],
    },
  },
];

export const alumniCopy = {
  meta: {
    title: "Alumni Network & Career Spotlights | NAMI",
    description:
      "Explore the achievements of over 8,000 NAMI graduates leading innovation across computing, environmental science, business, and research worldwide.",
  },
  masthead: {
    eyebrow: "ALUMNI NETWORK",
    heading: "8,000+ Alumni",
    standfirst:
      "From Kathmandu to global institutions across 15+ countries, NAMI graduates are leading innovation in computing, sustainable development, business, and research.",
    cta: "Explore Alumni Spotlights",
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
  storiesSection: {
    eyebrow: "ALUMNI VOICES",
    heading: "Where NAMI Graduates Go",
    standfirst:
      "From Kathmandu tech pioneers to international researchers in the UK and Australia, explore the career paths of our graduates. Click any profile to view their full case study report.",
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
  connect: {
    eyebrow: "STAY IN TOUCH",
    heading: "Are You a NAMI Graduate?",
    standfirst:
      "Reconnect with your batch, update your career milestones, submit an alumni spotlight, or join our student mentorship circle.",
    email: "alumni@nami.edu.np",
  },
} as const;
