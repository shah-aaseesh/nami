import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Eyebrow, Standfirst } from "@/components/ui/typography";
import type { ContentImage, ContentLink } from "@/lib/content";
import { ArrowUpRightIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

export type PartnershipPoint = {
  readonly term: string;
  readonly detail: string;
};

export type PartnershipSide = {
  readonly key: string;
  readonly kicker: string;
  readonly title: string;
  readonly place: string;
  readonly points: readonly PartnershipPoint[];
};

export type BachelorsNorthamptonCopy = {
  readonly eyebrow: string;
  readonly sinceLabel: string;
  readonly heading: string;
  readonly standfirst: string;
  readonly logo: ContentImage;
  readonly sides: readonly PartnershipSide[];
  readonly cta: ContentLink;
};

export function BachelorsNorthampton({
  copy,
  sinceYear,
}: {
  readonly copy: BachelorsNorthamptonCopy;
  readonly sinceYear: number | null;
}) {
  return (
    <section className="gutter-x section-y" id="northampton">
      <div className="mx-auto max-w-page">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-7">
            <Reveal className="flex items-center gap-5">
              <Eyebrow>{copy.eyebrow}</Eyebrow>
              <span className="h-px flex-1 bg-border" />
              {sinceYear === null ? null : (
                <Eyebrow className="text-ink-muted">
                  {`${copy.sinceLabel} ${sinceYear}`}
                </Eyebrow>
              )}
            </Reveal>

            <SplitText
              as="h2"
              className="mt-6 font-display text-5xl font-normal text-balance text-ink lg:mt-8 lg:text-6xl"
            >
              {copy.heading}
            </SplitText>
          </div>

          <Reveal
            className="mt-8 max-w-xl lg:col-span-4 lg:col-start-9 lg:mt-0 lg:self-end"
            delay={0.15}
          >
            <Standfirst>{copy.standfirst}</Standfirst>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-x-10 gap-y-14 lg:mt-20 lg:grid-cols-2">
          {copy.sides.map((side, index) => (
            <Reveal
              className={cn(
                "flex flex-col gap-8",
                index === 1 && "lg:border-s lg:border-border lg:ps-10",
              )}
              key={side.key}
              stagger={0.08}
              y={28}
            >
              <div
                className="flex items-start justify-between gap-6 border-t border-border-strong pt-6"
                data-reveal-item=""
              >
                <div>
                  <Eyebrow>{side.kicker}</Eyebrow>
                  <h3 className="mt-4 font-display text-4xl font-normal text-balance text-ink">
                    {side.title}
                  </h3>
                  <p className="mt-2 font-body text-sm text-ink-muted">
                    {side.place}
                  </p>
                </div>

                {index === 0 ? (
                  <Image
                    alt={copy.logo.alt}
                    className="h-auto w-24 shrink-0 sm:w-32"
                    height={copy.logo.height}
                    loading="lazy"
                    sizes="(max-width: 639px) 96px, 128px"
                    src={copy.logo.src}
                    width={copy.logo.width}
                  />
                ) : null}
              </div>

              <dl className="flex flex-col">
                {side.points.map((point) => (
                  <div
                    className="border-t border-border py-5"
                    data-reveal-item=""
                    key={point.term}
                  >
                    <dt className="font-display text-2xl font-normal text-ink">
                      {point.term}
                    </dt>
                    <dd className="mt-2 font-body text-base text-pretty text-ink-muted">
                      {point.detail}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 lg:mt-16" delay={0.2}>
          <Link
            className={cn(
              buttonVariants({ size: "md", variant: "link" }),
              "min-h-11 inline-flex items-center",
            )}
            href={copy.cta.href as Route}
            rel="noopener noreferrer"
            target="_blank"
          >
            {copy.cta.label}
            <Icon icon={ArrowUpRightIcon} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
