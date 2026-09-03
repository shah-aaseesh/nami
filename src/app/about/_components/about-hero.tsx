import Image from "next/image";
import Link from "next/link";
import { Parallax } from "@/components/motion/parallax";
import { buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Standfirst } from "@/components/ui/typography";
import type { AboutCopy } from "@/lib/content";
import { ArrowRightIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

export function AboutHero({ copy }: { copy: AboutCopy }) {
  const image = copy.openingImage;

  return (
    <section
      className="gutter-x pt-2 pb-8 sm:pt-4 sm:pb-10 lg:pt-3 lg:pb-12"
      id="about"
    >
      <div className="mx-auto max-w-page">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 xl:gap-x-12 items-start">
          <div className="lg:col-span-6 xl:col-span-6">
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-normal tracking-tight leading-[1.1] text-balance text-ink">
              {copy.title}
            </h1>
          </div>

          <div className="mt-5 max-w-xl lg:col-span-6 xl:col-span-6 lg:mt-0 flex flex-col justify-start">
            {copy.standfirst === "" ? null : (
              <Standfirst className="text-neutral-700 text-sm sm:text-base leading-relaxed">
                {copy.standfirst}
              </Standfirst>
            )}
            <div className="mt-4 sm:mt-5">
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
