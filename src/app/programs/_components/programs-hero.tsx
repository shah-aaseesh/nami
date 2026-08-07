import type { Route } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { Display, Eyebrow, Standfirst } from "@/components/ui/typography";
import type { AcademicLevel } from "@/lib/content";

export function ProgramsHero({
  levels,
}: {
  readonly levels: readonly AcademicLevel[];
}) {
  const trail = [
    { name: "Home", path: "/" },
    { name: "Academic Programs", path: "/programs" },
  ];

  return (
    <section className="gutter-x section-y pb-10 lg:pb-16">
      <div className="mx-auto max-w-page">
        <Breadcrumb trail={trail} />

        <div className="mt-10 lg:mt-16 lg:grid lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-7">
            <Eyebrow>Academics at NAMI</Eyebrow>
            <Display className="mt-5">
              World-Class Pathways, School to Masters
            </Display>
          </div>
          <div className="mt-8 lg:col-span-5 lg:mt-0 lg:flex lg:flex-col lg:justify-between">
            <Standfirst>
              Discover multi-disciplinary academic programmes offered in
              collaboration with leading international and national bodies,
              including The University of Northampton UK, Cambridge CAIE, and
              NEB Nepal.
            </Standfirst>

            <div className="mt-8 flex flex-wrap gap-2 pt-2">
              {levels.map((lvl) => (
                <Link
                  className="rounded-full border border-border bg-card px-4 py-2 font-body text-xs font-medium uppercase tracking-widest text-ink transition-colors hover:border-accent hover:text-accent"
                  href={`/programs/${lvl.slug}` as Route}
                  key={lvl.id}
                >
                  {lvl.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
