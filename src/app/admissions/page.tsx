import type { Metadata } from "next";

import { Display, Eyebrow, Standfirst } from "@/components/ui/typography";
import { createMetadata } from "@/lib/seo";
import { AdmissionsClient } from "./_components/admissions-client";

export const metadata: Metadata = createMetadata({
  path: "/admissions",
  title: "Admissions",
  description: "Apply for admission to NAMI and International School.",
});

export default function AdmissionsPage() {
  return (
    <>
      <section className="gutter-x section-y">
        <div className="mx-auto max-w-page">
          <div className="mt-10 lg:mt-16 lg:grid lg:grid-cols-12 lg:gap-x-10">
            <div className="lg:col-span-7">
              <Eyebrow>Admissions</Eyebrow>
              <Display className="mt-5 text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                Start Your Journey
              </Display>
            </div>
            <Standfirst className="mt-8 max-w-xl lg:col-span-4 lg:col-start-9 lg:mt-0 lg:self-end">
              Join a progressive academic institution offering global standards
              of education from School to Bachelor level. Transform yourself to
              lead the world.
            </Standfirst>
          </div>
        </div>
      </section>

      <AdmissionsClient />
    </>
  );
}
