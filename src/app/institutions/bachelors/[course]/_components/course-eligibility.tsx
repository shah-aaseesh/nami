import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import type { BachelorsProgramme } from "../../_components/bachelors-copy";
import { courseDetailCopy } from "./course-detail-copy";

const headCell =
  "border-b border-border-strong py-3 pe-6 font-body text-xs font-medium tracking-widest text-ink-muted uppercase last:pe-0";
const bodyCell = "border-b border-border py-4 pe-6 align-top last:pe-0";

export function CourseEligibility({
  course,
}: {
  readonly course: BachelorsProgramme;
}) {
  if (course.entry.length === 0) return null;

  const columns = courseDetailCopy.entryColumns;

  return (
    <section className="gutter-x section-y">
      <div className="mx-auto max-w-page lg:grid lg:grid-cols-12 lg:gap-x-10">
        <SplitText
          as="h2"
          className="font-display text-3xl font-normal text-balance text-ink lg:col-span-4 lg:text-4xl"
        >
          {course.entryLabel}
        </SplitText>

        <Reveal className="mt-8 lg:col-span-7 lg:col-start-6 lg:mt-0">
          <table className="w-full border-collapse text-left font-body text-sm">
            <caption className="sr-only">
              {`${course.fullTitle} — ${course.entryLabel}`}
            </caption>

            <thead>
              <tr>
                <th className={`${headCell} w-2/5`} scope="col">
                  {columns.qualification}
                </th>
                <th className={headCell} scope="col">
                  {columns.requirement}
                </th>
              </tr>
            </thead>

            <tbody>
              {course.entry.map((item) => (
                <tr key={item.label}>
                  <th
                    className={`${bodyCell} font-body font-medium text-ink`}
                    scope="row"
                  >
                    {item.label}
                  </th>
                  <td className={`${bodyCell} text-pretty text-ink-muted`}>
                    {item.requirement}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {course.entryNotes.length === 0 ? null : (
            <ul className="mt-8 flex flex-col gap-3">
              {course.entryNotes.map((note) => (
                <li
                  className="font-body text-sm text-pretty text-ink-muted"
                  key={note}
                >
                  {note}
                </li>
              ))}
            </ul>
          )}
        </Reveal>
      </div>
    </section>
  );
}
