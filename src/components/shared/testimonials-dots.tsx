"use client";

import { useCarousel } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

export function TestimonialsDots({
  className,
  ids,
}: {
  readonly className?: string;
  readonly ids: readonly string[];
}) {
  const { scrollTo, selectedIndex } = useCarousel();
  const count = ids.length;

  if (count < 2) return null;

  return (
    <div
      className={cn(
        "mt-4 flex items-center justify-center sm:mt-5",
        className,
      )}
      data-slot="testimonials-dots"
    >
      <div className="flex items-center gap-1.5 rounded-full bg-primary-100/90 px-3.5 py-2 shadow-xs ring-1 ring-primary-200 backdrop-blur-xs">
        {ids.map((id, index) => {
          const active = selectedIndex % count === index;

          return (
            <button
              aria-current={active ? "true" : undefined}
              aria-label={`Go to testimonial ${index + 1} of ${count}`}
              className="group flex cursor-pointer items-center justify-center p-1 transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 rounded-full"
              key={id}
              onClick={() => scrollTo(index)}
              type="button"
            >
              <span
                className={cn(
                  "block h-2 rounded-full transition-all duration-300",
                  active
                    ? "w-6 bg-primary-700 shadow-xs"
                    : "w-2 bg-primary-700/35 group-hover:bg-primary-700/70",
                )}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
