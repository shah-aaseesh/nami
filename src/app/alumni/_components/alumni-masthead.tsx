import Image from "next/image";
import Link from "next/link";
import type { CareersMastheadCopy } from "@/app/careers/_components/careers-masthead";
import { buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Eyebrow, Standfirst } from "@/components/ui/typography";
import { ArrowRightIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

export function AlumniMasthead({
  copy,
}: {
  readonly copy: CareersMastheadCopy;
}) {
  return (
    <section className="gutter-x section-y-masthead" id="alumni-hero">
      <div className="mx-auto max-w-page">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="lg:col-span-7">
            <Eyebrow>{copy.eyebrow}</Eyebrow>

            <h1 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-balance text-ink">
              {copy.heading}
            </h1>

            {copy.standfirst === "" ? null : (
              <Standfirst className="mt-5 max-w-xl text-neutral-700 leading-relaxed">
                {copy.standfirst}
              </Standfirst>
            )}

            <div className="mt-8 lg:mt-10">
              <Link
                href="#testimonials"
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
