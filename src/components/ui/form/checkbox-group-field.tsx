"use client";

import type { Control, FieldPath, FieldValues } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  describedBy,
  FormDescription,
  FormField,
  FormMessage,
  RequiredMarker,
} from "./form-field";

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export type CheckboxGroupFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  legend: string;
  options: readonly string[];
  description?: string;
  required?: boolean;
  className?: string;
};

export function CheckboxGroupField<T extends FieldValues>({
  control,
  name,
  legend,
  options,
  description,
  required,
  className,
}: CheckboxGroupFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, ids, invalid }) => {
        const selected: readonly string[] = Array.isArray(field.value)
          ? field.value
          : [];
        return (
          <fieldset
            className="flex flex-col gap-3 pt-4"
            aria-describedby={describedBy(ids, {
              description: Boolean(description),
              invalid,
            })}
          >
            <legend
              id={ids.label}
              className="text-sm font-medium leading-none text-ink"
            >
              {legend}
              {required ? <RequiredMarker /> : null}
            </legend>
            {description ? (
              <FormDescription>{description}</FormDescription>
            ) : null}
            <div
              className={cn("grid grid-cols-2 md:grid-cols-3 gap-4", className)}
            >
              {options.map((option) => {
                const optionId = `${ids.control}-${slugify(option)}`;
                return (
                  <div key={option} className="flex items-center gap-2">
                    <Checkbox
                      id={optionId}
                      checked={selected.includes(option)}
                      onCheckedChange={(checked) => {
                        field.onChange(
                          checked === true
                            ? [...selected, option]
                            : selected.filter((entry) => entry !== option),
                        );
                        field.onBlur();
                      }}
                    />
                    <Label
                      htmlFor={optionId}
                      className="font-normal cursor-pointer leading-none"
                    >
                      {option}
                    </Label>
                  </div>
                );
              })}
            </div>
            <FormMessage />
          </fieldset>
        );
      }}
    />
  );
}
