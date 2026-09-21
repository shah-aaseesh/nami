import { Reveal } from "@/components/motion/reveal";
import { H5 } from "@/components/ui/typography";
import type {
  BachelorsProgramme,
  ProgrammeStage,
} from "../../_components/bachelors-copy";
import { courseDetailCopy } from "./course-detail-copy";

const headCell =
  "border-b border-border-strong py-3.5 pe-4 sm:pe-6 align-bottom font-body text-xs font-semibold tracking-wider text-ink-muted uppercase text-left last:pe-0";
const bodyCell =
  "border-b border-border/80 py-4 pe-4 sm:pe-6 align-middle text-left font-body text-sm last:pe-0";

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
    <div className="space-y-4">
      <div className="flex items-center gap-2.5">
        <span className="size-2 rounded-full bg-accent" />
        <H5 as="h3" className="text-ink font-display text-lg sm:text-xl font-semibold">
          {stage.label}
        </H5>
      </div>

      <div
        aria-label={`${stage.label} modules`}
        className="overflow-x-auto rounded-2xl border border-border bg-surface-raised/30 p-4 sm:p-6 shadow-2xs"
        // biome-ignore lint/a11y/noNoninteractiveTabindex: a horizontally scrolling container must be reachable by keyboard alone (WCAG 2.1.1, axe scrollable-region-focusable) and the table holds no focusable child of its own.
        tabIndex={0}
      >
        <table className="w-full min-w-xl table-fixed border-collapse text-left font-body text-sm">
          <caption className="sr-only">
            {`${courseTitle} — ${stage.label} modules`}
          </caption>

          <colgroup>
            <col className={showStatus && showPrerequisites ? "w-[16%] sm:w-[15%]" : "w-[20%] sm:w-[18%]"} />
            <col className={showStatus && showPrerequisites ? "w-[38%] sm:w-[43%]" : "w-[45%] sm:w-[52%]"} />
            <col className="w-[14%] sm:w-[12%]" />
            {showStatus && <col className="w-[16%] sm:w-[15%]" />}
            {showPrerequisites && <col className="w-[16%] sm:w-[15%]" />}
          </colgroup>

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
              <tr className="transition-colors hover:bg-muted/20" key={module.code}>
                <th
                  className={`${bodyCell} font-body font-semibold whitespace-nowrap text-ink`}
                  scope="row"
                >
                  {module.code}
                </th>
                <td className={`${bodyCell} font-normal text-ink`}>
                  {module.title}
                </td>
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
      </div>

      {stage.note === null ? null : (
        <p className="font-body text-xs sm:text-sm text-pretty text-ink-muted pl-1">
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
    <section className="gutter-x section-y border-b border-border/60 bg-surface">
      <div className="mx-auto max-w-page space-y-6">
        {course.stagesNote === null ? null : (
          <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
            {course.stagesNote}
          </p>
        )}

        <Reveal className="space-y-6 sm:space-y-8">
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
