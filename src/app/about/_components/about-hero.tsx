import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { Parallax } from "@/components/motion/parallax";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";

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
            <Reveal atFold>
              <Eyebrow>About NAMI</Eyebrow>
            </Reveal>
            <SplitText
              as="h1"
              atFold
              className="mt-5 font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-balance text-ink"
            >
              {copy.title}
            </SplitText>
          </div>

          <div className="mt-8 max-w-xl lg:col-span-4 lg:col-start-9 lg:mt-0 lg:flex lg:flex-col lg:justify-between lg:self-end">
            {copy.standfirst === "" ? null : (
              <Reveal atFold delay={0.15}>
                <Standfirst className="text-ink-muted">
                  {copy.standfirst}
                </Standfirst>
              </Reveal>
            )}
            <Reveal atFold className="mt-8 lg:mt-10" delay={0.3}>
              <Link
                className={cn(
                  buttonVariants({ variant: "quiet" }),
                  "group gap-2 rounded-full px-5 w-full sm:w-auto inline-flex justify-between sm:justify-start",
                )}
                href={"#leadership" as Route}
              >
                <span>Meet the people behind NAMI</span>
                <Icon
                  className="size-4 transition-transform group-hover:translate-x-1"
                  icon={ArrowRightIcon}
                />
              </Link>
            </Reveal>
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
