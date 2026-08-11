import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { Parallax } from "@/components/motion/parallax";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Icon } from "@/components/ui/icon";
import { Eyebrow, H3, P } from "@/components/ui/typography";
import type { AcademicLevel, NamedEntity } from "@/lib/content";
import { content, paragraphsOf } from "@/lib/content";
import { ArrowRightIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

const MEDIA_SIZES = "(min-width: 768px) 40vw, 100vw";

function InstitutionEntry({
  campus,
  entity,
  index,
  level,
}: {
  readonly campus: string | null;
  readonly entity: NamedEntity;
  readonly index: number;
  readonly level: AcademicLevel;
}) {
  const flipped = index % 2 === 1;
  const lead = paragraphsOf(level.summary)[0] ?? null;
  const meta = [
    entity.establishedYear === null ? null : `Est. ${entity.establishedYear}`,
    campus,
  ].filter((item) => item !== null);

  return (
    <li
      className="group relative grid gap-y-8 border-t border-border pt-8 md:grid-cols-12 md:gap-x-8 lg:pt-10"
      data-reveal-item=""
    >
      <div
        className={cn(
          "md:col-span-6 md:row-start-1",
          flipped ? "md:col-start-7" : "md:col-start-1",
        )}
      >
        <div className="flex items-center justify-between gap-5">
          <span className="font-body text-xs tracking-widest text-accent tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="flex items-center gap-4">
            {meta.length === 0 ? null : (
              <span className="font-body text-xs tracking-widest text-ink-muted uppercase">
                {meta.join(" · ")}
              </span>
            )}
            <Icon
              className="shrink-0 text-accent transition-transform duration-500 ease-out group-hover:translate-x-1"
              icon={ArrowRightIcon}
            />
          </span>
        </div>

        <H3 className="mt-8">
          <Link
            className="transition-colors after:absolute after:inset-0 group-hover:text-accent"
            href={`/institutions/${level.slug}` as Route}
          >
            {entity.name}
          </Link>
        </H3>

        <p className="mt-4 font-body text-sm text-ink-muted">{level.stage}</p>

        {lead === null ? null : <P className="mt-6 max-w-md">{lead}</P>}
      </div>

      {level.image === null ? null : (
        <Parallax
          className={cn(
            "md:col-span-5 md:row-start-1",
            flipped ? "md:col-start-1" : "md:col-start-8",
          )}
          speed={flipped ? 0.94 : 1.06}
        >
          <figure className="overflow-hidden rounded-xl">
            <Image
              alt={level.image.alt}
              className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              height={level.image.height}
              sizes={MEDIA_SIZES}
              src={level.image.src}
              width={level.image.width}
            />
          </figure>
        </Parallax>
      )}
    </li>
  );
}

export async function AcademicLevels() {
  const [copy, levels, institution] = await Promise.all([
    content.getHomeCopy(),
    content.getAcademicLevels(),
    content.getInstitution(),
  ]);

  const section = copy.sections.levels;
  const campuses = new Map(
    institution.campuses.map((campus) => [
      campus.slug,
      `${campus.locality}, ${campus.city}`,
    ]),
  );

  return (
    <section className="field-brand gutter-x section-y" id="institutions">
      <div className="mx-auto max-w-page">
        <div className="lg:grid lg:grid-cols-12 lg:items-end lg:gap-x-8">
          <div className="lg:col-span-4 lg:row-start-1">
            {section.eyebrow === null ? null : (
              <Reveal className="flex items-center gap-5">
                <Eyebrow>{section.eyebrow}</Eyebrow>
                <span className="h-px flex-1 bg-border" />
              </Reveal>
            )}

            {section.standfirst === null ? null : (
              <Reveal className="mt-6" delay={0.2}>
                <P>{section.standfirst}</P>
              </Reveal>
            )}
          </div>

          <SplitText
            as="h2"
            className="mt-10 font-display text-6xl font-normal lg:col-span-7 lg:col-start-6 lg:row-start-1 lg:mt-0"
          >
            {section.heading}
          </SplitText>
        </div>

        {levels.length === 0 ? (
          section.emptyState === null ? null : (
            <P className="mt-16 max-w-md">{section.emptyState}</P>
          )
        ) : (
          <Reveal className="mt-16 lg:mt-24" delay={0.2} stagger={0.12}>
            <ol className="flex flex-col gap-y-16 lg:gap-y-28">
              {levels.map((level, index) => (
                <InstitutionEntry
                  campus={campuses.get(level.campusSlug) ?? null}
                  entity={institution.entities[level.entity]}
                  index={index}
                  key={level.id}
                  level={level}
                />
              ))}
            </ol>
          </Reveal>
        )}
      </div>
    </section>
  );
}
