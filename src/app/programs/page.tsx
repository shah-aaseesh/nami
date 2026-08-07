import type { Metadata } from "next";
import { SiteCtaBand } from "@/components/layout/site-cta-band";
import { content } from "@/lib/content";
import { createMetadata } from "@/lib/seo";
import { ProgrammesCatalog } from "./_components/programmes-catalog";
import { ProgramsHero } from "./_components/programs-hero";
import { ProgramsLevelsGrid } from "./_components/programs-levels-grid";
import { ScrubbedBentoGallery } from "./_components/scrubbed-bento-gallery";

export const metadata: Metadata = createMetadata({
  path: "/programs",
  title: "Academic Programs",
  description:
    "Explore academic programs at NAMI College, from NAMI International School (Grade 1-7), +2 NEB Science and Management, Cambridge A-Level, to UK British Bachelor and Master degrees.",
});

export default async function ProgramsHubPage() {
  const [levels, programmes, institution, gallery] = await Promise.all([
    content.getAcademicLevels(),
    content.getProgrammes(),
    content.getInstitution(),
    content.getGallery(),
  ]);

  const campuses = new Map(
    institution.campuses.map((campus) => [
      campus.slug,
      `${campus.locality}, ${campus.city}`,
    ]),
  );

  const galleryImages = gallery
    .filter((g) => g.category === "academics" || g.category === "campus")
    .map((g) => g.image);

  return (
    <>
      <ProgramsHero levels={levels} />
      <ProgramsLevelsGrid campuses={campuses} levels={levels} />
      <ProgrammesCatalog levels={levels} programmes={programmes} />
      <ScrubbedBentoGallery
        images={galleryImages.slice(0, 5)}
        subtitle="Experience our modern laboratories, interactive classrooms, library reading rooms, and vibrant academic environment."
        title="Learning Environment & Campus Facilities"
      />
      <SiteCtaBand
        email={institution.contact.email ?? "info@nami.edu.np"}
        heading="Have Questions About Admission?"
        standfirst="Get in touch with our academic counseling team for detailed program advice and entry guidelines."
      />
    </>
  );
}
