type Brand<T, B extends string> = T & { readonly __brand: B };

export type ContentId = Brand<string, "ContentId">;
export type Slug = Brand<string, "Slug">;
export type IsoDate = Brand<string, "IsoDate">;

export type ContentEntry = {
  readonly id: ContentId;
  readonly slug: Slug;
};

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ISO_DATE_PATTERN =
  /^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2}))?$/;

export function contentId(value: string): ContentId {
  if (value.length === 0) {
    throw new TypeError("contentId received an empty string");
  }
  return value as ContentId;
}

export function slug(value: string): Slug {
  if (!SLUG_PATTERN.test(value)) {
    throw new TypeError(`Not a kebab-case slug: "${value}"`);
  }
  return value as Slug;
}

export function isoDate(value: string): IsoDate {
  if (!ISO_DATE_PATTERN.test(value) || Number.isNaN(Date.parse(value))) {
    throw new TypeError(`Not an ISO-8601 date: "${value}"`);
  }
  const year = Number(value.slice(0, 4));
  const month = Number(value.slice(5, 7));
  const day = Number(value.slice(8, 10));
  const calendar = new Date(Date.UTC(year, month - 1, day));
  if (
    calendar.getUTCFullYear() !== year ||
    calendar.getUTCMonth() !== month - 1 ||
    calendar.getUTCDate() !== day
  ) {
    throw new TypeError(`Not a real calendar date: "${value}"`);
  }
  return value as IsoDate;
}

export function entryOf(value: string): ContentEntry {
  return { id: contentId(value), slug: slug(value) };
}
