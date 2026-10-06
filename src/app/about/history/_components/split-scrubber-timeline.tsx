"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/motion/reveal";
import { Eyebrow, H2, H3, P } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

type Milestone = {
  readonly id: string;
  readonly year: string;
  readonly shortYear: string;
  readonly eraTag: string;
  readonly category: string;
  readonly title: string;
  readonly leadSummary: string;
  readonly highlights: readonly {
    readonly title: string;
    readonly desc: string;
  }[];
  readonly image: string;
  readonly imageAlt: string;
  readonly partnerLogo?: string;
  readonly partnerName?: string;
};

const MILESTONES: readonly Milestone[] = [
  {
    id: "era-2012",
    year: "2012",
    shortYear: "'12",
    eraTag: "The Foundation",
    category: "Higher Education & Degrees",
    title: "Founding of Naaya Aayam Multi-Disciplinary Institute (NAMI)",
    leadSummary:
      "NAMI was established in Kathmandu with a visionary mission to deliver globally recognized British undergraduate and postgraduate degrees in direct partnership with the University of Northampton, UK.",
    highlights: [
      {
        title: "UK Accredited Honours Degrees",
        desc: "BSc (Hons) in Computing, Software Engineering, Network Engineering, Environmental Science, and BBA.",
      },
      {
        title: "British University Moderation",
        desc: "Full curriculum oversight, international moderation, and joint quality assurance.",
      },
      {
        title: "Modern Research Facilities",
        desc: "Purpose-built campus with dedicated digital laboratories, auditorium, and reading halls.",
      },
    ],
    image: "/nami/campus-auditorium.jpg",
    imageAlt: "NAMI Auditorium during initial academic convocation",
    partnerLogo: "/universities/northampton.png",
    partnerName: "University of Northampton (UK)",
  },
  {
    id: "era-2013",
    year: "2013",
    shortYear: "'13",
    eraTag: "Campus Scaling",
    category: "College Incorporation",
    title: "Incorporation & Expansion of NAMI College",
    leadSummary:
      "To meet the surge in demand for quality higher secondary education, NAMI College was incorporated, expanding the Gokarneshwor campus with multi-storey academic buildings and specialized scientific laboratories.",
    highlights: [
      {
        title: "Comprehensive Campus Scaling",
        desc: "Multi-tiered facilities designed for seamless progression from secondary to higher education.",
      },
      {
        title: "Advanced Scientific Labs",
        desc: "State-of-the-art physics, chemistry, and biology experimental suites.",
      },
      {
        title: "Co-Curricular Life",
        desc: "Student leadership councils, sports leagues, social service camps, and cultural events.",
      },
    ],
    image: "/nami/campus-library.jpg",
    imageAlt: "NAMI College Resource Center and Library",
    partnerLogo: "/logo/nami-college.png",
    partnerName: "NAMI College",
  },
  {
    id: "era-2014",
    year: "2014",
    shortYear: "'14",
    eraTag: "Cambridge Excellence",
    category: "Cambridge International",
    title: "Launch of Cambridge International GCE A-Levels",
    leadSummary:
      "NAMI College launched the gold-standard Cambridge Assessment International Education (CAIE) GCE A-Level programme, offering rigorous Science and Non-Science streams to Nepal's top students.",
    highlights: [
      {
        title: "Premier British Pre-University Education",
        desc: "Internationally standard A-Level qualifications with dedicated subject specialist faculty.",
      },
      {
        title: "Global University Placements",
        desc: "Graduates securing admissions and scholarships at top-tier universities worldwide.",
      },
      {
        title: "Olympiad & Practical Excellence",
        desc: "Structured research methodology, scientific Olympiads, and intensive lab practicals.",
      },
    ],
    image: "/nami/campus-science-lab.jpg",
    imageAlt: "NAMI Cambridge A-Level Chemistry Laboratory Practical",
    partnerLogo: "/universities/cambridge.png",
    partnerName: "Cambridge Assessment International Education",
  },
  {
    id: "era-2019",
    year: "2019",
    shortYear: "'19",
    eraTag: "National Board",
    category: "School & +2 NEB",
    title: "Establishment of NAMI International School & NEB +2",
    leadSummary:
      "NAMI expanded into the national curriculum with the establishment of NAMI International School and the launch of National Examinations Board (NEB) affiliated 10+2 Science and Management programmes.",
    highlights: [
      {
        title: "NEB +2 Science & Management",
        desc: "Combining national curriculum rigor with progressive, tech-enabled pedagogy.",
      },
      {
        title: "Holistic Youth Development",
        desc: "Youth leadership retreats, entrance preparation workshops, and eco-initiatives.",
      },
      {
        title: "Interactive Smart Classrooms",
        desc: "Modern digital lecture theatres and collaborative problem-solving spaces.",
      },
    ],
    image: "/nami/campus-science-lab-2.jpg",
    imageAlt: "NAMI International School Science & Biology Laboratory",
    partnerLogo: "/universities/neb.png",
    partnerName: "National Examinations Board (Nepal)",
  },
  {
    id: "era-2024",
    year: "2024",
    shortYear: "'24",
    eraTag: "K-12 & Exam Centre",
    category: "Primary Wing & CAIE Centre",
    title: "Primary Wing Launch & CAIE Independent Home Centre",
    leadSummary:
      "NAMI transformed into a complete K-12 ecosystem by opening its Primary and Middle School division under Founding Principal Ms. Anisha Panday Joshi, while NAMI College earned independent CAIE Home Examination Centre accreditation.",
    highlights: [
      {
        title: "Primary & Middle School (Grades 1–7)",
        desc: "Child-centric curriculum focusing on foundational literacy, STEM, arts, and emotional resilience.",
      },
      {
        title: "Independent CAIE Examination Centre",
        desc: "Accredited as a standalone Cambridge International Home Examination Centre in Nepal.",
      },
      {
        title: "Executive Leadership Transition",
        desc: "Appointment of Mr. Pranil Pandey, FCCA as CEO to drive strategic growth and institutional governance.",
      },
    ],
    image: "/nami/level-school.jpg",
    imageAlt: "NAMI International School Campus Grounds and Fleet",
    partnerLogo: "/logo/International School-ai.png",
    partnerName: "NAMI International School",
  },
  {
    id: "era-2026",
    year: "2025–2026",
    shortYear: "'26",
    eraTag: "Future Frontiers",
    category: "KU, UK & CTEVT Partnerships",
    title: "Kathmandu University Partnership & CTEVT Programmes",
    leadSummary:
      "NAMI marked a landmark expansion in academic diversification through a strategic MoU with Kathmandu University (KU) for Bachelor of Science in Environmental Studies (BES), collaboration with University of Hertfordshire (UK), and CTEVT vocational programmes.",
    highlights: [
      {
        title: "Kathmandu University (KU) Partnership",
        desc: "Delivering the prestigious Bachelor of Science in Environmental Studies (BES).",
      },
      {
        title: "University of Hertfordshire Alliance",
        desc: "Expanding international computing, engineering, and digital business degrees.",
      },
      {
        title: "CTEVT Vocational Skills Training",
        desc: "Accredited skill-based vocational programmes aligned with immediate employment.",
      },
      {
        title: "Pearson VUE Authorized Testing Centre",
        desc: "On-campus international computer-based testing and IT certification facility.",
      },
    ],
    image: "/nami/hero-mustang.jpg",
    imageAlt: "NAMI Environmental Science Academic Field Expedition in Mustang",
    partnerLogo: "/universities/Kathmandu_University_Logo.webp",
    partnerName: "Kathmandu University Partnership",
  },
];

export function SplitScrubberTimeline() {
  const [activeId, setActiveId] = useState<string>("era-2012");
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());

  // Set up scroll tracking via IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -40% 0px",
        threshold: 0.1,
      },
    );

    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToEra = (id: string) => {
    setActiveId(id);
    const element = document.getElementById(id);
    if (element) {
      const topOffset =
        element.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top: topOffset, behavior: "smooth" });
    }
  };

  const currentMilestone: Milestone =
    MILESTONES.find((m) => m.id === activeId) ?? MILESTONES[0]!;
  const activeIndex = Math.max(
    0,
    MILESTONES.findIndex((m) => m.id === activeId),
  );
  const progressPercent = ((activeIndex + 1) / MILESTONES.length) * 100;

  return (
    <div className="relative w-full">
      {/* Mobile Sticky Year Scrubber (Top Bar on Small Screens) */}
      <div className="lg:hidden sticky top-20 z-30 mb-8 py-3 px-4 rounded-2xl bg-surface/95 backdrop-blur-md border border-border shadow-md">
        <div className="flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
          {MILESTONES.map((item) => {
            const isActive = activeId === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToEra(item.id)}
                className={cn(
                  "px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer whitespace-nowrap",
                  isActive
                    ? "bg-accent text-white shadow-xs scale-105"
                    : "text-ink-muted hover:text-accent hover:bg-accent/10",
                )}
              >
                {item.year}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-start">
        {/* Left Sticky Scrubber Column (Desktop - 4 cols) */}
        <aside className="hidden lg:block lg:col-span-4 sticky top-28 h-[calc(100vh-140px)] flex-col justify-between">
          <div className="rounded-3xl border border-border/90 bg-surface-raised/80 backdrop-blur-md p-6 xl:p-8 shadow-sm">
            {/* Header & Progress Indicator */}
            <div className="border-b border-border/80 pb-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-accent">
                  Timeline Scrubber
                </span>
                <span className="text-xs font-semibold text-ink-muted">
                  Era {activeIndex + 1} of {MILESTONES.length}
                </span>
              </div>

              {/* Glowing Dynamic Progress Track */}
              <div className="mt-3.5 h-1.5 w-full rounded-full bg-neutral-200 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-accent to-accent/80 transition-all duration-500 rounded-full shadow-[0_0_8px_rgba(189,27,33,0.5)]"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Vertical Year Stepper */}
            <nav
              aria-label="Timeline Eras"
              className="mt-6 flex flex-col gap-2 relative"
            >
              {/* Vertical connecting line */}
              <div
                aria-hidden="true"
                className="absolute left-4.5 top-3 bottom-3 w-0.5 bg-border -translate-x-1/2"
              />

              {MILESTONES.map((item, idx) => {
                const isActive = activeId === item.id;
                const isPassed = idx <= activeIndex;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollToEra(item.id)}
                    className={cn(
                      "group flex items-center gap-4 p-2.5 rounded-2xl transition-all duration-200 text-left w-full cursor-pointer relative z-10",
                      isActive
                        ? "bg-accent/10 border border-accent/30 shadow-xs"
                        : "hover:bg-surface/80 border border-transparent",
                    )}
                  >
                    {/* Stepper Node */}
                    <div
                      className={cn(
                        "size-4 rounded-full flex items-center justify-center shrink-0 transition-all duration-300",
                        isActive
                          ? "ring-4 ring-accent/30 bg-accent scale-110 shadow-sm"
                          : isPassed
                            ? "bg-accent"
                            : "bg-neutral-300 group-hover:bg-accent/60",
                      )}
                    >
                      {isActive && (
                        <span className="size-1.5 rounded-full bg-white animate-ping" />
                      )}
                    </div>

                    {/* Year & Era Text */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={cn(
                            "font-display text-base font-bold transition-colors",
                            isActive
                              ? "text-accent"
                              : "text-ink group-hover:text-accent",
                          )}
                        >
                          {item.year}
                        </span>
                        <span
                          className={cn(
                            "text-2xs font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider",
                            isActive
                              ? "bg-accent text-white"
                              : "bg-neutral-100 text-ink-muted group-hover:text-ink",
                          )}
                        >
                          {item.eraTag}
                        </span>
                      </div>
                      <p className="text-xs text-ink-muted truncate mt-0.5">
                        {item.category}
                      </p>
                    </div>
                  </button>
                );
              })}
            </nav>

            {/* Live Active Era Snapshot Card */}
            <div className="mt-6 pt-5 border-t border-border/80">
              <div className="p-3.5 rounded-2xl bg-surface border border-border/70">
                <p className="text-2xs font-bold uppercase tracking-wider text-accent mb-1">
                  Active Spotlight
                </p>
                <p className="font-display text-sm font-bold text-ink truncate">
                  {currentMilestone.title}
                </p>
                <p className="text-xs text-ink-muted mt-1 line-clamp-2">
                  {currentMilestone.leadSummary}
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* Right Scrollable Story Cards (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-12 sm:gap-16 lg:gap-20">
          {MILESTONES.map((milestone) => {
            const isActive = activeId === milestone.id;

            return (
              <section
                key={milestone.id}
                id={milestone.id}
                ref={(el) => {
                  if (el) sectionRefs.current.set(milestone.id, el);
                }}
                className="scroll-mt-28"
              >
                <div
                  className={cn(
                    "group relative overflow-hidden rounded-3xl border bg-surface p-6 sm:p-8 lg:p-10 shadow-xs transition-all duration-500",
                    isActive
                      ? "border-accent/60 ring-2 ring-accent/20 bg-surface-raised shadow-lg"
                      : "border-border/90 hover:border-accent/30",
                  )}
                >
                  {/* Giant Watermark Year in Background */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none select-none absolute -right-2 -top-6 font-display text-8xl sm:text-9xl lg:text-[10rem] font-black text-ink/[0.03] transition-transform duration-700 group-hover:scale-105"
                  >
                    {milestone.shortYear}
                  </span>

                  {/* Card Header Bar */}
                  <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-border/80 pb-4">
                    <div className="flex items-center gap-3">
                      <span className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-accent tracking-tight">
                        {milestone.year}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-neutral-100 text-ink">
                        {milestone.eraTag}
                      </span>
                    </div>

                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-accent/10 text-accent border border-accent/20">
                      <span className="size-1.5 rounded-full bg-accent" />
                      {milestone.category}
                    </span>
                  </div>

                  {/* Title & Lead Summary */}
                  <div className="relative z-10 mt-5">
                    <H3 className="font-display text-2xl sm:text-3xl font-bold text-ink group-hover:text-accent transition-colors leading-tight">
                      {milestone.title}
                    </H3>

                    <P className="mt-3 text-sm sm:text-base text-ink/90 leading-relaxed text-justify [text-align-last:left]">
                      {milestone.leadSummary}
                    </P>
                  </div>

                  {/* High-Resolution Archive Photo */}
                  <div className="relative z-10 mt-6 aspect-16/9 w-full overflow-hidden rounded-2xl border border-border bg-neutral-900 shadow-xs">
                    <Image
                      src={milestone.image}
                      alt={milestone.imageAlt}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 720px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-3 left-4 right-4 text-xs text-white/95 font-medium truncate">
                      {milestone.imageAlt}
                    </div>
                  </div>

                  {/* Structured Highlights Grid */}
                  <div className="relative z-10 mt-6 pt-5 border-t border-border/80">
                    <p className="text-xs font-bold uppercase tracking-wider text-ink-muted mb-3.5 flex items-center gap-2">
                      <span className="size-2 rounded-full bg-accent" />
                      Key Institutional Achievements:
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                      {milestone.highlights.map((h) => (
                        <div
                          key={h.title}
                          className="p-3.5 rounded-xl bg-surface-raised/80 border border-border/60 hover:border-accent/30 transition-colors"
                        >
                          <p className="font-body text-xs font-bold text-ink leading-snug">
                            {h.title}
                          </p>
                          <p className="mt-1 text-2xs sm:text-xs text-ink-muted leading-relaxed">
                            {h.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Partner / Entity Badge */}
                  {milestone.partnerLogo && (
                    <div className="relative z-10 mt-6 pt-4 border-t border-border/70 flex items-center justify-between">
                      <span className="text-xs font-semibold text-ink-muted">
                        Official Entity / Partner:{" "}
                        <strong className="text-ink font-semibold">
                          {milestone.partnerName}
                        </strong>
                      </span>
                      <div className="relative h-8 sm:h-9 w-28 sm:w-36">
                        <Image
                          src={milestone.partnerLogo}
                          alt={milestone.partnerName ?? "Partner logo"}
                          fill
                          unoptimized
                          className="object-contain object-right"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
