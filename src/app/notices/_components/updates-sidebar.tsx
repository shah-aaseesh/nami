import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eyebrow } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { noticesCopy } from "./notices-copy";
import {
  ALL_CATEGORIES,
  ALL_YEARS,
  type UpdateCategoryFilter,
  type UpdateKindFilter,
  type YearFilter,
} from "./updates-filter";

const YEAR_LABEL_ID = "updates-year-label";
const YEAR_SELECT_ID = "updates-year";
const CATEGORY_LABEL_ID = "updates-category-label";
const CATEGORY_SELECT_ID = "updates-category";

export type SidebarOption<T extends string> = {
  readonly id: T;
  readonly label: string;
};

export function SidebarTabs<T extends string>({
  className,
  controls,
  legend,
  onSelect,
  options,
  value,
}: {
  readonly className?: string;
  readonly controls: string;
  readonly legend: string;
  readonly onSelect: (id: T) => void;
  readonly options: readonly SidebarOption<T>[];
  readonly value: T;
}) {
  return (
    <fieldset className={cn("min-w-0", className)}>
      <Eyebrow as="legend" className="text-ink-muted">
        {legend}
      </Eyebrow>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-1">
        {options.map((option) => {
          const active = option.id === value;
          return (
            <button
              aria-controls={controls}
              aria-pressed={active}
              className={cn(
                "flex min-h-11 w-full cursor-pointer items-center justify-between gap-3 rounded-md border px-4 py-2.5 text-left font-body text-sm transition-colors duration-200",
                active
                  ? "border-accent text-ink"
                  : "border-border text-ink-muted hover:border-border-strong hover:text-ink",
              )}
              key={option.id}
              onClick={() => onSelect(option.id)}
              type="button"
            >
              {option.label}
              <span
                aria-hidden="true"
                className={cn(
                  "size-1.5 shrink-0 rounded-full border transition-colors duration-200",
                  active
                    ? "border-accent bg-accent"
                    : "border-border-strong bg-transparent",
                )}
              />
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export function UpdatesSidebar({
  category,
  categoryOptions,
  controls,
  kind,
  kindOptions,
  onSelectCategory,
  onSelectKind,
  onSelectYear,
  year,
  yearOptions,
}: {
  readonly category: UpdateCategoryFilter;
  readonly categoryOptions: readonly SidebarOption<UpdateCategoryFilter>[];
  readonly controls: string;
  readonly kind: UpdateKindFilter;
  readonly kindOptions: readonly SidebarOption<UpdateKindFilter>[];
  readonly onSelectCategory: (id: UpdateCategoryFilter) => void;
  readonly onSelectKind: (id: UpdateKindFilter) => void;
  readonly onSelectYear: (id: YearFilter) => void;
  readonly year: YearFilter;
  readonly yearOptions: readonly SidebarOption<YearFilter>[];
}) {
  const yearLabel =
    yearOptions.find((option) => option.id === year)?.label ??
    noticesCopy.allYears;

  const categoryLabel =
    categoryOptions.find((option) => option.id === category)?.label ??
    noticesCopy.allCategories;

  return (
    <div className="border-b border-border pb-10 lg:border-b-0 lg:pb-12">
      <SidebarTabs
        controls={controls}
        legend={noticesCopy.kindGroupLabel}
        onSelect={onSelectKind}
        options={kindOptions}
        value={kind}
      />

      <div className="mt-10 max-w-xs lg:max-w-none">
        <Eyebrow
          as="label"
          className="text-ink-muted"
          htmlFor={YEAR_SELECT_ID}
          id={YEAR_LABEL_ID}
        >
          {noticesCopy.yearGroupLabel}
        </Eyebrow>
        <Select
          onValueChange={(next: YearFilter | null) =>
            onSelectYear(next ?? ALL_YEARS)
          }
          value={year}
        >
          <SelectTrigger
            aria-controls={controls}
            aria-labelledby={`${YEAR_LABEL_ID} ${YEAR_SELECT_ID}`}
            className="mt-4 w-full"
            id={YEAR_SELECT_ID}
          >
            <SelectValue>{yearLabel}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {yearOptions.map((option) => (
              <SelectItem key={option.id} value={option.id}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="mt-10 max-w-xs lg:max-w-none">
        <Eyebrow
          as="label"
          className="text-ink-muted"
          htmlFor={CATEGORY_SELECT_ID}
          id={CATEGORY_LABEL_ID}
        >
          {noticesCopy.categoryGroupLabel}
        </Eyebrow>
        <Select
          onValueChange={(next: UpdateCategoryFilter | null) =>
            onSelectCategory(next ?? ALL_CATEGORIES)
          }
          value={category}
        >
          <SelectTrigger
            aria-controls={controls}
            aria-labelledby={`${CATEGORY_LABEL_ID} ${CATEGORY_SELECT_ID}`}
            className="mt-4 w-full"
            id={CATEGORY_SELECT_ID}
          >
            <SelectValue>{categoryLabel}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {categoryOptions.map((option) => (
              <SelectItem key={option.id} value={option.id}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
