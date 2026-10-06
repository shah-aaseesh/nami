"use client";

import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { P } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

type Milestone = {
  readonly year: string;
  readonly title: string;
  readonly era: string;
  readonly partner: string;
  readonly logo: string;
  readonly description: string;
};

const MILESTONES: readonly Milestone[] = [
  {
    year: "2012",
    era: "The Foundation",
    title: "Establishment of NAMI & UK Degree Programmes",
    partner: "University of Northampton (UK)",
    logo: "/universities/northampton.png",
    description:
      "Established in Kathmandu in direct academic partnership with the University of Northampton, UK, offering accredited Bachelor's and Master's degrees.",
  },
  {
    year: "2013",
    era: "Campus Scaling",
    title: "NAMI College Incorporation & Expansion",
    partner: "NAMI College",
    logo: "/logo/nami-college.png",
    description:
      "Formally incorporated with dedicated multi-storey academic wings, advanced science laboratories, and campus resource centers.",
  },
  {
    year: "2014",
    era: "Cambridge A-Levels",
    title: "Launch of Cambridge International GCE A-Levels",
    partner: "Cambridge Assessment International",
    logo: "/universities/cambridge.png",
    description:
      "Accredited to offer gold-standard Cambridge GCE A-Levels in Science and Non-Science streams with global university placement guidance.",
  },
  {
    year: "2019",
    era: "National Board",
    title: "Launch of NAMI International School & NEB +2",
    partner: "National Examinations Board (NEB)",
    logo: "/universities/neb.png",
    description:
      "Expanded into the national curriculum with NAMI International School, offering NEB-affiliated 10+2 Science and Management programmes.",
  },
  {
    year: "2024",
    era: "Comprehensive K-12",
    title: "Primary Wing Launch & CAIE Home Centre Status",
    partner: "NAMI International School",
    logo: "/logo/International School-ai.png",
    description:
      "Opened Primary School (Grades 1–7) and earned independent Cambridge International Home Examination Centre status in Nepal.",
  },
  {
    year: "2024",
    era: "Global Testing",
    title: "Pearson VUE-Authorized Test Center Collaboration",
    partner: "Pearson VUE",
    logo: "/partners/pearson-vue.jpg",
    description:
      "Officially authorized as a Pearson VUE testing center, enabling on-campus computer-based international IT certifications, academic tests, and global licensure exams.",
  },
  {
    year: "2025–2026",
    era: "Future Frontiers",
    title: "Kathmandu University Partnership & CTEVT Programmes",
    partner: "Kathmandu University & CTEVT",
    logo: "/universities/Kathmandu_University_Logo.webp",
    description:
      "MoU with Kathmandu University for BSc. Environmental Studies, University of Hertfordshire collaboration, and CTEVT vocational programmes.",
  },
];

export function CompactTimeline() {
  return (
    <div className="w-full py-8 sm:py-12 md:py-16">
      {/* Section Header */}
      <div className="text-left w-full mb-8 sm:mb-10 md:mb-12">
        <Reveal>
          <SplitText
            as="h2"
            className="font-display text-2xl sm:text-3xl md:text-4xl text-accent font-normal"
          >
            NAMI History
          </SplitText>
          <p className="mt-3 sm:mt-4 font-body text-sm sm:text-base text-neutral-700 leading-relaxed w-full text-justify [text-align-last:left]">
            Established in 2012, Naaya Aayam Multi-Disciplinary Institute (NAMI)
            was founded with a visionary commitment to deliver transformative,
            world-class education in Nepal. Over more than a decade of academic
            excellence and institutional growth, NAMI has evolved from
            pioneering UK-accredited international degree pathways to
            establishing premier Cambridge A-Levels, national school divisions
            (+2 NEB &amp; Primary), vocational CTEVT courses, and strategic
            partnerships with Kathmandu University—shaping generations of
            leaders equipped to make a lasting global impact.
          </p>
        </Reveal>
      </div>

      {/* Timeline Spine */}
      <div className="relative w-full">
        {/* Continuous Central Vertical Line (Desktop md+) */}
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-accent/30 via-accent to-accent/40 hidden md:block" />

        {/* Continuous Left Vertical Line (Mobile & Tablet < md) */}
        <div className="absolute top-0 bottom-0 left-3.5 sm:left-4 w-0.5 bg-gradient-to-b from-accent/30 via-accent to-accent/40 md:hidden" />

        <div className="space-y-4 sm:space-y-6 md:space-y-8">
          {MILESTONES.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={item.year}
                className={cn(
                  "relative flex flex-col md:flex-row items-center gap-3 sm:gap-4 md:gap-8",
                  isEven ? "md:flex-row-reverse" : "",
                )}
              >
                {/* Node Circle */}
                <div className="absolute left-3.5 sm:left-4 md:left-1/2 -translate-x-1/2 size-4 sm:size-5 rounded-full bg-surface border-2 sm:border-2.5 border-accent z-10 flex items-center justify-center shadow-xs">
                  <div className="size-1 sm:size-1.5 rounded-full bg-accent" />
                </div>

                {/* Milestone Card */}
                <div
                  className={cn(
                    "w-full md:w-[calc(50%-1.75rem)] pl-7 sm:pl-9 md:pl-0",
                    isEven ? "md:text-left" : "md:text-left",
                  )}
                >
                  <div className="rounded-2xl border border-border/80 bg-surface p-4 sm:p-5 md:p-6 shadow-xs hover:border-accent/40 hover:shadow-md transition-all duration-300 group">
                    {/* Top Row: Year + Era Pill + Partner Logo */}
                    <div className="flex items-center justify-between gap-2 sm:gap-3 pb-2.5 sm:pb-3 border-b border-border/60 mb-2.5 sm:mb-3">
                      <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                        <span className="font-display text-base sm:text-lg md:text-xl font-black text-accent tracking-tight">
                          {item.year}
                        </span>
                        <span className="px-2 sm:px-2.5 py-0.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-[9px] sm:text-[10px] md:text-[11px] font-bold uppercase tracking-wider">
                          {item.era}
                        </span>
                      </div>

                      <div className="relative h-8 sm:h-9 md:h-10 lg:h-12 w-20 sm:w-24 md:w-28 lg:w-36 shrink-0">
                        <Image
                          src={item.logo}
                          alt={item.partner}
                          fill
                          unoptimized
                          className="object-contain object-right"
                        />
                      </div>
                    </div>

                    {/* Milestone Title */}
                    <h3 className="font-display text-sm sm:text-base md:text-lg font-bold text-ink leading-snug group-hover:text-accent transition-colors">
                      {item.title}
                    </h3>

                    {/* Summary Description */}
                    <P className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-ink-muted leading-relaxed">
                      {item.description}
                    </P>
                  </div>
                </div>

                {/* Empty spacer for the opposite side on desktop */}
                <div className="hidden md:block md:w-[calc(50%-1.75rem)]" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
