import type { Metadata } from "next";

import { createMetadata } from "@/lib/seo";
import { alumniCopy, alumniEmployers } from "./_components/alumni-copy";
import { AlumniEmployers } from "./_components/alumni-employers";
import { AlumniMasthead } from "./_components/alumni-masthead";
import { AlumniMetrics } from "./_components/alumni-metrics";
import { AlumniNetworkCta } from "./_components/alumni-network-cta";
import { AlumniStories } from "./_components/alumni-stories";

export const metadata: Metadata = createMetadata({
  path: "/alumni",
  title: alumniCopy.meta.title,
  description: alumniCopy.meta.description,
});

export default function AlumniPage() {
  return (
    <>
      <AlumniMasthead copy={alumniCopy.masthead} />
      <AlumniMetrics copy={alumniCopy.metrics} />
      <AlumniStories copy={alumniCopy.storiesSection} />
      <AlumniEmployers
        employers={alumniEmployers}
        section={alumniCopy.employers}
      />
      <AlumniNetworkCta copy={alumniCopy.connect} />
    </>
  );
}
