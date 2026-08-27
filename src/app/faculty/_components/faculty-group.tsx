import { H2 } from "@/components/ui/typography";
import type { Leader } from "@/lib/content";
import { cn } from "@/lib/utils";
import { FacultyCard } from "./faculty-card";
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
    <FacultyCard
      index={index}
      isFirstGroup={isFirstGroup}
      isScrollable={isScrollable}
      isSolo={isSolo}
      key={leader.id}
      leader={leader}
    />
  ));

  return (
    <section className="gutter-x py-10 lg:py-16">
      {isScrollable ? (
        <FacultyGroupTrack heading={heading}>{cards}</FacultyGroupTrack>
      ) : (
        <div className="mx-auto max-w-page overflow-x-clip py-2">
          {heading}

          <div
            className={cn(
              "flex items-start gap-6 sm:gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide md:flex-wrap md:overflow-visible pb-4",
              isSolo ? "justify-center overflow-visible" : "md:justify-center",
            )}
          >
            {cards}
          </div>
        </div>
      )}
    </section>
  );
}
