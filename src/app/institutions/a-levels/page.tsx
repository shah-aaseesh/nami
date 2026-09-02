import type { Metadata } from "next";
import { SiteCtaBand } from "@/components/layout/site-cta-band";
import { InstitutionContact } from "@/components/shared/institution-contact";
import { InstitutionEnrollCta } from "@/components/shared/institution-enroll-cta";
import { InstitutionNotices } from "@/components/shared/institution-notices";
import { PrincipalMessage } from "@/components/shared/principal-message";
import { SharedHero } from "@/components/shared/shared-hero";
import { Testimonials } from "@/components/shared/testimonials";
import { content } from "@/lib/content";
import { institutionPath } from "@/lib/content/institutions";
import { createMetadata } from "@/lib/seo";
import { ALevelsClubsSection } from "./_components/a-levels-clubs-section";
import { CollegeCambridge } from "./_components/college-cambridge";
import { collegeCopy } from "./_components/college-copy";
import { CollegeEntry } from "./_components/college-entry";
import { CollegeMilestones } from "./_components/college-milestones";
import { collegeMilestonesCopy } from "./_components/college-milestones-copy";
import { CollegeSubjects } from "./_components/college-subjects";
import { WhyALevelsSection } from "./_components/why-a-levels-section";

export const metadata: Metadata = createMetadata({
  path: institutionPath("college"),
  title: collegeCopy.meta.title,
  description: collegeCopy.meta.description,
});

export default async function CollegePage() {
  const [institution, leadership, testimonials] = await Promise.all([
    content.getInstitution(),
    content.getLeadership(),
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

      <WhyALevelsSection />

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

      <CollegeMilestones copy={collegeMilestonesCopy} />

      <ALevelsClubsSection />

      <Testimonials id="alumni" items={alumni} section={collegeCopy.alumni} />

      <CollegeEntry copy={collegeCopy.entry} />

      <InstitutionNotices
        copy={collegeCopy.notices}
        id="notices"
        institution="college"
      />

      <InstitutionEnrollCta institution="college" />

      <SiteCtaBand
        heading="Subscribe to our Newsletter"
        standfirst={institution.entities.college.name}
      />

      <InstitutionContact id="contact" institution="college" />
    </>
  );
}
