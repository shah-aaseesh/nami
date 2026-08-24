import { AcademicLevels } from "@/components/shared/academic-levels";
import { Affiliations } from "@/components/shared/affiliations";
import { PrincipalMessage } from "@/components/shared/principal-message";
import { Testimonials } from "@/components/shared/testimonials";
import { content } from "@/lib/content";
import { schoolPrincipal } from "@/lib/content/school-principal";
import { About } from "./_components/about";
import { CampusLife } from "./_components/campus-life";
import { Hero } from "./_components/hero";
import { ceoHeading } from "./_components/principal-copy";
import { ProgrammeMarquee } from "./_components/programme-marquee";
import { Stats } from "./_components/stats";
import { Updates } from "./_components/updates";

export default async function Home() {
  const [copy, institution, leadership, stats] = await Promise.all([
    content.getHomeCopy(),
    content.getInstitution(),
    content.getLeadership(),
    content.getStats(),
  ]);

  const ceo =
    leadership.management.find(
      (item) => item.slug === "leader-pranil-pandey",
    ) ??
    leadership.management[0] ??
    null;

  return (
    <>
      <Hero />
      <ProgrammeMarquee />
      <About overview={institution.overview} section={copy.sections.about} />
      <AcademicLevels />
      <Affiliations section={copy.sections.affiliations} />
      {ceo === null ? null : (
        <PrincipalMessage
          eyebrow="From the CEO"
          heading={ceoHeading}
          id="ceo-message"
          message={schoolPrincipal.message}
          person={{
            name: ceo.name,
            portrait: ceo.portrait,
            title: ceo.title,
          }}
        />
      )}
      <CampusLife />
      <Stats section={copy.sections.stats} stats={stats} />
      <Testimonials section={copy.sections.testimonials} />
      <Updates />
    </>
  );
}
