"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { AdmissionsFormSection } from "@/components/shared/admissions-form";
import { buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { H2, P } from "@/components/ui/typography";
import { useAdmissionsParallax } from "@/hooks/motion/use-admissions-parallax";
import { INSTITUTIONS, type InstitutionId } from "@/lib/content/institutions";
import { schoolGrades } from "@/lib/content/school-grades";
import { ArrowRightIcon, CheckIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

const PROGRAM_CONTENT: Record<
  InstitutionId,
  {
    description: string;
    requirements: readonly string[];
    image: string;
    cta: string;
  }
> = {
  school: {
    description: `NAMI International School offers a diverse, experiential curriculum within the framework of the Nepal Government's National Curriculum for ${schoolGrades.labelPlural}, continuing into NEB +2 in Science and Management with state-of-the-art facilities and experienced faculty.`,
    requirements: [
      "Entrance examination (school) or SEE / CBSE minimum grade (+2)",
      "Previous academic transcripts and character certificate",
      "Birth certificate copy and completed admission application form",
    ],
    image: "/nami/level-school.jpg",
    cta: "Visit the School",
  },
  college: {
    description:
      "Home to the Cambridge International A Level — the 'gold standard' of Cambridge Assessment International Education — globally recognized for university admissions.",
    requirements: [
      "SEE / GCSE / CBSE or equivalent courses at time of admission",
      "Strong academic record",
      "Entrance interview",
    ],
    image: "/nami/level-a-level.jpg",
    cta: "Explore NAMI College",
  },
  bachelors: {
    description:
      "World-class partner-university degrees right here in Nepal. Expand your horizons with industry-focused undergraduate and postgraduate courses.",
    requirements: [
      "Completed +2 / A-Level or equivalent",
      "Minimum academic threshold",
      "English language proficiency",
    ],
    image: "/nami/level-bachelor-master.jpg",
    cta: "See the Programmes",
  },
};

const PROGRAMS = INSTITUTIONS.map((institution) => ({
  ...institution,
  ...PROGRAM_CONTENT[institution.id],
}));

export function AdmissionsClient() {
  const container = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);

  useAdmissionsParallax(container, sectionRef, leftColRef);

  return (
    <div ref={container} className="w-full">
      <section className="gutter-x mt-16 lg:mt-24">
        <div
          ref={sectionRef}
          className="mx-auto max-w-page relative lg:grid lg:grid-cols-12 lg:gap-16"
        >
          <div className="hidden lg:block lg:col-span-6 relative">
            <div
              ref={leftColRef}
              className="relative h-[calc(100vh-16rem)] w-full rounded-2xl overflow-hidden bg-muted shadow-sm"
            >
              {PROGRAMS.map((prog, i) => (
                <div
                  key={prog.id}
                  className={cn(
                    "program-image absolute inset-0",
                    `program-image-${i}`,
                  )}
                  style={{ opacity: i === 0 ? 1 : 0 }}
                >
                  <Image
                    src={prog.image}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                    alt={prog.title}
                  />
                  <div className="absolute inset-0 bg-black/10" />
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col">
            {PROGRAMS.map((prog, i) => (
              <div
                key={prog.id}
                className={cn(
                  "program-section flex flex-col justify-center py-8 sm:py-16 lg:py-32 lg:min-h-[60vh]",
                  i === PROGRAMS.length - 1 ? "" : "border-b border-border",
                )}
              >
                <div className="lg:hidden w-full aspect-[4/3] relative rounded-xl overflow-hidden mb-8 shadow-sm">
                  <Image
                    src={prog.image}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                    alt={prog.title}
                  />
                  <div className="absolute inset-0 bg-black/10" />
                </div>

                <H2 className="mb-4 font-display text-2xl sm:text-3xl">
                  {prog.title}
                </H2>
                <P className="text-ink-muted mb-8 text-lg">
                  {prog.description}
                </P>

                <div className="bg-muted/50 rounded-xl p-6 mb-8 border border-border/50">
                  <h3 className="font-semibold text-ink mb-4 tracking-wide text-sm uppercase">
                    Key Requirements
                  </h3>
                  <ul className="flex flex-col gap-3">
                    {prog.requirements.map((req) => (
                      <li
                        key={req}
                        className="flex items-start gap-3 text-ink-muted"
                      >
                        <div className="mt-0.5 rounded-full bg-accent/10 p-1 text-accent shrink-0">
                          <Icon icon={CheckIcon} className="size-3" />
                        </div>
                        <span className="text-sm">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={prog.href}
                  className={buttonVariants({
                    size: "lg",
                    variant: "default",
                    className: "w-full sm:w-auto self-start",
                  })}
                >
                  {prog.cta}{" "}
                  <Icon icon={ArrowRightIcon} className="ml-2 size-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AdmissionsFormSection />
    </div>
  );
}
