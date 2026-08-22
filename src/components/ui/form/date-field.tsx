"use client";

import { format, isValid } from "date-fns";
import type * as React from "react";
import { useState } from "react";
import type { Control, FieldPath, FieldValues } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Icon } from "@/components/ui/icon";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import {
  describedBy,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form-field";

function toDate(value: unknown): Date | undefined {
  if (typeof value !== "string" || value === "") return undefined;
  const parsed = new Date(value);
  return isValid(parsed) ? parsed : undefined;
}

export type DateFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  description?: string;
  required?: boolean;
  className?: string;
  captionLayout?: React.ComponentProps<typeof Calendar>["captionLayout"];
  startMonth?: Date;
  endMonth?: Date;
};

export function DateField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder = "Pick a date",
  description,
  required,
  className,
  captionLayout = "dropdown",
  startMonth = new Date(new Date().getFullYear() - 100, 0, 1),
  endMonth = new Date(),
}: DateFieldProps<T>) {
  const [open, setOpen] = useState(false);
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, ids, invalid }) => {
        const selected = toDate(field.value);
        return (
          <FormItem>
            <FormLabel required={required}>{label}</FormLabel>
            {description ? (
              <FormDescription>{description}</FormDescription>
            ) : null}
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger
                render={
                  <Button
                    type="button"
                    id={ids.control}
                    aria-labelledby={`${ids.label} ${ids.control}`}
                    aria-invalid={invalid}
                    aria-describedby={describedBy(ids, {
                      description: Boolean(description),
                      invalid,
                    })}
                    className={cn(
                      "w-full h-12 bg-transparent border border-border hover:bg-muted justify-start text-left font-normal text-base text-ink px-4 py-2 shadow-none aria-invalid:border-accent",
                      !selected && "text-ink-muted",
                      className,
                    )}
                  >
                    <Icon icon={CalendarIcon} className="mr-2 h-4 w-4" />
                    {selected ? (
                      format(selected, "PPP")
                    ) : (
                      <span>{placeholder}</span>
                    )}
                  </Button>
                }
              />
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  captionLayout={captionLayout}
                  startMonth={startMonth}
                  endMonth={endMonth}
                  selected={selected}
                  onSelect={(date) => {
                    field.onChange(date ? date.toISOString() : null);
                    field.onBlur();
                    setOpen(false);
                  }}
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
