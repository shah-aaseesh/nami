import Image from "next/image";
import Link from "next/link";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Icon } from "@/components/ui/icon";
import { Eyebrow, H5, P, Standfirst } from "@/components/ui/typography";
import type {
  AcademicLevel,
  ContentImage,
  NamedEntity,
  VocationalApproval,
} from "@/lib/content";
import { content, slug } from "@/lib/content";
import { institutionPathOfSlug } from "@/lib/content/institutions";
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
    entity.establishedYear === null ? null : `Estd. ${entity.establishedYear}`;
  const href = institutionPathOfSlug(level.slug);

  return (
    <li
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-white border border-primary-900/10 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
      data-reveal-item=""
    >
      {level.image === null ? null : (
        <figure className="relative aspect-16/10 w-full shrink-0 overflow-hidden bg-neutral-900/10">
          <Image
            alt={level.image.alt}
            className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-103"
            height={level.image.height}
            sizes={MEDIA_SIZES}
            src={level.image.src}
            width={level.image.width}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/10" />

          <div className="absolute inset-x-3.5 top-3.5 flex items-center justify-between">
            {established === null ? (
              <span />
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-neutral-950/70 px-3 py-1 font-body text-xs font-medium tracking-wide text-white shadow-sm backdrop-blur-md">
                <span className="size-1.5 rounded-full bg-primary-400" />
                <span>{established}</span>
              </span>
            )}
          </div>
        </figure>
      )}

      <div className="flex flex-1 flex-col p-5">
        <H5
          as="h3"
          className="font-display text-lg font-normal leading-snug text-neutral-900"
        >
          {href === null ? (
            entity.name
          ) : (
            <Link
              className="transition-colors after:absolute after:inset-0 group-hover:text-primary-700"
              href={href}
            >
              {entity.name}
            </Link>
          )}
        </H5>

        <p className="mt-2 mb-5 font-body text-xs font-normal leading-relaxed text-neutral-600">
          {level.stage}
        </p>

        <div className="mt-auto flex items-center justify-between border-t border-neutral-100 pt-3.5">
          <span className="font-body text-xs font-semibold text-primary-800 transition-colors group-hover:text-primary-950">
            Explore Details
          </span>
          <span className="flex size-7 items-center justify-center rounded-full bg-primary-50 text-primary-700 transition-all duration-200 group-hover:bg-primary-700 group-hover:text-white">
            <Icon className="size-3.5" icon={ArrowRightIcon} />
          </span>
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
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-white border border-primary-900/10 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
      data-reveal-item=""
    >
      {image === null ? null : (
        <figure className="relative aspect-16/10 w-full shrink-0 overflow-hidden bg-neutral-900/10">
          <Image
            alt={image.alt}
            className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-103"
            height={image.height}
            sizes={MEDIA_SIZES}
            src={image.src}
            width={image.width}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/10" />

          <div className="absolute inset-x-3.5 top-3.5 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-neutral-950/70 px-3 py-1 font-body text-xs font-medium tracking-wide text-white shadow-sm backdrop-blur-md">
              <span className="size-1.5 rounded-full bg-primary-400" />
              <span>{`Approved ${approval.approvedYear}`}</span>
            </span>
          </div>
        </figure>
      )}

      <div className="flex flex-1 flex-col p-5">
        <H5
          as="h3"
          className="font-display text-lg font-normal leading-snug text-neutral-900"
        >
          {approval.council}
        </H5>

        <p className="mt-2 mb-5 font-body text-xs font-normal leading-relaxed text-neutral-600">
          {approval.scope}
        </p>

        <div className="mt-auto flex items-center justify-between border-t border-neutral-100 pt-3.5">
          <span className="font-body text-xs font-semibold text-primary-800">
            Vocational & Technical
          </span>
          <span className="flex size-7 items-center justify-center rounded-full bg-primary-50 text-primary-700 transition-all duration-200 group-hover:bg-primary-700 group-hover:text-white">
            <Icon className="size-3.5" icon={ArrowRightIcon} />
          </span>
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
        <Reveal stagger={0.08}>
          {section.eyebrow === null ? null : (
            <RevealItem className="flex items-center gap-5">
              <Eyebrow>{section.eyebrow}</Eyebrow>
              <span className="h-px flex-1 bg-border" />
            </RevealItem>
          )}

          <div className="mt-6 flex flex-col gap-6 lg:mt-8 lg:flex-row lg:items-end lg:justify-between lg:gap-x-16">
            <SplitText as="h2" className="lg:max-w-2xl">
              {section.heading}
            </SplitText>

            {section.standfirst === null ? null : (
              <RevealItem className="lg:max-w-md">
                <Standfirst>{section.standfirst}</Standfirst>
              </RevealItem>
            )}
          </div>
        </Reveal>

        {levels.length === 0 ? (
          section.emptyState === null ? null : (
            <P className="mt-16 max-w-md text-primary-200">
              {section.emptyState}
            </P>
          )
        ) : (
          <Reveal className="mt-10 lg:mt-14" stagger={0.06} y={12}>
            <ul className="grid gap-5 sm:grid-cols-2 lg:gap-6 xl:grid-cols-4">
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
