import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { Eyebrow, H3, P } from "@/components/ui/typography";
import type { Affiliation } from "@/lib/content";
import { ArrowRightIcon } from "@/lib/icons";

export function ProgramAffiliations({
  affiliations,
}: {
  readonly affiliations: readonly Affiliation[];
}) {
  if (affiliations.length === 0) return null;

  return (
    <section className="gutter-x section-y bg-neutral-50" id="affiliations">
      <div className="mx-auto max-w-page">
        <div className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12">
          <div className="lg:sticky lg:top-32 lg:col-span-5 lg:pb-12">
            <Eyebrow className="text-accent">Global Recognition</Eyebrow>
            <H3 className="mt-4 font-display text-3xl leading-tight text-ink sm:mt-6 sm:text-5xl lg:text-6xl">
              Accreditation & Partner Bodies
            </H3>
            <P className="mt-4 max-w-md text-base text-ink-muted sm:mt-6 sm:text-lg">
              NAMI maintains rigorous academic quality assurance in direct
              partnership with renowned international and national awarding
              bodies.
            </P>
          </div>

          <div className="mt-10 sm:mt-12 lg:col-span-7 lg:mt-0">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
              {affiliations.map((aff) => (
                <Link
                  href={`/programs/${aff.levelSlug}/${aff.slug}`}
                  scroll
                  className="group relative flex flex-col items-center text-center rounded-2xl bg-white border border-border p-8 transition-all duration-500 hover:border-accent hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  key={aff.id}
                >
                  <span className="absolute top-4 left-4 sm:top-6 sm:left-6 font-body text-xs font-bold uppercase tracking-widest text-accent bg-accent/10 px-3 py-1 rounded-full shrink-0">
                    Since {aff.sinceYear}
                  </span>

                  <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex size-10 items-center justify-center rounded-full border border-border text-ink-muted transition-all duration-500 group-hover:-rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                    <Icon className="size-4" icon={ArrowRightIcon} />
                  </div>

                  <div className="flex-1 flex items-center justify-center w-full min-h-[120px] mb-6 mt-4">
                    {aff.logo !== null ? (
                      <div className="relative h-20 w-full mix-blend-multiply">
                        <Image
                          src={aff.logo}
                          alt={aff.body}
                          fill
                          sizes="(max-width: 640px) calc(100vw - 7rem), (max-width: 1024px) calc(50vw - 6.5rem), calc(25vw - 3rem)"
                          className="object-contain"
                        />
                      </div>
                    ) : null}
                  </div>

                  <h4 className="font-display text-xl font-medium text-ink">
                    {aff.body}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
