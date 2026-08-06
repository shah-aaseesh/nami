import { About } from "./_components/about";
import { AcademicLevels } from "./_components/academic-levels";
import { AdmissionCta } from "./_components/admission-cta";
import { Affiliations } from "./_components/affiliations";
import { CampusLife } from "./_components/campus-life";
import { Hero } from "./_components/hero";
import { ProgrammeMarquee } from "./_components/programme-marquee";
import { Testimonials } from "./_components/testimonials";
import { Updates } from "./_components/updates";

export default function Home() {
  return (
    <>
      <Hero />
      <ProgrammeMarquee />
      <About />
      <AcademicLevels />
      <Affiliations />
      <CampusLife />
      <Testimonials />
      <Updates />
      <AdmissionCta />
    </>
  );
}
