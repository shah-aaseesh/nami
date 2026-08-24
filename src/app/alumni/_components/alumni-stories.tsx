"use client";

import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  Location01Icon,
  Mortarboard01Icon,
  Search01Icon,
} from "@hugeicons/core-free-icons";
import { useMemo, useState } from "react";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Eyebrow, H2, H4, P, Standfirst } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import type { AlumniProfile } from "./alumni-copy";

type CategoryFilter = "all" | "undergraduate" | "a-levels";

const CATEGORY_TABS = [
  { value: "all", label: "All Stories" },
  { value: "undergraduate", label: "Northampton Degrees" },
  { value: "a-levels", label: "Cambridge A-Levels" },
] as const;

function ProfileCard({ profile }: { readonly profile: AlumniProfile }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="group flex flex-col justify-between rounded-2xl border border-border/80 bg-surface-raised p-6 sm:p-8 shadow-2xs transition-all duration-300 hover:border-accent/40 hover:shadow-xs">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/20 bg-accent/5 px-3 py-1 text-xs font-semibold text-accent">
            <Icon icon={Mortarboard01Icon} className="size-3.5" />
            {profile.degree}
          </span>

          <span className="inline-flex items-center gap-1 text-xs text-ink-muted">
            <Icon
              icon={Location01Icon}
              className="size-3.5 text-ink-muted/80"
            />
            {profile.location}
          </span>
        </div>

        <div className="mt-5">
          <H4 className="text-xl font-display font-medium text-ink">
            {profile.name}
          </H4>
          <P className="mt-1 text-sm font-medium text-accent">
            {profile.role} · {profile.organization}
          </P>
        </div>

        <blockquote className="mt-5 border-l-2 border-accent/40 pl-4 font-display text-base italic text-ink-muted leading-relaxed">
          &ldquo;{profile.quote}&rdquo;
        </blockquote>

        {expanded ? (
          <div className="mt-6 border-t border-border/70 pt-5">
            <Eyebrow className="text-xs font-semibold text-ink">
              Key Contributions & Path
            </Eyebrow>
            <ul className="mt-3 space-y-2">
              {profile.keyHighlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex items-start gap-2.5 text-xs text-ink-muted leading-relaxed"
                >
                  <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                    <Icon icon={CheckIcon} className="size-2.5" />
                  </span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      <div className="mt-6 border-t border-border/60 pt-4 flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setExpanded((prev) => !prev)}
          className="text-xs text-ink hover:text-accent font-medium gap-1.5 px-0"
        >
          <span>{expanded ? "Show Less" : "View Career Path"}</span>
          <Icon
            icon={expanded ? ChevronUpIcon : ChevronDownIcon}
            className="size-3.5 text-accent"
          />
        </Button>

        <span className="text-xs text-ink-muted uppercase tracking-wider font-mono">
          NAMI Verified
        </span>
      </div>
    </article>
  );
}

export function AlumniStories({
  copy,
  profiles,
}: {
  readonly copy: {
    readonly eyebrow: string;
    readonly heading: string;
    readonly standfirst: string;
  };
  readonly profiles: readonly AlumniProfile[];
}) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("all");

  const filtered = useMemo(() => {
    return profiles.filter((p) => {
      const matchesCategory = category === "all" || p.category === category;
      const q = search.trim().toLowerCase();
      if (!q) return matchesCategory;

      const matchesSearch =
        p.name.toLowerCase().includes(q) ||
        p.role.toLowerCase().includes(q) ||
        p.organization.toLowerCase().includes(q) ||
        p.degree.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [profiles, category, search]);

  return (
    <section className="gutter-x section-y" id="stories">
      <div className="mx-auto max-w-page">
        <Reveal className="lg:grid lg:grid-cols-12 lg:items-end lg:gap-x-8">
          <div className="lg:col-span-7">
            <RevealItem className="flex items-center gap-4">
              <Eyebrow>{copy.eyebrow}</Eyebrow>
              <span className="h-px flex-1 bg-border" />
            </RevealItem>

            <RevealItem className="mt-5">
              <H2>{copy.heading}</H2>
            </RevealItem>
          </div>

          <div className="mt-6 lg:col-span-5 lg:mt-0 flex flex-col lg:items-end">
            <RevealItem>
              <Standfirst className="lg:text-right">
                {copy.standfirst}
              </Standfirst>
            </RevealItem>
            <RevealItem className="mt-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-3 py-1 text-xs font-semibold text-accent">
                <span className="size-1.5 rounded-full bg-accent animate-pulse" />
                {filtered.length}{" "}
                {filtered.length === 1 ? "Profile" : "Profiles"} Shown
              </span>
            </RevealItem>
          </div>
        </Reveal>

        {/* Filter Toolbar */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-xl border border-border/80 bg-surface-raised p-4 shadow-2xs">
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORY_TABS.map((tab) => {
              const active = category === tab.value;
              return (
                <button
                  type="button"
                  key={tab.value}
                  onClick={() => setCategory(tab.value)}
                  className={cn(
                    "rounded-lg px-4 py-2 text-xs font-medium transition-all duration-200 cursor-pointer min-h-11 sm:min-h-0",
                    active
                      ? "bg-accent text-white shadow-2xs"
                      : "bg-neutral-100 text-ink-muted hover:bg-neutral-200 hover:text-ink",
                  )}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="relative min-w-[240px] sm:max-w-xs">
            <Icon
              icon={Search01Icon}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-ink-muted pointer-events-none"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, role, organization..."
              className="w-full rounded-lg border border-border bg-surface pl-10 pr-4 py-2 text-xs text-ink placeholder:text-ink-muted/70 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent min-h-11 sm:min-h-0"
            />
          </div>
        </div>

        {/* Profiles Grid */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 sm:gap-8">
          {filtered.map((profile) => (
            <ProfileCard key={profile.id} profile={profile} />
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-dashed border-border p-12 text-center">
            <H4 className="text-lg font-display text-ink">
              No profiles matched your filter
            </H4>
            <P className="mt-2 text-sm text-ink-muted">
              Try adjusting your search terms or select &ldquo;All
              Stories&rdquo; to browse the network.
            </P>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearch("");
                setCategory("all");
              }}
              className="mt-6"
            >
              Reset Filters
            </Button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
