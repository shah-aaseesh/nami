import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Display } from "@/components/ui/typography";
import type { ContentImage, ContentLink, NamedEntity } from "@/lib/content";
import { ArrowUpRightIcon, LocationIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { type SchoolHeroSlide, SchoolHeroSlider } from "./school-hero-slider";

export type { SchoolHeroSlide };

export type SchoolHeroCopy = {
  readonly eyebrow: string;
  readonly tagline: string;
  readonly heroLabel: string;
  readonly logo: ContentImage;
  readonly slides: readonly SchoolHeroSlide[];
  readonly admissionCta: ContentLink;
  readonly website: ContentLink;
};

export function SchoolHero({
  copy,
  entity,
}: {
  readonly copy: SchoolHeroCopy;
  readonly entity: NamedEntity;
}) {
  const [lead = entity.name, ...tail] = entity.name.split(" ");
  const rest = tail.join(" ");

  return (
    <section
      aria-label={entity.name}
      className="gutter-x section-y-masthead pt-10"
    >
      <div className="mx-auto max-w-page">
        <div className="relative isolate aspect-21/9  overflow-hidden rounded-3xl bg-neutral-950 sm:rounded-4xl">
          <SchoolHeroSlider label={copy.heroLabel} slides={copy.slides} />

          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-10 bg-neutral-950/10"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-neutral-950/85 via-neutral-950/45 to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-neutral-950/55 via-neutral-950/20 to-transparent"
          />

          <div className="absolute top-4 left-4 z-20 animate-hero-fade motion-reduce:animate-none sm:top-8 sm:left-8">
            <span className="inline-flex items-center rounded-full bg-white px-4 py-3 shadow-lg shadow-neutral-950/20">
              <Image
                alt=""
                className="h-7 w-auto sm:h-8"
                height={copy.logo.height}
                sizes="84px"
                src={copy.logo.src}
                width={copy.logo.width}
              />
              <span className="sr-only">{entity.name}</span>
            </span>
          </div>

          <div className="absolute inset-x-0 bottom-20 z-20 flex flex-col items-start gap-5 px-5 sm:bottom-24 sm:gap-6 sm:px-8 lg:px-10">
            <p className="flex animate-hero-fade items-center gap-2 font-body text-xs font-medium tracking-widest text-white/85 uppercase motion-reduce:animate-none">
              <Icon className="size-4 text-primary-300" icon={LocationIcon} />
              {copy.eyebrow}
            </p>

            <Display className="animate-hero-fade text-5xl text-white [animation-delay:100ms] motion-reduce:animate-none sm:text-6xl lg:text-7xl">
              <span className="block">{lead}</span>
              {rest === "" ? null : (
                <span className="block text-primary-200">{rest}</span>
              )}
            </Display>

            <p className="max-w-xl animate-hero-fade font-body text-base text-pretty text-white/80 [animation-delay:200ms] motion-reduce:animate-none sm:text-lg">
              {copy.tagline}
            </p>

            <div className="flex animate-hero-fade flex-wrap items-center gap-3 [animation-delay:300ms] motion-reduce:animate-none sm:gap-4">
              <Link
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "gap-2 rounded-full px-6",
                )}
                href={copy.admissionCta.href as Route}
              >
                {copy.admissionCta.label}
              </Link>
              <Link
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                  "gap-2 rounded-full border-white/35 bg-white/5 px-6 text-white backdrop-blur hover:bg-white/15 hover:text-white",
                )}
                href={copy.website.href as Route}
                rel="noopener noreferrer"
                target="_blank"
              >
                {copy.website.label}
                <Icon className="size-4" icon={ArrowUpRightIcon} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
