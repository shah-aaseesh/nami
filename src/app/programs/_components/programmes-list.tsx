import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { Eyebrow, H3, H4, P } from "@/components/ui/typography";
import type { Programme } from "@/lib/content";
import { ArrowRightIcon, CheckIcon, MortarboardIcon } from "@/lib/icons";

export function ProgrammesList({
  programmes,
  levelTitle,
}: {
  readonly programmes: readonly Programme[];
  readonly levelTitle: string;
}) {
  if (programmes.length === 0) return null;

  return (
    <section className="gutter-x section-y bg-surface" id="courses">
      <div className="mx-auto max-w-page">
        <div className="max-w-2xl">
          <Eyebrow>Academic Offerings</Eyebrow>
          <H3 className="mt-4">Degrees & Streams Under {levelTitle}</H3>
          <P className="mt-4">
            Structured qualifications designed to develop deep subject
            expertise, practical industry competencies, and academic excellence.
          </P>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {programmes.map((prog) => (
            <article
              className="group flex flex-col justify-between rounded-xl border border-border bg-card p-6 shadow-xs transition-all duration-300 hover:border-accent hover:shadow-md"
              id={prog.slug}
              key={prog.id}
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-muted px-2.5 py-1 font-body text-xs font-semibold text-accent">
                    <Icon className="size-3.5" icon={MortarboardIcon} />
                    {prog.qualification}
                  </span>
                  {prog.startingFrom === null ? null : (
                    <span className="rounded-md border border-primary-300 bg-primary-100 px-2 py-0.5 font-body text-xs font-medium text-primary-800">
                      Starting {prog.startingFrom}
                    </span>
                  )}
                </div>

                <H4 className="mt-4 text-xl text-ink transition-colors group-hover:text-accent">
                  {prog.title}
                </H4>

                <p className="mt-2 font-body text-xs text-ink-muted">
                  Awarding Body:{" "}
                  <span className="font-semibold text-ink">
                    {prog.awardingBody}
                  </span>
                </p>

                <ul className="mt-4 space-y-2 border-border/60 border-t pt-4">
                  <li className="flex items-center gap-2 text-ink-muted text-xs">
                    <Icon className="size-3.5 text-accent" icon={CheckIcon} />
                    <span>Global curriculum standards & certifications</span>
                  </li>
                  <li className="flex items-center gap-2 text-ink-muted text-xs">
                    <Icon className="size-3.5 text-accent" icon={CheckIcon} />
                    <span>Practical laboratory & project work</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 border-border/60 border-t pt-4">
                <Link
                  className="inline-flex items-center gap-1.5 font-body text-xs font-semibold uppercase tracking-widest text-accent transition-colors hover:text-primary-800"
                  href="/admissions"
                >
                  <span>Apply for This Stream</span>
                  <Icon className="size-3.5" icon={ArrowRightIcon} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
