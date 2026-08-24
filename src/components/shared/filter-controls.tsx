import type { ReactNode } from "react";
import { Eyebrow, H4 } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

export type FilterOption<T extends string> = {
  readonly accessibleLabel?: string;
  readonly id: T;
  readonly label: string;
};

type FilterProps<T extends string> = {
  readonly className?: string;
  readonly controls: string;
  readonly legend: string;
  readonly onSelect: (id: T) => void;
  readonly options: readonly FilterOption<T>[];
  readonly value: T;
};

function FilterGroup({
  children,
  className,
  legend,
}: {
  readonly children: ReactNode;
  readonly className?: string;
  readonly legend: string;
}) {
  return (
    <fieldset className={cn("min-w-0", className)}>
      <Eyebrow as="legend" className="text-ink-muted">
        {legend}
      </Eyebrow>
      {children}
    </fieldset>
  );
}

export function SegmentedFilter<T extends string>({
  className,
  controls,
  legend,
  onSelect,
  options,
  value,
}: FilterProps<T>) {
  return (
    <FilterGroup className={className} legend={legend}>
      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
        {options.map((option) => {
          const active = option.id === value;
          return (
            <button
              aria-controls={controls}
              aria-label={option.accessibleLabel}
              aria-pressed={active}
              className={cn(
                "flex min-h-11 cursor-pointer items-baseline gap-2 border-b-2 pb-1 transition-colors duration-200",
                active
                  ? "border-accent text-ink"
                  : "border-transparent text-ink-muted hover:border-border-strong hover:text-ink",
              )}
              key={option.id}
              onClick={() => onSelect(option.id)}
              type="button"
            >
              <H4 as="span">{option.label}</H4>
            </button>
          );
        })}
      </div>
    </FilterGroup>
  );
}

export function PillFilter<T extends string>({
  className,
  controls,
  legend,
  onSelect,
  options,
  value,
}: FilterProps<T>) {
  return (
    <FilterGroup className={className} legend={legend}>
      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
        {options.map((option) => {
          const active = option.id === value;
          return (
            <button
              aria-controls={controls}
              aria-label={option.accessibleLabel}
              aria-pressed={active}
              className={cn(
                "flex min-h-11 cursor-pointer items-center gap-2 transition-colors duration-200",
                active ? "text-ink" : "text-ink-muted hover:text-ink",
              )}
              key={option.id}
              onClick={() => onSelect(option.id)}
              type="button"
            >
              <span
                aria-hidden="true"
                className={cn(
                  "size-1.5 rounded-full border transition-colors duration-200",
                  active
                    ? "border-accent bg-accent"
                    : "border-border-strong bg-transparent",
                )}
              />
              <span className="font-body text-xs tracking-widest uppercase">
                {option.label}
              </span>
            </button>
          );
        })}
      </div>
    </FilterGroup>
  );
}
