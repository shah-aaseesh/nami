import type { Metadata } from "next";
import { InstitutionNotices } from "@/components/shared/institution-notices";
import { PrincipalMessage } from "@/components/shared/principal-message";
import { SharedCampusGallery } from "@/components/shared/shared-campus-gallery";
import { SharedHero } from "@/components/shared/shared-hero";
import { Testimonials } from "@/components/shared/testimonials";
import { content } from "@/lib/content";
import { institutionPath } from "@/lib/content/institutions";
import { createMetadata } from "@/lib/seo";
import { BachelorsAwarding } from "./_components/bachelors-awarding";
import { bachelorsCopy } from "./_components/bachelors-copy";
import { BachelorsCourseRail } from "./_components/bachelors-course-rail";
import { BachelorsPartners } from "./_components/bachelors-partners";
import type { CareerPartner } from "./_components/partner-carousel";

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

  const networkPartners: readonly CareerPartner[] = partners.map((partner) => ({
    id: partner.id,
    name: partner.name,
    logo: partner.logo,
  }));

  return (
    <>
      <SharedHero
        entity={institution.entities.institute}
        heroLabel={bachelorsCopy.masthead.heroLabel}
        slides={bachelorsCopy.masthead.slides}
        heading={bachelorsCopy.masthead.heading}
        headingClassName="!text-3xl sm:!text-4xl lg:!text-[4rem]"
        standfirst={bachelorsCopy.masthead.standfirst}
        primaryCta={bachelorsCopy.masthead.cta}
      />
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

      <BachelorsAwarding
        affiliations={affiliations}
        copy={bachelorsCopy.awarding}
        id="awarding"
        levelSlug={bachelorsCopy.levelSlug}
      />

      <BachelorsPartners
        copy={bachelorsCopy.partners}
        id="partners"
        partners={networkPartners}
      />

      <Testimonials id="alumni" items={alumni} section={bachelorsCopy.alumni} />

      <SharedCampusGallery
        institution={institution.entities.institute.role}
        tone="ink"
      />

      <InstitutionNotices
        copy={bachelorsCopy.notices}
        id="notices"
        institution="institute"
      />
    </>
  );
}
