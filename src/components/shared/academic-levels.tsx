import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { Icon } from "@/components/ui/icon";
import { H5, P } from "@/components/ui/typography";
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
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-white border border-primary-900/15 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg"
      data-reveal-item=""
    >
      {level.image === null ? null : (
        <figure className="relative aspect-16/10 w-full shrink-0 overflow-hidden bg-neutral-900/10">
          <Image
            alt={level.image.alt}
            className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            height={level.image.height}
            sizes={MEDIA_SIZES}
            src={level.image.src}
            width={level.image.width}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/15" />

          <div className="absolute inset-x-3.5 top-3.5 flex items-center justify-between">
            {established === null ? (
              <span />
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-neutral-950/75 px-3 py-1 font-body text-xs font-medium tracking-wide text-white shadow-sm backdrop-blur-md">
                <span className="size-1.5 rounded-full bg-primary-400" />
                <span>{established}</span>
              </span>
            )}
          </div>
        </figure>
      )}

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <H5
          as="h3"
          className="font-display text-xl font-medium leading-tight text-primary-700 group-hover:text-primary-800 transition-colors"
        >
          {href === null ? (
            entity.name
          ) : (
            <Link
              className="after:absolute after:inset-0 focus-visible:outline-none"
              href={href}
            >
              {entity.name}
            </Link>
          )}
        </H5>

        <p className="mt-2.5 font-body text-sm font-medium leading-snug text-neutral-800">
          {level.stage}
        </p>

        {/* Highlights List to fulfill the gap */}
        {level.highlights && level.highlights.length > 0 && (
          <ul className="mt-4 mb-5 space-y-2 border-t border-neutral-100 pt-3.5 flex-1">
            {level.highlights.slice(0, 3).map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 font-body text-xs text-neutral-600 leading-snug"
              >
                <span className="mt-1 size-1.5 rounded-full bg-primary-600 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}

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
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-white border border-primary-900/15 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg"
      data-reveal-item=""
    >
      {image === null ? null : (
        <figure className="relative aspect-16/10 w-full shrink-0 overflow-hidden bg-neutral-900/10">
          <Image
            alt={image.alt}
            className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            height={image.height}
            sizes={MEDIA_SIZES}
            src={image.src}
            width={image.width}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/15" />

          <div className="absolute inset-x-3.5 top-3.5 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-neutral-950/75 px-3 py-1 font-body text-xs font-medium tracking-wide text-white shadow-sm backdrop-blur-md">
              <span className="size-1.5 rounded-full bg-primary-400" />
              <span>{`Approved ${approval.approvedYear}`}</span>
            </span>
          </div>
        </figure>
      )}

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <H5
          as="h3"
          className="font-display text-xl font-medium leading-tight text-primary-700 group-hover:text-primary-800 transition-colors"
        >
          Vocational & Technical Training
        </H5>

        <p className="mt-2.5 font-body text-sm font-medium leading-snug text-neutral-800">
          CTEVT Approved Short-Term Vocational Programmes
        </p>

        <ul className="mt-4 mb-5 space-y-2 border-t border-neutral-100 pt-3.5 flex-1">
          <li className="flex items-start gap-2 font-body text-xs text-neutral-600 leading-snug">
            <span className="mt-1 size-1.5 rounded-full bg-primary-600 shrink-0" />
            <span>Council for Technical Education & Vocational Training</span>
          </li>
          <li className="flex items-start gap-2 font-body text-xs text-neutral-600 leading-snug">
            <span className="mt-1 size-1.5 rounded-full bg-primary-600 shrink-0" />
            <span>Skill-based practical & industry-aligned training</span>
          </li>
          <li className="flex items-start gap-2 font-body text-xs text-neutral-600 leading-snug">
            <span className="mt-1 size-1.5 rounded-full bg-primary-600 shrink-0" />
            <span>Employment & entrepreneurship-oriented pathways</span>
          </li>
        </ul>

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
        <SectionHeader
          eyebrow={section.heading}
          title={section.eyebrow ?? "Institutions"}
          description={section.standfirst}
        />

        {levels.length === 0 ? (
          section.emptyState === null ? null : (
            <P className="mt-16 max-w-md text-primary-200">
              {section.emptyState}
            </P>
          )
        ) : (
          <Reveal
            className="mt-10 lg:mt-14"
            duration={0.55}
            stagger={0.05}
            y={10}
          >
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
