import Image from "next/image";
import Link from "next/link";
import { Parallax } from "@/components/motion/parallax";
import { buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Eyebrow, Standfirst } from "@/components/ui/typography";
import type { AboutCopy } from "@/lib/content";
import { ArrowRightIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

export function AboutHero({ copy }: { copy: AboutCopy }) {
  const image = copy.openingImage;

  return (
    <section className="gutter-x section-y-masthead" id="about">
      <div className="mx-auto max-w-page">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-7">
            <Eyebrow>About NAMI</Eyebrow>
            <h1 className="mt-5 font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-balance text-ink">
              {copy.title}
            </h1>
          </div>

          <div className="mt-8 max-w-xl lg:col-span-4 lg:col-start-9 lg:mt-0 lg:flex lg:flex-col lg:justify-between lg:self-end">
            {copy.standfirst === "" ? null : (
              <Standfirst className="text-ink-muted">
                {copy.standfirst}
              </Standfirst>
            )}
            <div className="mt-8 lg:mt-10">
              <Link
                className={cn(
                  buttonVariants({ size: "lg", variant: "default" }),
                  "group gap-2 px-5 w-fit inline-flex items-center justify-start",
                )}
                href={"/faculty"}
              >
                <span>Meet the people behind NAMI</span>
                <Icon
                  className="size-4 transition-transform group-hover:translate-x-1"
                  icon={ArrowRightIcon}
                />
              </Link>
            </div>
          </div>
        </div>

        {image === null ? null : (
          <Parallax
            className="mt-14 overflow-hidden rounded-3xl lg:mt-20"
            speed={1.05}
          >
            <Image
              alt={image.alt}
              className="h-[42vh] w-full object-cover lg:h-[58vh]"
              height={image.height}
              loading="eager"
              sizes="(max-width: 1024px) 100vw, 1200px"
              src={image.src}
              width={image.width}
            />
          </Parallax>
        )}
      </div>
    </section>
  );
}
