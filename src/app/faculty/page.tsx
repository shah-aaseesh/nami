import type { Metadata } from "next";

import { content } from "@/lib/content";
import { FacultyGroup } from "./_components/faculty-group";
import { FacultyHero } from "./_components/faculty-hero";

export const metadata: Metadata = {
  title: "Faculty & Leadership",
  description:
    "Meet the visionary leaders, dedicated academics, and experienced management team who shape the future of NAMI College.",
};

export default async function FacultyPage() {
  const leadership = await content.getLeadership();

  return (
    <main className="flex-1 bg-white">
      <FacultyHero />

      <div className="pb-12 lg:pb-24">
        <FacultyGroup
          leaders={leadership.academics}
          title="Academic Heads & Principals"
        />

        <FacultyGroup leaders={leadership.management} title="Management Team" />

        <FacultyGroup leaders={leadership.board} title="Board of Directors" />
      </div>
    </main>
  );
}
