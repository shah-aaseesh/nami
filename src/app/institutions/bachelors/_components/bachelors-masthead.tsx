import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { Parallax } from "@/components/motion/parallax";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Eyebrow, Standfirst } from "@/components/ui/typography";
import type {
  Campus,
  ContentImage,
  ContentLink,
  NamedEntity,
} from "@/lib/content";
import { ArrowRightIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

export type BachelorsPartnership = {
  readonly body: string;
  readonly sinceYear: number;
};

export type BachelorsIncomingPartner = {
  readonly body: string;
  readonly scope: string;
  readonly status: string;
};

export type BachelorsMastheadCopy = {
  readonly motto: string;
  readonly heading: string;
  readonly standfirst: string;
  readonly cta: ContentLink;
  readonly awardedLabel: string;
  readonly awardedPlace: string;
  readonly incoming: BachelorsIncomingPartner | null;
  readonly taughtLabel: string;
  readonly sinceLabel: string;
};

export function BachelorsMasthead({
  campus,
  copy,
  entity,
  image,
  partnership,
}: {
  readonly campus: Campus | null;
  readonly copy: BachelorsMastheadCopy;
  readonly entity: NamedEntity;
  readonly image: ContentImage | null;
  readonly partnership: BachelorsPartnership | null;
}) {
  const external = copy.cta.destination === "external";

  return (
    <section className="gutter-x section-y-masthead">
      <div className="mx-auto max-w-page">
        <Reveal atFold className="flex flex-wrap items-center gap-x-5 gap-y-3">
          <Eyebrow>{entity.name}</Eyebrow>
          <span className="hidden h-px flex-1 bg-border sm:block" />
          <Eyebrow className="text-ink-muted">{copy.motto}</Eyebrow>
        </Reveal>

        <SplitText
          as="h1"
          atFold
          className="mt-8 font-display text-6xl font-normal text-balance text-ink lg:mt-10 lg:text-8xl"
        >
          {copy.heading}
        </SplitText>

        <div className="mt-10 flex flex-col gap-10 lg:mt-16 lg:grid lg:grid-cols-12 lg:items-end lg:gap-x-10">
          <Reveal atFold className="max-w-xl lg:col-span-6" delay={0.15}>
            <Standfirst>{copy.standfirst}</Standfirst>
          </Reveal>

          <Reveal atFold className="lg:col-span-4 lg:col-start-9" delay={0.25}>
            <Link
              className={cn(
                buttonVariants({ size: "lg" }),
                "w-full justify-center gap-2 rounded-full px-6 sm:w-auto",
              )}
              href={copy.cta.href as Route}
              rel={external ? "noopener noreferrer" : undefined}
              target={external ? "_blank" : undefined}
            >
              <span>{copy.cta.label}</span>
              <Icon className="size-4" icon={ArrowRightIcon} />
            </Link>
          </Reveal>
        </div>
      </div>

      {partnership === null || campus === null ? null : (
        <Reveal atFold className="bleed-x mt-14 lg:mt-20" delay={0.3}>
          <div className="gutter-x border-y border-border bg-surface-raised py-10 lg:py-14">
            <div className="mx-auto grid max-w-page gap-8 lg:grid-cols-12 lg:items-start lg:gap-x-10">
              <div className="lg:col-span-7">
                <Eyebrow>{copy.awardedLabel}</Eyebrow>
                <p className="mt-4 font-display text-3xl text-balance text-ink lg:text-4xl">
                  {partnership.body}
                </p>
                <p className="mt-2 font-body text-sm text-pretty text-ink-muted">
                  {`${copy.awardedPlace} · ${copy.sinceLabel} ${partnership.sinceYear}`}
                </p>

                {copy.incoming === null ? null : (
                  <div className="mt-8 border-t border-border pt-5">
                    <p className="font-display text-2xl text-balance text-ink lg:text-3xl">
                      {copy.incoming.body}
                    </p>
                    <p className="mt-2 font-body text-sm text-pretty text-ink-muted">
                      {copy.incoming.scope}
                    </p>
                    <Eyebrow className="mt-3">{copy.incoming.status}</Eyebrow>
                  </div>
                )}
              </div>

              <div className="flex items-center lg:col-span-1 lg:justify-center">
                <Icon
                  className="size-5 shrink-0 rotate-90 text-accent lg:rotate-0"
                  icon={ArrowRightIcon}
                />
              </div>

              <div className="lg:col-span-4 lg:text-end">
                <Eyebrow>{copy.taughtLabel}</Eyebrow>
                <p className="mt-4 font-display text-3xl text-balance text-ink lg:text-4xl">
                  {entity.shortName}
                </p>
                <p className="mt-2 font-body text-sm text-ink-muted">
                  {`${campus.locality}, ${campus.city}`}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      )}

      {image === null ? null : (
        <Parallax className="bleed-x mt-14 lg:mt-20" speed={1.06}>
          <Image
            alt={image.alt}
            className="h-[38vh] w-full object-cover sm:h-[46vh] lg:h-[60vh]"
            height={image.height}
            priority
            sizes="100vw"
            src={image.src}
            width={image.width}
          />
        </Parallax>
      )}
    </section>
  );
}
