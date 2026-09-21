"use client";

import { Testimonials } from "@/components/shared/testimonials";
import type { SectionCopy, Testimonial } from "@/lib/content";
import { useSchoolBand } from "./school-band-context";

export function SchoolBandTestimonials({
  parentItems,
  parentSection,
  plusTwoItems,
  plusTwoSection,
}: {
  readonly parentItems: readonly Testimonial[];
  readonly parentSection: SectionCopy;
  readonly plusTwoItems: readonly Testimonial[];
  readonly plusTwoSection: SectionCopy;
}) {
  const { activeBand } = useSchoolBand();

  if (activeBand === "secondary") {
    return (
      <Testimonials
        id="plus-two-testimonials"
        items={plusTwoItems}
        key="secondary"
        section={plusTwoSection}
      />
    );
  }

  return (
    <Testimonials
      id="parents"
      items={parentItems}
      key="primary"
      section={parentSection}
    />
  );
}
