import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { Parallax } from "@/components/motion/parallax";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";

import { buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Eyebrow, P, Standfirst } from "@/components/ui/typography";
import type { AcademicLevel } from "@/lib/content";
import { paragraphsOf } from "@/lib/content";
import { ArrowRightIcon, CheckIcon, LocationIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

export function ProgramDetailHero({
  level,
  campusName,
}: {
  readonly level: AcademicLevel;
  readonly campusName: string;
}) {
  const paragraphs = paragraphsOf(level.summary);
  const standfirst = paragraphs[0] ?? "";
  const remaining = paragraphs.slice(1);

  return (
    <section className="gutter-x section-y-hero">
      <div className="mx-auto max-w-page">
        <div className="mt-10 lg:mt-16 lg:grid lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-7">
            <Reveal atFold>
              <div className="mb-6 h-12 sm:h-14">
                <Image
                  src={
                    level.slug === "school"
                      ? "/universities/nami-school.png"
                      : level.slug === "a-level"
                        ? "/universities/nami-college.png"
                        : "/logo.png"
                  }
                  alt={`${level.title} logo`}
                  width={200}
                  height={80}
                  className="h-full w-auto object-contain object-left"
                />
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Eyebrow>{level.stage}</Eyebrow>
                <span className="h-4 w-px bg-border" />
                <span className="flex items-center gap-1 font-body text-xs text-ink-muted">
                  <Icon className="size-3.5 text-accent" icon={LocationIcon} />
                  {campusName}
                </span>
              </div>
            </Reveal>
            <SplitText
              as="h1"
              atFold
              className="mt-5 font-display text-4xl font-normal leading-[1.1] text-balance text-ink sm:text-6xl lg:text-7xl"
            >
              {level.title}
            </SplitText>
          </div>

          <div className="mt-6 max-w-xl lg:col-span-4 lg:col-start-9 lg:mt-0 lg:flex lg:flex-col lg:justify-between lg:self-end">
            {standfirst !== "" && (
              <Reveal atFold delay={0.15}>
                <Standfirst className="text-ink-muted">{standfirst}</Standfirst>
              </Reveal>
            )}

            <Reveal
              atFold
              className="mt-6 flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4 lg:mt-10"
              delay={0.3}
            >
              <Link
                className={cn(
                  buttonVariants(),
                  "w-full justify-center gap-2 rounded-full border-none bg-accent px-6 text-white hover:bg-accent/90 sm:w-auto",
                )}
                href={
                  (level.slug === "school"
                    ? "https://school.nami.edu.np"
                    : "https://college.nami.edu.np/") as Route
                }
                rel="noopener noreferrer"
                target="_blank"
              >
                <span>
                  {level.slug === "school"
                    ? "Visit School Website"
                    : "Visit College Website"}
                </span>
                <Icon className="size-4" icon={ArrowRightIcon} />
              </Link>
            </Reveal>
          </div>
        </div>

        {level.image !== null && (
          <Parallax
            className="mt-10 overflow-hidden rounded-2xl shadow-md sm:rounded-[2rem] lg:mt-20"
            speed={1.05}
          >
            <Image
              alt={level.image.alt}
              className="h-[280px] w-full object-cover sm:h-[380px] md:h-[480px] lg:h-[65vh]"
              height={level.image.height}
              loading="eager"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1200px"
              src={level.image.src}
              width={level.image.width}
            />
          </Parallax>
        )}

        <div className="mt-12 sm:mt-16 lg:mt-24 lg:grid lg:grid-cols-12 lg:gap-x-12">
          <div className="space-y-6 lg:col-span-7">
            {remaining.map((p) => (
              <P
                className="text-base leading-relaxed text-ink-muted sm:text-lg"
                key={p}
              >
                {p}
              </P>
            ))}
          </div>

          <div className="mt-10 lg:col-span-4 lg:col-start-9 lg:mt-0">
            <div className="rounded-2xl border border-border bg-card p-5 shadow-xs sm:p-6">
              <h3 className="font-body text-xs font-semibold uppercase tracking-widest text-ink">
                Quick Facts & Key Features
              </h3>
              <ul className="mt-5 space-y-3">
                {level.highlights.map((item) => (
                  <li
                    className="flex items-start gap-3 text-sm leading-relaxed text-ink-muted"
                    key={item}
                  >
                    <Icon
                      className="mt-0.5 size-4 shrink-0 text-accent"
                      icon={CheckIcon}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
