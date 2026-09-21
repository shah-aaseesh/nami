import type { Metadata } from "next";
import Link from "next/link";
import { Display, Eyebrow, H2, H3, P } from "@/components/ui/typography";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  path: "/privacy",
  title: "Privacy Policy | NAMI",
  description:
    "Privacy Policy for Naaya Aayam Multi-Disciplinary Institute (NAMI), NAMI College, and NAMI International School. Learn how we collect, use, protect, and handle your data and advertising cookies.",
});

export default function PrivacyPolicyPage() {
  const lastUpdated = "September 2026";

  return (
    <div className="min-h-screen bg-surface">
      {/* Masthead Header */}
      <section className="gutter-x section-y-masthead border-b border-border/80 bg-surface-raised">
        <div className="mx-auto max-w-page">
          <Eyebrow>Legal & Compliance</Eyebrow>
          <Display className="mt-3 text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
            Privacy Policy
          </Display>
          <p className="mt-4 font-body text-xs sm:text-sm text-ink-muted">
            Last Updated: <span className="font-semibold text-ink">{lastUpdated}</span>
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="gutter-x section-y">
        <div className="mx-auto max-w-4xl space-y-12">
          {/* Introduction */}
          <div className="space-y-4">
            <H2 className="text-2xl sm:text-3xl text-ink">1. Introduction</H2>
            <P className="text-justify [text-align-last:left] [hyphens:auto]">
              Naaya Aayam Multi-Disciplinary Institute (NAMI), including NAMI International School, NAMI College, and its higher education faculties (&ldquo;NAMI&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;), is dedicated to protecting the privacy and personal data of our prospective students, current students, alumni, parents, guardians, website visitors, and partners.
            </P>
            <P className="text-justify [text-align-last:left] [hyphens:auto]">
              This Privacy Policy explains how we collect, use, store, process, and disclose information when you visit our website (
              <span className="font-semibold text-ink">nami.edu.np</span>
              ), submit online inquiries or admission application forms, subscribe to our newsletter, interact with our digital channels, or engage with our advertisements and educational services.
            </P>
          </div>

          {/* Information We Collect */}
          <div className="space-y-4">
            <H2 className="text-2xl sm:text-3xl text-ink">2. Information We Collect</H2>
            <P className="text-justify [text-align-last:left] [hyphens:auto]">
              We collect information that you voluntarily provide to us as well as data automatically collected when you browse our site:
            </P>
            <div className="space-y-3 pl-4 border-l-2 border-accent/40 font-body text-sm sm:text-base text-ink-muted">
              <p>
                <strong className="text-ink">A. Personally Identifiable Information:</strong> When you complete an inquiry form, download application documents, register as an alumnus, or subscribe to our newsletter, we may collect your full name, email address, phone number, date of birth, previous academic records, guardian details, and intended programme of study.
              </p>
              <p>
                <strong className="text-ink">B. Usage Data & Device Information:</strong> We automatically log technical data such as your Internet Protocol (IP) address, browser type and version, operating system, referring URLs, pages viewed, time spent on pages, and navigation patterns.
              </p>
              <p>
                <strong className="text-ink">C. Communications & Support:</strong> Records of inquiries, messages, emails, or feedback submitted through our contact forms or direct administrative channels.
              </p>
            </div>
          </div>

          {/* Cookies & Google AdSense / Advertising Disclosures */}
          <div className="space-y-4 rounded-2xl border border-accent/30 bg-primary-100/20 p-6 sm:p-8">
            <H2 className="text-2xl sm:text-3xl text-ink">
              3. Cookies, Web Beacons & Third-Party Advertising (Google AdSense)
            </H2>
            <P className="text-justify [text-align-last:left] [hyphens:auto]">
              Our website uses cookies, web beacons, tracking pixels, and related technologies to deliver a personalized browsing experience, measure website traffic, and serve relevant advertisements.
            </P>
            
            <H3 className="text-lg sm:text-xl font-semibold text-ink mt-4">
              Google AdSense & DoubleClick DART Cookies
            </H3>
            <P className="text-justify [text-align-last:left] [hyphens:auto]">
              Google is a third-party vendor on our website. Google uses cookies, including DoubleClick DART cookies, to serve ads to visitors based upon their visit to our site and other websites on the internet.
            </P>
            <div className="space-y-2 text-xs sm:text-sm text-ink/90 font-body">
              <p>
                • Third-party vendors, including Google, use cookies to serve ads based on a user&apos;s prior visits to your website or other websites.
              </p>
              <p>
                • Google&apos;s use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our sites and/or other sites on the Internet.
              </p>
              <p>
                • Users may opt out of personalized advertising by visiting{" "}
                <Link
                  href="https://adssettings.google.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-accent underline hover:text-accent/80"
                >
                  Google Ads Settings
                </Link>
                . Alternatively, you can opt out of third-party vendor use of cookies for personalized advertising by visiting{" "}
                <Link
                  href="https://www.aboutads.info/choices/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-accent underline hover:text-accent/80"
                >
                  www.aboutads.info
                </Link>
                .
              </p>
            </div>

            <H3 className="text-lg sm:text-xl font-semibold text-ink mt-4">
              Analytics & Measurement Partners
            </H3>
            <P className="text-justify [text-align-last:left] [hyphens:auto]">
              We also work with analytics services (such as Google Analytics) that collect anonymous aggregate traffic data to evaluate content effectiveness, website usability, and user engagement across different sections of our campus portal.
            </P>
          </div>

          {/* How We Use Your Information */}
          <div className="space-y-4">
            <H2 className="text-2xl sm:text-3xl text-ink">4. How We Use Your Information</H2>
            <P className="text-justify [text-align-last:left] [hyphens:auto]">
              NAMI processes your data strictly for legitimate educational, administrative, and communication purposes, including:
            </P>
            <ul className="list-disc pl-6 space-y-2 font-body text-sm sm:text-base text-ink-muted">
              <li>Processing student admissions inquiries, campus tour appointments, and entrance eligibility assessments.</li>
              <li>Providing academic guidance, counselling, and official announcements regarding registration and scholarship deadlines.</li>
              <li>Delivering institutional newsletters, event invitations, and alumni career development opportunities.</li>
              <li>Maintaining institutional integrity, cybersecurity, fraud prevention, and platform reliability.</li>
              <li>Measuring website traffic and optimizing the performance and presentation of educational content.</li>
            </ul>
          </div>

          {/* Data Sharing & Academic Partners */}
          <div className="space-y-4">
            <H2 className="text-2xl sm:text-3xl text-ink">5. Sharing and Disclosure of Information</H2>
            <P className="text-justify [text-align-last:left] [hyphens:auto]">
              We do not sell, rent, or trade your personal information to third parties for commercial marketing purposes. We may share relevant student and applicant information only under the following necessary circumstances:
            </P>
            <ul className="list-disc pl-6 space-y-2 font-body text-sm sm:text-base text-ink-muted">
              <li>
                <strong className="text-ink">Academic Awarding & Affiliation Bodies:</strong> When required for student enrolment, transcript issuance, and degree validation with the University of Northampton (UK), Cambridge Assessment International Education (CAIE), and the National Examinations Board (NEB) Nepal.
              </li>
              <li>
                <strong className="text-ink">Trusted Service Providers:</strong> Secure hosting infrastructure, database services, and communication platforms operating under strict confidentiality obligations.
              </li>
              <li>
                <strong className="text-ink">Legal & Regulatory Authorities:</strong> When required by Nepalese laws, judicial proceedings, or statutory educational directives.
              </li>
            </ul>
          </div>

          {/* Data Security & Retention */}
          <div className="space-y-4">
            <H2 className="text-2xl sm:text-3xl text-ink">6. Data Security & Retention</H2>
            <P className="text-justify [text-align-last:left] [hyphens:auto]">
              We implement industry-standard administrative, physical, and technological security measures to protect your personal data against unauthorized access, loss, alteration, or disclosure. All inquiry form data processed on client devices is secured over encrypted Transport Layer Security (TLS/HTTPS).
            </P>
            <P className="text-justify [text-align-last:left] [hyphens:auto]">
              Personal data is retained only for the period necessary to fulfil the educational, statutory, and administrative purposes outlined in this policy, unless a longer retention duration is mandated by applicable academic accreditation regulations.
            </P>
          </div>

          {/* Children's Privacy */}
          <div className="space-y-4">
            <H2 className="text-2xl sm:text-3xl text-ink">7. Children & Minor Students Privacy</H2>
            <P className="text-justify [text-align-last:left] [hyphens:auto]">
              For NAMI International School (Primary and Secondary programs), inquiries, admissions, and personal information for students under 18 years of age must be submitted by or with the verified consent of a parent or legal guardian. We do not knowingly collect personal data directly from minors without parental oversight.
            </P>
          </div>

          {/* Your Data Rights */}
          <div className="space-y-4">
            <H2 className="text-2xl sm:text-3xl text-ink">8. Your Data Rights & Choices</H2>
            <P className="text-justify [text-align-last:left] [hyphens:auto]">
              Depending on your jurisdiction, you have the right to request access to the personal data we hold about you, request corrections to inaccurate records, request deletion of non-statutory records, or unsubscribe from promotional and newsletter communications at any time by clicking the unsubscribe link in our emails or contacting our administrative desk.
            </P>
          </div>

          {/* Contact Information */}
          <div className="rounded-2xl border border-border bg-surface-raised p-6 sm:p-8 space-y-3">
            <H2 className="text-xl sm:text-2xl text-ink">9. Contact Us & Privacy Inquiries</H2>
            <P className="text-justify [text-align-last:left] [hyphens:auto]">
              If you have any questions, concerns, or requests regarding this Privacy Policy or our data handling practices, please contact our administrative team:
            </P>
            <div className="pt-2 font-body text-sm sm:text-base space-y-1 text-ink">
              <p className="font-semibold">Naaya Aayam Multi-Disciplinary Institute (NAMI)</p>
              <p className="text-ink-muted">Jorpati Campus: Gokarneshwor-7, Jorpati Marg, Kathmandu | Phone: 014917441/42/43/44, 014913353</p>
              <p className="text-ink-muted">New Baneshwor Campus: Shantinagar Marg, Kathmandu | Phone: 015920335/36</p>
              <p className="text-ink-muted">
                Email:{" "}
                <a href="mailto:info@nami.edu.np" className="text-accent underline font-medium">
                  info@nami.edu.np
                </a>{" "}
                /{" "}
                <a href="mailto:admissions@nami.edu.np" className="text-accent underline font-medium">
                  admissions@nami.edu.np
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
