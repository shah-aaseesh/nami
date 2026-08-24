import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Icon } from "@/components/ui/icon";
import { H6 } from "@/components/ui/typography";
import type { Testimonial } from "@/lib/content";
import { QuoteIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

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
  testimonial,
}: {
  className?: string;
  testimonial: Testimonial;
}) {
  const { portrait } = testimonial;

  return (
    <figure
      className={cn(
        "flex h-full w-full flex-col rounded-2xl border border-border bg-surface-raised p-6 lg:p-8",
        className,
      )}
    >
      <Icon className="size-6 text-accent" icon={QuoteIcon} />

      <blockquote className="mt-4 grow">
        <p className="font-display text-base text-ink text-pretty font-medium tracking-wide leading-relaxed lg:text-lg">
          {testimonial.quote}
        </p>
      </blockquote>

      <figcaption className="mt-6 flex items-center gap-4">
        <Avatar size="md">
          {portrait === null ? null : (
            <AvatarImage
              alt=""
              height={portrait.height}
              src={portrait.src}
              width={portrait.width}
            />
          )}
          <AvatarFallback delay={portrait === null ? 0 : 400}>
            {initialsOf(testimonial.name)}
          </AvatarFallback>
        </Avatar>
        <span className="min-w-0">
          <H6 as="span" className="block text-base">
            {testimonial.name}
          </H6>
          {testimonial.programme === null ? null : (
            <span className="block font-body text-sm text-ink-muted">
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
