import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Icon } from "@/components/ui/icon";
import { Eyebrow, P, Standfirst } from "@/components/ui/typography";
import { CheckIcon } from "@/lib/icons";

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

function SubjectGroupHeader({
  groups,
}: {
  readonly groups: readonly SubjectGroup[];
}) {
  return (
    <div
      aria-hidden="true"
      className="flex items-baseline justify-between gap-4"
      data-reveal-item=""
    >
      <span />

      <p className="flex shrink-0 gap-3 font-body text-sm font-medium tracking-widest text-ink-muted uppercase sm:gap-4">
        {groups.map((group) => (
          <span className="w-10 text-right" key={group.key}>
            {group.short}
          </span>
        ))}
      </p>
    </div>
  );
}

function SubjectRow({
  copy,
  groups,
  subject,
}: {
  readonly copy: CollegeSubjectsCopy;
  readonly groups: readonly SubjectGroup[];
  readonly subject: CollegeSubject;
}) {
  return (
    <li
      className="flex items-baseline justify-between gap-4 py-3 sm:py-4"
      data-reveal-item=""
    >
      <p className="min-w-0 font-display text-2xl font-normal text-ink">
        {subject.name}
        {subject.compulsory ? (
          <span className="ml-2 align-middle font-body text-xs font-medium tracking-widest text-accent uppercase">
            {copy.compulsoryLabel}
          </span>
        ) : null}
      </p>

      <p className="flex shrink-0 gap-3 font-body text-sm font-medium tracking-widest text-accent uppercase sm:gap-4">
        {groups.map((group) => {
          const offered = subject.groups.includes(group.key);

          return (
            <span className="w-10 text-right" key={group.key}>
              {offered ? (
                <Icon
                  className="inline-block size-4 align-middle text-accent"
                  icon={CheckIcon}
                />
              ) : (
                <span
                  aria-hidden="true"
                  className="font-normal text-ink-muted/50"
                >
                  &mdash;
                </span>
              )}
              <span className="sr-only">
                {offered
                  ? copy.offeredLabel(group.label)
                  : copy.notOfferedLabel(group.label)}
              </span>
            </span>
          );
        })}
      </p>
    </li>
  );
}

export function CollegeSubjects({
  copy,
}: {
  readonly copy: CollegeSubjectsCopy;
}) {
  return (
    <section className="gutter-x section-y" id="subjects">
      <div className="mx-auto flex max-w-page flex-col gap-14 lg:gap-20">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <Reveal>
              <Eyebrow>{copy.eyebrow}</Eyebrow>
            </Reveal>

            <SplitText
              as="h2"
              className="max-w-3xl font-display text-5xl font-normal text-balance text-ink"
            >
              {copy.heading}
            </SplitText>
          </div>

          <Reveal className="flex max-w-xl flex-col gap-4" delay={0.15}>
            <Standfirst>{copy.standfirst}</Standfirst>
            <P>{copy.compulsoryNote}</P>
          </Reveal>
        </div>

        <div className="grid gap-x-10 gap-y-14 md:grid-cols-2">
          {copy.streams.map((stream) => (
            <div
              className="flex flex-col gap-8 border-t border-border-strong pt-6 lg:gap-10 lg:pt-8"
              key={stream.key}
            >
              <SplitText
                as="h3"
                className="font-display text-4xl font-normal text-ink"
              >
                {stream.label}
              </SplitText>

              <Reveal className="flex flex-col gap-3" stagger={0.05} y={24}>
                <SubjectGroupHeader groups={stream.groups} />

                {/* biome-ignore lint/a11y/noRedundantRoles: Tailwind preflight's list-style:none drops the implicit list role in Safari */}
                <ul aria-label={stream.listLabel} role="list">
                  {stream.subjects.map((subject) => (
                    <SubjectRow
                      copy={copy}
                      groups={stream.groups}
                      key={subject.name}
                      subject={subject}
                    />
                  ))}
                </ul>
              </Reveal>

              <Reveal className="flex max-w-lg flex-col gap-4">
                <P>{stream.minimumNote}</P>
                <P>{stream.overlapNote}</P>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
