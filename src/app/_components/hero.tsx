import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { Parallax } from "@/components/motion/parallax";
import { buttonVariants } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from "@/components/ui/carousel";
import { Icon } from "@/components/ui/icon";
import { Eyebrow, Standfirst } from "@/components/ui/typography";
import type { ContentLink, NamedEntity, SocialProfile } from "@/lib/content";
import { content } from "@/lib/content";
import { ArrowUpRightIcon, MortarboardIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { HeroBadgePin } from "./hero-badge-pin";
import { HeroHeadline } from "./hero-headline";

const BADGE_RADIUS = 66;
const BADGE_ARC = `M 80,80 m 0,-${BADGE_RADIUS} a ${BADGE_RADIUS},${BADGE_RADIUS} 0 1,1 0,${BADGE_RADIUS * 2} a ${BADGE_RADIUS},${BADGE_RADIUS} 0 1,1 0,-${BADGE_RADIUS * 2}`;
const MARK_SRC = "/logo/nami-color.svg";
const MARK_WIDTH = 200;
const MARK_HEIGHT = 200;

function leadClause(sentence: string): string {
  const splitAt = sentence.indexOf(", ");
  return splitAt === -1 ? sentence : sentence.slice(0, splitAt);
}

function HeroCta({
  link,
  variant,
}: {
  link: ContentLink;
  variant: "default" | "outline";
}) {
  if (link.destination === "legacy") return null;

  const isExternal = link.destination === "external";

  return (
    <Link
      className={cn(buttonVariants({ size: "lg", variant }))}
      href={link.href as Route}
      rel={isExternal ? "noopener noreferrer" : undefined}
      target={isExternal ? "_blank" : undefined}
    >
      {link.label}
      {variant === "outline" ? <Icon icon={ArrowUpRightIcon} /> : null}
    </Link>
  );
}

function HeroBadge({
  entity,
  motto,
  watch,
}: {
  entity: NamedEntity;
  motto: string;
  watch: SocialProfile | null;
}) {
  const founded =
    entity.establishedYear === null ? null : `Estd. ${entity.establishedYear}`;
  const ringParts = [entity.shortName, founded, leadClause(motto)].filter(
    (part) => part !== null,
  );
  const ring = ringParts.join(" * ");
  const accessibleLabelParts = [entity.name, founded, leadClause(motto)].filter(
    (part) => part !== null,
  );
  const accessibleLabel = accessibleLabelParts.join(", ");

  return (
    <div className="relative size-32 shrink-0 lg:size-36">
      <svg
        aria-label={accessibleLabel}
        className="size-full animate-[spin_20s_linear_infinite]"
        role="img"
        viewBox="0 0 160 160"
      >
        <defs>
          <path d={BADGE_ARC} fill="none" id="hero-badge-arc" />
        </defs>
        <text
          className="fill-ink-muted font-display font-bold text-sm"
          fontSize="11"
          textLength={2 * Math.PI * BADGE_RADIUS}
        >
          <textPath href="#hero-badge-arc" lengthAdjust="spacing">
            {` ${ring} * `}
          </textPath>
        </text>
      </svg>
      {watch === null ? null : (
        <Link
          className="absolute inset-0 m-auto flex size-16 items-center justify-center rounded-full"
          href={watch.href as Route}
          rel="noopener noreferrer"
          target="_blank"
        >
          <Image
            alt=""
            className="h-12 w-auto"
            height={MARK_HEIGHT}
            sizes="48px"
            src={MARK_SRC}
            width={MARK_WIDTH}
          />
          <span className="sr-only">{`Watch ${entity.name} on ${watch.label}`}</span>
        </Link>
      )}
    </div>
  );
}

export async function Hero() {
  const [copy, institution] = await Promise.all([
    content.getHomeCopy(),
    content.getInstitution(),
  ]);

  const { hero } = copy;
  const socials = institution.contact.socialProfiles.filter(
    (profile) => profile.destination === "external",
  );
  const watch = socials.find((profile) => profile.platform === "youtube");

  const splitAt = hero.headline.indexOf(", ");
  const lead =
    splitAt === -1 ? hero.headline : hero.headline.slice(0, splitAt + 1);
  const tail = splitAt === -1 ? null : hero.headline.slice(splitAt + 2);

  const heroSlides = hero.images;

  return (
    <section className="relative isolate gutter-x section-y-hero" id="hero">
      <div className="relative mx-auto max-w-page">
        <div className="flex items-center gap-4">
          <Icon className="size-6 text-accent" icon={MortarboardIcon} />
          <Eyebrow>{hero.eyebrow}</Eyebrow>
        </div>

        <div className="mt-8 lg:mt-12 lg:grid lg:grid-cols-12 lg:gap-x-10">
          <HeroHeadline className="lg:col-span-7" lead={lead} tail={tail} />

          <div className="mt-12 flex flex-col items-start gap-8 lg:col-span-4 lg:col-start-9 lg:mt-0">
            <Standfirst>{hero.standfirst}</Standfirst>
            <div className="flex flex-wrap items-center gap-4">
              <HeroCta link={hero.primaryCta} variant="default" />
              <HeroCta link={hero.secondaryCta} variant="outline" />
            </div>
          </div>
        </div>

        <div className="mt-10 lg:mt-14 lg:grid lg:grid-cols-12 lg:gap-x-10">
          <HeroBadgePin className="lg:col-span-2">
            <div className="relative flex items-start justify-start lg:flex-col lg:items-start lg:justify-start">
              <HeroBadge
                entity={institution.entities.institute}
                motto={institution.motto}
                watch={watch ?? null}
              />
            </div>
          </HeroBadgePin>

          {heroSlides.length === 0 ? null : (
            <figure className="mt-6 lg:col-span-10 lg:col-start-3 lg:mt-0">
              <Carousel
                aria-label={hero.eyebrow}
                aria-roledescription="carousel"
                autoplay
                autoplayIntervalMs={3000}
                className="flex flex-col gap-6"
                opts={{ align: "start", duration: 20, loop: true }}
              >
                <CarouselContent
                  className="h-full"
                  viewportClassName="aspect-video rounded-xl lg:aspect-[5/2]"
                >
                  {heroSlides.map((slide, position) => (
                    <CarouselItem
                      className="relative overflow-hidden"
                      key={slide.src}
                    >
                      <Parallax className="absolute inset-0" speed={0.94}>
                        <Image
                          alt={slide.alt}
                          className="scale-110 object-cover"
                          fill
                          preload={position === 0}
                          sizes="(min-width: 1024px) 74vw, 92vw"
                          src={slide.src}
                        />
                      </Parallax>
                    </CarouselItem>
                  ))}
                </CarouselContent>

                <CarouselDots className="justify-end" dotLabel="Go to image" />
              </Carousel>
            </figure>
          )}
        </div>
      </div>
    </section>
  );
}
