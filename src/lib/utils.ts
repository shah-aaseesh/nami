import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge<
  "color-field" | "gutter-x" | "section-y" | "bleed-x" | "text-outline"
>({
  extend: {
    theme: { container: ["page"], radius: ["media"] },
    classGroups: {
      "color-field": [{ field: ["ink", "brand", "teal"] }],
      "gutter-x": ["gutter-x"],
      "section-y": ["section-y"],
      "bleed-x": ["bleed-x"],
      "text-outline": ["text-outline"],
    },
    conflictingClassGroups: {
      p: ["gutter-x", "section-y"],
      px: ["gutter-x"],
      py: ["section-y"],
      m: ["bleed-x"],
      mx: ["bleed-x"],
      "gutter-x": ["p", "px", "ps", "pe", "pl", "pr"],
      "section-y": ["p", "py", "pt", "pb"],
      "bleed-x": ["m", "mx", "ms", "me", "ml", "mr"],
    },
  },
});

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
