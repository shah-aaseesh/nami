import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { Display, Eyebrow, H2, H3, H4, P } from "@/components/ui/typography";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  path: "/institutions/ctevt",
  title: "CTEVT Affiliation & Vocational Programmes | NAMI",
  description:
    "NAMI is a CTEVT-affiliated institution authorized to conduct approved short-term vocational training programs in the hospitality sector in Kathmandu, Nepal.",
});

const APPROVED_PROGRAMS = [
  {
    title: "General Cook Commis II",
    duration: "484 Hours",
    sector: "Culinary & Kitchen Operations",
    code: "CTEVT-GCC",
    highlights: "Food safety, culinary fundamentals, hot & cold kitchen operations, knife skills",
  },
  {
    title: "Hotel Assistant",
    duration: "390 Hours",
    sector: "Hospitality Management",
    code: "CTEVT-HA",
    highlights: "Front office operations, guest handling, reservation systems, service standards",
  },
  {
    title: "Barista",
    duration: "390 Hours",
    sector: "Beverage & Coffee Art",
    code: "CTEVT-BAR",
    highlights: "Espresso extraction, latte art, coffee bean sensory profiling, brewing methods",
  },
  {
    title: "Bar Tender",
    duration: "390 Hours",
    sector: "Beverage Service & Mixology",
    code: "CTEVT-BT",
    highlights: "Mixology, cocktail preparation, beverage inventory, customer service & safety",
  },
  {
    title: "Room Attendant",
    duration: "390 Hours",
    sector: "Housekeeping Operations",
    code: "CTEVT-RA",
    highlights: "Guestroom preparation, linen management, hygiene protocols, aesthetic upkeep",
  },
] as const;

const TRAINING_STANDARDS = [
  "Delivery of training according to the approved CTEVT curriculum",
  "Maintenance of required physical and educational facilities",
  "Practical and competency-oriented training",
  "Compliance with prescribed trainee admission procedures",
  "Training conducted at the approved institutional location",
  "Compliance with applicable assessment and skill-testing requirements",
  "Certification of eligible trainees in accordance with applicable CTEVT provisions",
  "Submission of required institutional and progress reports to CTEVT",
] as const;

const APPROVAL_INFO = [
  { label: "Institution", value: "Naya Aayam Multi Disciplinary Institute Pvt. Ltd." },
  { label: "Address", value: "Jorpati-07, Kathmandu, Nepal" },
  { label: "Type of Approval", value: "Short-Term Training Programs" },
  { label: "Approval Period", value: "Two years, as specified in the CTEVT approval letter" },
  { label: "Approving Authority", value: "Council for Technical Education and Vocational Training (CTEVT), Nepal" },
] as const;

export default function CtevtAffiliationPage() {
  return (
    <div className="min-h-screen bg-surface">
      {/* Masthead Header */}
      <section className="gutter-x section-y-masthead border-b border-border/80 bg-surface-raised relative overflow-hidden">
        <div className="mx-auto max-w-page">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-3xl">
              <Eyebrow>Vocational & Technical Education</Eyebrow>
              <Display className="mt-3 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-ink">
                CTEVT Affiliation
              </Display>
              <H3 as="p" className="mt-2 text-lg sm:text-xl font-medium text-accent">
                Council for Technical Education and Vocational Training
              </H3>
              <p className="mt-4 font-body text-sm sm:text-base text-ink-muted leading-relaxed max-w-2xl text-justify [text-align-last:left]">
                <strong className="text-ink font-semibold">
                  Naya Aayam Multi Disciplinary Institute Pvt. Ltd. (NAMI)
                </strong>{" "}
                is a CTEVT-affiliated institution authorized to conduct approved short-term vocational training programs in the hospitality sector.
              </p>
            </div>

            <div className="shrink-0 flex flex-col items-center justify-center p-6 rounded-2xl bg-surface border border-border shadow-xs">
              <Image
                alt="CTEVT Logo"
                className="h-24 w-auto object-contain"
                height={96}
                src="/logo/ctevt-logo-removebg-preview.png"
                width={120}
              />
              <span className="mt-3 text-xs font-semibold text-accent uppercase tracking-wider text-center">
                Government of Nepal
              </span>
              <span className="text-[11px] text-ink-muted font-medium text-center">
                Apex Body for Technical Training
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <div className="gutter-x section-y space-y-16 lg:space-y-20">
        <div className="mx-auto max-w-page space-y-16 lg:space-y-20">
          {/* Overview Statement */}
          <Reveal>
            <div className="rounded-3xl border border-accent/20 bg-accent/5 p-6 sm:p-8 lg:p-10">
              <P className="text-base sm:text-lg font-medium text-ink leading-relaxed text-justify [text-align-last:left]">
                The affiliation reflects NAMI&apos;s commitment to providing structured, practical and industry-oriented vocational education in accordance with the curriculum and requirements prescribed by the{" "}
                <strong className="text-accent font-semibold">
                  Council for Technical Education and Vocational Training (CTEVT), Nepal
                </strong>.
              </P>
            </div>
          </Reveal>

          {/* CTEVT-Approved Training Programs Table */}
          <section className="space-y-6">
            <Reveal className="flex flex-col gap-3">
              <Eyebrow>Approved Courses</Eyebrow>
              <H2 className="text-2xl sm:text-3xl font-bold text-ink">
                CTEVT-Approved Training Programs
              </H2>
              <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
                NAMI is authorized to conduct 5 specialized short-term vocational training programs tailored for the growing hospitality and service industries.
              </p>
            </Reveal>

            <Reveal className="mt-8 overflow-hidden rounded-2xl border border-border bg-surface shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse font-body">
                  <thead>
                    <tr className="border-b border-border bg-surface-raised">
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-ink">
                        Training Program
                      </th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-ink hidden sm:table-cell">
                        Sector & Specialization
                      </th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-accent text-right">
                        Duration
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {APPROVED_PROGRAMS.map((program, idx) => (
                      <tr
                        key={idx}
                        className="transition-colors hover:bg-surface-raised/40"
                      >
                        <td className="px-6 py-5">
                          <p className="text-base font-semibold text-ink">
                            {program.title}
                          </p>
                          <p className="text-xs text-ink-muted mt-1 sm:hidden">
                            {program.sector}
                          </p>
                        </td>
                        <td className="px-6 py-5 text-sm text-ink-muted hidden sm:table-cell">
                          {program.sector}
                        </td>
                        <td className="px-6 py-5 text-right font-semibold text-sm sm:text-base text-accent">
                          {program.duration}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
          </section>

          {/* Grid: About CTEVT & Institutional Approval Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            {/* About CTEVT */}
            <Reveal className="flex flex-col justify-between rounded-3xl border border-border bg-surface p-6 sm:p-8 lg:p-10 shadow-xs">
              <div className="space-y-4">
                <Eyebrow>National Apex Body</Eyebrow>
                <H3 className="text-xl sm:text-2xl font-bold text-ink">
                  About CTEVT
                </H3>
                <P className="text-justify [text-align-last:left] text-ink/85 leading-relaxed text-sm sm:text-base">
                  The <strong className="text-ink font-semibold">Council for Technical Education and Vocational Training (CTEVT)</strong> is Nepal&apos;s national apex body for technical and vocational education and training. CTEVT is responsible for areas including curriculum development, quality control, skills standards, skills testing and the development of skilled human resources.
                </P>
                <P className="text-justify [text-align-last:left] text-ink/85 leading-relaxed text-sm sm:text-base">
                  Through its affiliation, NAMI conducts approved short-term training programs following the applicable CTEVT curriculum, standards and institutional requirements.
                </P>
              </div>

              <div className="mt-8 pt-6 border-t border-border/60 flex items-center justify-between text-xs text-ink-muted">
                <span>Accreditation: National Standards</span>
                <span className="font-semibold text-accent">CTEVT Nepal</span>
              </div>
            </Reveal>

            {/* NAMI's CTEVT Approval */}
            <Reveal className="flex flex-col justify-between rounded-3xl border border-border bg-surface p-6 sm:p-8 lg:p-10 shadow-xs">
              <div className="space-y-4">
                <Eyebrow>Verification & Review</Eyebrow>
                <H3 className="text-xl sm:text-2xl font-bold text-ink">
                  NAMI&apos;s CTEVT Approval
                </H3>
                <dl className="space-y-3 font-body text-xs sm:text-sm">
                  {APPROVAL_INFO.map((info, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row sm:justify-between py-1.5 border-b border-border/40 gap-1">
                      <dt className="font-semibold text-ink shrink-0 sm:w-1/3">
                        {info.label}:
                      </dt>
                      <dd className="text-ink-muted sm:w-2/3 sm:text-right">
                        {info.value}
                      </dd>
                    </div>
                  ))}
                </dl>
                <p className="font-body text-xs text-ink-muted italic pt-2">
                  The approval was granted following the required institutional review and inspection process.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between">
                <span className="text-xs font-medium text-ink-muted">Official Approval Record</span>
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600">
                  Approved & Active
                </span>
              </div>
            </Reveal>
          </div>

          {/* Training Standards */}
          <section className="space-y-6">
            <Reveal className="flex flex-col gap-3">
              <Eyebrow>Quality Framework</Eyebrow>
              <H2 className="text-2xl sm:text-3xl font-bold text-ink">
                Training Standards
              </H2>
              <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
                NAMI&apos;s approved programs are conducted in strict accordance with the requirements specified by CTEVT:
              </p>
            </Reveal>

            <Reveal className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5" stagger={0.04}>
              {TRAINING_STANDARDS.map((standard, idx) => (
                <RevealItem
                  key={idx}
                  className="flex items-start gap-3.5 p-4 sm:p-5 rounded-2xl border border-border/70 bg-surface shadow-2xs"
                >
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent font-bold text-xs mt-0.5">
                    ✓
                  </span>
                  <p className="font-body text-xs sm:text-sm text-ink leading-relaxed font-medium">
                    {standard}
                  </p>
                </RevealItem>
              ))}
            </Reveal>
          </section>

          {/* Skills for the Hospitality Industry */}
          <section className="rounded-3xl border border-border bg-surface-raised p-6 sm:p-8 lg:p-12 shadow-xs">
            <Reveal className="space-y-6">
              <div className="space-y-3">
                <Eyebrow>Career Readiness</Eyebrow>
                <H2 className="text-2xl sm:text-3xl font-bold text-ink">
                  Skills for the Hospitality Industry
                </H2>
              </div>

              <P className="text-justify [text-align-last:left] text-ink/90 leading-relaxed text-sm sm:text-base">
                NAMI&apos;s CTEVT-approved programs focus on developing practical skills relevant to hospitality and service-sector employment. The programs provide learners with structured training in areas including <strong className="text-ink font-semibold">culinary operations, hotel services, coffee preparation, beverage service and housekeeping</strong>.
              </P>
              <P className="text-justify [text-align-last:left] text-ink/90 leading-relaxed text-sm sm:text-base">
                Through practical learning and occupation-specific training, NAMI aims to equip learners with skills that can be applied in professional hospitality environments.
              </P>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 pt-4">
                {["Culinary Operations", "Hotel Services", "Coffee Preparation", "Beverage Service", "Housekeeping"].map((item, idx) => (
                  <div key={idx} className="p-3 rounded-xl border border-border bg-surface text-center">
                    <p className="font-body text-xs font-semibold text-accent">{item}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </section>

          {/* Official Recognition Card */}
          <section className="rounded-3xl border border-border bg-surface p-6 sm:p-8 lg:p-10 shadow-xs">
            <Reveal className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div className="space-y-3 max-w-2xl">
                <Eyebrow>Institutional Certification</Eyebrow>
                <H3 className="text-xl sm:text-2xl font-bold text-ink">
                  Official Recognition
                </H3>
                <p className="font-body text-sm font-semibold text-accent">
                  CTEVT Affiliated Institution — Approved Short-Term Training Programs
                </p>
                <p className="font-body text-xs sm:text-sm text-ink-muted leading-relaxed">
                  NAMI&apos;s CTEVT affiliation and approved programs are documented through the official approval issued by the Council for Technical Education and Vocational Training.
                </p>

                <div className="flex flex-wrap gap-4 pt-2 text-xs font-medium text-ink">
                  <span className="px-3 py-1.5 rounded-lg bg-surface-raised border border-border">
                    Approved Programs: <strong>5</strong>
                  </span>
                  <span className="px-3 py-1.5 rounded-lg bg-surface-raised border border-border">
                    Training Duration: <strong>390–484 Hours</strong>
                  </span>
                  <span className="px-3 py-1.5 rounded-lg bg-surface-raised border border-border">
                    Approval: <strong>CTEVT Short-Term Training Programs</strong>
                  </span>
                </div>
              </div>

              <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto">
                <Link
                  href="/documents"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold bg-accent text-white hover:bg-accent/90 transition-all duration-200 shadow-sm text-center"
                >
                  <span>View CTEVT Approval Letter</span>
                  <svg
                    aria-hidden="true"
                    className="size-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                    />
                  </svg>
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold bg-surface border border-border text-ink hover:bg-surface-raised transition-all duration-200 text-center"
                >
                  <span>Inquire About Admissions</span>
                </Link>
              </div>
            </Reveal>
          </section>

          {/* Our Commitment & Creed */}
          <Reveal>
            <div className="rounded-3xl border border-accent/20 bg-accent text-white p-8 sm:p-10 lg:p-12 text-center relative overflow-hidden shadow-md">
              <div className="max-w-3xl mx-auto space-y-4 relative z-10">
                <p className="text-xs font-bold uppercase tracking-widest text-white/80">
                  Our Commitment
                </p>
                <H2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                  Learn. Practice. Build Skills.
                </H2>
                <p className="text-sm sm:text-base text-white/90 leading-relaxed font-body max-w-2xl mx-auto">
                  NAMI is committed to maintaining the standards and requirements associated with its CTEVT-approved programs and to providing learners with quality vocational education, practical training and industry-relevant skills.
                </p>
                <div className="pt-4">
                  <Link
                    href="/admissions"
                    className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-xs sm:text-sm font-bold bg-white text-accent hover:bg-white/90 transition-all duration-200 shadow-sm"
                  >
                    <span>Apply for Vocational Training</span>
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
