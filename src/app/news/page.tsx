import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/app/contact/_components/breadcrumb";
import { UpdateIndex } from "@/components/shared/update-index";
import { buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Display, Eyebrow, Standfirst } from "@/components/ui/typography";
import { content } from "@/lib/content";
import { ArrowRightIcon } from "@/lib/icons";
import { createMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { newsCopy, newsTrail } from "./_components/news-copy";

export const metadata: Metadata = createMetadata({
  path: "/news",
  title: newsCopy.meta.title,
  description: newsCopy.meta.description,
});

export default async function NewsPage() {
  const updates = await content.getUpdates();
  const announcements = updates.filter((item) => item.kind !== "event");

  return (
    <section className="gutter-x section-y">
      <div className="mx-auto max-w-page">
        <Breadcrumb trail={newsTrail} />

        <div className="mt-10 lg:mt-16 lg:grid lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-7">
            <Eyebrow>{newsCopy.masthead.eyebrow}</Eyebrow>
            <Display className="mt-5">{newsCopy.masthead.heading}</Display>
          </div>

          <div className="mt-8 max-w-xl lg:col-span-4 lg:col-start-9 lg:mt-0 lg:self-end">
            <Standfirst>{newsCopy.masthead.standfirst}</Standfirst>

            <Link
              className={cn(
                buttonVariants({ size: "md", variant: "link" }),
                "mt-6",
              )}
              href="/events"
            >
              {newsCopy.eventsLinkLabel}
              <Icon icon={ArrowRightIcon} />
            </Link>
          </div>
        </div>

        <div className="mt-16 lg:mt-24">
          <UpdateIndex emptyState={newsCopy.emptyState} items={announcements} />
        </div>
      </div>
    </section>
  );
}
