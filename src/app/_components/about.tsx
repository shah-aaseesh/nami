import { Parallax } from "@/components/motion/parallax";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Eyebrow, H4, H6, P, Standfirst } from "@/components/ui/typography";
import type { RichText } from "@/lib/content";
import { content } from "@/lib/content";

function paragraphsOf(text: RichText): readonly string[] {
  return text.kind === "blocks" ? text.paragraphs : [];
}

function Creed({
  body,
  className,
  label,
}: {
  body: readonly string[];
  className?: string;
  label: string;
}) {
  if (body.length === 0) return null;

  return (
    <div className={className}>
      <Eyebrow as="h3">{label}</Eyebrow>
      <div className="mt-6 flex flex-col gap-5 lg:mt-8">
        {body.map((paragraph) => (
          <H4 as="p" className="text-pretty" key={paragraph}>
            {paragraph}
          </H4>
        ))}
      </div>
    </div>
  );
}

export async function About() {
  const [copy, institution] = await Promise.all([
    content.getHomeCopy(),
    content.getInstitution(),
  ]);

  const section = copy.sections.about;
  const overview = paragraphsOf(institution.overview);
  const emblem = paragraphsOf(institution.emblemStory);
  const emblemLead = emblem[0];
  const emblemRest = emblem.slice(1);

  return (
    <section className="gutter-x section-y" id="about">
      <div className="mx-auto max-w-page">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-4 lg:col-start-1 lg:row-start-1">
            {section.eyebrow === null ? null : (
              <Reveal>
                <Eyebrow>{section.eyebrow}</Eyebrow>
              </Reveal>
            )}
            <SplitText
              as="h2"
              className="mt-4 font-display text-5xl font-normal tracking-normal text-ink"
            >
              {section.heading}
            </SplitText>
          </div>

          {overview.length === 0 ? null : (
            <Reveal
              className="mt-10 lg:col-span-8 lg:col-start-5 lg:row-start-1 lg:mt-2"
              delay={0.2}
              stagger={0.08}
            >
              <Parallax className="flex flex-col gap-4" speed={1.03}>
                {overview.map((paragraph) => (
                  <RevealItem key={paragraph}>
                    <P>{paragraph}</P>
                  </RevealItem>
                ))}
              </Parallax>
            </Reveal>
          )}
        </div>

        <Reveal className="mt-12 lg:mt-16" y={32}>
          <div className="flex flex-col overflow-hidden rounded-3xl lg:flex-row">
            <Creed
              body={paragraphsOf(institution.mission)}
              className="field-ink flex grow flex-col justify-end p-8 sm:p-10 lg:basis-7/12 xl:p-14"
              label="Mission"
            />
            <Creed
              body={paragraphsOf(institution.vision)}
              className="field-brand grow p-8 sm:p-10 lg:basis-5/12 xl:p-14"
              label="Vision"
            />
          </div>
        </Reveal>

        <div className="mt-12 border-t pt-8 lg:mt-16">
          <Reveal className="lg:grid lg:grid-cols-12 lg:gap-x-10" stagger={0.1}>
            {emblemLead === undefined ? null : (
              <RevealItem className="lg:col-span-5 lg:col-start-1">
                <Standfirst className="text-ink">{emblemLead}</Standfirst>
              </RevealItem>
            )}
            {emblemRest.length === 0 ? null : (
              <RevealItem className="mt-6 flex flex-col gap-4 lg:col-span-6 lg:col-start-7 lg:mt-0">
                {emblemRest.map((paragraph) => (
                  <P key={paragraph}>{paragraph}</P>
                ))}
              </RevealItem>
            )}
          </Reveal>

          {institution.values.length === 0 ? null : (
            <Reveal className="mt-10" delay={0.2} stagger={0.06}>
              <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-5">
                {institution.values.map((value) => (
                  <RevealItem className="border-t pt-4" key={value.id}>
                    <H6 as="dt">{value.name}</H6>
                    <P as="dd" className="mt-2">
                      {value.meaning}
                    </P>
                  </RevealItem>
                ))}
              </dl>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
