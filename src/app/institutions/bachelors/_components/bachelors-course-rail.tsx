"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeader } from "@/components/shared/section-header";
import {
  Carousel,
  CarouselContent,
  CarouselControls,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Eyebrow, H4 } from "@/components/ui/typography";
import type {
  BachelorsProgramme,
  BachelorsProgrammesCopy,
} from "./bachelors-copy";

const CARD_SIZES =
  "(min-width: 1280px) 350px, (min-width: 1024px) 340px, (min-width: 640px) 310px, 78vw";

function CourseCard({
  copy,
  course,
}: {
  readonly copy: BachelorsProgrammesCopy;
  readonly course: BachelorsProgramme;
}) {
  const description = course.shortDescription ?? course.summary[0] ?? null;

  return (
    <div className="group relative flex h-full min-h-[440px] sm:min-h-[460px] flex-col overflow-hidden rounded-2xl border border-border/80 bg-surface-raised transition-all duration-300 hover:border-primary-600 hover:shadow-lg hover:shadow-primary-950/5">
      {/* Top Content */}
      <div className="flex flex-1 flex-col gap-2.5 p-5 sm:p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <Eyebrow as="span">{course.qualification}</Eyebrow>

          {course.startingFrom === null ? null : (
            <Eyebrow as="span" className="text-ink-muted">
              {`${copy.startingLabel} ${course.startingFrom}`}
            </Eyebrow>
          )}
        </div>

        <H4 as="h3" className="text-ink">
          <Link
            className="transition-colors after:absolute after:inset-0 group-hover:text-accent"
            href={`/institutions/bachelors/${course.key}`}
          >
            {course.title}
          </Link>
        </H4>

        {description && (
          <p className="line-clamp-3 text-xs sm:text-sm text-ink-muted leading-relaxed">
            {description}
          </p>
        )}

        {/* Compact Awarding Line */}
        <p className="mt-auto border-t border-border/70 pt-3 text-xs text-ink">
          <span className="text-ink-muted">{`${copy.awardedLabel} `}</span>
          <span className="font-medium text-ink">{course.awardingBody}</span>
        </p>
      </div>

      {/* Bottom Media Plate - taller proportion for longer card */}
      <div className="relative aspect-[16/11] w-full overflow-hidden bg-muted">
        <Image
          alt={course.image.alt}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          fill
          loading="lazy"
          sizes={CARD_SIZES}
          src={course.image.src}
        />
      </div>
    </div>
  );
}

export function BachelorsCourseRail({
  copy,
  id,
}: {
  readonly copy: BachelorsProgrammesCopy;
  readonly id?: string;
}) {
  const total = copy.items.length;

  if (total === 0) return null;

  // Clone items if less than 8 so Embla loop engine has enough slides to loop continuously
  const displayItems =
    total > 1 && total < 8
      ? [
          ...copy.items.map((c) => ({ ...c, itemKey: `${c.key}-1` })),
          ...copy.items.map((c) => ({ ...c, itemKey: `${c.key}-2` })),
        ]
      : copy.items.map((c) => ({ ...c, itemKey: c.key }));

  return (
    <section className="gutter-x section-y" id={id}>
      <Carousel
        aria-label={copy.heading}
        aria-roledescription="carousel"
        autoplay={true}
        autoplayIntervalMs={2800}
        opts={{
          align: "start",
          duration: 35,
          loop: true,
          slidesToScroll: 1,
        }}
        pauseOnHover={true}
      >
        <div className="mx-auto max-w-page">
          <SectionHeader
            action={
              <CarouselControls className="ms-auto">
                <CarouselPrevious
                  aria-label="Previous programme"
                  className="size-9 sm:size-11 [&_svg]:size-4 sm:[&_svg]:size-5"
                />
                <CarouselNext
                  aria-label="Next programme"
                  className="size-9 sm:size-11 [&_svg]:size-4 sm:[&_svg]:size-5"
                />
              </CarouselControls>
            }
            description={copy.standfirst ?? undefined}
            eyebrow={copy.eyebrow}
            layout="action"
            title={copy.heading}
          />
        </div>

        <Reveal className="mx-auto mt-8 max-w-page sm:mt-10 lg:mt-12" y={24}>
          <CarouselContent className="-ms-4 sm:-ms-5 lg:-ms-6">
            {displayItems.map((course) => (
              <CarouselItem
                className="basis-[78vw] ps-4 sm:basis-[310px] sm:ps-5 md:basis-[330px] lg:basis-[340px] lg:ps-6 xl:basis-[350px]"
                key={course.itemKey}
              >
                <CourseCard copy={copy} course={course} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Reveal>
      </Carousel>
    </section>
  );
}
