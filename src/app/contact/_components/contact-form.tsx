"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { Route } from "next";
import Link from "next/link";
import type { FocusEvent, FormEvent, ReactNode } from "react";
import { useId, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { H5, P } from "@/components/ui/typography";
import { ArrowUpRightIcon } from "@/lib/icons";
import { type ContactFormData, contactSchema } from "@/lib/schema";
import { cn } from "@/lib/utils";
import { contactCopy } from "./contact-copy";

const FIELDS = ["name", "email", "phone", "topic", "message"] as const;

type FieldName = (typeof FIELDS)[number];
type FormControl = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

const controlStyles = "font-body text-base text-ink placeholder:text-ink-muted";
const labelStyles = "block font-body text-sm font-medium text-ink";
const errorStyles = "mt-2 font-body text-sm text-accent";

function isFormControl(node: unknown): node is FormControl {
  return (
    node instanceof HTMLInputElement ||
    node instanceof HTMLSelectElement ||
    node instanceof HTMLTextAreaElement
  );
}

function controlOf(form: HTMLFormElement, name: FieldName): FormControl | null {
  const node = form.elements.namedItem(name);
  return isFormControl(node) ? node : null;
}

function draftHref(email: string, values: ContactFormData): string {
  const read = (name: FieldName) => values[name].trim();
  const phone = read("phone");
  const topic = read("topic");

  const body = [
    `Name: ${read("name")}`,
    `Email: ${read("email")}`,
    phone === "" ? null : `Phone: ${phone}`,
    `Subject: ${topic}`,
    "",
    read("message"),
  ]
    .filter((line) => line !== null)
    .join("\r\n")
    .replace(/\r?\n/g, "\r\n");

  const subject = `${contactCopy.form.subjectPrefix} — ${topic}`;

  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function Field({
  children,
  className,
  error,
  htmlFor,
  label,
}: {
  children: ReactNode;
  className?: string;
  error: string | undefined;
  htmlFor: string;
  label: string;
}) {
  return (
    <div className={className}>
      <label className={labelStyles} htmlFor={htmlFor}>
        {label}
      </label>
      <div className="mt-2">{children}</div>
      {error === undefined ? null : (
        <p className={errorStyles} id={`${htmlFor}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm({
  email,
  topics,
}: {
  email: string;
  topics: readonly string[];
}) {
  const uid = useId();
  const [attempted, setAttempted] = useState(false);
  const [draft, setDraft] = useState<string | null>(null);
  const copy = contactCopy.form;
  const {
    control,
    register,
    trigger,
    getValues,
    getFieldState,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      topic: "",
      message: "",
    },
  });

  const fieldId = (name: FieldName) => `${uid}-${name}`;
  const errorOf = (name: FieldName) => errors[name]?.message;
  const describedBy = (name: FieldName) =>
    errorOf(name) === undefined ? undefined : `${fieldId(name)}-error`;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setAttempted(true);

    const valid = await trigger();
    if (!valid) {
      setDraft(null);
      const firstInvalid = FIELDS.find(
        (name) => getFieldState(name).error !== undefined,
      );
      if (firstInvalid !== undefined) {
        controlOf(form, firstInvalid)?.focus();
      }
      return;
    }

    const href = draftHref(email, getValues());
    setDraft(href);
    window.location.href = href;
  }

  function handleBlur(event: FocusEvent<HTMLFormElement>) {
    if (!attempted) return;
    const control = event.target;
    if (!isFormControl(control)) return;
    const name = FIELDS.find((field) => field === control.name);
    if (name === undefined) return;
    void trigger(name);
  }

  return (
    <div>
      {draft === null ? null : (
        <div
          className="mb-10 rounded-xl border border-accent p-6"
          role="status"
        >
          <H5 as="p">{copy.draftHeading}</H5>
          <P className="mt-2">{copy.draftBody(email)}</P>
          <Link
            className={cn(
              buttonVariants({ size: "md", variant: "link" }),
              "mt-4",
            )}
            href={draft as Route}
          >
            {copy.draftAction}
            <Icon icon={ArrowUpRightIcon} />
          </Link>
        </div>
      )}

      <form
        className="grid gap-6 sm:grid-cols-2"
        noValidate
        onBlur={handleBlur}
        onSubmit={handleSubmit}
      >
        <Field
          error={errorOf("name")}
          htmlFor={fieldId("name")}
          label={copy.labels.name}
        >
          <Input
            aria-describedby={describedBy("name")}
            aria-invalid={errors.name !== undefined}
            autoComplete="name"
            className={controlStyles}
            id={fieldId("name")}
            required
            type="text"
            {...register("name")}
          />
        </Field>

        <Field
          error={errorOf("email")}
          htmlFor={fieldId("email")}
          label={copy.labels.email}
        >
          <Input
            aria-describedby={describedBy("email")}
            aria-invalid={errors.email !== undefined}
            autoComplete="email"
            className={controlStyles}
            id={fieldId("email")}
            required
            type="email"
            {...register("email")}
          />
        </Field>

        <Field
          error={errorOf("phone")}
          htmlFor={fieldId("phone")}
          label={copy.labels.phone}
        >
          <Input
            aria-describedby={describedBy("phone")}
            aria-invalid={errors.phone !== undefined}
            autoComplete="tel"
            className={controlStyles}
            id={fieldId("phone")}
            type="tel"
            {...register("phone")}
          />
        </Field>

        <Field
          error={errorOf("topic")}
          htmlFor={fieldId("topic")}
          label={copy.labels.topic}
        >
          <Controller
            control={control}
            name="topic"
            render={({ field }) => (
              <Select
                name="topic"
                required
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger
                  id={fieldId("topic")}
                  aria-describedby={describedBy("topic")}
                  aria-invalid={errors.topic !== undefined}
                  className={controlStyles}
                >
                  <SelectValue placeholder={copy.topicPlaceholder} />
                </SelectTrigger>
                <SelectContent>
                  {topics.map((topic) => (
                    <SelectItem key={topic} value={topic}>
                      {topic}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </Field>

        <Field
          className="sm:col-span-2"
          error={errorOf("message")}
          htmlFor={fieldId("message")}
          label={copy.labels.message}
        >
          <Textarea
            aria-describedby={describedBy("message")}
            aria-invalid={errors.message !== undefined}
            className={cn(controlStyles, "resize-y")}
            id={fieldId("message")}
            maxLength={2000}
            required
            rows={6}
            {...register("message")}
          />
        </Field>

        <div className="flex flex-col items-start gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
          <button
            className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}
            type="submit"
          >
            {copy.submit}
            <Icon icon={ArrowUpRightIcon} />
          </button>
          <p className="font-body text-sm text-ink-muted">
            {copy.directPrompt}{" "}
            <Link
              className={cn(buttonVariants({ size: "sm", variant: "link" }))}
              href={`mailto:${email}` as Route}
            >
              {email}
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
