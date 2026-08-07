"use client";

import { Marquee } from "@/components/motion/marquee";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Eyebrow, Standfirst } from "@/components/ui/typography";
import type { Partner } from "@/lib/content";
import { cn } from "@/lib/utils";

function getPartnerInitials(name: string): string {
  const match = name.match(/\(([^)]+)\)/);
  if (match?.[1]) return match[1];
  const cleaned = name.replace(/\b(Pvt|Ltd|Inc|Network)\b/gi, "").trim();
  const words = cleaned.split(/\s+/).filter(Boolean);
  const firstWord = words[0];
  if (words.length === 1 && firstWord)
    return firstWord.slice(0, 3).toUpperCase();
  return words
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

function getPartnerCategoryTag(partner: Partner): string {
  if (partner.kind === "technology") return "Cloud & Tech";
  if (partner.kind === "ecosystem") return "Ecosystem";
  const lower = partner.name.toLowerCase();
  if (lower.includes("bank") || lower.includes("capital")) return "Finance";
  if (lower.includes("media") || lower.includes("television")) return "Media";
  if (
    lower.includes("tech") ||
    lower.includes("solutions") ||
    lower.includes("factory")
  )
    return "IT & Software";
  if (lower.includes("recruit") || lower.includes("intern")) return "Talent";
  return "Industry";
}

function PartnerCard({ partner }: { partner: Partner }) {
  const initials = getPartnerInitials(partner.name);
  const tag = getPartnerCategoryTag(partner);

  return (
    <div
      className={cn(
        "group relative flex items-center gap-3.5 rounded-2xl border border-border/70 bg-surface/80 px-4 py-3 sm:px-5 sm:py-3.5 backdrop-blur-xs transition-all duration-300",
        "hover:border-accent/50 hover:bg-surface-elevated hover:shadow-md hover:-translate-y-0.5",
      )}
    >
      <div className="flex size-9 sm:size-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 border border-accent/20 font-display text-xs sm:text-sm font-semibold text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-ink-on-accent">
        {initials}
      </div>

      <div className="flex flex-col gap-0.5">
        <span className="font-display font-medium text-sm sm:text-base text-ink transition-colors duration-300 group-hover:text-accent whitespace-nowrap">
          {partner.name}
        </span>
        <span className="font-body text-[10px] tracking-wider uppercase text-ink-muted/80">
          {tag}
        </span>
      </div>
    </div>
  );
}

export function AboutPartners({ partners }: { partners: readonly Partner[] }) {
  if (partners.length === 0) return null;

  const half = Math.ceil(partners.length / 2);
  const row1 = partners.slice(0, half);
  const row2 = partners.slice(half);

  return (
    <section
      className="relative isolate overflow-hidden border-y border-border/60 bg-surface-muted/30 py-16 sm:py-24 lg:py-28"
      id="partners"
    >
      <div className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-96 w-[600px] -translate-x-1/2 rounded-full bg-accent/5 blur-3xl" />

      <div className="gutter-x mx-auto max-w-page mb-10 sm:mb-14">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <Reveal atFold>
              <Eyebrow>Industry & Global Network</Eyebrow>
            </Reveal>
            <SplitText
              as="h2"
              atFold
              className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-normal text-balance text-ink"
            >
              {`Partnering with ${partners.length} Industry Leaders & Ecosystem Innovators`}
            </SplitText>
          </div>
          <Reveal atFold className="shrink-0 lg:max-w-md" delay={0.15}>
            <Standfirst className="text-ink-muted">
              Our partner network spans cloud computing, financial institutions,
              software hubs, and incubator ecosystems, empowering students with
              direct career opportunities and global credentials.
            </Standfirst>
          </Reveal>
        </div>
      </div>

      <div className="relative flex flex-col gap-4 sm:gap-5 py-2">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-32 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-32 bg-gradient-to-l from-background to-transparent" />

        <Marquee copies={3} label="Industry partners row 1" speed={45}>
          <div className="flex items-center gap-3 sm:gap-4 pr-3 sm:pr-4">
            {row1.map((partner) => (
              <PartnerCard key={partner.id} partner={partner} />
            ))}
          </div>
        </Marquee>

        <Marquee copies={3} label="Industry partners row 2" reverse speed={40}>
          <div className="flex items-center gap-3 sm:gap-4 pr-3 sm:pr-4">
            {row2.map((partner) => (
              <PartnerCard key={partner.id} partner={partner} />
            ))}
          </div>
        </Marquee>
      </div>

      <div className="gutter-x mx-auto max-w-page mt-12 sm:mt-16">
        <Reveal
          atFold
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 pt-8 border-t border-border/60"
          delay={0.25}
        >
          <div className="flex items-center gap-4">
            <span className="font-display text-3xl sm:text-4xl font-semibold text-accent">
              21+
            </span>
            <span className="font-body text-xs sm:text-sm text-ink-muted leading-snug">
              Corporate & Technology Partners
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-display text-3xl sm:text-4xl font-semibold text-accent">
              100%
            </span>
            <span className="font-body text-xs sm:text-sm text-ink-muted leading-snug">
              Industry-Aligned Project Opportunities
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-display text-3xl sm:text-4xl font-semibold text-accent">
              Global
            </span>
            <span className="font-body text-xs sm:text-sm text-ink-muted leading-snug">
              Cloud Certifications & Placement Pathways
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
