import type { Metadata } from "next";
import { Testimonials } from "@/components/shared/testimonials";
import { content } from "@/lib/content";
import { createMetadata } from "@/lib/seo";
import { AboutCreed } from "./_components/about-creed";
import { AboutEmblem } from "./_components/about-emblem";
import { AboutHero } from "./_components/about-hero";
import { AboutOverview } from "./_components/about-overview";
import { AboutStats } from "./_components/about-stats";

export async function generateMetadata(): Promise<Metadata> {
  const about = await content.getAboutCopy();

  return createMetadata({
    path: "/about",
    title: about.metaTitle,
    description: about.metaDescription,
  });
}

export default async function AboutPage() {
  const [copy, institution, stats] = await Promise.all([
    content.getAboutCopy(),
    content.getInstitution(),
    content.getStats(),
  ]);

  return (
    <>
      <AboutHero copy={copy} />
      <AboutOverview
        image={copy.overviewImage}
        overview={institution.overview}
        section={copy.sections.chronology}
      />
      <AboutStats
        image={copy.statsImage}
        section={copy.sections.stats}
        stats={stats}
      />
      <AboutCreed
        mission={institution.mission}
        section={copy.sections.creed}
        vision={institution.vision}
      />
      <AboutEmblem
        emblemStory={institution.emblemStory}
        petals={institution.values}
        section={copy.sections.emblem}
      />
      <Testimonials section={copy.sections.testimonials} />
    </>
  );
}
