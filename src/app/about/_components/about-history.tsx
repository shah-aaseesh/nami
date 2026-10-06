import Image from "next/image";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Eyebrow, H3, H4, P } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

export type MilestoneItem = {
  readonly year: string;
  readonly period?: string;
  readonly tag: string;
  readonly tagColor: "brand" | "blue" | "teal" | "amber";
  readonly title: string;
  readonly description: string;
  readonly highlights: readonly string[];
  readonly logo?: string;
  readonly logoAlt?: string;
};

const NAMI_TIMELINE: readonly MilestoneItem[] = [
  {
    year: "2012",
    period: "Foundation & International Degrees",
    tag: "Higher Education",
    tagColor: "brand",
    title: "Establishment of Naaya Aayam Multi-Disciplinary Institute (NAMI)",
    description:
      "Naaya Aayam Multi-Disciplinary Institute (NAMI) was established in Kathmandu by visionary entrepreneurs and educationists with the goal of providing world-class tertiary education in Nepal. NAMI partnered with the University of Northampton, UK, to offer internationally accredited undergraduate and postgraduate degree programmes.",
    highlights: [
      "BSc. (Hons) in Computing, Software Engineering, Network Engineering & Environmental Science",
      "Bachelor of Business Administration (BBA) & Master's degrees",
      "Direct UK university curriculum and international faculty moderation",
    ],
    logo: "/universities/northampton.png",
    logoAlt: "University of Northampton Logo",
  },
  {
    year: "2013",
    period: "Institutional Expansion",
    tag: "College",
    tagColor: "blue",
    title: "Establishment of NAMI College",
    description:
      "NAMI College was formally established to expand pre-university, secondary, and higher academic streams, laying the groundwork for specialized pathways aligned with international standards.",
    highlights: [
      "State-of-the-art campus development with modern science and computing laboratories",
      "Strengthening institutional governance and multi-tier academic operations",
    ],
    logo: "/logo/nami-college.png",
    logoAlt: "NAMI College Logo",
  },
  {
    year: "2014",
    period: "Cambridge Assessment International Education",
    tag: "Cambridge A-Levels",
    tagColor: "teal",
    title: "Launch of Cambridge International GCE A-Levels",
    description:
      "NAMI College introduced the prestigious Cambridge Assessment International Education (CAIE) GCE A-Level programme, offering comprehensive Science and Non-Science streams to students aspiring for top-tier global university admissions.",
    highlights: [
      "Cambridge International Curriculum with dedicated subject specialist faculty",
      "Extensive laboratory work, Olympiad preparations, and global university counselling",
    ],
    logo: "/universities/cambridge.png",
    logoAlt: "Cambridge Assessment International Education Logo",
  },
  {
    year: "2019",
    period: "National Curriculum & Secondary Division",
    tag: "School & +2",
    tagColor: "brand",
    title: "Launch of NAMI International School & NEB +2 Programme",
    description:
      "NAMI International School commenced operations with the launch of the National Examinations Board (NEB) affiliated 10+2 Science and Management programmes, bridging rigorous national academic standards with NAMI's modern pedagogical infrastructure.",
    highlights: [
      "NEB-affiliated +2 Science and +2 Management streams",
      "Holistic development model integrating research, leadership camps, and sports",
    ],
    logo: "/universities/neb.png",
    logoAlt: "National Examinations Board Logo",
  },
  {
    year: "2024",
    period: "Primary Division & Independent Exam Centre",
    tag: "School & CAIE Centre",
    tagColor: "amber",
    title: "Primary & Middle School Opening & CAIE Independent Home Centre",
    description:
      "NAMI International School expanded into a comprehensive K-12 institution with the opening of its Primary and Middle School division under Founding Principal Ms. Anisha Panday Joshi. Concurrently, NAMI College achieved independent CAIE Home Examination Centre status in Nepal.",
    highlights: [
      "Launch of Primary & Middle School divisions (Grades 1 through 7)",
      "Accreditation as an independent Cambridge International Examination Home Centre",
      "Executive leadership transition appointing Mr. Pranil Pandey, FCCA as CEO",
    ],
    logo: "/logo/International School-ai.png",
    logoAlt: "NAMI International School Logo",
  },
  {
    year: "2025–2026",
    period: "KU Partnership, Hertfordshire & Vocational Training",
    tag: "Innovation & Growth",
    tagColor: "teal",
    title:
      "Kathmandu University Partnership, UK Collaborations & CTEVT Programmes",
    description:
      "NAMI entered a new era of academic diversification through a strategic partnership with Kathmandu University (KU) for the Bachelor of Science in Environmental Studies (BES), academic collaboration with the University of Hertfordshire (UK), and CTEVT-approved skill-based vocational programmes.",
    highlights: [
      "BSc. in Environmental Studies in academic partnership with Kathmandu University (KU)",
      "University of Hertfordshire, UK collaboration and Pearson VUE Testing Centre",
      "CTEVT short-term skill-oriented vocational and technical training programmes",
      "Expanded industry MoUs and experiential learning research initiatives",
    ],
    logo: "/universities/Kathmandu_University_Logo.webp",
    logoAlt: "Kathmandu University Logo",
  },
];

const TAG_STYLES: Record<
  MilestoneItem["tagColor"],
  { badge: string; dot: string }
> = {
  brand: {
    badge: "bg-accent/10 text-accent border-accent/20",
    dot: "bg-accent",
  },
  blue: {
    badge: "bg-sky-50 text-sky-700 border-sky-200",
    dot: "bg-sky-600",
  },
  teal: {
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
    dot: "bg-emerald-600",
  },
  amber: {
    badge: "bg-amber-50 text-amber-800 border-amber-200",
    dot: "bg-amber-600",
  },
};

export function AboutHistory() {
  return (
    <section
      className="gutter-x section-y bg-surface-raised/40 border-y border-border/70"
      id="history"
    >
      <div className="mx-auto max-w-page">
        {/* Section Header */}
        <div className="max-w-3xl">
          <Reveal>
            <div className="flex items-center gap-5">
              <Eyebrow className="text-accent">History of NAMI</Eyebrow>
              <span className="h-px flex-1 bg-border" />
            </div>
          </Reveal>

          <div className="mt-4 sm:mt-5">
            <Reveal>
              <SplitText
                as="h2"
                className="font-display text-3xl sm:text-4xl lg:text-5xl text-ink font-normal tracking-tight"
              >
                Our Journey, Milestones & Institutional Timeline
              </SplitText>
            </Reveal>
          </div>

          <div className="mt-4 sm:mt-5">
            <Reveal>
              <P className="text-base sm:text-lg text-ink-muted leading-relaxed">
                From our founding in 2012 to becoming one of Nepal&apos;s most
                comprehensive educational groups, discover how NAMI has evolved
                across academic entities, international university partnerships,
                and innovative learning pathways.
              </P>
            </Reveal>
          </div>
        </div>

        {/* Timeline Container */}
        <div className="mt-12 sm:mt-16 relative">
          {/* Vertical central timeline line for desktop */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute left-1/2 top-4 bottom-4 -translate-x-1/2 w-0.5 bg-gradient-to-b from-accent via-accent/40 to-accent/10"
          />

          {/* Vertical timeline line for mobile/tablet */}
          <div
            aria-hidden="true"
            className="lg:hidden absolute left-5 sm:left-7 top-4 bottom-4 w-0.5 bg-gradient-to-b from-accent via-accent/40 to-accent/10"
          />

          <div className="flex flex-col gap-10 sm:gap-12 lg:gap-16">
            {NAMI_TIMELINE.map((item, index) => {
              const isEven = index % 2 === 0;
              const tagStyle = TAG_STYLES[item.tagColor];

              return (
                <div
                  key={item.year + item.title}
                  className={cn(
                    "relative flex flex-col lg:flex-row items-start",
                    isEven ? "lg:flex-row" : "lg:flex-row-reverse",
                  )}
                >
                  {/* Center Node Marker (Desktop) */}
                  <div
                    aria-hidden="true"
                    className="hidden lg:flex absolute left-1/2 top-6 -translate-x-1/2 size-10 items-center justify-center rounded-full bg-surface-raised border-4 border-accent shadow-md z-20"
                  >
                    <span className={cn("size-3 rounded-full", tagStyle.dot)} />
                  </div>

                  {/* Left/Right Content Card */}
                  <div
                    className={cn(
                      "w-full pl-12 sm:pl-16 lg:pl-0 lg:w-[calc(50%-40px)]",
                      isEven ? "lg:pr-4" : "lg:pl-4",
                    )}
                  >
                    {/* Mobile Node Marker */}
                    <div
                      aria-hidden="true"
                      className="lg:hidden absolute left-3 sm:left-5 top-5 size-5 -translate-x-1/2 rounded-full bg-surface-raised border-3 border-accent shadow-xs z-20"
                    />

                    <Reveal y={20}>
                      <div className="group rounded-2xl sm:rounded-3xl border border-border/90 bg-surface p-6 sm:p-8 shadow-xs transition-all duration-300 hover:shadow-md hover:border-accent/40 hover:-translate-y-1">
                        {/* Top Year & Tag Badges */}
                        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/70 pb-4">
                          <div className="flex items-baseline gap-2.5">
                            <span className="font-display text-2xl sm:text-3xl font-bold text-accent">
                              {item.year}
                            </span>
                            {item.period && (
                              <span className="text-xs sm:text-sm font-medium text-ink-muted">
                                · {item.period}
                              </span>
                            )}
                          </div>

                          <span
                            className={cn(
                              "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border",
                              tagStyle.badge,
                            )}
                          >
                            {item.tag}
                          </span>
                        </div>

                        {/* Title */}
                        <H4 className="mt-4 text-lg sm:text-xl font-display font-medium text-ink leading-snug group-hover:text-accent transition-colors">
                          {item.title}
                        </H4>

                        {/* Description */}
                        <P className="mt-3 text-sm sm:text-base text-ink/85 leading-relaxed text-justify [text-align-last:left]">
                          {item.description}
                        </P>

                        {/* Highlights List */}
                        {item.highlights.length > 0 && (
                          <div className="mt-4 pt-4 border-t border-border/60">
                            <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted mb-2.5">
                              Key Highlights & Developments:
                            </p>
                            <ul className="space-y-2 font-body text-xs sm:text-sm text-ink/80">
                              {item.highlights.map((highlight) => (
                                <li
                                  key={highlight}
                                  className="flex items-start gap-2.5"
                                >
                                  <span
                                    className={cn(
                                      "size-1.5 rounded-full mt-2 shrink-0",
                                      tagStyle.dot,
                                    )}
                                  />
                                  <span>{highlight}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Partner Logo if applicable */}
                        {item.logo && (
                          <div className="mt-5 pt-4 border-t border-border/60 flex items-center justify-between">
                            <span className="text-xs text-ink-muted font-medium">
                              Affiliation / Entity Badge:
                            </span>
                            <div className="relative h-8 sm:h-10 w-28 sm:w-36">
                              <Image
                                src={item.logo}
                                alt={item.logoAlt ?? "Institution logo"}
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

                  {/* Empty side placeholder for desktop spacing */}
                  <div className="hidden lg:block lg:w-[calc(50%-40px)]" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
