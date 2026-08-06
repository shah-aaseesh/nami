export type JsonLdNode = {
  readonly [key: string]: JsonLdValue | undefined;
};

export type JsonLdValue =
  | string
  | number
  | boolean
  | readonly JsonLdValue[]
  | JsonLdNode;

function sanitizeGraph(graph: readonly JsonLdNode[]): string {
  // `<` only ever occurs inside a JSON string, and `<` is the same character
  // to a JSON parser — so escaping it cannot alter the data, only the `</script>` break.
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": graph,
  }).replace(/</g, "\\u003c");
}

export function JsonLd({ graph }: { readonly graph: readonly JsonLdNode[] }) {
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: the one sanctioned raw-HTML sink — input is a typed JSON node serialised here, never a caller-supplied string.
      dangerouslySetInnerHTML={{ __html: sanitizeGraph(graph) }}
    />
  );
}
