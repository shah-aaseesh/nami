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
import { TestimonialsDots } from "./testimonials-dots";

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

  const displayTestimonials =
    testimonials.length > 1 && testimonials.length < 6
      ? [
          ...testimonials.map((t) => ({ ...t, itemKey: `${t.id}-1` })),
          ...testimonials.map((t) => ({ ...t, itemKey: `${t.id}-2` })),
          ...testimonials.map((t) => ({ ...t, itemKey: `${t.id}-3` })),
        ].slice(0, Math.max(testimonials.length * 2, 6))
      : testimonials.map((t) => ({ ...t, itemKey: t.id }));

  return (
    <section className="gutter-x section-y" id={id}>
      <div className="mx-auto max-w-page">
        {testimonials.length > 1 ? (
          <Carousel
            aria-label={section.eyebrow ?? section.heading}
            aria-roledescription="carousel"
            autoplay={true}
            autoplayIntervalMs={4000}
            pauseOnHover={true}
            opts={{
              align: "start",
              duration: 40,
              loop: true,
              slidesToScroll: 1,
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
                {displayTestimonials.map((testimonial) => (
                  <CarouselItem
                    className="ps-4 basis-full md:basis-1/2 lg:basis-1/3 lg:ps-6"
                    key={testimonial.itemKey}
                  >
                    <TestimonialCard
                      className="h-full"
                      testimonial={testimonial}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>

              <TestimonialsDots ids={testimonials.map((t) => t.id)} />
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
