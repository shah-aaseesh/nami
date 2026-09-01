import type { ALevelsClub } from "@/app/institutions/a-levels/_components/a-levels-clubs-copy";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { H3, P } from "@/components/ui/typography";

export function ClubActivities({ club }: { readonly club: ALevelsClub }) {
  return (
    <section className="gutter-x section-y border-t border-border">
      <div className="mx-auto max-w-page">
        <SectionHeader
          description="A dynamic calendar of recurring clinics, workshops, inter-school championships, and major exhibitions."
          eyebrow="Activities & Flagship Events"
          layout="stacked"
          title="What Members Experience"
        />

        <Reveal
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 lg:gap-8"
          stagger={0.08}
          y={24}
        >
          {club.keyActivities.map((activity, index) => (
            <RevealItem className="h-full" key={activity.title}>
              <div className="flex h-full flex-col justify-between rounded-3xl border border-border bg-white p-7 sm:p-8 shadow-xs transition-shadow duration-300 hover:shadow-md">
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="rounded-full bg-[#FF6720]/15 text-[#FF6720] border border-[#FF6720]/30 px-3 py-1 font-body text-xs font-semibold">
                      {activity.tag}
                    </span>
                    <span className="font-display text-sm font-bold text-ink-muted">
                      0{index + 1}
                    </span>
                  </div>

                  <H3
                    as="h3"
                    className="mt-5 font-display text-xl font-normal text-ink sm:text-2xl"
                  >
                    {activity.title}
                  </H3>

                  <P className="mt-3 font-body text-sm leading-relaxed text-ink/80">
                    {activity.description}
                  </P>
                </div>
              </div>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
