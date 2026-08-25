import { entryOf, isoDate } from "../identifiers";
import type { ContentImage, GalleryItem } from "../types";
import {
  auditoriumGathering,
  bachelorOrientation,
  basketballPrizeGiving,
  christmasHall,
  climatePanel,
  convocationCeremony,
  ecoClubFrame,
  eliteCompetition,
  mascotDesignEntry,
  mustangTrip,
  plantationProgramme,
  readingHall,
  readingRoom,
  schoolTransport,
  scienceLaboratory,
  serviceCamp,
  studentsOnCampus,
} from "./images";

const campusSports: ContentImage = {
  src: "/nami/campus-sports.jpg",
  alt: "Students on the NAMI sports ground during a college tournament or sports day.",
  width: 1500,
  height: 1000,
};

const campusInfirmary: ContentImage = {
  src: "/nami/campus-infirmary.jpg",
  alt: "The NAMI infirmary, a small treatment room kept ready for students.",
  width: 600,
  height: 400,
};

const campusChristmasTree: ContentImage = {
  src: "/nami/campus-christmas-tree.jpg",
  alt: "NAMI students decorating a tall outdoor Christmas tree with balloons and ornaments in the courtyard outside the Academic Block, one student on a ladder reaching into the upper branches.",
  width: 1064,
  height: 709,
};

const schoolAuditoriumAssembly: ContentImage = {
  src: "/nami/school/nami-international-school-auditorium.jpg",
  alt: "Rows of NAMI International School pupils seated in stacking chairs inside the auditorium, hands folded in namaste, red triangular acoustic panelling on the wall behind them.",
  width: 1000,
  height: 1333,
};

const schoolMinifootballGoal: ContentImage = {
  src: "/nami/school/nami-minifootball.jpg",
  alt: "A NAMI International School playground corner with a mini football goal frame on the lawn, potted plants on the boundary wall and a painted tyre-guard fence around the young trees.",
  width: 993,
  height: 1051,
};

const schoolNationalDressDay: ContentImage = {
  src: "/nami/school/nami-school-national-dress-day.jpg",
  alt: "Nine NAMI International School pupils in Nepali national dress standing in namaste on a foam-mat classroom floor, notice boards and a wall clock behind them.",
  width: 1000,
  height: 750,
};

const schoolBusFleet: ContentImage = {
  src: "/nami/school/nami-school-bus.jpg",
  alt: "Two liveried NAMI International School minibuses parked nose-to-tail in the school forecourt, the entrance signage and boundary wall visible behind them.",
  width: 1000,
  height: 602,
};

const schoolCafeteria: ContentImage = {
  src: "/nami/school/nami-school-cafeteria.jpg",
  alt: "The NAMI International School cafeteria, rows of empty wooden tables and chairs beneath ceiling-mounted air conditioners, a serving counter and water dispenser along the far wall.",
  width: 1000,
  height: 1333,
};

const schoolComputerLab: ContentImage = {
  src: "/nami/school/nami-school-computer-lab.jpg",
  alt: "NAMI International School students in blazers and ties working at desktop computers in the computer lab, dark curtains drawn behind the last row of monitors.",
  width: 712,
  height: 666,
};

const schoolDigitalClassroom: ContentImage = {
  src: "/nami/school/nami-school-digital-classroom.jpeg",
  alt: "A teacher gesturing at a wall-mounted interactive display in a NAMI International School classroom, a red rectangle drawn on the whiteboard app behind her raised hand.",
  width: 1125,
  height: 1066,
};

const schoolInfirmaryWard: ContentImage = {
  src: "/nami/school/nami-school-infirmity.jpg",
  alt: "A NAMI International School infirmary room, two made-up beds with floral linen and side rails, a wall-mounted fan beside the blinds.",
  width: 1000,
  height: 1333,
};

const schoolLibraryReadingNook: ContentImage = {
  src: "/nami/school/nami-school-library.jpg",
  alt: "A boy reading on a hexagonal yellow cushioned nook built into the NAMI International School library shelving, picture books ranked in the honeycomb compartments beside him.",
  width: 1000,
  height: 1333,
};

const schoolPlayground: ContentImage = {
  src: "/nami/school/nami-school-play-ground.jpg",
  alt: "The NAMI International School playground, children on a spring rider and swings beside a slide and tunnel set, a tyre and seesaw on the grass in front of the boundary wall.",
  width: 993,
  height: 1051,
};

const schoolScienceLabPractical: ContentImage = {
  src: "/nami/school/nami-school-science-lab.jpg",
  alt: "A NAMI International School teacher in a lab coat and safety goggles guiding three uniformed students through a titration at the science lab bench, reagent bottles ranked on the shelves behind them.",
  width: 1000,
  height: 666,
};

export const gallery: readonly GalleryItem[] = [
  {
    ...entryOf("mustang-academic-trip"),
    category: "student-life",
    institution: "college",
    title: "Mustang Academic Trip",
    image: mustangTrip,
    date: isoDate("2023-12-08"),
  },
  {
    ...entryOf("school-transport"),
    category: "campus",
    institution: "school",
    title: "School Transport",
    image: schoolTransport,
    date: null,
  },
  {
    ...entryOf("chemistry-laboratory"),
    category: "academics",
    institution: "school",
    title: "Chemistry Laboratory",
    image: scienceLaboratory,
    date: null,
  },
  {
    ...entryOf("students-on-campus"),
    category: "student-life",
    institution: "college",
    title: "Students at College",
    image: studentsOnCampus,
    date: null,
  },
  {
    ...entryOf("college-library"),
    category: "academics",
    institution: "institute",
    title: "College Library",
    image: readingRoom,
    date: null,
  },
  {
    ...entryOf("reading-hall"),
    category: "academics",
    institution: "college",
    title: "Reading Hall",
    image: readingHall,
    date: null,
  },
  {
    ...entryOf("auditorium-gathering"),
    category: "campus",
    institution: "college",
    title: "Auditorium Gathering",
    image: auditoriumGathering,
    date: null,
  },
  {
    ...entryOf("service-camp-sindhupalchowk"),
    category: "student-life",
    institution: "school",
    title: "Service Camp, Sindhupalchowk",
    image: serviceCamp,
    date: isoDate("2024-01-27"),
  },
  {
    ...entryOf("see-3x3-basketball-prize-giving"),
    category: "sports",
    institution: "college",
    title: "SEE 3x3 Basketball Prize-Giving",
    image: basketballPrizeGiving,
    date: isoDate("2024-05-16"),
  },
  {
    ...entryOf("christmas-at-city-campus"),
    category: "events",
    institution: "institute",
    title: "Christmas at City College",
    image: christmasHall,
    date: isoDate("2023-12-24"),
  },
  {
    ...entryOf("eco-club-environment-day"),
    category: "events",
    institution: "college",
    title: "Eco Club Environment Day",
    image: ecoClubFrame,
    date: isoDate("2023-06-05"),
  },
  {
    ...entryOf("mascot-design-competition"),
    category: "events",
    institution: "college",
    title: "Mascot Design Competition",
    image: mascotDesignEntry,
    date: isoDate("2023-05-03"),
  },
  {
    ...entryOf("elite-2023"),
    category: "graduation",
    institution: "institute",
    title: "ELITE 2023",
    image: eliteCompetition,
    date: isoDate("2023-03-31"),
  },
  {
    ...entryOf("climate-change-panel"),
    category: "events",
    institution: "institute",
    title: "Climate Change Panel",
    image: climatePanel,
    date: isoDate("2023-03-23"),
  },
  {
    ...entryOf("bachelors-orientation-2022"),
    category: "graduation",
    institution: "institute",
    title: "Bachelor's Orientation 2022",
    image: bachelorOrientation,
    date: isoDate("2022-11-14"),
  },
  {
    ...entryOf("convocation-2022"),
    category: "graduation",
    institution: "institute",
    title: "Convocation 2022",
    image: convocationCeremony,
    date: isoDate("2022-09-17"),
  },
  {
    ...entryOf("world-environment-day-plantation"),
    category: "student-life",
    institution: "college",
    title: "World Environment Day Plantation",
    image: plantationProgramme,
    date: isoDate("2022-06-05"),
  },
  {
    ...entryOf("campus-tournament"),
    category: "sports",
    institution: "college",
    title: "College Tournament",
    image: campusSports,
    date: null,
  },
  {
    ...entryOf("inter-house-match"),
    category: "sports",
    institution: "college",
    title: "Inter-House Match",
    image: campusSports,
    date: null,
  },
  {
    ...entryOf("campus-infirmary"),
    category: "campus",
    institution: "school",
    title: "School Infirmary",
    image: campusInfirmary,
    date: null,
  },
  {
    ...entryOf("christmas-tree-decorating"),
    category: "events",
    institution: "college",
    title: "Christmas Tree Decorating",
    image: campusChristmasTree,
    date: isoDate("2023-12-22"),
  },
  {
    ...entryOf("school-auditorium-assembly"),
    category: "campus",
    institution: "school",
    title: "School Auditorium Assembly",
    image: schoolAuditoriumAssembly,
    date: null,
  },
  {
    ...entryOf("school-minifootball-goal"),
    category: "campus",
    institution: "school",
    title: "Playground Goal Corner",
    image: schoolMinifootballGoal,
    date: null,
  },
  {
    ...entryOf("school-national-dress-day"),
    category: "events",
    institution: "school",
    title: "National Dress Day",
    image: schoolNationalDressDay,
    date: null,
  },
  {
    ...entryOf("school-bus-fleet"),
    category: "campus",
    institution: "school",
    title: "School Bus Fleet",
    image: schoolBusFleet,
    date: null,
  },
  {
    ...entryOf("school-cafeteria"),
    category: "campus",
    institution: "school",
    title: "School Cafeteria",
    image: schoolCafeteria,
    date: null,
  },
  {
    ...entryOf("school-computer-lab"),
    category: "academics",
    institution: "school",
    title: "Computer Lab",
    image: schoolComputerLab,
    date: null,
  },
  {
    ...entryOf("school-digital-classroom"),
    category: "academics",
    institution: "school",
    title: "Digital Classroom",
    image: schoolDigitalClassroom,
    date: null,
  },
  {
    ...entryOf("school-infirmary-ward"),
    category: "campus",
    institution: "school",
    title: "Infirmary Ward",
    image: schoolInfirmaryWard,
    date: null,
  },
  {
    ...entryOf("school-library-reading-nook"),
    category: "academics",
    institution: "school",
    title: "Library Reading Nook",
    image: schoolLibraryReadingNook,
    date: null,
  },
  {
    ...entryOf("school-playground"),
    category: "campus",
    institution: "school",
    title: "School Playground",
    image: schoolPlayground,
    date: null,
  },
  {
    ...entryOf("school-science-lab-practical"),
    category: "academics",
    institution: "school",
    title: "Science Lab Practical",
    image: schoolScienceLabPractical,
    date: null,
  },
];
