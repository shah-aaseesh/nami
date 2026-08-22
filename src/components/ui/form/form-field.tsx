"use client";

import * as React from "react";
import {
  type Control,
  Controller,
  type ControllerRenderProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export type FormFieldIds = {
  readonly control: string;
  readonly label: string;
  readonly description: string;
  readonly message: string;
};

type FormFieldState = {
  readonly ids: FormFieldIds;
  readonly invalid: boolean;
  readonly error: string | undefined;
};

const FormFieldContext = React.createContext<FormFieldState | null>(null);

function useFormFieldState(): FormFieldState {
  const state = React.useContext(FormFieldContext);
  if (!state) {
    throw new Error("Form parts must be rendered inside a <FormField>.");
  }
  return state;
}

export function describedBy(
  ids: FormFieldIds,
  parts: { readonly description: boolean; readonly invalid: boolean },
): string | undefined {
  const tokens: string[] = [];
  if (parts.description) tokens.push(ids.description);
  if (parts.invalid) tokens.push(ids.message);
  return tokens.length > 0 ? tokens.join(" ") : undefined;
}

const RESERVED_ARIA = [
  "aria-invalid",
  "aria-describedby",
  "aria-labelledby",
] as const;

export type ReservedAria = {
  "aria-invalid"?: never;
  "aria-describedby"?: never;
  "aria-labelledby"?: never;
};

export function withoutReservedAria<T extends object>(props: T): T {
  const next = { ...props } as Record<string, unknown>;
  for (const key of RESERVED_ARIA) delete next[key];
  return next as T;
}

export function FormField<T extends FieldValues>({
  control,
  name,
  render,
}: {
  control: Control<T>;
  name: FieldPath<T>;
  render: (arg: {
    field: ControllerRenderProps<T, FieldPath<T>>;
    ids: FormFieldIds;
    invalid: boolean;
  }) => React.ReactNode;
}) {
  const uid = React.useId();
  const ids = React.useMemo<FormFieldIds>(
    () => ({
      control: `${uid}-control`,
      label: `${uid}-label`,
      description: `${uid}-description`,
      message: `${uid}-message`,
    }),
    [uid],
  );

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormFieldContext.Provider
          value={{
            ids,
            invalid: fieldState.invalid,
            error: fieldState.error?.message,
          }}
        >
          {render({ field, ids, invalid: fieldState.invalid })}
        </FormFieldContext.Provider>
      )}
    />
  );
}

export function FormItem({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="form-item"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
}

export function RequiredMarker() {
  return (
    <>
      <span aria-hidden="true" className="ml-0.5 text-accent">
        *
      </span>
      <span className="sr-only"> (required)</span>
    </>
  );
}

export function FormLabel({
  className,
  children,
  required,
  ...props
}: React.ComponentProps<typeof Label> & { required?: boolean }) {
  const { ids } = useFormFieldState();
  return (
    <Label className={className} {...props} id={ids.label}>
      {children}
      {required ? <RequiredMarker /> : null}
    </Label>
  );
}

export function FormDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  const { ids } = useFormFieldState();
  return (
    <p
      data-slot="form-description"
      className={cn("font-body text-xs text-ink-muted", className)}
      {...props}
      id={ids.description}
    />
  );
}

export function FormMessage({
  className,
  ...props
}: React.ComponentProps<"p">) {
  const { ids, error } = useFormFieldState();
  if (!error) return null;
  return (
    <p
      data-slot="form-message"
      className={cn("font-body text-sm text-accent", className)}
      {...props}
      id={ids.message}
    >
      {error}
    </p>
  );
}
