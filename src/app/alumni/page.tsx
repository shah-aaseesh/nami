import type { Metadata } from "next";

import { CareerPlacement } from "@/components/shared/career-placement";
import type { CareerPartner } from "@/components/shared/partner-carousel";
import { content } from "@/lib/content";
import { createMetadata } from "@/lib/seo";
import { ALUMNI_PROFILES, alumniCopy } from "./_components/alumni-copy";
import { AlumniInitiatives } from "./_components/alumni-initiatives";
import { AlumniMasthead } from "./_components/alumni-masthead";
import { AlumniMetrics } from "./_components/alumni-metrics";
import { AlumniNetworkCta } from "./_components/alumni-network-cta";
import { AlumniStories } from "./_components/alumni-stories";

export const metadata: Metadata = createMetadata({
  path: "/alumni",
  title: alumniCopy.meta.title,
  description: alumniCopy.meta.description,
});

export default async function AlumniPage() {
  const partners = await content.getPartners();

  const networkPartners: readonly CareerPartner[] = partners.map((partner) => ({
    id: partner.id,
    name: partner.name,
    logo: partner.logo,
  }));

  return (
    <>
      <AlumniMasthead copy={alumniCopy.masthead} />
      <AlumniMetrics copy={alumniCopy.metrics} />
      <AlumniStories copy={alumniCopy.stories} profiles={ALUMNI_PROFILES} />
      <AlumniInitiatives copy={alumniCopy.initiatives} />
      <CareerPlacement
        copy={alumniCopy.placement}
        id="alumni-placement"
        partners={networkPartners}
      />
      <AlumniNetworkCta copy={alumniCopy.connect} />
    </>
  );
}
