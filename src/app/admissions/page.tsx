import type { Metadata } from "next";

import { AdmissionsFormSection } from "@/components/shared/admissions-form";
import { Display, Eyebrow } from "@/components/ui/typography";
import { createMetadata } from "@/lib/seo";

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
          <Eyebrow>Start Your Journey</Eyebrow>
          <Display className="mt-3 text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
            Admissions
          </Display>
        </div>
      </section>

      <AdmissionsFormSection />
    </>
  );
}
