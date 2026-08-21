import type { ContentImage } from "./types";

export type PlaceholderKind =
  | "contact"
  | "address"
  | "map"
  | "link"
  | "image"
  | "testimonial"
  | "update";

export type PlaceholderRecord = {
  readonly path: string;
  readonly kind: PlaceholderKind;
  readonly value: string;
};

const MARKER_PATTERNS: readonly RegExp[] = [
  /placeholder/i,
  /\.example(?=$|[/:?#])/,
  // Three or more, so a masked number stays caught while real copy ("XXL") does not.
  /X{3,}/,
];

const records = new Map<string, PlaceholderRecord>();
const markedValues = new Set<string>();

export function isPlaceholderShaped(value: string): boolean {
  return MARKER_PATTERNS.some((pattern) => pattern.test(value));
}

function collectStrings(data: unknown, into: string[]): void {
  if (typeof data === "string") {
    into.push(data);
    return;
  }
  if (Array.isArray(data)) {
    for (const item of data) {
      collectStrings(item, into);
    }
    return;
  }
  if (typeof data === "object" && data !== null) {
    for (const item of Object.values(data)) {
      collectStrings(item, into);
    }
  }
}

export function placeholderText(
  path: string,
  kind: PlaceholderKind,
  value: string,
): string {
  if (!isPlaceholderShaped(value)) {
    throw new TypeError(
      `Placeholder "${path}" does not read as a placeholder: "${value}"`,
    );
  }
  records.set(path, { path, kind, value });
  markedValues.add(value);
  return value;
}

export function placeholderData<T>(
  path: string,
  kind: PlaceholderKind,
  data: T,
): T {
  const strings: string[] = [];
  collectStrings(data, strings);
  const marked = strings.filter(isPlaceholderShaped);
  const longest = marked.reduce(
    (best, value) => (value.length > best.length ? value : best),
    "",
  );
  if (longest === "") {
    throw new TypeError(
      `Placeholder "${path}" carries no value that reads as a placeholder`,
    );
  }
  records.set(path, { path, kind, value: longest });
  for (const value of marked) {
    markedValues.add(value);
  }
  return data;
}

export function placeholderImage(path: string, image: ContentImage) {
  return placeholderData(path, "image", image);
}

export function isPlaceholder(value: string | null | undefined): boolean {
  return typeof value === "string" && markedValues.has(value);
}

export function placeholderRecords(): readonly PlaceholderRecord[] {
  return [...records.values()];
}

export function placeholderValues(): readonly string[] {
  return [...markedValues];
}
