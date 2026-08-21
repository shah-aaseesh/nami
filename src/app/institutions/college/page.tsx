import type { Metadata } from "next";
import { InstitutionNotices } from "@/components/shared/institution-notices";
import { PrincipalMessage } from "@/components/shared/principal-message";
import { SharedCampusGallery } from "@/components/shared/shared-campus-gallery";
import { SharedHero } from "@/components/shared/shared-hero";
import { Testimonials } from "@/components/shared/testimonials";
import { content } from "@/lib/content";
import { createMetadata } from "@/lib/seo";
import { CollegeCambridge } from "./_components/college-cambridge";
import { collegeCopy } from "./_components/college-copy";
import { CollegeEntry } from "./_components/college-entry";
import { CollegeMastheadFacts } from "./_components/college-masthead-facts";
import { CollegeMilestones } from "./_components/college-milestones";
import { collegeMilestonesCopy } from "./_components/college-milestones-copy";
import { CollegeSubjects } from "./_components/college-subjects";

export const metadata: Metadata = createMetadata({
  path: "/institutions/college",
  title: collegeCopy.meta.title,
  description: collegeCopy.meta.description,
});

export default async function CollegePage() {
  const [institution, leadership, testimonials] = await Promise.all([
    content.getInstitution(),
    content.getLeadership(),
    content.getTestimonials(),
  ]);

  const campus =
    institution.campuses.find((item) => item.slug === collegeCopy.campusSlug) ??
    null;
  const principal =
    leadership.academics.find(
      (item) => item.slug === collegeCopy.principal.slug,
    ) ?? null;
  const alumni = testimonials.filter((item) => item.institution === "college");

  return (
    <>
      <SharedHero
        entity={institution.entities.college}
        heroLabel={collegeCopy.masthead.heroLabel}
        slides={collegeCopy.masthead.slides}
        heading={collegeCopy.masthead.heading}
        standfirst={collegeCopy.masthead.standfirst}
        primaryCta={collegeCopy.masthead.cta}
      />

      <CollegeMastheadFacts
        campus={campus}
        copy={collegeCopy.masthead}
        entity={institution.entities.college}
      />

      {principal === null ? null : (
        <PrincipalMessage
          eyebrow={collegeCopy.principal.eyebrow}
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
      <CollegeMilestones copy={collegeMilestonesCopy} />
      <CollegeSubjects copy={collegeCopy.subjects} />

      <SharedCampusGallery
        institution={institution.entities.college.role}
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
