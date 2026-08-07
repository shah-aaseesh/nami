import { Icon } from "@/components/ui/icon";
import { Eyebrow, H3, P } from "@/components/ui/typography";
import type { Affiliation } from "@/lib/content";
import { ArrowRightIcon, AsteriskIcon, LocationIcon } from "@/lib/icons";

export function ProgramAffiliations({
  affiliations,
  levelTitle,
}: {
  readonly affiliations: readonly Affiliation[];
  readonly levelTitle: string;
}) {
  if (affiliations.length === 0) return null;

  return (
    <section className="gutter-x section-y bg-neutral-50" id="affiliations">
      <div className="mx-auto max-w-page">
        <div className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12">
          
          {/* Sticky Left Column */}
          <div className="lg:sticky lg:top-32 lg:col-span-5 lg:pb-12">
            <Eyebrow className="text-accent">Global Recognition</Eyebrow>
            <H3 className="mt-6 font-display text-4xl leading-tight text-ink sm:text-5xl lg:text-6xl">
              Accreditation & Partner Bodies
            </H3>
            <P className="mt-6 max-w-md text-lg text-ink-muted">
              NAMI College maintains rigorous academic quality assurance in direct
              partnership with renowned international and national awarding bodies.
            </P>
          </div>

          {/* Scrolling Right Column (List) */}
          <div className="mt-16 lg:col-span-7 lg:mt-0">
            <div className="flex flex-col border-t border-border">
              {affiliations.map((aff) => (
                <article
                  className="group relative flex flex-col border-b border-border py-10 transition-colors duration-500 hover:border-accent lg:py-12"
                  key={aff.id}
                >
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <span className="font-body text-xs font-bold uppercase tracking-widest text-accent transition-transform duration-500 group-hover:translate-x-2">
                      Since {aff.sinceYear}
                    </span>
                    <div className="flex size-10 items-center justify-center rounded-full border border-border transition-all duration-500 group-hover:-rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                      <Icon className="size-4" icon={ArrowRightIcon} />
                    </div>
                  </div>

                  <h4 className="mt-8 font-display text-3xl font-medium text-ink transition-transform duration-500 group-hover:translate-x-2 sm:text-4xl">
                    {aff.body}
                  </h4>

                  <div className="mt-6 space-y-4 transition-transform duration-500 group-hover:translate-x-2">
                    <p className="font-body text-base text-ink-muted">
                      Academic Scope: <span className="font-medium text-ink">{aff.scope}</span>
                    </p>

                    {aff.note === null ? null : (
                      <div className="flex items-start gap-2 text-ink-muted">
                        <Icon className="mt-1 size-4 shrink-0 text-accent" icon={AsteriskIcon} />
                        <span className="font-body text-sm">{aff.note}</span>
                      </div>
                    )}

                    <div className="flex items-start gap-2 text-ink-muted">
                      <Icon className="mt-1 size-4 shrink-0 text-primary-400" icon={LocationIcon} />
                      <span className="font-body text-sm">Delivered at NAMI Gokarneshwor & New Baneshwor Campuses.</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
