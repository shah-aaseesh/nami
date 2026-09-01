"use client";

import {
  ArrowRight01Icon,
  Cancel01Icon,
  File01Icon,
  PrinterIcon,
} from "@hugeicons/core-free-icons";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { SectionHeader } from "@/components/shared/section-header";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import { type AlumniStory, alumniStories } from "./alumni-copy";

export function AlumniStories({
  copy,
}: {
  readonly copy: {
    readonly eyebrow: string;
    readonly heading: string;
    readonly standfirst: string;
  };
}) {
  const [activeStory, setActiveStory] = useState<AlumniStory | null>(null);
  const [selectedWing, setSelectedWing] = useState<string>("all");

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setActiveStory(null);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (activeStory) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeStory]);

  const filteredStories =
    selectedWing === "all"
      ? alumniStories
      : alumniStories.filter((s) => s.institution === selectedWing);

  const wingFilters = [
    { id: "all", label: "All Wings" },
    { id: "college", label: "Cambridge A-Levels" },
    { id: "institute", label: "Northampton UK" },
    { id: "higher-secondary", label: "+2 Science" },
  ] as const;

  return (
    <section
      className="gutter-x section-y border-t border-border bg-surface"
      id="alumni-stories"
    >
      <div className="mx-auto max-w-page">
        {/* Section Header */}
        <SectionHeader
          description={copy.standfirst}
          eyebrow={copy.eyebrow}
          eyebrowClassName="text-[#BD1B21] font-semibold"
          layout="split"
          title={copy.heading}
        />

        {/* Wing Filter Pills */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
          <div className="flex flex-wrap items-center gap-2">
            {wingFilters.map((tab) => {
              const isActive = selectedWing === tab.id;
              const count =
                tab.id === "all"
                  ? alumniStories.length
                  : alumniStories.filter((s) => s.institution === tab.id)
                      .length;

              return (
                <button
                  className={cn(
                    "group flex items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm font-medium transition-all cursor-pointer",
                    isActive
                      ? "bg-[#BD1B21] text-white shadow-sm"
                      : "bg-surface-raised border border-border text-ink-muted hover:border-[#BD1B21]/50 hover:text-ink",
                  )}
                  key={tab.id}
                  onClick={() => setSelectedWing(tab.id)}
                  type="button"
                >
                  <span>{tab.label}</span>
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[11px] font-semibold",
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-muted text-ink-muted group-hover:text-ink",
                    )}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <span className="text-xs text-ink-muted font-body">
            Click any profile to open the PDF case study
          </span>
        </div>

        {/* Editorial Alumni Ledger (Summarized as a Whole) */}
        <div className="mt-6 divide-y divide-border border-y border-border">
          {filteredStories.map((story) => (
            <button
              className="group w-full py-6 sm:py-7 text-left transition-all duration-200 hover:bg-neutral-50/70 cursor-pointer block focus-visible:outline-2 focus-visible:outline-[#BD1B21]"
              key={story.id}
              onClick={() => setActiveStory(story)}
              type="button"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-center">
                {/* 1. Alumnus Profile & Identity (Cols 1-4) */}
                <div className="lg:col-span-4 flex items-center gap-4">
                  <div className="relative size-14 sm:size-16 shrink-0 overflow-hidden rounded-full border-2 border-border group-hover:border-[#BD1B21] transition-colors shadow-xs">
                    <Image
                      alt={story.name}
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-108"
                      height={80}
                      src={story.avatar}
                      width={80}
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-display text-lg sm:text-xl font-medium text-ink group-hover:text-[#BD1B21] transition-colors truncate">
                        {story.name}
                      </h3>
                      <span className="text-xs text-ink-muted shrink-0">
                        ({story.graduationYear.replace("Batch of ", "’")})
                      </span>
                    </div>

                    <p className="font-body text-xs sm:text-sm font-semibold text-ink/80 mt-0.5 truncate">
                      {story.currentRole}
                    </p>

                    <p className="font-body text-xs text-[#BD1B21] font-medium truncate">
                      {story.company} •{" "}
                      <span className="text-ink-muted">{story.location}</span>
                    </p>
                  </div>
                </div>

                {/* 2. Key Story Highlights Summarized (Cols 5-9) */}
                <div className="lg:col-span-5 space-y-1.5">
                  <span className="inline-block rounded-full bg-neutral-100 border border-border px-2.5 py-0.5 text-[11px] font-medium text-ink-muted mb-1">
                    {story.institutionLabel}
                  </span>
                  <p className="font-body text-xs sm:text-sm text-ink/85 leading-relaxed">
                    {story.summaryHighlights[0]}
                  </p>
                  <p className="font-body text-xs text-ink-muted leading-relaxed hidden sm:block">
                    {story.summaryHighlights[1]}
                  </p>
                </div>

                {/* 3. PDF Story Action Button (Cols 10-12) */}
                <div className="lg:col-span-3 flex lg:justify-end items-center">
                  <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-raised px-4 py-2 text-xs font-semibold text-ink shadow-xs transition-all duration-200 group-hover:border-[#BD1B21] group-hover:bg-[#BD1B21] group-hover:text-white">
                    <Icon
                      className="size-3.5 text-[#BD1B21] group-hover:text-white"
                      icon={File01Icon}
                    />
                    <span>Read PDF Story</span>
                    <Icon
                      className="size-3 transition-transform group-hover:translate-x-0.5"
                      icon={ArrowRight01Icon}
                    />
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Authentic University Prospectus / Case Study PDF Popup */}
      {activeStory && (
        <div
          aria-modal="true"
          className="fixed inset-0 z-60 flex flex-col bg-neutral-950/90 backdrop-blur-md animate-in fade-in duration-200"
          role="dialog"
        >
          {/* PDF Viewer Header Toolbar */}
          <header className="sticky top-0 z-20 flex items-center justify-between border-b border-white/15 bg-neutral-950 px-4 py-3 sm:px-8 text-white">
            <div className="flex items-center gap-3 min-w-0">
              <span className="flex size-7 items-center justify-center rounded bg-[#BD1B21] text-white">
                <Icon className="size-4" icon={File01Icon} />
              </span>

              <div className="min-w-0">
                <h4 className="text-xs sm:text-sm font-medium truncate text-white/90">
                  NAMI-Alumni-Story-{activeStory.name.replace(" ", "-")}.pdf
                </h4>
                <p className="text-[11px] text-white/60 font-body">
                  NAMI Alumni Relations • Case Study Publication
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                className="hidden sm:inline-flex items-center gap-1.5 rounded-md bg-white/10 px-3 py-1.5 text-xs font-medium text-white hover:bg-white/20 transition-colors cursor-pointer"
                onClick={() => window.print()}
                title="Print PDF Document"
                type="button"
              >
                <Icon className="size-3.5" icon={PrinterIcon} />
                <span>Print</span>
              </button>

              <button
                aria-label="Close document"
                className="flex size-8 items-center justify-center rounded-full bg-white/15 text-white hover:bg-[#BD1B21] transition-colors cursor-pointer"
                onClick={() => setActiveStory(null)}
                type="button"
              >
                <Icon className="size-4" icon={Cancel01Icon} />
              </button>
            </div>
          </header>

          {/* PDF Page Canvas (White A4 Editorial Sheet) */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-8 lg:p-12 flex justify-center bg-neutral-900">
            <article className="w-full max-w-3xl rounded-xl bg-white p-6 sm:p-12 shadow-2xl text-ink border border-neutral-200">
              {/* Top Collegiate Header Bar */}
              <div className="border-b border-neutral-300 pb-5 flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-display text-xl font-bold tracking-tight text-[#BD1B21]">
                      NAMI
                    </span>
                    <span className="text-[11px] font-semibold tracking-wider text-neutral-500 uppercase">
                      • ALUMNI CASE STUDY
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Kathmandu, Nepal • In Partnership with University of
                    Northampton UK
                  </p>
                </div>

                <span className="rounded bg-neutral-100 px-2.5 py-1 text-[11px] font-mono font-medium text-neutral-600">
                  {activeStory.pdfData.documentId}
                </span>
              </div>

              {/* Story Hero Header */}
              <div className="mt-8 flex flex-col sm:flex-row items-start gap-6 border-b border-neutral-200 pb-8">
                <div className="relative size-24 sm:size-28 shrink-0 overflow-hidden rounded-xl border border-neutral-300 shadow-xs">
                  <Image
                    alt={activeStory.name}
                    className="size-full object-cover"
                    height={120}
                    src={activeStory.avatar}
                    width={120}
                  />
                </div>

                <div className="flex-1 space-y-1">
                  <span className="inline-block rounded-full bg-[#BD1B21]/10 text-[#BD1B21] px-3 py-0.5 text-xs font-semibold">
                    {activeStory.institutionLabel} •{" "}
                    {activeStory.graduationYear}
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl font-medium text-ink tracking-tight">
                    {activeStory.name}
                  </h2>
                  <p className="font-body text-sm font-semibold text-[#BD1B21]">
                    {activeStory.currentRole} at {activeStory.company}
                  </p>
                  <p className="font-body text-xs text-neutral-600">
                    Programme: {activeStory.programme} • Based in{" "}
                    {activeStory.location}
                  </p>
                </div>
              </div>

              {/* Highlight Quote */}
              <div className="mt-8 rounded-xl bg-neutral-50 p-5 border-l-4 border-[#BD1B21] italic text-sm sm:text-base text-neutral-800 font-display leading-relaxed">
                &ldquo;{activeStory.keyQuote}&rdquo;
              </div>

              {/* Story Section 1: Background & Academic Life */}
              <div className="mt-8 space-y-3">
                <h3 className="font-display text-base font-semibold text-ink uppercase tracking-wider text-xs border-b border-neutral-200 pb-1.5">
                  Academic Experience at NAMI
                </h3>
                <p className="font-body text-xs sm:text-sm text-neutral-700 leading-relaxed">
                  {activeStory.pdfData.bioSummary}
                </p>
                <p className="font-body text-xs sm:text-sm text-neutral-700 leading-relaxed">
                  {activeStory.pdfData.academicJourney}
                </p>
              </div>

              {/* Story Section 2: Career Path Timeline */}
              <div className="mt-8 space-y-4">
                <h3 className="font-display text-base font-semibold text-ink uppercase tracking-wider text-xs border-b border-neutral-200 pb-1.5">
                  Career Trajectory & Milestones
                </h3>
                <div className="space-y-4">
                  {activeStory.pdfData.careerMilestones.map((milestone) => (
                    <div
                      className="flex items-start gap-4 text-xs sm:text-sm"
                      key={milestone.year + milestone.title}
                    >
                      <span className="font-mono font-semibold text-[#BD1B21] shrink-0 w-20">
                        {milestone.year}
                      </span>
                      <div>
                        <p className="font-semibold text-ink">
                          {milestone.title} —{" "}
                          <span className="font-normal text-neutral-600">
                            {milestone.organization}
                          </span>
                        </p>
                        <p className="text-neutral-600 text-xs mt-0.5 leading-relaxed">
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Story Section 3: Graduate Q&A Interview */}
              <div className="mt-8 space-y-4">
                <h3 className="font-display text-base font-semibold text-ink uppercase tracking-wider text-xs border-b border-neutral-200 pb-1.5">
                  In Conversation with {activeStory.name}
                </h3>
                {activeStory.pdfData.interviewQnA.map((item) => (
                  <div
                    className="space-y-1 text-xs sm:text-sm"
                    key={item.question.slice(0, 30)}
                  >
                    <p className="font-semibold text-neutral-900">
                      Q: {item.question}
                    </p>
                    <p className="text-neutral-700 leading-relaxed italic">
                      &ldquo;{item.answer}&rdquo;
                    </p>
                  </div>
                ))}
              </div>

              {/* PDF Document Footer */}
              <footer className="mt-12 border-t border-neutral-300 pt-6 flex flex-wrap items-center justify-between text-xs text-neutral-500 gap-4">
                <div>
                  <p className="font-semibold text-neutral-800">
                    NAMI College Alumni Relations
                  </p>
                  <p>
                    Gokarneshwor-7, Jorpati, Kathmandu, Nepal •
                    alumni@nami.edu.np
                  </p>
                </div>
                <div className="text-right font-mono text-[11px]">
                  <span>OFFICIAL ALUMNI PROFILE • PAGE 1 OF 1</span>
                </div>
              </footer>
            </article>
          </div>
        </div>
      )}
    </section>
  );
}
