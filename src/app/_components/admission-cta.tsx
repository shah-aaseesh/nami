import type { Route } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Eyebrow, H5, P, Standfirst } from "@/components/ui/typography";
import type { ContentLink } from "@/lib/content";
import { content, isPlaceholder } from "@/lib/content";
import { ArrowRightIcon, ArrowUpRightIcon, MailIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

function CallCta({
  className,
  enquiryEmail,
  link,
  title,
}: {
  className?: string;
  enquiryEmail: string | null;
  link: ContentLink | null;
  title: string;
}) {
  if (link === null) return null;

  const callLink = cn(
    buttonVariants({ size: "md", variant: "link" }),
    className,
  );

  if (link.destination === "legacy" || isPlaceholder(link.href)) {
    if (enquiryEmail === null) return null;

    return (
      <Link className={callLink} href={`mailto:${enquiryEmail}` as Route}>
        Ask about admission
        <span className="sr-only"> to {title}</span>
        <Icon icon={MailIcon} />
      </Link>
    );
  }

  const isExternal = link.destination === "external";

  return (
    <Link
      className={callLink}
      href={link.href as Route}
      rel={isExternal ? "noopener noreferrer" : undefined}
      target={isExternal ? "_blank" : undefined}
    >
      {link.label}
      <span className="sr-only"> {title}</span>
      <Icon icon={isExternal ? ArrowUpRightIcon : ArrowRightIcon} />
    </Link>
  );
}

export async function AdmissionCta() {
  const [copy, calls, institution] = await Promise.all([
    content.getHomeCopy(),
    content.getAdmissionCalls(),
    content.getInstitution(),
  ]);

  const section = copy.sections.admission;
  const { email } = institution.contact;
  const enquiryEmail = email !== null && !isPlaceholder(email) ? email : null;

  return (
    <section className="field-brand gutter-x section-y" id="admission">
      <div className="mx-auto max-w-page">
        {section.eyebrow === null ? null : (
          <Reveal className="mx-auto flex max-w-sm items-center gap-5">
            <span className="h-px flex-1 bg-border" />
            <Eyebrow>{section.eyebrow}</Eyebrow>
            <span className="h-px flex-1 bg-border" />
          </Reveal>
        )}

        <SplitText
          as="h2"
          className="mt-6 text-center font-editorial text-5xl font-normal tracking-normal lg:mt-8"
        >
          {section.heading}
        </SplitText>

        {section.standfirst === null ? null : (
          <Reveal className="mt-6" delay={0.2}>
            <Standfirst className="mx-auto max-w-xl text-center">
              {section.standfirst}
            </Standfirst>
          </Reveal>
        )}

        {calls.length === 0 && section.emptyState !== null ? (
          <P className="mx-auto mt-12 max-w-xl text-center">
            {section.emptyState}
          </P>
        ) : null}

        {calls.length === 0 ? null : (
          <Reveal className="mt-14 lg:mt-20" delay={0.3} stagger={0.08}>
            <ol className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
              {calls.map((call, index) => (
                <li
                  className="border-t border-border-strong pt-6 lg:pt-8"
                  data-reveal-item=""
                  key={call.id}
                >
                  <span className="block font-body text-sm text-ink-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <H5 as="h3" className="mt-4">
                    {call.title}
                  </H5>

                  {call.note === null ? null : (
                    <P className="mt-3">{call.note}</P>
                  )}

                  <CallCta
                    className="mt-6"
                    enquiryEmail={enquiryEmail}
                    link={call.link}
                    title={call.title}
                  />
                </li>
              ))}
            </ol>
          </Reveal>
        )}
      </div>
    </section>
  );
}
