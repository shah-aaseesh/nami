import { Parallax } from "@/components/motion/parallax";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Eyebrow, H5, P } from "@/components/ui/typography";
import type { RichText } from "@/lib/content";
import { content } from "@/lib/content";
import { cn } from "@/lib/utils";

const ENTITY_ORDER = ["institute", "college", "school"] as const;

const PETAL_START = [
  "lg:col-start-1",
  "lg:col-start-2",
  "lg:col-start-3",
  "lg:col-start-2",
  "lg:col-start-1",
] as const;

function paragraphsOf(text: RichText): readonly string[] {
  return text.kind === "blocks" ? text.paragraphs : [];
}

function Creed({
  body,
  delay,
  label,
  placement,
  speed,
}: {
  body: readonly string[];
  delay?: number;
  label: string;
  placement: string;
  speed: number;
}) {
  if (body.length === 0) return null;

  return (
    <Reveal className={placement} delay={delay} stagger={0.08}>
      <Parallax speed={speed}>
        <RevealItem>
          <Eyebrow as="h3">{label}</Eyebrow>
        </RevealItem>
        <RevealItem className="mt-6 flex flex-col gap-6">
          {body.map((paragraph) => (
            <p
              className="font-display text-3xl font-normal text-ink text-pretty"
              key={paragraph}
            >
              {paragraph}
            </p>
          ))}
        </RevealItem>
      </Parallax>
    </Reveal>
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
      <div className="mx-auto max-w-page lg:grid lg:grid-cols-12 lg:gap-x-8">
        <SplitText
          as="h2"
          className="font-display text-5xl font-semibold lg:col-span-7 lg:col-start-1 lg:row-start-1"
        >
          {section.heading}
        </SplitText>

        {overview.length === 0 ? null : (
          <Reveal
            className="mt-12 lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1 lg:mt-3"
            delay={0.25}
            stagger={0.08}
          >
            <Parallax className="flex flex-col gap-6" speed={1.05}>
              {overview.map((paragraph) => (
                <RevealItem key={paragraph}>
                  <P>{paragraph}</P>
                </RevealItem>
              ))}
            </Parallax>
          </Reveal>
        )}

        <Reveal
          className="mt-16 lg:col-span-5 lg:col-start-2 lg:row-start-2 lg:mt-20"
          delay={0.4}
          stagger={0.08}
        >
          <ul>
            {ENTITY_ORDER.map((role) => {
              const entity = institution.entities[role];
              return (
                <li
                  className="flex flex-col gap-1 border-t pt-5 pb-7"
                  data-reveal-item=""
                  key={entity.role}
                >
                  <H5 as="span">{entity.name}</H5>
                  {entity.establishedYear === null ? null : (
                    <span className="font-body text-sm text-ink-muted">
                      Established {entity.establishedYear}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>

      <div className="field-brand mt-16 bleed-x gutter-x section-y lg:mt-24">
        <div className="mx-auto max-w-page">
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
            {emblemLead === undefined ? null : (
              <Reveal className="lg:col-span-7 lg:col-start-1">
                <p className="font-display text-4xl font-normal text-ink text-pretty">
                  {emblemLead}
                </p>
              </Reveal>
            )}

            {emblemRest.length === 0 ? null : (
              <Reveal
                className="mt-10 lg:col-span-4 lg:col-start-9 lg:mt-16"
                delay={0.25}
                stagger={0.08}
              >
                <Parallax className="flex flex-col gap-6" speed={1.08}>
                  {emblemRest.map((paragraph) => (
                    <RevealItem key={paragraph}>
                      <P>{paragraph}</P>
                    </RevealItem>
                  ))}
                </Parallax>
              </Reveal>
            )}
          </div>

          {institution.values.length === 0 ? null : (
            <Reveal className="mt-16 lg:mt-28" delay={0.4} stagger={0.08}>
              <dl>
                {institution.values.map((value, index) => (
                  <RevealItem
                    className="border-t border-border-strong pt-8 pb-10 lg:grid lg:grid-cols-12 lg:gap-x-8"
                    key={value.id}
                  >
                    <dt
                      className={cn(
                        "relative font-display text-6xl font-semibold text-balance lg:col-span-6",
                        PETAL_START[index % PETAL_START.length] ??
                          PETAL_START[0],
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute -top-8 start-0 font-display text-8xl font-semibold text-surface-raised select-none"
                      >
                        {(index + 1).toString().padStart(2, "0")}
                      </span>
                      <span className="relative">{value.name}</span>
                    </dt>
                    <dd className="mt-6 lg:col-span-4 lg:col-start-9 lg:mt-3">
                      <P>{value.meaning}</P>
                    </dd>
                  </RevealItem>
                ))}
              </dl>
            </Reveal>
          )}
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-page lg:mt-24 lg:grid lg:grid-cols-12 lg:gap-x-8">
        <Creed
          body={paragraphsOf(institution.mission)}
          label="Mission"
          placement="lg:col-span-9 lg:col-start-1"
          speed={1.03}
        />
        <Creed
          body={paragraphsOf(institution.vision)}
          delay={0.25}
          label="Vision"
          placement="mt-16 lg:col-span-8 lg:col-start-5 lg:mt-20"
          speed={0.94}
        />
      </div>
    </section>
  );
}
