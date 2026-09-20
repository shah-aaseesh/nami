import { Reveal, RevealItem } from "@/components/motion/reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { Icon } from "@/components/ui/icon";
import { H4, P } from "@/components/ui/typography";
import { CheckIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

export const educationalApproach = [
  {
    title: "Learning Through Exploration",
    description:
      "Students learn by asking questions, investigating ideas, researching, experimenting, and discovering connections.",
  },
  {
    title: "Learning Through Collaboration",
    description:
      "Students work with peers, teachers, parents, and the wider community to develop communication, teamwork, and interpersonal skills.",
  },
  {
    title: "Learning Through Application",
    description:
      "Learning is connected to practical experiences and real-life situations so that students can understand how knowledge can be used beyond the classroom.",
  },
  {
    title: "Developing Critical Thinkers",
    description:
      "Students are encouraged to analyse, reason, question, solve problems, and make thoughtful decisions.",
  },
  {
    title: "Encouraging Creativity",
    description:
      "Students are given opportunities to express ideas, experiment, create, and explore different ways of approaching challenges.",
  },
  {
    title: "Building Confidence",
    description:
      "Students are encouraged to share their ideas, participate actively, learn from mistakes, and take increasing responsibility for their learning.",
  },
  {
    title: "Inclusion and Belonging",
    description:
      "We recognise that every student is different. We strive to create a caring environment where students with different interests, learning needs, backgrounds, and abilities feel valued and included.",
  },
  {
    title: "Intrinsic Motivation",
    description: "Nurturing internal motivation for learning.",
  },
] as const;

export const schoolValues = [
  {
    name: "Respect",
    meaning:
      "We respect ourselves, others, different perspectives, and our shared environment.",
    color: "bg-[#BD1B21]/10 text-[#BD1B21] border-[#BD1B21]/20",
  },
  {
    name: "Kindness",
    meaning:
      "We encourage students to treat others with care and consideration.",
    color: "bg-[#E85296]/15 text-[#C2185B] border-[#E85296]/30",
  },
  {
    name: "Honesty",
    meaning:
      "We value integrity and encourage students to be truthful and responsible.",
    color: "bg-[#F7CD00]/20 text-neutral-900 border-[#F7CD00]/40",
  },
  {
    name: "Responsibility",
    meaning:
      "We help students understand that their choices and actions matter.",
    color: "bg-[#9CC21A]/20 text-[#284540] border-[#9CC21A]/40",
  },
  {
    name: "Inclusion",
    meaning:
      "We celebrate differences and work to ensure that every student feels valued and included.",
    color: "bg-[#33B8C7]/15 text-[#1B6F7B] border-[#33B8C7]/30",
  },
  {
    name: "Curiosity",
    meaning: "We encourage students to question, explore, and keep learning.",
    color: "bg-[#BF6BA6]/15 text-[#882F6F] border-[#BF6BA6]/30",
  },
] as const;

export function SchoolApproachValuesSection({
  id = "approach-values",
}: {
  readonly id?: string;
}) {
  return (
    <section
      className="gutter-x section-y border-t border-[#D3E2DB] bg-gradient-to-b from-[#F1F6F4] via-[#E8F1EC] to-[#F1F6F4] relative overflow-hidden"
      id={id}
    >
      {/* Decorative ambient glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -right-32 size-[500px] rounded-full bg-[#284540]/8 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 -left-20 size-96 rounded-full bg-[#9CC21A]/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-page">
        {/* Educational Approach */}
        <div>
          <SectionHeader
            description="At NAMI International School, students are active participants in their learning. Teachers guide, support, and challenge students while creating opportunities to explore ideas, develop understanding, collaborate, and make meaningful connections."
            layout="split"
            title="Our Educational Approach to Learning"
          />

          <Reveal
            className="mt-8 sm:mt-10 lg:mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
            stagger={0.05}
          >
            {educationalApproach.map((item, index) => {
              const isRed = (Math.floor(index / 4) + (index % 4)) % 2 === 0;

              return (
                <RevealItem key={item.title}>
                  <div
                    className={cn(
                      "h-full rounded-2xl p-5 sm:p-6 transition-all duration-300 shadow-2xs hover:shadow-lg hover:-translate-y-0.5 flex flex-col justify-start border",
                      isRed
                        ? "bg-[#BD1B21] text-white border-[#BD1B21] hover:bg-[#a81419]"
                        : "bg-white text-ink border-[#D3E2DB] hover:border-[#BD1B21]/40",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "flex size-7 shrink-0 items-center justify-center rounded-full",
                          isRed
                            ? "bg-white/20 text-white"
                            : "bg-[#BD1B21]/10 text-[#BD1B21]",
                        )}
                      >
                        <Icon className="size-3.5" icon={CheckIcon} />
                      </div>
                      <H4
                        as="h3"
                        className={cn(
                          "font-display text-base sm:text-lg font-semibold",
                          isRed ? "text-white" : "text-ink",
                        )}
                      >
                        {item.title}
                      </H4>
                    </div>
                    <P
                      className={cn(
                        "mt-3 font-body text-xs sm:text-sm leading-relaxed text-justify [text-align-last:left] [hyphens:auto]",
                        isRed ? "text-white/90" : "text-ink-muted",
                      )}
                    >
                      {item.description}
                    </P>
                  </div>
                </RevealItem>
              );
            })}
          </Reveal>
        </div>

        {/* Our Values */}
        <div className="mt-16 sm:mt-20 lg:mt-24 pt-12 sm:pt-16 border-t border-[#D3E2DB]">
          <SectionHeader
            description="Our school community is guided by core values that shape everyday learning, character formation, and meaningful relationships."
            eyebrow="Guiding Principles"
            layout="split"
            title="Our Values"
          />

          <Reveal
            className="mt-8 sm:mt-10 lg:mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            stagger={0.06}
          >
            {schoolValues.map((val) => (
              <RevealItem key={val.name}>
                <div className="h-full rounded-2xl border border-[#D3E2DB] bg-white p-6 transition-all duration-300 shadow-2xs hover:shadow-lg hover:-translate-y-0.5 hover:border-[#BD1B21]/40 flex flex-col justify-start">
                  <span
                    className={`inline-block self-start rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-wider border shadow-2xs ${val.color}`}
                  >
                    {val.name}
                  </span>
                  <P className="mt-4 font-body text-sm leading-relaxed text-ink/85 text-justify [text-align-last:left] [hyphens:auto]">
                    {val.meaning}
                  </P>
                </div>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
