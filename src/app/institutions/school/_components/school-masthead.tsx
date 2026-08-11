import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Eyebrow, Standfirst } from "@/components/ui/typography";
import type {
  Campus,
  ContentImage,
  ContentLink,
  NamedEntity,
} from "@/lib/content";
import { ArrowUpRightIcon, LocationIcon, PhoneIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

export type SchoolMastheadCopy = {
  readonly heading: string;
  readonly standfirst: string;
  readonly cta: ContentLink;
  readonly campusLabel: string;
  readonly phoneLabel: string;
};

export function SchoolMasthead({
  campus,
  copy,
  entity,
  image,
  phone,
}: {
  readonly campus: Campus | null;
  readonly copy: SchoolMastheadCopy;
  readonly entity: NamedEntity;
  readonly image: ContentImage | null;
  readonly phone: string | null;
}) {
  const external = copy.cta.destination === "external";

  return (
    <section className="gutter-x section-y-masthead">
      <div className="mx-auto max-w-page">
        <div className="flex items-center gap-5">
          <Eyebrow>{entity.name}</Eyebrow>
          <span className="h-px flex-1 bg-border" />
        </div>

        <h1 className="mt-8 max-w-4xl font-display text-6xl font-normal text-balance text-ink">
          {copy.heading}
        </h1>

        <div className="mt-10 lg:mt-14 lg:grid lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-6 lg:col-start-6">
            <Standfirst>{copy.standfirst}</Standfirst>

            <div className="mt-8 flex flex-col gap-y-7 sm:flex-row sm:items-center sm:gap-x-10">
              <Link
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "w-full justify-center gap-2 rounded-full px-6 sm:w-auto",
                )}
                href={copy.cta.href as Route}
                rel={external ? "noopener noreferrer" : undefined}
                target={external ? "_blank" : undefined}
              >
                <span>{copy.cta.label}</span>
                <Icon className="size-4" icon={ArrowUpRightIcon} />
              </Link>

              <div className="flex flex-col gap-3">
                {campus === null ? null : (
                  <p className="inline-flex items-center gap-2 font-body text-sm text-ink-muted">
                    <Icon className="size-4 text-accent" icon={LocationIcon} />
                    <span className="sr-only">{copy.campusLabel}</span>
                    {campus.locality}, {campus.city}
                  </p>
                )}

                {phone === null ? null : (
                  <Link
                    className="inline-flex items-center gap-2 font-body text-sm text-ink-muted hover:text-accent"
                    href={`tel:${phone.replace(/[^+\d]/g, "")}` as Route}
                  >
                    <Icon className="size-4 text-accent" icon={PhoneIcon} />
                    <span className="sr-only">{copy.phoneLabel}</span>
                    {phone}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {image === null ? null : (
        <div className="bleed-x mt-14 lg:mt-20">
          <Image
            alt={image.alt}
            className="h-[46vh] w-full object-cover sm:h-[56vh] lg:h-[70vh]"
            height={image.height}
            priority
            sizes="100vw"
            src={image.src}
            width={image.width}
          />
        </div>
      )}
    </section>
  );
}
