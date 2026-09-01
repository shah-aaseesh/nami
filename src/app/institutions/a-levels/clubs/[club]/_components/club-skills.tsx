import { Reveal, RevealItem } from "@/components/motion/reveal";
import { Eyebrow, H2, P } from "@/components/ui/typography";
import type { ALevelsClub } from "@/app/institutions/a-levels/_components/a-levels-clubs-copy";

export function ClubSkills({ club }: { readonly club: ALevelsClub }) {
  return (
    <section className="gutter-x section-y border-t border-border">
      <div className="mx-auto max-w-page">
        <div className="max-w-2xl">
          <Eyebrow>Student Growth & Outcomes</Eyebrow>
          <H2 className="mt-3">Skills that extend beyond the classroom.</H2>
          <P className="mt-4 text-ink-muted">
            Participation in club initiatives instills vital practical,
            interpersonal, and cognitive strengths that prepare students for
            lifelong academic and professional success.
          </P>
        </div>

        <Reveal
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8"
          stagger={0.08}
          y={24}
        >
          {club.skillsDeveloped.map((skill, index) => (
            <RevealItem className="h-full" key={skill.title}>
              <div className="flex h-full flex-col justify-between rounded-2xl border border-border/80 bg-surface p-6 sm:p-7 shadow-xs">
                <div>
                  <span className="font-display text-2xl font-bold text-accent">
                    0{index + 1}
                  </span>
                  <h3 className="mt-4 font-display text-lg font-normal text-ink">
                    {skill.title}
                  </h3>
                  <P className="mt-2 font-body text-xs leading-relaxed text-ink/75 sm:text-sm">
                    {skill.description}
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
