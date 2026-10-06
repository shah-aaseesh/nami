"use client";

import Image from "next/image";
import { useState } from "react";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Eyebrow, H3, H4, P } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

type LeaderMessage = {
  readonly id: "chairperson" | "ceo";
  readonly roleBadge: string;
  readonly name: string;
  readonly title: string;
  readonly credentials: string;
  readonly portrait: string;
  readonly quote: string;
  readonly message: readonly string[];
};

const LEADERSHIP_MESSAGES: readonly LeaderMessage[] = [
  {
    id: "chairperson",
    roleBadge: "Message from the Chairperson",
    name: "Capt. Rameshwar Thapa",
    title: "Chairperson, NAMI Group of Companies",
    credentials: "Founder Chairman · Aviator & Strategic Entrepreneur",
    portrait: "/leadership/rameshwar-thapa.webp",
    quote:
      "Our founding conviction remains steadfast: to offer access to world-class education within Nepal and nurture leaders who transform communities locally and globally.",
    message: [
      "When we established Naaya Aayam Multi-Disciplinary Institute (NAMI) in 2012, our guiding principle was both ambitious and clear: to create an educational ecosystem that eliminates the necessity for talented Nepali youth to seek abroad what could be delivered with uncompromised excellence right here in Nepal.",
      "Over the past decade, NAMI has grown from a singular pioneering tertiary institute into a comprehensive educational group spanning NAMI International School, Cambridge GCE A-Levels, NEB +2, and multidisciplinary Bachelor's and Master's degree programmes in collaboration with world-renowned institutions like the University of Northampton, University of Hertfordshire, and Kathmandu University.",
      "Our institutions are built on strong governance, cutting-edge infrastructure, and holistic character formation symbolised by the five petals of our red lotus emblem — enlightenment, knowledge, purity of heart and mind, self-awareness, and wisdom. We do not simply impart academic curricula; we instill the discipline, empathy, and ethical leadership necessary for our graduates to excel in an interconnected global economy.",
      "As we look ahead, NAMI remains committed to sustainable innovation, state-of-the-art STEM and humanities research, and empowering generations of students to lead with conviction, purpose, and integrity.",
    ],
  },
  {
    id: "ceo",
    roleBadge: "Message from the Chief Executive Officer",
    name: "Mr. Pranil Pandey, FCCA",
    title: "Chief Executive Officer, NAMI Group of Companies",
    credentials: "FCCA (UK) · Master's in Management",
    portrait: "/leadership/pranil.jpeg",
    quote:
      "At NAMI, we align world-class academic frameworks with experiential learning, cultivating future-ready professionals and compassionate global citizens.",
    message: [
      "Education in the 21st century demands more than conventional classroom instruction; it requires dynamic adaptability, analytical rigor, hands-on technological literacy, and deeply ingrained social responsibility. At NAMI, every academic programme is meticulously structured to meet these imperatives.",
      "Having been part of NAMI's journey since 2015, I take immense pride in our evolution into an institution recognized for academic excellence, innovative pedagogy, and strong industry-academia linkages. From our Primary and Middle School divisions to our Cambridge A-Levels, CTEVT skill-based vocational programmes, and international undergraduate degrees, we foster an environment where students actively discover their intellectual and creative potential.",
      "We continue to invest extensively in modern learning technologies, advanced science and computing laboratories, Pearson VUE testing facilities, and comprehensive career counseling. Our dedicated faculty members bring international best practices into every classroom, mentoring students to turn curiosity into meaningful scholarship.",
      "We warmly invite students and parents to experience the NAMI difference — where global opportunities and grounded values converge to build extraordinary futures.",
    ],
  },
];

export function AboutLeadershipMessages() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedCard((prev) => (prev === id ? null : id));
  };

  return (
    <section className="gutter-x section-y" id="leadership-messages">
      <div className="mx-auto max-w-page">
        {/* Section Header */}
        <div className="max-w-3xl">
          <Reveal>
            <div className="flex items-center gap-5">
              <Eyebrow className="text-accent">Executive Leadership</Eyebrow>
              <span className="h-px flex-1 bg-border" />
            </div>
          </Reveal>

          <div className="mt-4 sm:mt-5">
            <Reveal>
              <SplitText
                as="h2"
                className="font-display text-3xl sm:text-4xl lg:text-5xl text-ink font-normal tracking-tight"
              >
                Messages from the Chairperson & Chief Executive Officer
              </SplitText>
            </Reveal>
          </div>
        </div>

        {/* Leadership Message Cards */}
        <div className="mt-12 sm:mt-16 flex flex-col gap-12 lg:gap-16">
          {LEADERSHIP_MESSAGES.map((leader, index) => {
            const isExpanded = expandedCard === leader.id;
            const isReversed = index % 2 !== 0;
            const visibleParagraphs = isExpanded
              ? leader.message
              : leader.message.slice(0, 2);

            return (
              <div
                key={leader.id}
                id={`message-${leader.id}`}
                className="group rounded-3xl border border-border/90 bg-surface-raised p-6 sm:p-8 lg:p-10 shadow-xs transition-all duration-300 hover:shadow-md hover:border-accent/30"
              >
                <div
                  className={cn(
                    "flex flex-col lg:flex-row items-stretch gap-8 lg:gap-12",
                    isReversed && "lg:flex-row-reverse",
                  )}
                >
                  {/* Portrait Column */}
                  <div className="w-full lg:w-[320px] xl:w-[360px] shrink-0 flex flex-col">
                    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border bg-neutral-900/5 shadow-xs">
                      <Image
                        src={leader.portrait}
                        alt={leader.name}
                        fill
                        unoptimized
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-103"
                        sizes="(max-width: 1023px) 100vw, 360px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/40 via-transparent to-transparent pointer-events-none" />
                    </div>

                    <div className="mt-4 border-t border-border/80 pt-3">
                      <p className="font-display text-lg sm:text-xl font-bold text-ink">
                        {leader.name}
                      </p>
                      <p className="font-body text-xs sm:text-sm font-semibold text-accent">
                        {leader.title}
                      </p>
                      <p className="mt-0.5 font-body text-xs text-ink-muted">
                        {leader.credentials}
                      </p>
                    </div>
                  </div>

                  {/* Message Column */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-accent/10 text-accent border border-accent/20 mb-4">
                        <span>{leader.roleBadge}</span>
                      </div>

                      {/* Featured Quote */}
                      <blockquote className="relative pl-5 sm:pl-6 border-l-3 border-accent italic font-display text-base sm:text-lg lg:text-xl text-ink leading-relaxed mb-6">
                        &ldquo;{leader.quote}&rdquo;
                      </blockquote>

                      {/* Message Paragraphs */}
                      <div className="space-y-4">
                        {visibleParagraphs.map((paragraph, pIndex) => (
                          <P
                            key={pIndex}
                            className="text-sm sm:text-base text-ink/85 leading-relaxed text-justify [text-align-last:left]"
                          >
                            {paragraph}
                          </P>
                        ))}
                      </div>
                    </div>

                    {/* Expand / Collapse Button */}
                    {leader.message.length > 2 && (
                      <div className="mt-6 pt-4 border-t border-border/60">
                        <button
                          type="button"
                          onClick={() => toggleExpand(leader.id)}
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold bg-accent text-white hover:bg-accent/90 transition-all duration-200 cursor-pointer shadow-xs"
                        >
                          <span>
                            {isExpanded ? "Read Less" : "Read Full Message"}
                          </span>
                          <svg
                            aria-hidden="true"
                            className={cn(
                              "size-3.5 transition-transform duration-200",
                              isExpanded && "rotate-180",
                            )}
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
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
