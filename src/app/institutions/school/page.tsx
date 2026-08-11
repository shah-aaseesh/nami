import type { Metadata } from "next";
import { InstitutionGallery } from "@/components/shared/institution-gallery";
import { InstitutionNotices } from "@/components/shared/institution-notices";
import { PrincipalMessage } from "@/components/shared/principal-message";
import { content } from "@/lib/content";
import { createMetadata } from "@/lib/seo";
import { SchoolAdmission } from "./_components/school-admission";
import { SchoolBands } from "./_components/school-bands";
import { schoolCopy } from "./_components/school-copy";
import { SchoolDay } from "./_components/school-day";
import { SchoolMasthead } from "./_components/school-masthead";
import { SchoolVoices } from "./_components/school-voices";

export const metadata: Metadata = createMetadata({
  path: "/institutions/school",
  title: schoolCopy.meta.title,
  description: schoolCopy.meta.description,
});

export default async function SchoolPage() {
  const [institution, leadership, levels, affiliations] = await Promise.all([
    content.getInstitution(),
    content.getLeadership(),
    content.getAcademicLevels(),
    content.getAffiliations(),
  ]);

  const campus =
    institution.campuses.find((item) => item.slug === schoolCopy.campusSlug) ??
    null;
  const level =
    levels.find((item) => item.slug === schoolCopy.levelSlug) ?? null;
  const principal =
    leadership.academics.find(
      (item) => item.slug === schoolCopy.principal.slug,
    ) ?? null;
  const schoolAffiliations = affiliations.filter(
    (item) => item.levelSlug === schoolCopy.levelSlug,
  );
  const phone = institution.contact.phones[0] ?? null;

  return (
    <>
      <SchoolMasthead
        campus={campus}
        copy={schoolCopy.masthead}
        entity={institution.entities.school}
        image={level?.image ?? null}
        phone={phone}
      />

      <SchoolBands
        affiliations={schoolAffiliations}
        copy={schoolCopy.bands}
        id="academics"
      />

      {principal === null ? null : (
        <PrincipalMessage
          eyebrow={schoolCopy.principal.eyebrow}
          heading={schoolCopy.principal.heading}
          id="principal"
          message={schoolCopy.principal.message}
          person={{
            name: principal.name,
            portrait: null,
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

      <SchoolVoices copy={schoolCopy.voices} id="parents" />

      <SchoolAdmission
        copy={schoolCopy.admission}
        id="admission"
        phone={phone}
      />

      <InstitutionNotices
        copy={schoolCopy.notices}
        id="notices"
        institution="school"
      />
    </>
  );
}
