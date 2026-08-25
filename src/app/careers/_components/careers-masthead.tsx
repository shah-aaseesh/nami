import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Eyebrow, Standfirst } from "@/components/ui/typography";
import type { ContentImage } from "@/lib/content";
import { ArrowRightIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

export type CareersMastheadCopy = {
  readonly eyebrow: string;
  readonly heading: string;
  readonly standfirst: string;
  readonly cta: string;
  readonly image: ContentImage;
};

export function CareersMasthead({
  copy,
}: {
  readonly copy: CareersMastheadCopy;
}) {
  return (
    <section className="gutter-x section-y-masthead" id="careers-hero">
      <div className="mx-auto max-w-page">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="lg:col-span-7">
            <Eyebrow>{copy.eyebrow}</Eyebrow>

            <h1 className="mt-5 font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-balance text-ink">
              {copy.heading}
            </h1>

            {copy.standfirst === "" ? null : (
              <Standfirst className="mt-6 max-w-xl text-ink-muted">
                {copy.standfirst}
              </Standfirst>
            )}

            <div className="mt-8 lg:mt-10">
              <Link
                href="#vacancies"
                className={cn(
                  buttonVariants({ size: "lg", variant: "default" }),
                  "group gap-2 px-5 w-fit inline-flex items-center justify-start",
                )}
              >
                <span>{copy.cta}</span>
                <Icon
                  className="size-4 transition-transform group-hover:translate-x-1"
                  icon={ArrowRightIcon}
                />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative aspect-4/3 sm:aspect-16/10 lg:aspect-4/3 overflow-hidden rounded-3xl">
              <Image
                src={copy.image.src}
                alt={copy.image.alt}
                fill
                priority
                sizes="(min-width: 1024px) 42vw, 92vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
