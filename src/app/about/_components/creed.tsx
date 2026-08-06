import Image from "next/image";
import { Parallax } from "@/components/motion/parallax";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
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
          <h3 className="font-body text-xs font-semibold tracking-widest text-accent uppercase">
            {label}
          </h3>
        }
      >
        <div className="flex flex-col gap-6">
          {body.map((paragraph) => (
            <H3
              as="p"
              className="text-pretty font-display font-light leading-snug"
              key={paragraph}
            >
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
        <SplitText
          as="h2"
          className="max-w-2xl font-display text-4xl font-normal text-balance sm:text-5xl"
        >
          {section.heading}
        </SplitText>
        {section.standfirst === null ? null : (
          <Reveal delay={0.15}>
            <Standfirst className="mt-6 max-w-xl">
              {section.standfirst}
            </Standfirst>
          </Reveal>
        )}

        <Reveal className="mt-16 lg:mt-24" stagger={0.14}>
          <div className="flex flex-col gap-16 lg:gap-24">
            <Tenet
              body={paragraphsOf(institution.mission)}
              label="Our Mission"
            />
            <Tenet body={paragraphsOf(institution.vision)} label="Our Vision" />
          </div>
        </Reveal>

        {image === null ? null : (
          <Parallax speed={-0.2}>
            <figure className="mt-16 overflow-hidden rounded-2xl border border-border/40 shadow-xl lg:mt-28 lg:w-8/12">
              <Image
                alt={image.alt}
                className="h-auto w-full object-cover transition-transform duration-700 hover:scale-105"
                height={image.height}
                loading="lazy"
                sizes="(min-width: 1024px) 61vw, 92vw"
                src={image.src}
                width={image.width}
              />
            </figure>
          </Parallax>
        )}
      </div>
    </section>
  );
}
