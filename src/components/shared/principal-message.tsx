"use client";

import Image from "next/image";
import { useState } from "react";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { Icon } from "@/components/ui/icon";
import { H6, P } from "@/components/ui/typography";
import type { ContentImage, RichText } from "@/lib/content";
import { paragraphsOf } from "@/lib/content";
import { ImageIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

export type PrincipalMessagePerson = {
  readonly name: string;
  readonly title: string;
  readonly portrait: ContentImage | null;
  readonly expandedPortrait?: ContentImage | null;
};

export type PrincipalMessageProps = {
  readonly eyebrow: string;
  readonly heading?: string;
  readonly id?: string;
  readonly message: RichText;
  readonly person: PrincipalMessagePerson;
  readonly collapsible?: boolean;
};

function PortraitCard({
  person,
  isExpanded,
}: {
  readonly person: PrincipalMessagePerson;
  readonly isExpanded: boolean;
}) {
  const { portrait, expandedPortrait } = person;

  return (
    <figure className="w-full h-full flex flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-xs">
      <div className="relative flex-1 min-h-[300px] sm:min-h-[340px] w-full bg-[#3b6e98] overflow-hidden">
        {portrait === null ? (
          <div className="grid h-full w-full place-items-center">
            <Icon className="size-8 text-ink-muted/50" icon={ImageIcon} />
          </div>
        ) : (
          <>
            <Image
              alt={portrait.alt}
              className={cn(
                "object-cover object-top transition-opacity duration-300",
                isExpanded && expandedPortrait ? "opacity-0 pointer-events-none" : "opacity-100",
              )}
              fill
              loading="lazy"
              sizes="(max-width: 1023px) 100vw, (max-width: 1279px) 380px, 420px"
              src={portrait.src}
            />

            {expandedPortrait && (
              <Image
                alt={expandedPortrait.alt}
                className={cn(
                  "object-cover object-top transition-opacity duration-300",
                  isExpanded ? "opacity-100" : "opacity-0 pointer-events-none",
                )}
                fill
                loading="lazy"
                sizes="(max-width: 1023px) 100vw, (max-width: 1279px) 380px, 420px"
                src={expandedPortrait.src}
              />
            )}
          </>
        )}
      </div>

      <figcaption className="shrink-0 border-t border-border bg-surface px-5 py-4">
        <p className="font-body text-base font-semibold text-ink">{person.name}</p>
        <p className="mt-0.5 font-body text-xs font-medium text-accent">{person.title}</p>
      </figcaption>
    </figure>
  );
}

const COLLAPSED_PARAGRAPH_COUNT = 3;

export function PrincipalMessage({
  eyebrow,
  id,
  message,
  person,
  collapsible = false,
}: PrincipalMessageProps) {
  const [isExpanded, setIsExpanded] = useState(!collapsible);
  const letter = paragraphsOf(message);
  const hasMore = collapsible && letter.length > COLLAPSED_PARAGRAPH_COUNT;
  const visibleParagraphs = isExpanded || !collapsible ? letter : letter.slice(0, COLLAPSED_PARAGRAPH_COUNT);

  return (
    <section className="gutter-x section-y" id={id}>
      <div className="mx-auto max-w-page">
        <Reveal className="flex flex-col gap-4">
          <H6
            as="p"
            className="text-accent tracking-widest uppercase font-body"
          >
            {eyebrow}
          </H6>

          <span className="block h-1 w-16 rounded-full bg-accent" />
        </Reveal>

        <div className="mt-8 sm:mt-10 flex flex-col lg:flex-row items-stretch gap-8 lg:gap-10 xl:gap-14">
          <div className="flex-1 flex flex-col justify-between">
            <Reveal
              className="space-y-4 sm:space-y-5"
              stagger={0.08}
            >
              {visibleParagraphs.map((paragraph, index) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: message is a static paragraph list
                <RevealItem key={index}>
                  <P className="text-justify [text-align-last:left] text-ink/90 leading-relaxed text-sm sm:text-base">{paragraph}</P>
                </RevealItem>
              ))}
            </Reveal>

            {hasMore && (
              <div className="shrink-0 pt-4 sm:pt-6">
                <button
                  type="button"
                  onClick={() => setIsExpanded((prev) => !prev)}
                  className="inline-flex items-center gap-2 px-4.5 py-2 rounded-full text-xs sm:text-sm font-semibold bg-accent/10 text-accent hover:bg-accent hover:text-white transition-all duration-200 cursor-pointer shadow-2xs group/btn"
                >
                  <span>{isExpanded ? "Read less" : "Read more"}</span>
                  <svg
                    aria-hidden="true"
                    className={cn(
                      "size-3.5 transition-transform duration-200",
                      isExpanded && "rotate-180",
                    )}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            )}
          </div>

          <div className="w-full lg:w-[380px] xl:w-[420px] shrink-0 flex flex-col">
            <Reveal className="w-full h-full flex flex-col">
              <PortraitCard isExpanded={isExpanded} person={person} />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
