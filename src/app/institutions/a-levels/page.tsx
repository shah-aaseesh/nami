import type { Metadata } from "next";
import { InstitutionAwarding } from "@/components/shared/institution-awarding";
import { InstitutionContact } from "@/components/shared/institution-contact";
import { InstitutionNotices } from "@/components/shared/institution-notices";
import { PrincipalMessage } from "@/components/shared/principal-message";
import { SharedCampusGallery } from "@/components/shared/shared-campus-gallery";
import { SharedHero } from "@/components/shared/shared-hero";
import { Testimonials } from "@/components/shared/testimonials";
import { content } from "@/lib/content";
import { institutionPath } from "@/lib/content/institutions";
import { createMetadata } from "@/lib/seo";
import { CollegeCambridge } from "./_components/college-cambridge";
import { collegeCopy } from "./_components/college-copy";
import { CollegeEntry } from "./_components/college-entry";
import { CollegeMilestones } from "./_components/college-milestones";
import { collegeMilestonesCopy } from "./_components/college-milestones-copy";
import { CollegeSubjects } from "./_components/college-subjects";

export const metadata: Metadata = createMetadata({
  path: institutionPath("college"),
  title: collegeCopy.meta.title,
  description: collegeCopy.meta.description,
});

export default async function CollegePage() {
  const [institution, leadership, affiliations, testimonials] =
    await Promise.all([
      content.getInstitution(),
      content.getLeadership(),
      content.getAffiliations(),
      content.getTestimonials(),
    ]);

  const principal =
    leadership.academics.find(
      (item) => item.slug === collegeCopy.principal.slug,
    ) ?? null;
  const alumni = testimonials.filter((item) => item.institution === "college");

  const socials = institution.contact.socialProfiles.filter(
    (profile) => profile.destination === "external",
  );
  const watch = socials.find((profile) => profile.platform === "youtube");

  return (
    <>
      <SharedHero
        entity={institution.entities.college}
        heading={collegeCopy.masthead.heading}
        heroLabel={collegeCopy.masthead.heroLabel}
        motto={institution.motto}
        primaryCta={collegeCopy.masthead.cta}
        slides={collegeCopy.masthead.slides}
        standfirst={collegeCopy.masthead.standfirst}
        watch={watch ?? null}
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
      <CollegeSubjects copy={collegeCopy.subjects} />

      <InstitutionAwarding
        affiliations={affiliations}
        copy={collegeCopy.awarding}
        id="awarding"
        levelSlug={collegeCopy.levelSlug}
      />

      <CollegeMilestones copy={collegeMilestonesCopy} />

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

      <InstitutionContact id="contact" institution="college" />
    </>
  );
}
