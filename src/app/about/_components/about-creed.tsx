import { Reveal } from "@/components/motion/reveal";
import { Eyebrow, H4, Standfirst } from "@/components/ui/typography";
import { paragraphsOf, type RichText, type SectionCopy } from "@/lib/content";

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

export function AboutCreed({
  mission,
  section,
  vision,
}: {
  mission: RichText;
  section: SectionCopy;
  vision: RichText;
}) {
  const missionBody = paragraphsOf(mission);
  const visionBody = paragraphsOf(vision);

  if (missionBody.length === 0 && visionBody.length === 0) return null;

  return (
    <section className="gutter-x section-y" id="creed">
      <div className="mx-auto max-w-page">
        <Reveal>
          {section.eyebrow === null ? null : (
            <Eyebrow>{section.eyebrow}</Eyebrow>
          )}
          {section.standfirst === null ? null : (
            <Standfirst className="mt-5 max-w-2xl">
              {section.standfirst}
            </Standfirst>
          )}
        </Reveal>

        <Reveal className="mt-10 lg:mt-14" y={32}>
          <div className="flex flex-col overflow-hidden rounded-3xl lg:flex-row">
            <Creed
              body={missionBody}
              className="field-ink flex grow flex-col justify-end p-6 sm:p-10 lg:basis-7/12 xl:p-14"
              label="Mission"
            />
            <Creed
              body={visionBody}
              className="field-brand grow p-6 sm:p-10 lg:basis-5/12 xl:p-14"
              label="Vision"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
