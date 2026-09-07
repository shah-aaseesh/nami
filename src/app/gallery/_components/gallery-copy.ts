import type { Crumb } from "@/components/seo/structured-data";
import type { ContentImage } from "@/lib/content";
import {
  auditoriumGathering,
  bachelorOrientation,
  basketballPrizeGiving,
  christmasHall,
  climatePanel,
  convocationCeremony,
  ecoClubFrame,
  eliteCompetition,
  mustangTrip,
  plantationProgramme,
  readingHall,
  readingRoom,
  scienceLaboratory,
  scienceLaboratoryTwo,
  serviceCamp,
  studentsOnCampus,
} from "@/lib/content/local/images";

export const galleryTrail: readonly Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Gallery", path: "/gallery" },
];

export type EventPhoto = {
  readonly id: string;
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
  readonly caption?: string;
};

export type EventAlbum = {
  readonly id: string;
  readonly title: string;
  readonly institution:
    | "primary"
    | "higher-secondary"
    | "college"
    | "institute";
  readonly institutionLabel: string;
  readonly club?: string;
  readonly clubLabel?: string;
  readonly category: string;
  readonly date: string;
  readonly description: string;
  readonly coverImage: ContentImage;
  readonly photos: readonly EventPhoto[];
  readonly photoCount: number;
};

export type InstitutionClub = {
  readonly id: string;
  readonly label: string;
};

export const institutionClubs: Record<string, readonly InstitutionClub[]> = {
  primary: [
    { id: "all", label: "All Clubs" },
    { id: "sports-club", label: "Sports Club" },
    { id: "art-and-literature-club", label: "Art & Literature Club" },
    { id: "event-management-club", label: "Event Management Club" },
    { id: "social-service-club", label: "Social Service Club" },
    { id: "science-and-technology-club", label: "Science & Tech Club" },
  ],
  "higher-secondary": [
    { id: "all", label: "All Clubs" },
    { id: "sports-club", label: "Sports Club" },
    { id: "art-and-literature-club", label: "Art & Literature Club" },
    { id: "event-management-club", label: "Event Management Club" },
    { id: "social-service-club", label: "Social Service Club" },
    { id: "science-and-technology-club", label: "Science & Tech Club" },
  ],
  college: [
    { id: "all", label: "All Clubs" },
    { id: "sports", label: "Sports Club" },
    { id: "social-services", label: "Social Services Club" },
    { id: "environment", label: "Environment Club" },
    { id: "arts-and-crafts", label: "Arts and Crafts Club" },
  ],
  institute: [
    { id: "all", label: "All Clubs" },
    { id: "elite-it-club", label: "ELITE IT & Tech Club" },
    { id: "sports-club", label: "Sports Club" },
    { id: "social-welfare-club", label: "Social Welfare Club" },
    { id: "cultural-arts-club", label: "Cultural & Arts Club" },
  ],
};

export const eventAlbums: readonly EventAlbum[] = [
  // ==========================================
  // 1. NAMI INTERNATIONAL SCHOOL (PRIMARY)
  // ==========================================
  {
    id: "school-art-competition",
    title: "School Art Competition & Creative Showcase",
    institution: "primary",
    institutionLabel: "Primary",
    club: "art-and-literature-club",
    clubLabel: "Art & Literature Club",
    category: "Culture & Celebrations",
    date: "Annual Art Fest",
    description:
      "Pupils participating in the live sketching, acrylic painting, and creative storytelling competition in classrooms and studio spaces.",
    coverImage: {
      src: "/gallery/Art and literature/Art Competition/20251224_101654.jpg",
      alt: "NAMI International School students actively painting and sketching during the annual art competition.",
      width: 4000,
      height: 3000,
    },
    photos: [
      {
        id: "art-1",
        src: "/gallery/Art and literature/Art Competition/20251224_101654.jpg",
        alt: "Pupils immersed in live watercolor and sketch composition.",
        width: 4000,
        height: 3000,
        caption: "Students engaged in the live creative art contest.",
      },
      {
        id: "art-2",
        src: "/gallery/Art and literature/Art Competition/20251224_110720.jpg",
        alt: "Creative artwork and visual illustrations on student desks.",
        width: 4000,
        height: 2252,
        caption: "Classroom art session exploring diverse color media.",
      },
      {
        id: "art-3",
        src: "/gallery/Art and literature/Art Competition/20251224_110922.jpg",
        alt: "Student showcasing completed watercolor landscape.",
        width: 4000,
        height: 2252,
        caption: "Creative landscape and character design artwork.",
      },
      {
        id: "art-4",
        src: "/gallery/Art and literature/PPts/IMG-42c20df59da55331efb1eb2055eddc72-V.jpg",
        alt: "Literary presentation and visual storytelling slide deck.",
        width: 1191,
        height: 717,
        caption: "Digital storytelling and literature presentation session.",
      },
      {
        id: "art-5",
        src: "/gallery/Art and literature/PPts/IMG-b5bc243a81739f47f9b8eb0ea6f3de35-V.jpg",
        alt: "Poetry analysis and creative prose study.",
        width: 973,
        height: 709,
        caption: "Literary analysis and poetic critique workshop.",
      },
    ],
    photoCount: 5,
  },
  {
    id: "school-annual-sports-meet",
    title: "Annual Sports Meet & Track Championships",
    institution: "primary",
    institutionLabel: "Primary",
    club: "sports-club",
    clubLabel: "Sports Club",
    category: "Sports & Athletics",
    date: "Annual Sports Gala",
    description:
      "High-energy sporting fixtures including basketball championships, table tennis, carrom, chess tournaments, and tug-of-war on school grounds.",
    coverImage: {
      src: "/gallery/Sports Club/Annual Sports Meet/Basketball.jpg",
      alt: "NAMI International School basketball match in progress.",
      width: 4000,
      height: 3000,
    },
    photos: [
      {
        id: "sp-1",
        src: "/gallery/Sports Club/Annual Sports Meet/Basketball.jpg",
        alt: "Inter-house basketball championship action.",
        width: 4000,
        height: 3000,
        caption: "High-intensity basketball match on the main court.",
      },
      {
        id: "sp-2",
        src: "/gallery/Sports Club/Annual Sports Meet/Carrom.JPG",
        alt: "Students competing in indoor carrom championship.",
        width: 6000,
        height: 4000,
        caption: "Precision carrom board tournament in the recreational hall.",
      },
      {
        id: "sp-3",
        src: "/gallery/Sports Club/Annual Sports Meet/Chess.jpg",
        alt: "Tactical chess tournament fixture.",
        width: 1600,
        height: 900,
        caption: "Inter-house strategic chess championship round.",
      },
      {
        id: "sp-4",
        src: "/gallery/Sports Club/Annual Sports Meet/Table Tennis.jpg",
        alt: "Table tennis match in the indoor sports complex.",
        width: 891,
        height: 660,
        caption: "Fast-paced table tennis rallies and playoffs.",
      },
      {
        id: "sp-5",
        src: "/gallery/Sports Club/Annual Sports Meet/Tug of War.jpg",
        alt: "Tug of war team strength competition.",
        width: 1228,
        height: 807,
        caption: "Inter-house tug-of-war teamwork and power contest.",
      },
    ],
    photoCount: 5,
  },
  {
    id: "school-inter-basketball-futsal",
    title: "Inter-School Basketball & Intra Futsal Cup",
    institution: "primary",
    institutionLabel: "Primary",
    club: "sports-club",
    clubLabel: "Sports Club",
    category: "Sports & Athletics",
    date: "Invitational League",
    description:
      "Valley-wide inter-school basketball playoffs and seasonal intra-school futsal championships played on campus mini-football turf.",
    coverImage: {
      src: "/gallery/Sports Club/Intra Futsal/4fe72723-53bd-4408-a417-776bb9af9ce1.jfif",
      alt: "Students playing intra futsal tournament on the green turf ground.",
      width: 1280,
      height: 960,
    },
    photos: [
      {
        id: "fut-1",
        src: "/gallery/Sports Club/Intra Futsal/4fe72723-53bd-4408-a417-776bb9af9ce1.jfif",
        alt: "Futsal match in full swing on the green turf.",
        width: 1280,
        height: 960,
        caption:
          "Intra-school futsal league showdown on the mini-football turf.",
      },
      {
        id: "fut-2",
        src: "/gallery/Sports Club/Intra Futsal/398d4dea-5391-4cd7-a004-c313f11476f9.jfif",
        alt: "Goalkeeper and defense in action.",
        width: 960,
        height: 1280,
        caption: "Competitive penalty and defensive action on turf.",
      },
      {
        id: "fut-3",
        src: "/gallery/Sports Club/Intra Futsal/c00c79fa-af61-4a48-a37b-7c815c36d4e8.jfif",
        alt: "Post-match team celebration.",
        width: 1280,
        height: 960,
        caption: "Team sportsmanship and victory celebration.",
      },
      {
        id: "bb-is-1",
        src: "/gallery/Sports Club/Inter School Basketball/46dcb38e-ac84-4ac8-b0ea-a11f6cb8f43b.jfif",
        alt: "Inter-school basketball tournament match.",
        width: 1280,
        height: 960,
        caption: "Regional inter-school basketball championship.",
      },
      {
        id: "bb-is-2",
        src: "/gallery/Sports Club/Inter School Basketball/b228654b-44c8-485a-9bab-d954ae9c9ca7.jfif",
        alt: "Player driving towards basket.",
        width: 720,
        height: 1280,
        caption: "Offensive drive and lay-up during basketball finals.",
      },
      {
        id: "bb-is-3",
        src: "/gallery/Sports Club/Inter School Basketball/e698e103-765c-4f91-bdcf-783b8dbbf4ff.jfif",
        alt: "Teams celebrating after match.",
        width: 1280,
        height: 720,
        caption: "Medal presentation and sportsmanship cheer.",
      },
    ],
    photoCount: 6,
  },
  {
    id: "school-bio-excursion-science",
    title: "Biology Field Excursion & Lab Discovery",
    institution: "primary",
    institutionLabel: "Primary",
    club: "science-and-technology-club",
    clubLabel: "Science & Tech Club",
    category: "Academics & Labs",
    date: "Science & Nature Week",
    description:
      "Hands-on botanical specimen observation, ecological research field tours, and scientific demonstrations led by the Science & Tech Club.",
    coverImage: {
      src: "/gallery/Science & Tech/bio Excursion/IMG-4c57ac4b6ca59fd28fd1d147218f6fe3-V.jpg",
      alt: "NAMI International School students during biological field excursion.",
      width: 1600,
      height: 900,
    },
    photos: [
      {
        id: "bio-1",
        src: "/gallery/Science & Tech/bio Excursion/IMG-4c57ac4b6ca59fd28fd1d147218f6fe3-V.jpg",
        alt: "Students exploring botanical species during outdoor excursion.",
        width: 1600,
        height: 900,
        caption: "Outdoor biological field study and nature exploration.",
      },
      {
        id: "bio-2",
        src: "/gallery/Science & Tech/bio Excursion/IMG-f46f1eb2db148ca96464c442f1ba0e6c-V.jpg",
        alt: "Collecting plant specimens and environmental data.",
        width: 1600,
        height: 900,
        caption: "Botanical taxonomy and environmental recording.",
      },
      {
        id: "bio-3",
        src: "/nami/school/nami-school-science-lab.jpg",
        alt: "Junior science laboratory practical demonstration.",
        width: 1000,
        height: 750,
        caption: "Junior science laboratory apparatus and experiment benches.",
      },
      {
        id: "bio-4",
        src: "/nami/school/nami-school-computer-lab.jpg",
        alt: "Digital ICT and coding workstations.",
        width: 1000,
        height: 750,
        caption: "Interactive coding and digital literacy in the computer lab.",
      },
    ],
    photoCount: 4,
  },
  {
    id: "school-award-cultural-gala",
    title: "Award & Cultural Day Stage Production",
    institution: "primary",
    institutionLabel: "Primary",
    club: "event-management-club",
    clubLabel: "Event Management Club",
    category: "Events & Stage",
    date: "Annual Gala",
    description:
      "Grand cultural performances, stage honors, and event protocol orchestrated end-to-end by the Event Management Club.",
    coverImage: {
      src: "/gallery/Event Management/Award & Cultural/DSC08026.JPG",
      alt: "Grand cultural dance performance on the NAMI auditorium stage.",
      width: 4734,
      height: 4000,
    },
    photos: [
      {
        id: "evt-1",
        src: "/gallery/Event Management/Award & Cultural/DSC08026.JPG",
        alt: "Traditional dance performance on stage.",
        width: 4734,
        height: 4000,
        caption: "Grand cultural celebration and traditional performance.",
      },
      {
        id: "evt-2",
        src: "/gallery/Event Management/Award & Cultural/3.jpg",
        alt: "Annual awards and student recognition on stage.",
        width: 2231,
        height: 2149,
        caption: "Honor roll and achievement certificates distribution.",
      },
      {
        id: "evt-3",
        src: "/gallery/Event Management/Welcome Program/IMG_9595.JPG",
        alt: "Stage backdrop and lighting operations.",
        width: 5282,
        height: 3521,
        caption: "Stage lighting and acoustic operations in the auditorium.",
      },
      {
        id: "evt-4",
        src: "/gallery/Event Management/Welcome Program/IMG_9609.JPG",
        alt: "Student emcees anchoring the stage program.",
        width: 3363,
        height: 5045,
        caption: "Master of ceremonies leading the program agenda.",
      },
      {
        id: "evt-5",
        src: "/gallery/Event Management/Welcome Program/IMG_9881.JPG",
        alt: "Welcoming committee and guest reception.",
        width: 5343,
        height: 3562,
        caption: "Event welcoming team receiving parents and dignitaries.",
      },
    ],
    photoCount: 5,
  },
  {
    id: "school-community-donation-camps",
    title: "Community Donation Camps & Blood Drive",
    institution: "primary",
    institutionLabel: "Primary",
    club: "social-service-club",
    clubLabel: "Social Service Club",
    category: "Community Outreach",
    date: "Welfare & Relief Drive",
    description:
      "Student volunteers organizing charity donation packages, warm winter clothing drives, and blood donation drives for community welfare.",
    coverImage: {
      src: "/gallery/Social Service Club/Donation Camp/4.jpg",
      alt: "Students packing relief and donation packages.",
      width: 4000,
      height: 3000,
    },
    photos: [
      {
        id: "soc-1",
        src: "/gallery/Social Service Club/Donation Camp/4.jpg",
        alt: "Student volunteers packaging relief kits.",
        width: 4000,
        height: 3000,
        caption: "Sorting and packing educational and welfare supplies.",
      },
      {
        id: "soc-2",
        src: "/gallery/Social Service Club/Donation Camp/5.jpg",
        alt: "Delivering care packages to community families.",
        width: 960,
        height: 1280,
        caption: "Delivering warm winter clothes and relief packages.",
      },
      {
        id: "soc-3",
        src: "/gallery/Social Service Club/Donation Camp/IMG-20250104-WA0000.jpg",
        alt: "Student team organizing community distribution logistics.",
        width: 960,
        height: 1280,
        caption: "Community outreach coordination and field distribution.",
      },
      {
        id: "soc-4",
        src: "/gallery/Social Service Club/Blood Donation/Blood Donation..jpg",
        alt: "Voluntary blood donation camp banner.",
        width: 986,
        height: 1339,
        caption: "Annual campus voluntary blood donation drive.",
      },
      {
        id: "soc-5",
        src: "/gallery/Social Service Club/Blood Donation/IMG-c96541748440d49ea99a6c662ccc1edd-V.jpg",
        alt: "Youth volunteers assisting donors and health staff.",
        width: 913,
        height: 1438,
        caption: "Student volunteers supporting Red Cross medical personnel.",
      },
    ],
    photoCount: 5,
  },

  // ==========================================
  // 2. HIGHER SECONDARY (+2)
  // ==========================================
  {
    id: "plus-two-orientation-programs",
    title: "+2 Orientation & Academic Welcome",
    institution: "higher-secondary",
    institutionLabel: "Higher Secondary",
    club: "event-management-club",
    clubLabel: "Event Management Club",
    category: "Events & Stage",
    date: "Orientation Assembly",
    description:
      "+2 cohort orientation and formal academic welcome in the main auditorium, featuring stage presentations and mentor addresses.",
    coverImage: {
      src: "/gallery/Event Management/Orientation Program/_GN_1060.jpg",
      alt: "+2 students and faculty gathered during the orientation program.",
      width: 6641,
      height: 4427,
    },
    photos: [
      {
        id: "p2-ori-1",
        src: "/gallery/Event Management/Orientation Program/_GN_1060.jpg",
        alt: "Auditorium packed during the +2 orientation session.",
        width: 6641,
        height: 4427,
        caption:
          "Orientation address to incoming +2 Science and Management scholars.",
      },
      {
        id: "p2-ori-2",
        src: "/gallery/Event Management/Orientation Program/_GN_1124.jpg",
        alt: "Faculty introduction and academic briefing.",
        width: 6720,
        height: 4480,
        caption:
          "Academic department introductions and program curriculum briefing.",
      },
      {
        id: "p2-ori-3",
        src: "/gallery/Event Management/Welcome Program/IMG_9595.JPG",
        alt: "Stage management team in action.",
        width: 5282,
        height: 3521,
        caption:
          "Event management crew coordinating lighting and stage logistics.",
      },
    ],
    photoCount: 3,
  },
  {
    id: "plus-two-science-expo",
    title: "+2 Science & Innovation Expo",
    institution: "higher-secondary",
    institutionLabel: "Higher Secondary",
    club: "science-and-technology-club",
    clubLabel: "Science & Tech Club",
    category: "Academics & Labs",
    date: "Annual Academic Expo",
    description:
      "+2 Science students demonstrating physics mechanics projects, chemistry titration benchmarks, and biological specimen analysis.",
    coverImage: scienceLaboratoryTwo,
    photos: [
      {
        id: "p2-sci-1",
        src: scienceLaboratoryTwo.src,
        alt: scienceLaboratoryTwo.alt,
        width: scienceLaboratoryTwo.width,
        height: scienceLaboratoryTwo.height,
        caption:
          "Practical benchwork with microscopes and titration glassware.",
      },
      {
        id: "p2-sci-2",
        src: "/gallery/Science & Tech/bio Excursion/IMG-4c57ac4b6ca59fd28fd1d147218f6fe3-V.jpg",
        alt: "+2 students conducting biological fieldwork.",
        width: 1600,
        height: 900,
        caption: "Field taxonomy and environmental science research.",
      },
      {
        id: "p2-sci-3",
        src: scienceLaboratory.src,
        alt: scienceLaboratory.alt,
        width: scienceLaboratory.width,
        height: scienceLaboratory.height,
        caption: "Advanced reagent testing and chemical experiments.",
      },
    ],
    photoCount: 3,
  },
  {
    id: "plus-two-futsal-sports",
    title: "+2 Inter-House Sports & Futsal Meet",
    institution: "higher-secondary",
    institutionLabel: "Higher Secondary",
    club: "sports-club",
    clubLabel: "Sports Club",
    category: "Sports & Athletics",
    date: "Annual Athletics Gala",
    description:
      "+2 students competing across inter-house basketball playoffs, indoor badminton, and table tennis championships.",
    coverImage: {
      src: "/gallery/Sports Club/Annual Sports Meet/Basketball.jpg",
      alt: "+2 students competing in the sports tournament.",
      width: 4000,
      height: 3000,
    },
    photos: [
      {
        id: "p2-sp-1",
        src: "/gallery/Sports Club/Annual Sports Meet/Basketball.jpg",
        alt: "Basketball playoffs action.",
        width: 4000,
        height: 3000,
        caption: "Inter-house basketball championship finals.",
      },
      {
        id: "p2-sp-2",
        src: "/gallery/Sports Club/Intra Futsal/4fe72723-53bd-4408-a417-776bb9af9ce1.jfif",
        alt: "Futsal tournament on the turf.",
        width: 1280,
        height: 960,
        caption: "Intra-college futsal league action.",
      },
      {
        id: "p2-sp-3",
        src: "/gallery/Sports Club/Annual Sports Meet/Table Tennis.jpg",
        alt: "Table tennis tournament match.",
        width: 891,
        height: 660,
        caption: "Singles and doubles table tennis playoffs.",
      },
    ],
    photoCount: 3,
  },
  {
    id: "plus-two-social-service",
    title: "+2 Community Outreach & Relief Camp",
    institution: "higher-secondary",
    institutionLabel: "Higher Secondary",
    club: "social-service-club",
    clubLabel: "Social Service Club",
    category: "Social Outreach",
    date: "Community Service Week",
    description:
      "+2 Social Service Club organizing rural relief campaigns, blood donation drives, and educational support programs.",
    coverImage: {
      src: "/gallery/Social Service Club/Donation Camp/4.jpg",
      alt: "+2 students conducting relief work.",
      width: 4000,
      height: 3000,
    },
    photos: [
      {
        id: "p2-soc-1",
        src: "/gallery/Social Service Club/Donation Camp/4.jpg",
        alt: "+2 students sorting relief kits.",
        width: 4000,
        height: 3000,
        caption: "Distributing school supplies and winter relief kits.",
      },
      {
        id: "p2-soc-2",
        src: "/gallery/Social Service Club/Blood Donation/Blood Donation..jpg",
        alt: "Blood donation camp at NAMI campus.",
        width: 986,
        height: 1339,
        caption:
          "Blood donation drive organized in partnership with the Red Cross.",
      },
      {
        id: "p2-soc-3",
        src: studentsOnCampus.src,
        alt: "+2 volunteers packing supplies.",
        width: studentsOnCampus.width,
        height: studentsOnCampus.height,
        caption: "Volunteer team packing aid supplies on campus.",
      },
    ],
    photoCount: 3,
  },
  {
    id: "plus-two-arts-lit",
    title: "+2 Literary Arts & Creative Showcase",
    institution: "higher-secondary",
    institutionLabel: "Higher Secondary",
    club: "art-and-literature-club",
    clubLabel: "Art & Literature Club",
    category: "Arts & Humanities",
    date: "Literary Festival",
    description:
      "+2 Art & Literature Club hosting poetry slams, creative writing symposiums, and fine arts exhibitions.",
    coverImage: {
      src: "/gallery/Art and literature/Art Competition/20251224_101654.jpg",
      alt: "+2 art competition session.",
      width: 4000,
      height: 3000,
    },
    photos: [
      {
        id: "p2-art-1",
        src: "/gallery/Art and literature/Art Competition/20251224_101654.jpg",
        alt: "+2 students sketching and painting.",
        width: 4000,
        height: 3000,
        caption: "Fine arts painting and canvas illustration workshop.",
      },
      {
        id: "p2-art-2",
        src: "/gallery/Art and literature/PPts/IMG-42c20df59da55331efb1eb2055eddc72-V.jpg",
        alt: "Literary deck presentation.",
        width: 1191,
        height: 717,
        caption: "Spoken-word and creative writing symposium.",
      },
      {
        id: "p2-art-3",
        src: readingRoom.src,
        alt: "+2 students reviewing student literature.",
        width: readingRoom.width,
        height: readingRoom.height,
        caption: "Editorial board reviewing publications in the library.",
      },
    ],
    photoCount: 3,
  },

  // ==========================================
  // 3. CAMBRIDGE A-LEVELS
  // ==========================================
  {
    id: "mustang-expedition",
    title: "Mustang Academic Fieldwork",
    institution: "college",
    institutionLabel: "A-Levels",
    club: "environment",
    clubLabel: "Environment Club",
    category: "Field Excursion",
    date: "Autumn Expedition",
    description:
      "Cambridge A-Level scholars on an extensive geological, environmental, and socio-economic fieldwork expedition across the high Himalayan valley of Mustang.",
    coverImage: mustangTrip,
    photos: [
      {
        id: "mustang-1",
        src: mustangTrip.src,
        alt: mustangTrip.alt,
        width: mustangTrip.width,
        height: mustangTrip.height,
        caption:
          "A-Level scholars and mentors gathered along the Mustang valley ridge.",
      },
      {
        id: "mustang-2",
        src: ecoClubFrame.src,
        alt: ecoClubFrame.alt,
        width: ecoClubFrame.width,
        height: ecoClubFrame.height,
        caption: "Eco-club environmental awareness fieldwork.",
      },
      {
        id: "mustang-3",
        src: plantationProgramme.src,
        alt: plantationProgramme.alt,
        width: plantationProgramme.width,
        height: plantationProgramme.height,
        caption: "Community tree plantation during ecological field tour.",
      },
    ],
    photoCount: 3,
  },
  {
    id: "a-levels-service-camp",
    title: "Community Relief & Service Camp",
    institution: "college",
    institutionLabel: "A-Levels",
    club: "social-services",
    clubLabel: "Social Services Club",
    category: "Social Outreach",
    date: "Winter Relief Drive",
    description:
      "NAMI College Social Services Club delivering educational supplies, warm clothes, and community health relief to remote schools in Sindhupalchowk.",
    coverImage: serviceCamp,
    photos: [
      {
        id: "service-1",
        src: serviceCamp.src,
        alt: serviceCamp.alt,
        width: serviceCamp.width,
        height: serviceCamp.height,
        caption:
          "Distributing educational kits and relief bags on the hilltop school ground.",
      },
      {
        id: "service-2",
        src: studentsOnCampus.src,
        alt: studentsOnCampus.alt,
        width: studentsOnCampus.width,
        height: studentsOnCampus.height,
        caption:
          "Volunteer student delegation preparing camp materials on campus.",
      },
    ],
    photoCount: 2,
  },
  {
    id: "a-levels-basketball-championship",
    title: "SEE 3x3 Basketball Championship",
    institution: "college",
    institutionLabel: "A-Levels",
    club: "sports",
    clubLabel: "Sports Club",
    category: "Sports & Games",
    date: "Tournament Finals",
    description:
      "NAMI College hosting regional inter-school basketball playoffs, showcasing athletic teamwork and awarding championship trophies on the main auditorium stage.",
    coverImage: basketballPrizeGiving,
    photos: [
      {
        id: "bb-1",
        src: basketballPrizeGiving.src,
        alt: basketballPrizeGiving.alt,
        width: basketballPrizeGiving.width,
        height: basketballPrizeGiving.height,
        caption:
          "Winners and runners-up receiving medals and tournament cheques on stage.",
      },
      {
        id: "bb-2",
        src: auditoriumGathering.src,
        alt: auditoriumGathering.alt,
        width: auditoriumGathering.width,
        height: auditoriumGathering.height,
        caption: "Audience and student supporters cheering in the auditorium.",
      },
    ],
    photoCount: 2,
  },
  {
    id: "a-levels-arts-crafts",
    title: "A-Levels Creative Arts & Craft Exhibition",
    institution: "college",
    institutionLabel: "A-Levels",
    club: "arts-and-crafts",
    clubLabel: "Arts and Crafts Club",
    category: "Arts & Exhibition",
    date: "Annual Visual Arts Expo",
    description:
      "A-Levels Arts and Crafts Club presenting student paintings, sculptures, stage installations, and visual craftsmanship portfolios.",
    coverImage: {
      src: "/gallery/Art and literature/Art Competition/20251224_101654.jpg",
      alt: "NAMI College A-Levels arts and craftsmanship exhibition.",
      width: 4000,
      height: 3000,
    },
    photos: [
      {
        id: "art-1",
        src: "/gallery/Art and literature/Art Competition/20251224_101654.jpg",
        alt: "Arts and crafts installations by students.",
        width: 4000,
        height: 3000,
        caption: "Creative fine art and canvas painting showcase.",
      },
      {
        id: "art-2",
        src: readingHall.src,
        alt: "Art gallery display in college hall.",
        width: readingHall.width,
        height: readingHall.height,
        caption: "Curated student sketch and canvas gallery.",
      },
    ],
    photoCount: 2,
  },

  // ==========================================
  // 4. BACHELORS & MASTERS (HIGHER EDUCATION)
  // ==========================================
  {
    id: "convocations-orientations",
    title: "Northampton UK Convocation Ceremony",
    institution: "institute",
    institutionLabel: "Bachelors & Masters",
    club: "cultural-arts-club",
    clubLabel: "Cultural & Arts Club",
    category: "Convocations",
    date: "Graduation Gala",
    description:
      "Graduating cohorts receiving British degrees from the University of Northampton, celebrating academic excellence with cap tosses and ceremonial honors.",
    coverImage: convocationCeremony,
    photos: [
      {
        id: "convo-1",
        src: convocationCeremony.src,
        alt: convocationCeremony.alt,
        width: convocationCeremony.width,
        height: convocationCeremony.height,
        caption: "Graduates in ceremonial robes throwing caps into the air.",
      },
      {
        id: "convo-2",
        src: eliteCompetition.src,
        alt: eliteCompetition.alt,
        width: eliteCompetition.width,
        height: eliteCompetition.height,
        caption: "ELITE symposium medalists and IT innovation awardees.",
      },
      {
        id: "convo-3",
        src: bachelorOrientation.src,
        alt: bachelorOrientation.alt,
        width: bachelorOrientation.width,
        height: bachelorOrientation.height,
        caption:
          "Incoming undergraduate cohort orientation and academic welcome.",
      },
    ],
    photoCount: 3,
  },
  {
    id: "elite-tech-symposium",
    title: "ELITE IT & Tech Innovation Summit",
    institution: "institute",
    institutionLabel: "Bachelors & Masters",
    club: "elite-it-club",
    clubLabel: "ELITE IT & Tech Club",
    category: "Innovation & Tech",
    date: "Annual Symposium",
    description:
      "Undergraduate software engineering and computing students showcasing AI applications, cybersecurity systems, and live industry panel discussions.",
    coverImage: eliteCompetition,
    photos: [
      {
        id: "elite-1",
        src: eliteCompetition.src,
        alt: eliteCompetition.alt,
        width: eliteCompetition.width,
        height: eliteCompetition.height,
        caption:
          "Computing students celebrating victory at the tech innovation awards.",
      },
      {
        id: "elite-2",
        src: climatePanel.src,
        alt: climatePanel.alt,
        width: climatePanel.width,
        height: climatePanel.height,
        caption:
          "Industry panel discussion on emerging tech and environmental science.",
      },
      {
        id: "elite-3",
        src: readingHall.src,
        alt: readingHall.alt,
        width: readingHall.width,
        height: readingHall.height,
        caption:
          "Higher education research library and dedicated reading suites.",
      },
    ],
    photoCount: 3,
  },
  {
    id: "campus-research-labs",
    title: "Research Facilities & Academic Suites",
    institution: "institute",
    institutionLabel: "Bachelors & Masters",
    club: "elite-it-club",
    clubLabel: "ELITE IT & Tech Club",
    category: "Infrastructure",
    date: "Academic Spaces",
    description:
      "State-of-the-art university-standard computing centers, advanced chemistry laboratories, and multi-floor silent reading libraries.",
    coverImage: scienceLaboratory,
    photos: [
      {
        id: "lab-1",
        src: scienceLaboratory.src,
        alt: scienceLaboratory.alt,
        width: scienceLaboratory.width,
        height: scienceLaboratory.height,
        caption: "Main university-standard chemistry and research laboratory.",
      },
      {
        id: "lab-2",
        src: readingRoom.src,
        alt: readingRoom.alt,
        width: readingRoom.width,
        height: readingRoom.height,
        caption: "Central campus library and reference catalog desk.",
      },
      {
        id: "lab-3",
        src: christmasHall.src,
        alt: christmasHall.alt,
        width: christmasHall.width,
        height: christmasHall.height,
        caption: "Student festive gala and auditorium celebrations.",
      },
    ],
    photoCount: 3,
  },
  {
    id: "bachelors-sports-meet",
    title: "University Inter-Faculty Sports Tournament",
    institution: "institute",
    institutionLabel: "Bachelors & Masters",
    club: "sports-club",
    clubLabel: "Sports Club",
    category: "Sports & Games",
    date: "Annual Faculty Cup",
    description:
      "BSc (Hons) Computing, BBA, and MBA cohorts competing in inter-faculty futsal, basketball, and table tennis championships.",
    coverImage: basketballPrizeGiving,
    photos: [
      {
        id: "ug-sp-1",
        src: basketballPrizeGiving.src,
        alt: "Undergraduate basketball and sports victory.",
        width: basketballPrizeGiving.width,
        height: basketballPrizeGiving.height,
        caption: "Faculty Cup championship trophy and medal ceremony.",
      },
      {
        id: "ug-sp-2",
        src: "/gallery/Sports Club/Annual Sports Meet/Basketball.jpg",
        alt: "Undergraduate sports tournament action.",
        width: 4000,
        height: 3000,
        caption: "Inter-faculty sporting action on campus basketball court.",
      },
    ],
    photoCount: 2,
  },
  {
    id: "bachelors-social-welfare",
    title: "Higher Education Community Welfare Initiative",
    institution: "institute",
    institutionLabel: "Bachelors & Masters",
    club: "social-welfare-club",
    clubLabel: "Social Welfare Club",
    category: "Social Welfare",
    date: "Outreach Drive",
    description:
      "Undergraduate and postgraduate students leading health awareness, digital literacy camps, and emergency community aid.",
    coverImage: {
      src: "/gallery/Social Service Club/Donation Camp/4.jpg",
      alt: "Higher education social welfare project.",
      width: 4000,
      height: 3000,
    },
    photos: [
      {
        id: "ug-welf-1",
        src: "/gallery/Social Service Club/Donation Camp/4.jpg",
        alt: "Higher education social welfare project.",
        width: 4000,
        height: 3000,
        caption: "Delivering educational and welfare resources to communities.",
      },
      {
        id: "ug-welf-2",
        src: "/gallery/Social Service Club/Blood Donation/Blood Donation..jpg",
        alt: "Higher education blood donation initiative.",
        width: 986,
        height: 1339,
        caption: "Campus blood donation campaign with university volunteers.",
      },
    ],
    photoCount: 2,
  },
];

export const instituteFilters = [
  { id: "all", label: "All Institutions" },
  { id: "primary", label: "Primary" },
  { id: "higher-secondary", label: "Higher Secondary" },
  { id: "college", label: "A-Levels" },
  { id: "institute", label: "Bachelors & Masters" },
] as const;

export const galleryCategories = [
  { id: "all", label: "All Themes" },
  { id: "events", label: "Events & Festivals" },
  { id: "academics", label: "Labs & Academics" },
  { id: "student-life", label: "Excursions & Fieldwork" },
  { id: "sports", label: "Sports & Games" },
  { id: "graduation", label: "Convocations" },
  { id: "campus", label: "Campus Spaces" },
] as const;

export const galleryCopy = {
  meta: {
    title: "Gallery & Visual Archive | NAMI",
    description:
      "Explore the photographic record of NAMI in Kathmandu — Primary, Higher Secondary, Cambridge A-Levels, and University of Northampton Bachelors & Masters.",
  },
  masthead: {
    eyebrow: null,
    heading: "Life at NAMI",
    standfirst: null,
  },
  allLabel: "All Institutions",
  filterGroupLabel: "Filter by institution",
  clubFilterLabel: "Filter by club",
  categoryGroupLabel: "Filter by category",
  searchPlaceholder:
    "Search event folders (e.g. Mustang, Convocation, Robotics, Sports)...",
  layoutMosaic: "Masonry Mosaic",
  layoutGrid: "Uniform Grid",
  viewingAlbumPrefix: "Viewing Collection",
  clearFilter: "Clear filter",
  resetAll: "Reset all filters",
  filterOptionLabel: (label: string, name: string | null) =>
    name === null ? label : `${label} — ${name}`,
  unattributedNote:
    "Photographs are catalogued across Primary, Higher Secondary, A-Levels, and Higher Education.",
  emptyState:
    "No event folders matched your selected filters. Try selecting 'All Institutions' or 'All Clubs'.",
  emptyArchive:
    "There are no photographs on record yet. They will appear here as the group publishes them.",
} as const;
