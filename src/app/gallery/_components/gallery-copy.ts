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
  // ==========================================
  // 1. NAMI INTERNATIONAL SCHOOL (PRIMARY)
  // ==========================================
  {
    id: "primary-academic-discovery",
    title: "Primary Academic Discovery & Math Olympiad",
    institution: "primary",
    institutionLabel: "Primary",
    club: "science-and-technology-club",
    clubLabel: "Junior STEM & Academics",
    category: "Academics & Labs",
    date: "Academic Year Highlights",
    description:
      "Interactive number line activities, math debate league, heritage visits to Basantapur Square, and Math Olympiad championships.",
    coverImage: {
      src: "/gallery/Primary School/Academic/Math Olympiad 2026.jpg",
      alt: "NAMI Primary School students celebrating Math Olympiad achievements.",
      width: 1600,
      height: 1200,
    },
    photos: [
      {
        id: "pri-acad-1",
        src: "/gallery/Primary School/Academic/Math Olympiad 2026.jpg",
        alt: "Math Olympiad 2026 medalists and certificate ceremony.",
        width: 1600,
        height: 1200,
        caption: "Math Olympiad champions with award certificates.",
      },
      {
        id: "pri-acad-2",
        src: "/gallery/Primary School/Academic/Basantapur Square academicvisit.jpg",
        alt: "Primary pupils during an experiential learning visit to Basantapur Durbar Square.",
        width: 1600,
        height: 1200,
        caption: "Experiential heritage and history learning in Basantapur.",
      },
      {
        id: "pri-acad-3",
        src: "/gallery/Primary School/Academic/Human Number Line Activity.jpg",
        alt: "Pupils learning dynamic mathematical concepts through human number lines.",
        width: 1600,
        height: 1200,
        caption: "Courtyard human number line hands-on math activity.",
      },
      {
        id: "pri-acad-4",
        src: "/gallery/Primary School/Academic/Math Debate League 2026.jpeg",
        alt: "Students actively participating in the Math Debate League.",
        width: 1600,
        height: 1200,
        caption: "Primary Math Debate League debate session.",
      },
      {
        id: "pri-acad-5",
        src: "/gallery/Primary School/Academic/career path.jpg",
        alt: "Interactive career discovery and health education in classrooms.",
        width: 1600,
        height: 1200,
        caption: "Career pathways and health awareness session.",
      },
      {
        id: "pri-acad-6",
        src: "/gallery/Primary School/Academic/identifying living and non-living things.jpg",
        alt: "Younger learners classifying living and non-living objects in nature.",
        width: 1600,
        height: 1200,
        caption: "Practical science: living vs. non-living classification.",
      },
    ],
    photoCount: 6,
  },
  {
    id: "primary-cultural-celebrations",
    title: "World Cultural Diversity & Nepali Literature Day",
    institution: "primary",
    institutionLabel: "Primary",
    club: "art-and-literature-club",
    clubLabel: "Cultural & Arts Circle",
    category: "Culture & Celebrations",
    date: "Cultural Festival",
    description:
      "Celebrations of World Cultural Diversity Day in vibrant traditional attire, along with Sahityik Diwas literary recitations.",
    coverImage: {
      src: "/gallery/Primary School/Cultural/World Day for Cultural Diversity 2026.jpg",
      alt: "Primary children celebrating World Day for Cultural Diversity in traditional costumes.",
      width: 1600,
      height: 1200,
    },
    photos: [
      {
        id: "pri-cult-1",
        src: "/gallery/Primary School/Cultural/World Day for Cultural Diversity 2026.jpg",
        alt: "Students showcasing ethnic cultural costumes and traditional attire.",
        width: 1600,
        height: 1200,
        caption: "World Day for Cultural Diversity grand parade and showcase.",
      },
      {
        id: "pri-cult-2",
        src: "/gallery/Primary School/Cultural/World Day for Cultural Diversity 20261.jpg",
        alt: "Pupils celebrating diversity with traditional musical and dance performances.",
        width: 1600,
        height: 1200,
        caption: "Traditional cultural performance on the school stage.",
      },
      {
        id: "pri-cult-3",
        src: "/gallery/Primary School/Cultural/saahitik diwas.jpeg",
        alt: "Nepali literary day poetry recitation and storytelling.",
        width: 1600,
        height: 1200,
        caption: "Sahityik Diwas poetry and creative prose recitation.",
      },
      {
        id: "pri-cult-4",
        src: "/gallery/Primary School/Cultural/xyz.jpeg",
        alt: "Children participating in festive cultural music and dance sessions.",
        width: 1600,
        height: 1200,
        caption: "Cultural performance and traditional harmony festival.",
      },
    ],
    photoCount: 4,
  },
  {
    id: "primary-school-events-festivals",
    title: "Literacy Week, Environment Drive & Bhanu Jayanti",
    institution: "primary",
    institutionLabel: "Primary",
    club: "event-management-club",
    clubLabel: "School Events Council",
    category: "Events & Stage",
    date: "Annual Celebrations",
    description:
      "School-wide celebrations including National Literacy Week reading sessions, Bhanu Jayanti literary tributes, and Environment Week.",
    coverImage: {
      src: "/gallery/Primary School/Events/Literacy week.jpg",
      alt: "Primary pupils engaged in reading and library literacy sessions.",
      width: 1600,
      height: 1200,
    },
    photos: [
      {
        id: "pri-evt-1",
        src: "/gallery/Primary School/Events/Literacy week.jpg",
        alt: "Literacy week book reading and storytelling assembly.",
        width: 1600,
        height: 1200,
        caption: "Literacy Week storytelling and book appreciation circle.",
      },
      {
        id: "pri-evt-2",
        src: "/gallery/Primary School/Events/Environment Week.jpg",
        alt: "Pupils taking part in environmental protection activities.",
        width: 1600,
        height: 1200,
        caption: "Environment Week campus greening and eco-initiatives.",
      },
      {
        id: "pri-evt-3",
        src: "/gallery/Primary School/Events/भानु जयन्ती.jpg",
        alt: "Bhanu Jayanti celebration honoring classical Nepali literature.",
        width: 1600,
        height: 1200,
        caption: "Bhanu Jayanti celebration with traditional poetry recitals.",
      },
      {
        id: "pri-evt-4",
        src: "/gallery/Primary School/Events/Literacy week1.jpg",
        alt: "Junior readers sharing book reviews with classmates.",
        width: 1600,
        height: 1200,
        caption: "Interactive reading workshop and creative storytelling.",
      },
    ],
    photoCount: 4,
  },
  {
    id: "primary-school-life-workshops",
    title: "Claymation, Museum Trips & Dhan Ropai Festival",
    institution: "primary",
    institutionLabel: "Primary",
    club: "art-and-literature-club",
    clubLabel: "Experiential Learning",
    category: "Campus Life",
    date: "School Year Journey",
    description:
      "Stop-motion claymation workshops, museum field excursions, Dashain celebrations, oral hygiene camps, and traditional Dhan Ropai festivities.",
    coverImage: {
      src: "/gallery/Primary School/School Life/CLAYMATION.jpg",
      alt: "Primary students creating clay models for stop-motion claymation.",
      width: 1600,
      height: 1200,
    },
    photos: [
      {
        id: "pri-life-1",
        src: "/gallery/Primary School/School Life/CLAYMATION.jpg",
        alt: "Stop-motion clay animation hands-on workshop.",
        width: 1600,
        height: 1200,
        caption: "Hands-on stop-motion clay sculpture and animation.",
      },
      {
        id: "pri-life-2",
        src: "/gallery/Primary School/School Life/field trip to the National Museum of Nepal.jpg",
        alt: "Excursion to the National Museum of Nepal.",
        width: 1600,
        height: 1200,
        caption: "Exploring national history at the National Museum of Nepal.",
      },
      {
        id: "pri-life-3",
        src: "/gallery/Primary School/School Life/Zero Waste Workshop.jpg",
        alt: "Primary pupils learning zero-waste recycling and sustainability.",
        width: 1600,
        height: 1200,
        caption: "Zero Waste and eco-craft workshop on campus.",
      },
      {
        id: "pri-life-4",
        src: "/gallery/Primary School/School Life/dashain.jpeg",
        alt: "Dashain festival cultural celebration and swings.",
        width: 1600,
        height: 1200,
        caption: "Dashain celebration with blessings and cultural traditions.",
      },
      {
        id: "pri-life-5",
        src: "/gallery/Primary School/School Life/Oral Health Camp and Oral Hygiene Awareness Session.jpg",
        alt: "Oral hygiene camp and dentist check-up for primary students.",
        width: 1600,
        height: 1200,
        caption: "Comprehensive dental check-up and oral hygiene session.",
      },
      {
        id: "pri-life-6",
        src: "/gallery/Primary School/School Life/धान रोपाइँ.jpg",
        alt: "Students taking part in Dhan Ropai rice plantation festival.",
        width: 1600,
        height: 1200,
        caption: "Dhan Ropai: experiential agriculture and rice planting.",
      },
    ],
    photoCount: 6,
  },
  {
    id: "primary-sports-taekwondo-leagues",
    title: "Inter-School Obstacle Challenge & Taekwondo Championships",
    institution: "primary",
    institutionLabel: "Primary",
    club: "sports-club",
    clubLabel: "Primary Sports Academy",
    category: "Sports & Athletics",
    date: "Championship Season",
    description:
      "Primary athletes excelling at the Play Nepal Obstacle Course Challenge and winning international honors at the IOFTC Taekwondo Championship.",
    coverImage: {
      src: "/gallery/Primary School/Sports/Play Nepal IOCC 2026 Obstacle Challenge.jpg",
      alt: "Primary students racing through the Play Nepal Obstacle Course Challenge.",
      width: 1600,
      height: 1200,
    },
    photos: [
      {
        id: "pri-sp-1",
        src: "/gallery/Primary School/Sports/Play Nepal IOCC 2026 Obstacle Challenge.jpg",
        alt: "Obstacle course agility challenge and athletics.",
        width: 1600,
        height: 1200,
        caption: "Play Nepal Inter-School Obstacle Course agility race.",
      },
      {
        id: "pri-sp-2",
        src: "/gallery/Primary School/Sports/25th Anniversary of IOFTC & 15th International Open Friendship Taekwondo Championship 2025.jpeg",
        alt: "Young Taekwondo champions holding medals at the IOFTC 2025 championship.",
        width: 1600,
        height: 1200,
        caption: "15th International Open Friendship Taekwondo medalists.",
      },
      {
        id: "pri-sp-3",
        src: "/gallery/Primary School/Sports/NepalChampionLeague2082.jpeg",
        alt: "Pupils celebrating victories in the Nepal Champion League 2082.",
        width: 1600,
        height: 1200,
        caption: "Nepal Champion League 2082 athletics delegation.",
      },
      {
        id: "pri-sp-4",
        src: "/gallery/Primary School/Sports/Taekwondo Championship.jpg",
        alt: "Martial arts belt grading and sparring tournament.",
        width: 1600,
        height: 1200,
        caption: "Taekwondo sparring and forms demonstration.",
      },
    ],
    photoCount: 4,
  },

  // ==========================================
  // 2. HIGHER SECONDARY (+2)
  // ==========================================
  {
    id: "plus-two-academic-practical",
    title: "Hotel Management Culinary Labs & KIST Science Fair",
    institution: "higher-secondary",
    institutionLabel: "Higher Secondary",
    club: "science-and-technology-club",
    clubLabel: "Science & Management",
    category: "Academics & Labs",
    date: "Practical Workshops",
    description:
      "+2 Management students performing hands-on culinary workshops alongside +2 Science cohorts presenting at the KIST Fair 2081.",
    coverImage: {
      src: "/gallery/Higher Secondary/Academic/HotelManagementHandsOnlearning.jpeg",
      alt: "Higher Secondary Hotel Management students in culinary lab training.",
      width: 1600,
      height: 1200,
    },
    photos: [
      {
        id: "p2-acad-1",
        src: "/gallery/Higher Secondary/Academic/HotelManagementHandsOnlearning.jpeg",
        alt: "Hands-on culinary practical and hospitality training in the kitchen lab.",
        width: 1600,
        height: 1200,
        caption: "Hotel Management culinary arts & hospitality workshop.",
      },
      {
        id: "p2-acad-2",
        src: "/gallery/Higher Secondary/Academic/KIST FAIR- 2081.jpeg",
        alt: "+2 Science scholars presenting innovations at the KIST Fair 2081.",
        width: 1600,
        height: 1200,
        caption: "+2 Science innovations at the KIST Fair 2081.",
      },
      {
        id: "p2-acad-3",
        src: "/gallery/Higher Secondary/Academic/XI.jpeg",
        alt: "Grade XI cohort attending interactive academic lectures.",
        width: 1600,
        height: 1200,
        caption: "Grade XI lecture and project discussion session.",
      },
    ],
    photoCount: 3,
  },
  {
    id: "plus-two-events-ceremonies",
    title: "Investiture Ceremony, Holi Fest & Zero Plastic 2040",
    institution: "higher-secondary",
    institutionLabel: "Higher Secondary",
    club: "event-management-club",
    clubLabel: "Event Management Club",
    category: "Events & Stage",
    date: "Campus Assemblies",
    description:
      "Formal investiture of student council leaders, Spring Holi celebrations, Welcome ceremonies, and the Zero Plastic 2040 campus sustainability drive.",
    coverImage: {
      src: "/gallery/Higher Secondary/Events/investiture ceremony.jpeg",
      alt: "Higher Secondary student leaders taking the pledge during the Investiture Ceremony.",
      width: 1600,
      height: 1200,
    },
    photos: [
      {
        id: "p2-evt-1",
        src: "/gallery/Higher Secondary/Events/investiture ceremony.jpeg",
        alt: "Student Council investiture ceremony and badge pinning on stage.",
        width: 1600,
        height: 1200,
        caption: "Leadership sash and badge pinning at the Investiture Ceremony.",
      },
      {
        id: "p2-evt-2",
        src: "/gallery/Higher Secondary/Events/HOLI.jpeg",
        alt: "+2 cohort celebrating Spring Holi with vibrant organic colors on campus.",
        width: 1600,
        height: 1200,
        caption: "Spring Holi festival celebrations with friends and faculty.",
      },
      {
        id: "p2-evt-3",
        src: "/gallery/Higher Secondary/Events/Zero Plastic 2040.jpg",
        alt: "Zero Plastic 2040 campus environmental pledge and banner signing.",
        width: 1600,
        height: 1200,
        caption: "Zero Plastic 2040 eco-awareness commitment.",
      },
      {
        id: "p2-evt-4",
        src: "/gallery/Higher Secondary/Events/welcome program.jpeg",
        alt: "Fresher welcome ceremony and stage presentations.",
        width: 1600,
        height: 1200,
        caption: "Academic welcome program welcoming the new +2 batch.",
      },
    ],
    photoCount: 4,
  },
  {
    id: "plus-two-sports-championships",
    title: "Basketball Tournament 2082, Taekwondo & Futsal Cup",
    institution: "higher-secondary",
    institutionLabel: "Higher Secondary",
    club: "sports-club",
    clubLabel: "Sports Club",
    category: "Sports & Athletics",
    date: "Athletics Season",
    description:
      "+2 athletes winning the Basketball Tournament 2082, competing in the Japan Open International Taekwondo Championship, and playing annual futsal leagues.",
    coverImage: {
      src: "/gallery/Higher Secondary/Sports/Basketball Tournament—2082.jpeg",
      alt: "Higher Secondary basketball champions hoisting trophy at Basketball Tournament 2082.",
      width: 1600,
      height: 1200,
    },
    photos: [
      {
        id: "p2-sp-1",
        src: "/gallery/Higher Secondary/Sports/Basketball Tournament—2082.jpeg",
        alt: "Trophy celebration after winning the Basketball Tournament 2082.",
        width: 1600,
        height: 1200,
        caption: "Basketball Tournament 2082 victory celebration.",
      },
      {
        id: "p2-sp-2",
        src: "/gallery/Higher Secondary/Sports/Japan Open International Taekwondo Championship.jpeg",
        alt: "Taekwondo players representing NAMI at the Japan Open International Championship.",
        width: 1600,
        height: 1200,
        caption: "Japan Open International Taekwondo Championship team.",
      },
      {
        id: "p2-sp-3",
        src: "/gallery/Higher Secondary/Sports/futsal.jpeg",
        alt: "+2 futsal tournament team lineup on the court.",
        width: 1600,
        height: 1200,
        caption: "Intra-college futsal league match and playoffs.",
      },
      {
        id: "p2-sp-4",
        src: "/gallery/Higher Secondary/Sports/basketballt.jpeg",
        alt: "Fast-paced offensive basketball match.",
        width: 1600,
        height: 1200,
        caption: "Inter-college basketball championship playoffs.",
      },
    ],
    photoCount: 4,
  },
  {
    id: "plus-two-educational-tour",
    title: "Educational Field Tour, Farewell & Campus Life",
    institution: "higher-secondary",
    institutionLabel: "Higher Secondary",
    club: "event-management-club",
    clubLabel: "Student Council",
    category: "Campus Life",
    date: "Annual Excursion",
    description:
      "Experiential multi-day educational tours across scenic Nepal, farewell banquets, and memorable campus life moments.",
    coverImage: {
      src: "/gallery/Higher Secondary/School Life/tour.jpeg",
      alt: "Higher Secondary students on an educational mountain tour in Nepal.",
      width: 1600,
      height: 1200,
    },
    photos: [
      {
        id: "p2-tour-1",
        src: "/gallery/Higher Secondary/School Life/tour.jpeg",
        alt: "Group photograph of students during the educational excursion tour.",
        width: 1600,
        height: 1200,
        caption: "Annual educational field tour across scenic Nepal.",
      },
      {
        id: "p2-tour-2",
        src: "/gallery/Higher Secondary/School Life/Educational Tour.jpeg",
        alt: "Field learning and scenic nature excursion.",
        width: 1600,
        height: 1200,
        caption: "Experiential outdoor study and heritage excursion.",
      },
      {
        id: "p2-tour-3",
        src: "/gallery/Higher Secondary/School Life/farewell.jpeg",
        alt: "+2 graduating batch farewell gala and awards banquet.",
        width: 1600,
        height: 1200,
        caption: "Graduating batch farewell banquet and celebrations.",
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
