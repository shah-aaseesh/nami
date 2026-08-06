import type { Metadata } from "next";
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

export default function AboutPage() {
  return (
    <>
      <Opening />
      <Emblem />
      <Creed />
      <Recognition />
    </>
  );
}
