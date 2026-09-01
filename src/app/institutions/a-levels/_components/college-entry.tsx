import type { Route } from "next";
import Link from "next/link";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Eyebrow, H5, P } from "@/components/ui/typography";
import type { ContentLink } from "@/lib/content";
import { ArrowUpRightIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

export type CollegeEntryBlock = {
  readonly title: string;
  readonly body: string;
};

export type CollegeEntryCopy = {
  readonly eyebrow: string;
  readonly heading: string;
  readonly cta: ContentLink;
  readonly blocks: readonly CollegeEntryBlock[];
};

export function CollegeEntry({ copy }: { readonly copy: CollegeEntryCopy }) {
  const external = copy.cta.destination === "external";

  return (
    <section className="field-brand gutter-x section-y" id="entry">
      <div className="mx-auto max-w-page">
        {/* Full-width Eyebrow Bar */}
        <Reveal className="flex items-center gap-5" stagger={0.08}>
          <Eyebrow className="text-white font-semibold">{copy.heading}</Eyebrow>
          <span className="h-px flex-1 bg-white/20" />
        </Reveal>

        <div className="mt-6 sm:mt-8 lg:mt-10 lg:grid lg:grid-cols-12 lg:gap-x-10">
          <Reveal className="lg:col-span-5" stagger={0.08}>
            <SplitText as="h2" className="mt-0 text-white">
              {copy.eyebrow ?? "Admissions & Entry"}
            </SplitText>
            <RevealItem className="mt-8 lg:mt-10">
              <Link
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "w-full justify-center gap-2 px-6 sm:w-auto bg-white text-primary-800 hover:bg-neutral-100 font-semibold shadow-md",
                )}
                href={copy.cta.href as Route}
                rel={external ? "noopener noreferrer" : undefined}
                target={external ? "_blank" : undefined}
              >
                <span>{copy.cta.label}</span>
                <Icon
                  className="size-4 text-primary-800"
                  icon={ArrowUpRightIcon}
                />
              </Link>
            </RevealItem>
          </Reveal>

          <Reveal
            className="mt-14 flex flex-col gap-10 lg:col-span-6 lg:col-start-7 lg:mt-0"
            stagger={0.12}
          >
            {copy.blocks.map((block) => (
              <RevealItem
                className="border-t border-white/20 pt-6"
                key={block.title}
              >
                <H5 as="h3" className="text-white font-semibold">
                  {block.title}
                </H5>
                <P className="mt-3 text-white/90 leading-relaxed">
                  {block.body}
                </P>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
