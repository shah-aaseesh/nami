import { AdmissionsFormSection } from "@/components/shared/admissions-form";
import { Testimonials } from "@/components/shared/testimonials";
import { content } from "@/lib/content";
import { About } from "./_components/about";
import { AcademicLevels } from "@/components/shared/academic-levels";
import { Affiliations } from "@/components/shared/affiliations";
import { CampusLife } from "./_components/campus-life";
import { Hero } from "./_components/hero";
import { ProgrammeMarquee } from "./_components/programme-marquee";
import { Updates } from "./_components/updates";

export default async function Home() {
  const [copy, institution] = await Promise.all([
    content.getHomeCopy(),
    content.getInstitution(),
  ]);

  return (
    <>
      <Hero />
      <ProgrammeMarquee />
      <About overview={institution.overview} section={copy.sections.about} />
      <AcademicLevels />
      <Affiliations section={copy.sections.affiliations} />
      <CampusLife />
      <Testimonials section={copy.sections.testimonials} />
      <AdmissionsFormSection />
      <Updates />
    </>
  );
}
