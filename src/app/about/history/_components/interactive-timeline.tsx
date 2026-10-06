"use client";

import Image from "next/image";
import { useState } from "react";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { Eyebrow, H2, H3, P } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

type ChapterMilestone = {
  readonly id: string;
  readonly chapterNumber: string;
  readonly year: string;
  readonly eraTag: string;
  readonly title: string;
  readonly summary: string;
  readonly bullets: readonly { readonly lead: string; readonly text: string }[];
  readonly image: string;
  readonly imageAlt: string;
  readonly partnerLogo?: string;
  readonly partnerName?: string;
};

const CHAPTERS: readonly ChapterMilestone[] = [
  {
    id: "chapter-2012",
    chapterNumber: "01",
    year: "2012",
    eraTag: "The Inception",
    title: "Founding of Naaya Aayam Multi-Disciplinary Institute",
    summary:
      "NAMI was established in Kathmandu by visionary educationists with a bold mission: delivering world-class UK degree programmes in Nepal in direct partnership with the University of Northampton.",
    bullets: [
      {
        lead: "Pioneering UK Degrees:",
        text: "Introduced BSc (Hons) in Computing, Software Engineering, Network Engineering, Environmental Science, and BBA.",
      },
      {
        lead: "Direct University Moderation:",
        text: "Academic delivery, assessment frameworks, and quality assurance moderated directly with British university standards.",
      },
      {
        lead: "Modern Tertiary Infrastructure:",
        text: "Commissioned dedicated computing research labs, auditorium, and multi-disciplinary academic facilities.",
      },
    ],
    image: "/nami/campus-auditorium.jpg",
    imageAlt: "NAMI Campus Auditorium and student convocation gathering",
    partnerLogo: "/universities/northampton.png",
    partnerName: "University of Northampton (UK)",
  },
  {
    id: "chapter-2013",
    chapterNumber: "02",
    year: "2013",
    eraTag: "Campus Expansion",
    title: "Incorporation of NAMI College",
    summary:
      "To bridge pre-university learning with undergraduate excellence, NAMI College was incorporated, expanding the Gokarneshwor campus with specialized academic wings and laboratories.",
    bullets: [
      {
        lead: "Campus Scaling:",
        text: "Added dedicated multi-storey wings for secondary, pre-university, and professional learning.",
      },
      {
        lead: "Advanced Scientific Facilities:",
        text: "Built state-of-the-art physics, chemistry, and biology laboratories equipped for international practicals.",
      },
      {
        lead: "Student Co-Curricular Ecosystem:",
        text: "Instituted student governance, dynamic interest clubs, sports leagues, and community service camps.",
      },
    ],
    image: "/nami/campus-library.jpg",
    imageAlt: "NAMI College Library and Learning Resource Centre",
    partnerLogo: "/logo/nami-college.png",
    partnerName: "NAMI College",
  },
  {
    id: "chapter-2014",
    chapterNumber: "03",
    year: "2014",
    eraTag: "Cambridge Excellence",
    title: "Launch of Cambridge International GCE A-Levels",
    summary:
      "NAMI College launched the gold-standard Cambridge Assessment International Education (CAIE) GCE A-Level programme, offering rigorous Science and Non-Science streams to ambitious students.",
    bullets: [
      {
        lead: "Gold-Standard UK Curriculum:",
        text: "Delivered internationally recognized A-Level subjects with expert specialist faculty.",
      },
      {
        lead: "Global University Gateways:",
        text: "Mentored graduates into premier universities across the United States, United Kingdom, Australia, and Asia.",
      },
      {
        lead: "Olympiad & Research Culture:",
        text: "Fostered analytical inquiry, STEM competitions, and extensive laboratory research.",
      },
    ],
    image: "/nami/campus-science-lab.jpg",
    imageAlt: "NAMI Cambridge A-Level Chemistry Laboratory Practical",
    partnerLogo: "/universities/cambridge.png",
    partnerName: "Cambridge Assessment International Education",
  },
  {
    id: "chapter-2019",
    chapterNumber: "04",
    year: "2019",
    eraTag: "National Curriculum",
    title: "Establishment of NAMI International School & NEB +2",
    summary:
      "NAMI expanded into the national curriculum by establishing NAMI International School with National Examinations Board (NEB) affiliated +2 Science and Management programmes.",
    bullets: [
      {
        lead: "NEB +2 Science & Management:",
        text: "Combined rigorous board standards with progressive interactive learning methods.",
      },
      {
        lead: "Holistic Student Development:",
        text: "Integrated leadership retreats, coding bootcamps, and entrance preparation support.",
      },
      {
        lead: "Interactive Digital Classrooms:",
        text: "Equipped lecture halls with multimedia presentation technologies and collaborative study spaces.",
      },
    ],
    image: "/nami/campus-science-lab-2.jpg",
    imageAlt: "NAMI International School Science & Biology Laboratory",
    partnerLogo: "/universities/neb.png",
    partnerName: "National Examinations Board (Nepal)",
  },
  {
    id: "chapter-2024",
    chapterNumber: "05",
    year: "2024",
    eraTag: "Comprehensive K-12",
    title: "Primary Wing Launch & CAIE Independent Home Centre",
    summary:
      "NAMI grew into a complete K-12 institution by opening its Primary and Middle School division (Grades 1–7) under Founding Principal Ms. Anisha Panday Joshi, while NAMI College earned independent CAIE Home Centre status.",
    bullets: [
      {
        lead: "Primary & Middle School Opening:",
        text: "Launched child-centric learning focusing on foundational literacy, STEM, arts, and emotional intelligence.",
      },
      {
        lead: "Independent CAIE Examination Centre:",
        text: "Accredited as a standalone Cambridge International Home Examination Centre in Nepal.",
      },
      {
        lead: "Executive Leadership Transition:",
        text: "Appointed Mr. Pranil Pandey, FCCA as CEO to drive strategic governance and international growth.",
      },
    ],
    image: "/nami/level-school.jpg",
    imageAlt: "NAMI International School Fleet and Primary Campus Grounds",
    partnerLogo: "/logo/International School-ai.png",
    partnerName: "NAMI International School",
  },
  {
    id: "chapter-2026",
    chapterNumber: "06",
    year: "2025–2026",
    eraTag: "Future Frontiers",
    title: "Kathmandu University Partnership, UK Links & CTEVT Programmes",
    summary:
      "NAMI entered a transformative phase of multi-disciplinary diversification with a historic Kathmandu University (KU) partnership for BES, University of Hertfordshire collaboration, and CTEVT vocational programmes.",
    bullets: [
      {
        lead: "Kathmandu University (KU) Partnership:",
        text: "Delivering the prestigious Bachelor of Science in Environmental Studies (BES).",
      },
      {
        lead: "University of Hertfordshire Alliance:",
        text: "Expanding global pathways in computing, engineering, and digital technology.",
      },
      {
        lead: "CTEVT Vocational Skills Training:",
        text: "Accredited short-term technical courses aligned with practical industry employment.",
      },
      {
        lead: "Pearson VUE Authorized Centre:",
        text: "On-campus international computer-based testing and certification facility.",
      },
    ],
    image: "/nami/hero-mustang.jpg",
    imageAlt: "NAMI Environmental Science Academic Field Research in Mustang",
    partnerLogo: "/universities/Kathmandu_University_Logo.webp",
    partnerName: "Kathmandu University Partnership",
  },
];

export function InteractiveTimeline() {
  const [activeYear, setActiveYear] = useState<string>("2012");

  const scrollToChapter = (id: string, year: string) => {
    setActiveYear(year);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="w-full">
      {/* Sticky Quick-Jump Year Navigation */}
      <div className="sticky top-20 z-30 mb-12 sm:mb-16 py-3 px-4 sm:px-6 rounded-2xl bg-surface/90 backdrop-blur-md border border-border shadow-md max-w-4xl mx-auto flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
        <span className="text-xs font-bold uppercase tracking-wider text-ink-muted hidden sm:inline-block shrink-0">
          Jump to Year:
        </span>
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {CHAPTERS.map((ch) => {
            const isActive = activeYear === ch.year;
            return (
              <button
                key={ch.id}
                type="button"
                onClick={() => scrollToChapter(ch.id, ch.year)}
                className={cn(
                  "px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap",
                  isActive
                    ? "bg-accent text-white shadow-xs"
                    : "text-ink/80 hover:text-accent hover:bg-accent/10",
                )}
              >
                {ch.year}
              </button>
            );
          })}
        </div>
      </div>

      {/* Vertical Chapter Stories */}
      <div className="flex flex-col gap-16 sm:gap-24 lg:gap-32">
        {CHAPTERS.map((chapter, index) => {
          const isReversed = index % 2 !== 0;

          return (
            <article key={chapter.id} id={chapter.id} className="scroll-mt-36">
              <div
                className={cn(
                  "grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center",
                )}
              >
                {/* Visual Imagery Column (6 cols) */}
                <div
                  className={cn(
                    "lg:col-span-6 flex flex-col",
                    isReversed && "lg:order-2",
                  )}
                >
                  <Reveal y={20}>
                    <div className="group relative aspect-16/10 w-full overflow-hidden rounded-3xl border border-border/80 bg-neutral-900 shadow-md">
                      <Image
                        src={chapter.image}
                        alt={chapter.imageAlt}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 580px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                      {/* Chapter Badge Overlay */}
                      <div className="absolute top-4 left-4 sm:top-5 sm:left-5 flex items-center gap-2">
                        <span className="px-3.5 py-1 rounded-full bg-neutral-950/80 backdrop-blur-md text-white font-display font-bold text-xs sm:text-sm shadow-sm">
                          Chapter {chapter.chapterNumber}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-accent text-white font-body font-semibold text-xs shadow-sm">
                          {chapter.eraTag}
                        </span>
                      </div>

                      {/* Bottom Caption */}
                      <div className="absolute bottom-3 left-4 right-4 text-xs text-white/90 font-medium truncate">
                        {chapter.imageAlt}
                      </div>
                    </div>
                  </Reveal>
                </div>

                {/* Editorial Content Column (6 cols) */}
                <div
                  className={cn(
                    "lg:col-span-6 flex flex-col justify-center",
                    isReversed && "lg:order-1",
                  )}
                >
                  <Reveal y={16}>
                    <div>
                      {/* Year Indicator */}
                      <div className="flex items-baseline gap-3 mb-2">
                        <span className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-accent tracking-tight">
                          {chapter.year}
                        </span>
                        <span className="text-xs sm:text-sm font-semibold text-ink-muted uppercase tracking-wider">
                          Institutional Landmark
                        </span>
                      </div>

                      {/* Chapter Title */}
                      <H2 className="font-display text-2xl sm:text-3xl font-bold text-ink leading-tight tracking-tight mt-1">
                        {chapter.title}
                      </H2>

                      {/* Summary Narrative */}
                      <P className="mt-4 text-sm sm:text-base text-ink/85 leading-relaxed text-justify [text-align-last:left]">
                        {chapter.summary}
                      </P>

                      {/* Punchy Key Highlights */}
                      <div className="mt-6 pt-5 border-t border-border/80">
                        <p className="text-xs font-bold uppercase tracking-wider text-ink-muted mb-3.5">
                          Key Achievements &amp; Deliverables:
                        </p>
                        <ul className="space-y-3 font-body text-xs sm:text-sm text-ink/85">
                          {chapter.bullets.map((b) => (
                            <li
                              key={b.lead}
                              className="flex items-start gap-2.5"
                            >
                              <span className="mt-1 size-2 rounded-full bg-accent shrink-0" />
                              <p className="leading-snug">
                                <strong className="text-ink font-semibold">
                                  {b.lead}{" "}
                                </strong>
                                {b.text}
                              </p>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Partner Logo Badge if present */}
                      {chapter.partnerLogo && (
                        <div className="mt-6 pt-4 border-t border-border/70 flex items-center justify-between">
                          <span className="text-xs font-semibold text-ink-muted">
                            {chapter.partnerName}
                          </span>
                          <div className="relative h-8 sm:h-9 w-28 sm:w-36">
                            <Image
                              src={chapter.partnerLogo}
                              alt={chapter.partnerName ?? "Partner logo"}
                              fill
                              unoptimized
                              className="object-contain object-right"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </Reveal>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
