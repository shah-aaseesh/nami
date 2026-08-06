import Image from "next/image";
import { Parallax } from "@/components/motion/parallax";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import type { Crumb } from "@/components/seo/structured-data";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { H4, P, Standfirst } from "@/components/ui/typography";
import type { EntityRole } from "@/lib/content";
import { content } from "@/lib/content";
import { DocumentRow } from "./document-row";
import { paragraphsOf } from "./paragraphs";

const ENTITY_ORDER: readonly EntityRole[] = ["institute", "college", "school"];

const ABOUT_TRAIL: readonly Crumb[] = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
];

export async function Opening() {
  const [about, institution] = await Promise.all([
    content.getAboutCopy(),
    content.getInstitution(),
  ]);

  const overview = paragraphsOf(institution.overview);
  const chronology = about.sections.chronology;
  const opening = about.openingImage;

  return (
    <section className="gutter-x section-y">
      <div className="mx-auto max-w-page">
        <Breadcrumb trail={ABOUT_TRAIL} />

        <header className="mt-10 max-w-4xl lg:mt-16">
          <SplitText
            as="h1"
            className="font-display text-5xl font-normal text-balance sm:text-6xl lg:text-7xl"
          >
            {about.title}
          </SplitText>
          <Reveal delay={0.15}>
            <Standfirst className="mt-8 max-w-xl">
              {about.standfirst}
            </Standfirst>
          </Reveal>
        </header>

        {overview.length === 0 ? null : (
          <Reveal delay={0.2}>
            <DocumentRow className="mt-14 lg:mt-20">
              <div className="flex flex-col gap-6">
                {overview.map((paragraph) => (
                  <P className="text-lg leading-relaxed" key={paragraph}>
                    {paragraph}
                  </P>
                ))}
              </div>
            </DocumentRow>
          </Reveal>
        )}

        {opening === null ? null : (
          <Parallax speed={-0.3}>
            <figure className="mt-16 overflow-hidden rounded-2xl border border-border/40 shadow-xl lg:mt-24 lg:ms-auto lg:w-10/12">
              <Image
                alt={opening.alt}
                className="h-auto w-full object-cover transition-transform duration-700 hover:scale-105"
                height={opening.height}
                loading="lazy"
                sizes="(min-width: 1024px) 76vw, 92vw"
                src={opening.src}
                width={opening.width}
              />
            </figure>
          </Parallax>
        )}

        <div className="mt-24 lg:mt-36">
          <SplitText
            as="h2"
            className="max-w-2xl font-display text-4xl font-normal text-balance sm:text-5xl"
          >
            {chronology.heading}
          </SplitText>
          {chronology.standfirst === null ? null : (
            <Reveal delay={0.15}>
              <Standfirst className="mt-6 max-w-xl">
                {chronology.standfirst}
              </Standfirst>
            </Reveal>
          )}

          <Reveal className="mt-12 lg:mt-16" stagger={0.1}>
            <ul className="flex flex-col gap-8 lg:gap-12">
              {ENTITY_ORDER.map((role) => {
                const entity = institution.entities[role];

                return (
                  <li data-reveal-item="" key={role}>
                    <DocumentRow
                      measure="wide"
                      rail={
                        <>
                          <span className="block font-body text-xs tracking-widest text-ink-muted uppercase">
                            {entity.role}
                          </span>
                          {entity.establishedYear === null ? null : (
                            <span className="mt-2 block font-display text-4xl font-light text-accent">
                              {entity.establishedYear}
                            </span>
                          )}
                        </>
                      }
                    >
                      <div className="group rounded-xl border border-border/40 bg-surface-raised/40 p-6 transition-all duration-300 hover:border-accent/30 hover:bg-surface-raised">
                        <H4
                          as="span"
                          className="block transition-colors group-hover:text-accent"
                        >
                          {entity.name}
                        </H4>
                      </div>
                    </DocumentRow>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
