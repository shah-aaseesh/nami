import Image from "next/image";
import { H2, P } from "@/components/ui/typography";
import type { Leader } from "@/lib/content";
import { cn } from "@/lib/utils";
import { FacultyGroupTrack } from "./faculty-group-track";

export function FacultyGroup({
  isFirstGroup = false,
  leaders,
  title,
}: {
  readonly isFirstGroup?: boolean;
  readonly leaders: readonly Leader[];
  readonly title: string;
}) {
  const isScrollable = leaders.length > 4;
  const isSolo = leaders.length === 1;

  if (leaders.length === 0) return null;

  const heading = (
    <H2 className="font-display text-2xl sm:text-3xl font-medium text-ink lg:text-4xl border-b border-border/60 pb-4 mb-8 sm:mb-12">
      {title}
    </H2>
  );

  const cards = leaders.map((leader, index) => (
    <div
      className={cn(
        "group flex flex-col snap-center shrink-0 w-[75vw] max-w-[260px] sm:w-[40vw] sm:max-w-[280px]",
        isScrollable
          ? "lg:w-[calc((100%-6rem)/4)] lg:max-w-none"
          : isSolo
            ? "lg:w-full lg:max-w-sm"
            : "lg:w-[calc(25%-1.5rem)] lg:max-w-none",
      )}
      key={leader.id}
    >
      <div className="relative aspect-4/5 w-full overflow-hidden rounded-2xl bg-neutral-100 border border-border/40">
        {leader.portrait ? (
          <Image
            alt={leader.portrait.alt}
            className="absolute inset-0 object-cover object-top transition-transform duration-700 group-hover:scale-105"
            fetchPriority={isFirstGroup && index === 0 ? "high" : "auto"}
            fill
            loading={isFirstGroup && index === 0 ? "eager" : "lazy"}
            sizes="(max-width: 640px) 260px, (max-width: 1024px) 280px, 25vw"
            src={leader.portrait.src}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-neutral-100 text-neutral-300">
            <svg className="size-16" fill="currentColor" viewBox="0 0 24 24">
              <title>Faculty portrait placeholder</title>
              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
        )}
        <div className="absolute inset-0 ring-1 ring-inset ring-ink/10 rounded-2xl" />
      </div>

      <div className="mt-4">
        <p className="font-body text-[10px] font-bold uppercase tracking-widest text-accent">
          {leader.title}
        </p>
        <h3 className="mt-1 font-display text-lg font-medium text-ink">
          {leader.name}
        </h3>
        <P className="mt-2 text-sm text-ink-muted leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
          {leader.brief}
        </P>
      </div>
    </div>
  ));

  return (
    <section className="gutter-x py-10 lg:py-16">
      {isScrollable ? (
        <FacultyGroupTrack heading={heading}>{cards}</FacultyGroupTrack>
      ) : (
        <div className="mx-auto max-w-page overflow-hidden">
          {heading}

          <div className="flex gap-6 sm:gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide lg:flex-wrap lg:justify-center lg:overflow-visible">
            {cards}
          </div>
        </div>
      )}
    </section>
  );
}
