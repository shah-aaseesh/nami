import { Reveal, RevealItem } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Eyebrow, P, Standfirst } from "@/components/ui/typography";
import type { SectionCopy, Testimonial } from "@/lib/content";
import { content } from "@/lib/content";
import { TestimonialCard } from "./testimonials-card";
import { TestimonialsCarousel } from "./testimonials-carousel";

export async function Testimonials({
  id = "testimonials",
  items,
  section,
}: {
  id?: string;
  items?: readonly Testimonial[];
  section: SectionCopy;
}) {
  const testimonials = items ?? (await content.getTestimonials());

  const single = testimonials.length === 1 ? testimonials[0] : undefined;

  return (
    <section className="gutter-x section-y" id={id}>
      <div className="mx-auto max-w-page">
        <Reveal className="lg:w-7/12" stagger={0.08}>
          {section.eyebrow === null ? null : (
            <RevealItem className="flex items-center gap-5">
              <Eyebrow>{section.eyebrow}</Eyebrow>
              <span className="h-px flex-1 bg-border" />
            </RevealItem>
          )}

          <SplitText as="h2" className="mt-6 font-display text-5xl lg:mt-8">
            {section.heading}
          </SplitText>

          {section.standfirst === null ? null : (
            <RevealItem className="mt-8">
              <Standfirst>{section.standfirst}</Standfirst>
            </RevealItem>
          )}
        </Reveal>

        {testimonials.length === 0 ? (
          section.emptyState === null ? null : (
            <P className="mt-12 lg:w-5/12">{section.emptyState}</P>
          )
        ) : (
          <Reveal className="mt-12 lg:mt-16" y={32}>
            {single === undefined ? (
              <TestimonialsCarousel
                items={testimonials}
                label={section.eyebrow ?? section.heading}
              />
            ) : (
              <TestimonialCard testimonial={single} />
            )}
          </Reveal>
        )}
      </div>
    </section>
  );
}
