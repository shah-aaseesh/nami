import Image from "next/image";
import { Parallax } from "@/components/motion/parallax";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Eyebrow, H6, P, Standfirst } from "@/components/ui/typography";
import type { Testimonial } from "@/lib/content";
import { content } from "@/lib/content";
import { cn } from "@/lib/utils";

const VOICE_PLACEMENT = [
  "lg:col-span-7 lg:col-start-1",
  "lg:col-span-7 lg:col-start-6",
  "lg:col-span-8 lg:col-start-2",
] as const;

function quoteStep(quote: string): string {
  if (quote.length <= 120) return "text-4xl";
  if (quote.length <= 280) return "text-3xl";
  return "text-2xl";
}

function Voice({ testimonial }: { testimonial: Testimonial }) {
  const { portrait } = testimonial;

  return (
    <figure className="lg:grid lg:grid-cols-8 lg:items-start lg:gap-x-8">
      {portrait === null ? null : (
        <div className="w-32 lg:col-span-3 lg:col-start-1 lg:row-start-1 lg:-z-10 lg:w-auto">
          <div className="relative aspect-square overflow-hidden">
            <Parallax className="absolute inset-0" speed={0.97}>
              <Image
                alt={portrait.alt}
                className="scale-110 object-cover"
                fill
                loading="lazy"
                sizes="(min-width: 1024px) 22vw, 128px"
                src={portrait.src}
              />
            </Parallax>
            <span className="pointer-events-none absolute inset-0 hidden bg-linear-to-l from-surface from-30% to-transparent to-70% lg:block" />
          </div>
        </div>
      )}

      <blockquote className="mt-8 lg:col-span-6 lg:col-start-3 lg:row-start-1 lg:mt-0 lg:pt-20">
        <p
          className={cn(
            "font-display font-normal text-ink text-pretty",
            quoteStep(testimonial.quote),
          )}
        >
          {testimonial.quote}
        </p>
      </blockquote>

      <figcaption className="mt-8 border-t pt-6 lg:col-span-6 lg:col-start-3 lg:row-start-2 lg:mt-10">
        <H6 as="span" className="block">
          {testimonial.name}
        </H6>
        <span className="mt-2 block font-body text-sm text-ink-muted">
          {testimonial.programme}
        </span>
        {testimonial.graduatedYear === null ? null : (
          <span className="mt-1 block font-body text-sm text-ink-muted">
            {testimonial.graduatedYear}
          </span>
        )}
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
    <section className="relative isolate gutter-x section-y" id="testimonials">
      <div className="mx-auto max-w-page">
        {section.eyebrow === null ? null : (
          <Reveal className="flex items-center gap-5 lg:w-7/12">
            <Eyebrow>{section.eyebrow}</Eyebrow>
            <span className="h-px flex-1 bg-border" />
          </Reveal>
        )}

        <SplitText
          as="h2"
          className="mt-8 font-display text-5xl font-semibold lg:mt-12 lg:w-8/12"
        >
          {section.heading}
        </SplitText>

        {section.standfirst === null ? null : (
          <Reveal className="mt-12 lg:mt-14 lg:w-5/12" delay={0.25}>
            <Standfirst>{section.standfirst}</Standfirst>
          </Reveal>
        )}

        {testimonials.length === 0 && section.emptyState !== null ? (
          <P className="mt-16 lg:w-5/12">{section.emptyState}</P>
        ) : null}

        {testimonials.length === 0 ? null : (
          <Reveal
            className="mt-16 lg:mt-24 lg:grid lg:grid-cols-12 lg:gap-x-8"
            delay={0.4}
            stagger={0.08}
          >
            {testimonials.map((testimonial, index) => (
              <RevealItem
                className={cn(
                  "mt-16 first:mt-0 lg:mt-24",
                  VOICE_PLACEMENT[index] ?? VOICE_PLACEMENT[0],
                )}
                key={testimonial.id}
              >
                <Voice testimonial={testimonial} />
              </RevealItem>
            ))}
          </Reveal>
        )}
      </div>
    </section>
  );
}
