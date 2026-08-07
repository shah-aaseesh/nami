"use client";

import type { Route } from "next";
import Link from "next/link";
import type { FocusEvent, FormEvent, ReactNode } from "react";
import { useId, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { H5, P } from "@/components/ui/typography";
import { ArrowUpRightIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { contactCopy } from "./contact-copy";

const FIELDS = ["name", "email", "phone", "topic", "message"] as const;

type FieldName = (typeof FIELDS)[number];
type FieldErrors = Partial<Record<FieldName, string>>;
type FormControl = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

const controlStyles =
  "w-full rounded-sm border border-input bg-surface-raised px-4 py-3 font-body text-base text-ink placeholder:text-ink-muted";
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

function draftHref(email: string, form: HTMLFormElement): string {
  const data = new FormData(form);
  const read = (name: FieldName) => String(data.get(name) ?? "").trim();
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
  const [errors, setErrors] = useState<FieldErrors>({});
  const [attempted, setAttempted] = useState(false);
  const [draft, setDraft] = useState<string | null>(null);
  const copy = contactCopy.form;

  const fieldId = (name: FieldName) => `${uid}-${name}`;
  const describedBy = (name: FieldName) =>
    errors[name] === undefined ? undefined : `${fieldId(name)}-error`;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setAttempted(true);

    const next: FieldErrors = {};
    for (const name of FIELDS) {
      const control = controlOf(form, name);
      if (control !== null && !control.checkValidity()) {
        next[name] = control.validationMessage;
      }
    }
    setErrors(next);

    const firstInvalid = FIELDS.find((name) => next[name] !== undefined);
    if (firstInvalid !== undefined) {
      setDraft(null);
      controlOf(form, firstInvalid)?.focus();
      return;
    }

    const href = draftHref(email, form);
    setDraft(href);
    window.location.href = href;
  }

  function handleBlur(event: FocusEvent<HTMLFormElement>) {
    if (!attempted) return;
    const control = event.target;
    if (!isFormControl(control)) return;
    const name = FIELDS.find((field) => field === control.name);
    if (name === undefined) return;

    setErrors((current) => ({
      ...current,
      [name]: control.checkValidity() ? undefined : control.validationMessage,
    }));
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
          error={errors.name}
          htmlFor={fieldId("name")}
          label={copy.labels.name}
        >
          <input
            aria-describedby={describedBy("name")}
            aria-invalid={errors.name !== undefined}
            autoComplete="name"
            className={controlStyles}
            id={fieldId("name")}
            name="name"
            required
            type="text"
          />
        </Field>

        <Field
          error={errors.email}
          htmlFor={fieldId("email")}
          label={copy.labels.email}
        >
          <input
            aria-describedby={describedBy("email")}
            aria-invalid={errors.email !== undefined}
            autoComplete="email"
            className={controlStyles}
            id={fieldId("email")}
            name="email"
            required
            type="email"
          />
        </Field>

        <Field
          error={errors.phone}
          htmlFor={fieldId("phone")}
          label={copy.labels.phone}
        >
          <input
            aria-describedby={describedBy("phone")}
            aria-invalid={errors.phone !== undefined}
            autoComplete="tel"
            className={controlStyles}
            id={fieldId("phone")}
            name="phone"
            type="tel"
          />
        </Field>

        <Field
          error={errors.topic}
          htmlFor={fieldId("topic")}
          label={copy.labels.topic}
        >
          <select
            aria-describedby={describedBy("topic")}
            aria-invalid={errors.topic !== undefined}
            className={controlStyles}
            defaultValue=""
            id={fieldId("topic")}
            name="topic"
            required
          >
            <option disabled value="">
              {copy.topicPlaceholder}
            </option>
            {topics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </Field>

        <Field
          className="sm:col-span-2"
          error={errors.message}
          htmlFor={fieldId("message")}
          label={copy.labels.message}
        >
          <textarea
            aria-describedby={describedBy("message")}
            aria-invalid={errors.message !== undefined}
            className={cn(controlStyles, "resize-y")}
            id={fieldId("message")}
            maxLength={2000}
            name="message"
            required
            rows={6}
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
