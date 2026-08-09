import type { Metadata } from "next";
import { AcademicLevels } from "@/components/shared/academic-levels";
import { Affiliations } from "@/components/shared/affiliations";
import { content } from "@/lib/content";
import { createMetadata } from "@/lib/seo";
import { ProgrammesCatalog } from "./_components/programmes-catalog";
import { ProgramsHero } from "./_components/programs-hero";

export const metadata: Metadata = createMetadata({
  path: "/programs",
  title: "Academic Programs",
  description:
    "Explore academic programs at NAMI, from NAMI International School (Grade 1-6), +2 NEB Science and Management, Cambridge A-Level, to UK British Bachelor and Master degrees.",
});

export default async function ProgramsHubPage() {
  const [levels, programmes, institution, copy] = await Promise.all([
    content.getAcademicLevels(),
    content.getProgrammes(),
    content.getInstitution(),
    content.getHomeCopy(),
  ]);

  return (
    <>
      <ProgramsHero levels={levels} />
      <AcademicLevels />
      <Affiliations section={copy.sections.affiliations} />
      <ProgrammesCatalog levels={levels} programmes={programmes} />
    </>
  );
}
