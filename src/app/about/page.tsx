import type { Metadata } from "next";
import { SiteCtaBand } from "@/components/layout/site-cta-band";
import { content } from "@/lib/content";
import { createMetadata } from "@/lib/seo";
import { Creed } from "./_components/creed";
import { Emblem } from "./_components/emblem";
import { Opening } from "./_components/opening";
import { Recognition } from "./_components/recognition";

export async function generateMetadata(): Promise<Metadata> {
  const about = await content.getAboutCopy();

  return createMetadata({
    path: "/about",
    title: about.metaTitle,
    description: about.metaDescription,
  });
}

export default async function AboutPage() {
  const institution = await content.getInstitution();
  const email = institution.contact.email ?? "info@nami.edu.np";

  return (
    <>
      <Opening />
      <Emblem />
      <Creed />
      <Recognition />
      <SiteCtaBand
        email={email}
        heading="Have questions about NAMI College?"
        standfirst="Reach out to our admissions and institutional enquiry team directly."
      />
    </>
  );
}
