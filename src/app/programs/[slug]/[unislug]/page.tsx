import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/ui/icon";
import {
  Display,
  Eyebrow,
  H3,
  H4,
  P,
  Standfirst,
} from "@/components/ui/typography";
import { content } from "@/lib/content";
import { ArrowRightIcon, CheckIcon, MortarboardIcon } from "@/lib/icons";
import { createMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string; unislug: string }>;
};

export async function generateStaticParams() {
  const [levels, affiliations] = await Promise.all([
    content.getAcademicLevels(),
    content.getAffiliations(),
  ]);

  return affiliations.flatMap((aff) => {
    const level = levels.find((l) => l.slug === aff.levelSlug);
    if (!level) return [];
    return [{ slug: level.slug, unislug: aff.slug }];
  });
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug, unislug } = await params;

  const affiliations = await content.getAffiliations();
  const affiliation = affiliations.find(
    (a) => a.slug === unislug && a.levelSlug === slug,
  );

  if (!affiliation) {
    return createMetadata({
      path: `/programs/${slug}/${unislug}`,
      title: "Partner Not Found",
    });
  }

  return createMetadata({
    path: `/programs/${slug}/${unislug}`,
    title: `${affiliation.body} — Programs at NAMI`,
    description: `Explore ${affiliation.scope} programmes offered in partnership with ${affiliation.body} at NAMI.`,
  });
}

export default async function UniversityDetailPage({ params }: PageProps) {
  const { slug, unislug } = await params;

  const [levels, affiliations, programmes, institution] = await Promise.all([
    content.getAcademicLevels(),
    content.getAffiliations(),
    content.getProgrammes(),
    content.getInstitution(),
  ]);

  const level = levels.find((l) => l.slug === slug);
  const affiliation = affiliations.find(
    (a) => a.slug === unislug && a.levelSlug === slug,
  );

  if (!level || !affiliation) {
    notFound();
  }

  const campuses = new Map(
    institution.campuses.map((c) => [c.slug, `${c.locality}, ${c.city}`]),
  );
  const campusName = campuses.get(affiliation.campusSlug) ?? "Kathmandu";

  // Filter programmes whose awarding body matches this affiliation
  const uniProgrammes = programmes.filter(
    (p) => p.awardingBody === affiliation.body && p.levelSlug === level.slug,
  );

  return (
    <>
      <section className="gutter-x section-y overflow-x-clip">
        <div className="mx-auto max-w-page">
          <div className="lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-10">
            <div className="lg:col-span-7">
              <Eyebrow>Partner Institution</Eyebrow>
              <Display className="mt-5 max-w-2xl text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                {affiliation.body}
              </Display>

              <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-ink-muted">
                <span className="rounded-full border border-border bg-muted px-4 py-1.5 font-body text-xs font-medium uppercase tracking-widest text-accent">
                  Since {affiliation.sinceYear}
                </span>
                <span>{campusName}</span>
              </div>

              <Standfirst className="mt-8 max-w-xl">
                {affiliation.scope}
              </Standfirst>
            </div>

            {affiliation.logo !== null ? (
              <div className="mt-10 lg:col-span-4 lg:col-start-9 lg:mt-0">
                <div className="flex items-center justify-center rounded-3xl border border-border bg-card p-10 shadow-sm sm:p-14">
                  <div className="relative h-20 w-56 sm:h-24 sm:w-64">
                    <Image
                      src={affiliation.logo}
                      alt={affiliation.body}
                      fill
                      sizes="(min-width: 640px) 256px, 224px"
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {uniProgrammes.length > 0 ? (
        <section className="gutter-x section-y bg-surface" id="courses">
          <div className="mx-auto max-w-page">
            <div className="max-w-4xl">
              <Eyebrow>Academic Offerings</Eyebrow>
              <H3 className="mt-4">Programmes Under {affiliation.body}</H3>
              <P className="mt-4">
                Structured qualifications designed to develop deep subject
                expertise, practical industry competencies, and academic
                excellence — awarded by {affiliation.body}.
              </P>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {uniProgrammes.map((prog) => (
                <article
                  className="group flex flex-col justify-between rounded-xl border border-border bg-card p-5 shadow-xs transition-all duration-300 hover:border-accent hover:shadow-md sm:p-6"
                  id={prog.slug}
                  key={prog.id}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-md bg-muted px-2.5 py-1 font-body text-xs font-semibold text-accent">
                        <Icon className="size-3.5" icon={MortarboardIcon} />
                        {prog.qualification}
                      </span>
                      {prog.startingFrom === null ? null : (
                        <span className="rounded-md border border-primary-300 bg-primary-100 px-2 py-0.5 font-body text-xs font-medium text-primary-800">
                          Starting {prog.startingFrom}
                        </span>
                      )}
                    </div>

                    <H4 className="mt-4 text-xl text-ink transition-colors group-hover:text-accent">
                      {prog.title}
                    </H4>

                    <p className="mt-2 font-body text-xs text-ink-muted">
                      Awarding Body:{" "}
                      <span className="font-semibold text-ink">
                        {prog.awardingBody}
                      </span>
                    </p>

                    <ul className="mt-4 space-y-2 border-border/60 border-t pt-4">
                      <li className="flex items-center gap-2 text-ink-muted text-xs">
                        <Icon
                          className="size-3.5 text-accent"
                          icon={CheckIcon}
                        />
                        <span>
                          Global curriculum standards & certifications
                        </span>
                      </li>
                      <li className="flex items-center gap-2 text-ink-muted text-xs">
                        <Icon
                          className="size-3.5 text-accent"
                          icon={CheckIcon}
                        />
                        <span>Practical laboratory & project work</span>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-6 border-border/60 border-t pt-4">
                    <Link
                      className="inline-flex items-center gap-1.5 font-body text-xs font-semibold uppercase tracking-widest text-accent transition-colors hover:text-primary-800"
                      href="/admissions#apply"
                    >
                      <span>Apply for This Stream</span>
                      <Icon className="size-3.5" icon={ArrowRightIcon} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="gutter-x section-y bg-surface" id="courses">
          <div className="mx-auto max-w-page text-center">
            <Eyebrow>Academic Offerings</Eyebrow>
            <H3 className="mt-4">Programmes Under {affiliation.body}</H3>
            <P className="mt-4 mx-auto max-w-lg">
              {affiliation.scope} — detailed programme listings will be
              available soon. Contact admissions for more information.
            </P>
            <div className="mt-8">
              <Link
                href="/admissions"
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 font-body text-sm font-semibold text-white transition-colors hover:bg-primary-800"
              >
                <span>Contact Admissions</span>
                <Icon className="size-4" icon={ArrowRightIcon} />
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
