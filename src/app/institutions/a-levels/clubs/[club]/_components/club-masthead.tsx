import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ALevelsClub } from "@/app/institutions/a-levels/_components/a-levels-clubs-copy";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Icon } from "@/components/ui/icon";
import { Eyebrow, Standfirst } from "@/components/ui/typography";
import { ArrowLeftIcon } from "@/lib/icons";

const COVER_SIZES = "(min-width: 1024px) 1200px, 100vw";

export function ClubMasthead({ club }: { readonly club: ALevelsClub }) {
  return (
    <section className="gutter-x section-y-masthead">
      <div className="mx-auto max-w-page">
        {/* Navigation / Back link */}
        <Reveal>
          <div className="mb-8 flex items-center gap-2">
            <Link
              className="group inline-flex items-center gap-2 font-body text-xs font-semibold uppercase tracking-wider text-ink-muted transition-colors hover:text-primary-700"
              href={"/institutions/a-levels" as Route}
            >
              <Icon
                className="size-3.5 transition-transform group-hover:-translate-x-1"
                icon={ArrowLeftIcon}
              />
              <span>Back to NAMI College (A-Levels)</span>
            </Link>
          </div>
        </Reveal>

        {/* Header content */}
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-10">
          <Reveal className="lg:col-span-7" stagger={0.08}>
            <RevealItem>
              <span className="inline-block rounded-full bg-[#BD1B21]/10 text-[#BD1B21] border border-[#BD1B21]/20 px-3.5 py-1 font-body text-xs font-semibold">
                {club.category}
              </span>
            </RevealItem>
            <SplitText
              as="h1"
              className="mt-4 font-display text-4xl font-normal text-balance text-ink sm:text-5xl md:text-6xl"
            >
              {club.title}
            </SplitText>
          </Reveal>

          <Reveal className="mt-6 max-w-xl lg:col-span-5 lg:mt-0 lg:self-end">
            <Standfirst>{club.tagline}</Standfirst>
          </Reveal>
        </div>

        {/* Key Info Facts Grid */}
        <dl className="mt-12 grid grid-cols-1 gap-6 border-t border-border pt-8 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:pt-10">
          <div>
            <Eyebrow as="dt" className="text-ink-muted">
              Meeting Schedule
            </Eyebrow>
            <dd className="mt-2 font-display text-lg font-normal text-ink">
              {club.meetingSchedule}
            </dd>
          </div>
          <div>
            <Eyebrow as="dt" className="text-ink-muted">
              Eligibility
            </Eyebrow>
            <dd className="mt-2 font-display text-lg font-normal text-ink">
              {club.eligibility}
            </dd>
          </div>
          <div>
            <Eyebrow as="dt" className="text-ink-muted">
              Faculty Mentor
            </Eyebrow>
            <dd className="mt-2 font-display text-lg font-normal text-ink">
              {club.facultyMentor}
            </dd>
          </div>
          <div>
            <Eyebrow as="dt" className="text-ink-muted">
              Programme
            </Eyebrow>
            <dd className="mt-2 font-display text-lg font-normal text-ink">
              Cambridge A-Levels (AS & A2)
            </dd>
          </div>
        </dl>

        {/* Hero Cover Image */}
        <figure className="mt-12 overflow-hidden rounded-3xl bg-neutral-900 shadow-xl lg:mt-16">
          <Image
            alt={club.coverImage.alt}
            className="aspect-16/9 w-full object-cover sm:aspect-21/9"
            fetchPriority="high"
            height={club.coverImage.height}
            loading="eager"
            sizes={COVER_SIZES}
            src={club.coverImage.src}
            width={club.coverImage.width}
          />
        </figure>
      </div>
    </section>
  );
}
