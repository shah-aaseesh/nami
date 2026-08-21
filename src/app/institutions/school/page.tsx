import type { Metadata } from "next";
import { InstitutionNotices } from "@/components/shared/institution-notices";
import { PrincipalMessage } from "@/components/shared/principal-message";
import { SharedCampusGallery } from "@/components/shared/shared-campus-gallery";
import { SharedHero } from "@/components/shared/shared-hero";
import { Testimonials } from "@/components/shared/testimonials";
import { content } from "@/lib/content";
import { createMetadata } from "@/lib/seo";
import { SchoolAdmission } from "./_components/school-admission";
import { SchoolBands } from "./_components/school-bands";
import { dummyParentTestimonials, schoolCopy } from "./_components/school-copy";
import { SchoolDay } from "./_components/school-day";

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
  const phone = institution.contact.phones[0] ?? null;

  return (
    <>
      <SharedHero
        entity={institution.entities.school}
        heroLabel={schoolCopy.masthead.heroLabel}
        slides={schoolCopy.masthead.slides}
        standfirst={schoolCopy.masthead.tagline}
        primaryCta={schoolCopy.masthead.admissionCta}
      />

      {principal === null ? null : (
        <PrincipalMessage
          eyebrow={schoolCopy.principal.eyebrow}
          id="principal"
          message={schoolCopy.principal.message}
          person={{
            name: principal.name,
            portrait: schoolCopy.principal.portrait,
            title: principal.title,
          }}
        />
      )}

      <SchoolBands copy={schoolCopy.bands} id="academics" />
      <SchoolAdmission copy={schoolCopy.admission} phone={phone} />

      <SchoolDay copy={schoolCopy.day} id="day" />

      <Testimonials
        id="parents"
        items={dummyParentTestimonials}
        section={schoolCopy.parents}
      />
      <SharedCampusGallery
        institution={institution.entities.school.role}
        tone="ink"
      />

      <InstitutionNotices
        copy={schoolCopy.notices}
        id="notices"
        institution="school"
      />
    </>
  );
}
