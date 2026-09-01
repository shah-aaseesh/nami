import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { Icon } from "@/components/ui/icon";
import { H3, P } from "@/components/ui/typography";
import { ArrowRightIcon } from "@/lib/icons";
import { A_LEVELS_CLUBS } from "./a-levels-clubs-copy";

export function ALevelsClubsSection() {
  return (
    <section
      className="gutter-x section-y border-t border-border"
      id="eca-clubs"
    >
      <div className="mx-auto max-w-page">
        <SectionHeader
          description="Student-led clubs fostering community engagement, competitive sports, environmental stewardship, and artistic creativity."
          eyebrow="Extracurricular & Co-Curricular"
          layout="stacked"
          title="ECA / CLUBS"
        />

        <Reveal
          className="mt-8 sm:mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
          stagger={0.06}
          y={20}
        >
          {A_LEVELS_CLUBS.map((club) => {
            const clubHref =
              `/institutions/a-levels/clubs/${club.slug}` as Route;

            return (
              <RevealItem className="h-full" key={club.slug}>
                <Link
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-2xs transition-all duration-300 hover:-translate-y-1 hover:border-[#BD1B21]/50 hover:shadow-lg"
                  href={clubHref}
                >
                  {/* Card Cover Image */}
                  <div className="relative aspect-16/10 w-full overflow-hidden bg-neutral-900">
                    <Image
                      alt={club.coverImage.alt}
                      className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      height={club.coverImage.height}
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      src={club.coverImage.src}
                      width={club.coverImage.width}
                    />
                  </div>

                  {/* Card Content */}
                  <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
                    <div>
                      <H3
                        as="h3"
                        className="font-display text-lg font-normal text-ink transition-colors group-hover:text-[#BD1B21] sm:text-xl"
                      >
                        {club.title}
                      </H3>

                      <P className="mt-2 line-clamp-2 font-body text-xs text-ink-muted leading-relaxed sm:text-sm">
                        {club.tagline}
                      </P>
                    </div>

                    {/* Action link */}
                    <div className="mt-5 flex items-center justify-between border-t border-border/60 pt-3">
                      <span className="font-body text-xs font-semibold text-[#BD1B21] transition-colors group-hover:text-[#9e1419]">
                        Explore Club
                      </span>
                      <span className="flex size-7 items-center justify-center rounded-full bg-[#BD1B21]/10 text-[#BD1B21] transition-all duration-200 group-hover:bg-[#BD1B21] group-hover:text-white group-hover:translate-x-1">
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
