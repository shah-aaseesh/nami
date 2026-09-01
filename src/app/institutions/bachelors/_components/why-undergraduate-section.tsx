"use client";

import { useState } from "react";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Icon } from "@/components/ui/icon";
import { Eyebrow, P } from "@/components/ui/typography";
import { ChevronDownIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

export function WhyUndergraduateSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section
      className="gutter-x section-y border-y border-[#BD1B21]/15 bg-[#BD1B21]/[0.04]"
      id="why-undergraduate"
    >
      <div className="mx-auto max-w-page">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-x-16 items-center">
          {/* Left Column: Vertically Centered Title */}
          <div className="lg:col-span-5">
            <Reveal>
              <div className="flex items-center gap-5">
                <Eyebrow>Undergraduate Studies</Eyebrow>
                <span className="h-px flex-1 bg-border" />
              </div>
              <SplitText as="h2" className="mt-4">
                Why Undergraduate at NAMI?
              </SplitText>
            </Reveal>
          </div>

          {/* Right Column: Paragraph 1 + Expandable Paragraph 2 */}
          <div className="lg:col-span-7">
            <Reveal stagger={0.08}>
              <RevealItem>
                <P className="text-base sm:text-lg font-body leading-relaxed text-ink">
                  NAMI offers internationally oriented undergraduate education
                  through its academic collaboration with the University of
                  Northampton, UK. Students can pursue British degrees across
                  disciplines including Computer Science, Software Engineering,
                  Networking Engineering, Environmental Science and Business
                  Administration, gaining an academic foundation designed to
                  meet the expectations of the global job market.
                </P>
              </RevealItem>

              {/* Expandable Second Paragraph */}
              <div
                className={cn(
                  "grid transition-all duration-300 ease-in-out overflow-hidden",
                  isExpanded
                    ? "grid-rows-[1fr] opacity-100 mt-5 pt-5 border-t border-border"
                    : "grid-rows-[0fr] opacity-0 mt-0 pt-0 border-t-0",
                )}
              >
                <div className="overflow-hidden">
                  <P className="text-base sm:text-lg font-body leading-relaxed text-ink-muted">
                    The undergraduate experience goes beyond academic study.
                    NAMI&apos;s industry partnerships provide opportunities for
                    internships, mentorship, job placements and collaborative
                    research, helping students connect classroom learning with
                    real-world requirements. Through its Innovation and
                    Incubation Centre, students can also develop ideas, work
                    with entrepreneurs and industry experts, build prototypes,
                    explore business models and pursue their own ventures.
                  </P>
                </div>
              </div>

              {/* Read More / Read Less Toggle */}
              <RevealItem className="mt-4">
                <button
                  aria-expanded={isExpanded}
                  className="group inline-flex items-center gap-2 font-body text-xs font-semibold uppercase tracking-wider text-accent transition-colors hover:text-primary-800 cursor-pointer"
                  onClick={() => setIsExpanded((prev) => !prev)}
                  type="button"
                >
                  <span>{isExpanded ? "Read less" : "Read more"}</span>
                  <Icon
                    className={cn(
                      "size-3.5 transition-transform duration-300",
                      isExpanded ? "rotate-180" : "group-hover:translate-y-0.5",
                    )}
                    icon={ChevronDownIcon}
                  />
                </button>
              </RevealItem>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
