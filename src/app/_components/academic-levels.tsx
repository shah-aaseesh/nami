import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Eyebrow, P, Standfirst } from "@/components/ui/typography";
import { content } from "@/lib/content";
import { AcademicLevelsIntro } from "./academic-levels-intro";
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
    id: level.id,
    slug: level.slug,
    image: level.image,
    lead:
      level.summary.kind === "blocks"
        ? (level.summary.paragraphs[0] ?? null)
        : null,
    stage: level.stage,
    title: level.title,
  }));

  return (
    <section className="field-brand gutter-x section-y" id="levels">
      <div className="mx-auto grid max-w-page gap-x-16 gap-y-14 xl:grid-cols-12">
        <AcademicLevelsIntro className="xl:col-span-5">
          {section.eyebrow === null ? null : (
            <Reveal className="flex items-center gap-5">
              <Eyebrow>{section.eyebrow}</Eyebrow>
              <span className="h-px flex-1 bg-border" />
            </Reveal>
          )}

          <SplitText
            as="h2"
            className="mt-8 font-display text-5xl font-normal tracking-normal lg:mt-10"
          >
            {section.heading}
          </SplitText>

          {section.standfirst === null ? null : (
            <Reveal className="mt-8 lg:mt-10" delay={0.2}>
              <Standfirst>{section.standfirst}</Standfirst>
            </Reveal>
          )}
        </AcademicLevelsIntro>

        {panels.length > 0 ? (
          <AcademicLevelsSequence className="xl:col-span-7" panels={panels} />
        ) : null}

        {panels.length === 0 && section.emptyState !== null ? (
          <P className="xl:col-span-7">{section.emptyState}</P>
        ) : null}
      </div>
    </section>
  );
}
