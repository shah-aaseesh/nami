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
  type ContentProvider,
  ContentSourceUnavailableError,
} from "./provider";
export {
  paragraphsOf,
  type RichText,
  richText,
  richTextFromHtml,
} from "./rich-text";
export { schoolGrades } from "./school-grades";
export type * from "./types";
export { GALLERY_CATEGORIES, PROVISIONAL_UPDATE_CATEGORIES } from "./types";

export const content: ContentProvider = localContentProvider;
