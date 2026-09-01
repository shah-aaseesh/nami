import type { Metadata } from "next";

import { CareerPlacement } from "@/components/shared/career-placement";
import type { CareerPartner } from "@/components/shared/partner-carousel";
import { Testimonials } from "@/components/shared/testimonials";
import { content } from "@/lib/content";
import { createMetadata } from "@/lib/seo";
import { CareersBenefits } from "./_components/careers-benefits";
import {
  careersCopy,
  firstJobStories,
  staffTestimonials,
} from "./_components/careers-copy";
import { CareersFirstJob } from "./_components/careers-first-job";
import { CareersMasthead } from "./_components/careers-masthead";
import { CareersVacancies } from "./_components/careers-vacancies";

export const metadata: Metadata = createMetadata({
  path: "/careers",
  title: careersCopy.meta.title,
  description: careersCopy.meta.description,
});

export default async function CareersPage() {
  const [vacancies, partners] = await Promise.all([
    content.getVacancies(),
    content.getPartners(),
  ]);

  const networkPartners: readonly CareerPartner[] = partners.map((partner) => ({
    id: partner.id,
    name: partner.name,
    logo: partner.logo,
  }));

  return (
    <>
      <CareersMasthead copy={careersCopy.masthead} />
      <CareersVacancies section={careersCopy.vacancies} vacancies={vacancies} />
      <CareersBenefits copy={careersCopy.benefits} />
      <Testimonials
        id="staff-stories"
        items={staffTestimonials}
        section={careersCopy.staffTestimonials}
      />
      <CareersFirstJob copy={careersCopy.firstJob} stories={firstJobStories} />
      <CareerPlacement
        copy={careersCopy.placement}
        id="career-placement"
        partners={networkPartners}
      />
    </>
  );
}
