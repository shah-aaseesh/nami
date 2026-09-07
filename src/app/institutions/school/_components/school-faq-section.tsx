"use client";

import { Reveal } from "@/components/motion/reveal";
import { SectionHeader } from "@/components/shared/section-header";
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { schoolFaqs } from "./school-copy";

export function SchoolFaqSection({ id = "faqs" }: { readonly id?: string }) {
  return (
    <section
      className="gutter-x section-y border-t border-[#D3E2DB] bg-gradient-to-b from-[#F1F6F4] via-[#E9F2ED] to-[#F1F6F4] relative overflow-hidden"
      id={id}
    >
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -left-24 size-96 rounded-full bg-[#284540]/6 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -right-24 size-96 rounded-full bg-[#BD1B21]/5 blur-3xl"
      />

      <div className="relative mx-auto max-w-page">
        <SectionHeader
          description="Everything you need to know about our progressive educational philosophy, curriculum, daily routines, meals, and campus life."
          eyebrow="Questions & Answers"
          layout="split"
          title="Frequently Asked Questions"
        />

        <Reveal className="mt-8 sm:mt-10 lg:mt-14" y={20}>
          <div className="mx-auto max-w-4xl">
            <Accordion className="space-y-4">
              {schoolFaqs.map((faq, index) => (
                <AccordionItem
                  className="rounded-2xl border border-[#D3E1DB] bg-white px-6 py-2 transition-all duration-200 hover:border-[#BD1B21]/50 hover:shadow-md shadow-2xs"
                  key={faq.question}
                  value={`faq-${index}`}
                >
                  <AccordionTrigger className="w-full py-4 text-start font-display text-lg sm:text-xl font-medium text-ink transition-colors hover:text-accent">
                    <span className="flex items-start gap-4">
                      <span className="text-xs sm:text-sm font-semibold text-[#BD1B21] font-mono mt-1">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1">{faq.question}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionPanel className="pb-4 ps-8 pe-4">
                    <p className="font-body text-sm sm:text-base leading-relaxed text-ink-muted">
                      {faq.answer}
                    </p>
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
