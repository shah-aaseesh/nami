"use client";

import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import {
  type ComponentProps,
  createContext,
  type KeyboardEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { cn } from "@/lib/utils";

export type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
  readonly opts?: CarouselOptions;
  readonly plugins?: CarouselPlugin;
  readonly setApi?: (api: CarouselApi) => void;
};

type CarouselContextProps = {
  readonly carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  readonly api: CarouselApi;
  readonly scrollTo: (index: number) => void;
  readonly selectedIndex: number;
  readonly scrollSnaps: readonly number[];
};

const CarouselContext = createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = useContext(CarouselContext);
  if (context === null) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }
  return context;
}

export function Carousel({
  children,
  className,
  opts,
  plugins,
  setApi,
  ...props
}: ComponentProps<"div"> & CarouselProps) {
  const [carouselRef, api] = useEmblaCarousel({ ...opts, axis: "x" }, plugins);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback((emblaApi: CarouselApi) => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const scrollTo = useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api],
  );

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      api?.scrollPrev();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      api?.scrollNext();
    }
  };

  useEffect(() => {
    if (!api || !setApi) return;
    setApi(api);
  }, [api, setApi]);

  useEffect(() => {
    if (!api) return;
    onSelect(api);
    api.on("reInit", onSelect);
    api.on("select", onSelect);
    return () => {
      api.off("reInit", onSelect);
      api.off("select", onSelect);
    };
  }, [api, onSelect]);

  return (
    <CarouselContext.Provider
      value={{ api, carouselRef, scrollSnaps, scrollTo, selectedIndex }}
    >
      <div
        className={cn("relative", className)}
        data-slot="carousel"
        onKeyDownCapture={onKeyDown}
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

export function CarouselContent({
  className,
  viewportClassName,
  ...props
}: ComponentProps<"div"> & { readonly viewportClassName?: string }) {
  const { carouselRef } = useCarousel();

  return (
    <div
      className={cn("overflow-hidden", viewportClassName)}
      data-slot="carousel-content"
      ref={carouselRef}
    >
      <div className={cn("flex", className)} {...props} />
    </div>
  );
}

export function CarouselItem({ className, ...props }: ComponentProps<"div">) {
  return (
    // biome-ignore lint/a11y/useSemanticElements: the ARIA carousel pattern pairs role="group" with aria-roledescription="slide"; the suggested <fieldset> is for grouping form controls and would be wrong here.
    <div
      aria-roledescription="slide"
      className={cn("min-w-0 shrink-0 grow-0 basis-full", className)}
      data-slot="carousel-item"
      role="group"
      {...props}
    />
  );
}

export function CarouselDots({
  activeDotClassName,
  className,
  dotClassName,
  getDotLabel,
  ...props
}: ComponentProps<"div"> & {
  readonly activeDotClassName?: string;
  readonly dotClassName?: string;
  readonly getDotLabel?: (index: number) => string;
}) {
  const { scrollSnaps, scrollTo, selectedIndex } = useCarousel();

  if (scrollSnaps.length < 2) return null;

  return (
    <div
      className={cn("flex items-center gap-2", className)}
      data-slot="carousel-dots"
      {...props}
    >
      {scrollSnaps.map((snap, index) => {
        const active = selectedIndex === index;

        return (
          <button
            aria-current={active}
            aria-label={getDotLabel?.(index) ?? `Go to slide ${index + 1}`}
            className="inline-flex h-6 items-center px-0.5"
            key={snap}
            onClick={() => scrollTo(index)}
            type="button"
          >
            <span
              className={cn(
                "block h-1 rounded-full transition-all duration-300",
                active ? "w-10 bg-accent" : "w-4 bg-border-strong",
                dotClassName,
                active ? activeDotClassName : null,
              )}
            />
          </button>
        );
      })}
    </div>
  );
}
