import type { Route } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Display } from "@/components/ui/typography";
import type { ContentLink, NamedEntity } from "@/lib/content";
import { ArrowUpRightIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { type SharedHeroSlide, SharedHeroSlider } from "./shared-hero-slider";

export type { SharedHeroSlide };

export type SharedHeroProps = {
  readonly entity: NamedEntity;
  readonly heroLabel: string;
  readonly slides: readonly SharedHeroSlide[];
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
  heading,
  headingClassName,
  standfirst,
  primaryCta,
  secondaryCta,
}: SharedHeroProps) {
  const externalPrimary = primaryCta.destination === "external";
  const externalSecondary = secondaryCta?.destination === "external";

  return (
    <section
      aria-label={entity.name}
      className="gutter-x section-y-masthead pt-10"
    >
      <div className="mx-auto max-w-page">
        <SharedHeroSlider
          className="flex flex-col justify-center rounded-3xl bg-neutral-950 p-5 sm:rounded-4xl sm:p-8 lg:px-10 xl:aspect-21/9"
          label={heroLabel}
          slides={slides}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-10 bg-neutral-950/10"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-neutral-950/85 via-neutral-950/45 to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-neutral-950/55 via-neutral-950/20 to-transparent"
          />

          <div className="relative z-20 flex flex-col items-start gap-5 sm:gap-6">
            <div className="flex w-full flex-col items-start gap-5 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
              <Display
                className={cn(
                  "min-w-0 animate-hero-fade text-balance text-5xl text-white [animation-delay:100ms] sm:text-6xl lg:text-7xl",
                  headingClassName,
                )}
              >
                {heading ?? entity.name}
              </Display>
            </div>

            <p className="max-w-xl animate-hero-fade font-body text-base text-pretty text-white/80 [animation-delay:200ms] sm:text-lg">
              {standfirst}
            </p>

            <div className="flex animate-hero-fade flex-wrap items-center gap-3 [animation-delay:300ms] sm:gap-4">
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
        </SharedHeroSlider>
      </div>
    </section>
  );
}
