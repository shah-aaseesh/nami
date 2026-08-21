"use client";

import type { Control, FieldPath, FieldValues } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  describedBy,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form-field";

export type SelectFieldOption = {
  readonly value: string;
  readonly label: string;
};

export type SelectFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  options: readonly SelectFieldOption[];
  placeholder?: string;
  description?: string;
  className?: string;
  required?: boolean;
  onValueChange?: (value: string) => void;
};

export function SelectField<T extends FieldValues>({
  control,
  name,
  label,
  options,
  placeholder,
  description,
  className,
  required,
  onValueChange,
}: SelectFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, ids, invalid }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          {description ? (
            <FormDescription>{description}</FormDescription>
          ) : null}
          <Select
            items={options}
            name={field.name}
            required={required}
            value={typeof field.value === "string" ? field.value : ""}
            onValueChange={(value) => {
              const next = typeof value === "string" ? value : "";
              field.onChange(next);
              onValueChange?.(next);
              field.onBlur();
            }}
          >
            <SelectTrigger
              id={ids.control}
              aria-labelledby={`${ids.label} ${ids.control}`}
              aria-invalid={invalid}
              aria-describedby={describedBy(ids, {
                description: Boolean(description),
                invalid,
              })}
              className={cn("aria-invalid:border-accent", className)}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
