import type { Metadata } from "next";
import Link from "next/link";
import { Display, Eyebrow, H2, H3, P } from "@/components/ui/typography";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  path: "/terms",
  title: "Terms and Conditions | NAMI",
  description:
    "Terms and Conditions for using the official website and online services of Naaya Aayam Multi-Disciplinary Institute (NAMI), NAMI College, and NAMI International School.",
});

export default function TermsAndConditionsPage() {
  const lastUpdated = "September 2026";

  return (
    <div className="min-h-screen bg-surface">
      {/* Masthead Header */}
      <section className="gutter-x section-y-masthead border-b border-border/80 bg-surface-raised">
        <div className="mx-auto max-w-page">
          <Eyebrow>Legal & Terms</Eyebrow>
          <Display className="mt-3 text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
            Terms and Conditions
          </Display>
          <p className="mt-4 font-body text-xs sm:text-sm text-ink-muted">
            Last Updated: <span className="font-semibold text-ink">{lastUpdated}</span>
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="gutter-x section-y">
        <div className="mx-auto max-w-4xl space-y-12">
          {/* 1. Acceptance */}
          <div className="space-y-4">
            <H2 className="text-2xl sm:text-3xl text-ink">1. Acceptance of Terms</H2>
            <P className="text-justify [text-align-last:left] [hyphens:auto]">
              By accessing, browsing, or using the website of Naaya Aayam Multi-Disciplinary Institute (NAMI), accessible at{" "}
              <span className="font-semibold text-ink">nami.edu.np</span> (&ldquo;Website&rdquo;), you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions (&ldquo;Terms&rdquo;) and our{" "}
              <Link href="/privacy" className="text-accent underline font-medium hover:text-accent/80">
                Privacy Policy
              </Link>
              . If you do not agree with any part of these Terms, you must discontinue your use of this Website immediately.
            </P>
          </div>

          {/* 2. Educational & Informational Purpose */}
          <div className="space-y-4">
            <H2 className="text-2xl sm:text-3xl text-ink">2. Nature of Website & Academic Information</H2>
            <P className="text-justify [text-align-last:left] [hyphens:auto]">
              This Website provides general institutional information, program curricula, faculty profiles, admission guidelines, event notices, and student life updates for NAMI International School, NAMI College (Cambridge A-Levels), and Naaya Aayam Multi-Disciplinary Institute (Northampton UK Undergraduate & Postgraduate programs).
            </P>
            <P className="text-justify [text-align-last:left] [hyphens:auto]">
              While we strive to ensure that all course descriptions, fee structures, faculty rosters, and admission criteria are accurate and up-to-date, academic programs and regulatory requirements may change periodically. Submission of an online inquiry form or preliminary application through this Website does not constitute a guaranteed offer or formal contract of admission. Formal enrolment is subject to official verification of credentials and entrance clearance by the relevant academic board.
            </P>
          </div>

          {/* 3. Intellectual Property Rights */}
          <div className="space-y-4">
            <H2 className="text-2xl sm:text-3xl text-ink">3. Intellectual Property Rights</H2>
            <P className="text-justify [text-align-last:left] [hyphens:auto]">
              All content published on this Website—including logos, crests, brand names, visual media, campus photography, architectural drawings, course syllabi, design systems, text, icons, audio, and video recordings—is the exclusive intellectual property of NAMI or its authorized licensing partners and is protected by copyright, trademark, and applicable intellectual property laws of Nepal and international conventions.
            </P>
            <P className="text-justify [text-align-last:left] [hyphens:auto]">
              You may not copy, reproduce, distribute, republish, download, display, post, or transmit any material from this Website for commercial purposes without prior express written permission from NAMI&apos;s administration.
            </P>
          </div>

          {/* 4. User Conduct & Acceptable Use */}
          <div className="space-y-4">
            <H2 className="text-2xl sm:text-3xl text-ink">4. User Conduct & Acceptable Use</H2>
            <P className="text-justify [text-align-last:left] [hyphens:auto]">
              When interacting with our digital forms, notice boards, and student inquiry systems, you agree not to:
            </P>
            <ul className="list-disc pl-6 space-y-2 font-body text-sm sm:text-base text-ink-muted">
              <li>Submit fraudulent, deceptive, or forged personal or academic credentials.</li>
              <li>Engage in any automated scraping, data extraction, or denial-of-service activities against our servers.</li>
              <li>Upload or transmit any malicious code, viruses, malware, or harmful scripts.</li>
              <li>Impersonate any person, student, faculty member, administrator, or institutional representative.</li>
              <li>Use the Website or its contact channels to transmit unsolicited promotional materials, spam, or unlawful content.</li>
            </ul>
          </div>

          {/* 5. Advertising, Sponsored Content & Third-Party Vendors */}
          <div className="space-y-4 rounded-2xl border border-border bg-surface-raised p-6 sm:p-8">
            <H2 className="text-2xl sm:text-3xl text-ink">5. Advertising & Third-Party Services (Google AdSense)</H2>
            <P className="text-justify [text-align-last:left] [hyphens:auto]">
              This Website may display third-party advertisements, including ads served by Google AdSense, affiliate educational networks, or partner links.
            </P>
            <P className="text-justify [text-align-last:left] [hyphens:auto]">
              Advertisements are served by third-party ad networks that may place cookies on your browser. NAMI does not endorse, guarantee, or assume liability for the products, services, claims, or external websites promoted in third-party advertisements. Your interactions and transactions with third-party advertisers found on or through this Website are solely between you and the respective advertiser.
            </P>
          </div>

          {/* 6. External Links */}
          <div className="space-y-4">
            <H2 className="text-2xl sm:text-3xl text-ink">6. Links to External Websites</H2>
            <P className="text-justify [text-align-last:left] [hyphens:auto]">
              Our Website contains links to external university portals (e.g., University of Northampton, Cambridge International Education, Pearson VUE), educational partners, social media networks, and government education boards. These external sites operate under their own independent terms and privacy policies. NAMI has no control over and assumes no responsibility for the content, privacy practices, or availability of external third-party sites.
            </P>
          </div>

          {/* 7. Disclaimer of Warranties */}
          <div className="space-y-4">
            <H2 className="text-2xl sm:text-3xl text-ink">7. Disclaimer of Warranties</H2>
            <P className="text-justify [text-align-last:left] [hyphens:auto]">
              This Website and all its contents, functions, and materials are provided on an &ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE&rdquo; basis without warranties of any kind, either express or implied. NAMI disclaims all warranties, including but not limited to implied warranties of merchantability, fitness for a particular academic purpose, uninterrupted accessibility, error-free operation, or freedom from computer viruses.
            </P>
          </div>

          {/* 8. Limitation of Liability */}
          <div className="space-y-4">
            <H2 className="text-2xl sm:text-3xl text-ink">8. Limitation of Liability</H2>
            <P className="text-justify [text-align-last:left] [hyphens:auto]">
              To the fullest extent permitted by applicable law, NAMI, its Board of Directors, academic leadership, faculty, employees, and agents shall not be liable for any direct, indirect, incidental, consequential, special, or exemplary damages resulting from your use of or inability to use this Website, unauthorized access to your inquiries, or reliance on any informational content published herein.
            </P>
          </div>

          {/* 9. Governing Law & Jurisdiction */}
          <div className="space-y-4">
            <H2 className="text-2xl sm:text-3xl text-ink">9. Governing Law & Jurisdiction</H2>
            <P className="text-justify [text-align-last:left] [hyphens:auto]">
              These Terms and Conditions shall be governed by and construed in accordance with the laws of Nepal. Any legal action, dispute, or proceeding arising out of or related to these Terms or your use of the Website shall be instituted exclusively in the competent courts of Kathmandu, Nepal.
            </P>
          </div>

          {/* 10. Modifications to Terms */}
          <div className="space-y-4">
            <H2 className="text-2xl sm:text-3xl text-ink">10. Changes to These Terms</H2>
            <P className="text-justify [text-align-last:left] [hyphens:auto]">
              NAMI reserves the right to revise, modify, or update these Terms and Conditions at any time without prior notice. Any updates will be posted directly on this page with an updated &ldquo;Last Updated&rdquo; timestamp. Your continued use of the Website following any changes constitutes your acceptance of the revised Terms.
            </P>
          </div>

          {/* 11. Contact Details */}
          <div className="rounded-2xl border border-border bg-surface-raised p-6 sm:p-8 space-y-3">
            <H2 className="text-xl sm:text-2xl text-ink">11. Institutional Contact</H2>
            <P className="text-justify [text-align-last:left] [hyphens:auto]">
              For inquiries regarding these Terms and Conditions or institutional policies, please reach out to:
            </P>
            <div className="pt-2 font-body text-sm sm:text-base space-y-1 text-ink">
              <p className="font-semibold">Naaya Aayam Multi-Disciplinary Institute (NAMI)</p>
              <p className="text-ink-muted">Jorpati Campus: Gokarneshwor-7, Jorpati Marg, Kathmandu | Phone: 014917441/42/43/44, 014913353</p>
              <p className="text-ink-muted">New Baneshwor Campus: Shantinagar Marg, Kathmandu | Phone: 015920335/36</p>
              <p className="text-ink-muted">
                Email:{" "}
                <a href="mailto:info@nami.edu.np" className="text-accent underline font-medium">
                  info@nami.edu.np
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
