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
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { useCarouselAutoplay } from "@/hooks/motion/use-carousel-autoplay";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@/lib/icons";
import { cn } from "@/lib/utils";

export type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
  readonly autoplay?: boolean;
  readonly autoplayIntervalMs?: number;
  readonly opts?: CarouselOptions;
  readonly pauseOnHover?: boolean;
  readonly plugins?: CarouselPlugin;
  readonly setApi?: (api: CarouselApi) => void;
};

type CarouselOrientation = "horizontal" | "vertical";

type CarouselContextProps = {
  readonly carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  readonly api: CarouselApi;
  readonly canScrollNext: boolean;
  readonly canScrollPrev: boolean;
  readonly orientation: CarouselOrientation;
  readonly scrollNext: () => void;
  readonly scrollPrev: () => void;
  readonly scrollTo: (index: number) => void;
  readonly selectedIndex: number;
  readonly scrollSnaps: readonly number[];
};

const CarouselContext = createContext<CarouselContextProps | null>(null);

export function useCarousel() {
  const context = useContext(CarouselContext);
  if (context === null) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }
  return context;
}

export function Carousel({
  autoplay = false,
  autoplayIntervalMs,
  children,
  className,
  opts,
  pauseOnHover = true,
  plugins,
  setApi,
  ...props
}: ComponentProps<"div"> & CarouselProps) {
  const axis = opts?.axis ?? "x";
  const orientation: CarouselOrientation =
    axis === "y" ? "vertical" : "horizontal";
  const [carouselRef, api] = useEmblaCarousel({ ...opts, axis }, plugins);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback((emblaApi: CarouselApi) => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setScrollSnaps(emblaApi.scrollSnapList());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, []);

  const scrollTo = useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api],
  );

  const scrollPrev = useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const { pause, resume } = useCarouselAutoplay({
    api,
    enabled: autoplay && (scrollSnaps.length > 1 || Boolean(api)),
    intervalMs: autoplayIntervalMs,
    selectedIndex,
  });

  const prevKey = orientation === "vertical" ? "ArrowUp" : "ArrowLeft";
  const nextKey = orientation === "vertical" ? "ArrowDown" : "ArrowRight";

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === prevKey) {
      event.preventDefault();
      api?.scrollPrev();
    } else if (event.key === nextKey) {
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
      value={{
        api,
        canScrollNext,
        canScrollPrev,
        carouselRef,
        orientation,
        scrollNext,
        scrollPrev,
        scrollSnaps,
        scrollTo,
        selectedIndex,
      }}
    >
      {/* biome-ignore lint/a11y/useSemanticElements: the ARIA carousel pattern pairs role="region" with aria-roledescription="carousel"; there is no semantic HTML equivalent. */}
      <div
        {...props}
        className={cn("relative", className)}
        data-slot="carousel"
        onBlurCapture={autoplay ? resume : undefined}
        onFocusCapture={autoplay ? pause : undefined}
        onKeyDownCapture={onKeyDown}
        onPointerEnter={autoplay && pauseOnHover ? pause : undefined}
        onPointerLeave={autoplay && pauseOnHover ? resume : undefined}
        role="region"
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
  const { carouselRef, orientation } = useCarousel();

  return (
    <div
      className={cn("overflow-hidden", viewportClassName)}
      data-slot="carousel-content"
      ref={carouselRef}
    >
      <div
        className={cn(
          "flex",
          orientation === "vertical" ? "flex-col" : "flex-row",
          className,
        )}
        {...props}
      />
    </div>
  );
}

export function CarouselItem({ className, ...props }: ComponentProps<"div">) {
  const { orientation } = useCarousel();

  return (
    // biome-ignore lint/a11y/useSemanticElements: the ARIA carousel pattern pairs role="group" with aria-roledescription="slide"; the suggested <fieldset> is for grouping form controls and would be wrong here.
    <div
      aria-roledescription="slide"
      className={cn(
        "shrink-0 grow-0 basis-full",
        orientation === "vertical" ? "min-h-0" : "min-w-0",
        className,
      )}
      data-slot="carousel-item"
      role="group"
      {...props}
    />
  );
}

export function CarouselControls({
  className,
  ...props
}: ComponentProps<"div">) {
  const { scrollSnaps } = useCarousel();

  if (scrollSnaps.length < 2) return null;

  return (
    <div
      className={cn("flex items-center gap-2", className)}
      data-slot="carousel-controls"
      {...props}
    />
  );
}

export function CarouselPrevious({
  className,
  size = "icon",
  variant = "default",
  ...props
}: ComponentProps<typeof Button>) {
  const { canScrollPrev, orientation, scrollPrev } = useCarousel();

  return (
    <Button
      aria-label="Previous slide"
      className={cn("rounded-full", className)}
      data-slot="carousel-previous"
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      size={size}
      type="button"
      variant={variant}
      {...props}
    >
      <Icon icon={orientation === "vertical" ? ChevronUpIcon : ArrowLeftIcon} />
    </Button>
  );
}

export function CarouselNext({
  className,
  size = "icon",
  variant = "default",
  ...props
}: ComponentProps<typeof Button>) {
  const { canScrollNext, orientation, scrollNext } = useCarousel();

  return (
    <Button
      aria-label="Next slide"
      className={cn("rounded-full", className)}
      data-slot="carousel-next"
      disabled={!canScrollNext}
      onClick={scrollNext}
      size={size}
      type="button"
      variant={variant}
      {...props}
    >
      <Icon
        icon={orientation === "vertical" ? ChevronDownIcon : ArrowRightIcon}
      />
    </Button>
  );
}

export function CarouselDots({
  activeDotClassName,
  className,
  dotClassName,
  dotLabel,
  ...props
}: ComponentProps<"div"> & {
  readonly activeDotClassName?: string;
  readonly dotClassName?: string;
  readonly dotLabel?: string;
}) {
  const { scrollSnaps, scrollTo, selectedIndex } = useCarousel();

  if (scrollSnaps.length < 2) return null;

  return (
    <div
      className={cn("flex items-center gap-2", className)}
      data-slot="carousel-dots"
      {...props}
    >
      <div className="field-brand flex items-center gap-1 sm:gap-1.5 rounded-full px-2.5 py-1 sm:px-3 sm:py-1.5 shadow-sm">
        {scrollSnaps.map((snap, index) => {
          const active = selectedIndex === index;

          return (
            <button
              aria-current={active}
              aria-label={`${dotLabel ?? "Go to slide"} ${index + 1} of ${scrollSnaps.length}`}
              className="group p-1 sm:p-1.5 cursor-pointer flex items-center justify-center transition-transform hover:scale-110"
              key={snap}
              onClick={() => scrollTo(index)}
              type="button"
            >
              <span
                className={cn(
                  "block size-1.5 sm:size-2 rounded-full transition-all duration-300",
                  active
                    ? "bg-ink scale-110"
                    : "bg-ink-muted/60 group-hover:bg-ink-muted",
                  dotClassName,
                  active ? activeDotClassName : null,
                )}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
