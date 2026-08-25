import { Counter } from "@/components/motion/counter";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { SectionHeader } from "@/components/shared/section-header";
import type { ContentImage, SectionCopy, Stat } from "@/lib/content";
import { CollegeLifeBand } from "./college-life-band";

export function Stats({
  poster = null,
  section,
  stats,
}: {
  poster?: ContentImage | null;
  section: SectionCopy;
  stats: readonly Stat[];
}) {
  const rows = stats.filter((stat) => stat.placement === "stats");

  if (rows.length === 0) return null;

  return (
    <section className="field-brand gutter-x section-y" id="stats">
      <div className="mx-auto max-w-page">
        <SectionHeader
          description={section.standfirst}
          eyebrow={section.heading}
          layout="split"
          title={section.eyebrow ?? "NAMI in numbers"}
        />

        <div
          className={
            poster === null
              ? "mt-12 lg:mt-16"
              : "mt-12 grid grid-cols-1 gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-12 lg:items-center"
          }
        >
          <div className={poster === null ? "" : "lg:col-span-7"}>
            <Reveal
              className={
                poster === null
                  ? "grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4"
                  : "grid grid-cols-2 gap-x-6 gap-y-6 sm:gap-x-8 sm:gap-y-8 lg:grid-cols-3"
              }
              stagger={0.08}
            >
              {rows.map((stat) => (
                <RevealItem key={stat.id}>
                  <p className="font-display text-3xl font-normal tracking-tight text-ink sm:text-4xl lg:text-5xl">
                    <Counter suffix={stat.suffix ?? ""} value={stat.value} />
                  </p>
                  <p className="mt-1.5 font-body text-xs sm:text-sm text-ink-muted">
                    {stat.label}
                  </p>
                </RevealItem>
              ))}
            </Reveal>
          </div>

          {poster === null ? null : (
            <div className="lg:col-span-5">
              <CollegeLifeBand poster={poster} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
