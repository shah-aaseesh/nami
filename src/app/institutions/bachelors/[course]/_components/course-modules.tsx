import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { H5, Standfirst } from "@/components/ui/typography";
import type {
  BachelorsProgramme,
  ProgrammeStage,
} from "../../_components/bachelors-copy";
import { courseDetailCopy } from "./course-detail-copy";

const headCell =
  "border-b border-border-strong py-3 pe-6 align-bottom font-body text-xs font-medium tracking-widest text-ink-muted uppercase last:pe-0";
const bodyCell = "border-b border-border py-4 pe-6 align-top last:pe-0";

function StageTable({
  courseTitle,
  stage,
}: {
  readonly courseTitle: string;
  readonly stage: ProgrammeStage;
}) {
  const columns = courseDetailCopy.moduleColumns;
  const showStatus = stage.modules.some((module) => module.status !== null);
  const showPrerequisites = stage.modules.some(
    (module) => module.prerequisites !== null,
  );

  return (
    <div>
      <H5 as="h3" className="text-ink">
        {stage.label}
      </H5>

      <section
        aria-label={`${stage.label} modules`}
        className="mt-6 overflow-x-auto"
        // biome-ignore lint/a11y/noNoninteractiveTabindex: a horizontally scrolling container must be reachable by keyboard alone (WCAG 2.1.1, axe scrollable-region-focusable) and the table holds no focusable child of its own.
        tabIndex={0}
      >
        <table className="w-full min-w-3xl border-collapse text-left font-body text-sm">
          <caption className="sr-only">
            {`${courseTitle} — ${stage.label} modules`}
          </caption>

          <thead>
            <tr>
              <th className={headCell} scope="col">
                {columns.code}
              </th>
              <th className={headCell} scope="col">
                {columns.title}
              </th>
              <th className={headCell} scope="col">
                {columns.credits}
              </th>
              {showStatus ? (
                <th className={headCell} scope="col">
                  {columns.status}
                </th>
              ) : null}
              {showPrerequisites ? (
                <th className={headCell} scope="col">
                  {columns.prerequisites}
                </th>
              ) : null}
            </tr>
          </thead>

          <tbody>
            {stage.modules.map((module) => (
              <tr key={module.code}>
                <th
                  className={`${bodyCell} font-body font-medium whitespace-nowrap text-ink`}
                  scope="row"
                >
                  {module.code}
                </th>
                <td className={`${bodyCell} text-ink`}>{module.title}</td>
                <td className={`${bodyCell} tabular-nums text-ink-muted`}>
                  {module.credits}
                </td>
                {showStatus ? (
                  <td
                    className={`${bodyCell} whitespace-nowrap text-ink-muted`}
                  >
                    {module.status}
                  </td>
                ) : null}
                {showPrerequisites ? (
                  <td className={`${bodyCell} text-ink-muted`}>
                    {module.prerequisites}
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {stage.note === null ? null : (
        <p className="mt-4 font-body text-sm text-pretty text-ink-muted">
          {stage.note}
        </p>
      )}
    </div>
  );
}

export function CourseModules({
  course,
}: {
  readonly course: BachelorsProgramme;
}) {
  if (course.stages.length === 0) return null;

  return (
    <section className="gutter-x section-y">
      <div className="mx-auto max-w-page">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-10">
          <SplitText
            as="h2"
            className="font-display text-3xl font-normal text-balance text-ink lg:col-span-4 lg:text-4xl"
          >
            {courseDetailCopy.modulesHeading}
          </SplitText>

          {course.stagesNote === null ? null : (
            <Reveal className="mt-6 max-w-xl lg:col-span-7 lg:col-start-6 lg:mt-0">
              <Standfirst>{course.stagesNote}</Standfirst>
            </Reveal>
          )}
        </div>

        <Reveal className="mt-14 flex flex-col gap-14 lg:mt-20 lg:gap-20">
          {course.stages.map((stage) => (
            <StageTable
              courseTitle={course.fullTitle}
              key={stage.key}
              stage={stage}
            />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
