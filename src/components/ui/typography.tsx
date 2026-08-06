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
  "font-display text-8xl font-semibold text-balance",
);

export const H1 = createText(
  "h1",
  "h1",
  "font-display text-6xl font-semibold text-balance",
);

export const H2 = createText(
  "h2",
  "h2",
  "font-display text-5xl font-semibold text-balance",
);

export const H3 = createText(
  "h3",
  "h3",
  "font-display text-4xl font-semibold text-balance",
);

export const H4 = createText(
  "h4",
  "h4",
  "font-display text-3xl font-semibold text-balance",
);

export const H5 = createText(
  "h5",
  "h5",
  "font-display text-2xl font-semibold text-balance",
);

export const H6 = createText(
  "h6",
  "h6",
  "font-display text-xl font-semibold text-balance",
);

export const Eyebrow = createText(
  "p",
  "eyebrow",
  "font-body text-xs font-medium tracking-widest text-accent uppercase",
);

export const Standfirst = createText(
  "p",
  "standfirst",
  "font-body text-xl font-normal text-pretty text-ink-muted",
);

export const P = createText(
  "p",
  "p",
  "font-body text-base font-normal text-pretty text-ink-muted",
);
