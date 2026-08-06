import Image from "next/image";
import { Icon } from "@/components/ui/icon";
import { H6 } from "@/components/ui/typography";
import type { Testimonial } from "@/lib/content";
import { QuoteIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

function quoteStep(quote: string): string {
  if (quote.length <= 140) return "text-5xl";
  if (quote.length <= 450) return "text-4xl";
  return "text-3xl";
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
    <div
      className={cn("flex rounded-3xl bg-accent p-4 sm:p-6 xl:p-8", className)}
    >
      <figure className="flex w-full flex-col rounded-2xl bg-surface-raised p-6 sm:p-10 lg:flex-row lg:items-start lg:gap-12 xl:gap-20 xl:p-14">
        <div className="grow lg:order-2">
          <Icon className="size-8 text-accent lg:size-10" icon={QuoteIcon} />

          <blockquote className="mt-6 lg:mt-8">
            <p
              className={cn(
                "font-display text-ink text-pretty",
                quoteStep(testimonial.quote),
              )}
            >
              {testimonial.quote}
            </p>
          </blockquote>
        </div>

        <figcaption className="mt-10 flex items-center gap-5 border-t pt-8 lg:order-1 lg:mt-0 lg:w-3/12 lg:shrink-0 lg:flex-col lg:items-start lg:gap-6 lg:border-t-0 lg:pt-3">
          {portrait === null ? null : (
            <Image
              alt={portrait.alt}
              className="size-16 shrink-0 rounded-full object-cover"
              height={portrait.height}
              sizes="64px"
              src={portrait.src}
              width={portrait.width}
            />
          )}
          <span>
            <H6 as="span" className="block">
              {testimonial.name}
            </H6>
            <span className="mt-1 block font-body text-sm text-ink-muted">
              {testimonial.programme}
            </span>
            {testimonial.graduatedYear === null ? null : (
              <span className="block font-body text-sm text-ink-muted">
                {testimonial.graduatedYear}
              </span>
            )}
          </span>
        </figcaption>
      </figure>
    </div>
  );
}
