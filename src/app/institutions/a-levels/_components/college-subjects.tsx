import { Reveal, RevealItem } from "@/components/motion/reveal";
import { SectionHeader } from "@/components/shared/section-header";

export type SubjectGroupKey = "s1" | "s2" | "ns1" | "ns2";

export type SubjectGroup = {
  readonly key: SubjectGroupKey;
  readonly short: string;
  readonly label: string;
};

export type CollegeSubject = {
  readonly name: string;
  readonly compulsory: boolean;
  readonly groups: readonly SubjectGroupKey[];
};

export type CollegeSubjectStream = {
  readonly key: string;
  readonly label: string;
  readonly minimumNote: string;
  readonly overlapNote?: string;
  readonly listLabel: string;
  readonly groups: readonly SubjectGroup[];
  readonly subjects: readonly CollegeSubject[];
};

export type CollegeSubjectsCopy = {
  readonly eyebrow: string;
  readonly heading: string;
  readonly standfirst: string;
  readonly compulsoryLabel: string;
  readonly streams: readonly CollegeSubjectStream[];
  readonly offeredLabel: (group: string) => string;
  readonly notOfferedLabel: (group: string) => string;
};

function PathwayCard({
  group,
  stream,
  copy,
}: {
  readonly group: SubjectGroup;
  readonly stream: CollegeSubjectStream;
  readonly copy: CollegeSubjectsCopy;
}) {
  const groupSubjects = stream.subjects.filter((s) =>
    s.groups.includes(group.key),
  );
  const compulsorySubject = groupSubjects.find((s) => s.compulsory);
  const electiveSubjects = groupSubjects.filter((s) => !s.compulsory);

  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-border/80 bg-surface-raised p-6 sm:p-8 transition-colors duration-200 hover:border-neutral-400 shadow-2xs">
      <div>
        {/* Pathway Header */}
        <div className="border-b border-border/70 pb-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
            {stream.label}
          </span>
          <h4 className="mt-1 font-display text-xl sm:text-2xl font-bold tracking-tight text-ink">
            {group.label}
          </h4>
        </div>

        {/* Subjects Roster */}
        <div className="mt-5 space-y-4">
          {/* Compulsory Subject */}
          {compulsorySubject && (
            <div className="flex items-center justify-between border-b border-border/50 py-2.5">
              <span className="font-display text-base sm:text-lg font-semibold text-ink">
                {compulsorySubject.name}
              </span>
              <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-accent border border-accent/20">
                {copy.compulsoryLabel}
              </span>
            </div>
          )}

          {/* Elective Subjects */}
          <div className="pt-2">
            <span className="mb-3 block text-xs font-semibold uppercase tracking-wider text-ink-muted">
              Electives
            </span>
            <ul className="grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
              {electiveSubjects.map((subject) => (
                <li
                  key={subject.name}
                  className="flex items-center gap-2.5 font-display text-base font-normal text-ink"
                >
                  <span className="size-1.5 shrink-0 rounded-full bg-neutral-400" />
                  <span>{subject.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Requirement Footnote */}
      <div className="mt-8 border-t border-border/60 pt-4">
        <p className="font-body text-xs text-ink-muted leading-relaxed">
          <strong className="font-medium text-ink">Requirement:</strong>{" "}
          {stream.minimumNote}
        </p>
      </div>
    </div>
  );
}

export function CollegeSubjects({
  copy,
}: {
  readonly copy: CollegeSubjectsCopy;
}) {
  return (
    <section className="gutter-x section-y" id="subjects">
      <div className="mx-auto max-w-page">
        <SectionHeader
          eyebrow={copy.heading}
          title={copy.eyebrow ?? "Subjects"}
          description={copy.standfirst}
        />

        <div className="mt-10 space-y-12 sm:mt-12 sm:space-y-16">
          {copy.streams.map((stream) => (
            <div key={stream.key}>
              {/* Stream Title with Hairline */}
              <div className="mb-6 flex items-center gap-4 sm:mb-8">
                <h3 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                  {stream.label}
                </h3>
                <span className="h-px flex-1 bg-border/80" />
              </div>

              {/* Pathway Cards */}
              <Reveal
                className="grid gap-6 sm:grid-cols-2 lg:gap-8"
                stagger={0.08}
                y={16}
              >
                {stream.groups.map((group) => (
                  <RevealItem key={group.key}>
                    <PathwayCard copy={copy} group={group} stream={stream} />
                  </RevealItem>
                ))}
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
