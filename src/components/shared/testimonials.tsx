import { Reveal, RevealItem } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import {
  Carousel,
  CarouselContent,
  CarouselControls,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Eyebrow, P, Standfirst } from "@/components/ui/typography";
import type { SectionCopy, Testimonial } from "@/lib/content";
import { content } from "@/lib/content";
import { TestimonialCard } from "./testimonials-card";

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
              <Carousel
                aria-label={section.eyebrow ?? section.heading}
                aria-roledescription="carousel"
                className="flex flex-col gap-8"
                opts={{ align: "start", slidesToScroll: "auto" }}
              >
                <CarouselContent className="-ms-4 lg:-ms-6">
                  {testimonials.map((testimonial) => (
                    <CarouselItem
                      className="ps-4 md:basis-1/2 lg:basis-1/3 lg:ps-6"
                      key={testimonial.id}
                    >
                      <TestimonialCard testimonial={testimonial} />
                    </CarouselItem>
                  ))}
                </CarouselContent>

                <CarouselControls className="justify-end">
                  <CarouselPrevious aria-label="Previous testimonials" />
                  <CarouselNext aria-label="Next testimonials" />
                </CarouselControls>
              </Carousel>
            ) : (
              <TestimonialCard className="lg:w-7/12" testimonial={single} />
            )}
          </Reveal>
        )}
      </div>
    </section>
  );
}
