"use client";

import {
  ArrowUpRight01Icon,
  Calendar03Icon,
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  Location01Icon,
  Mail01Icon,
  Mortarboard01Icon,
} from "@hugeicons/core-free-icons";
import { useMemo, useState } from "react";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { Button, buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eyebrow, H2, H4, H5, P, Standfirst } from "@/components/ui/typography";
import type { SectionCopy, Vacancy } from "@/lib/content";
import { cn } from "@/lib/utils";
import { employmentTypeLabel } from "./careers-copy";

const fullDate = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

const TYPE_OPTIONS = [
  { value: "all", label: "All Employment Types" },
  { value: "full-time", label: "Full Time" },
  { value: "contract", label: "Contract" },
  { value: "part-time", label: "Part Time" },
  { value: "internship", label: "Internship" },
] as const;

function SectionHead({
  copy,
  totalCount,
}: {
  readonly copy: SectionCopy;
  readonly totalCount: number;
}) {
  return (
    <Reveal className="lg:grid lg:grid-cols-12 lg:items-end lg:gap-x-8">
      <div className="lg:col-span-7">
        {copy.eyebrow === null ? null : (
          <RevealItem className="flex items-center gap-4">
            <Eyebrow>{copy.eyebrow}</Eyebrow>
            <span className="h-px flex-1 bg-border" />
          </RevealItem>
        )}

        <RevealItem className="mt-5">
          <H2>{copy.heading}</H2>
        </RevealItem>
      </div>

      <div className="mt-6 lg:col-span-5 lg:mt-0 flex flex-col lg:items-end">
        {copy.standfirst === null ? null : (
          <RevealItem>
            <Standfirst className="lg:text-right">{copy.standfirst}</Standfirst>
          </RevealItem>
        )}
        <RevealItem className="mt-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-3 py-1 text-xs font-semibold text-accent">
            <span className="size-1.5 rounded-full bg-accent animate-pulse" />
            {totalCount} Active {totalCount === 1 ? "Opening" : "Openings"}
          </span>
        </RevealItem>
      </div>
    </Reveal>
  );
}

function VacancyCard({ item }: { readonly item: Vacancy }) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const mailtoHref = `mailto:careers@nami.edu.np?subject=Application%20for%20${encodeURIComponent(
    item.title,
  )}%20-%20[Your%20Name]&body=Dear%20NAMI%20Recruitment%20Committee,%0D%0A%0D%0AI%20would%20like%20to%20apply%20for%20the%20${encodeURIComponent(
    item.title,
  )}%20position%20(${encodeURIComponent(
    item.department,
  )}).%0D%0A%0D%0APlease%20find%20my%20attached%20Curriculum%20Vitae,%20academic%20credentials,%20and%20statement%20of%20purpose.%0D%0A%0D%0AContact%20Number:%20%0D%0ACurrent%20Location:%20%0D%0A%0D%0AThank%20you,%0D%0A[Your%20Name]`;

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("careers@nami.edu.np");
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // clipboard fallback handled silently
    }
  };

  return (
    <li className="group rounded-2xl border border-border/80 bg-surface p-6 sm:p-8 transition-all duration-300 hover:border-accent/50 hover:shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-md bg-accent/10 px-2.5 py-1 text-xs font-semibold text-accent">
            <Icon icon={Mortarboard01Icon} className="size-3.5" />
            {item.department}
          </span>
          <span className="inline-flex items-center rounded-md border border-border bg-neutral-100 px-2.5 py-1 text-xs font-medium text-ink-muted">
            {employmentTypeLabel[item.employmentType]}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-ink-muted">
          <Icon icon={Calendar03Icon} className="size-3.5" />
          <span>
            {item.closesAt === null
              ? "Open until filled"
              : `Deadline: ${fullDate.format(new Date(item.closesAt))}`}
          </span>
        </div>
      </div>

      <div className="mt-4 flex flex-col lg:flex-row lg:items-start lg:justify-between lg:gap-8">
        <div className="flex-1">
          <H4 className="text-xl sm:text-2xl font-normal text-ink group-hover:text-accent transition-colors">
            {item.title}
          </H4>

          <div className="mt-2 flex items-center gap-2 text-xs text-ink-muted">
            <Icon icon={Location01Icon} className="size-3.5 text-accent" />
            <span>{item.location}</span>
            <span className="text-border">•</span>
            <span>Posted {fullDate.format(new Date(item.postedAt))}</span>
          </div>

          <P className="mt-4 text-sm sm:text-base text-ink-muted leading-relaxed max-w-3xl">
            {item.summary}
          </P>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3 lg:mt-0 lg:shrink-0">
          <a
            href={mailtoHref}
            className={cn(buttonVariants({ size: "default" }), "gap-1.5")}
          >
            <span>Apply via Email</span>
            <Icon icon={ArrowUpRight01Icon} className="size-4" />
          </a>

          <Button
            type="button"
            variant="outline"
            size="default"
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
          >
            <span>{expanded ? "Less Details" : "Requirements"}</span>
            <Icon
              icon={expanded ? ChevronUpIcon : ChevronDownIcon}
              className="size-4"
            />
          </Button>
        </div>
      </div>

      {expanded && (
        <div className="mt-6 border-t border-border pt-6 text-sm text-ink-muted">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <H5 className="text-sm font-semibold text-ink uppercase tracking-wider">
                Application Checklist
              </H5>
              <ul className="mt-3 flex flex-col gap-2 text-xs sm:text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-accent">•</span>
                  <span>Updated Curriculum Vitae (CV) & Recent Photograph</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">•</span>
                  <span>Copies of Academic Degrees & Transcripts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">•</span>
                  <span>Cover Letter / Statement of Teaching Philosophy</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">•</span>
                  <span>Two Professional / Academic References</span>
                </li>
              </ul>
            </div>

            <div>
              <H5 className="text-sm font-semibold text-ink uppercase tracking-wider">
                Submission Instructions
              </H5>
              <P className="mt-3 text-xs sm:text-sm">
                Send all application materials to{" "}
                <span className="font-semibold text-ink">
                  careers@nami.edu.np
                </span>{" "}
                citing the position title in the subject line. Shortlisted
                candidates will be contacted within 5 working days.
              </P>
              <div className="mt-4 flex items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  size="xs"
                  onClick={handleCopyEmail}
                >
                  <Icon
                    icon={copied ? CheckIcon : Mail01Icon}
                    className="size-3"
                  />
                  <span>{copied ? "Email Copied!" : "Copy HR Email"}</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </li>
  );
}

export function CareersVacancies({
  section,
  vacancies,
}: {
  readonly section: SectionCopy;
  readonly vacancies: readonly Vacancy[];
}) {
  const [selectedDept, setSelectedDept] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const departments = useMemo(() => {
    const depts = new Set<string>();
    for (const v of vacancies) {
      depts.add(v.department);
    }
    return Array.from(depts);
  }, [vacancies]);

  const filteredVacancies = useMemo(() => {
    return vacancies.filter((v) => {
      const matchDept = selectedDept === "all" || v.department === selectedDept;
      const matchType =
        selectedType === "all" || v.employmentType === selectedType;
      const matchQuery =
        searchQuery.trim() === "" ||
        v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.department.toLowerCase().includes(searchQuery.toLowerCase());

      return matchDept && matchType && matchQuery;
    });
  }, [vacancies, selectedDept, selectedType, searchQuery]);

  return (
    <section className="gutter-x section-y" id="vacancies">
      <div className="mx-auto max-w-page">
        <SectionHead copy={section} totalCount={vacancies.length} />

        <div className="mt-10 flex flex-col gap-4 rounded-xl border border-border/80 bg-neutral-100/50 p-4 sm:p-6 lg:mt-14">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-ink-muted mr-1">
                Department:
              </span>
              <button
                type="button"
                onClick={() => setSelectedDept("all")}
                className={cn(
                  "min-h-9 rounded-lg px-3.5 py-2 text-xs font-medium transition-all",
                  selectedDept === "all"
                    ? "bg-accent text-white shadow-xs"
                    : "border border-border bg-surface text-ink-muted hover:bg-surface-raised",
                )}
              >
                All Departments
              </button>
              {departments.map((dept) => (
                <button
                  key={dept}
                  type="button"
                  onClick={() => setSelectedDept(dept)}
                  className={cn(
                    "min-h-9 rounded-lg px-3.5 py-2 text-xs font-medium transition-all",
                    selectedDept === dept
                      ? "bg-accent text-white shadow-xs"
                      : "border border-border bg-surface text-ink-muted hover:bg-surface-raised",
                  )}
                >
                  {dept}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-ink-muted mr-1">
                Type:
              </span>
              <Select
                value={selectedType}
                onValueChange={(val: string | null) =>
                  setSelectedType(val ?? "all")
                }
              >
                <SelectTrigger
                  size="sm"
                  className="w-48 bg-surface border-border"
                  aria-label="Filter vacancies by employment type"
                >
                  <SelectValue>
                    {TYPE_OPTIONS.find((opt) => opt.value === selectedType)
                      ?.label ?? "All Employment Types"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {TYPE_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by job title, subject, or keywords..."
              aria-label="Search vacancies"
              className="w-full min-h-10 rounded-lg border border-border bg-surface px-4 py-2 text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:ring-1 focus:ring-accent"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-ink-muted hover:text-ink"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {filteredVacancies.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-dashed border-border p-12 text-center">
            <H5 className="text-lg font-medium text-ink">
              No Openings Match Your Filter
            </H5>
            <P className="mx-auto mt-2 max-w-md text-sm text-ink-muted">
              {section.emptyState}
            </P>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-6"
              onClick={() => {
                setSelectedDept("all");
                setSelectedType("all");
                setSearchQuery("");
              }}
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <ul className="mt-8 flex flex-col gap-6 lg:mt-10 lg:gap-8">
            {filteredVacancies.map((item) => (
              <VacancyCard item={item} key={item.id} />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
