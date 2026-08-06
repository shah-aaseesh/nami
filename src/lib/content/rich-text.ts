export type RichText =
  | { readonly kind: "blocks"; readonly paragraphs: readonly string[] }
  | { readonly kind: "html"; readonly html: string };

export function richText(...paragraphs: readonly string[]): RichText {
  return { kind: "blocks", paragraphs };
}

export function richTextFromHtml(html: string): RichText {
  return { kind: "html", html };
}
