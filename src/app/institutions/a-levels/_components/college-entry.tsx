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
    <section className="field-ink gutter-x section-y" id="entry">
      <div className="mx-auto max-w-page">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-10">
          <Reveal className="lg:col-span-5" stagger={0.08}>
            <RevealItem>
              <Eyebrow>{copy.eyebrow}</Eyebrow>
            </RevealItem>
            <SplitText
              as="h2"
              className="mt-4 font-display text-5xl font-normal text-balance text-ink"
            >
              {copy.heading}
            </SplitText>
            <RevealItem className="mt-10">
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
            </RevealItem>
          </Reveal>

          <Reveal
            className="mt-14 flex flex-col gap-10 lg:col-span-6 lg:col-start-7 lg:mt-0"
            stagger={0.12}
          >
            {copy.blocks.map((block) => (
              <RevealItem
                className="border-t border-border pt-6"
                key={block.title}
              >
                <H5 as="h3" className="text-ink">
                  {block.title}
                </H5>
                <P className="mt-3">{block.body}</P>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
