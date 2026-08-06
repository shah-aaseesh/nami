import { Reveal } from "@/components/motion/reveal";
import { H4, P } from "@/components/ui/typography";
import { content } from "@/lib/content";
import { DocumentRow } from "./document-row";
import { paragraphsOf } from "./paragraphs";

const PETALS: readonly string[] = [
  "lg:col-span-5 lg:col-start-1",
  "lg:col-span-4 lg:col-start-8",
  "lg:col-span-4 lg:col-start-2",
  "lg:col-span-5 lg:col-start-7",
  "lg:col-span-5 lg:col-start-3",
];

export async function Emblem() {
  const [about, institution] = await Promise.all([
    content.getAboutCopy(),
    content.getInstitution(),
  ]);

  const section = about.sections.emblem;
  const story = paragraphsOf(institution.emblemStory);
  const lead = story[0];
  const rest = story.slice(1);

  return (
    <section className="field-brand gutter-x section-y">
      <div className="mx-auto max-w-page">
        <h2 className="max-w-3xl font-display text-6xl font-normal text-balance">
          {section.heading}
        </h2>

        {lead === undefined ? null : (
          <DocumentRow className="mt-12 lg:mt-20" measure="wide">
            <p className="font-display text-4xl text-balance">{lead}</p>
          </DocumentRow>
        )}

        {rest.length === 0 ? null : (
          <DocumentRow className="mt-10 lg:mt-14">
            <div className="flex flex-col gap-6">
              {rest.map((paragraph) => (
                <P className="text-lg text-ink" key={paragraph}>
                  {paragraph}
                </P>
              ))}
            </div>
          </DocumentRow>
        )}

        {institution.values.length === 0 ? null : (
          <Reveal className="mt-24 lg:mt-36" stagger={0.09}>
            <dl className="grid gap-x-12 gap-y-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-y-20">
              {institution.values.map((value, index) => (
                <div
                  className={PETALS[index]}
                  data-reveal-item=""
                  key={value.id}
                >
                  <H4 as="dt">{value.name}</H4>
                  <P as="dd" className="mt-3">
                    {value.meaning}
                  </P>
                </div>
              ))}
            </dl>
          </Reveal>
        )}
      </div>
    </section>
  );
}
