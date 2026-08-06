import type { RichText } from "@/lib/content";

export function paragraphsOf(text: RichText): readonly string[] {
  return text.kind === "blocks" ? text.paragraphs : [];
}
