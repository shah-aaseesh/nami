import type { Route } from "next";
import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { Eyebrow, H3, P } from "@/components/ui/typography";
import type { AdmissionCall, ContactChannel } from "@/lib/content";
import { ArrowRightIcon, MailIcon, PhoneIcon } from "@/lib/icons";

export function ProgramAdmissionCta({
  admissionCall,
  contact,
  levelTitle,
}: {
  readonly admissionCall: AdmissionCall | null;
  readonly contact: ContactChannel;
  readonly levelTitle: string;
}) {
  const phone = contact.phones[0] ?? null;
  const email = contact.email;
  const link = admissionCall?.link ?? null;

  return (
    <section className="gutter-x section-y bg-neutral-50/50">
      <div className="mx-auto max-w-page">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <Eyebrow className="text-accent">Admissions & Enrollment</Eyebrow>
            <H3 className="mt-4 text-3xl text-ink sm:text-4xl">
              Ready to Begin Your {levelTitle} Journey?
            </H3>
            <P className="mt-4 max-w-xl text-ink-muted">
              Applications are currently open for upcoming intakes. Explore
              entry requirements, scholarship options, and online registration.
            </P>

            {admissionCall?.note === null ? null : (
              <p className="mt-4 font-body text-xs italic text-ink-muted">
                {admissionCall?.note}
              </p>
            )}

            <div className="mt-8 flex flex-wrap items-center gap-4">
              {link === null ? (
                <Link
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-body text-xs font-semibold uppercase tracking-widest text-white shadow-md transition-transform hover:scale-105 hover:bg-accent/90 active:scale-95"
                  href="/admissions"
                >
                  <span>Go to Admissions Portal</span>
                  <Icon className="size-4" icon={ArrowRightIcon} />
                </Link>
              ) : link.destination === "internal" ? (
                <Link
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-body text-xs font-semibold uppercase tracking-widest text-white shadow-md transition-transform hover:scale-105 hover:bg-accent/90 active:scale-95"
                  href={link.href as Route}
                >
                  <span>{link.label}</span>
                  <Icon className="size-4" icon={ArrowRightIcon} />
                </Link>
              ) : (
                <Link
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-body text-xs font-semibold uppercase tracking-widest text-white shadow-md transition-transform hover:scale-105 hover:bg-accent/90 active:scale-95"
                  href={link.href as Route}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span>{link.label}</span>
                  <Icon className="size-4" icon={ArrowRightIcon} />
                </Link>
              )}

              <Link
                className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-6 py-3 font-body text-xs font-semibold uppercase tracking-widest text-ink shadow-xs transition-colors hover:bg-neutral-50"
                href="/contact"
              >
                <span>Contact Admissions Office</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-border bg-white p-6 shadow-xl lg:p-8">
              <h4 className="font-display text-xl font-medium text-ink">
                Admission Counseling & Inquiries
              </h4>
              <p className="mt-2 font-body text-xs text-ink-muted">
                Our admissions officers are available to help you choose the
                right stream and guide you through the process.
              </p>

              <div className="mt-6 space-y-4 border-t border-border pt-6">
                {phone === null ? null : (
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-full bg-brand/10 text-brand">
                      <Icon className="size-4" icon={PhoneIcon} />
                    </div>
                    <div>
                      <p className="font-body text-xs text-ink-muted">
                        Phone Inquiry
                      </p>
                      <Link
                        className="font-body text-sm font-semibold text-brand hover:underline"
                        href={`tel:${phone}` as Route}
                      >
                        {phone}
                      </Link>
                    </div>
                  </div>
                )}

                {email === null ? null : (
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-full bg-brand/10 text-brand">
                      <Icon className="size-4" icon={MailIcon} />
                    </div>
                    <div>
                      <p className="font-body text-xs text-ink-muted">
                        Email Inquiry
                      </p>
                      <Link
                        className="font-body text-sm font-semibold text-brand hover:underline"
                        href={`mailto:${email}` as Route}
                      >
                        {email}
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
