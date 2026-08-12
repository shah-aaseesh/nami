import { Reveal, RevealItem } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/components/ui/tabs";
import { Eyebrow, P, Standfirst } from "@/components/ui/typography";

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
  readonly compulsoryNote: string;
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
    <ul className="flex flex-col gap-4" role="list">
      {stream.subjects
        .filter((subject) => subject.groups.includes(group.key))
        .map((subject) => (
          <li
            className="font-display text-xl font-normal text-ink"
            key={subject.name}
          >
            {subject.name}
            {subject.compulsory ? (
              <span className="ml-2 align-middle font-body text-xs font-medium tracking-widest text-accent uppercase">
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
    <div className="flex h-full flex-col rounded-3xl border border-border bg-surface-raised p-6 sm:p-8 lg:p-10">
      <h3 className="font-display text-3xl font-normal text-ink lg:text-4xl">
        {stream.label}
      </h3>

      <Tabs className="mt-6 flex-1" defaultValue={stream.groups[0]?.key}>
        <TabsList aria-label={stream.label}>
          {stream.groups.map((group) => (
            <TabsTab className="text-base" key={group.key} value={group.key}>
              {group.label}
            </TabsTab>
          ))}
        </TabsList>

        {stream.groups.map((group) => (
          <TabsPanel key={group.key} value={group.key}>
            <GroupSubjects copy={copy} group={group} stream={stream} />
          </TabsPanel>
        ))}
      </Tabs>

      <div className="mt-10 border-t border-border pt-6">
        <P className="text-sm">{stream.minimumNote}</P>
        <P className="mt-3 text-sm">{stream.overlapNote}</P>
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
        <Reveal className="lg:grid lg:grid-cols-12 lg:gap-x-10" stagger={0.08}>
          <div className="lg:col-span-6">
            <RevealItem>
              <Eyebrow>{copy.eyebrow}</Eyebrow>
            </RevealItem>

            <SplitText
              as="h2"
              className="mt-4 font-display text-5xl font-normal text-balance text-ink"
            >
              {copy.heading}
            </SplitText>
          </div>

          <RevealItem className="mt-8 max-w-xl lg:col-span-5 lg:col-start-8 lg:mt-0 lg:self-end">
            <Standfirst>{copy.standfirst}</Standfirst>
            <P className="mt-6 border-t border-border pt-5 text-sm">
              {copy.compulsoryNote}
            </P>
          </RevealItem>
        </Reveal>

        <Reveal
          className="mt-14 grid gap-6 lg:mt-20 lg:grid-cols-2 lg:gap-8"
          stagger={0.12}
          y={24}
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
