import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Eyebrow, P, Standfirst } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

export type ProgrammeModule = {
  readonly code: string;
  readonly title: string;
};

export type ProgrammeStage = {
  readonly key: string;
  readonly label: string;
  readonly note: string | null;
  readonly modules: readonly ProgrammeModule[];
};

export type BachelorsProgramme = {
  readonly key: string;
  readonly qualification: string;
  readonly title: string;
  readonly awardingBody: string;
  readonly startingFrom: string | null;
  readonly format: string | null;
  readonly summary: readonly string[];
  readonly entryLabel: string;
  readonly entry: readonly string[];
  readonly careersLabel: string;
  readonly careers: string | null;
  readonly pendingNote: string | null;
  readonly stages: readonly ProgrammeStage[];
};

export type BachelorsProgrammesCopy = {
  readonly eyebrow: string;
  readonly heading: string;
  readonly standfirst: string;
  readonly offerNote: string;
  readonly awardedLabel: string;
  readonly startingLabel: string;
  readonly pendingLabel: string;
  readonly items: readonly BachelorsProgramme[];
};

function ProgrammeStageColumn({ stage }: { readonly stage: ProgrammeStage }) {
  return (
    <div>
      <Eyebrow>{stage.label}</Eyebrow>

      <ul className="mt-5 border-t border-border">
        {stage.modules.map((unit) => (
          <li
            className="flex gap-4 border-b border-border py-3"
            key={`${stage.key}-${unit.code}`}
          >
            <span className="w-20 shrink-0 font-body text-xs tracking-widest text-ink-muted uppercase">
              {unit.code}
            </span>
            <span className="font-body text-sm text-ink">{unit.title}</span>
          </li>
        ))}
      </ul>

      {stage.note === null ? null : (
        <p className="mt-4 font-body text-sm text-pretty text-ink-muted">
          {stage.note}
        </p>
      )}
    </div>
  );
}

export function BachelorsProgrammes({
  copy,
}: {
  readonly copy: BachelorsProgrammesCopy;
}) {
  return (
    <section className="gutter-x section-y" id="programmes">
      <div className="mx-auto max-w-page">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-6">
            <Reveal>
              <Eyebrow>{copy.eyebrow}</Eyebrow>
            </Reveal>

            <SplitText
              as="h2"
              className="mt-4 font-display text-5xl font-normal text-balance text-ink"
            >
              {copy.heading}
            </SplitText>
          </div>

          <Reveal
            className="mt-8 flex max-w-xl flex-col gap-4 lg:col-span-5 lg:col-start-8 lg:mt-0 lg:self-end"
            delay={0.15}
          >
            <Standfirst>{copy.standfirst}</Standfirst>
            <P>{copy.offerNote}</P>
          </Reveal>
        </div>

        <Reveal className="mt-14 lg:mt-20" delay={0.2}>
          <Accordion multiple={false}>
            {copy.items.map((programme) => (
              <AccordionItem key={programme.key} value={programme.key}>
                <AccordionTrigger className="items-start gap-8 py-8 lg:py-10">
                  <span className="flex flex-1 flex-col gap-3 md:flex-row md:items-baseline md:justify-between md:gap-8">
                    <span className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-5">
                      <Eyebrow as="span">{programme.qualification}</Eyebrow>
                      <span className="font-display text-4xl font-normal text-ink transition-colors duration-200 group-hover:text-accent lg:text-5xl">
                        {programme.title}
                      </span>
                    </span>

                    <span className="flex flex-col gap-1 md:items-end md:text-end">
                      <span className="font-body text-sm text-ink">
                        {`${copy.awardedLabel} ${programme.awardingBody}`}
                      </span>
                      {programme.format === null ? null : (
                        <span className="font-body text-sm text-ink-muted">
                          {programme.format}
                        </span>
                      )}
                      {programme.startingFrom === null ? null : (
                        <Eyebrow as="span">
                          {`${copy.startingLabel} ${programme.startingFrom}`}
                        </Eyebrow>
                      )}
                    </span>
                  </span>
                </AccordionTrigger>

                <AccordionPanel className="pe-0 pb-12 lg:pb-16">
                  <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-10">
                    <div
                      className={cn(
                        "flex flex-col gap-8",
                        programme.stages.length === 0
                          ? "lg:col-span-6"
                          : "lg:col-span-4",
                      )}
                    >
                      <div className="flex flex-col gap-4">
                        {programme.summary.map((paragraph) => (
                          <P key={paragraph.slice(0, 40)}>{paragraph}</P>
                        ))}
                      </div>

                      {programme.entry.length === 0 ? null : (
                        <div className="border-t border-border pt-5">
                          <Eyebrow>{programme.entryLabel}</Eyebrow>
                          <ul className="mt-4 flex flex-col gap-2">
                            {programme.entry.map((requirement) => (
                              <li
                                className="font-body text-sm text-pretty text-ink-muted"
                                key={requirement.slice(0, 40)}
                              >
                                {requirement}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {programme.careers === null ? null : (
                        <div className="border-t border-border pt-5">
                          <Eyebrow>{programme.careersLabel}</Eyebrow>
                          <p className="mt-4 font-body text-sm text-pretty text-ink-muted">
                            {programme.careers}
                          </p>
                        </div>
                      )}
                    </div>

                    {programme.stages.length === 0 ? (
                      programme.pendingNote === null ? null : (
                        <div className="border-t border-border pt-5 lg:col-span-5 lg:col-start-8">
                          <Eyebrow>{copy.pendingLabel}</Eyebrow>
                          <p className="mt-4 font-body text-sm text-pretty text-ink-muted">
                            {programme.pendingNote}
                          </p>
                        </div>
                      )
                    ) : (
                      <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:col-span-7 lg:col-start-6 xl:grid-cols-3">
                        {programme.stages.map((stage) => (
                          <ProgrammeStageColumn key={stage.key} stage={stage} />
                        ))}
                      </div>
                    )}
                  </div>
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
