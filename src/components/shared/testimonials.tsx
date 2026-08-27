import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeader } from "@/components/shared/section-header";
import {
  Carousel,
  CarouselContent,
  CarouselControls,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { P } from "@/components/ui/typography";
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
    <SectionHeader
      action={children}
      description={section.standfirst}
      eyebrow={section.heading}
      layout="action"
      title={section.eyebrow ?? "Student voices"}
    />
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
            autoplay={true}
            autoplayIntervalMs={7000}
            opts={{
              align: "start",
              duration: 25,
              loop: true,
              slidesToScroll: "auto",
            }}
          >
            <TestimonialsHeader section={section}>
              <CarouselControls className="ms-auto">
                <CarouselPrevious
                  aria-label="Previous testimonials"
                  className="size-9 sm:size-12 [&_svg]:size-4 sm:[&_svg]:size-6"
                />
                <CarouselNext
                  aria-label="Next testimonials"
                  className="size-9 sm:size-12 [&_svg]:size-4 sm:[&_svg]:size-6"
                />
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
