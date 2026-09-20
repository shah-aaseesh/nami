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
  size = "md",
  testimonial,
}: {
  className?: string;
  size?: "sm" | "md";
  testimonial: Testimonial;
}) {
  const { portrait } = testimonial;
  const isSmall = size === "sm";

  return (
    <figure
      className={cn(
        "flex h-full w-full flex-col rounded-2xl border border-accent/70 hover:border-accent transition-colors bg-surface-raised shadow-xs",
        isSmall ? "p-4.5 sm:p-5 lg:p-6" : "p-6 lg:p-8",
        className,
      )}
    >
      <Icon
        className={cn("text-accent", isSmall ? "size-5" : "size-6")}
        icon={QuoteIcon}
      />

      <blockquote className={cn("grow", isSmall ? "mt-3" : "mt-4")}>
        <p
          className={cn(
            "font-display text-ink font-medium tracking-wide leading-relaxed text-justify [text-align-last:left] [hyphens:auto]",
            isSmall
              ? "text-[13.5px] sm:text-sm lg:text-[15px] leading-relaxed"
              : "text-base lg:text-lg",
          )}
        >
          {testimonial.quote}
        </p>
      </blockquote>

      <figcaption
        className={cn(
          "flex items-center",
          isSmall ? "mt-4.5 sm:mt-5 gap-3" : "mt-6 gap-4",
        )}
      >
        <Avatar size={isSmall ? "sm" : "md"}>
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
          <H6
            as="span"
            className={cn("block", isSmall ? "text-sm font-semibold" : "text-base")}
          >
            {testimonial.name}
          </H6>
          {testimonial.programme === null ? null : (
            <span
              className={cn(
                "block font-body text-ink-muted",
                isSmall ? "text-xs sm:text-[13px]" : "text-sm",
              )}
            >
              {testimonial.programme}
            </span>
          )}
          {testimonial.graduatedYear === null ? null : (
            <span
              className={cn(
                "block font-body text-ink-muted",
                isSmall ? "text-xs sm:text-[13px]" : "text-sm",
              )}
            >
              {testimonial.graduatedYear}
            </span>
          )}
        </span>
      </figcaption>
    </figure>
  );
}
