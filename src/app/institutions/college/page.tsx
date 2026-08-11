import type { Metadata } from "next";
import { InstitutionGallery } from "@/components/shared/institution-gallery";
import { InstitutionNotices } from "@/components/shared/institution-notices";
import { PrincipalMessage } from "@/components/shared/principal-message";
import { Testimonials } from "@/components/shared/testimonials";
import { content } from "@/lib/content";
import { createMetadata } from "@/lib/seo";
import { CollegeCambridge } from "./_components/college-cambridge";
import { collegeCopy } from "./_components/college-copy";
import { CollegeEntry } from "./_components/college-entry";
import { CollegeMasthead } from "./_components/college-masthead";
import { CollegeSubjects } from "./_components/college-subjects";

export const metadata: Metadata = createMetadata({
  path: "/institutions/college",
  title: collegeCopy.meta.title,
  description: collegeCopy.meta.description,
});

export default async function CollegePage() {
  const [institution, leadership, levels, testimonials] = await Promise.all([
    content.getInstitution(),
    content.getLeadership(),
    content.getAcademicLevels(),
    content.getTestimonials(),
  ]);

  const campus =
    institution.campuses.find((item) => item.slug === collegeCopy.campusSlug) ??
    null;
  const level =
    levels.find((item) => item.slug === collegeCopy.levelSlug) ?? null;
  const principal =
    leadership.academics.find(
      (item) => item.slug === collegeCopy.principal.slug,
    ) ?? null;
  const alumni = testimonials.filter((item) => item.institution === "college");

  return (
    <>
      <CollegeMasthead
        campus={campus}
        copy={collegeCopy.masthead}
        entity={institution.entities.college}
        image={level?.image ?? null}
      />

      {principal === null ? null : (
        <PrincipalMessage
          eyebrow={collegeCopy.principal.eyebrow}
          heading={collegeCopy.principal.heading}
          id="principal"
          message={collegeCopy.principal.message}
          person={{
            name: principal.name,
            portrait: collegeCopy.principal.portrait,
            title: principal.title,
          }}
        />
      )}

      <CollegeCambridge copy={collegeCopy.cambridge} />
      <CollegeSubjects copy={collegeCopy.subjects} />

      <InstitutionGallery
        copy={collegeCopy.gallery}
        id="gallery"
        institution="college"
        tone="ink"
      />

      <Testimonials id="alumni" items={alumni} section={collegeCopy.alumni} />

      <CollegeEntry copy={collegeCopy.entry} />

      <InstitutionNotices
        copy={collegeCopy.notices}
        id="notices"
        institution="college"
      />
    </>
  );
}
