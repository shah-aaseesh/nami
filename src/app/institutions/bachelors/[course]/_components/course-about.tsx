import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { P } from "@/components/ui/typography";
import type { BachelorsProgramme } from "../../_components/bachelors-copy";
import { courseDetailCopy } from "./course-detail-copy";

export function CourseAbout({
  course,
}: {
  readonly course: BachelorsProgramme;
}) {
  const paragraphs = course.summary.slice(1);

  if (paragraphs.length === 0) return null;

  return (
    <section className="gutter-x py-8 sm:py-10 lg:py-12 border-b border-border/60 bg-surface">
      <div className="mx-auto max-w-page space-y-4">
        <div>
          <SplitText
            as="h2"
            className="font-display text-2xl sm:text-3xl lg:text-4xl font-normal text-balance text-ink"
          >
            {courseDetailCopy.aboutHeading}
          </SplitText>
        </div>

        <Reveal className="space-y-4 pt-1">
          {paragraphs.map((paragraph, index) => (
            <P
              key={index}
              className={
                index === 0
                  ? "text-base sm:text-lg text-ink font-normal leading-relaxed"
                  : "text-sm sm:text-base text-ink-muted leading-relaxed"
              }
            >
              {paragraph}
            </P>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
