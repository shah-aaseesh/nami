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
    <section className="gutter-x section-y">
      <div className="mx-auto max-w-page lg:grid lg:grid-cols-12 lg:gap-x-10">
        <SplitText
          as="h2"
          className="font-display text-3xl font-normal text-balance text-ink lg:col-span-4 lg:text-4xl"
        >
          {courseDetailCopy.aboutHeading}
        </SplitText>

        <Reveal className="mt-8 flex flex-col gap-6 lg:col-span-7 lg:col-start-6 lg:mt-0">
          {paragraphs.map((paragraph) => (
            <P className="text-lg" key={paragraph}>
              {paragraph}
            </P>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
