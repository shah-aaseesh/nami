"use client";

import Image from "next/image";
import { useState } from "react";
import { Reveal } from "@/components/motion/reveal";
import { H6, P } from "@/components/ui/typography";
import type { ContentImage, RichText } from "@/lib/content";
import { paragraphsOf } from "@/lib/content";

export type BachelorsAcademicHeadProps = {
  readonly eyebrow: string;
  readonly id?: string;
  readonly message: RichText;
  readonly person: {
    readonly name: string;
    readonly title: string;
    readonly portrait: ContentImage | null;
  };
};

const COLLAPSED_PARAGRAPH_COUNT = 4;

export function BachelorsAcademicHeadSection({
  eyebrow,
  id = "academic-head",
  message,
  person,
}: BachelorsAcademicHeadProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const paragraphs = paragraphsOf(message);
  const hasMore = paragraphs.length > COLLAPSED_PARAGRAPH_COUNT;
  const visibleParagraphs = isExpanded
    ? paragraphs
    : paragraphs.slice(0, COLLAPSED_PARAGRAPH_COUNT);

  const displayPortrait = person.portrait;

  return (
    <section className="gutter-x section-y" id={id}>
      <div className="mx-auto max-w-page">
        <Reveal className="flex flex-col gap-4">
          <H6 as="p" className="text-accent tracking-widest uppercase font-body">
            {eyebrow}
          </H6>
          <span className="block h-1 w-16 rounded-full bg-accent" />
        </Reveal>

        {!isExpanded ? (
          /* Initial State: Flex layout where Left column and Right card are strictly equal height */
          <div className="mt-8 sm:mt-10 flex flex-col lg:flex-row items-stretch gap-8 lg:gap-12 xl:gap-16">
            <div className="flex-1 flex flex-col justify-between">
              <div className="space-y-4 sm:space-y-5">
                {visibleParagraphs.map((paragraph, index) => (
                  <P
                    key={index}
                    className="text-justify [text-align-last:left] text-ink/90 leading-relaxed text-sm sm:text-base"
                  >
                    {paragraph}
                  </P>
                ))}
              </div>

              {hasMore && (
                <div className="shrink-0 pt-4 sm:pt-6">
                  <button
                    type="button"
                    onClick={() => setIsExpanded(true)}
                    className="inline-flex items-center gap-2 px-4.5 py-2 rounded-full text-xs sm:text-sm font-semibold bg-accent/10 text-accent hover:bg-accent hover:text-white transition-all duration-200 cursor-pointer shadow-2xs group/btn"
                  >
                    <span>Read more</span>
                    <svg
                      aria-hidden="true"
                      className="size-3.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>

            <div className="w-full sm:w-[360px] lg:w-[380px] xl:w-[420px] shrink-0 flex flex-col">
              <figure className="w-full h-full flex flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-xs">
                <div className="relative flex-1 min-h-[400px] sm:min-h-[460px] w-full bg-[#3b6e98] overflow-hidden">
                  {displayPortrait ? (
                    <Image
                      alt={displayPortrait.alt}
                      className="object-cover object-top"
                      fill
                      loading="lazy"
                      sizes="(max-width: 639px) 100vw, (max-width: 1023px) 360px, (max-width: 1279px) 380px, 420px"
                      src={displayPortrait.src}
                    />
                  ) : null}
                </div>

                <figcaption className="shrink-0 border-t border-border bg-surface px-5 py-4">
                  <p className="font-body text-base font-bold text-ink">{person.name}</p>
                  <p className="mt-0.5 font-body text-xs font-semibold text-accent uppercase tracking-wide">
                    {person.title}
                  </p>
                </figcaption>
              </figure>
            </div>
          </div>
        ) : (
          /* Expanded State: Magazine Flow wrapping text around portrait */
          <div className="mt-8 sm:mt-10 flow-root">
            <div className="w-full sm:w-[360px] lg:w-[380px] xl:w-[420px] lg:float-right lg:ml-10 xl:ml-14 mb-8 lg:mb-6">
              <figure className="w-full flex flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-xs">
                <div className="relative w-full aspect-[4/5] bg-[#3b6e98] overflow-hidden">
                  {displayPortrait ? (
                    <Image
                      alt={displayPortrait.alt}
                      className="object-cover object-top"
                      fill
                      loading="lazy"
                      sizes="(max-width: 639px) 100vw, (max-width: 1023px) 360px, (max-width: 1279px) 380px, 420px"
                      src={displayPortrait.src}
                    />
                  ) : null}
                </div>

                <figcaption className="shrink-0 border-t border-border bg-surface px-5 py-4">
                  <p className="font-body text-base font-bold text-ink">{person.name}</p>
                  <p className="mt-0.5 font-body text-xs font-semibold text-accent uppercase tracking-wide">
                    {person.title}
                  </p>
                </figcaption>
              </figure>
            </div>

            <div className="space-y-4 sm:space-y-5">
              {visibleParagraphs.map((paragraph, index) => (
                <P
                  key={index}
                  className="text-justify [text-align-last:left] text-ink/90 leading-relaxed text-sm sm:text-base"
                >
                  {paragraph}
                </P>
              ))}
            </div>

            {hasMore && (
              <div className="mt-6 pt-4 border-t border-border/40">
                <button
                  type="button"
                  onClick={() => setIsExpanded(false)}
                  className="inline-flex items-center gap-2 px-4.5 py-2 rounded-full text-xs sm:text-sm font-semibold bg-accent/10 text-accent hover:bg-accent hover:text-white transition-all duration-200 cursor-pointer shadow-2xs group/btn"
                >
                  <span>Read less</span>
                  <svg
                    aria-hidden="true"
                    className="size-3.5 rotate-180"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
