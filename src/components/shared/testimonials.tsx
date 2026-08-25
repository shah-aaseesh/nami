import type { ReactNode } from "react";
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

function TestimonialsHeader({
  children,
  section,
}: {
  children?: ReactNode;
  section: SectionCopy;
}) {
  return (
    <Reveal stagger={0.08}>
      <RevealItem className="flex items-center gap-5">
        <Eyebrow>{section.heading}</Eyebrow>
        <span className="h-px flex-1 bg-border" />
      </RevealItem>

      <div className="mt-4 flex flex-wrap items-end gap-6">
        <div className="w-full lg:w-7/12">
          <SplitText as="h2">{section.eyebrow ?? "Student voices"}</SplitText>
        </div>

        {children}
      </div>

      {section.standfirst === null ? null : (
        <RevealItem className="mt-6 w-full lg:w-7/12">
          <Standfirst>{section.standfirst}</Standfirst>
        </RevealItem>
      )}
    </Reveal>
  );
}

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
        {testimonials.length > 1 ? (
          <Carousel
            aria-label={section.eyebrow ?? section.heading}
            aria-roledescription="carousel"
            opts={{ align: "start", slidesToScroll: "auto" }}
          >
            <TestimonialsHeader section={section}>
              <CarouselControls className="ms-auto">
                <CarouselPrevious
                  aria-label="Previous testimonials"
                  size="icon-xl"
                />
                <CarouselNext aria-label="Next testimonials" size="icon-xl" />
              </CarouselControls>
            </TestimonialsHeader>

            <Reveal className="mt-12 lg:mt-16" y={32}>
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
            </Reveal>
          </Carousel>
        ) : (
          <>
            <TestimonialsHeader section={section} />

            {single === undefined ? (
              section.emptyState === null ? null : (
                <P className="mt-12 lg:w-5/12">{section.emptyState}</P>
              )
            ) : (
              <Reveal className="mt-12 lg:mt-16" y={32}>
                <TestimonialCard className="lg:w-7/12" testimonial={single} />
              </Reveal>
            )}
          </>
        )}
      </div>
    </section>
  );
}
