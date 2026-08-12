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
    <section className="gutter-x section-y">
      <div className="mx-auto max-w-page lg:grid lg:grid-cols-12 lg:gap-x-10">
        <SplitText
          as="h2"
          className="font-display text-3xl font-normal text-balance text-ink lg:col-span-4 lg:text-4xl"
        >
          {heading}
        </SplitText>

        <Reveal className="mt-8 border-t border-border pt-8 lg:col-span-7 lg:col-start-6 lg:mt-0">
          <Standfirst>{course.pendingNote}</Standfirst>
        </Reveal>
      </div>
    </section>
  );
}
