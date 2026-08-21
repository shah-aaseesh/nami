"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { Route } from "next";
import Link from "next/link";
import type { FocusEvent, FormEvent } from "react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { buttonVariants } from "@/components/ui/button";
import { SelectField, TextareaField, TextField } from "@/components/ui/form";
import { Icon } from "@/components/ui/icon";
import { H5, P } from "@/components/ui/typography";
import { ArrowUpRightIcon } from "@/lib/icons";
import { type ContactFormData, contactSchema } from "@/lib/schema";
import { cn } from "@/lib/utils";
import { contactCopy } from "./contact-copy";

const FIELDS = ["name", "email", "phone", "topic", "message"] as const;

type FieldName = (typeof FIELDS)[number];
type FormControl = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

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

export function ContactForm({
  email,
  topics,
}: {
  email: string;
  topics: readonly string[];
}) {
  const [attempted, setAttempted] = useState(false);
  const [draft, setDraft] = useState<string | null>(null);
  const copy = contactCopy.form;
  const topicOptions = useMemo(
    () => topics.map((topic) => ({ value: topic, label: topic })),
    [topics],
  );
  const { control, trigger, getValues, getFieldState } =
    useForm<ContactFormData>({
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
        <TextField
          autoComplete="name"
          className="font-body text-base text-ink placeholder:text-ink-muted"
          control={control}
          label={copy.labels.name}
          name="name"
          required
          type="text"
        />

        <TextField
          autoComplete="email"
          className="font-body text-base text-ink placeholder:text-ink-muted"
          control={control}
          label={copy.labels.email}
          name="email"
          required
          type="email"
        />

        <TextField
          autoComplete="tel"
          className="font-body text-base text-ink placeholder:text-ink-muted"
          control={control}
          label={copy.labels.phone}
          name="phone"
          type="tel"
        />

        <SelectField
          className="font-body text-base text-ink"
          control={control}
          label={copy.labels.topic}
          name="topic"
          options={topicOptions}
          placeholder={copy.topicPlaceholder}
          required
        />

        <div className="sm:col-span-2">
          <TextareaField
            className="font-body text-base text-ink resize-y placeholder:text-ink-muted"
            control={control}
            label={copy.labels.message}
            maxLength={2000}
            name="message"
            required
            rows={6}
          />
        </div>

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
