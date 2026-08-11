import type { Metadata } from "next";
import { InstitutionGallery } from "@/components/shared/institution-gallery";
import { InstitutionNotices } from "@/components/shared/institution-notices";
import { PrincipalMessage } from "@/components/shared/principal-message";
import { Testimonials } from "@/components/shared/testimonials";
import { content } from "@/lib/content";
import { createMetadata } from "@/lib/seo";
import { BachelorsCareers } from "./_components/bachelors-careers";
import { bachelorsCopy } from "./_components/bachelors-copy";
import { BachelorsMasthead } from "./_components/bachelors-masthead";
import { BachelorsNorthampton } from "./_components/bachelors-northampton";
import { BachelorsProgrammes } from "./_components/bachelors-programmes";
import type { CareerPartner } from "./_components/partner-carousel";

export const metadata: Metadata = createMetadata({
  path: "/institutions/bachelors",
  title: bachelorsCopy.meta.title,
  description: bachelorsCopy.meta.description,
});

export default async function BachelorsPage() {
  const [
    institution,
    leadership,
    levels,
    affiliations,
    partners,
    testimonials,
  ] = await Promise.all([
    content.getInstitution(),
    content.getLeadership(),
    content.getAcademicLevels(),
    content.getAffiliations(),
    content.getPartners(),
    content.getTestimonials(),
  ]);

  const campus =
    institution.campuses.find(
      (item) => item.slug === bachelorsCopy.campusSlug,
    ) ?? null;
  const level =
    levels.find((item) => item.slug === bachelorsCopy.levelSlug) ?? null;
  const academicHead =
    leadership.academics.find(
      (item) => item.slug === bachelorsCopy.academicHead.slug,
    ) ?? null;
  const affiliation =
    affiliations.find((item) => item.slug === bachelorsCopy.affiliationSlug) ??
    null;
  const alumni = testimonials.filter(
    (item) => item.institution === "institute",
  );

  const railPartners: readonly CareerPartner[] = partners.map((partner) => ({
    id: partner.id,
    name: partner.name,
    tag:
      bachelorsCopy.partnerTags[partner.slug] ??
      bachelorsCopy.partnerKindTags[partner.kind],
    logo: partner.logo,
  }));

  return (
    <>
      <BachelorsMasthead
        campus={campus}
        copy={bachelorsCopy.masthead}
        entity={institution.entities.institute}
        image={level?.image ?? null}
        partnership={
          affiliation === null
            ? null
            : { body: affiliation.body, sinceYear: affiliation.sinceYear }
        }
      />

      <BachelorsNorthampton
        copy={bachelorsCopy.northampton}
        sinceYear={affiliation?.sinceYear ?? null}
      />

      <BachelorsProgrammes copy={bachelorsCopy.programmes} />

      {academicHead === null ? null : (
        <PrincipalMessage
          eyebrow={bachelorsCopy.academicHead.eyebrow}
          heading={bachelorsCopy.academicHead.heading}
          id="academic-head"
          message={bachelorsCopy.academicHead.message}
          person={{
            name: academicHead.name,
            portrait: bachelorsCopy.academicHead.portrait,
            title: academicHead.title,
          }}
        />
      )}

      <BachelorsCareers copy={bachelorsCopy.careers} partners={railPartners} />

      <Testimonials id="alumni" items={alumni} section={bachelorsCopy.alumni} />

      <InstitutionGallery
        copy={bachelorsCopy.gallery}
        id="gallery"
        institution="institute"
      />

      <InstitutionNotices
        copy={bachelorsCopy.notices}
        id="notices"
        institution="institute"
      />
    </>
  );
}
