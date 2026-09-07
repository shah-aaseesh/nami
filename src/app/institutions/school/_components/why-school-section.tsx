"use client";

import { useState } from "react";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Icon } from "@/components/ui/icon";
import { Eyebrow, P } from "@/components/ui/typography";
import { ChevronDownIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

export function WhySchoolSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section
      className="gutter-x section-y border-t border-[#E8E2D5] bg-gradient-to-b from-[#FAF8F3] via-[#F5EFE6] to-[#FAF8F3] relative overflow-hidden"
      id="why-school"
    >
      {/* Subtle brand color accent background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -left-24 size-96 rounded-full bg-[#BD1B21]/5 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -right-24 size-96 rounded-full bg-[#284540]/5 blur-3xl"
      />

      <div className="relative mx-auto max-w-page">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-x-16 items-center">
          {/* Left Column: Vertically Centered Title */}
          <div className="lg:col-span-5">
            <Reveal>
              <div className="flex items-center gap-5">
                <Eyebrow className="text-[#BD1B21]">
                  NAMI International School
                </Eyebrow>
                <span className="h-px flex-1 bg-border" />
              </div>
              <SplitText as="h2" className="mt-4 text-ink">
                Why Study at NAMI?
              </SplitText>
            </Reveal>
          </div>

          {/* Right Column: Paragraph 1 + Expandable Paragraph 2 */}
          <div className="lg:col-span-7">
            <Reveal stagger={0.08}>
              <RevealItem>
                <P className="text-base sm:text-lg font-body leading-relaxed text-ink">
                  At NAMI International School, we believe education is about
                  more than acquiring knowledge. It is about helping students
                  understand the world, discover their strengths, build
                  meaningful relationships, and grow into confident, responsible
                  individuals. We create an environment where students are
                  encouraged to ask questions, explore ideas, work with others,
                  think critically, and connect what they learn with real-life
                  experiences.
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
                    Our educational approach is grounded in progressive
                    education, with an emphasis on meaningful learning, student
                    participation, inclusion, values, creativity, and personal
                    growth. Through classroom learning, practical activities,
                    creative pursuits, sports, community engagement, modern
                    science and computer laboratories, and student well-being
                    support, we help learners develop the confidence and
                    competencies to succeed in higher education and life.
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
