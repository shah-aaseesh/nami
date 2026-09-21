"use client";

import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { Icon } from "@/components/ui/icon";
import { BookIcon, DiplomaIcon, PhoneIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { schoolFaqs } from "./school-copy";

export function SchoolFaqSection({
  id = "faqs",
  className,
}: {
  readonly id?: string;
  readonly className?: string;
}) {
  return (
    <section
      className={cn(
        "gutter-x section-y border-t border-border bg-surface relative",
        className,
      )}
      id={id}
    >
      <div className="relative mx-auto max-w-page">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14 items-start">
          {/* Left Column: Context, Narrative & Creative Interactive Elements */}
          <div className="flex flex-col justify-between h-full lg:col-span-5 space-y-6 sm:space-y-8">
            <div>
              <h3 className="font-display text-3xl sm:text-3xl lg:text-4xl font-semibold sm:font-normal text-ink leading-tight tracking-tight">
                Answers To <span className="text-[#BD1B21]">Your Most</span>{" "}
                <span className="text-[#284540]">Common Questions</span>
              </h3>

            <p className="mt-4 font-body text-sm sm:text-[15px] leading-relaxed text-ink-muted text-justify [text-align-last:left] [hyphens:auto]">
              Everything you need to know about our progressive educational philosophy, curriculum, daily routines, healthy meals, and student well-being at NAMI International School.
            </p>
          </div>

          {/* Key Primary Pillars / Highlights */}
          <div className="space-y-3.5 pt-1">
            <div className="flex items-start gap-3.5 rounded-xl border border-[#E5DECf] bg-white/60 p-3.5 transition-all duration-200 hover:bg-white hover:border-[#BD1B21]/30 hover:shadow-2xs">
              <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#BD1B21]/10 text-[#BD1B21]">
                <Icon className="size-4.5" icon={DiplomaIcon} />
              </div>
              <div>
                <h4 className="font-display text-sm font-semibold text-ink">
                  Stress-Free Foundation
                </h4>
                <p className="font-body text-xs text-ink-muted leading-relaxed mt-0.5">
                  Continuous formative assessment without high-stakes exam pressure through Grade V.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 rounded-xl border border-[#E5DECf] bg-white/60 p-3.5 transition-all duration-200 hover:bg-white hover:border-[#284540]/30 hover:shadow-2xs">
              <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#284540]/10 text-[#284540]">
                <Icon className="size-4.5" icon={BookIcon} />
              </div>
              <div>
                <h4 className="font-display text-sm font-semibold text-ink">
                  100% In-House Vegetarian Meals
                </h4>
                <p className="font-body text-xs text-ink-muted leading-relaxed mt-0.5">
                  Nutritionally balanced, freshly prepared hot meals and wholesome snacks daily.
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Admissions Action Strip */}
          <div className="rounded-2xl border border-[#BD1B21]/20 bg-gradient-to-br from-[#BD1B21]/5 via-[#FAF7F0] to-[#284540]/5 p-4 sm:p-5">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#BD1B21] text-white shadow-xs">
                  <Icon className="size-4.5" icon={PhoneIcon} />
                </div>
                <div>
                  <div className="font-display text-sm font-semibold text-ink">
                    Still have questions?
                  </div>
                  <div className="font-body text-xs text-ink-muted">
                    Our admissions team is here to help.
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-3.5 flex items-center gap-2.5 pt-2 border-t border-[#E5DECf]">
              <a
                href="tel:014917441"
                className="inline-flex items-center gap-2 rounded-lg bg-[#BD1B21] px-4 py-2 font-body text-xs font-semibold text-white shadow-xs transition-colors hover:bg-[#a0161b]"
              >
                <Icon className="size-3.5" icon={PhoneIcon} />
                <span>Call Admissions: 014917441/42/43/44</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Open Accordion List */}
        <div className="lg:col-span-7">
          <AccordionPrimitive.Root
            className="w-full divide-y divide-[#E0D8C8] border-y border-[#E0D8C8]"
            data-slot="accordion"
          >
            {schoolFaqs.map((faq, index) => (
              <AccordionPrimitive.Item
                className="transition-colors duration-200"
                data-slot="accordion-item"
                key={faq.question}
                value={`faq-${index}`}
              >
                <AccordionPrimitive.Header
                  className="flex"
                  data-slot="accordion-header"
                >
                  <AccordionPrimitive.Trigger
                    className="group flex w-full cursor-pointer items-start gap-3.5 py-4.5 sm:py-5 text-start font-display text-base sm:text-lg font-medium text-ink transition-colors duration-200 hover:text-[#BD1B21] focus-visible:outline-none"
                    data-slot="accordion-trigger"
                  >
                    {/* Monospace Number Tag */}
                    <span className="mt-0.5 font-mono text-xs font-semibold text-[#BD1B21] shrink-0">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {/* Question Text */}
                    <span className="flex-1 leading-snug">
                      {faq.question}
                    </span>

                    {/* Plus/Minus Indicator */}
                    <span className="mt-0.5 flex size-5.5 shrink-0 items-center justify-center rounded-full border border-[#D5CDC0] bg-white text-xs font-bold text-[#BD1B21] transition-all duration-200 group-hover:border-[#BD1B21] group-hover:bg-[#BD1B21]/10 group-data-panel-open:rotate-45 group-data-panel-open:bg-[#BD1B21] group-data-panel-open:text-white group-data-panel-open:border-[#BD1B21]">
                      +
                    </span>
                  </AccordionPrimitive.Trigger>
                </AccordionPrimitive.Header>
                <AccordionPrimitive.Panel
                  className="pb-5 pt-0 text-ink-muted data-open:animate-accordion-down data-closed:animate-accordion-up overflow-hidden"
                  data-slot="accordion-panel"
                >
                  <p className="ps-6 sm:ps-7 font-body text-sm sm:text-[14.5px] leading-relaxed text-ink/80 text-justify [text-align-last:left] [hyphens:auto]">
                    {faq.answer}
                  </p>
                </AccordionPrimitive.Panel>
              </AccordionPrimitive.Item>
            ))}
          </AccordionPrimitive.Root>
        </div>
      </div>
      </div>
    </section>
  );
}
