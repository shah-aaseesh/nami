import type { Route } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Eyebrow, P, Standfirst } from "@/components/ui/typography";
import type { ContentLink } from "@/lib/content";
import { content, isPlaceholder } from "@/lib/content";
import { ArrowRightIcon, ArrowUpRightIcon, MailIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

const CALL_PLACEMENT = [
  "lg:col-span-9 lg:col-start-3",
  "lg:col-span-8 lg:col-start-4",
  "lg:col-span-7 lg:col-start-5",
  "lg:col-span-6 lg:col-start-6",
];

const callLink = cn(buttonVariants({ size: "lg", variant: "link" }));

function CallCta({
  enquiryEmail,
  link,
  title,
}: {
  enquiryEmail: string | null;
  link: ContentLink | null;
  title: string;
}) {
  if (link === null) return null;

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

function CallTitle({ title }: { title: string }) {
  const splitAt = title.indexOf(", ");
  const lead = splitAt === -1 ? title : title.slice(0, splitAt + 1);
  const tail = splitAt === -1 ? null : title.slice(splitAt + 2);

  return (
    <h3 className="font-display text-ink">
      <span className="block text-7xl font-semibold">{lead}</span>
      {tail === null ? null : (
        <span className="block text-4xl font-light">{tail}</span>
      )}
    </h3>
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
    <section
      className="field-brand overflow-hidden gutter-x section-y"
      id="admission"
    >
      <div className="mx-auto max-w-page">
        {section.eyebrow === null ? null : (
          <Reveal className="flex items-center gap-5 lg:w-7/12">
            <Eyebrow>{section.eyebrow}</Eyebrow>
            <span className="h-px flex-1 bg-border" />
          </Reveal>
        )}

        <SplitText
          as="h2"
          className="mt-8 font-display text-5xl font-semibold lg:mt-12 lg:w-8/12"
        >
          {section.heading}
        </SplitText>

        {section.standfirst === null ? null : (
          <Reveal className="mt-12 lg:mt-14 lg:w-5/12" delay={0.25}>
            <Standfirst>{section.standfirst}</Standfirst>
          </Reveal>
        )}

        {calls.length === 0 && section.emptyState !== null ? (
          <P className="mt-16 lg:w-5/12">{section.emptyState}</P>
        ) : null}

        {calls.length === 0 ? null : (
          <Reveal className="mt-16 lg:mt-24" delay={0.4} stagger={0.08}>
            <ol className="flex flex-col gap-y-10">
              {calls.map((call, index) => (
                <li
                  className="border-t border-border-strong pt-8 lg:grid lg:grid-cols-12 lg:gap-x-8"
                  data-reveal-item=""
                  key={call.id}
                >
                  <span className="block font-body text-sm text-ink-muted lg:col-span-2">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div
                    className={cn(
                      "mt-8 flex flex-col gap-8 lg:mt-0",
                      CALL_PLACEMENT[index % CALL_PLACEMENT.length],
                    )}
                  >
                    <CallTitle title={call.title} />
                    {call.note === null ? null : (
                      <P className="lg:w-7/12">{call.note}</P>
                    )}
                    <CallCta
                      enquiryEmail={enquiryEmail}
                      link={call.link}
                      title={call.title}
                    />
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        )}
      </div>
    </section>
  );
}
