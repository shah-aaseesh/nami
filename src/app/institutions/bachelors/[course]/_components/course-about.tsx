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
  const paragraphs = course.summary;
  const whatYoullStudy = course.whatYoullStudy;

  if (paragraphs.length === 0 && !whatYoullStudy) return null;

  return (
    <section className="gutter-x section-y border-b border-border/60 bg-surface">
      <div className="mx-auto max-w-page space-y-10 sm:space-y-12">
        {whatYoullStudy ? (
          <div className="space-y-4">
            <div>
              <SplitText
                as="h2"
                className="font-display text-2xl sm:text-3xl lg:text-4xl font-normal text-balance text-ink"
              >
                What you&apos;ll study:
              </SplitText>
            </div>

            <Reveal className="pt-1">
              <P className="text-base sm:text-lg text-ink font-normal leading-relaxed">
                {whatYoullStudy}
              </P>
            </Reveal>
          </div>
        ) : null}

        {paragraphs.length > 0 ? (
          <div className="space-y-4">
            <div>
              <SplitText
                as="h2"
                className="font-display text-2xl sm:text-3xl lg:text-4xl font-normal text-balance text-ink"
              >
                {whatYoullStudy ? "Course Overview" : courseDetailCopy.aboutHeading}
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
        ) : null}
      </div>
    </section>
  );
}
