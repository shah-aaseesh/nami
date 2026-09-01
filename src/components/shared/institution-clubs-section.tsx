import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { SCHOOL_CLUBS } from "@/app/institutions/school/_components/school-clubs-copy";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { Icon } from "@/components/ui/icon";
import { H3, P } from "@/components/ui/typography";
import { ArrowRightIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

const CARD_GRID_LAYOUT: Record<number, string> = {
  0: "lg:col-span-6",
  1: "lg:col-span-6",
  2: "lg:col-span-4",
  3: "lg:col-span-4",
  4: "lg:col-span-4",
};

export type InstitutionClubsTone = "brand" | "surface";

export function InstitutionClubsSection({
  tone = "surface",
  className,
}: {
  readonly tone?: InstitutionClubsTone;
  readonly className?: string;
}) {
  return (
    <section
      className={cn(
        "gutter-x section-y",
        tone === "brand" ? "bg-muted/40" : "bg-muted/30",
        className,
      )}
      id="eca-clubs"
    >
      <div className="mx-auto max-w-page">
        <SectionHeader
          description="Five vibrant student-led clubs nurturing physical vitality, creative expression, leadership, social empathy, and scientific inquiry."
          eyebrow="Extracurricular & Co-Curricular"
          layout="stacked"
          title="ECA / CLUBS"
        />

        <Reveal
          className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-12 lg:gap-6"
          stagger={0.06}
          y={20}
        >
          {SCHOOL_CLUBS.map((club, index) => {
            const clubHref = `/institutions/school/clubs/${club.slug}` as Route;
            const gridColClass = CARD_GRID_LAYOUT[index] ?? "lg:col-span-4";
            const isTopRow = index < 2;

            return (
              <RevealItem
                className={cn("h-full", gridColClass)}
                key={club.slug}
              >
                <Link
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-2xs transition-all duration-300 hover:-translate-y-1 hover:border-primary-300 hover:shadow-lg"
                  href={clubHref}
                >
                  {/* Card Cover Image - Compact & proportional */}
                  <div
                    className={cn(
                      "relative w-full overflow-hidden bg-neutral-900",
                      isTopRow
                        ? "aspect-16/9 sm:aspect-2/1 lg:aspect-21/9"
                        : "aspect-16/9 sm:aspect-16/10",
                    )}
                  >
                    <Image
                      alt={club.coverImage.alt}
                      className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      height={club.coverImage.height}
                      sizes={
                        isTopRow
                          ? "(min-width: 1024px) 50vw, 100vw"
                          : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      }
                      src={club.coverImage.src}
                      width={club.coverImage.width}
                    />
                  </div>

                  {/* Card Content */}
                  <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
                    <div>
                      <H3
                        as="h3"
                        className="font-display text-lg font-normal text-ink transition-colors group-hover:text-primary-700 sm:text-xl"
                      >
                        {club.title}
                      </H3>

                      <P className="mt-2 line-clamp-2 font-body text-xs text-ink-muted leading-relaxed sm:text-sm">
                        {club.tagline}
                      </P>
                    </div>

                    {/* Action link */}
                    <div className="mt-5 flex items-center justify-between border-t border-border/60 pt-3">
                      <span className="font-body text-xs font-semibold text-primary-700 transition-colors group-hover:text-primary-800">
                        Explore Club
                      </span>
                      <span className="flex size-7 items-center justify-center rounded-full bg-primary-50 text-primary-700 transition-all duration-200 group-hover:bg-primary-700 group-hover:text-white group-hover:translate-x-1">
                        <Icon className="size-3.5" icon={ArrowRightIcon} />
                      </span>
                    </div>
                  </div>
                </Link>
              </RevealItem>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
