import type { Metadata } from "next";

import { content } from "@/lib/content";
import { createMetadata } from "@/lib/seo";
import { FacultyGroup } from "./_components/faculty-group";

export const metadata: Metadata = createMetadata({
  path: "/faculty",
  title: "Faculty & Leadership",
  description:
    "Meet the board of directors, academic heads, and management team who shape the future of NAMI.",
});

export default async function FacultyPage() {
  const leadership = await content.getLeadership();

  return (
    <div className="min-h-screen bg-surface pt-8 sm:pt-10 lg:pt-12 pb-16 space-y-10 sm:space-y-12 lg:space-y-14">
      <FacultyGroup
        isFirstGroup
        leaders={leadership.board}
        title="Board of Directors"
      />

      <FacultyGroup
        leaders={leadership.management}
        title="Management Team"
      />

      <FacultyGroup
        leaders={leadership.academics}
        title="Academic Heads"
      />
    </div>
  );
}
