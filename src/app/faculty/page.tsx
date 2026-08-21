import type { Metadata } from "next";

import { content } from "@/lib/content";
import { FacultyGroup } from "./_components/faculty-group";
import { FacultyHero } from "./_components/faculty-hero";

export const metadata: Metadata = {
  title: "Faculty & Leadership",
  description:
    "Meet the board of directors, academic heads, and management team who shape the future of NAMI.",
};

export default async function FacultyPage() {
  const leadership = await content.getLeadership();

  return (
    <div className="bg-white">
      <FacultyHero />

      <div className="pb-12 lg:pb-24">
        <FacultyGroup leaders={leadership.board} title="Board of Directors" />

        <FacultyGroup leaders={leadership.academics} title="Academic Heads" />

        <FacultyGroup leaders={leadership.management} title="Management Team" />
      </div>
    </div>
  );
}
