import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Eyebrow, P, Standfirst } from "@/components/ui/typography";
import { content } from "@/lib/content";
import {
  AcademicLevelsSequence,
  type LevelPanel,
} from "./academic-levels-sequence";

export async function AcademicLevels() {
  const [copy, levels, institution] = await Promise.all([
    content.getHomeCopy(),
    content.getAcademicLevels(),
    content.getInstitution(),
  ]);

  const section = copy.sections.levels;
  const campuses = new Map(
    institution.campuses.map((campus) => [
      campus.slug,
      `${campus.locality}, ${campus.city}`,
    ]),
  );

  const panels: readonly LevelPanel[] = levels.map((level) => ({
    campus: campuses.get(level.campusSlug) ?? null,
    highlights: level.highlights,
    id: level.id,
    image: level.image,
    paragraphs: level.summary.kind === "blocks" ? level.summary.paragraphs : [],
    stage: level.stage,
    title: level.title,
  }));

  return (
    <section
      className="field-teal gutter-x section-y overflow-hidden"
      id="levels"
    >
      <div className="mx-auto max-w-page">
        {section.eyebrow === null ? null : (
          <Reveal className="flex items-center gap-5 lg:w-7/12">
            <Eyebrow>{section.eyebrow}</Eyebrow>
            <span className="h-px flex-1 bg-border" />
          </Reveal>
        )}

        <SplitText
          as="h2"
          className="mt-8 font-display text-5xl font-semibold lg:mt-12 lg:w-8/12"
        >
          {section.heading}
        </SplitText>

        {section.standfirst === null ? null : (
          <Reveal className="mt-12 lg:mt-14 lg:ms-auto lg:w-5/12" delay={0.25}>
            <Standfirst>{section.standfirst}</Standfirst>
          </Reveal>
        )}

        {panels.length > 0 ? <AcademicLevelsSequence panels={panels} /> : null}

        {panels.length === 0 && section.emptyState !== null ? (
          <P className="mt-16 lg:w-5/12">{section.emptyState}</P>
        ) : null}
      </div>
    </section>
  );
}
