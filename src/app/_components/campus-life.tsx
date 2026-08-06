import Image from "next/image";
import { Parallax } from "@/components/motion/parallax";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Eyebrow, H6, P } from "@/components/ui/typography";
import { content } from "@/lib/content";

export async function CampusLife() {
  const [copy, pillars] = await Promise.all([
    content.getHomeCopy(),
    content.getCampusLife(),
  ]);

  const section = copy.sections.campusLife;
  const band = pillars.find((pillar) => pillar.image !== null)?.image ?? null;

  return (
    <section className="field-ink gutter-x section-y" id="campus-life">
      <div className="mx-auto max-w-page lg:grid lg:grid-cols-12 lg:gap-x-8">
        <div className="lg:col-span-5">
          {section.eyebrow === null ? null : (
            <Reveal className="flex items-center gap-5">
              <Eyebrow>{section.eyebrow}</Eyebrow>
              <span className="h-px flex-1 bg-border" />
            </Reveal>
          )}

          <SplitText
            as="h2"
            className="mt-8 font-display text-7xl font-normal tracking-normal"
          >
            {section.heading}
          </SplitText>
        </div>

        {pillars.length === 0 ? (
          section.emptyState === null ? null : (
            <P className="mt-12 lg:col-span-6 lg:col-start-7 lg:mt-0">
              {section.emptyState}
            </P>
          )
        ) : (
          <Reveal
            className="mt-12 lg:col-span-6 lg:col-start-7 lg:mt-2"
            delay={0.2}
            stagger={0.08}
          >
            <dl className="grid gap-x-8 sm:grid-cols-2">
              {pillars.map((pillar) => (
                <div
                  className="border-t pt-5 pb-6"
                  data-reveal-item=""
                  key={pillar.id}
                >
                  <H6 as="dt">{pillar.title}</H6>
                  <P as="dd" className="mt-2">
                    {pillar.lead}
                  </P>
                </div>
              ))}
            </dl>
          </Reveal>
        )}
      </div>

      {band === null ? null : (
        <Reveal className="bleed-x mt-16 lg:mt-24" y={24}>
          <figure className="relative h-72 overflow-hidden md:h-96 lg:h-140 xl:h-150">
            <Parallax
              className="absolute inset-x-0 -inset-y-24 lg:-inset-y-48"
              speed={0.9}
            >
              <Image
                alt={band.alt}
                className="h-full w-full object-cover"
                height={band.height}
                loading="lazy"
                sizes="100vw"
                src={band.src}
                width={band.width}
              />
            </Parallax>
          </figure>
        </Reveal>
      )}
    </section>
  );
}
