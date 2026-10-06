"use client";

import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Eyebrow, H3 } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

type UniversityPartner = {
  readonly id: "northampton" | "kathmandu-university";
  readonly badge: string;
  readonly partnerStatus: string;
  readonly name: string;
  readonly location: string;
  readonly logo: string;
  readonly overview: readonly string[];
  readonly metrics: readonly {
    readonly value: string;
    readonly label: string;
  }[];
  readonly programmes: readonly {
    readonly title: string;
    readonly award: string;
    readonly duration?: string;
  }[];
  readonly leaderRole: string;
  readonly leaderName: string;
  readonly leaderTitle: string;
  readonly leaderAffiliation: string;
  readonly leaderPhoto?: string;
  readonly leaderQuote: string;
  readonly leaderMessage: readonly string[];
  readonly note?: string;
};

const UNIVERSITY_PARTNERS: readonly UniversityPartner[] = [
  {
    id: "northampton",
    badge: "Official UK Degree Awarding Partner",
    partnerStatus: "Direct Academic Partnership Since 2012",
    name: "University of Northampton, UK",
    location: "Waterside Campus, University Drive, Northampton - NN1 5PH",
    logo: "/logos/universities/northampton.png",
    overview: [
      "The University of Northampton is a leading British public university located on its purpose-built £330 million Waterside Campus in England. Globally recognized as the UK's first Ashoka U Changemaker Campus and commended for teaching excellence under the British Teaching Excellence Framework (TEF), the university champions social innovation, enterprise, and high graduate outcomes.",
      "Since 2012, NAMI has operated in direct academic partnership with the University of Northampton to deliver accredited undergraduate and postgraduate degrees in Kathmandu. Programmes follow identical curricula, assessment frameworks, and moderation from external UK examiners, granting graduates authentic British degrees recognized internationally.",
    ],
    metrics: [
      { value: "12+ Years", label: "Academic Partnership" },
      { value: "100% UK Awarded", label: "Direct Equivalence" },
      { value: "TEF Rated", label: "Teaching Excellence" },
    ],
    programmes: [
      {
        title: "BSc. (Hons) Computing",
        award: "UoN, UK",
        duration: "3 Years",
      },
      {
        title: "BSc. (Hons) Software Engineering",
        award: "UoN, UK",
        duration: "3 Years",
      },
      {
        title: "BSc. (Hons) Network Engineering",
        award: "UoN, UK",
        duration: "3 Years",
      },
      {
        title: "BSc. (Hons) Environmental Science",
        award: "UoN, UK",
        duration: "3 Years",
      },
      {
        title: "BBA (Hons) Business Administration",
        award: "UoN, UK",
        duration: "3 Years",
      },
    ],
    leaderRole: "Message from the Vice-Chancellor",
    leaderName: "Professor Anne-Marie Kilday",
    leaderTitle: "Vice-Chancellor",
    leaderAffiliation: "University of Northampton, United Kingdom",
    leaderPhoto:
      "/sections/nami/anne-marie-kilday-outside-portrait-683x1024.jpg",
    leaderQuote:
      "Our partnership with NAMI reflects our shared conviction in widening access to world-class British higher education, equipping students in Nepal with the innovation and global competencies to lead transformative careers.",
    leaderMessage: [
      "At the University of Northampton, we believe higher education has the transformative power to develop future leaders, ignite innovation, and deliver real social impact. Our long-standing collaboration with Naaya Aayam Multi-Disciplinary Institute (NAMI) in Kathmandu is a testament to this global mission.",
      "Through this partnership, students in Nepal engage in rigorous, career-focused degree programmes in Computing, Software Engineering, Network Engineering, Environmental Science, and Business Administration. These programmes are delivered under our exacting academic standards, incorporating experiential learning and technological literacy.",
      "We take immense pride in the achievements of NAMI graduates who continue to excel across international technology companies, research organizations, and entrepreneurial ventures. We look forward to deepening our academic collaboration and welcoming future cohorts into our global community.",
    ],
  },
  {
    id: "kathmandu-university",
    badge: "National University Collaboration",
    partnerStatus: "Collaborative Academic Partnership from 2026",
    name: "Kathmandu University (KU)",
    location: "Main Campus · Dhulikhel, Kavrepalanchok, Nepal",
    logo: "/logos/universities/Kathmandu_University_Logo.webp",
    overview: [
      "Established in 1991, Kathmandu University is an autonomous, premier non-government public institution dedicated to academic excellence, scientific research, and professional training in Nepal. Ranked consistently among Nepal's top national universities, KU is celebrated for research integrity, dedicated faculty, and high pedagogical standards.",
      "NAMI has entered into a strategic collaboration with Kathmandu University to offer the Bachelor in Environmental Studies (BES) programme. Combining classroom rigour with field-based ecological assessments, GIS spatial modeling, and sustainability policy analysis, the programme prepares graduates to tackle critical Himalayan and global environmental challenges.",
    ],
    metrics: [
      { value: "Autonomous", label: "Premier National University" },
      { value: "Himalayan Fieldwork", label: "Applied Ecology Practicums" },
      { value: "Session 2026", label: "Commencing Intake" },
    ],
    programmes: [
      {
        title: "BSc. in Environmental Studies (BES)",
        award: "KU Collaboration",
        duration: "4 Years · 8 Semesters",
      },
      {
        title: "Himalayan Ecology & Field Practicums",
        award: "KU Academic Track",
        duration: "Applied Research",
      },
      {
        title: "Climate Policy & Sustainability Governance",
        award: "Joint Initiatives",
        duration: "Policy Practicum",
      },
    ],
    leaderRole: "Message from the Dean / Academic Leadership",
    leaderName: "Office of the Dean, School of Science",
    leaderTitle: "Dean & Academic Leadership Council",
    leaderAffiliation: "Kathmandu University, Dhulikhel, Nepal",
    leaderQuote:
      "Collaborating with NAMI allows us to expand multidisciplinary environmental education, nurturing the next generation of environmental researchers, policy advocates, and sustainability leaders in Nepal.",
    leaderMessage: [
      "Kathmandu University has always led the nation in scientific innovation, environmental stewardship, and academic quality. As global environmental and climate realities evolve, the need for skilled, research-oriented environmental professionals has never been more urgent.",
      "Through our collaborative academic initiatives with NAMI, we bring KU's rich curriculum and pedagogical framework to motivated students in Kathmandu. The Bachelor in Environmental Studies programme is designed to bridge scientific fundamentals with practical fieldwork and community-based sustainability projects.",
      "We welcome aspiring environmental scientists and future changemakers to embark on this collaborative educational journey with Kathmandu University and NAMI.",
    ],
    note: "Official Dean message and comprehensive KU academic details will be updated as finalized by Kathmandu University.",
  },
];

function UniversityCard({
  partner,
  defaultExpanded = false,
}: {
  partner: UniversityPartner;
  defaultExpanded?: boolean;
}) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const isUoN = partner.id === "northampton";

  return (
    <article
      id={`partner-${partner.id}`}
      className={cn(
        "group relative overflow-hidden rounded-3xl p-6 sm:p-8 lg:p-10 transition-all duration-300",
        isUoN
          ? "bg-[#1B1D22] text-white shadow-2xl border border-zinc-800"
          : "bg-surface text-ink border border-border/80 shadow-xs hover:border-accent/40 hover:shadow-md",
      )}
    >
      {/* Ambient background glow for UoN Waterside brand card */}
      {isUoN && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-20 size-80 rounded-full bg-[#E0006C]/10 blur-3xl"
        />
      )}

      {/* Top Header Row: Identity, Metadata & University Logo */}
      <div
        className={cn(
          "relative flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b",
          isUoN ? "border-zinc-800" : "border-border/70",
        )}
      >
        <div className="max-w-2xl">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span
              className={cn(
                "px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-xs",
                isUoN
                  ? "bg-[#E0006C]/15 text-[#FF2A85] border border-[#E0006C]/30"
                  : "bg-accent/10 text-accent border border-accent/20",
              )}
            >
              {partner.badge}
            </span>
            <span
              className={cn(
                "text-xs font-medium",
                isUoN ? "text-zinc-300" : "text-ink-muted",
              )}
            >
              • {partner.partnerStatus}
            </span>
          </div>

          <H3
            className={cn(
              "mt-3 font-display text-2xl sm:text-3xl font-bold tracking-tight",
              isUoN ? "!text-white" : "text-ink",
            )}
          >
            {partner.name}
          </H3>

          <p
            className={cn(
              "mt-1 text-xs sm:text-sm font-medium",
              isUoN ? "text-zinc-300" : "text-ink-muted",
            )}
          >
            {partner.location}
          </p>
        </div>

        {/* Logo Container */}
        <div
          className={cn(
            "relative h-16 sm:h-20 w-48 sm:w-64 shrink-0 flex items-center justify-center p-2.5 sm:p-3 rounded-2xl transition-transform duration-200 group-hover:scale-[1.02]",
            isUoN
              ? "bg-white shadow-md border border-zinc-200"
              : "bg-surface-raised/60 border border-border/80 shadow-xs",
          )}
        >
          <div className="relative w-full h-full">
            <Image
              src={partner.logo}
              alt={`${partner.name} Crest`}
              fill
              unoptimized
              className="object-contain"
            />
          </div>
        </div>
      </div>

      {/* Collapsed State Preview */}
      {!isExpanded && (
        <div className="mt-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-3xl">
            <p
              className={cn(
                "text-xs sm:text-sm leading-relaxed text-justify [text-align-last:left] line-clamp-2 sm:line-clamp-3 font-normal",
                isUoN ? "!text-zinc-200" : "text-ink/80",
              )}
            >
              {partner.overview[0]}
            </p>

            <div
              className={cn(
                "mt-2 flex items-center gap-2 text-xs font-semibold",
                isUoN ? "text-[#FF2A85]" : "text-accent",
              )}
            >
              <span className="shrink-0">{partner.leaderRole}:</span>
              <span
                className={cn(
                  "italic font-normal line-clamp-1",
                  isUoN ? "text-zinc-300" : "text-ink-muted",
                )}
              >
                &ldquo;{partner.leaderQuote}&rdquo;
              </span>
            </div>
          </div>

          <div className="shrink-0 self-start md:self-center">
            <button
              type="button"
              onClick={() => setIsExpanded(true)}
              className={cn(
                "inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer shadow-xs",
                isUoN
                  ? "bg-[#E0006C] text-white hover:bg-[#C2005D] hover:shadow-lg hover:shadow-pink-500/20"
                  : "bg-accent text-white hover:bg-accent/90",
              )}
            >
              <span>Explore Profile &amp; Message</span>
              <svg
                aria-hidden="true"
                className="size-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Expanded State: 2-Row Clean Layout */}
      {isExpanded && (
        <div className="mt-8 animate-in fade-in-50 duration-300 space-y-8">
          {/* Row 1: Academic Standing & Affiliated Degree Programmes */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Left: Academic Standing Overview */}
            <div className="lg:col-span-5">
              <h4
                className={cn(
                  "font-display text-base sm:text-lg font-bold mb-3.5",
                  isUoN ? "!text-white" : "text-ink",
                )}
              >
                Academic Standing &amp; Educational Model
              </h4>

              <div className="space-y-3.5 text-xs sm:text-sm leading-relaxed text-justify [text-align-last:left]">
                {partner.overview.map((para) => (
                  <p
                    key={para.slice(0, 32)}
                    className={cn(
                      "leading-relaxed font-normal",
                      isUoN ? "!text-zinc-200" : "text-ink/80",
                    )}
                  >
                    {para}
                  </p>
                ))}
              </div>

              {partner.note && (
                <div
                  className={cn(
                    "mt-4 p-3 rounded-xl border text-xs leading-relaxed",
                    isUoN
                      ? "bg-zinc-800/80 border-zinc-700/80 text-zinc-300"
                      : "bg-accent/5 border-accent/20 text-ink-muted",
                  )}
                >
                  <span
                    className={cn(
                      "font-semibold",
                      isUoN ? "text-[#FF2A85]" : "text-accent",
                    )}
                  >
                    Note:{" "}
                  </span>
                  {partner.note}
                </div>
              )}
            </div>

            {/* Right: Metrics Strip & Multi-Column Programmes */}
            <div className="lg:col-span-7 flex flex-col justify-between h-full">
              {/* Metrics Strip */}
              <div>
                <p
                  className={cn(
                    "text-xs font-bold uppercase tracking-wider mb-2.5",
                    isUoN ? "text-[#FF2A85]" : "text-accent",
                  )}
                >
                  Key Partnership Metrics:
                </p>
                <div
                  className={cn(
                    "grid grid-cols-3 gap-3 p-4 rounded-2xl border",
                    isUoN
                      ? "bg-zinc-800/80 border-zinc-700/80"
                      : "bg-surface-raised/40 border-border/70",
                  )}
                >
                  {partner.metrics.map((m) => (
                    <div key={m.label} className="text-center">
                      <p
                        className={cn(
                          "font-display text-sm sm:text-base font-bold",
                          isUoN ? "!text-white" : "text-ink",
                        )}
                      >
                        {m.value}
                      </p>
                      <p
                        className={cn(
                          "text-[10px] sm:text-[11px] mt-0.5 leading-tight",
                          isUoN ? "text-zinc-300" : "text-ink-muted",
                        )}
                      >
                        {m.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Affiliated Programmes - Multi Column Grid */}
              <div
                className={cn(
                  "mt-6 pt-5 border-t",
                  isUoN ? "border-zinc-800" : "border-border/70",
                )}
              >
                <p
                  className={cn(
                    "text-xs font-bold uppercase tracking-wider mb-3",
                    isUoN ? "text-[#FF2A85]" : "text-accent",
                  )}
                >
                  Affiliated Degree Programmes:
                </p>

                <div className="grid grid-cols-1 min-[480px]:grid-cols-2 gap-2.5">
                  {partner.programmes.map((prog) => (
                    <Link
                      key={prog.title}
                      href={"#programmes" as Route}
                      className={cn(
                        "group flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl border text-xs transition-all duration-200 cursor-pointer",
                        isUoN
                          ? "bg-zinc-800/90 border-zinc-700/80 text-white shadow-xs hover:border-[#E0006C]/70 hover:bg-zinc-700/90 hover:scale-[1.01]"
                          : "border-border/80 bg-surface-raised/80 hover:bg-surface hover:border-accent/50 text-ink hover:text-accent shadow-2xs",
                      )}
                    >
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <span
                          className={cn(
                            "size-2 rounded-full shrink-0 transition-transform group-hover:scale-125",
                            isUoN ? "bg-[#E0006C]" : "bg-accent",
                          )}
                        />
                        <span
                          className={cn(
                            "font-display font-bold leading-tight line-clamp-1",
                            isUoN
                              ? "text-zinc-100"
                              : "text-ink group-hover:text-accent",
                          )}
                        >
                          {prog.title}
                        </span>
                      </div>
                      <span
                        className={cn(
                          "text-[11px] font-semibold shrink-0 whitespace-nowrap",
                          isUoN
                            ? "text-[#FF2A85]"
                            : "text-ink-muted group-hover:text-accent",
                        )}
                      >
                        ({prog.award})
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Row 2: Full-Width Leadership Showcase */}
          <div
            className={cn(
              "relative overflow-hidden rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 border shadow-2xs",
              isUoN
                ? "bg-zinc-800/70 backdrop-blur-xs border-zinc-700/80 text-white"
                : "bg-surface-raised/50 border-border/90 text-ink",
            )}
          >
            {/* Background Quote Mark */}
            <svg
              aria-hidden="true"
              className={cn(
                "pointer-events-none select-none absolute right-4 top-4 size-28 sm:size-36",
                isUoN ? "text-[#E0006C]/10" : "text-accent/8",
              )}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
            </svg>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 items-start">
              {/* Left Column: Big VC Portrait & Credentials */}
              {partner.leaderPhoto ? (
                <div className="md:col-span-5 lg:col-span-4 flex flex-col items-center sm:items-start">
                  <div className="relative aspect-[3/4] w-full min-h-[340px] sm:min-h-[400px] lg:min-h-[460px] rounded-2xl overflow-hidden border-2 border-[#E0006C]/50 shadow-2xl bg-zinc-900">
                    <Image
                      src={partner.leaderPhoto}
                      alt={partner.leaderName}
                      fill
                      className="object-cover object-[center_55%]"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 480px"
                      priority
                    />
                  </div>
                  <div className="mt-4 text-center sm:text-left px-1">
                    <p
                      className={cn(
                        "font-display font-bold text-lg sm:text-xl leading-tight",
                        isUoN ? "!text-white" : "text-ink",
                      )}
                    >
                      {partner.leaderName}
                    </p>
                    <p
                      className={cn(
                        "font-body text-xs sm:text-sm font-semibold mt-1",
                        isUoN ? "text-[#FF2A85]" : "text-accent",
                      )}
                    >
                      {partner.leaderTitle}
                    </p>
                    <p
                      className={cn(
                        "font-body text-xs mt-0.5",
                        isUoN ? "text-zinc-300" : "text-ink-muted",
                      )}
                    >
                      {partner.leaderAffiliation}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="md:col-span-5 lg:col-span-4 flex flex-col justify-center">
                  <div
                    className={cn(
                      "p-5 rounded-2xl border",
                      isUoN
                        ? "bg-zinc-800 border-zinc-700"
                        : "bg-surface border-border/80",
                    )}
                  >
                    <p
                      className={cn(
                        "font-display font-bold text-base",
                        isUoN ? "!text-white" : "text-ink",
                      )}
                    >
                      {partner.leaderName}
                    </p>
                    <p
                      className={cn(
                        "font-body text-xs font-semibold mt-1",
                        isUoN ? "text-[#FF2A85]" : "text-accent",
                      )}
                    >
                      {partner.leaderTitle}
                    </p>
                    <p
                      className={cn(
                        "font-body text-xs mt-0.5",
                        isUoN ? "text-zinc-300" : "text-ink-muted",
                      )}
                    >
                      {partner.leaderAffiliation}
                    </p>
                  </div>
                </div>
              )}

              {/* Right Column: Role Chip, Featured Quote & Full Address */}
              <div className="md:col-span-7 lg:col-span-8">
                {/* Role Chip */}
                <div
                  className={cn(
                    "inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border mb-4",
                    isUoN
                      ? "bg-[#E0006C]/15 text-[#FF2A85] border-[#E0006C]/30"
                      : "bg-accent/10 text-accent border-accent/20",
                  )}
                >
                  <span>{partner.leaderRole}</span>
                </div>

                {/* Featured Quote */}
                <blockquote
                  className={cn(
                    "relative pl-4 border-l-3 italic font-display text-base sm:text-lg leading-relaxed mb-6",
                    isUoN
                      ? "border-[#E0006C] text-zinc-100"
                      : "border-accent text-ink",
                  )}
                >
                  &ldquo;{partner.leaderQuote}&rdquo;
                </blockquote>

                {/* Message Paragraphs */}
                <div
                  className={cn(
                    "space-y-4 text-xs sm:text-sm leading-relaxed text-justify [text-align-last:left]",
                    isUoN ? "!text-zinc-200" : "text-ink/80",
                  )}
                >
                  {partner.leaderMessage.map((msg) => (
                    <p
                      key={msg.slice(0, 32)}
                      className="leading-relaxed font-normal"
                    >
                      {msg}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Collapse Footer Action */}
          <div
            className={cn(
              "mt-8 pt-5 border-t flex justify-end",
              isUoN ? "border-zinc-800" : "border-border/60",
            )}
          >
            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              className={cn(
                "inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer border shadow-xs",
                isUoN
                  ? "bg-zinc-800 text-[#FF2A85] hover:bg-[#E0006C] hover:text-white border-zinc-700"
                  : "bg-accent/10 hover:bg-accent hover:text-white text-accent border-accent/20",
              )}
            >
              <span>Collapse Details</span>
              <svg
                aria-hidden="true"
                className="size-3.5 rotate-180"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </article>
  );
}

export function UniversityPartnersSection() {
  return (
    <section
      className="gutter-x section-y bg-surface-raised/20 border-y border-border"
      id="university-partners"
    >
      <div className="mx-auto max-w-page">
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-14">
          <Reveal>
            <div className="flex items-center gap-5">
              <Eyebrow className="text-accent">
                Academic Affiliations &amp; Degree Awarding
              </Eyebrow>
              <span className="h-px flex-1 bg-border" />
            </div>
          </Reveal>

          <div className="mt-4 sm:mt-5">
            <Reveal>
              <SplitText
                as="h2"
                className="font-display text-3xl sm:text-4xl lg:text-5xl text-ink font-normal tracking-tight"
              >
                Our University Partners
              </SplitText>
            </Reveal>
          </div>
        </div>

        {/* Both Cards Expandable / Collapsible */}
        <div className="space-y-8 sm:space-y-12">
          {UNIVERSITY_PARTNERS.map((partner, index) => (
            <UniversityCard
              key={partner.id}
              partner={partner}
              defaultExpanded={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
