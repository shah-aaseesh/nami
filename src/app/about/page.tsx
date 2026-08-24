import type { Metadata } from "next";
import { Testimonials } from "@/components/shared/testimonials";
import { content } from "@/lib/content";
import { createMetadata } from "@/lib/seo";
import { AboutAwards } from "./_components/about-awards";
import { AboutCreed } from "./_components/about-creed";
import { AboutEmblem } from "./_components/about-emblem";
import { AboutHero } from "./_components/about-hero";
import { AboutMascot } from "./_components/about-mascot";
import { mascotSection, mascotStory } from "./_components/about-mascot-copy";
import { AboutOverview } from "./_components/about-overview";

export async function generateMetadata(): Promise<Metadata> {
  const about = await content.getAboutCopy();

  return createMetadata({
    path: "/about",
    title: about.metaTitle,
    description: about.metaDescription,
  });
}

export default async function AboutPage() {
  const [copy, institution] = await Promise.all([
    content.getAboutCopy(),
    content.getInstitution(),
  ]);

  return (
    <>
      <AboutHero copy={copy} />
      <AboutOverview
        image={copy.overviewImage}
        overview={institution.overview}
        section={copy.sections.chronology}
      />
      <AboutEmblem
        emblemStory={institution.emblemStory}
        petals={institution.values}
        section={copy.sections.emblem}
      />
      <AboutCreed
        mission={institution.mission}
        section={copy.sections.creed}
        vision={institution.vision}
      />
      <AboutMascot section={mascotSection} story={mascotStory} />
      <AboutAwards awards={copy.awards} section={copy.sections.awards} />
      <Testimonials section={copy.sections.testimonials} />
    </>
  );
}
