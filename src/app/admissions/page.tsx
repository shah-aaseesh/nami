import type { Metadata } from "next";

import { Display, Eyebrow, Standfirst } from "@/components/ui/typography";
import { createMetadata } from "@/lib/seo";
import { AdmissionsClient } from "./_components/admissions-client";

export const metadata: Metadata = createMetadata({
  path: "/admissions",
  title: "Admissions",
  description:
    "Apply for admission at NAMI — NAMI International School, NAMI College and Naaya Aayam Multi-Disciplinary Institute.",
});

export default function AdmissionsPage() {
  return (
    <>
      <section className="gutter-x section-y-masthead">
        <div className="mx-auto max-w-page">
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-10 items-end">
            <div className="lg:col-span-7">
              <Eyebrow>Admissions</Eyebrow>
              <Display className="mt-3 text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                Start Your Journey
              </Display>
            </div>
            <Standfirst className="mt-5 max-w-xl text-neutral-700 lg:col-span-5 lg:mt-0">
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
