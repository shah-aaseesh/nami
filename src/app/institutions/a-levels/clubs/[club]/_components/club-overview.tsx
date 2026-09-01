import { Reveal, RevealItem } from "@/components/motion/reveal";
import { Icon } from "@/components/ui/icon";
import { Eyebrow, H2, P } from "@/components/ui/typography";
import { CheckIcon, QuoteIcon } from "@/lib/icons";
import type { ALevelsClub } from "@/app/institutions/a-levels/_components/a-levels-clubs-copy";

export function ClubOverview({ club }: { readonly club: ALevelsClub }) {
  return (
    <section className="gutter-x section-y border-t border-border">
      <div className="mx-auto max-w-page">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Overview copy & Quote */}
          <div className="lg:col-span-7">
            <Reveal stagger={0.08}>
              <RevealItem>
                <Eyebrow>Club Philosophy & Purpose</Eyebrow>
                <H2 className="mt-3">
                  Nurturing potential through passion and practice.
                </H2>
              </RevealItem>

              <div className="mt-8 flex flex-col gap-5">
                {club.overview.map((paragraph) => (
                  <RevealItem key={paragraph.slice(0, 30)}>
                    <P className="text-base leading-relaxed text-ink/90 sm:text-lg">
                      {paragraph}
                    </P>
                  </RevealItem>
                ))}
              </div>

              {/* Quote Card */}
              <RevealItem className="mt-10">
                <div className="relative overflow-hidden rounded-2xl bg-primary-50/80 p-6 sm:p-8 border border-primary-100">
                  <Icon
                    className="size-8 text-primary-300 mb-4"
                    icon={QuoteIcon}
                  />
                  <blockquote className="font-display text-lg italic text-primary-950 sm:text-xl leading-relaxed">
                    &ldquo;{club.quote.text}&rdquo;
                  </blockquote>
                  <div className="mt-4 font-body text-xs font-semibold uppercase tracking-wider text-primary-700">
                    — {club.quote.author}
                  </div>
                </div>
              </RevealItem>
            </Reveal>
          </div>

          {/* Right Column: Key Objectives Card */}
          <div className="lg:col-span-5">
            <Reveal y={24}>
              <div className="rounded-3xl border border-border bg-white p-7 sm:p-9 shadow-sm">
                <Eyebrow className="text-primary-700">Core Objectives</Eyebrow>
                <h3 className="mt-2 font-display text-2xl font-normal text-ink">
                  What we aim to achieve
                </h3>

                <ul className="mt-6 flex flex-col gap-4">
                  {club.objectives.map((objective, index) => (
                    <li className="flex items-start gap-3.5" key={index}>
                      <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-800">
                        <Icon className="size-3" icon={CheckIcon} />
                      </span>
                      <span className="font-body text-sm text-ink/85 leading-relaxed">
                        {objective}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
