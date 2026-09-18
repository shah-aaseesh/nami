"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { Icon } from "@/components/ui/icon";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
  PlayIcon,
  QuoteIcon,
} from "@/lib/icons";
import { cn } from "@/lib/utils";

export type GalleryInstitution =
  | "all"
  | "primary"
  | "higher-secondary"
  | "a-levels"
  | "bachelors";

export type SubcategoryIconType =
  | "grid"
  | "tech"
  | "sports"
  | "math"
  | "arts"
  | "culture"
  | "trips"
  | "science"
  | "social"
  | "events"
  | "business"
  | "convocation"
  | "music";

export type SubcategoryItem = {
  readonly id: string;
  readonly label: string;
  readonly shortLabel: string;
  readonly iconType: SubcategoryIconType;
  readonly thumbnail?: string;
};

export type GalleryCategory =
  | "all"
  | "academics"
  | "campus-life"
  | "events"
  | "sports"
  | "achievements";

export type InstitutionTab = {
  readonly id: GalleryInstitution;
  readonly label: string;
  readonly badgeLabel: string;
};

export const INSTITUTION_TABS: readonly InstitutionTab[] = [
  { id: "all", label: "All Institutions", badgeLabel: "All" },
  { id: "primary", label: "Primary (Grades I–VII)", badgeLabel: "Primary" },
  { id: "higher-secondary", label: "+2 Higher Secondary", badgeLabel: "+2" },
  { id: "a-levels", label: "A-Levels", badgeLabel: "A-Levels" },
  { id: "bachelors", label: "Bachelors & Masters", badgeLabel: "Degree" },
];

export const INSTITUTION_SUBCATEGORIES: Record<GalleryInstitution, readonly SubcategoryItem[]> = {
  all: [
    { id: "all", label: "All Moments", shortLabel: "All Highlights", iconType: "grid", thumbnail: "/nami/gallery-hero.jpg" },
    { id: "academics", label: "Academics & Labs", shortLabel: "Academics", iconType: "math", thumbnail: "/gallery/Bachelors/Academic/ai.jpeg" },
    { id: "clubs", label: "Clubs & Activities", shortLabel: "Clubs", iconType: "social", thumbnail: "/gallery/A-levels/Events/farewell.jpeg" },
    { id: "events", label: "Events & Festivals", shortLabel: "Events", iconType: "events", thumbnail: "/gallery/Higher Secondary/Events/HOLI.jpeg" },
    { id: "sports", label: "Sports & Athletics", shortLabel: "Sports", iconType: "sports", thumbnail: "/gallery/A-levels/Sports/xyz.jpeg" },
    { id: "achievements", label: "Convocations & Wins", shortLabel: "Honors", iconType: "convocation", thumbnail: "/gallery/Bachelors/Events/graduation.jpeg" },
  ],
  primary: [
    { id: "all", label: "All Primary Activities", shortLabel: "All Primary", iconType: "grid", thumbnail: "/nami/level-school.jpg" },
    { id: "tech-3di", label: "3Di School New Zealand", shortLabel: "3Di School", iconType: "tech", thumbnail: "/collaborators/3di.png" },
    { id: "sports-playnepal", label: "Play Nepal Sports", shortLabel: "Play Nepal", iconType: "sports", thumbnail: "/collaborators/play-nepal.png" },
    { id: "academics-math", label: "UnMath Programme", shortLabel: "UnMath", iconType: "math", thumbnail: "/collaborators/unmath.png" },
    { id: "mero-coding", label: "Mero Coding Hub", shortLabel: "Mero Coding", iconType: "tech", thumbnail: "/collaborators/mero-coding.png" },
    { id: "samatva-wellness", label: "Samatva Wellness & Vaav", shortLabel: "Samatva", iconType: "culture", thumbnail: "/collaborators/samatva-wellness.png" },
    { id: "others", label: "Other School Activities", shortLabel: "Others", iconType: "arts", thumbnail: "/gallery/Primary School/School Life/CLAYMATION.jpg" },
  ],
  "higher-secondary": [
    { id: "all", label: "All (+2) Activities", shortLabel: "All (+2)", iconType: "grid", thumbnail: "/nami/level-plus-two.jpg" },
    { id: "sports-club", label: "Sports Club", shortLabel: "Sports Club", iconType: "sports", thumbnail: "/gallery/Higher Secondary/Sports/Basketball Tournament—2082.jpeg" },
    { id: "science-tech", label: "Science & Tech Club", shortLabel: "Science & Tech", iconType: "science", thumbnail: "/gallery/Higher Secondary/Academic/KIST FAIR- 2081.jpeg" },
    { id: "social-service", label: "Social Service Club", shortLabel: "Social Service", iconType: "social", thumbnail: "/gallery/Higher Secondary/Events/Social Service Club.jpeg" },
    { id: "event-management", label: "Event Management Club", shortLabel: "Events Club", iconType: "events", thumbnail: "/gallery/Higher Secondary/Events/HOLI.jpeg" },
    { id: "art-literature", label: "Art & Literature Club", shortLabel: "Art & Lit", iconType: "arts", thumbnail: "/gallery/Higher Secondary/Events/intra-school art competition .jpeg" },
    { id: "academic-tours", label: "Academics & Tours", shortLabel: "Study Tours", iconType: "math", thumbnail: "/gallery/Higher Secondary/School Life/Educational Tour.jpeg" },
  ],
  "a-levels": [
    { id: "all", label: "All A-Levels Activities", shortLabel: "All A-Levels", iconType: "grid", thumbnail: "/nami/level-a-level.jpg" },
    { id: "sports", label: "Sports Club", shortLabel: "Sports Club", iconType: "sports", thumbnail: "/gallery/A-levels/Sports/karate.jpeg" },
    { id: "social-services", label: "Social Services Club", shortLabel: "Social Services", iconType: "social", thumbnail: "/nami/hero-mustang.jpg" },
    { id: "arts-crafts", label: "Arts & Crafts Club", shortLabel: "Arts & Crafts", iconType: "arts", thumbnail: "/gallery/A-levels/Events/xyz.jpeg" },
    { id: "academics", label: "Cambridge Academics", shortLabel: "Academics", iconType: "math", thumbnail: "/gallery/A-levels/Academic/xyz1.jpeg" },
    { id: "student-life", label: "Student Life & Fests", shortLabel: "Student Life", iconType: "events", thumbnail: "/gallery/A-levels/Events/farewell.jpeg" },
  ],
  bachelors: [
    { id: "all", label: "All Degree Activities", shortLabel: "All Degree", iconType: "grid", thumbnail: "/nami/level-bachelor-master.jpg" },
    { id: "websurfer", label: "WebSurfer Nepal", shortLabel: "WebSurfer", iconType: "tech", thumbnail: "/partners/mou/websurfer.png" },
    { id: "startup-discovery", label: "Startup Discovery Asia", shortLabel: "Startup Asia", iconType: "business", thumbnail: "/partners/mou/startup-discovery-asia.svg" },
    { id: "machan", label: "Machan Wildlife Resort", shortLabel: "Machan Resort", iconType: "science", thumbnail: "/partners/mou/machan.png" },
    { id: "suraj-interior", label: "Suraj Interior & Design", shortLabel: "Suraj Interior", iconType: "arts", thumbnail: "/partners/mou/suraj-interior.svg" },
    { id: "cross-web", label: "Cross Web IT Solutions", shortLabel: "Cross Web", iconType: "tech", thumbnail: "/partners/mou/cross-web.svg" },
    { id: "others", label: "Other Degree Activities", shortLabel: "Others", iconType: "convocation", thumbnail: "/gallery/Bachelors/Events/graduation.jpeg" },
  ],
};

export type CategoryFilterTab = {
  readonly id: GalleryCategory;
  readonly label: string;
  readonly iconType: "grid" | "mortarboard" | "users" | "calendar" | "sports" | "trophy";
};

export const CATEGORY_TABS: readonly CategoryFilterTab[] = [
  { id: "all", label: "All Moments", iconType: "grid" },
  { id: "academics", label: "Academics", iconType: "mortarboard" },
  { id: "campus-life", label: "Campus Life", iconType: "users" },
  { id: "events", label: "Events", iconType: "calendar" },
  { id: "sports", label: "Sports", iconType: "sports" },
  { id: "achievements", label: "Achievements", iconType: "trophy" },
];

export type GalleryMoment = {
  readonly id: string;
  readonly title: string;
  readonly category: GalleryCategory;
  readonly institution: GalleryInstitution;
  readonly institutionLabel: string;
  readonly subcategory?: string;
  readonly type: "image" | "quote" | "video";
  readonly src?: string;
  readonly alt?: string;
  readonly videoUrl?: string;
  readonly quote?: {
    readonly text: string;
    readonly author: string;
  };
};

export const GALLERY_MOMENTS: readonly GalleryMoment[] = [
  // --- ROW 1 ---
  {
    id: "moment-1",
    title: "WebSurfer Industry AI & Computing Lab",
    category: "academics",
    institution: "bachelors",
    institutionLabel: "Bachelors / Masters",
    subcategory: "websurfer",
    type: "image",
    src: "/gallery/Bachelors/Academic/ai.jpeg",
    alt: "University students in interactive AI workshop and computing lab",
  },
  {
    id: "moment-2",
    title: "A-Levels Campus Life & Student Celebrations",
    category: "campus-life",
    institution: "a-levels",
    institutionLabel: "A-Levels",
    subcategory: "student-life",
    type: "image",
    src: "/gallery/A-levels/Events/xyz1.jpeg",
    alt: "A-Levels students on campus during annual events",
  },
  {
    id: "moment-3",
    title: "Higher Secondary Holi Fest & Campus Celebrations",
    category: "events",
    institution: "higher-secondary",
    institutionLabel: "Higher Secondary (+2)",
    subcategory: "event-management",
    type: "image",
    src: "/gallery/Higher Secondary/Events/HOLI.jpeg",
    alt: "+2 cohort celebrating Spring Holi with vibrant organic colors on campus",
  },

  // --- ROW 2 ---
  {
    id: "moment-4",
    title: "Primary Interactive Smart Classroom",
    category: "academics",
    institution: "primary",
    institutionLabel: "Primary",
    subcategory: "tech-3di",
    type: "image",
    src: "/nami/level-school.jpg",
    alt: "Primary school faculty teaching in interactive modern classroom",
  },
  {
    id: "moment-5",
    title: "A-Levels Inter-House Basketball League",
    category: "sports",
    institution: "a-levels",
    institutionLabel: "A-Levels",
    subcategory: "sports",
    type: "image",
    src: "/gallery/A-levels/Sports/xyz.jpeg",
    alt: "A-Levels students playing basketball in sports fixture",
  },
  {
    id: "moment-6",
    title: "Cross Web Data Innovation & Computing Laboratory",
    category: "academics",
    institution: "bachelors",
    institutionLabel: "Bachelors / Masters",
    subcategory: "cross-web",
    type: "image",
    src: "/gallery/Bachelors/Academic/ai1.jpeg",
    alt: "Students coding and working in university computing laboratory",
  },

  // --- ROW 3 ---
  {
    id: "moment-7",
    title: "A-Levels Cultural Fest & Stage Performances",
    category: "events",
    institution: "a-levels",
    institutionLabel: "A-Levels",
    subcategory: "arts-crafts",
    type: "image",
    src: "/gallery/A-levels/Events/xyz.jpeg",
    alt: "Students performing cultural and musical items on stage",
  },
  {
    id: "moment-8",
    title: "Inspirational Quote Card",
    category: "all",
    institution: "all",
    institutionLabel: "NAMI",
    type: "quote",
    quote: {
      text: "The future belongs to those who believe in the beauty of their dreams.",
      author: "Eleanor Roosevelt",
    },
  },
  {
    id: "moment-9",
    title: "Primary Junior Explorers Walk",
    category: "campus-life",
    institution: "primary",
    institutionLabel: "Primary",
    subcategory: "others",
    type: "image",
    src: "/nami/event-plantation-2022.jpg",
    alt: "Students walking through university campus garden with books",
  },

  // --- ROW 4 ---
  {
    id: "moment-10",
    title: "University Convocation & Degree Award Ceremony",
    category: "achievements",
    institution: "bachelors",
    institutionLabel: "Bachelors / Masters",
    subcategory: "others",
    type: "image",
    src: "/gallery/Bachelors/Events/graduation.jpeg",
    alt: "Graduating class in formal convocation caps and gowns",
  },
  {
    id: "moment-11",
    title: "Annual Music Fest Live Performance",
    category: "events",
    institution: "bachelors",
    institutionLabel: "Bachelors / Masters",
    subcategory: "others",
    type: "video",
    src: "/nami/event-elite-2023.jpg",
    videoUrl: "/nami-video.mp4",
    alt: "Student musician playing acoustic guitar and singing on stage",
  },
  {
    id: "moment-12",
    title: "A-Levels Graduating Class Farewell Gala",
    category: "events",
    institution: "a-levels",
    institutionLabel: "A-Levels",
    subcategory: "student-life",
    type: "image",
    src: "/gallery/A-levels/Events/farewell.jpeg",
    alt: "A-Levels farewell celebration and gathering",
  },

  // ==========================================
  // --- BACHELORS / MASTERS GALLERY MOMENTS ---
  // ==========================================
  {
    id: "bachelors-academic-ai3",
    title: "WebSurfer Telecom & High-Performance Computing Seminar",
    category: "academics",
    institution: "bachelors",
    institutionLabel: "Bachelors / Masters",
    subcategory: "websurfer",
    type: "image",
    src: "/gallery/Bachelors/Academic/ai3.jpeg",
    alt: "Students attending advanced machine learning and computing lecture",
  },
  {
    id: "bachelors-academic-internship",
    title: "Startup Discovery Asia Corporate Internship Induction",
    category: "academics",
    institution: "bachelors",
    institutionLabel: "Bachelors / Masters",
    subcategory: "startup-discovery",
    type: "image",
    src: "/gallery/Bachelors/Academic/internship.jpeg",
    alt: "Bachelors students during corporate internship onboarding",
  },
  {
    id: "bachelors-event-climate-ai",
    title: "Machan Eco-Tourism & Climate AI Symposium",
    category: "events",
    institution: "bachelors",
    institutionLabel: "Bachelors / Masters",
    subcategory: "machan",
    type: "image",
    src: "/gallery/Bachelors/Events/ClimateAI.jpeg",
    alt: "University symposium focusing on climate change and artificial intelligence",
  },
  {
    id: "bachelors-event-climate-ai-panel",
    title: "Machan Wildlife Resort Sustainability Panel",
    category: "events",
    institution: "bachelors",
    institutionLabel: "Bachelors / Masters",
    subcategory: "machan",
    type: "image",
    src: "/gallery/Bachelors/Events/ClimateAI1.jpeg",
    alt: "Panel session with experts and students discussing climate solutions",
  },
  {
    id: "bachelors-event-pitchday",
    title: "Startup Discovery Asia Venture Pitch Day",
    category: "achievements",
    institution: "bachelors",
    institutionLabel: "Bachelors / Masters",
    subcategory: "startup-discovery",
    type: "image",
    src: "/gallery/Bachelors/Events/pitchday.jpeg",
    alt: "Undergraduate student entrepreneurs pitching business ideas",
  },
  {
    id: "bachelors-event-pitchday-presentation",
    title: "Cross Web Office Automation & Software Showcase",
    category: "events",
    institution: "bachelors",
    institutionLabel: "Bachelors / Masters",
    subcategory: "cross-web",
    type: "image",
    src: "/gallery/Bachelors/Events/pitchday1.jpeg",
    alt: "Students presenting technical project before panel of judges",
  },
  {
    id: "bachelors-event-suraj-interior",
    title: "Suraj Interior Architecture & Space Design Study",
    category: "academics",
    institution: "bachelors",
    institutionLabel: "Bachelors / Masters",
    subcategory: "suraj-interior",
    type: "image",
    src: "/gallery/Bachelors/College Life/tour.jpeg",
    alt: "University design and engineering students during spatial architecture study",
  },
  {
    id: "bachelors-event-graduation-gala",
    title: "Graduating Batch Convocation Celebration",
    category: "achievements",
    institution: "bachelors",
    institutionLabel: "Bachelors / Masters",
    subcategory: "others",
    type: "image",
    src: "/gallery/Bachelors/Events/graduation1.jpeg",
    alt: "Graduates celebrating convocation milestone",
  },
  {
    id: "bachelors-sports-esport",
    title: "Inter-University Esports League & Gaming Arena",
    category: "sports",
    institution: "bachelors",
    institutionLabel: "Bachelors / Masters",
    subcategory: "others",
    type: "image",
    src: "/gallery/Bachelors/Sports/esport.jpeg",
    alt: "Bachelors students competing in university esports tournament",
  },
  {
    id: "bachelors-sports-esport-finals",
    title: "Campus Esports Championship Grand Finals",
    category: "sports",
    institution: "bachelors",
    institutionLabel: "Bachelors / Masters",
    subcategory: "others",
    type: "image",
    src: "/gallery/Bachelors/Sports/esport1.jpeg",
    alt: "Finals stage match of inter-college gaming cup",
  },
  {
    id: "bachelors-college-life-tour",
    title: "University Educational Excursion & Field Study",
    category: "campus-life",
    institution: "bachelors",
    institutionLabel: "Bachelors / Masters",
    subcategory: "others",
    type: "image",
    src: "/gallery/Bachelors/College Life/tour.jpeg",
    alt: "Bachelors students group photograph during national field excursion",
  },

  // ==========================================
  // --- A-LEVELS GALLERY MOMENTS ---
  // ==========================================
  {
    id: "a-level-academic-1",
    title: "Cambridge A-Levels Classroom & Academic Seminars",
    category: "academics",
    institution: "a-levels",
    institutionLabel: "A-Levels",
    subcategory: "academics",
    type: "image",
    src: "/gallery/A-levels/Academic/xyz.jpeg",
    alt: "A-Levels students engaged in academic seminar",
  },
  {
    id: "a-level-academic-2",
    title: "A-Levels Science Laboratory & Research Practicals",
    category: "academics",
    institution: "a-levels",
    institutionLabel: "A-Levels",
    subcategory: "academics",
    type: "image",
    src: "/gallery/A-levels/Academic/xyz1.jpeg",
    alt: "A-Levels science practicals and laboratory session",
  },
  {
    id: "a-level-academic-3",
    title: "Cambridge Interactive Learning Sessions",
    category: "academics",
    institution: "a-levels",
    institutionLabel: "A-Levels",
    subcategory: "academics",
    type: "image",
    src: "/gallery/A-levels/Academic/xyz2.jpeg",
    alt: "Interactive study and group discussions",
  },
  {
    id: "a-level-sports-karate",
    title: "A-Levels Martial Arts & Karate Demonstration",
    category: "sports",
    institution: "a-levels",
    institutionLabel: "A-Levels",
    subcategory: "sports",
    type: "image",
    src: "/gallery/A-levels/Sports/karate.jpeg",
    alt: "Students demonstrating martial arts in the dojo",
  },
  {
    id: "a-level-sports-gala",
    title: "A-Levels Sports Gala & Track Competitions",
    category: "sports",
    institution: "a-levels",
    institutionLabel: "A-Levels",
    subcategory: "sports",
    type: "image",
    src: "/gallery/A-levels/Sports/xyz1.jpeg",
    alt: "Track and field sports meet in progress",
  },
  {
    id: "a-level-sports-futsal",
    title: "A-Levels Futsal Championship Tournament",
    category: "sports",
    institution: "a-levels",
    institutionLabel: "A-Levels",
    subcategory: "sports",
    type: "image",
    src: "/gallery/A-levels/Sports/xyz2.jpeg",
    alt: "Futsal match action on campus turf",
  },
  {
    id: "a-level-sports-indoor",
    title: "Indoor Games, Badminton & Table Tennis",
    category: "sports",
    institution: "a-levels",
    institutionLabel: "A-Levels",
    subcategory: "sports",
    type: "image",
    src: "/gallery/A-levels/Sports/xyz3.jpeg",
    alt: "Indoor sports and recreational games",
  },
  {
    id: "a-level-sports-awards",
    title: "Annual Sports Award & Medal Distribution",
    category: "achievements",
    institution: "a-levels",
    institutionLabel: "A-Levels",
    subcategory: "sports",
    type: "image",
    src: "/gallery/A-levels/Sports/xyz4.jpeg",
    alt: "Students receiving awards and medals",
  },
  {
    id: "a-level-events-farewell-2",
    title: "Farewell Felicitations & Batch Celebration",
    category: "events",
    institution: "a-levels",
    institutionLabel: "A-Levels",
    subcategory: "student-life",
    type: "image",
    src: "/gallery/A-levels/Events/farewell1.jpeg",
    alt: "Students celebrating with teachers and classmates",
  },
  {
    id: "a-level-events-freshers",
    title: "A-Levels Orientation & Welcome Reception",
    category: "events",
    institution: "a-levels",
    institutionLabel: "A-Levels",
    subcategory: "student-life",
    type: "image",
    src: "/gallery/A-levels/Events/xyz2.jpeg",
    alt: "New batch welcome ceremonies and campus orientation",
  },
  {
    id: "a-level-social-services-camp",
    title: "Mustang Academic & Community Service Trip",
    category: "events",
    institution: "a-levels",
    institutionLabel: "A-Levels",
    subcategory: "social-services",
    type: "image",
    src: "/nami/hero-mustang.jpg",
    alt: "A-Levels students on community and ecological trip in Mustang",
  },

  // ==========================================
  // --- HIGHER SECONDARY (+2) GALLERY MOMENTS ---
  // ==========================================
  {
    id: "moment-higher-sec-hotel-management",
    title: "Hotel Management Culinary & Table Service Practicals",
    category: "academics",
    institution: "higher-secondary",
    institutionLabel: "Higher Secondary (+2)",
    subcategory: "academic-tours",
    type: "image",
    src: "/gallery/Higher Secondary/Academic/HotelManagementHandsOnlearning.jpeg",
    alt: "+2 Hotel Management students demonstrating culinary and guest service skills",
  },
  {
    id: "moment-higher-sec-hotel-management-2",
    title: "Hospitality Industry Simulation Laboratory",
    category: "academics",
    institution: "higher-secondary",
    institutionLabel: "Higher Secondary (+2)",
    subcategory: "academic-tours",
    type: "image",
    src: "/gallery/Higher Secondary/Academic/HotelManagementHandsOnlearning1.jpeg",
    alt: "Hospitality students preparing dining presentation",
  },
  {
    id: "moment-higher-sec-kist-fair",
    title: "KIST Science & Technology Innovation Fair 2081",
    category: "academics",
    institution: "higher-secondary",
    institutionLabel: "Higher Secondary (+2)",
    subcategory: "science-tech",
    type: "image",
    src: "/gallery/Higher Secondary/Academic/KIST FAIR- 2081.jpeg",
    alt: "+2 Science students showcasing science and engineering models at KIST Fair",
  },
  {
    id: "moment-higher-sec-kist-fair-2",
    title: "Robotics & Hardware Prototype Demonstration",
    category: "academics",
    institution: "higher-secondary",
    institutionLabel: "Higher Secondary (+2)",
    subcategory: "science-tech",
    type: "image",
    src: "/gallery/Higher Secondary/Academic/KIST FAIR1- 2081.jpeg",
    alt: "Students presenting engineering projects to visitors",
  },
  {
    id: "moment-higher-sec-event-plastic",
    title: "Zero Plastic 2040 Campus Sustainability Pledge",
    category: "events",
    institution: "higher-secondary",
    institutionLabel: "Higher Secondary (+2)",
    subcategory: "event-management",
    type: "image",
    src: "/gallery/Higher Secondary/Events/Zero Plastic 2040.jpg",
    alt: "+2 students and teachers taking the Zero Plastic 2040 pledge on campus",
  },
  {
    id: "moment-higher-sec-art-competition",
    title: "Intra-School Visual Arts & Creative Painting Contest",
    category: "events",
    institution: "higher-secondary",
    institutionLabel: "Higher Secondary (+2)",
    subcategory: "art-literature",
    type: "image",
    src: "/gallery/Higher Secondary/Events/intra-school art competition .jpeg",
    alt: "+2 students creating paintings and sketches during art competition",
  },
  {
    id: "moment-higher-sec-art-competition-2",
    title: "Fine Arts Exhibition & Gallery Presentation",
    category: "events",
    institution: "higher-secondary",
    institutionLabel: "Higher Secondary (+2)",
    subcategory: "art-literature",
    type: "image",
    src: "/gallery/Higher Secondary/Events/intra-school art competition 1.jpeg",
    alt: "Creative art showcase displayed along the campus corridor",
  },
  {
    id: "moment-higher-sec-social-service",
    title: "Youth Social Service Club Community Drive",
    category: "events",
    institution: "higher-secondary",
    institutionLabel: "Higher Secondary (+2)",
    subcategory: "social-service",
    type: "image",
    src: "/gallery/Higher Secondary/Events/Social Service Club.jpeg",
    alt: "+2 Social Service Club students leading community awareness drive",
  },
  {
    id: "moment-higher-sec-social-service-2",
    title: "Campus Blood Donation & Health Campaign",
    category: "events",
    institution: "higher-secondary",
    institutionLabel: "Higher Secondary (+2)",
    subcategory: "social-service",
    type: "image",
    src: "/gallery/Higher Secondary/Events/Social Service Club1.jpeg",
    alt: "Students organizing health camp and blood donation registration",
  },
  {
    id: "moment-higher-sec-sports-1",
    title: "Basketball Tournament 2082 Championship Victory",
    category: "sports",
    institution: "higher-secondary",
    institutionLabel: "Higher Secondary (+2)",
    subcategory: "sports-club",
    type: "image",
    src: "/gallery/Higher Secondary/Sports/Basketball Tournament—2082.jpeg",
    alt: "Higher Secondary basketball team lifting championship trophy",
  },
  {
    id: "moment-higher-sec-sports-2",
    title: "Inter-College Basketball Championship Match",
    category: "sports",
    institution: "higher-secondary",
    institutionLabel: "Higher Secondary (+2)",
    subcategory: "sports-club",
    type: "image",
    src: "/gallery/Higher Secondary/Sports/Basketball Tournament—20821.jpeg",
    alt: "+2 basketball match in progress with roaring crowds",
  },
  {
    id: "moment-higher-sec-futsal",
    title: "Annual +2 Futsal Championship League",
    category: "sports",
    institution: "higher-secondary",
    institutionLabel: "Higher Secondary (+2)",
    subcategory: "sports-club",
    type: "image",
    src: "/gallery/Higher Secondary/Sports/futsal.jpeg",
    alt: "Action photograph from the +2 futsal tournament finals",
  },
  {
    id: "moment-higher-sec-tour",
    title: "Higher Secondary Educational & Cultural Excursion",
    category: "campus-life",
    institution: "higher-secondary",
    institutionLabel: "Higher Secondary (+2)",
    subcategory: "academic-tours",
    type: "image",
    src: "/gallery/Higher Secondary/School Life/Educational Tour.jpeg",
    alt: "Group photograph of students during educational tour",
  },

  // ==========================================
  // --- PRIMARY SCHOOL GALLERY MOMENTS ---
  // ==========================================
  {
    id: "moment-primary-1",
    title: "Math Olympiad & Mental Math Champions",
    category: "academics",
    institution: "primary",
    institutionLabel: "Primary",
    subcategory: "academics-math",
    type: "image",
    src: "/gallery/Primary School/Academic/Math Olympiad 2026.jpg",
    alt: "Primary pupils celebrating Math Olympiad achievements",
  },
  {
    id: "moment-primary-2",
    title: "Basantapur Heritage & History Excursion",
    category: "academics",
    institution: "primary",
    institutionLabel: "Primary",
    subcategory: "others",
    type: "image",
    src: "/gallery/Primary School/Academic/Basantapur Square academicvisit.jpg",
    alt: "Primary school students visiting Basantapur Durbar Square",
  },
  {
    id: "moment-primary-3",
    title: "Interactive Human Number Line Activity",
    category: "academics",
    institution: "primary",
    institutionLabel: "Primary",
    subcategory: "academics-math",
    type: "image",
    src: "/gallery/Primary School/Academic/Human Number Line Activity.jpg",
    alt: "Pupils learning mathematics on the courtyard number line",
  },
  {
    id: "moment-primary-4",
    title: "World Day for Cultural Diversity Celebrations",
    category: "events",
    institution: "primary",
    institutionLabel: "Primary",
    subcategory: "others",
    type: "image",
    src: "/gallery/Primary School/Cultural/World Day for Cultural Diversity 2026.jpg",
    alt: "Primary school cultural diversity day performances and traditional attire",
  },
  {
    id: "moment-primary-5",
    title: "National Literacy & Book Reading Week",
    category: "events",
    institution: "primary",
    institutionLabel: "Primary",
    subcategory: "others",
    type: "image",
    src: "/gallery/Primary School/Events/Literacy week.jpg",
    alt: "Students engaging in library storytelling and reading activities",
  },
  {
    id: "moment-primary-6",
    title: "Claymation & Creative Art Workshop",
    category: "campus-life",
    institution: "primary",
    institutionLabel: "Primary",
    subcategory: "others",
    type: "image",
    src: "/gallery/Primary School/School Life/CLAYMATION.jpg",
    alt: "Primary pupils crafting stop-motion clay characters",
  },
  {
    id: "moment-primary-7",
    title: "Field Trip to the National Museum of Nepal",
    category: "campus-life",
    institution: "primary",
    institutionLabel: "Primary",
    subcategory: "others",
    type: "image",
    src: "/gallery/Primary School/School Life/field trip to the National Museum of Nepal.jpg",
    alt: "Primary children discovering historic artifacts at the national museum",
  },
  {
    id: "moment-primary-8",
    title: "Play Nepal Inter-School Obstacle Course Challenge",
    category: "sports",
    institution: "primary",
    institutionLabel: "Primary",
    subcategory: "sports-playnepal",
    type: "image",
    src: "/gallery/Primary School/Sports/Play Nepal IOCC 2026 Obstacle Challenge.jpg",
    alt: "Primary pupils navigating athletic obstacle course challenges",
  },
  {
    id: "moment-primary-9",
    title: "International Open Friendship Taekwondo Championship",
    category: "sports",
    institution: "primary",
    institutionLabel: "Primary",
    subcategory: "sports-playnepal",
    type: "image",
    src: "/gallery/Primary School/Sports/25th Anniversary of IOFTC & 15th International Open Friendship Taekwondo Championship 2025.jpeg",
    alt: "Primary martial arts pupils with championship medals and certificates",
  },
  {
    id: "moment-primary-10",
    title: "3Di School Innovation & Science Exploration",
    category: "academics",
    institution: "primary",
    institutionLabel: "Primary",
    subcategory: "tech-3di",
    type: "image",
    src: "/gallery/Primary School/Academic/identifying living and non-living things.jpg",
    alt: "Primary students working with 3Di science models and specimens",
  },
  {
    id: "moment-primary-11",
    title: "Zero Waste & Ecological Stewardship Workshop",
    category: "campus-life",
    institution: "primary",
    institutionLabel: "Primary",
    subcategory: "tech-3di",
    type: "image",
    src: "/gallery/Primary School/School Life/Zero Waste Workshop.jpg",
    alt: "Primary pupils learning zero-waste recycling and sustainability practices",
  },
  {
    id: "moment-primary-12",
    title: "Mero Coding Robotics & Project Model Making",
    category: "academics",
    institution: "primary",
    institutionLabel: "Primary",
    subcategory: "mero-coding",
    type: "image",
    src: "/gallery/Primary School/School Life/project model-making.jpg",
    alt: "Primary pupils building project models and exploring coding logic",
  },
  {
    id: "moment-primary-13",
    title: "Mero Coding Digital Logic & Career Horizons",
    category: "academics",
    institution: "primary",
    institutionLabel: "Primary",
    subcategory: "mero-coding",
    type: "image",
    src: "/gallery/Primary School/Academic/career path.jpg",
    alt: "Primary students attending computational thinking and tech workshop",
  },
  {
    id: "moment-primary-14",
    title: "Samatva Wellness Yoga & Mindfulness Practice",
    category: "campus-life",
    institution: "primary",
    institutionLabel: "Primary",
    subcategory: "samatva-wellness",
    type: "image",
    src: "/gallery/Primary School/School Life/yoga.jpg",
    alt: "Primary children practicing mindful movement and yoga on campus",
  },
  {
    id: "moment-primary-15",
    title: "Samatva Oral Health & Hygiene Awareness Camp",
    category: "campus-life",
    institution: "primary",
    institutionLabel: "Primary",
    subcategory: "samatva-wellness",
    type: "image",
    src: "/gallery/Primary School/School Life/Oral Health Camp and Oral Hygiene Awareness Session.jpg",
    alt: "Primary pupils in health and hygiene education workshop",
  },
];

function BubbleIcon({ iconType }: { readonly iconType: SubcategoryIconType }) {
  switch (iconType) {
    case "grid":
      return (
        <svg className="size-6 sm:size-7 text-[#BD1B21]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <rect height="7" rx="1.5" width="7" x="3" y="3" />
          <rect height="7" rx="1.5" width="7" x="14" y="3" />
          <rect height="7" rx="1.5" width="7" x="14" y="14" />
          <rect height="7" rx="1.5" width="7" x="3" y="14" />
        </svg>
      );
    case "tech":
      return (
        <svg className="size-6 sm:size-7 text-sky-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <rect height="14" rx="2" width="20" x="2" y="3" />
          <line x1="8" x2="16" y1="21" y2="21" />
          <line x1="12" x2="12" y1="17" y2="21" />
          <path d="M7 8l3 3-3 3M13 14h4" />
        </svg>
      );
    case "sports":
      return (
        <svg className="size-6 sm:size-7 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" />
          <path d="M2.5 12h19M12 2.5a14 14 0 0 1 0 19M12 2.5a14 14 0 0 0 0 19" />
        </svg>
      );
    case "math":
      return (
        <svg className="size-6 sm:size-7 text-amber-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          <path d="M9 7h6M12 10v6M9 13h6" />
        </svg>
      );
    case "arts":
      return (
        <svg className="size-6 sm:size-7 text-rose-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="13.5" cy="6.5" fill="currentColor" r=".5" />
          <circle cx="17.5" cy="10.5" fill="currentColor" r=".5" />
          <circle cx="8.5" cy="7.5" fill="currentColor" r=".5" />
          <circle cx="6.5" cy="12.5" fill="currentColor" r=".5" />
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
        </svg>
      );
    case "culture":
      return (
        <svg className="size-6 sm:size-7 text-purple-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M12 2l2.4 7.4h7.6l-6.2 4.5 2.4 7.4-6.2-4.5-6.2 4.5 2.4-7.4-6.2-4.5h7.6z" />
        </svg>
      );
    case "trips":
      return (
        <svg className="size-6 sm:size-7 text-teal-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" />
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
        </svg>
      );
    case "science":
      return (
        <svg className="size-6 sm:size-7 text-cyan-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M10 2v7.31L4.62 18.27A2 2 0 0 0 6.34 21h11.32a2 2 0 0 0 1.72-2.73L14 9.31V2" />
          <line x1="8.5" x2="15.5" y1="2" y2="2" />
          <line x1="7" x2="17" y1="14" y2="14" />
        </svg>
      );
    case "social":
      return (
        <svg className="size-6 sm:size-7 text-pink-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
      );
    case "events":
      return (
        <svg className="size-6 sm:size-7 text-indigo-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <rect height="18" rx="2" ry="2" width="18" x="3" y="4" />
          <line x1="16" x2="16" y1="2" y2="6" />
          <line x1="8" x2="8" y1="2" y2="6" />
          <line x1="3" x2="21" y1="10" y2="10" />
        </svg>
      );
    case "business":
      return (
        <svg className="size-6 sm:size-7 text-blue-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <rect height="14" rx="2" ry="2" width="20" x="2" y="7" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      );
    case "convocation":
      return (
        <svg className="size-6 sm:size-7 text-yellow-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
      );
    case "music":
      return (
        <svg className="size-6 sm:size-7 text-violet-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
      );
  }
}

const INITIAL_MOMENTS_COUNT = 9;
const LOAD_MORE_STEP = 6;

export function GalleryMoments() {
  const [mounted, setMounted] = useState(false);
  const [activeInstitution, setActiveInstitution] = useState<GalleryInstitution>("all");
  const [activeSubcategory, setActiveSubcategory] = useState<string>("all");
  const [visibleCount, setVisibleCount] = useState<number>(INITIAL_MOMENTS_COUNT);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Reset visible items count & active subcategory when institution changes
  const handleInstitutionChange = (inst: GalleryInstitution) => {
    setActiveInstitution(inst);
    setActiveSubcategory("all");
    setVisibleCount(INITIAL_MOMENTS_COUNT);
  };

  const handleSubcategoryChange = (subId: string) => {
    setActiveSubcategory(subId);
    setVisibleCount(INITIAL_MOMENTS_COUNT);
  };

  const currentSubcategories = INSTITUTION_SUBCATEGORIES[activeInstitution] ?? INSTITUTION_SUBCATEGORIES.all;

  const filteredMoments = GALLERY_MOMENTS.filter((item) => {
    // 1. Institution check
    if (activeInstitution !== "all") {
      if (item.institution !== "all" && item.institution !== activeInstitution) {
        return false;
      }
    }

    // 2. Subcategory / Club check
    if (activeSubcategory !== "all") {
      if (item.type === "quote") return false;
      if (activeInstitution === "primary" && activeSubcategory === "others") {
        const primaryCollaboratorIds = [
          "tech-3di",
          "sports-playnepal",
          "academics-math",
          "mero-coding",
          "samatva-wellness",
        ];
        if (primaryCollaboratorIds.includes(item.subcategory ?? "")) {
          return false;
        }
        return true;
      }
      if (activeInstitution === "bachelors" && activeSubcategory === "others") {
        const bachelorsCollaboratorIds = [
          "websurfer",
          "startup-discovery",
          "machan",
          "suraj-interior",
          "cross-web",
        ];
        if (bachelorsCollaboratorIds.includes(item.subcategory ?? "")) {
          return false;
        }
        return true;
      }
      if (activeInstitution === "all") {
        if (item.category !== activeSubcategory && item.subcategory !== activeSubcategory) {
          return false;
        }
      } else {
        if (item.subcategory !== activeSubcategory && item.category !== activeSubcategory) {
          return false;
        }
      }
    }

    return true;
  });

  const displayedMoments = filteredMoments.slice(0, visibleCount);

  const imageMoments = filteredMoments.filter(
    (item) => item.type === "image" || item.type === "video",
  );

  const handlePrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) =>
      prev !== null && prev > 0 ? prev - 1 : imageMoments.length - 1,
    );
  }, [lightboxIndex, imageMoments.length]);

  const handleNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) =>
      prev !== null && prev < imageMoments.length - 1 ? prev + 1 : 0,
    );
  }, [lightboxIndex, imageMoments.length]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (lightboxIndex !== null) {
        if (e.key === "Escape") setLightboxIndex(null);
        if (e.key === "ArrowLeft") handlePrev();
        if (e.key === "ArrowRight") handleNext();
      }
      if (isVideoModalOpen && e.key === "Escape") {
        setIsVideoModalOpen(false);
      }
    },
    [lightboxIndex, isVideoModalOpen, handlePrev, handleNext],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Lock body scroll when modal or lightbox is open
  useEffect(() => {
    if (lightboxIndex !== null || isVideoModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, isVideoModalOpen]);

  const currentImage = lightboxIndex !== null ? imageMoments[lightboxIndex] : null;

  return (
    <section className="gutter-x section-y-masthead pb-16 sm:pb-24" id="our-gallery">
      <div className="mx-auto max-w-page">
        {/* 1. Section Heading */}
        <div className="text-center">
          <p className="font-body text-xs sm:text-sm font-bold uppercase tracking-widest text-[#BD1B21]">
            Explore Our Moments
          </p>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl md:text-5xl font-bold text-ink">
            Our Gallery
          </h2>
          <div className="mx-auto mt-3 h-1 w-14 rounded-full bg-[#BD1B21]" />
        </div>

        {/* 2. Filter Navigation */}
        <div className="mt-8 sm:mt-10 space-y-6">
          {/* Institution Selector (Single Row Segmented Bar) */}
          <div className="flex flex-col items-center">
            <div className="inline-flex flex-wrap md:flex-nowrap items-center justify-center p-1.5 rounded-2xl md:rounded-full bg-surface-raised border border-border shadow-xs gap-1.5">
              {INSTITUTION_TABS.map((inst) => {
                const isActive = activeInstitution === inst.id;
                return (
                  <button
                    className={cn(
                      "flex items-center gap-1.5 rounded-xl md:rounded-full px-3.5 sm:px-5 py-2 font-body text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap",
                      isActive
                        ? "bg-[#BD1B21] text-white shadow-md shadow-[#BD1B21]/30 scale-[1.02]"
                        : "text-ink-muted hover:text-ink hover:bg-neutral-100/80",
                    )}
                    key={inst.id}
                    onClick={() => handleInstitutionChange(inst.id)}
                    type="button"
                  >
                    <span>{inst.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Instagram/Stories-Style Circular Highlights Rail (Shown only when a specific institution is selected) */}
          {activeInstitution !== "all" && currentSubcategories.length > 0 && (
            <div className="relative mx-auto w-full max-w-6xl py-1 animate-in fade-in duration-300">
              {/* Horizontal Story Highlights Rail */}
              <div className="flex items-start justify-start md:justify-center gap-4 sm:gap-6 md:gap-8 overflow-x-auto pt-5 pb-4 px-4 no-scrollbar scroll-smooth">
                {currentSubcategories.map((sub) => {
                  const isActive = activeSubcategory === sub.id;

                  return (
                    <button
                      aria-pressed={isActive}
                      className={cn(
                        "group flex flex-col items-center justify-start shrink-0 cursor-pointer transition-all duration-300 focus:outline-hidden",
                        "w-22 sm:w-26 md:w-30",
                      )}
                      key={sub.id}
                      onClick={() => handleSubcategoryChange(sub.id)}
                      type="button"
                    >
                      {/* Story Circle Avatar Disc */}
                      <div
                        className={cn(
                          "relative my-1 flex size-20 sm:size-24 md:size-28 items-center justify-center rounded-full transition-all duration-300",
                          isActive
                            ? "p-[3.5px] bg-[#BD1B21] shadow-xl shadow-[#BD1B21]/30 scale-106 -translate-y-1"
                            : "p-[3px] bg-neutral-200 hover:bg-[#BD1B21]/50 group-hover:scale-105 group-hover:shadow-md",
                        )}
                      >
                        {/* Inner White Gap Ring */}
                        <div className="relative size-full rounded-full bg-white p-[2.5px] overflow-hidden">
                          {/* Photo Thumbnail or Collaborator Logo */}
                          {sub.thumbnail ? (
                            <div className="relative size-full rounded-full overflow-hidden bg-white flex items-center justify-center">
                              <Image
                                alt={sub.label}
                                className={cn(
                                  "size-full rounded-full transition-transform duration-500 group-hover:scale-110",
                                  sub.thumbnail.includes("/collaborators/") ||
                                    sub.thumbnail.includes("/partners/")
                                    ? "object-contain p-1.5 sm:p-2 bg-white"
                                    : "object-cover",
                                )}
                                fill
                                loading="lazy"
                                quality={95}
                                sizes="(max-width: 640px) 96px, (max-width: 1024px) 120px, 140px"
                                src={sub.thumbnail}
                              />
                            </div>
                          ) : (
                            <div className="flex size-full items-center justify-center rounded-full bg-neutral-50">
                              <BubbleIcon iconType={sub.iconType} />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Text Label Below Circle */}
                      <span
                        className={cn(
                          "mt-2.5 text-center font-body text-xs sm:text-sm transition-colors line-clamp-2 leading-tight max-w-[92px] sm:max-w-[115px]",
                          isActive
                            ? "text-[#BD1B21] font-bold drop-shadow-xs"
                            : "text-ink-muted group-hover:text-ink font-semibold",
                        )}
                      >
                        {sub.shortLabel}
                      </span>

                      {/* Active Indicator Dot */}
                      {isActive && (
                        <span className="mt-1 size-1.5 rounded-full bg-[#BD1B21] shadow-xs" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* 3. Empty State if no moments match combined filters */}
        {filteredMoments.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-dashed border-border p-12 text-center bg-surface/50">
            <h3 className="font-display text-lg font-semibold text-ink">
              No moments found
            </h3>
            <p className="mt-2 text-sm text-ink-muted">
              Try selecting "All" in the focus ribbon to explore all moments for this institution.
            </p>
            <button
              className="mt-5 rounded-full bg-[#BD1B21] px-5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#a0161b] transition-colors cursor-pointer"
              onClick={() => {
                setActiveInstitution("all");
                setActiveSubcategory("all");
              }}
              type="button"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          /* 4. Moments Bento Grid */
          <>
            <Reveal
              className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
              key={`${activeInstitution}-${activeSubcategory}-${visibleCount}`}
              stagger={0.04}
              y={16}
            >
              {displayedMoments.map((item) => {
                // A. Special Quote Card (Row 3, Col 2)
                if (item.type === "quote" && item.quote) {
                  return (
                    <RevealItem className="h-full" key={item.id}>
                      <div className="relative flex aspect-4/3 h-full flex-col justify-between overflow-hidden rounded-2xl bg-[#8B1519] p-6 sm:p-8 text-white shadow-md transition-all duration-300 hover:shadow-xl hover:shadow-[#8B1519]/20">
                        {/* Lotus Watermark in Bottom Right Corner */}
                        <div className="pointer-events-none absolute -bottom-6 -right-6 size-44 opacity-15">
                          <Image
                            alt=""
                            className="size-full object-contain"
                            height={180}
                            src="/lotus.png"
                            width={180}
                          />
                        </div>

                        {/* Quotation Icon */}
                        <div className="relative z-10">
                          <div className="flex size-10 items-center justify-center rounded-lg bg-white/10 backdrop-blur-xs">
                            <Icon className="size-5 text-white" icon={QuoteIcon} />
                          </div>
                        </div>

                        {/* Quote Text & Author */}
                        <div className="relative z-10 space-y-3">
                          <p className="font-display text-lg sm:text-xl font-medium leading-snug text-white">
                            {item.quote.text}
                          </p>
                          <p className="font-body text-xs sm:text-sm font-semibold tracking-wide text-white/80">
                            — {item.quote.author}
                          </p>
                        </div>
                      </div>
                    </RevealItem>
                  );
                }

                // B. Video Card with Circular Play Button (Row 4, Col 2)
                if (item.type === "video") {
                  return (
                    <RevealItem className="h-full" key={item.id}>
                      <button
                        aria-label={item.title}
                        className="group relative aspect-4/3 w-full overflow-hidden rounded-2xl bg-neutral-900 text-left shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
                        onClick={() => setIsVideoModalOpen(true)}
                        type="button"
                      >
                        {item.src && (
                          <Image
                            alt={item.alt ?? item.title}
                            className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                            fill
                            loading="lazy"
                            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                            src={item.src}
                          />
                        )}

                        {/* Dark Scrim Overlay */}
                        <div className="absolute inset-0 bg-black/30 transition-opacity duration-300 group-hover:bg-black/20" />

                        {/* Centered Circular Play Button */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="flex size-14 sm:size-16 items-center justify-center rounded-full border-2 border-white/90 bg-black/40 text-white backdrop-blur-xs shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:bg-[#BD1B21] group-hover:border-[#BD1B21]">
                            <Icon className="size-6 text-white translate-x-0.5" icon={PlayIcon} />
                          </div>
                        </div>
                      </button>
                    </RevealItem>
                  );
                }

                // C. Standard Image Card
                const currentImageIndex = imageMoments.findIndex(
                  (m) => m.id === item.id,
                );

                return (
                  <RevealItem className="h-full" key={item.id}>
                    <button
                      aria-label={item.title}
                      className="group relative aspect-4/3 w-full overflow-hidden rounded-2xl bg-neutral-900 text-left shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-2 hover:ring-[#BD1B21]/50 cursor-pointer"
                      onClick={() =>
                        setLightboxIndex(
                          currentImageIndex >= 0 ? currentImageIndex : null,
                        )
                      }
                      type="button"
                    >
                      {item.src && (
                        <Image
                          alt={item.alt ?? item.title}
                          className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          fill
                          loading="lazy"
                          quality={90}
                          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                          src={item.src}
                        />
                      )}

                      {/* Subtle Dark Overlay on Hover */}
                      <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                      {/* Expand icon on hover */}
                      <div className="absolute top-3 right-3 flex size-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-xs opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-105 shadow-md">
                        <svg className="size-4.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </button>
                  </RevealItem>
                );
              })}
            </Reveal>

            {/* 5. See More Moments Action */}
            {visibleCount < filteredMoments.length && (
              <div className="mt-10 sm:mt-12 flex justify-center">
                <button
                  type="button"
                  onClick={() => setVisibleCount((prev) => prev + LOAD_MORE_STEP)}
                  className="group inline-flex items-center gap-2.5 rounded-full bg-[#BD1B21] px-8 py-3.5 text-sm font-semibold text-white shadow-md shadow-[#BD1B21]/20 transition-all duration-200 hover:bg-[#a0161b] hover:shadow-lg hover:shadow-[#BD1B21]/30 hover:scale-[1.02] cursor-pointer active:scale-95"
                >
                  <span>See More Moments</span>
                  <Icon className="size-4 transition-transform duration-200 group-hover:translate-y-0.5" icon={ChevronDownIcon} />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* 5. Fluid Unboxed Fullscreen Image Expansion (No restrictive box / card) */}
      {mounted &&
        lightboxIndex !== null &&
        currentImage &&
        createPortal(
          <div
            aria-label="Expanded Image View"
            aria-modal="true"
            className="fixed inset-0 z-[9999] flex flex-col justify-between bg-black/92 backdrop-blur-md p-4 sm:p-6 lg:p-8 animate-in fade-in duration-200 select-none cursor-zoom-out"
            onClick={() => setLightboxIndex(null)}
            role="dialog"
          >
            {/* Top Floating Control Bar */}
            <div
              className="flex items-center justify-between w-full max-w-7xl mx-auto text-white z-20 cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="rounded-full bg-[#BD1B21] px-3 py-1 font-body text-xs font-semibold text-white tracking-wide shadow-sm">
                  {currentImage.institutionLabel}
                </span>
                <span className="hidden sm:inline-block text-xs text-white/80 font-medium truncate max-w-md drop-shadow-sm">
                  {currentImage.title}
                </span>
              </div>

              <div className="flex items-center gap-3">
                {/* Counter */}
                <span className="rounded-full bg-white/10 backdrop-blur-md px-3 py-1 font-mono text-xs text-white/90 border border-white/15 shadow-sm">
                  {lightboxIndex + 1} / {imageMoments.length}
                </span>

                {/* Close Button */}
                <button
                  aria-label="Close fullscreen view"
                  className="flex size-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all duration-150 hover:bg-[#BD1B21] hover:scale-105 border border-white/15 cursor-pointer shadow-lg"
                  onClick={() => setLightboxIndex(null)}
                  type="button"
                >
                  <Icon className="size-5" icon={CloseIcon} />
                </button>
              </div>
            </div>

            {/* Main Center Stage: Natural Unconstrained Image with Floating Prev/Next Controls */}
            <div
              className="relative flex-1 flex items-center justify-center w-full max-w-7xl mx-auto my-auto py-2 cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Prev Button */}
              {imageMoments.length > 1 && (
                <button
                  aria-label="Previous Image"
                  className="absolute left-1 sm:left-4 z-30 flex size-11 sm:size-12 items-center justify-center rounded-full bg-black/60 text-white border border-white/20 backdrop-blur-md transition-all duration-150 hover:bg-[#BD1B21] hover:scale-110 hover:border-[#BD1B21] cursor-pointer shadow-2xl"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  type="button"
                >
                  <Icon className="size-6" icon={ChevronLeftIcon} />
                </button>
              )}

              {/* Pure Expanded Image (Unboxed & Naturally Proportioned) */}
              <div className="relative flex items-center justify-center max-h-[86vh] sm:max-h-[90vh] max-w-full">
                {currentImage.src && (
                  <img
                    alt={currentImage.alt ?? currentImage.title}
                    className="max-h-[84vh] sm:max-h-[88vh] max-w-[94vw] lg:max-w-[90vw] w-auto h-auto object-contain rounded-xl sm:rounded-2xl shadow-2xl animate-in zoom-in-95 duration-200 transition-all pointer-events-auto"
                    src={currentImage.src}
                  />
                )}
              </div>

              {/* Next Button */}
              {imageMoments.length > 1 && (
                <button
                  aria-label="Next Image"
                  className="absolute right-1 sm:right-4 z-30 flex size-11 sm:size-12 items-center justify-center rounded-full bg-black/60 text-white border border-white/20 backdrop-blur-md transition-all duration-150 hover:bg-[#BD1B21] hover:scale-110 hover:border-[#BD1B21] cursor-pointer shadow-2xl"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  type="button"
                >
                  <Icon className="size-6" icon={ChevronRightIcon} />
                </button>
              )}
            </div>
          </div>,
          document.body,
        )}

      {/* 6. Fluid Unboxed Video Modal Dialog Portal */}
      {mounted &&
        isVideoModalOpen &&
        createPortal(
          <div
            aria-label="Video Player"
            aria-modal="true"
            className="fixed inset-0 z-[9999] flex flex-col justify-between bg-black/92 backdrop-blur-md p-4 sm:p-6 lg:p-8 animate-in fade-in duration-200 select-none cursor-zoom-out"
            onClick={() => setIsVideoModalOpen(false)}
            role="dialog"
          >
            {/* Top Close Bar */}
            <div
              className="flex items-center justify-between w-full max-w-5xl mx-auto text-white z-20 cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="rounded-full bg-[#BD1B21] px-3 py-1 font-body text-xs font-semibold text-white tracking-wide shadow-sm">
                Campus Video
              </span>
              <button
                aria-label="Close Video"
                className="flex size-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all duration-150 hover:bg-[#BD1B21] hover:scale-105 border border-white/15 cursor-pointer shadow-lg"
                onClick={() => setIsVideoModalOpen(false)}
                type="button"
              >
                <Icon className="size-5" icon={CloseIcon} />
              </button>
            </div>

            {/* Video Stage */}
            <div
              className="relative flex-1 flex items-center justify-center w-full max-w-5xl mx-auto my-auto py-3 cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/15 bg-black animate-in zoom-in-95 duration-200">
                <video
                  autoPlay
                  className="size-full object-cover"
                  controls
                  playsInline
                  src="/nami-video.mp4"
                />
              </div>
            </div>

            {/* Bottom spacer */}
            <div className="h-6" />
          </div>,
          document.body,
        )}
    </section>
  );
}
