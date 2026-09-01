"use client";

import { useState } from "react";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Icon } from "@/components/ui/icon";
import { Eyebrow, P } from "@/components/ui/typography";
import { ChevronDownIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

export function WhyALevelsSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section
      className="gutter-x section-y border-y border-[#FFAD00]/30 bg-[#FFAD00]/10"
      id="why-a-levels"
    >
      <div className="mx-auto max-w-page">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-x-16 items-center">
          {/* Left Column: Vertically Centered Title */}
          <div className="lg:col-span-5">
            <Reveal>
              <div className="flex items-center gap-5">
                <Eyebrow>Cambridge A-Levels</Eyebrow>
                <span className="h-px flex-1 bg-border" />
              </div>
              <SplitText as="h2" className="mt-4">
                Why A Levels at NAMI?
              </SplitText>
            </Reveal>
          </div>

          {/* Right Column: Paragraph 1 + Expandable Paragraph 2 */}
          <div className="lg:col-span-7">
            <Reveal stagger={0.08}>
              <RevealItem>
                <P className="text-base sm:text-lg font-body leading-relaxed text-ink">
                  NAMI College offers the internationally recognised Cambridge
                  A-Level programme, providing students with a rigorous academic
                  pathway that is valued for university admissions both in Nepal
                  and internationally. The programme emphasises academic
                  excellence, critical thinking and independent learning,
                  helping students develop the ability to analyse, question and
                  learn beyond the classroom.
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
                    With a wide range of subjects and flexible subject
                    combinations, students can build an academic pathway suited
                    to their future ambitions, whether in Science, Medicine,
                    Engineering, Business, Humanities or Liberal Arts. As an
                    independent Cambridge Assessment International Education
                    examination centre since 2024, NAMI provides students with
                    an internationally oriented academic environment supported
                    by experienced academic leadership and student-focused
                    learning.
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
