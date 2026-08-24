import type { Metadata } from "next";
import { InstitutionContact } from "@/components/shared/institution-contact";
import { InstitutionNotices } from "@/components/shared/institution-notices";
import { PrincipalMessage } from "@/components/shared/principal-message";
import { SharedCampusGallery } from "@/components/shared/shared-campus-gallery";
import { SharedHero } from "@/components/shared/shared-hero";
import { Testimonials } from "@/components/shared/testimonials";
import { content } from "@/lib/content";
import { institutionPath } from "@/lib/content/institutions";
import { schoolPrincipal } from "@/lib/content/school-principal";
import { createMetadata } from "@/lib/seo";
import { SchoolAdmission } from "./_components/school-admission";
import { SchoolBands } from "./_components/school-bands";
import { parentTestimonials, schoolCopy } from "./_components/school-copy";
import { SchoolDay } from "./_components/school-day";

export const metadata: Metadata = createMetadata({
  path: institutionPath("school"),
  title: schoolCopy.meta.title,
  description: schoolCopy.meta.description,
});

export default async function SchoolPage() {
  const [institution, leadership] = await Promise.all([
    content.getInstitution(),
    content.getLeadership(),
  ]);

  const principal =
    leadership.academics.find((item) => item.slug === schoolPrincipal.slug) ??
    null;

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
          eyebrow={schoolPrincipal.eyebrow}
          id="principal"
          message={schoolPrincipal.message}
          person={{
            name: principal.name,
            portrait: principal.portrait,
            title: principal.title,
          }}
        />
      )}

      <SchoolAdmission copy={schoolCopy.admission} />
      <SchoolBands copy={schoolCopy.bands} id="academics" />

      <SchoolDay copy={schoolCopy.day} id="day" />

      <Testimonials
        id="parents"
        items={parentTestimonials}
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

      <InstitutionContact id="contact" institution="school" />
    </>
  );
}
