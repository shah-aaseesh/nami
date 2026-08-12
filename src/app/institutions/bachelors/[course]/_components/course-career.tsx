import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Standfirst } from "@/components/ui/typography";
import type { BachelorsProgramme } from "../../_components/bachelors-copy";

export function CourseCareer({
  course,
}: {
  readonly course: BachelorsProgramme;
}) {
  if (course.careerSummary === null && course.careerSectors.length === 0) {
    return null;
  }

  return (
    <section className="field-ink gutter-x section-y">
      <div className="mx-auto max-w-page lg:grid lg:grid-cols-12 lg:gap-x-10">
        <SplitText
          as="h2"
          className="font-display text-3xl font-normal text-balance text-ink lg:col-span-4 lg:text-4xl"
        >
          {course.careersLabel}
        </SplitText>

        <Reveal className="mt-8 lg:col-span-7 lg:col-start-6 lg:mt-0">
          {course.careerSummary === null ? null : (
            <Standfirst>{course.careerSummary}</Standfirst>
          )}

          {course.careerSectors.length === 0 ? null : (
            <ul className="mt-10 flex flex-wrap gap-3">
              {course.careerSectors.map((sector) => (
                <li
                  className="rounded-full border border-border-strong px-4 py-2 font-body text-sm text-ink"
                  key={sector}
                >
                  {sector}
                </li>
              ))}
            </ul>
          )}
        </Reveal>
      </div>
    </section>
  );
}
