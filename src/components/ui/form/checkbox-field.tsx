"use client";

import type { Control, FieldPath, FieldValues } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import {
  describedBy,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form-field";

export type CheckboxFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  description?: string;
  className?: string;
};

export function CheckboxField<T extends FieldValues>({
  control,
  name,
  label,
  description,
  className,
}: CheckboxFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, ids, invalid }) => (
        <FormItem className={cn("flex-row items-start gap-3", className)}>
          <Checkbox
            id={ids.control}
            className="aria-invalid:border-accent"
            checked={field.value === true}
            onCheckedChange={(checked) => {
              field.onChange(checked === true);
              field.onBlur();
            }}
            aria-invalid={invalid}
            aria-describedby={describedBy(ids, {
              description: Boolean(description),
              invalid,
            })}
          />
          <div className="flex flex-col gap-1">
            <FormLabel
              htmlFor={ids.control}
              className="leading-snug cursor-pointer font-normal"
            >
              {label}
            </FormLabel>
            {description ? (
              <FormDescription>{description}</FormDescription>
            ) : null}
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
}
