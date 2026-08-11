import type { Route } from "next";
import Link from "next/link";
import { HeroSlider } from "@/components/shared/hero-slider";
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
  readonly heroLabel: string;
  readonly slides: readonly ContentImage[];
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
}: {
  readonly campus: Campus | null;
  readonly copy: CollegeMastheadCopy;
  readonly entity: NamedEntity;
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
            <Eyebrow>{entity.name}</Eyebrow>
            <h1 className="mt-5 font-display text-3xl font-normal text-balance text-ink sm:text-4xl md:text-5xl lg:text-6xl">
              {copy.heading}
            </h1>
          </div>

          <div className="mt-8 max-w-xl lg:col-span-4 lg:col-start-9 lg:mt-0 lg:self-end">
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
          </div>
        </div>

        <div className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-3 lg:mt-16">
          {facts.map((fact) => (
            <div className="border-t border-border pt-6" key={fact.label}>
              <p className="font-body text-xs font-medium tracking-widest text-accent uppercase">
                {fact.label}
              </p>
              <p className="mt-3 font-display text-2xl text-ink">
                {fact.value}
              </p>
            </div>
          ))}
        </div>

        <HeroSlider
          className="mt-12 lg:mt-16"
          label={copy.heroLabel}
          slides={copy.slides}
        />
      </div>
    </section>
  );
}
