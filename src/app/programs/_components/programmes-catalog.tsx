"use client";

import type { Route } from "next";
import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/components/ui/icon";
import { Eyebrow, H3, H4, P } from "@/components/ui/typography";
import type { AcademicLevel, Programme } from "@/lib/content";
import { ArrowRightIcon, MortarboardIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

export function ProgrammesCatalog({
  programmes,
  levels,
}: {
  readonly programmes: readonly Programme[];
  readonly levels: readonly AcademicLevel[];
}) {
  const [selectedLevel, setSelectedLevel] = useState<string>("all");

  const filtered =
    selectedLevel === "all"
      ? programmes
      : programmes.filter((p) => p.levelSlug === selectedLevel);

  return (
    <section className="gutter-x section-y bg-surface" id="all-programmes">
      <div className="mx-auto max-w-page">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <Eyebrow>Degree Catalog</Eyebrow>
            <H3 className="mt-4">All Academic Offerings & Qualifications</H3>
            <P className="mt-4">
              Browse through our specific degree programs, qualifications, and
              awarding bodies.
            </P>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              aria-pressed={selectedLevel === "all"}
              className={cn(
                "rounded-full border px-4 py-2 font-body text-xs font-medium uppercase tracking-widest transition-colors cursor-pointer",
                selectedLevel === "all"
                  ? "border-accent bg-accent text-accent-ink"
                  : "border-border text-ink-muted hover:border-ink hover:text-ink",
              )}
              onClick={() => setSelectedLevel("all")}
              type="button"
            >
              All Programs ({programmes.length})
            </button>
            {levels.map((lvl) => {
              const count = programmes.filter(
                (p) => p.levelSlug === lvl.slug,
              ).length;
              return (
                <button
                  aria-pressed={selectedLevel === lvl.slug}
                  className={cn(
                    "rounded-full border px-4 py-2 font-body text-xs font-medium uppercase tracking-widest transition-colors cursor-pointer",
                    selectedLevel === lvl.slug
                      ? "border-accent bg-accent text-accent-ink"
                      : "border-border text-ink-muted hover:border-ink hover:text-ink",
                  )}
                  key={lvl.id}
                  onClick={() => setSelectedLevel(lvl.slug)}
                  type="button"
                >
                  {lvl.title} ({count})
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((programme) => {
            const parentLevel = levels.find(
              (l) => l.slug === programme.levelSlug,
            );

            return (
              <article
                className="group flex flex-col justify-between rounded-xl border border-border bg-card p-6 shadow-xs transition-all duration-300 hover:border-accent hover:shadow-md"
                key={programme.id}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-md bg-muted px-2.5 py-1 font-body text-xs font-semibold text-accent">
                      <Icon className="size-3.5" icon={MortarboardIcon} />
                      {programme.qualification}
                    </span>
                    {programme.startingFrom === null ? null : (
                      <span className="rounded-md border border-primary-300 bg-primary-100 px-2.5 py-0.5 font-body text-xs font-medium text-primary-800">
                        {programme.startingFrom}
                      </span>
                    )}
                  </div>

                  <H4 className="mt-4 text-xl text-ink transition-colors group-hover:text-accent">
                    {programme.title}
                  </H4>

                  <p className="mt-2 font-body text-xs text-ink-muted">
                    Awarding Body:{" "}
                    <span className="font-semibold text-ink">
                      {programme.awardingBody}
                    </span>
                  </p>
                </div>

                <div className="mt-6 border-border/60 border-t pt-4">
                  <Link
                    className="inline-flex items-center gap-1.5 font-body text-xs font-semibold uppercase tracking-widest text-accent transition-colors hover:text-primary-800"
                    href={`/programs/${programme.levelSlug}` as Route}
                  >
                    <span>{parentLevel?.title ?? "Level"} Program Details</span>
                    <Icon className="size-3.5" icon={ArrowRightIcon} />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
