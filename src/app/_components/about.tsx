import { Parallax } from "@/components/motion/parallax";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Eyebrow, H6, P, Standfirst } from "@/components/ui/typography";
import type { NamedEntity, RichText } from "@/lib/content";
import { content } from "@/lib/content";

const ENTITY_ORDER = ["institute", "college", "school"] as const;

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
      <div className="mt-4 flex flex-col gap-4">
        {body.map((paragraph) => (
          <Standfirst className="text-ink" key={paragraph}>
            {paragraph}
          </Standfirst>
        ))}
      </div>
    </div>
  );
}

function EntityLine({ entity }: { entity: NamedEntity }) {
  return (
    <li className="border-t pt-4 pb-5 sm:pb-0" data-reveal-item="">
      <H6 as="span" className="block">
        {entity.name}
      </H6>
      {entity.establishedYear === null ? null : (
        <span className="mt-1 block font-body text-sm text-ink-muted">
          Established {entity.establishedYear}
        </span>
      )}
    </li>
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
              className="mt-4 font-editorial text-5xl font-normal tracking-normal text-ink"
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

          <Reveal
            className="mt-10 lg:col-span-12 lg:col-start-1 lg:row-start-2 lg:mt-12"
            delay={0.3}
            stagger={0.06}
          >
            <ul className="sm:grid sm:grid-cols-3 sm:gap-x-10">
              {ENTITY_ORDER.map((role) => (
                <EntityLine entity={institution.entities[role]} key={role} />
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal
          className="mt-12 lg:mt-16 lg:grid lg:grid-cols-12 lg:gap-x-10"
          stagger={0.1}
        >
          <Creed
            body={paragraphsOf(institution.mission)}
            className="lg:col-span-5 lg:col-start-1"
            label="Mission"
          />
          <Creed
            body={paragraphsOf(institution.vision)}
            className="mt-10 lg:col-span-6 lg:col-start-7 lg:mt-0"
            label="Vision"
          />
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
