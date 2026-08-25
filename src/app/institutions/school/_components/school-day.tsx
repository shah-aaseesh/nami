"use client";

import Image from "next/image";
import { SectionHeader } from "@/components/shared/section-header";
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { ContentImage } from "@/lib/content";

export type SchoolDayMoment = {
  readonly title: string;
  readonly body: string;
  readonly photo?: ContentImage;
};

export type SchoolDayCopy = {
  readonly eyebrow: string;
  readonly heading: string;
  readonly standfirst: string;
  readonly campusLabel: string;
  readonly campus: readonly SchoolDayMoment[];
};

const PHOTO_SIZES =
  "(min-width: 1568px) 300px, (min-width: 1024px) 240px, (min-width: 640px) 200px, 160px";

export function SchoolDay({
  copy,
  id,
}: {
  readonly copy: SchoolDayCopy;
  readonly id?: string;
}) {
  return (
    <section className="field-brand gutter-x section-y" id={id}>
      <div className="mx-auto max-w-page">
        <SectionHeader
          eyebrow={copy.heading}
          title={copy.eyebrow ?? "A day at NAMI"}
          description={copy.standfirst}
        />

        <div className="mt-12 lg:mt-16">
          <ul className="grid border-t border-primary-800/80 lg:grid-cols-2 lg:gap-x-14 xl:gap-x-16">
            {copy.campus.map((entry) => (
              <li
                className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 border-b border-primary-800/80 py-6"
                key={entry.title}
              >
                {entry.photo && (
                  <div className="relative aspect-[4/3] w-full sm:w-40 lg:w-44 shrink-0 overflow-hidden rounded-2xl shadow-md bg-primary-800/30">
                    <Image
                      alt={entry.photo.alt}
                      className="h-full w-full object-cover"
                      fill
                      sizes={PHOTO_SIZES}
                      src={entry.photo.src}
                    />
                  </div>
                )}

                <div className="min-w-0 flex-1">
                  <Accordion className="border-none w-full">
                    <AccordionItem value={entry.title} className="border-none">
                      <AccordionTrigger className="p-0 text-start group hover:text-white transition-colors">
                        <h3 className="font-display text-2xl sm:text-3xl font-normal text-white leading-snug group-hover:text-white">
                          {entry.title}
                        </h3>
                      </AccordionTrigger>
                      <AccordionPanel className="p-0 pt-3 pe-0">
                        <p className="font-body text-sm sm:text-base leading-relaxed text-primary-200">
                          {entry.body}
                        </p>
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
