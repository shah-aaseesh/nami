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
    location: "Waterside Campus · Northamptonshire, England, United Kingdom",
    logo: "/universities/northampton.png",
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
      { title: "BSc (Hons) Computing", award: "UoN, UK", duration: "3 Years" },
      { title: "BSc (Hons) Software Engineering", award: "UoN, UK", duration: "3 Years" },
      { title: "BSc (Hons) Network Engineering", award: "UoN, UK", duration: "3 Years" },
      { title: "BSc (Hons) Environmental Science", award: "UoN, UK", duration: "3 Years" },
      { title: "BBA (Hons) Business Administration", award: "UoN, UK", duration: "3 Years" },
    ],
    leaderRole: "Message from the Vice-Chancellor",
    leaderName: "Professor Anne-Marie Kilday",
    leaderTitle: "Vice-Chancellor and Chief Executive",
    leaderAffiliation: "University of Northampton, United Kingdom",
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
    logo: "/universities/Kathmandu_University_Logo.webp",
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
      { title: "BSc in Environmental Studies (BES)", award: "KU Collaboration", duration: "4 Years · 8 Semesters" },
      { title: "Himalayan Ecology & Field Practicums", award: "KU Academic Track", duration: "Applied Research" },
      { title: "Climate Policy & Sustainability Governance", award: "Joint Initiatives", duration: "Policy Practicum" },
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
  isReversed,
  defaultExpanded = false,
}: {
  partner: UniversityPartner;
  isReversed: boolean;
  defaultExpanded?: boolean;
}) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const isRed = partner.id === "northampton";

  return (
    <article
      id={`partner-${partner.id}`}
      className={cn(
        "group relative overflow-hidden rounded-3xl p-6 sm:p-8 lg:p-10 transition-all duration-300",
        isRed
          ? "bg-[#BD1B21] text-white shadow-xl border border-red-700/60"
          : "bg-surface text-ink border border-border/80 shadow-xs hover:border-accent/40 hover:shadow-md",
      )}
    >
      {/* Ambient background glow for the red card */}
      {isRed && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-white/10 blur-3xl"
        />
      )}

      {/* Top Header Row: Identity, Metadata & University Logo */}
      <div
        className={cn(
          "relative flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b",
          isRed ? "border-white/20" : "border-border/70",
        )}
      >
        <div className="max-w-2xl">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span
              className={cn(
                "px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-xs",
                isRed
                  ? "bg-white/20 text-white border border-white/30"
                  : "bg-accent/10 text-accent border border-accent/20",
              )}
            >
              {partner.badge}
            </span>
            <span
              className={cn(
                "text-xs font-medium",
                isRed ? "text-white/80" : "text-ink-muted",
              )}
            >
              • {partner.partnerStatus}
            </span>
          </div>

          <H3
            className={cn(
              "mt-3 font-display text-2xl sm:text-3xl font-bold tracking-tight",
              isRed ? "!text-white" : "text-ink",
            )}
          >
            {partner.name}
          </H3>

          <p
            className={cn(
              "mt-1 text-xs sm:text-sm font-medium",
              isRed ? "text-white/80" : "text-ink-muted",
            )}
          >
            {partner.location}
          </p>
        </div>

        {/* Logo Container */}
        <div
          className={cn(
            "relative h-16 sm:h-20 w-48 sm:w-64 shrink-0 flex items-center justify-center p-2.5 sm:p-3 rounded-2xl transition-transform duration-200 group-hover:scale-[1.02]",
            isRed
              ? "bg-white shadow-md border border-white/30"
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
                isRed ? "!text-white/95" : "text-ink/80",
              )}
              style={{ color: isRed ? "rgba(255, 255, 255, 0.95)" : undefined }}
            >
              {partner.overview[0]}
            </p>

            <div
              className={cn(
                "mt-3 flex items-center gap-2 text-xs font-semibold",
                isRed ? "!text-white" : "text-accent",
              )}
              style={{ color: isRed ? "#ffffff" : undefined }}
            >
              <span className="shrink-0">{partner.leaderRole}:</span>
              <span
                className={cn(
                  "italic font-normal line-clamp-1",
                  isRed ? "!text-white/85" : "text-ink-muted",
                )}
                style={{ color: isRed ? "rgba(255, 255, 255, 0.85)" : undefined }}
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
                isRed
                  ? "bg-white text-[#BD1B21] hover:bg-white/90 hover:shadow-md"
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
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Expanded State: Full Editorial 2-Column Grid */}
      {isExpanded && (
        <div className="mt-8 animate-in fade-in-50 duration-300">
          <div
            className={cn(
              "grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-14 items-start",
              isReversed && "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1",
            )}
          >
            {/* Left Column: Academic Overview, Metrics & Programmes */}
            <div className="lg:col-span-6 flex flex-col justify-between h-full">
              <div>
                <h4
                  className={cn(
                    "font-display text-base sm:text-lg font-bold mb-3.5",
                    isRed ? "!text-white" : "text-ink",
                  )}
                  style={{ color: isRed ? "#ffffff" : undefined }}
                >
                  Academic Standing &amp; Educational Model
                </h4>

                <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-justify [text-align-last:left]">
                  {partner.overview.map((para, pIdx) => (
                    <p
                      key={pIdx}
                      className={cn(
                        "leading-relaxed font-normal",
                        isRed ? "!text-white/95" : "text-ink/80",
                      )}
                      style={{ color: isRed ? "rgba(255, 255, 255, 0.95)" : undefined }}
                    >
                      {para}
                    </p>
                  ))}
                </div>

                {/* Metrics Callout Strip */}
                <div
                  className={cn(
                    "mt-6 grid grid-cols-3 gap-3 p-4 rounded-2xl border",
                    isRed
                      ? "bg-black/25 border-white/20"
                      : "bg-surface-raised/40 border-border/70",
                  )}
                >
                  {partner.metrics.map((m, mIdx) => (
                    <div key={mIdx} className="text-center">
                      <p
                        className={cn(
                          "font-display text-sm sm:text-base font-bold",
                          isRed ? "!text-white" : "text-ink",
                        )}
                        style={{ color: isRed ? "#ffffff" : undefined }}
                      >
                        {m.value}
                      </p>
                      <p
                        className={cn(
                          "text-[10px] sm:text-[11px] mt-0.5 leading-tight",
                          isRed ? "!text-white/85" : "text-ink-muted",
                        )}
                        style={{ color: isRed ? "rgba(255, 255, 255, 0.85)" : undefined }}
                      >
                        {m.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Programmes List */}
                <div
                  className={cn(
                    "mt-6 pt-5 border-t",
                    isRed ? "border-white/20" : "border-border/70",
                  )}
                >
                  <p
                    className={cn(
                      "text-xs font-bold uppercase tracking-wider mb-3.5",
                      isRed ? "!text-white" : "text-accent",
                    )}
                    style={{ color: isRed ? "#ffffff" : undefined }}
                  >
                    Affiliated Degree Programmes:
                  </p>

                  <div className="flex flex-wrap gap-2.5">
                    {partner.programmes.map((prog, pIdx) => (
                      <Link
                        key={pIdx}
                        href={"#programmes" as Route}
                        className={cn(
                          "group inline-flex items-center gap-2.5 px-4 py-2 rounded-xl border text-xs transition-all duration-200 cursor-pointer",
                          isRed
                            ? "bg-white border-white text-neutral-900 shadow-sm hover:shadow-md hover:bg-neutral-100 hover:scale-[1.02]"
                            : "border-border/80 bg-surface-raised/80 hover:bg-surface hover:border-accent/50 text-ink hover:text-accent shadow-2xs",
                        )}
                      >
                        <span
                          className={cn(
                            "size-2 rounded-full shrink-0 transition-transform group-hover:scale-125",
                            isRed ? "bg-[#BD1B21]" : "bg-accent",
                          )}
                        />
                        <span
                          className={cn(
                            "font-display font-bold",
                            isRed ? "text-neutral-900" : "text-ink group-hover:text-accent",
                          )}
                        >
                          {prog.title}
                        </span>
                        <span
                          className={cn(
                            "text-[11px] font-semibold",
                            isRed ? "text-neutral-600" : "text-ink-muted group-hover:text-accent",
                          )}
                        >
                          ({prog.award})
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {partner.note && (
                <div
                  className={cn(
                    "mt-6 p-3.5 rounded-xl border text-xs leading-relaxed",
                    isRed
                      ? "bg-white/15 border-white/25 !text-white/90"
                      : "bg-accent/5 border-accent/20 text-ink-muted",
                  )}
                  style={{ color: isRed ? "rgba(255, 255, 255, 0.9)" : undefined }}
                >
                  <span
                    className={cn("font-semibold", isRed ? "!text-white" : "text-accent")}
                    style={{ color: isRed ? "#ffffff" : undefined }}
                  >
                    Note:{" "}
                  </span>
                  {partner.note}
                </div>
              )}
            </div>

            {/* Right Column: Leadership Letter Card */}
            <div className="lg:col-span-6 flex flex-col h-full">
              <div
                className={cn(
                  "relative overflow-hidden rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-9 flex flex-col justify-between h-full border shadow-2xs",
                  isRed
                    ? "bg-black/30 backdrop-blur-xs border-white/20 text-white"
                    : "bg-surface-raised/50 border-border/90 text-ink",
                )}
              >
                {/* Background Quote Mark */}
                <svg
                  aria-hidden="true"
                  className={cn(
                    "pointer-events-none select-none absolute right-4 top-4 size-24 sm:size-28",
                    isRed ? "text-white/10" : "text-accent/8",
                  )}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                </svg>

                <div>
                  {/* Role Chip */}
                  <div
                    className={cn(
                      "inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border mb-4",
                      isRed
                        ? "bg-white/20 !text-white border-white/30"
                        : "bg-accent/10 text-accent border-accent/20",
                    )}
                    style={{ color: isRed ? "#ffffff" : undefined }}
                  >
                    <span>{partner.leaderRole}</span>
                  </div>

                  {/* Featured Quote */}
                  <blockquote
                    className={cn(
                      "relative pl-5 border-l-3 italic font-display text-base sm:text-lg leading-relaxed mb-5",
                      isRed
                        ? "border-white !text-white"
                        : "border-accent text-ink",
                    )}
                    style={{ color: isRed ? "#ffffff" : undefined }}
                  >
                    &ldquo;{partner.leaderQuote}&rdquo;
                  </blockquote>

                  {/* Full Leader Address */}
                  <div className="space-y-3.5 text-xs sm:text-sm leading-relaxed text-justify [text-align-last:left]">
                    {partner.leaderMessage.map((msg, mIdx) => (
                      <p
                        key={mIdx}
                        className={cn(
                          "leading-relaxed font-normal",
                          isRed ? "!text-white/95" : "text-ink/80",
                        )}
                        style={{ color: isRed ? "rgba(255, 255, 255, 0.95)" : undefined }}
                      >
                        {msg}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Leader Credentials */}
                <div
                  className={cn(
                    "mt-6 pt-4 border-t",
                    isRed ? "border-white/20" : "border-border/70",
                  )}
                >
                  <p
                    className={cn(
                      "font-display text-sm sm:text-base font-bold",
                      isRed ? "!text-white" : "text-ink",
                    )}
                    style={{ color: isRed ? "#ffffff" : undefined }}
                  >
                    {partner.leaderName}
                  </p>
                  <p
                    className={cn(
                      "font-body text-xs font-semibold mt-0.5",
                      isRed ? "!text-white/90" : "text-accent",
                    )}
                    style={{ color: isRed ? "rgba(255, 255, 255, 0.9)" : undefined }}
                  >
                    {partner.leaderTitle}
                  </p>
                  <p
                    className={cn(
                      "font-body text-[11px]",
                      isRed ? "!text-white/80" : "text-ink-muted",
                    )}
                    style={{ color: isRed ? "rgba(255, 255, 255, 0.8)" : undefined }}
                  >
                    {partner.leaderAffiliation}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Collapse Footer Action */}
          <div
            className={cn(
              "mt-8 pt-5 border-t flex justify-end",
              isRed ? "border-white/20" : "border-border/60",
            )}
          >
            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              className={cn(
                "inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer border shadow-xs",
                isRed
                  ? "bg-white text-[#BD1B21] hover:bg-white/90 border-white/30"
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
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
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
    <section className="gutter-x section-y bg-surface-raised/20 border-y border-border" id="university-partners">
      <div className="mx-auto max-w-page">
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-14">
          <Reveal>
            <div className="flex items-center gap-5">
              <Eyebrow className="text-accent">Academic Affiliations &amp; Degree Awarding</Eyebrow>
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
              isReversed={index % 2 !== 0}
              defaultExpanded={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
