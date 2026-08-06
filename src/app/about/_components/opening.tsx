import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
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

        <header className="mt-12 max-w-4xl lg:mt-20">
          <h1 className="font-display text-7xl font-normal text-balance">
            {about.title}
          </h1>
          <Standfirst className="mt-8 max-w-xl">{about.standfirst}</Standfirst>
        </header>

        {overview.length === 0 ? null : (
          <DocumentRow className="mt-16 lg:mt-24">
            <div className="flex flex-col gap-6">
              {overview.map((paragraph) => (
                <P className="text-lg" key={paragraph}>
                  {paragraph}
                </P>
              ))}
            </div>
          </DocumentRow>
        )}

        {opening === null ? null : (
          <figure className="mt-16 lg:mt-24 lg:ms-auto lg:w-10/12">
            <Image
              alt={opening.alt}
              className="h-auto w-full rounded-xl"
              height={opening.height}
              loading="lazy"
              sizes="(min-width: 1024px) 76vw, 92vw"
              src={opening.src}
              width={opening.width}
            />
          </figure>
        )}

        <div className="mt-24 lg:mt-36">
          <h2 className="max-w-2xl font-display text-5xl font-normal text-balance">
            {chronology.heading}
          </h2>
          {chronology.standfirst === null ? null : (
            <Standfirst className="mt-6 max-w-xl">
              {chronology.standfirst}
            </Standfirst>
          )}

          <Reveal className="mt-12 lg:mt-16" stagger={0.1}>
            <ul className="flex flex-col gap-10 lg:gap-14">
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
                            <span className="mt-3 block font-display text-4xl text-accent">
                              {entity.establishedYear}
                            </span>
                          )}
                        </>
                      }
                    >
                      <H4 as="span" className="block">
                        {entity.name}
                      </H4>
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
