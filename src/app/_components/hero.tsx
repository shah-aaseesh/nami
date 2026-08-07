import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { Parallax } from "@/components/motion/parallax";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Eyebrow, Standfirst } from "@/components/ui/typography";
import type {
  ContentLink,
  NamedEntity,
  SocialPlatform,
  SocialProfile,
} from "@/lib/content";
import { content } from "@/lib/content";
import type { IconSvgElement } from "@/lib/icons";
import {
  ArrowUpRightIcon,
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  MortarboardIcon,
  TwitterIcon,
  YouTubeIcon,
} from "@/lib/icons";
import { cn } from "@/lib/utils";
import { HeroHeadline } from "./hero-headline";

const SOCIAL_GLYPHS: Record<SocialPlatform, IconSvgElement> = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  linkedin: LinkedInIcon,
  twitter: TwitterIcon,
  youtube: YouTubeIcon,
};

const BADGE_RADIUS = 66;
const BADGE_ARC = `M 80,80 m 0,-${BADGE_RADIUS} a ${BADGE_RADIUS},${BADGE_RADIUS} 0 1,1 0,${BADGE_RADIUS * 2} a ${BADGE_RADIUS},${BADGE_RADIUS} 0 1,1 0,-${BADGE_RADIUS * 2}`;
const MARK_SRC = "/logo.png";
const MARK_WIDTH = 176;
const MARK_HEIGHT = 132;

function leadClause(sentence: string): string {
  const splitAt = sentence.indexOf(", ");
  return splitAt === -1 ? sentence : sentence.slice(0, splitAt);
}

function HeroCta({
  link,
  variant,
}: {
  link: ContentLink;
  variant: "default" | "link";
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
      {variant === "link" ? <Icon icon={ArrowUpRightIcon} /> : null}
    </Link>
  );
}

function HeroRail({
  lines,
  profiles,
}: {
  lines: readonly string[];
  profiles: readonly SocialProfile[];
}) {
  return (
    <div className="absolute inset-y-0 left-0 hidden w-6 flex-col items-center justify-between pb-6 pt-2 lg:flex">
      <div className="flex flex-col items-center gap-6">
        <span className="h-16 w-px bg-border" />
        {lines.map((line) => (
          <p
            className="rotate-180 font-body text-xs tracking-widest text-ink-muted uppercase [writing-mode:vertical-rl]"
            key={line}
          >
            {line}
          </p>
        ))}
      </div>

      {profiles.length === 0 ? null : (
        <div className="flex flex-col items-center gap-6">
          <ul className="flex flex-col items-center gap-5">
            {profiles.map((profile) => (
              <li key={profile.platform}>
                <Link
                  className="block text-ink-muted transition-colors hover:text-accent"
                  href={profile.href as Route}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Icon icon={SOCIAL_GLYPHS[profile.platform]} />
                  <span className="sr-only">{profile.label}</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="rotate-180 font-body text-xs tracking-widest text-ink-muted uppercase [writing-mode:vertical-rl]">
            Follow
          </p>
        </div>
      )}
    </div>
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
  const ring = [entity.name, founded, leadClause(motto)]
    .filter((part) => part !== null)
    .join(" * ");

  return (
    <div className="relative size-32 shrink-0 lg:size-36">
      <svg
        aria-label={ring.replaceAll(" * ", ", ")}
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
            {`${ring} * `}
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
            sizes="96px"
            src={MARK_SRC}
            width={MARK_WIDTH}
          />
          <span className="sr-only">{`Watch ${entity.name} on ${watch.label}`}</span>
        </Link>
      )}
    </div>
  );
}

function HeroSocials({
  className,
  profiles,
}: {
  className?: string;
  profiles: readonly SocialProfile[];
}) {
  return (
    <div className={cn("flex items-center gap-6", className)}>
      <ul className="flex flex-col items-center gap-5">
        {profiles.map((profile) => (
          <li key={profile.platform}>
            <Link
              className="block text-ink-muted transition-colors hover:text-accent"
              href={profile.href as Route}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Icon icon={SOCIAL_GLYPHS[profile.platform]} />
              <span className="sr-only">{profile.label}</span>
            </Link>
          </li>
        ))}
      </ul>
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

  const railLines = institution.campuses.map((campus) => campus.locality);

  return (
    <section className="relative isolate gutter-x section-y" id="hero">
      <div className="relative mx-auto max-w-page lg:ps-14">
        {railLines.length === 0 ? null : (
          <HeroRail lines={railLines} profiles={socials} />
        )}

        <Reveal atFold className="flex items-center gap-4">
          <Icon className="size-6 text-accent" icon={MortarboardIcon} />
          <Eyebrow>{hero.eyebrow}</Eyebrow>
        </Reveal>

        <div className="mt-8 lg:mt-12 lg:grid lg:grid-cols-12 lg:gap-x-10">
          <HeroHeadline className="lg:col-span-7" lead={lead} tail={tail} />

          <Reveal
            atFold
            className="mt-12 flex flex-col items-start gap-8 lg:col-span-4 lg:col-start-9 lg:mt-0"
            delay={0.25}
            stagger={0.08}
          >
            <RevealItem>
              <Standfirst>{hero.standfirst}</Standfirst>
            </RevealItem>
            <RevealItem className="flex flex-wrap items-center gap-x-8 gap-y-4">
              <HeroCta link={hero.primaryCta} variant="default" />
              <HeroCta link={hero.secondaryCta} variant="link" />
            </RevealItem>
          </Reveal>
        </div>

        <div className="mt-16 lg:mt-24 lg:grid lg:grid-cols-12 lg:gap-x-10">
          <Reveal
            atFold
            className="relative flex items-center justify-center lg:col-span-2 lg:flex-col lg:items-start lg:gap-12"
            delay={0.5}
          >
            <HeroBadge
              entity={institution.entities.college}
              motto={institution.motto}
              watch={watch ?? null}
            />
            {socials.length === 0 ? null : (
              <HeroSocials
                className="absolute left-0 top-1/2 -translate-y-1/2 flex-col lg:hidden"
                profiles={socials}
              />
            )}
          </Reveal>

          {hero.image === null ? null : (
            <figure className="mt-12 lg:col-span-10 lg:col-start-3 lg:mt-0">
              <div className="relative aspect-video overflow-hidden rounded-xl lg:aspect-[2/1]">
                <Parallax className="absolute inset-0" speed={0.94}>
                  <Image
                    alt={hero.image.alt}
                    className="scale-110 object-cover"
                    fill
                    preload
                    sizes="(min-width: 1024px) 75vw, 92vw"
                    src={hero.image.src}
                  />
                </Parallax>
              </div>
            </figure>
          )}
        </div>
      </div>
    </section>
  );
}
