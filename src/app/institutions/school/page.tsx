import type { Metadata } from "next";
import { InstitutionGallery } from "@/components/shared/institution-gallery";
import { InstitutionNotices } from "@/components/shared/institution-notices";
import { PrincipalMessage } from "@/components/shared/principal-message";
import { Testimonials } from "@/components/shared/testimonials";
import { content } from "@/lib/content";
import { createMetadata } from "@/lib/seo";
import { SchoolAdmission } from "./_components/school-admission";
import { SchoolBands } from "./_components/school-bands";
import { dummyParentTestimonials, schoolCopy } from "./_components/school-copy";
import { SchoolDay } from "./_components/school-day";
import { SchoolHero } from "./_components/school-hero";

export const metadata: Metadata = createMetadata({
  path: "/institutions/school",
  title: schoolCopy.meta.title,
  description: schoolCopy.meta.description,
});

export default async function SchoolPage() {
  const [institution, leadership] = await Promise.all([
    content.getInstitution(),
    content.getLeadership(),
  ]);

  const principal =
    leadership.academics.find(
      (item) => item.slug === schoolCopy.principal.slug,
    ) ?? null;

  return (
    <>
      <SchoolHero
        copy={schoolCopy.masthead}
        entity={institution.entities.school}
      />

      <SchoolBands copy={schoolCopy.bands} id="academics" />

      {principal === null ? null : (
        <PrincipalMessage
          eyebrow={schoolCopy.principal.eyebrow}
          heading={schoolCopy.principal.heading}
          id="principal"
          message={schoolCopy.principal.message}
          person={{
            name: principal.name,
            portrait: schoolCopy.principal.portrait,
            title: principal.title,
          }}
        />
      )}

      <InstitutionGallery
        copy={schoolCopy.gallery}
        id="gallery"
        institution="school"
      />

      <SchoolDay copy={schoolCopy.day} id="campus" />

      <Testimonials
        id="parents"
        items={dummyParentTestimonials}
        section={schoolCopy.parents}
      />

      <SchoolAdmission copy={schoolCopy.admission} id="admission" />

      <InstitutionNotices
        copy={schoolCopy.notices}
        id="notices"
        institution="school"
      />
    </>
  );
}
