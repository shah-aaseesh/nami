import type { ComponentPropsWithRef, ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type TextProps<E extends ElementType> = {
  as?: E;
  className?: string;
  children?: ReactNode;
} & Omit<ComponentPropsWithRef<E>, "as" | "className" | "children">;

export function createText<D extends ElementType>(
  defaultTag: D,
  slot: string,
  styles: string,
) {
  function Text<E extends ElementType = D>({
    as,
    className,
    ...props
  }: TextProps<E>) {
    const Tag = (as ?? defaultTag) as ElementType;
    return (
      <Tag data-slot={slot} className={cn(styles, className)} {...props} />
    );
  }
  Text.displayName = slot;
  return Text;
}

export const Display = createText(
  "h1",
  "display",
  "font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-balance text-ink leading-[1.08]",
);

export const H1 = createText(
  "h1",
  "h1",
  "font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-balance text-ink leading-[1.1]",
);

export const H2 = createText(
  "h2",
  "h2",
  "font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-balance text-ink leading-[1.15]",
);

export const H3 = createText(
  "h3",
  "h3",
  "font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal text-balance text-ink leading-[1.2]",
);

export const H4 = createText(
  "h4",
  "h4",
  "font-display text-lg sm:text-xl md:text-2xl lg:text-3xl font-normal text-balance text-ink leading-snug",
);

export const H5 = createText(
  "h5",
  "h5",
  "font-display text-base sm:text-lg md:text-xl lg:text-2xl font-normal text-balance text-ink leading-snug",
);

export const H6 = createText(
  "h6",
  "h6",
  "font-display text-sm sm:text-base md:text-lg font-normal text-balance text-ink leading-snug",
);

export const Eyebrow = createText(
  "p",
  "eyebrow",
  "font-body text-xs sm:text-sm font-semibold tracking-wider text-accent uppercase",
);

export const Standfirst = createText(
  "p",
  "standfirst",
  "font-body text-sm sm:text-base font-normal text-pretty text-ink-muted leading-relaxed",
);

export const P = createText(
  "p",
  "p",
  "font-body text-sm sm:text-base font-normal text-pretty text-ink-muted leading-relaxed",
);

export const Small = createText(
  "p",
  "small",
  "font-body text-xs sm:text-sm font-normal text-pretty text-ink-muted",
);
