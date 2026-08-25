import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { H3 } from "@/components/ui/typography";
import type {
  ContentLink,
  EntityRole,
  NamedEntity,
  SocialProfile,
} from "@/lib/content";
import { ArrowUpRightIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { HeroBadge } from "./hero-badge";
import { type SharedHeroSlide, SharedHeroSlider } from "./shared-hero-slider";

export type { SharedHeroSlide };

const PLACEHOLDER_INSTITUTION_LOGO = "/logo/nami-color.svg";
const LOGO_MARK_SIZE = 1000;

const INSTITUTION_LOGO: Readonly<Record<EntityRole, string>> = {
  college: PLACEHOLDER_INSTITUTION_LOGO,
  institute: PLACEHOLDER_INSTITUTION_LOGO,
  school: PLACEHOLDER_INSTITUTION_LOGO,
};

export type SharedHeroProps = {
  readonly entity: NamedEntity;
  readonly heroLabel: string;
  readonly slides: readonly SharedHeroSlide[];
  readonly heading?: string;
  readonly standfirst: string;
  readonly primaryCta: ContentLink;
  readonly secondaryCta?: ContentLink;
  readonly motto?: string;
  readonly watch?: SocialProfile | null;
  readonly customBadgeRing?: string;
};

export function SharedHero({
  entity,
  heroLabel,
  slides,
  heading,
  standfirst,
  primaryCta,
  secondaryCta,
  motto,
  watch = null,
  customBadgeRing,
}: SharedHeroProps) {
  const externalPrimary = primaryCta.destination === "external";
  const externalSecondary = secondaryCta?.destination === "external";

  const badgeElement = (
    <HeroBadge
      customRing={customBadgeRing}
      entity={entity}
      motto={motto}
      watch={watch}
    />
  );

  return (
    <section
      aria-label={entity.name}
      className="gutter-x section-y-masthead pt-10"
    >
      <div className="mx-auto max-w-page">
        <SharedHeroSlider
          badge={badgeElement}
          className="flex min-h-96 flex-col justify-between gap-6 rounded-3xl bg-neutral-950 p-5 sm:min-h-100 sm:rounded-4xl sm:p-8 lg:px-10 xl:aspect-21/9"
          label={heroLabel}
          slides={slides}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-neutral-950/50 via-neutral-950/10 to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-tr from-neutral-950/40 via-neutral-950/5 to-transparent"
          />

          <div className="relative z-20 flex animate-hero-fade justify-end">
            <Image
              alt=""
              className="h-16 w-auto sm:h-24 md:h-28"
              height={LOGO_MARK_SIZE}
              loading="eager"
              sizes="(min-width: 640px) 96px, 64px"
              src={INSTITUTION_LOGO[entity.role]}
              width={LOGO_MARK_SIZE}
            />
          </div>

          <div className="relative z-20 flex max-w-2xl flex-col items-start gap-4 sm:gap-5">
            <H3
              as="h1"
              className="animate-hero-fade text-white [animation-delay:100ms]"
            >
              {heading ?? entity.name}
            </H3>

            <p className="max-w-xl animate-hero-fade font-body text-lg text-pretty text-white/80 [animation-delay:200ms]">
              {standfirst}
            </p>

            <div className="flex animate-hero-fade flex-wrap items-center gap-3 [animation-delay:300ms] sm:gap-4">
              <Link
                className={cn(buttonVariants({ size: "lg" }), "gap-2 px-6")}
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
                    "gap-2 border-white/35 px-6 text-white backdrop-blur hover:bg-white/15 hover:text-white",
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
