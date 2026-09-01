import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { Icon } from "@/components/ui/icon";
import { Eyebrow, H2, P } from "@/components/ui/typography";
import { ArrowRightIcon } from "@/lib/icons";
import {
  A_LEVELS_CLUBS,
  type ALevelsClub,
} from "@/app/institutions/a-levels/_components/a-levels-clubs-copy";

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
            className="group inline-flex items-center gap-2 font-body text-xs font-semibold uppercase tracking-wider text-primary-700 hover:text-primary-900"
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
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-2xs transition-all duration-300 hover:-translate-y-1 hover:border-primary-300 hover:shadow-lg"
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

                <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    <h3 className="font-display text-base font-normal text-ink group-hover:text-primary-700 transition-colors">
                      {club.title}
                    </h3>
                    <P className="mt-2 line-clamp-2 font-body text-xs text-ink-muted">
                      {club.tagline}
                    </P>
                  </div>

                  <div className="mt-4 flex items-center gap-1.5 font-body text-xs font-semibold text-primary-700 group-hover:text-primary-800">
                    <span>View details</span>
                    <Icon
                      className="size-3 transition-transform group-hover:translate-x-1"
                      icon={ArrowRightIcon}
                    />
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
