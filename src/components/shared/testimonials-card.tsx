import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Icon } from "@/components/ui/icon";
import { H6 } from "@/components/ui/typography";
import type { Testimonial } from "@/lib/content";
import { QuoteIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

const QUOTE_CLASS = "text-xl lg:text-2xl";

function initialsOf(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function TestimonialCard({
  className,
  panel = true,
  testimonial,
}: {
  className?: string;
  panel?: boolean;
  testimonial: Testimonial;
}) {
  const { portrait } = testimonial;

  return (
    <figure
      className={cn(
        panel &&
          "rounded-3xl border border-border-strong bg-surface-raised p-6 sm:p-10 lg:p-12",
        className,
      )}
    >
      {panel ? (
        <Icon className="size-8 text-accent lg:size-10" icon={QuoteIcon} />
      ) : null}

      <blockquote className={panel ? "mt-6 lg:mt-8" : undefined}>
        <p
          className={cn(
            "font-display text-ink text-pretty font-medium tracking-wide leading-relaxed",
            QUOTE_CLASS,
          )}
        >
          {testimonial.quote}
        </p>
      </blockquote>

      <figcaption className="mt-10 flex items-center gap-4 lg:mt-14 lg:gap-5">
        <Avatar size="lg">
          {portrait === null ? null : (
            <AvatarImage
              alt={portrait.alt}
              height={portrait.height}
              src={portrait.src}
              width={portrait.width}
            />
          )}
          <AvatarFallback delay={portrait === null ? 0 : 400}>
            {initialsOf(testimonial.name)}
          </AvatarFallback>
        </Avatar>
        <span>
          <H6 as="span" className="block">
            {testimonial.name}
          </H6>
          {testimonial.programme === null ? null : (
            <span className="mt-1 block font-body text-sm text-ink-muted">
              {testimonial.programme}
            </span>
          )}
          {testimonial.graduatedYear === null ? null : (
            <span className="block font-body text-sm text-ink-muted">
              {testimonial.graduatedYear}
            </span>
          )}
        </span>
      </figcaption>
    </figure>
  );
}
