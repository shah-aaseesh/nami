import { Eyebrow, H2 } from "@/components/ui/typography";
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
    <div className="border-b border-border/80 pb-4 mb-8 sm:mb-12">
      {isFirstGroup && (
        <Eyebrow className="mb-2 text-[#BD1B21] font-semibold tracking-wider">
          OUR PEOPLE
        </Eyebrow>
      )}
      <H2
        className={cn(
          "font-display font-normal text-ink tracking-tight",
          isFirstGroup
            ? "text-3xl sm:text-4xl lg:text-5xl"
            : "text-2xl sm:text-3xl lg:text-4xl",
        )}
      >
        {title}
      </H2>
    </div>
  );

  // Special 3-row layout for Board of Directors: Row 1 = Chairperson (1), Row 2 = Directors (3), Row 3 = Directors (3)
  if (title === "Board of Directors" && leaders.length === 7) {
    const chairperson = leaders[0];
    if (!chairperson) return null;
    const row2 = leaders.slice(1, 4);
    const row3 = leaders.slice(4, 7);

    return (
      <section
        className={cn(
          "gutter-x",
          isFirstGroup
            ? "pt-2 sm:pt-4 pb-12 lg:pb-16"
            : "pt-8 lg:pt-12 pb-12 lg:pb-16",
        )}
      >
        <div className="mx-auto max-w-page">
          {heading}

          <div className="flex flex-col gap-8 sm:gap-10 lg:gap-12">
            {/* Row 1: Chairperson */}
            <div className="flex justify-center w-full">
              <FacultyCard
                className="w-full max-w-[280px] sm:max-w-[300px] lg:max-w-[320px]"
                index={0}
                isFirstGroup={isFirstGroup}
                isSolo
                leader={chairperson}
              />
            </div>

            {/* Row 2: 3 Directors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 justify-items-center max-w-5xl mx-auto w-full">
              {row2.map((leader, index) => (
                <FacultyCard
                  className="w-full max-w-[280px] sm:max-w-[300px] lg:max-w-[320px]"
                  index={index + 1}
                  isFirstGroup={isFirstGroup}
                  key={leader.id}
                  leader={leader}
                />
              ))}
            </div>

            {/* Row 3: 3 Directors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 justify-items-center max-w-5xl mx-auto w-full">
              {row3.map((leader, index) => (
                <FacultyCard
                  className="w-full max-w-[280px] sm:max-w-[300px] lg:max-w-[320px]"
                  index={index + 4}
                  isFirstGroup={isFirstGroup}
                  key={leader.id}
                  leader={leader}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

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
    <section
      className={cn(
        "gutter-x",
        isFirstGroup
          ? "pt-2 sm:pt-4 pb-12 lg:pb-16"
          : "pt-8 lg:pt-12 pb-12 lg:pb-16",
      )}
    >
      {isScrollable ? (
        <FacultyGroupTrack heading={heading}>{cards}</FacultyGroupTrack>
      ) : (
        <div className="mx-auto max-w-page overflow-x-clip py-2">
          {heading}

          <div
            className={cn(
              "flex items-stretch gap-6 sm:gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide md:flex-wrap md:overflow-visible pb-4",
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
