import { Reveal, RevealItem } from "@/components/motion/reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/components/ui/tabs";
import { P } from "@/components/ui/typography";

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
  readonly overlapNote: string;
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

function GroupSubjects({
  copy,
  group,
  stream,
}: {
  readonly copy: CollegeSubjectsCopy;
  readonly group: SubjectGroup;
  readonly stream: CollegeSubjectStream;
}) {
  return (
    // biome-ignore lint/a11y/noRedundantRoles: Tailwind preflight's list-style:none drops the implicit list role in Safari
    <ul className="flex flex-col gap-2 sm:gap-2.5" role="list">
      {stream.subjects
        .filter((subject) => subject.groups.includes(group.key))
        .map((subject) => (
          <li
            className="font-display text-base sm:text-lg font-normal text-ink flex items-center justify-between"
            key={subject.name}
          >
            <span>{subject.name}</span>
            {subject.compulsory ? (
              <span className="rounded-full bg-[#E9EC6B]/30 px-2.5 py-0.5 text-[11px] font-semibold text-[#5A5C00] border border-[#E9EC6B]/60">
                {copy.compulsoryLabel}
              </span>
            ) : null}
          </li>
        ))}
    </ul>
  );
}

function StreamCard({
  copy,
  stream,
}: {
  readonly copy: CollegeSubjectsCopy;
  readonly stream: CollegeSubjectStream;
}) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-surface-raised p-5 sm:p-6 lg:p-7">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-2xl font-normal text-ink sm:text-3xl">
          {stream.label}
        </h3>
        <span className="rounded-full bg-[#88DBDF]/25 px-2.5 py-0.5 text-[11px] font-semibold text-[#135A5D] border border-[#88DBDF]/40 uppercase tracking-wider">
          A-Level Stream
        </span>
      </div>

      <Tabs className="mt-4 flex-1" defaultValue={stream.groups[0]?.key}>
        <TabsList aria-label={stream.label} className="gap-6 sm:gap-8">
          {stream.groups.map((group) => (
            <TabsTab
              className="py-3 font-display text-lg sm:text-xl lg:text-2xl font-medium text-ink-muted transition-all duration-200 hover:text-ink data-active:text-[#BD1B21] data-active:font-semibold"
              key={group.key}
              value={group.key}
            >
              {group.label}
            </TabsTab>
          ))}
        </TabsList>

        {stream.groups.map((group) => (
          <TabsPanel className="pt-4 sm:pt-5" key={group.key} value={group.key}>
            <GroupSubjects copy={copy} group={group} stream={stream} />
          </TabsPanel>
        ))}
      </Tabs>

      <div className="mt-6 border-t border-border/60 pt-4">
        <P className="text-xs sm:text-sm text-ink-muted">
          {stream.minimumNote}
        </P>
        <P className="mt-1.5 text-xs sm:text-sm text-ink-muted">
          {stream.overlapNote}
        </P>
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

        <Reveal
          className="mt-8 grid gap-6 sm:mt-10 lg:mt-12 lg:grid-cols-2 lg:gap-8"
          stagger={0.08}
          y={16}
        >
          {copy.streams.map((stream) => (
            <RevealItem key={stream.key}>
              <StreamCard copy={copy} stream={stream} />
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
