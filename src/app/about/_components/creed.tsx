import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { H3, Standfirst } from "@/components/ui/typography";
import { content } from "@/lib/content";
import { DocumentRow } from "./document-row";
import { paragraphsOf } from "./paragraphs";

function Tenet({ body, label }: { body: readonly string[]; label: string }) {
  if (body.length === 0) return null;

  return (
    <div data-reveal-item="">
      <DocumentRow
        measure="wide"
        rail={
          <h3 className="font-body text-xs tracking-widest text-ink-muted uppercase">
            {label}
          </h3>
        }
      >
        <div className="flex flex-col gap-6">
          {body.map((paragraph) => (
            <H3 as="p" className="text-pretty" key={paragraph}>
              {paragraph}
            </H3>
          ))}
        </div>
      </DocumentRow>
    </div>
  );
}

export async function Creed() {
  const [about, institution] = await Promise.all([
    content.getAboutCopy(),
    content.getInstitution(),
  ]);

  const section = about.sections.creed;
  const image = about.creedImage;

  return (
    <section className="gutter-x section-y">
      <div className="mx-auto max-w-page">
        <h2 className="max-w-2xl font-display text-5xl font-normal text-balance">
          {section.heading}
        </h2>
        {section.standfirst === null ? null : (
          <Standfirst className="mt-6 max-w-xl">
            {section.standfirst}
          </Standfirst>
        )}

        <Reveal className="mt-16 lg:mt-24" stagger={0.14}>
          <div className="flex flex-col gap-16 lg:gap-28">
            <Tenet body={paragraphsOf(institution.mission)} label="Mission" />
            <Tenet body={paragraphsOf(institution.vision)} label="Vision" />
          </div>
        </Reveal>

        {image === null ? null : (
          <figure className="mt-16 lg:mt-28 lg:w-8/12">
            <Image
              alt={image.alt}
              className="h-auto w-full rounded-xl"
              height={image.height}
              loading="lazy"
              sizes="(min-width: 1024px) 61vw, 92vw"
              src={image.src}
              width={image.width}
            />
          </figure>
        )}
      </div>
    </section>
  );
}
