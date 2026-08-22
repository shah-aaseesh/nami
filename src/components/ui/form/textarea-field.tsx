"use client";

import type * as React from "react";
import type { Control, FieldPath, FieldValues } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
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

export type TextareaFieldProps<T extends FieldValues> = OwnProps<T> &
  Omit<
    React.ComponentProps<"textarea">,
    keyof OwnProps<T> | "id" | "value" | "defaultValue" | "onChange" | "onBlur"
  > &
  ReservedAria;

export function TextareaField<T extends FieldValues>({
  control,
  name,
  label,
  description,
  required,
  className,
  ...textareaProps
}: TextareaFieldProps<T>) {
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
          <Textarea
            className={cn("aria-invalid:border-accent", className)}
            {...withoutReservedAria(textareaProps)}
            {...field}
            value={typeof field.value === "string" ? field.value : ""}
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
