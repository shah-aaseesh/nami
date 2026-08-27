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
    <section className="gutter-x pt-2 pb-8 sm:pt-4 sm:pb-10 lg:pt-3 lg:pb-12" id="about">
      <div className="mx-auto max-w-page">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 xl:gap-x-10">
          <div className="lg:col-span-7">
            <Eyebrow>About NAMI</Eyebrow>
            <h1 className="mt-2.5 sm:mt-3.5 font-display text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-normal tracking-tight leading-[1.1] text-balance text-ink">
              {copy.title}
            </h1>
          </div>

          <div className="mt-5 sm:mt-6 max-w-xl lg:col-span-4 lg:col-start-9 lg:mt-0 lg:flex lg:flex-col lg:justify-between lg:self-end">
            {copy.standfirst === "" ? null : (
              <Standfirst className="text-ink-muted text-sm sm:text-base">
                {copy.standfirst}
              </Standfirst>
            )}
            <div className="mt-4 sm:mt-5 lg:mt-6">
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
            className="mt-6 sm:mt-7 lg:mt-8 overflow-hidden rounded-2xl lg:rounded-3xl"
            speed={1.05}
          >
            <Image
              alt={image.alt}
              className="h-[34vh] sm:h-[38vh] lg:h-[42vh] xl:h-[48vh] max-h-[360px] xl:max-h-[440px] w-full object-cover"
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
