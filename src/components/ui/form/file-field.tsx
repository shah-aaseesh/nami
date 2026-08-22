"use client";

import type * as React from "react";
import type { Control, FieldPath, FieldValues } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  describedBy,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  type ReservedAria,
  withoutReservedAria,
} from "./form-field";

type OwnProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  description?: string;
  required?: boolean;
};

export type FileFieldProps<T extends FieldValues> = OwnProps<T> &
  Omit<
    React.ComponentProps<"input">,
    | keyof OwnProps<T>
    | "id"
    | "type"
    | "value"
    | "defaultValue"
    | "onChange"
    | "onBlur"
  > &
  ReservedAria;

export function FileField<T extends FieldValues>({
  control,
  name,
  label,
  description,
  required,
  className,
  ...inputProps
}: FileFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, ids, invalid }) => (
        <FormItem>
          <FormLabel htmlFor={ids.control} required={required}>
            {label}
          </FormLabel>
          {description ? (
            <FormDescription>{description}</FormDescription>
          ) : null}
          <Input
            type="file"
            className={cn("aria-invalid:border-accent", className)}
            {...withoutReservedAria(inputProps)}
            name={field.name}
            ref={field.ref}
            onBlur={field.onBlur}
            onChange={(event) => {
              field.onChange(event.target.files?.[0] ?? null);
              field.onBlur();
            }}
            id={ids.control}
            required={required}
            aria-invalid={invalid}
            aria-describedby={describedBy(ids, {
              description: Boolean(description),
              invalid,
            })}
          />
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
