import { Parallax } from "@/components/motion/parallax";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Eyebrow, P, Standfirst } from "@/components/ui/typography";
import type { Leader, LeadershipProfile, SectionCopy } from "@/lib/content";

function LeaderGroup({
  leaders,
  label,
  columns,
}: {
  leaders: readonly Leader[];
  label: string;
  columns: string;
}) {
  if (leaders.length === 0) return null;

  return (
    <div>
      <p className="mb-8 font-body text-xs font-medium tracking-widest text-accent uppercase">
        {label}
      </p>
      <Reveal className={columns} stagger={0.1}>
        {leaders.map((leader) => (
          <RevealItem className="border-t border-border pt-5" key={leader.id}>
            <p className="mb-1 font-body text-sm font-medium text-ink-muted">
              {leader.title}
            </p>
            <h3 className="font-display text-xl font-normal text-ink">
              {leader.name}
            </h3>
            <P className="mt-3">{leader.brief}</P>
          </RevealItem>
        ))}
      </Reveal>
    </div>
  );
}

export function Leadership({
  leadership,
  section,
}: {
  leadership: LeadershipProfile;
  section: SectionCopy;
}) {
  const all = [
    ...leadership.board,
    ...leadership.management,
    ...leadership.academics,
  ];
  if (all.length === 0) return null;

  return (
    <section className="gutter-x section-y" id="leadership">
      <div className="mx-auto max-w-page">
        <div className="lg:w-7/12">
          {section.eyebrow === null ? null : (
            <Reveal>
              <Eyebrow>{section.eyebrow}</Eyebrow>
            </Reveal>
          )}
          <SplitText
            as="h2"
            className="mt-4 font-display text-4xl font-normal tracking-tight text-ink text-balance lg:text-5xl"
          >
            {section.heading}
          </SplitText>
          {section.standfirst === null ? null : (
            <Reveal className="mt-6" delay={0.2}>
              <Standfirst>{section.standfirst}</Standfirst>
            </Reveal>
          )}
        </div>

        <Parallax className="mt-14 flex flex-col gap-20" speed={1.02}>
          <LeaderGroup
            columns="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-2"
            label="Board of Directors"
            leaders={leadership.board}
          />
          <LeaderGroup
            columns="grid gap-x-8 gap-y-12 sm:grid-cols-1 lg:grid-cols-1"
            label="Management"
            leaders={leadership.management}
          />
          <LeaderGroup
            columns="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
            label="Academic Heads & Principals"
            leaders={leadership.academics}
          />
        </Parallax>
      </div>
    </section>
  );
}
