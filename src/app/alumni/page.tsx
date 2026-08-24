import type { Metadata } from "next";

import { Testimonials } from "@/components/shared/testimonials";
import { createMetadata } from "@/lib/seo";
import { alumniCopy } from "./_components/alumni-copy";
import { AlumniMasthead } from "./_components/alumni-masthead";
import { AlumniMetrics } from "./_components/alumni-metrics";
import { AlumniNetworkCta } from "./_components/alumni-network-cta";

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
      <Testimonials section={alumniCopy.testimonials} />
      <AlumniNetworkCta copy={alumniCopy.connect} />
    </>
  );
}
