import { localContentProvider } from "./local/provider";
import type { ContentProvider } from "./provider";

export {
  type ContentEntry,
  type ContentId,
  contentId,
  entryOf,
  type IsoDate,
  isoDate,
  type Slug,
  slug,
} from "./identifiers";
export {
  isPlaceholder,
  isPlaceholderShaped,
  type PlaceholderKind,
  type PlaceholderRecord,
  placeholderRecords,
  placeholderValues,
} from "./placeholder-registry";
export {
  type ContentProvider,
  ContentSourceUnavailableError,
} from "./provider";
export {
  paragraphsOf,
  type RichText,
  richText,
  richTextFromHtml,
} from "./rich-text";
export type * from "./types";

export const content: ContentProvider = localContentProvider;
