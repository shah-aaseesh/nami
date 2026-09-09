"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { Icon } from "@/components/ui/icon";
import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
  MortarboardIcon,
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
};

export const INSTITUTION_TABS: readonly InstitutionTab[] = [
  { id: "all", label: "All Institutions" },
  { id: "primary", label: "Primary" },
  { id: "higher-secondary", label: "Higher Secondary (+2)" },
  { id: "a-levels", label: "A-Levels" },
  { id: "bachelors", label: "Bachelors / Masters" },
];

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
    title: "University AI & Machine Learning Workshop",
    category: "academics",
    institution: "bachelors",
    institutionLabel: "Bachelors / Masters",
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
    type: "image",
    src: "/gallery/A-levels/Events/xyz1.jpeg",
    alt: "A-Levels students on campus during annual events",
  },
  {
    id: "moment-3",
    title: "Higher Secondary Investiture & Leadership Address",
    category: "achievements",
    institution: "higher-secondary",
    institutionLabel: "Higher Secondary (+2)",
    type: "image",
    src: "/gallery/Higher Secondary/Events/investiture ceremony.jpeg",
    alt: "Student leaders receiving badges during investiture ceremony",
  },

  // --- ROW 2 ---
  {
    id: "moment-4",
    title: "Primary Interactive Smart Classroom",
    category: "academics",
    institution: "primary",
    institutionLabel: "Primary",
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
    type: "image",
    src: "/gallery/A-levels/Sports/xyz.jpeg",
    alt: "A-Levels students playing basketball in sports fixture",
  },
  {
    id: "moment-6",
    title: "BSc Computer Science & Data Innovation Lab",
    category: "academics",
    institution: "bachelors",
    institutionLabel: "Bachelors / Masters",
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
    type: "image",
    src: "/gallery/A-levels/Events/farewell.jpeg",
    alt: "A-Levels farewell celebration and gathering",
  },

  // ==========================================
  // --- BACHELORS / MASTERS GALLERY MOMENTS ---
  // ==========================================
  {
    id: "bachelors-academic-ai3",
    title: "Advanced Technology & Data Science Seminar",
    category: "academics",
    institution: "bachelors",
    institutionLabel: "Bachelors / Masters",
    type: "image",
    src: "/gallery/Bachelors/Academic/ai3.jpeg",
    alt: "Students attending advanced machine learning and computing lecture",
  },
  {
    id: "bachelors-academic-internship",
    title: "Industry Internship & Corporate Placement Induction",
    category: "academics",
    institution: "bachelors",
    institutionLabel: "Bachelors / Masters",
    type: "image",
    src: "/gallery/Bachelors/Academic/internship.jpeg",
    alt: "Bachelors students during corporate internship onboarding",
  },
  {
    id: "bachelors-event-climate-ai",
    title: "Climate AI & Sustainable Innovation Symposium",
    category: "events",
    institution: "bachelors",
    institutionLabel: "Bachelors / Masters",
    type: "image",
    src: "/gallery/Bachelors/Events/ClimateAI.jpeg",
    alt: "University symposium focusing on climate change and artificial intelligence",
  },
  {
    id: "bachelors-event-climate-ai-panel",
    title: "Interactive Climate Innovation Panel Discussion",
    category: "events",
    institution: "bachelors",
    institutionLabel: "Bachelors / Masters",
    type: "image",
    src: "/gallery/Bachelors/Events/ClimateAI1.jpeg",
    alt: "Panel session with experts and students discussing climate solutions",
  },
  {
    id: "bachelors-event-pitchday",
    title: "Startup Pitch Day & Venture Innovation Showcase",
    category: "achievements",
    institution: "bachelors",
    institutionLabel: "Bachelors / Masters",
    type: "image",
    src: "/gallery/Bachelors/Events/pitchday.jpeg",
    alt: "Undergraduate student entrepreneurs pitching business ideas",
  },
  {
    id: "bachelors-event-pitchday-presentation",
    title: "Student Entrepreneurship & Project Presentation",
    category: "events",
    institution: "bachelors",
    institutionLabel: "Bachelors / Masters",
    type: "image",
    src: "/gallery/Bachelors/Events/pitchday1.jpeg",
    alt: "Students presenting technical project before panel of judges",
  },
  {
    id: "bachelors-event-graduation-gala",
    title: "Graduating Batch Convocation Celebration",
    category: "achievements",
    institution: "bachelors",
    institutionLabel: "Bachelors / Masters",
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
    type: "image",
    src: "/gallery/A-levels/Events/farewell1.jpeg",
    alt: "A-Levels graduating batch group celebration",
  },
  {
    id: "a-level-leadership",
    title: "A-Levels Student Leadership & Event Coordination",
    category: "achievements",
    institution: "a-levels",
    institutionLabel: "A-Levels",
    type: "image",
    src: "/gallery/A-levels/Events/xyz2.jpeg",
    alt: "Student leaders organizing and conducting event",
  },

  // ==========================================
  // --- HIGHER SECONDARY (+2) GALLERY MOMENTS ---
  // ==========================================
  {
    id: "moment-hs-academic-hm",
    title: "Hotel Management Culinary Practicals & Hands-on Training",
    category: "academics",
    institution: "higher-secondary",
    institutionLabel: "Higher Secondary (+2)",
    type: "image",
    src: "/gallery/Higher Secondary/Academic/HotelManagementHandsOnlearning.jpeg",
    alt: "Hotel Management students in culinary lab training",
  },
  {
    id: "moment-hs-academic-kist",
    title: "KIST Science & Innovation Exhibition Fair",
    category: "achievements",
    institution: "higher-secondary",
    institutionLabel: "Higher Secondary (+2)",
    type: "image",
    src: "/gallery/Higher Secondary/Academic/KIST FAIR- 2081.jpeg",
    alt: "Students showcasing science and technology project at fair",
  },
  {
    id: "moment-hs-events-holi",
    title: "Holi Cultural Festival & Campus Color Celebration",
    category: "events",
    institution: "higher-secondary",
    institutionLabel: "Higher Secondary (+2)",
    type: "image",
    src: "/gallery/Higher Secondary/Events/HOLI.jpeg",
    alt: "+2 students celebrating Holi colors festival on campus",
  },
  {
    id: "moment-hs-events-plastic",
    title: "Zero Plastic 2040 Environmental Sustainability Campaign",
    category: "campus-life",
    institution: "higher-secondary",
    institutionLabel: "Higher Secondary (+2)",
    type: "image",
    src: "/gallery/Higher Secondary/Events/Zero Plastic 2040.jpg",
    alt: "Students holding banner for zero plastic campaign",
  },
  {
    id: "moment-hs-sports-basketball",
    title: "Annual Inter-College Basketball Championship",
    category: "sports",
    institution: "higher-secondary",
    institutionLabel: "Higher Secondary (+2)",
    type: "image",
    src: "/gallery/Higher Secondary/Sports/Basketball Tournament—2082.jpeg",
    alt: "+2 basketball team competing on home court",
  },
  {
    id: "moment-hs-sports-taekwondo",
    title: "Japan Open International Taekwondo Championship",
    category: "achievements",
    institution: "higher-secondary",
    institutionLabel: "Higher Secondary (+2)",
    type: "image",
    src: "/gallery/Higher Secondary/Sports/Japan Open International Taekwondo Championship.jpeg",
    alt: "NAMI martial artists competing in international championship",
  },
  {
    id: "moment-hs-sports-futsal",
    title: "Higher Secondary Futsal Tournament Cup",
    category: "sports",
    institution: "higher-secondary",
    institutionLabel: "Higher Secondary (+2)",
    type: "image",
    src: "/gallery/Higher Secondary/Sports/futsal.jpeg",
    alt: "+2 futsal tournament team action",
  },
  {
    id: "moment-hs-life-tour",
    title: "Higher Secondary Annual Educational Tour",
    category: "campus-life",
    institution: "higher-secondary",
    institutionLabel: "Higher Secondary (+2)",
    type: "image",
    src: "/gallery/Higher Secondary/School Life/tour.jpeg",
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
    type: "image",
    src: "/gallery/Primary School/Sports/25th Anniversary of IOFTC & 15th International Open Friendship Taekwondo Championship 2025.jpeg",
    alt: "Primary martial arts pupils with championship medals and certificates",
  },
];

function TabIcon({ iconType }: { readonly iconType: CategoryFilterTab["iconType"] }) {
  switch (iconType) {
    case "grid":
      return (
        <svg className="size-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
          <path d="M4 4h7v7H4V4zm9 0h7v7h-7V4zm-9 9h7v7H4v-7zm9 0h7v7h-7v-7z" />
        </svg>
      );
    case "mortarboard":
      return <Icon className="size-4 shrink-0" icon={MortarboardIcon} />;
    case "users":
      return (
        <svg className="size-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="9" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "calendar":
      return <Icon className="size-4 shrink-0" icon={CalendarIcon} />;
    case "sports":
      return (
        <svg className="size-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" />
          <path d="M2.5 12h19M12 2.5a14 14 0 0 1 0 19M12 2.5a14 14 0 0 0 0 19" />
        </svg>
      );
    case "trophy":
      return (
        <svg className="size-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M6 9H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2m12 6h2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-2M6 3h12v7a6 6 0 0 1-12 0V3z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9 21h6m-3-6v6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
  }
}

export function GalleryMoments() {
  const [mounted, setMounted] = useState(false);
  const [activeInstitution, setActiveInstitution] = useState<GalleryInstitution>("all");
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredMoments = GALLERY_MOMENTS.filter((item) => {
    // 1. Institution check
    if (activeInstitution !== "all") {
      if (item.institution !== "all" && item.institution !== activeInstitution) {
        return false;
      }
    }

    // 2. Category check
    if (activeCategory !== "all") {
      if (item.type === "quote") return false;
      if (item.category !== activeCategory) {
        return false;
      }
    }

    return true;
  });

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
    <section className="gutter-x pb-16 sm:pb-24 pt-12 sm:pt-16" id="our-gallery">
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

        {/* 2. Filter Bar: Institutions + Themes */}
        <div className="mt-8 sm:mt-10 space-y-3.5">
          {/* 2a. Institution Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {INSTITUTION_TABS.map((inst) => {
              const isActive = activeInstitution === inst.id;
              return (
                <button
                  className={cn(
                    "rounded-full px-4 py-2 font-body text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer",
                    isActive
                      ? "bg-[#BD1B21] text-white shadow-sm shadow-[#BD1B21]/30"
                      : "bg-surface border border-border/80 text-ink-muted hover:border-[#BD1B21]/50 hover:text-ink hover:bg-surface-raised",
                  )}
                  key={inst.id}
                  onClick={() => setActiveInstitution(inst.id)}
                  type="button"
                >
                  {inst.label}
                </button>
              );
            })}
          </div>

          {/* 2b. Category / Theme Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
            {CATEGORY_TABS.map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  className={cn(
                    "group flex items-center gap-2 rounded-xl px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer",
                    isActive
                      ? "bg-[#1C1917] text-white shadow-sm"
                      : "bg-surface border border-border/70 text-ink-muted hover:border-ink/40 hover:text-ink hover:bg-surface-raised",
                  )}
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  type="button"
                >
                  <TabIcon iconType={tab.iconType} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Empty State if no moments match combined filters */}
        {filteredMoments.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-dashed border-border p-12 text-center bg-surface/50">
            <h3 className="font-display text-lg font-semibold text-ink">
              No moments found
            </h3>
            <p className="mt-2 text-sm text-ink-muted">
              Try selecting "All Institutions" or "All Moments" to explore the full gallery.
            </p>
            <button
              className="mt-5 rounded-full bg-[#BD1B21] px-5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#a0161b] transition-colors cursor-pointer"
              onClick={() => {
                setActiveInstitution("all");
                setActiveCategory("all");
              }}
              type="button"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          /* 4. Moments Bento Grid */
          <Reveal
            className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
            key={`${activeInstitution}-${activeCategory}`}
            stagger={0.04}
            y={16}
          >
            {filteredMoments.map((item) => {
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
                      <div className="absolute inset-0 bg-black/40 transition-opacity duration-300 group-hover:bg-black/30" />

                      {/* Centered Circular Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex size-14 sm:size-16 items-center justify-center rounded-full border-2 border-white/90 bg-black/40 text-white backdrop-blur-xs shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:bg-[#BD1B21] group-hover:border-[#BD1B21]">
                          <Icon className="size-6 text-white translate-x-0.5" icon={PlayIcon} />
                        </div>
                      </div>

                      {/* Institution Badge + Title Banner */}
                      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 bg-gradient-to-t from-black/85 via-black/40 to-transparent">
                        <span className="inline-block rounded-md bg-white/20 px-2 py-0.5 font-body text-[10px] font-semibold text-white backdrop-blur-xs mb-1">
                          {item.institutionLabel}
                        </span>
                        <p className="font-display text-sm sm:text-base font-semibold text-white drop-shadow-sm line-clamp-1">
                          {item.title}
                        </p>
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
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        src={item.src}
                      />
                    )}

                    {/* Subtle Gradient Backdrop on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    {/* Expand icon on hover */}
                    <div className="absolute top-3 right-3 flex size-8 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-xs opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-105">
                      <svg className="size-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>

                    {/* Institution Tag + Title Bar on Hover */}
                    <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <span className="inline-block rounded-md bg-[#BD1B21] px-2 py-0.5 font-body text-[10px] font-semibold text-white mb-1">
                        {item.institutionLabel}
                      </span>
                      <p className="font-display text-sm sm:text-base font-semibold text-white drop-shadow-sm line-clamp-2 leading-snug">
                        {item.title}
                      </p>
                    </div>
                  </button>
                </RevealItem>
              );
            })}
          </Reveal>
        )}
      </div>

      {/* 5. Clean Centered Image Modal Dialog Portal */}
      {mounted &&
        lightboxIndex !== null &&
        currentImage &&
        createPortal(
          <div
            aria-label="Image Modal"
            aria-modal="true"
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-xs p-4 sm:p-6 animate-in fade-in duration-150"
            onClick={() => setLightboxIndex(null)}
            role="dialog"
          >
            {/* Modal Dialog Card */}
            <div
              className="relative flex flex-col w-full max-w-4xl max-h-[90vh] bg-surface rounded-2xl overflow-hidden shadow-2xl border border-border animate-in zoom-in-95 duration-150"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close (X) Button */}
              <button
                aria-label="Close"
                className="absolute top-3 right-3 z-30 flex size-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-xs transition-all duration-150 hover:bg-[#BD1B21] hover:scale-105 cursor-pointer"
                onClick={() => setLightboxIndex(null)}
                type="button"
              >
                <Icon className="size-4.5" icon={CloseIcon} />
              </button>

              {/* Prev Navigation Button */}
              {imageMoments.length > 1 && (
                <button
                  aria-label="Previous Image"
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-30 flex size-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-xs transition-all duration-150 hover:bg-[#BD1B21] hover:scale-105 cursor-pointer"
                  onClick={handlePrev}
                  type="button"
                >
                  <Icon className="size-5" icon={ChevronLeftIcon} />
                </button>
              )}

              {/* Next Navigation Button */}
              {imageMoments.length > 1 && (
                <button
                  aria-label="Next Image"
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-30 flex size-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-xs transition-all duration-150 hover:bg-[#BD1B21] hover:scale-105 cursor-pointer"
                  onClick={handleNext}
                  type="button"
                >
                  <Icon className="size-5" icon={ChevronRightIcon} />
                </button>
              )}

              {/* Expanded Image Viewport */}
              <div className="relative w-full aspect-16/10 sm:aspect-16/9 bg-neutral-900 flex items-center justify-center overflow-hidden">
                {currentImage.src && (
                  <Image
                    alt={currentImage.alt ?? currentImage.title}
                    className="size-full object-contain"
                    fill
                    priority
                    sizes="(min-width: 1024px) 896px, 95vw"
                    src={currentImage.src}
                  />
                )}
              </div>

              {/* Modal Footer / Context */}
              <div className="p-4 sm:p-5 flex items-center justify-between gap-4 bg-surface border-t border-border">
                <div className="space-y-1 min-w-0">
                  <span className="inline-block rounded-md bg-[#BD1B21] px-2 py-0.5 font-body text-[10px] font-semibold text-white">
                    {currentImage.institutionLabel}
                  </span>
                  <p className="font-display text-sm sm:text-base md:text-lg font-semibold text-ink line-clamp-1">
                    {currentImage.title}
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-surface-raised border border-border px-3 py-1 font-mono text-xs text-ink-muted">
                  {lightboxIndex + 1} / {imageMoments.length}
                </span>
              </div>
            </div>
          </div>,
          document.body,
        )}

      {/* 6. Clean Video Modal Dialog Portal */}
      {mounted &&
        isVideoModalOpen &&
        createPortal(
          <div
            aria-label="Video Player"
            aria-modal="true"
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-xs p-4 sm:p-6 animate-in fade-in duration-150"
            onClick={() => setIsVideoModalOpen(false)}
            role="dialog"
          >
            <div
              className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-black shadow-2xl border border-border animate-in zoom-in-95 duration-150"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                aria-label="Close Video"
                className="absolute top-3 right-3 z-30 flex size-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-xs transition-colors hover:bg-[#BD1B21] cursor-pointer"
                onClick={() => setIsVideoModalOpen(false)}
                type="button"
              >
                <Icon className="size-4.5" icon={CloseIcon} />
              </button>

              <div className="relative aspect-video w-full">
                <video
                  autoPlay
                  className="size-full object-cover"
                  controls
                  playsInline
                  src="/nami-video.mp4"
                />
              </div>
            </div>
          </div>,
          document.body,
        )}
    </section>
  );
}



