import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Standfirst } from "@/components/ui/typography";
import type { BachelorsProgramme } from "../../_components/bachelors-copy";

export function CoursePending({
  course,
  heading,
}: {
  readonly course: BachelorsProgramme;
  readonly heading: string;
}) {
  if (course.pendingNote === null) return null;

  return (
    <section className="gutter-x section-y border-b border-border/60 bg-surface">
      <div className="mx-auto max-w-page space-y-4">
        <div>
          <SplitText
            as="h2"
            className="font-display text-2xl sm:text-3xl lg:text-4xl font-normal text-balance text-ink"
          >
            {heading}
          </SplitText>
        </div>

        <Reveal className="rounded-2xl border border-border bg-surface-raised/40 p-5 sm:p-6 shadow-2xs">
          <Standfirst className="text-ink-muted text-sm sm:text-base leading-relaxed">
            {course.pendingNote}
          </Standfirst>
        </Reveal>
      </div>
    </section>
  );
}
