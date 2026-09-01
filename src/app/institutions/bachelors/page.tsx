import type { Metadata } from "next";
import { CareerPlacement } from "@/components/shared/career-placement";
import { InstitutionAwarding } from "@/components/shared/institution-awarding";
import { InstitutionClubsSection } from "@/components/shared/institution-clubs-section";
import { InstitutionContact } from "@/components/shared/institution-contact";
import { InstitutionEnrollCta } from "@/components/shared/institution-enroll-cta";
import { InstitutionNotices } from "@/components/shared/institution-notices";
import type { CareerPartner } from "@/components/shared/partner-carousel";
import { PrincipalMessage } from "@/components/shared/principal-message";
import { SharedHero } from "@/components/shared/shared-hero";
import { Testimonials } from "@/components/shared/testimonials";
import { content } from "@/lib/content";
import { institutionPath } from "@/lib/content/institutions";
import { createMetadata } from "@/lib/seo";
import { bachelorsCopy } from "./_components/bachelors-copy";
import { BachelorsCourseRail } from "./_components/bachelors-course-rail";
import { WhyUndergraduateSection } from "./_components/why-undergraduate-section";

export const metadata: Metadata = createMetadata({
  path: institutionPath("bachelors"),
  title: bachelorsCopy.meta.title,
  description: bachelorsCopy.meta.description,
});

export default async function BachelorsPage() {
  const [institution, leadership, affiliations, partners, testimonials] =
    await Promise.all([
      content.getInstitution(),
      content.getLeadership(),
      content.getAffiliations(),
      content.getPartners(),
      content.getTestimonials(),
    ]);

  const academicHead =
    leadership.academics.find(
      (item) => item.slug === bachelorsCopy.academicHead.slug,
    ) ?? null;
  const alumni = testimonials.filter(
    (item) => item.institution === "institute",
  );

  const socials = institution.contact.socialProfiles.filter(
    (profile) => profile.destination === "external",
  );
  const watch = socials.find((profile) => profile.platform === "youtube");

  const networkPartners: readonly CareerPartner[] = partners.map((partner) => ({
    id: partner.id,
    name: partner.name,
    logo: partner.logo,
  }));

  return (
    <>
      <SharedHero
        entity={institution.entities.institute}
        heading={bachelorsCopy.masthead.heading}
        heroLabel={bachelorsCopy.masthead.heroLabel}
        motto={bachelorsCopy.masthead.motto}
        primaryCta={bachelorsCopy.masthead.cta}
        slides={bachelorsCopy.masthead.slides}
        standfirst={bachelorsCopy.masthead.standfirst}
        watch={watch ?? null}
      />

      <WhyUndergraduateSection />

      {academicHead === null ? null : (
        <PrincipalMessage
          eyebrow={bachelorsCopy.academicHead.eyebrow}
          id="academic-head"
          message={bachelorsCopy.academicHead.message}
          person={{
            name: academicHead.name,
            portrait: bachelorsCopy.academicHead.portrait,
            title: academicHead.title,
          }}
        />
      )}

      <BachelorsCourseRail copy={bachelorsCopy.programmes} id="programmes" />

      <InstitutionAwarding
        affiliations={affiliations}
        copy={bachelorsCopy.awarding}
        id="awarding"
        levelSlug={bachelorsCopy.levelSlug}
      />

      <CareerPlacement
        copy={bachelorsCopy.partners}
        id="partners"
        partners={networkPartners}
        tone="surface"
      />

      <Testimonials id="alumni" items={alumni} section={bachelorsCopy.alumni} />

      <InstitutionClubsSection tone="surface" />

      <InstitutionNotices
        copy={bachelorsCopy.notices}
        id="notices"
        institution="institute"
      />

      <InstitutionEnrollCta institution="institute" />

      <InstitutionContact id="contact" institution="institute" />
    </>
  );
}
