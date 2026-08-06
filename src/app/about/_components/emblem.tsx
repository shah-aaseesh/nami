import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { H4, P } from "@/components/ui/typography";
import { content } from "@/lib/content";
import { DocumentRow } from "./document-row";
import { paragraphsOf } from "./paragraphs";

const PETALS: readonly string[] = [
  "lg:col-span-5 lg:col-start-1",
  "lg:col-span-5 lg:col-start-7",
  "lg:col-span-4 lg:col-start-1",
  "lg:col-span-4 lg:col-start-5",
  "lg:col-span-4 lg:col-start-9",
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
    <section className="field-brand relative overflow-hidden gutter-x section-y">
      {/* Decorative Lotus watermark accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-20 size-96 rounded-full bg-white/5 blur-3xl"
      />

      <div className="relative mx-auto max-w-page">
        <SplitText
          as="h2"
          className="max-w-3xl font-display text-5xl font-normal text-balance sm:text-6xl"
        >
          {section.heading}
        </SplitText>

        {lead === undefined ? null : (
          <Reveal delay={0.15}>
            <DocumentRow className="mt-12 lg:mt-20" measure="wide">
              <p className="font-display text-3xl text-balance leading-snug sm:text-4xl">
                {lead}
              </p>
            </DocumentRow>
          </Reveal>
        )}

        {rest.length === 0 ? null : (
          <Reveal delay={0.25}>
            <DocumentRow className="mt-10 lg:mt-14">
              <div className="flex flex-col gap-6">
                {rest.map((paragraph) => (
                  <P
                    className="text-lg leading-relaxed text-white/90"
                    key={paragraph}
                  >
                    {paragraph}
                  </P>
                ))}
              </div>
            </DocumentRow>
          </Reveal>
        )}

        {institution.values.length === 0 ? null : (
          <div className="mt-20 lg:mt-28">
            <h3 className="font-body text-xs font-semibold uppercase tracking-widest text-white/70">
              The Five Values of the Lotus Petals
            </h3>

            <Reveal className="mt-8" stagger={0.09}>
              <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
                {institution.values.map((value, index) => (
                  <div
                    className={`${PETALS[index]} group relative rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/40 hover:bg-white/15 hover:shadow-2xl`}
                    data-reveal-item=""
                    key={value.id}
                  >
                    <span className="font-display text-xs tracking-widest text-white/60 uppercase">
                      Petal 0{index + 1}
                    </span>
                    <H4 as="dt" className="mt-3 text-white">
                      {value.name}
                    </H4>
                    <P
                      as="dd"
                      className="mt-3 text-sm text-white/80 leading-relaxed"
                    >
                      {value.meaning}
                    </P>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        )}
      </div>
    </section>
  );
}
