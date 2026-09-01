import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  A_LEVELS_CLUBS,
  type ALevelsClub,
} from "@/app/institutions/a-levels/_components/a-levels-clubs-copy";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { Icon } from "@/components/ui/icon";
import { Eyebrow, H2, H3, P } from "@/components/ui/typography";
import { ArrowRightIcon } from "@/lib/icons";

export function ClubOtherRail({
  currentClub,
}: {
  readonly currentClub: ALevelsClub;
}) {
  const otherClubs = A_LEVELS_CLUBS.filter(
    (club) => club.slug !== currentClub.slug,
  );

  return (
    <section className="gutter-x section-y bg-surface border-t border-border">
      <div className="mx-auto max-w-page">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <Eyebrow>More Co-Curriculars</Eyebrow>
            <H2 className="mt-2">Explore Other A-Level Clubs</H2>
          </div>
          <Link
            className="group inline-flex items-center gap-2 font-body text-xs font-semibold uppercase tracking-wider text-[#BD1B21] hover:text-[#9e1419]"
            href={"/institutions/a-levels#eca-clubs" as Route}
          >
            <span>All ECA & Clubs</span>
            <Icon
              className="size-3.5 transition-transform group-hover:translate-x-1"
              icon={ArrowRightIcon}
            />
          </Link>
        </div>

        <Reveal
          className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.06}
          y={20}
        >
          {otherClubs.map((club) => (
            <RevealItem className="h-full" key={club.slug}>
              <Link
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-2xs transition-all duration-300 hover:-translate-y-1 hover:border-[#BD1B21]/50 hover:shadow-lg"
                href={`/institutions/a-levels/clubs/${club.slug}` as Route}
              >
                <div className="relative aspect-16/10 w-full overflow-hidden bg-neutral-900">
                  <Image
                    alt={club.coverImage.alt}
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                    height={club.coverImage.height}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    src={club.coverImage.src}
                    width={club.coverImage.width}
                  />
                </div>

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
          ))}
        </Reveal>
      </div>
    </section>
  );
}
