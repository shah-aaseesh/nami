import { Reveal, RevealItem } from "@/components/motion/reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { H4, P } from "@/components/ui/typography";

export const schoolCollaborators = [
  {
    name: "3Di School",
    tagline: "Design, Software & Emerging Technologies",
    description:
      "Provides a hands-on design and technology platform where students explore creativity, software, and emerging technologies through practical projects.",
    accent: "bg-[#BD1B21]/10 text-[#BD1B21] border-[#BD1B21]/20",
    borderHover: "hover:border-[#BD1B21]/50",
  },
  {
    name: "Play Nepal",
    tagline: "Movement, Focus & Physical Confidence",
    description:
      "Helps students develop focus, physical confidence, teamwork, and active habits through joyful, structured movement while supporting emotional well-being.",
    accent: "bg-[#284540]/10 text-[#284540] border-[#284540]/20",
    borderHover: "hover:border-[#284540]/50",
  },
  {
    name: "UnMath",
    tagline: "Creative & Experiential Mathematics",
    description:
      "Helps students experience mathematics with greater joy and confidence by connecting mathematical concepts to creativity and real-life situations.",
    accent: "bg-[#F7CD00]/20 text-[#BD1B21] border-[#F7CD00]/30",
    borderHover: "hover:border-[#F7CD00]/60",
  },
  {
    name: "Samatva Wellness",
    tagline: "Mindfulness & Holistic Well-Being",
    description:
      "Supports student mental and physical well-being through regular mindfulness sessions, wellness classes, and holistic workshops.",
    accent: "bg-[#9CC21A]/15 text-[#284540] border-[#9CC21A]/30",
    borderHover: "hover:border-[#9CC21A]/60",
  },
] as const;

export function SchoolCollaboratorsSection({
  id = "collaborators",
}: {
  readonly id?: string;
}) {
  return (
    <section
      className="gutter-x section-y border-t border-[#E8E2D2] bg-gradient-to-b from-[#FCFBF7] via-[#F7F3E8] to-[#FCFBF7] relative overflow-hidden"
      id={id}
    >
      {/* Subtle brand glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 -right-20 size-80 rounded-full bg-[#F7CD00]/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 -left-20 size-80 rounded-full bg-[#BD1B21]/5 blur-3xl"
      />

      <div className="relative mx-auto max-w-page">
        <SectionHeader
          description="We collaborate with premier specialized learning partners to complement classroom education and enrich student discovery."
          eyebrow="Partners in Learning"
          layout="split"
          title="Our Learning Collaborators"
        />

        <Reveal
          className="mt-8 sm:mt-10 lg:mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          stagger={0.08}
        >
          {schoolCollaborators.map((collab) => (
            <RevealItem key={collab.name}>
              <div
                className={`flex h-full flex-col justify-between rounded-2xl border border-[#E5DECf] bg-white p-6 transition-all duration-300 shadow-2xs hover:shadow-xl hover:-translate-y-1 ${collab.borderHover}`}
              >
                <div>
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider border ${collab.accent}`}
                  >
                    Partner
                  </span>
                  <H4
                    as="h3"
                    className="mt-4 font-display text-xl font-normal text-ink"
                  >
                    {collab.name}
                  </H4>
                  <p className="mt-1 font-body text-xs font-semibold text-ink-muted uppercase tracking-wider">
                    {collab.tagline}
                  </p>
                  <P className="mt-4 font-body text-sm leading-relaxed text-ink-muted">
                    {collab.description}
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
