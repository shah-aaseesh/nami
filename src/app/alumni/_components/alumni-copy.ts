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
    readonly publishedDate: string;
    readonly headline: string;
    readonly storyParagraphs: readonly string[];
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
    id: "reesav-rokka",
    name: "Reesav Rokka",
    avatar: "/nami/reesav-rokka.jpg",
    programme: "BSc (Hons) Computing",
    graduationYear: "Alumnus",
    institution: "institute",
    institutionLabel: "Bachelors (Northampton UK)",
    currentRole: "Senior IT Head",
    company: "Gokarneshwor Municipal Hospital",
    sector: "Healthcare Information Technology",
    location: "Kathmandu, Nepal",
    summaryHighlights: [
      "Senior IT Head managing hospital technology systems, digital workflows, and healthcare IT infrastructure.",
      "Introduced digital tools and systems that empower doctors, nurses, and staff to provide faster, better patient services.",
    ],
    keyQuote:
      "Presentations gave me confidence, group projects taught me collaboration, and practical assignments prepared me to solve real-world problems. What began with a desire to build an IT career became a role where technical skills improve hospital services and support the community.",
    pdfData: {
      documentId: "NAMI-ALM-IT-018",
      title: "Alumni Spotlight Case Study: Reesav Rokka",
      publishedDate: "Alumni Relations Publication",
      headline:
        "Turning an Interest in Technology into Meaningful Healthcare Impact",
      storyParagraphs: [
        "Reesav Rokka first learned about Naaya Aayam Multi-Disciplinary Institute (NAMI) through his friends and educational counselors. They spoke highly of its quality education, supportive environment, and practical approach to learning. At the time, Reesav wanted to build a career in Information Technology (IT), and he felt NAMI would give him the practical skills and foundation he needed rather than focusing only on textbook knowledge.",
        "During his time at NAMI, Reesav found the college welcoming and felt comfortable approaching teachers for guidance. His growth came not only from classroom lessons but also from projects, presentations, and group assignments. These experiences taught him problem-solving, communication, teamwork, leadership, and how to listen to others. He came to understand that technical knowledge alone was not enough for a successful career.",
        "After graduating, Reesav started working as an IT professional at Gokarneshwor Municipal Hospital. With experience and increasing responsibility, he became Senior IT Head. His role involves managing the hospital's technology systems, protecting information, managing software, supporting digital projects, and working with doctors, nurses, administrators, and other staff to solve practical problems through technology.",
        "He has also contributed to several improvements at the hospital, including introducing digital systems, strengthening its technology infrastructure, and developing tools that support healthcare professionals. What matters most to him is seeing how these technological improvements can help staff access information faster, work more accurately, and provide better services to patients.",
        "Looking back, Reesav sees a strong connection between his education and his career. Presentations gave him confidence, group projects taught him collaboration, and practical assignments prepared him to solve real-world problems. He believes students should use every classroom activity as preparation for their future, while also continuing to learn because technology constantly changes.",
        "His journey is ultimately about turning an interest in technology into meaningful work. What began with a desire to build an IT career became a role where his technical skills help improve hospital services and support the wider community.",
      ],
      careerMilestones: [
        {
          year: "Academic",
          title: "BSc (Hons) Computing & Practical Foundation",
          organization: "NAMI / University of Northampton",
          description:
            "Completed hands-on software development, systems engineering, collaborative projects, and communication-focused presentations.",
        },
        {
          year: "Career Start",
          title: "IT Professional",
          organization: "Gokarneshwor Municipal Hospital",
          description:
            "Managed core hospital technology systems, ensured clinical data integrity, and supported digital tooling for healthcare workers.",
        },
        {
          year: "Present",
          title: "Senior IT Head",
          organization: "Gokarneshwor Municipal Hospital",
          description:
            "Directs institutional technology infrastructure, digital systems, cybersecurity, and practical software tools supporting medical staff and patients.",
        },
      ],
      interviewQnA: [
        {
          question:
            "How did your education at NAMI connect with your current healthcare leadership role?",
          answer:
            "Presentations gave me confidence, group projects taught me collaboration, and practical assignments prepared me to solve real-world problems. Working with doctors, nurses, and administrators requires strong communication alongside technical expertise.",
        },
        {
          question: "What is most rewarding about your current work?",
          answer:
            "Seeing how technological improvements help staff access information faster, work more accurately, and provide better services to patients. It is about turning an interest in technology into meaningful work that supports the wider community.",
        },
        {
          question: "What is your advice for current students?",
          answer:
            "Use every classroom activity as preparation for your future, while also continuing to learn because technology constantly changes.",
        },
      ],
      skillsAcquired: [
        "Healthcare IT Systems",
        "Infrastructure & Security",
        "Digital Transformation",
        "Team Leadership & Collaboration",
        "Problem-Solving & Communication",
      ],
    },
  },
  {
    id: "daniel-sapkota",
    name: "Daniel Sapkota",
    avatar: "/nami/daniel-sapkota.jpg",
    programme: "BSc (Hons) Computing",
    graduationYear: "Alumnus",
    institution: "institute",
    institutionLabel: "Bachelors (Northampton UK)",
    currentRole: "Co-founder",
    company: "Lightcone",
    sector: "Fintech & Venture Capital",
    location: "New York, USA",
    summaryHighlights: [
      "Co-founder of Lightcone, a New York fintech startup that has raised USD 4 million in venture capital from US and European investors.",
      "Awarded a full scholarship and stipend to pursue a PhD in Computer Science at the University of Nevada, Las Vegas (UNLV).",
    ],
    keyQuote:
      "Build something quickly, get users, learn from the process, iterate, innovate, and keep taking action.",
    pdfData: {
      documentId: "NAMI-ALM-FT-007",
      title: "Alumni Spotlight Case Study: Daniel Sapkota",
      publishedDate: "Alumni Relations Publication",
      headline:
        "From Kathmandu to New York: Founding a $4M Venture-Backed Fintech Startup",
      storyParagraphs: [
        "Daniel Sapkota is a Co-founder of Lightcone, a fintech startup based in New York, USA. His journey began at NAMI, where he developed an interest in technology and entrepreneurship.",
        "After graduating from NAMI, Daniel received a full scholarship and stipend to pursue a PhD in Computer Science at the University of Nevada, Las Vegas (UNLV). He later moved into the technology industry and co-founded Lightcone, a fintech startup that has raised USD 4 million in venture capital from investors in the United States and Europe.",
        "Daniel credits NAMI’s hands-on, industry-focused learning for helping him develop the confidence and initiative that have been important throughout his career. He particularly remembers how the curriculum encouraged him to act quickly and build things rather than only study theory. He also highlights the value of the US technology industry’s emphasis on agency.",
        "His advice to current students is straightforward: build something quickly, get users, learn from the process, iterate, innovate, and keep taking action.",
        "Daniel also remembers his teachers at NAMI fondly, especially Deepak Karna, whom he credits as his mentor. He describes himself as a student who was difficult to keep under control, but says he loved his teachers and values the mentorship he received.",
        "Overall, Daniel’s story shows a path from NAMI → PhD in Computer Science at UNLV → technology industry → fintech entrepreneurship in New York, eventually becoming a co-founder of a startup that attracted significant international venture investment.",
      ],
      careerMilestones: [
        {
          year: "Academic",
          title: "BSc Computing & Entrepreneurship Foundation",
          organization: "NAMI / University of Northampton",
          description:
            "Cultivated engineering discipline and startup initiative under the close mentorship of Deepak Karna and faculty.",
        },
        {
          year: "PhD Fellowship",
          title: "PhD in Computer Science (Full Scholarship & Stipend)",
          organization: "University of Nevada, Las Vegas (UNLV)",
          description:
            "Awarded full scholarship and stipend for advanced computing doctoral studies and academic research in the United States.",
        },
        {
          year: "US Tech",
          title: "Technology Industry & High-Agency Execution",
          organization: "US Tech Ecosystem",
          description:
            "Transitioned into the US tech industry, embracing rapid prototyping, user feedback, and high personal agency.",
        },
        {
          year: "Present",
          title: "Co-founder",
          organization: "Lightcone (New York, USA)",
          description:
            "Co-founded fintech startup Lightcone, raising USD 4 Million in venture capital from prominent investors across the US and Europe.",
        },
      ],
      interviewQnA: [
        {
          question:
            "How did NAMI's learning approach influence your entrepreneurial path?",
          answer:
            "NAMI's hands-on, industry-focused learning helped me develop confidence and initiative. The curriculum encouraged me to act quickly and build things rather than only study theory, matching the emphasis on agency in the US tech ecosystem.",
        },
        {
          question: "What mentorship stood out during your time at NAMI?",
          answer:
            "I remember my teachers at NAMI fondly, especially Deepak Karna, whom I credit as my mentor. I was a student who was difficult to keep under control, but I loved my teachers and value the mentorship and encouragement I received.",
        },
        {
          question: "What is your key advice to current students?",
          answer:
            "Build something quickly, get users, learn from the process, iterate, innovate, and keep taking action.",
        },
      ],
      skillsAcquired: [
        "Fintech Innovation",
        "Venture Capital & Fundraising",
        "Computer Science Research",
        "Rapid Product Iteration",
        "High-Agency Leadership",
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
      "From healthcare technology leaders in Kathmandu to venture-backed fintech entrepreneurs in New York, explore the career journeys of our graduates. Click any profile to view their full story.",
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
