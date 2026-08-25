import { SectionHeader } from "@/components/shared/section-header";
import { H4, H5, P } from "@/components/ui/typography";
import {
  CollegeCambridgeHold,
  CollegeCambridgeStack,
} from "./college-cambridge-stack";

export type CambridgeProposition = {
  readonly title: string;
  readonly body: string;
};

export type CollegeCambridgeCopy = {
  readonly eyebrow: string;
  readonly heading: string;
  readonly standfirst: string;
  readonly propositions: readonly CambridgeProposition[];
};

export function CollegeCambridge({
  copy,
}: {
  readonly copy: CollegeCambridgeCopy;
}) {
  return (
    <section className="field-brand gutter-x section-y" id="cambridge">
      <div className="mx-auto max-w-page lg:grid lg:grid-cols-12 lg:gap-x-10">
        <CollegeCambridgeHold className="lg:col-span-5">
          <SectionHeader
            description={copy.standfirst}
            eyebrow={copy.heading}
            layout="stacked"
            title={copy.eyebrow ?? "Why Cambridge"}
          />
        </CollegeCambridgeHold>

        <CollegeCambridgeStack className="mt-12 flex flex-col gap-6 lg:col-span-6 lg:col-start-7 lg:mt-0">
          {copy.propositions.map((proposition, index) => (
            <li
              className="field-blush relative rounded-3xl border border-border-strong p-6 sm:p-8 lg:p-10"
              data-pinned-panel=""
              key={proposition.title}
            >
              <H4 as="p" className="text-accent">
                {String(index + 1).padStart(2, "0")}
              </H4>
              <H5 as="h3" className="mt-5 text-ink">
                {proposition.title}
              </H5>
              <P className="mt-3">{proposition.body}</P>
            </li>
          ))}
        </CollegeCambridgeStack>
      </div>
    </section>
  );
}
