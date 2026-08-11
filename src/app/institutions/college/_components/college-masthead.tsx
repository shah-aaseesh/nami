import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { Parallax } from "@/components/motion/parallax";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Eyebrow, Standfirst } from "@/components/ui/typography";
import type {
  Campus,
  ContentImage,
  ContentLink,
  NamedEntity,
} from "@/lib/content";
import { ArrowUpRightIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

export type CollegeMastheadCopy = {
  readonly heading: string;
  readonly standfirst: string;
  readonly cta: ContentLink;
  readonly establishedLabel: string;
  readonly statusLabel: string;
  readonly statusValue: string;
  readonly campusLabel: string;
};

export function CollegeMasthead({
  campus,
  copy,
  entity,
  image,
}: {
  readonly campus: Campus | null;
  readonly copy: CollegeMastheadCopy;
  readonly entity: NamedEntity;
  readonly image: ContentImage | null;
}) {
  const external = copy.cta.destination === "external";

  const facts = [
    entity.establishedYear === null
      ? null
      : {
          label: copy.establishedLabel,
          value: String(entity.establishedYear),
        },
    { label: copy.statusLabel, value: copy.statusValue },
    campus === null
      ? null
      : {
          label: copy.campusLabel,
          value: `${campus.locality}, ${campus.city}`,
        },
  ].filter((fact) => fact !== null);

  return (
    <section className="gutter-x section-y-masthead">
      <div className="mx-auto max-w-page">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-7">
            <Reveal atFold>
              <Eyebrow>{entity.name}</Eyebrow>
            </Reveal>
            <SplitText
              as="h1"
              atFold
              className="mt-5 font-display text-4xl font-normal text-balance text-ink sm:text-5xl md:text-6xl lg:text-7xl"
            >
              {copy.heading}
            </SplitText>
          </div>

          <Reveal
            atFold
            className="mt-8 max-w-xl lg:col-span-4 lg:col-start-9 lg:mt-0 lg:self-end"
            delay={0.15}
          >
            <Standfirst>{copy.standfirst}</Standfirst>
            <Link
              className={cn(
                buttonVariants({ size: "lg" }),
                "mt-8 w-full justify-center gap-2 rounded-full px-6 sm:w-auto",
              )}
              href={copy.cta.href as Route}
              rel={external ? "noopener noreferrer" : undefined}
              target={external ? "_blank" : undefined}
            >
              <span>{copy.cta.label}</span>
              <Icon className="size-4" icon={ArrowUpRightIcon} />
            </Link>
          </Reveal>
        </div>

        <Reveal
          atFold
          className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-3 lg:mt-16"
          stagger={0.08}
        >
          {facts.map((fact) => (
            <RevealItem
              className="border-t border-border pt-6"
              key={fact.label}
            >
              <p className="font-body text-xs font-medium tracking-widest text-accent uppercase">
                {fact.label}
              </p>
              <p className="mt-3 font-display text-2xl text-ink">
                {fact.value}
              </p>
            </RevealItem>
          ))}
        </Reveal>

        {image === null ? null : (
          <Parallax
            className="mt-12 overflow-hidden rounded-3xl lg:mt-16"
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
