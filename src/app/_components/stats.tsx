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
              ? "mt-8 lg:mt-12"
              : "mt-8 lg:mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10 xl:gap-12 lg:items-stretch"
          }
        >
          <div
            className={
              poster === null
                ? ""
                : "lg:col-span-7 flex flex-col justify-center"
            }
          >
            <Reveal
              className={
                poster === null
                  ? "grid grid-cols-2 gap-4 sm:gap-6 sm:grid-cols-3 lg:grid-cols-4"
                  : "grid grid-cols-2 gap-4 sm:gap-5 sm:grid-cols-3"
              }
              stagger={0.06}
            >
              {rows.map((stat) => (
                <RevealItem
                  key={stat.id}
                  className="flex flex-col justify-between rounded-2xl bg-white/6 p-4 sm:p-5 lg:p-6 border border-white/12 backdrop-blur-xs transition-all hover:bg-white/10 hover:border-white/20 shadow-xs"
                >
                  <p className="font-display text-3xl font-normal tracking-tight text-white sm:text-4xl lg:text-5xl">
                    <Counter suffix={stat.suffix ?? ""} value={stat.value} />
                  </p>
                  <p className="mt-2.5 font-body text-xs sm:text-sm text-white/85 leading-snug">
                    {stat.label}
                  </p>
                </RevealItem>
              ))}
            </Reveal>
          </div>

          {poster === null ? null : (
            <div className="lg:col-span-5 flex items-center justify-center">
              <CollegeLifeBand poster={poster} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
