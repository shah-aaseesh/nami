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
  readonly category: string;
  readonly date: string;
  readonly description: string;
  readonly coverImage: ContentImage;
  readonly photos: readonly EventPhoto[];
  readonly photoCount: number;
};

export const eventAlbums: readonly EventAlbum[] = [
  // 1. PRIMARY SCHOOL
  {
    id: "school-national-dress-day",
    title: "National Dress Day Celebration",
    institution: "primary",
    institutionLabel: "Primary",
    category: "Culture & Celebrations",
    date: "Annual Cultural Day",
    description:
      "Pupils celebrating Nepal's rich cultural heritage in traditional attire, participating in namaste greetings, folk dances, and cultural storytelling in classrooms.",
    coverImage: {
      src: "/nami/school/nami-school-national-dress-day.jpg",
      alt: "NAMI International School pupils in Nepali national dress standing in namaste on a classroom floor.",
      width: 1000,
      height: 750,
    },
    photos: [
      {
        id: "dress-1",
        src: "/nami/school/nami-school-national-dress-day.jpg",
        alt: "Pupils in traditional Nepali Daura Suruwal and Gunyu Cholo standing in namaste.",
        width: 1000,
        height: 750,
        caption:
          "Pupils greeting teachers and guests in traditional Nepali dress.",
      },
      {
        id: "dress-2",
        src: "/nami/school/nami-school-digital-classroom.jpeg",
        alt: "Pupils engaged in interactive smart-board learning in digital classroom.",
        width: 1200,
        height: 800,
        caption:
          "Smart classroom interactive activities celebrating national festivals.",
      },
      {
        id: "dress-3",
        src: "/nami/school/nami-school-cafeteria.jpg",
        alt: "Pupils enjoying nutritious meals during festival feast.",
        width: 1000,
        height: 700,
        caption: "School cafeteria dining and cultural feast.",
      },
      {
        id: "dress-4",
        src: "/nami/school/nami-school-library.jpg",
        alt: "Junior students exploring illustrated folklore books in the primary reading corner.",
        width: 1000,
        height: 750,
        caption:
          "Storytelling and folklore reading session in the school library.",
      },
    ],
    photoCount: 4,
  },
  {
    id: "school-junior-sports",
    title: "Junior Sports & Track Day",
    institution: "primary",
    institutionLabel: "Primary",
    category: "Sports & Athletics",
    date: "Annual Sports Meet",
    description:
      "Primary students engaging in mini-football tournaments, sprint relays, obstacle courses, and playground team games on the school turf.",
    coverImage: {
      src: "/nami/school/nami-minifootball.jpg",
      alt: "Pupils playing mini football on the green turf playground.",
      width: 1000,
      height: 750,
    },
    photos: [
      {
        id: "sports-1",
        src: "/nami/school/nami-minifootball.jpg",
        alt: "Pupils playing mini football on the green turf playground.",
        width: 1000,
        height: 750,
        caption: "Inter-class mini-football championship on the primary turf.",
      },
      {
        id: "sports-2",
        src: "/nami/school/nami-school-play-ground.jpg",
        alt: "Outdoor playground with recreational slides, swings, and climbing sets.",
        width: 1000,
        height: 750,
        caption: "Playground activities and physical agility games.",
      },
      {
        id: "sports-3",
        src: "/nami/school/nami-school-bus.jpg",
        alt: "School fleet ready for safe athletic excursion transport.",
        width: 1000,
        height: 700,
        caption: "Safe student transit fleet for outdoor sports days.",
      },
    ],
    photoCount: 3,
  },
  {
    id: "school-stem-discovery",
    title: "Junior Science & ICT Discovery",
    institution: "primary",
    institutionLabel: "Primary",
    category: "Academics & Labs",
    date: "Science & Tech Week",
    description:
      "Hands-on scientific demonstrations, interactive computer lab coding sessions, and discovery experiments in primary labs.",
    coverImage: {
      src: "/nami/school/nami-school-science-lab.jpg",
      alt: "Junior science laboratory with apparatus, models, and interactive demonstration tables.",
      width: 1000,
      height: 750,
    },
    photos: [
      {
        id: "stem-1",
        src: "/nami/school/nami-school-science-lab.jpg",
        alt: "Junior science laboratory with apparatus, models, and interactive demonstration tables.",
        width: 1000,
        height: 750,
        caption: "Junior science practical lab experiments.",
      },
      {
        id: "stem-2",
        src: "/nami/school/nami-school-computer-lab.jpg",
        alt: "Modern computer lab with individual workstations for digital literacy.",
        width: 1000,
        height: 750,
        caption: "Coding and digital literacy workshops in the ICT lab.",
      },
      {
        id: "stem-3",
        src: "/nami/school/nami-international-school-auditorium.jpg",
        alt: "School auditorium hosting the junior science symposium.",
        width: 1000,
        height: 750,
        caption: "Junior science project presentations in the auditorium.",
      },
    ],
    photoCount: 3,
  },

  // 2. HIGHER SECONDARY (+2)
  {
    id: "plus-two-science-expo",
    title: "+2 Science & Innovation Expo",
    institution: "higher-secondary",
    institutionLabel: "Higher Secondary",
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
        src: "/nami/level-plus-two.jpg",
        alt: "+2 students collaborating on science coursework.",
        width: 1000,
        height: 667,
        caption: "+2 Science and Management cohort collaborative research.",
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
    title: "+2 Inter-House Sports Meet",
    institution: "higher-secondary",
    institutionLabel: "Higher Secondary",
    category: "Sports & Athletics",
    date: "Annual Athletics Gala",
    description:
      "+2 students competing across inter-house basketball playoffs, indoor badminton, and table tennis championships.",
    coverImage: {
      src: "/nami/campus-sports.jpg",
      alt: "+2 students celebrating sports tournament victory.",
      width: 1000,
      height: 667,
    },
    photos: [
      {
        id: "p2-sp-1",
        src: "/nami/campus-sports.jpg",
        alt: "+2 students celebrating sports tournament victory.",
        width: 1000,
        height: 667,
        caption: "Inter-house athletic finals and championship ceremonies.",
      },
      {
        id: "p2-sp-2",
        src: basketballPrizeGiving.src,
        alt: basketballPrizeGiving.alt,
        width: basketballPrizeGiving.width,
        height: basketballPrizeGiving.height,
        caption: "Prize distribution and medal presentation.",
      },
    ],
    photoCount: 2,
  },

  // 3. CAMBRIDGE A-LEVELS
  {
    id: "mustang-expedition",
    title: "Mustang Academic Fieldwork",
    institution: "college",
    institutionLabel: "A-Levels",
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

  // 4. BACHELORS & MASTERS (HIGHER EDUCATION)
  {
    id: "convocations-orientations",
    title: "Northampton UK Convocation Ceremony",
    institution: "institute",
    institutionLabel: "Bachelors & Masters",
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
    "No event folders matched your selected institution filter or search query. Try selecting 'All Institutions'.",
  emptyArchive:
    "There are no photographs on record yet. They will appear here as the group publishes them.",
} as const;
