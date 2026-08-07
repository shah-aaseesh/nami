"use client";

import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { H2, P } from "@/components/ui/typography";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { ArrowRightIcon, CheckIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { MultiStepForm } from "./multi-step-form";

const PROGRAMS = [
  {
    id: "school",
    title: "School Level (I-VII)",
    description:
      "NAMI International School offers a diverse and balanced curriculum within the framework of the Nepal Government's National Curriculum, focusing on experiential learning.",
    requirements: [
      "Must pass the entrance examination",
      "Previous school academic transcripts",
      "Birth certificate copy",
    ],
    link: "school.nami.edu.np/notice/2",
    image: "/nami/level-school.jpg",
  },
  {
    id: "plus2",
    title: "+2 Programs",
    description:
      "Offering 10+2 in Science and Management Academia with state-of-the-art facilities and experienced faculty.",
    requirements: [
      "SEE / CBSE or equivalent minimum grade",
      "Completed admission application form",
      "Character certificate",
    ],
    link: "Application_form_nami_international_school_plus_2.pdf",
    image: "/nami/level-plus-two.jpg",
  },
  {
    id: "alevel",
    title: "Cambridge A-Level",
    description:
      "The 'gold standard' by Cambridge Assessment International Education. Globally recognized equivalent for university admissions.",
    requirements: [
      "SEE / GCSE / CBSE or equivalent courses at time of admission",
      "Strong academic record",
      "Entrance interview",
    ],
    link: "college.nami.edu.np/notice/2",
    image: "/nami/level-a-level.jpg",
  },
  {
    id: "bachelor",
    title: "Bachelor Programs",
    description:
      "World-class UK degrees right here in Nepal. Expand your horizons with our industry-focused undergraduate courses.",
    requirements: [
      "Completed +2 / A-Level or equivalent",
      "Minimum academic threshold",
      "English language proficiency",
    ],
    link: "college.nami.edu.np/notice/2",
    image: "/nami/level-bachelor-master.jpg",
  },
];

export function AdmissionsClient() {
  const container = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!container.current) return;

      const section = sectionRef.current;
      const leftCol = leftColRef.current;
      const sections = gsap.utils.toArray<HTMLElement>(".program-section");
      const images = gsap.utils.toArray<HTMLElement>(".program-image");

      if (section && leftCol) {
        ScrollTrigger.create({
          trigger: section,
          start: "top 128px",
          end: "bottom bottom",
          pin: leftCol,
          anticipatePin: 1,
        });
      }

      sections.forEach((sec, i) => {
        ScrollTrigger.create({
          trigger: sec,
          start: "top center",
          end: "bottom center",
          onEnter: () => {
            images.forEach((img, index) => {
              gsap.to(img, {
                opacity: i === index ? 1 : 0,
                duration: 0.4,
                overwrite: "auto",
              });
            });
          },
          onEnterBack: () => {
            images.forEach((img, index) => {
              gsap.to(img, {
                opacity: i === index ? 1 : 0,
                duration: 0.4,
                overwrite: "auto",
              });
            });
          },
        });
      });
    },
    { scope: container },
  );

  return (
    <div ref={container} className="w-full">
      {/* ScrollTrigger Pinned Image Section */}
      <section className="gutter-x mt-16 lg:mt-24 mb-24">
        <div
          ref={sectionRef}
          className="mx-auto max-w-page relative lg:grid lg:grid-cols-12 lg:gap-16"
        >
          {/* Left Side: Pinned Images */}
          <div className="hidden lg:block lg:col-span-6 relative">
            <div
              ref={leftColRef}
              className="relative h-[calc(100vh-16rem)] w-full rounded-2xl overflow-hidden bg-surface-muted shadow-sm"
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

          {/* Right Side: Scrolling Content */}
          <div className="lg:col-span-6 flex flex-col">
            {PROGRAMS.map((prog, i) => (
              <div
                key={prog.id}
                className={cn(
                  "program-section flex flex-col justify-center py-8 sm:py-16 lg:py-32 lg:min-h-[60vh]",
                  i === PROGRAMS.length - 1 ? "" : "border-b border-border",
                )}
              >
                {/* Mobile Image */}
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

                <div className="bg-surface-muted/50 rounded-xl p-6 mb-8 border border-border/50">
                  <h4 className="font-semibold text-ink mb-4 tracking-wide text-sm uppercase">
                    Key Requirements
                  </h4>
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
                  href={`https://${prog.link}` as Route}
                  className={buttonVariants({
                    variant: "quiet",
                    className: "w-full sm:w-auto self-start",
                  })}
                >
                  Download Form{" "}
                  <Icon icon={ArrowRightIcon} className="ml-2 size-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="bg-surface-muted border-t border-border section-y gutter-x"
        id="apply"
      >
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <H2 className="font-display mb-4 text-3xl sm:text-4xl lg:text-5xl">
            Start Your Application
          </H2>
          <P className="text-ink-muted text-lg">
            Ready to apply? Submit your details through our comprehensive
            application form below and our admissions team will guide you
            through the process.
          </P>
        </div>

        <MultiStepForm />
      </section>
    </div>
  );
}
