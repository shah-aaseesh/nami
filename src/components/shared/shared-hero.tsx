import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Display } from "@/components/ui/typography";
import type { ContentImage, ContentLink, NamedEntity } from "@/lib/content";
import { ArrowUpRightIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { type SharedHeroSlide, SharedHeroSlider } from "./shared-hero-slider";

export type { SharedHeroSlide };

export type SharedHeroProps = {
  readonly entity: NamedEntity;
  readonly heroLabel: string;
  readonly slides: readonly SharedHeroSlide[];
  readonly logo?: ContentImage;
  readonly badgeText?: string;
  readonly heading?: string;
  readonly headingClassName?: string;
  readonly standfirst: string;
  readonly primaryCta: ContentLink;
  readonly secondaryCta?: ContentLink;
};

export function SharedHero({
  entity,
  heroLabel,
  slides,
  logo,
  badgeText,
  heading,
  headingClassName,
  standfirst,
  primaryCta,
  secondaryCta,
}: SharedHeroProps) {
  const displayHeading = heading ?? entity.name;
  const [lead = displayHeading, ...tail] = displayHeading.split(" ");
  const rest = tail.join(" ");

  const externalPrimary = primaryCta.destination === "external";
  const externalSecondary = secondaryCta?.destination === "external";

  return (
    <section
      aria-label={entity.name}
      className="gutter-x section-y-masthead pt-10"
    >
      <div className="mx-auto max-w-page">
        <div className="relative isolate flex flex-col justify-between gap-6 overflow-hidden rounded-3xl bg-neutral-950 p-5 pb-20 sm:rounded-4xl sm:p-8 sm:pb-24 lg:px-10 xl:aspect-21/9 xl:gap-0">
          <SharedHeroSlider label={heroLabel} slides={slides} />

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

          <div className="relative z-20 animate-hero-fade self-start motion-reduce:animate-none">
            {logo ? (
              <span className="inline-flex items-center rounded-2xl bg-white px-6 py-3 shadow-lg shadow-neutral-950/20">
                <Image
                  alt=""
                  className="h-7 w-auto sm:h-8"
                  height={logo.height}
                  sizes="84px"
                  src={logo.src}
                  width={logo.width}
                />
                <span className="sr-only">{entity.name}</span>
              </span>
            ) : (
              <span className="inline-flex items-center rounded-full bg-white/10 backdrop-blur-md px-5 py-2.5 border border-white/20 shadow-lg shadow-neutral-950/20">
                <span className="font-body text-xs font-medium tracking-widest text-white uppercase sm:text-sm">
                  {badgeText ?? entity.name}
                </span>
              </span>
            )}
          </div>

          <div className="relative z-20 flex flex-col items-start gap-5 sm:gap-6">
            <Display
              className={cn(
                "animate-hero-fade text-5xl text-white [animation-delay:100ms] motion-reduce:animate-none sm:text-6xl lg:text-7xl",
                headingClassName,
              )}
            >
              <span className="block">{lead}</span>
              {rest === "" ? null : (
                <span className="block text-primary-200">{rest}</span>
              )}
            </Display>

            <p className="max-w-xl animate-hero-fade font-body text-base text-pretty text-white/80 [animation-delay:200ms] motion-reduce:animate-none sm:text-lg">
              {standfirst}
            </p>

            <div className="flex animate-hero-fade flex-wrap items-center gap-3 [animation-delay:300ms] motion-reduce:animate-none sm:gap-4">
              <Link
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "gap-2 rounded-full px-6",
                )}
                href={primaryCta.href as Route}
                rel={externalPrimary ? "noopener noreferrer" : undefined}
                target={externalPrimary ? "_blank" : undefined}
              >
                {primaryCta.label}
                {externalPrimary && (
                  <Icon className="size-4" icon={ArrowUpRightIcon} />
                )}
              </Link>
              {secondaryCta && (
                <Link
                  className={cn(
                    buttonVariants({ size: "lg", variant: "outline" }),
                    "gap-2 rounded-full border-white/35 px-6 text-white backdrop-blur hover:bg-white/15 hover:text-white",
                  )}
                  href={secondaryCta.href as Route}
                  rel={externalSecondary ? "noopener noreferrer" : undefined}
                  target={externalSecondary ? "_blank" : undefined}
                >
                  {secondaryCta.label}
                  {externalSecondary && (
                    <Icon className="size-4" icon={ArrowUpRightIcon} />
                  )}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
