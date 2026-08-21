import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Icon } from "@/components/ui/icon";
import { Eyebrow, H5, P } from "@/components/ui/typography";
import type {
  AcademicLevel,
  ContentImage,
  NamedEntity,
  VocationalApproval,
} from "@/lib/content";
import { content, slug } from "@/lib/content";
import { ArrowRightIcon } from "@/lib/icons";

const MEDIA_SIZES = "(min-width: 1280px) 22vw, (min-width: 640px) 45vw, 100vw";

function InstitutionCard({
  entity,
  level,
}: {
  readonly entity: NamedEntity;
  readonly level: AcademicLevel;
}) {
  const established =
    entity.establishedYear === null ? null : `Est. ${entity.establishedYear}`;

  return (
    <li
      className="group relative flex flex-col overflow-hidden rounded-media border border-ink/15 bg-surface-raised"
      data-reveal-item=""
    >
      {level.image === null ? null : (
        <figure className="shrink-0 overflow-hidden">
          <Image
            alt={level.image.alt}
            className="aspect-4/3 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            height={level.image.height}
            sizes={MEDIA_SIZES}
            src={level.image.src}
            width={level.image.width}
          />
        </figure>
      )}

      <div className="flex flex-1 flex-col p-6 lg:p-7">
        <H5 as="h3">
          <Link
            className="transition-colors after:absolute after:inset-0 group-hover:text-accent"
            href={`/institutions/${level.slug}` as Route}
          >
            {entity.name}
          </Link>
        </H5>

        <p className="mt-3 mb-6 font-body text-sm text-ink-muted">
          {level.stage}
        </p>

        <div className="mt-auto flex items-center gap-4 border-t border-ink/15 pt-5">
          {established === null ? null : (
            <Eyebrow as="span" className="text-ink-muted">
              {established}
            </Eyebrow>
          )}
          <Icon
            className="ml-auto shrink-0 text-accent transition-transform duration-500 ease-out group-hover:translate-x-1"
            icon={ArrowRightIcon}
          />
        </div>
      </div>
    </li>
  );
}

function VocationalCard({
  approval,
  image,
}: {
  readonly approval: VocationalApproval;
  readonly image: ContentImage | null;
}) {
  return (
    <li
      className="relative flex flex-col overflow-hidden rounded-media border border-ink/15 bg-surface-raised"
      data-reveal-item=""
    >
      {image === null ? null : (
        <figure className="shrink-0 overflow-hidden">
          <Image
            alt={image.alt}
            className="aspect-4/3 w-full object-cover"
            height={image.height}
            sizes={MEDIA_SIZES}
            src={image.src}
            width={image.width}
          />
        </figure>
      )}

      <div className="flex flex-1 flex-col p-6 lg:p-7">
        <H5 as="h3" className="text-lg">
          {approval.council}
        </H5>
        <p className="mt-3 font-body text-sm text-ink-muted">
          {approval.scope}
        </p>

        <div className="mt-2 flex items-center border-t border-ink/15 pt-5">
          <Eyebrow as="span" className="text-ink-muted">
            {`Est. ${approval.approvedYear}`}
          </Eyebrow>
        </div>
      </div>
    </li>
  );
}

export async function AcademicLevels() {
  const [copy, levels, institution, vocational] = await Promise.all([
    content.getHomeCopy(),
    content.getAcademicLevels(),
    content.getInstitution(),
    content.getVocationalApproval(),
  ]);

  const section = copy.sections.levels;
  const bachelorsImage =
    levels.find((level) => level.slug === slug("bachelors"))?.image ?? null;

  return (
    <section className="field-brand gutter-x section-y" id="institutions">
      <div className="mx-auto max-w-page">
        <div className="lg:grid lg:grid-cols-12 lg:items-end lg:gap-x-8">
          <Reveal className="lg:col-span-4 lg:row-start-1" stagger={0.08}>
            {section.eyebrow === null ? null : (
              <RevealItem className="flex items-center gap-5">
                <Eyebrow>{section.eyebrow}</Eyebrow>
                <span className="h-px flex-1 bg-border" />
              </RevealItem>
            )}

            {section.standfirst === null ? null : (
              <RevealItem className="mt-6">
                <P>{section.standfirst}</P>
              </RevealItem>
            )}
          </Reveal>

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
          <Reveal className="mt-16 lg:mt-20" stagger={0.12}>
            <ul className="grid gap-6 sm:grid-cols-2 lg:gap-8 xl:grid-cols-4">
              {levels.map((level) => (
                <InstitutionCard
                  entity={institution.entities[level.entity]}
                  key={level.id}
                  level={level}
                />
              ))}
              <VocationalCard approval={vocational} image={bachelorsImage} />
            </ul>
          </Reveal>
        )}
      </div>
    </section>
  );
}
