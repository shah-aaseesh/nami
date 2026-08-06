import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/app/contact/_components/breadcrumb";
import { UpdateIndex, yearSpan } from "@/components/shared/update-index";
import { buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Display, Eyebrow, P, Standfirst } from "@/components/ui/typography";
import { content } from "@/lib/content";
import { ArrowRightIcon } from "@/lib/icons";
import { createMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { eventsCopy, eventsTrail } from "./_components/events-copy";

export const metadata: Metadata = createMetadata({
  path: "/events",
  title: eventsCopy.meta.title,
  description: eventsCopy.meta.description,
});

export default async function EventsPage() {
  const updates = await content.getUpdates();
  const events = updates.filter((item) => item.kind === "event");
  const span = yearSpan(events);

  return (
    <section className="gutter-x section-y">
      <div className="mx-auto max-w-page">
        <Breadcrumb trail={eventsTrail} />

        <div className="mt-10 lg:mt-16 lg:grid lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-7">
            <Eyebrow>{eventsCopy.masthead.eyebrow}</Eyebrow>
            <Display className="mt-5">{eventsCopy.masthead.heading}</Display>
          </div>

          <div className="mt-8 max-w-xl lg:col-span-4 lg:col-start-9 lg:mt-0 lg:self-end">
            <Standfirst>{eventsCopy.masthead.standfirst}</Standfirst>

            {span === null ? null : (
              <P className="mt-6 text-sm">
                {eventsCopy.countLabel(events.length, span)}
              </P>
            )}

            <Link
              className={cn(
                buttonVariants({ size: "md", variant: "link" }),
                "mt-6",
              )}
              href="/news"
            >
              {eventsCopy.newsLinkLabel}
              <Icon icon={ArrowRightIcon} />
            </Link>
          </div>
        </div>

        <div className="mt-16 lg:mt-24">
          <UpdateIndex emptyState={eventsCopy.emptyState} items={events} />
        </div>
      </div>
    </section>
  );
}
