import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Display, Eyebrow, Standfirst } from "@/components/ui/typography";
import type {
  Campus,
  ContentImage,
  ContentLink,
  NamedEntity,
} from "@/lib/content";
import { ArrowUpRightIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

const MARK_SRC = "/universities/nami-school.png";
const MARK_WIDTH = 250;
const MARK_HEIGHT = 96;

const metaLink = cn(buttonVariants({ size: "md", variant: "link" }));

export type SchoolMastheadCopy = {
  readonly heading: string;
  readonly standfirst: string;
  readonly cta: ContentLink;
  readonly admissionLabel: string;
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
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-6">
              <span className="inline-flex shrink-0 rounded-3xl border border-border-strong bg-surface-raised p-5 sm:p-6 lg:p-7">
                <Image
                  alt={entity.name}
                  className="h-auto w-40 sm:w-48 lg:w-56"
                  height={MARK_HEIGHT}
                  loading="eager"
                  sizes="(max-width: 639px) 160px, (max-width: 1023px) 192px, 224px"
                  src={MARK_SRC}
                  width={MARK_WIDTH}
                />
              </span>
              <span className="hidden h-px flex-1 bg-border sm:block" />
            </div>

            <Display className="mt-10 text-4xl sm:text-5xl md:text-6xl lg:mt-12 lg:text-7xl">
              {copy.heading}
            </Display>
          </div>

          <Standfirst className="mt-8 max-w-xl lg:col-span-4 lg:col-start-9 lg:mt-0 lg:self-end">
            {copy.standfirst}
          </Standfirst>
        </div>

        <div className="mt-14 grid gap-y-10 border-t pt-10 sm:grid-cols-2 sm:gap-x-10 lg:mt-20 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow>{copy.admissionLabel}</Eyebrow>
            <Link
              className={cn(
                buttonVariants({ size: "lg" }),
                "mt-4 w-full justify-center gap-2 rounded-full px-6 sm:w-auto",
              )}
              href={copy.cta.href as Route}
              rel={external ? "noopener noreferrer" : undefined}
              target={external ? "_blank" : undefined}
            >
              <span>{copy.cta.label}</span>
              <Icon className="size-4" icon={ArrowUpRightIcon} />
            </Link>
          </div>

          {campus === null ? null : (
            <div className="lg:col-span-4 lg:col-start-6">
              <Eyebrow>{copy.campusLabel}</Eyebrow>
              <p className="mt-4 font-display text-2xl text-ink">
                {`${campus.locality}, ${campus.city}`}
              </p>
            </div>
          )}

          {phone === null ? null : (
            <div className="lg:col-span-3 lg:col-start-10">
              <Eyebrow>{copy.phoneLabel}</Eyebrow>
              <Link
                className={cn(metaLink, "mt-4 text-xl")}
                href={`tel:${phone.replace(/[^+\d]/g, "")}` as Route}
              >
                {phone}
              </Link>
            </div>
          )}
        </div>
      </div>

      {image === null ? null : (
        <div className="bleed-x mt-14 lg:mt-20">
          <Image
            alt={image.alt}
            className="h-[46vh] w-full object-cover sm:h-[56vh] lg:h-[70vh]"
            height={image.height}
            loading="eager"
            sizes="100vw"
            src={image.src}
            width={image.width}
          />
        </div>
      )}
    </section>
  );
}
