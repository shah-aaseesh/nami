import type { Route } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { H2, P } from "@/components/ui/typography";
import { ArrowRightIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import type { ALevelsClub } from "@/app/institutions/a-levels/_components/a-levels-clubs-copy";

export function ClubJoinCta({ club }: { readonly club: ALevelsClub }) {
  return (
    <section className="gutter-x section-y border-t border-border">
      <div className="mx-auto max-w-page">
        <Reveal>
          <div className="field-ink relative overflow-hidden rounded-3xl p-8 sm:p-12 lg:p-16">
            <div className="relative z-10 max-w-2xl">
              <span className="inline-block rounded-full bg-white/15 px-3.5 py-1 font-body text-xs font-semibold text-white/90 backdrop-blur-xs">
                Membership & Participation
              </span>
              <H2 className="mt-4 text-white">
                Become a member of {club.title}
              </H2>
              <P className="mt-4 text-sm text-white/80 sm:text-base leading-relaxed">
                Club memberships open at the beginning of each academic term
                during Student Club Registration Week. Students may also consult
                their tutor or the {club.facultyMentor} to get involved.
              </P>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  className={cn(
                    buttonVariants({ size: "lg", variant: "default" }),
                    "gap-2 bg-white text-primary-900 hover:bg-white/90 shadow-md",
                  )}
                  href={"/admissions" as Route}
                >
                  <span>Apply for Admission</span>
                  <Icon className="size-4" icon={ArrowRightIcon} />
                </Link>
                <Link
                  className={cn(
                    buttonVariants({ size: "lg", variant: "outline" }),
                    "gap-2 border-white/30 text-white hover:bg-white/10 hover:text-white",
                  )}
                  href={"/institutions/a-levels" as Route}
                >
                  <span>Back to NAMI College (A-Levels)</span>
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
