import { AcademicLevels } from "@/components/shared/academic-levels";
import { Affiliations } from "@/components/shared/affiliations";
import { PrincipalMessage } from "@/components/shared/principal-message";
import { Testimonials } from "@/components/shared/testimonials";
import { content } from "@/lib/content";
import { About } from "./_components/about";
import { CampusLife } from "./_components/campus-life";
import { Hero } from "./_components/hero";
import {
  principalExcerpt,
  principalEyebrow,
  principalHeading,
  principalPortrait,
  principalSlug,
} from "./_components/principal-copy";
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

  const principal =
    leadership.academics.find((item) => item.slug === principalSlug) ?? null;

  return (
    <>
      <Hero />
      <ProgrammeMarquee />
      <About overview={institution.overview} section={copy.sections.about} />
      <Stats section={copy.sections.stats} stats={stats} />
      <AcademicLevels />
      <Affiliations section={copy.sections.affiliations} />
      {principal === null ? null : (
        <PrincipalMessage
          eyebrow={principalEyebrow}
          heading={principalHeading}
          id="principal"
          message={principalExcerpt}
          person={{
            name: principal.name,
            portrait: principalPortrait,
            title: principal.title,
          }}
        />
      )}
      <CampusLife />
      <Testimonials section={copy.sections.testimonials} />
      <Updates />
    </>
  );
}
