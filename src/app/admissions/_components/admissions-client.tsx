"use client";

import type { Route } from "next";
import Image from "next/image";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { H2, H3, P } from "@/components/ui/typography";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { ArrowRightIcon, CheckIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

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
                  "program-section flex flex-col justify-center min-h-[60vh] py-16 lg:py-32",
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

                <H2 className="mb-4 font-display text-3xl">{prog.title}</H2>
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

                <Button
                  variant="quiet"
                  href={`https://${prog.link}` as Route}
                  className="w-full sm:w-auto self-start"
                >
                  Download Form{" "}
                  <Icon icon={ArrowRightIcon} className="ml-2 size-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Form Section */}
      <section className="bg-surface-muted border-t border-border section-y gutter-x">
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <H2 className="font-display mb-4">Start Your Application</H2>
            <P className="text-ink-muted text-lg">
              Have questions or ready to apply? Submit your details below and
              our admissions team will guide you through the process.
            </P>
          </div>

          <div className="bg-surface border border-border rounded-2xl p-8 sm:p-12 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-accent" />

            <form
              className="flex flex-col gap-6"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="Jane" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="jane@example.com"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="+977 9800000000" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="program">Program of Interest</Label>
                <div className="relative">
                  <select
                    id="program"
                    defaultValue=""
                    className="flex h-12 w-full rounded-md border border-border bg-surface px-4 py-2 text-base text-ink focus:outline-none focus:ring-2 focus:ring-accent transition-colors appearance-none"
                  >
                    <option value="" disabled>
                      Select a program
                    </option>
                    <option value="school">School Level (I-VII)</option>
                    <option value="plus2">+2 Programs</option>
                    <option value="alevel">Cambridge A-Level</option>
                    <option value="bachelor">Bachelor Programs</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-ink-muted">
                    <Icon icon={ArrowRightIcon} className="size-4 rotate-90" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="message">Any Questions?</Label>
                <Textarea
                  id="message"
                  placeholder="How can we help you?"
                  className="min-h-[150px]"
                />
              </div>

              <Button type="submit" size="lg" className="w-full mt-4">
                Submit Inquiry
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
