import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { Eyebrow, H3, H4, P } from "@/components/ui/typography";
import type { AcademicLevel } from "@/lib/content";
import { paragraphsOf } from "@/lib/content";
import { ArrowRightIcon, CheckIcon, LocationIcon } from "@/lib/icons";

export function ProgramsLevelsGrid({
  levels,
  campuses,
}: {
  readonly levels: readonly AcademicLevel[];
  readonly campuses: ReadonlyMap<string, string>;
}) {
  return (
    <section className="gutter-x section-y bg-neutral-100" id="levels-grid">
      <div className="mx-auto max-w-page">
        <div className="max-w-2xl">
          <Eyebrow>Four Academic Pillars</Eyebrow>
          <H3 className="mt-4">Explore Our Unified Program Levels</H3>
          <P className="mt-4">
            From foundational school education to UK undergraduate and
            postgraduate degrees, NAMI provides structured progression at every
            stage.
          </P>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-10">
          {levels.map((level, idx) => {
            const paragraphs = paragraphsOf(level.summary);
            const lead = paragraphs[0] ?? "";
            const campusName = campuses.get(level.campusSlug) ?? "Kathmandu";

            return (
              <article
                className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-md lg:p-8"
                id={level.slug}
                key={level.id}
              >
                <div>
                  {level.image === null ? null : (
                    <figure className="relative aspect-[16/9] overflow-hidden rounded-xl bg-muted">
                      <Image
                        alt={level.image.alt}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        height={level.image.height}
                        sizes="(min-width: 1024px) 45vw, (min-width: 768px) 50vw, 100vw"
                        src={level.image.src}
                        width={level.image.width}
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute top-4 right-4 rounded-full border border-white/20 bg-black/60 px-3 py-1 font-body text-xs text-white backdrop-blur-md">
                        Level {String(idx + 1).padStart(2, "0")}
                      </div>
                    </figure>
                  )}

                  <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-border/60 border-b pb-4">
                    <span className="font-body text-xs font-semibold uppercase tracking-wider text-accent">
                      {level.stage}
                    </span>
                    <span className="flex items-center gap-1 font-body text-xs text-ink-muted">
                      <Icon className="size-3.5" icon={LocationIcon} />
                      {campusName}
                    </span>
                  </div>

                  <H4 className="mt-4 text-ink transition-colors group-hover:text-accent">
                    {level.title}
                  </H4>

                  <P className="mt-3 text-sm leading-relaxed">{lead}</P>

                  <div className="mt-6">
                    <span className="font-body text-xs font-medium uppercase tracking-widest text-ink">
                      Key Highlights:
                    </span>
                    <ul className="mt-3 space-y-2">
                      {level.highlights.slice(0, 3).map((item) => (
                        <li
                          className="flex items-start gap-2 text-ink-muted text-xs"
                          key={item}
                        >
                          <Icon
                            className="mt-0.5 size-4 shrink-0 text-accent"
                            icon={CheckIcon}
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 border-border/60 border-t pt-6">
                  <Link
                    className="inline-flex items-center gap-2 font-body text-xs font-semibold uppercase tracking-widest text-accent transition-all group-hover:translate-x-1"
                    href={`/programs/${level.slug}` as Route}
                  >
                    <span>View Level Detail & Courses</span>
                    <Icon className="size-4" icon={ArrowRightIcon} />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
