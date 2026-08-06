import Image from "next/image";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Eyebrow, H6, P, Standfirst } from "@/components/ui/typography";
import type { Testimonial } from "@/lib/content";
import { content } from "@/lib/content";
import { cn } from "@/lib/utils";

function quoteStep(quote: string): string {
  if (quote.length <= 140) return "text-5xl";
  if (quote.length <= 450) return "text-4xl";
  return "text-3xl";
}

function Voice({ testimonial }: { testimonial: Testimonial }) {
  const { portrait } = testimonial;

  return (
    <figure>
      <blockquote>
        <p
          className={cn(
            "font-editorial font-normal tracking-normal text-ink text-pretty",
            quoteStep(testimonial.quote),
          )}
        >
          <span aria-hidden="true" className="text-accent">
            &ldquo;
          </span>
          {testimonial.quote}
          <span aria-hidden="true" className="text-accent">
            &rdquo;
          </span>
        </p>
      </blockquote>

      <figcaption className="mt-8 flex items-center gap-5 lg:mt-10">
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
  );
}

export async function Testimonials() {
  const [copy, testimonials] = await Promise.all([
    content.getHomeCopy(),
    content.getTestimonials(),
  ]);

  const section = copy.sections.testimonials;

  return (
    <section className="gutter-x section-y" id="testimonials">
      <div className="mx-auto max-w-page lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-8">
        <div className="lg:col-span-3">
          {section.eyebrow === null ? null : (
            <Reveal className="flex items-center gap-5">
              <Eyebrow>{section.eyebrow}</Eyebrow>
              <span className="h-px flex-1 bg-border" />
            </Reveal>
          )}

          <SplitText as="h2" className="mt-6 font-display text-5xl lg:mt-8">
            {section.heading}
          </SplitText>

          {section.standfirst === null ? null : (
            <Reveal className="mt-8" delay={0.25}>
              <Standfirst>{section.standfirst}</Standfirst>
            </Reveal>
          )}
        </div>

        <div className="mt-12 lg:col-span-8 lg:col-start-5 lg:mt-0">
          {testimonials.length === 0 ? (
            section.emptyState === null ? null : (
              <P>{section.emptyState}</P>
            )
          ) : (
            <Reveal delay={0.25} stagger={0.08}>
              {testimonials.map((testimonial) => (
                <RevealItem
                  className="mt-12 border-t pt-12 first:mt-0 first:border-0 first:pt-0"
                  key={testimonial.id}
                >
                  <Voice testimonial={testimonial} />
                </RevealItem>
              ))}
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
