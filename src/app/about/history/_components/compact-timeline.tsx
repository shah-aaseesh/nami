"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/icon";
import { Eyebrow, H2, H3, P } from "@/components/ui/typography";
import { ArrowLeftIcon, ArrowRightIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

type Milestone = {
  readonly year: string;
  readonly era: string;
  readonly category: string;
  readonly title: string;
  readonly summary: string;
  readonly points: readonly string[];
  readonly image: string;
  readonly imageAlt: string;
  readonly partnerLogo?: string;
  readonly partnerName?: string;
};

const MILESTONES: readonly Milestone[] = [
  {
    year: "2012",
    era: "The Foundation",
    category: "Higher Education",
    title: "Establishment of NAMI & UK Degree Programmes",
    summary:
      "Naaya Aayam Multi-Disciplinary Institute (NAMI) was established in Kathmandu, partnering directly with the University of Northampton, UK, to offer internationally accredited undergraduate and postgraduate degrees.",
    points: [
      "BSc (Hons) in Computing, Software Engineering, Network Engineering & Environmental Science",
      "Bachelor of Business Administration (BBA) and Master's Degrees",
      "Direct UK university academic moderation and international quality standards",
    ],
    image: "/nami/campus-auditorium.jpg",
    imageAlt: "NAMI Auditorium during initial academic convocation",
    partnerLogo: "/universities/northampton.png",
    partnerName: "University of Northampton (UK)",
  },
  {
    year: "2013",
    era: "Campus Scaling",
    category: "College Incorporation",
    title: "Incorporation & Expansion of NAMI College",
    summary:
      "NAMI College was formally incorporated, expanding the Gokarneshwor campus with multi-storey academic wings, advanced science laboratories, and extensive co-curricular student life facilities.",
    points: [
      "Dedicated multi-tier wings for secondary and pre-university learning",
      "Modern physics, chemistry, and biology experimental suites",
      "Student leadership councils, sports leagues, and community outreach",
    ],
    image: "/nami/campus-library.jpg",
    imageAlt: "NAMI College Resource Center and Library",
    partnerLogo: "/logo/nami-college.png",
    partnerName: "NAMI College",
  },
  {
    year: "2014",
    era: "Cambridge A-Levels",
    category: "Cambridge International",
    title: "Launch of Cambridge International GCE A-Levels",
    summary:
      "NAMI College launched the prestigious Cambridge Assessment International Education (CAIE) GCE A-Level programme, offering gold-standard Science and Non-Science streams with global university placement guidance.",
    points: [
      "Gold-standard British pre-university curriculum with specialist faculty",
      "Extensive laboratory practicals and science Olympiad preparation",
      "Graduates securing admissions and scholarships worldwide",
    ],
    image: "/nami/campus-science-lab.jpg",
    imageAlt: "NAMI Cambridge A-Level Chemistry Laboratory Practical",
    partnerLogo: "/universities/cambridge.png",
    partnerName: "Cambridge Assessment International Education",
  },
  {
    year: "2019",
    era: "National Board",
    category: "School & +2 NEB",
    title: "Launch of NAMI International School & NEB +2",
    summary:
      "NAMI expanded into the national curriculum with the inception of NAMI International School, offering National Examinations Board (NEB) affiliated 10+2 Science and Management programmes.",
    points: [
      "NEB +2 Science and Management streams with tech-enabled pedagogy",
      "Leadership retreats, entrance preparation, and eco-initiatives",
      "Modern digital lecture halls and interactive learning spaces",
    ],
    image: "/nami/campus-science-lab-2.jpg",
    imageAlt: "NAMI International School Science & Biology Laboratory",
    partnerLogo: "/universities/neb.png",
    partnerName: "National Examinations Board (Nepal)",
  },
  {
    year: "2024",
    era: "Comprehensive K-12",
    category: "Primary Wing & CAIE Centre",
    title: "Primary Wing Launch & CAIE Home Centre Status",
    summary:
      "NAMI became a full K-12 ecosystem by opening its Primary and Middle School division under Founding Principal Ms. Anisha Panday Joshi, while NAMI College earned independent CAIE Examination Home Centre accreditation.",
    points: [
      "Primary & Middle School (Grades 1–7) with child-centric learning",
      "Independent Cambridge International Home Examination Centre in Nepal",
      "Mr. Pranil Pandey, FCCA appointed as CEO to lead strategic governance",
    ],
    image: "/nami/level-school.jpg",
    imageAlt: "NAMI International School Campus Grounds and Fleet",
    partnerLogo: "/logo/International School-ai.png",
    partnerName: "NAMI International School",
  },
  {
    year: "2024",
    era: "Global Testing",
    category: "Pearson VUE Authorized",
    title: "Pearson VUE-Authorized Test Center Collaboration",
    summary:
      "NAMI established an officially authorized Pearson VUE computer-based testing centre in Kathmandu, empowering students and IT professionals to sit for globally accredited certification examinations.",
    points: [
      "On-campus Pearson VUE-Authorized Computer-Based Testing Centre",
      "Global IT, academic, and professional licensure certifications",
      "High-security testing infrastructure meeting international standards",
    ],
    image: "/partners/pearson-vue.jpg",
    imageAlt: "Pearson VUE-Authorized Test Center at NAMI",
    partnerLogo: "/partners/pearson-vue.jpg",
    partnerName: "Pearson VUE Authorized Testing",
  },
  {
    year: "2025–2026",
    era: "Future Frontiers",
    category: "KU, UK & CTEVT",
    title: "Kathmandu University Partnership & CTEVT Programmes",
    summary:
      "NAMI marked major academic diversification through a strategic MoU with Kathmandu University (KU) for BSc Environmental Studies, collaboration with University of Hertfordshire (UK), and CTEVT vocational programmes.",
    points: [
      "BSc in Environmental Studies in academic partnership with Kathmandu University (KU)",
      "University of Hertfordshire (UK) degree collaboration and Pearson VUE Testing Centre",
      "CTEVT-accredited skill-based vocational training programmes",
    ],
    image: "/nami/hero-mustang.jpg",
    imageAlt: "NAMI Environmental Science Academic Field Expedition in Mustang",
    partnerLogo: "/universities/Kathmandu_University_Logo.webp",
    partnerName: "Kathmandu University Partnership",
  },
];

export function CompactTimeline() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const active = MILESTONES[selectedIndex]!;

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : MILESTONES.length - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev < MILESTONES.length - 1 ? prev + 1 : 0));
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="w-full">
      {/* Horizontal Minimalist Stepper Track */}
      <div className="relative mb-8 sm:mb-10">
        {/* Connecting line behind buttons */}
        <div
          aria-hidden="true"
          className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-0.5 bg-border hidden md:block"
        />

        <div className="relative flex items-center justify-between gap-2 overflow-x-auto no-scrollbar py-2">
          {MILESTONES.map((item, index) => {
            const isSelected = selectedIndex === index;
            const isPast = index < selectedIndex;

            return (
              <button
                key={item.year}
                type="button"
                onClick={() => setSelectedIndex(index)}
                className={cn(
                  "group relative flex flex-col items-center gap-2 px-3 sm:px-4 py-2 rounded-2xl transition-all duration-200 cursor-pointer shrink-0 z-10",
                  isSelected
                    ? "bg-surface-raised border border-accent/40 shadow-xs"
                    : "hover:bg-surface-raised/50",
                )}
              >
                {/* Year Indicator & Dot */}
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "size-3 rounded-full transition-all duration-200",
                      isSelected
                        ? "bg-accent ring-4 ring-accent/20 scale-125"
                        : isPast
                          ? "bg-accent"
                          : "bg-neutral-300 group-hover:bg-neutral-400",
                    )}
                  />
                  <span
                    className={cn(
                      "font-display text-sm sm:text-base font-bold transition-colors",
                      isSelected
                        ? "text-accent"
                        : "text-ink/80 group-hover:text-ink",
                    )}
                  >
                    {item.year}
                  </span>
                </div>

                <span
                  className={cn(
                    "text-2xs font-semibold px-2 py-0.5 rounded-full whitespace-nowrap transition-colors",
                    isSelected
                      ? "bg-accent/10 text-accent"
                      : "text-ink-muted group-hover:text-ink",
                  )}
                >
                  {item.era}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Single-Screen Milestone Spotlight Card */}
      <div className="rounded-3xl border border-border/90 bg-surface p-6 sm:p-8 lg:p-10 shadow-sm transition-all duration-300">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Narrative Column (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              {/* Badge & Step counter */}
              <div className="flex items-center justify-between gap-4 border-b border-border/80 pb-4 mb-5">
                <div className="flex items-center gap-2.5">
                  <span className="font-display text-3xl sm:text-4xl font-extrabold text-accent">
                    {active.year}
                  </span>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-neutral-100 text-ink">
                    {active.category}
                  </span>
                </div>

                {/* Arrow Controls */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous milestone"
                    className="size-8 rounded-full border border-border bg-surface flex items-center justify-center text-ink-muted hover:text-accent hover:border-accent/40 transition-colors cursor-pointer shadow-2xs"
                  >
                    <Icon icon={ArrowLeftIcon} className="size-4" />
                  </button>
                  <span className="text-xs font-medium text-ink-muted tabular-nums">
                    {selectedIndex + 1} / {MILESTONES.length}
                  </span>
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next milestone"
                    className="size-8 rounded-full border border-border bg-surface flex items-center justify-center text-ink-muted hover:text-accent hover:border-accent/40 transition-colors cursor-pointer shadow-2xs"
                  >
                    <Icon icon={ArrowRightIcon} className="size-4" />
                  </button>
                </div>
              </div>

              {/* Title */}
              <H3 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-ink leading-tight">
                {active.title}
              </H3>

              {/* Summary */}
              <P className="mt-3 text-sm sm:text-base text-ink/85 leading-relaxed text-justify [text-align-last:left]">
                {active.summary}
              </P>

              {/* Punchy Key Points */}
              <div className="mt-5 space-y-2.5">
                {active.points.map((point) => (
                  <div key={point} className="flex items-start gap-2.5">
                    <span className="mt-1.5 size-1.5 rounded-full bg-accent shrink-0" />
                    <span className="text-xs sm:text-sm text-ink/90 font-medium leading-snug">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Partner Emblem if available */}
            {active.partnerLogo && (
              <div className="mt-6 pt-4 border-t border-border/70 flex items-center justify-between">
                <span className="text-xs font-semibold text-ink-muted">
                  Official Body / Partner:{" "}
                  <strong className="text-ink font-semibold">
                    {active.partnerName}
                  </strong>
                </span>
                <div className="relative h-8 sm:h-9 w-28 sm:w-36">
                  <Image
                    src={active.partnerLogo}
                    alt={active.partnerName ?? "Partner logo"}
                    fill
                    unoptimized
                    className="object-contain object-right"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Right Visual Image Column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl border border-border bg-neutral-900 shadow-xs">
              <Image
                key={active.image}
                src={active.image}
                alt={active.imageAlt}
                fill
                className="object-cover transition-opacity duration-300"
                sizes="(max-width: 1024px) 100vw, 460px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-4 right-4 text-xs text-white/95 font-medium truncate">
                {active.imageAlt}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
