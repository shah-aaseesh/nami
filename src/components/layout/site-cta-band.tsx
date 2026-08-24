"use client";

import { useId } from "react";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { H3, P } from "@/components/ui/typography";
import { ArrowUpRightIcon } from "@/lib/icons";

export type SiteCtaBandProps = {
  heading: string;
  standfirst: string;
};

export function SiteCtaBand({ heading, standfirst }: SiteCtaBandProps) {
  const headingId = useId();
  const nameId = useId();
  const emailId = useId();

  return (
    <section aria-labelledby={headingId} className="relative gutter-x">
      <div
        aria-hidden="true"
        className="field-brand absolute inset-x-0 top-1/2 bottom-0"
      />

      <Reveal className="relative mx-auto max-w-page">
        <div className="field-ink flex flex-col items-start justify-between gap-y-8 rounded-xl px-8 py-10 sm:px-12 lg:min-h-52 lg:flex-row lg:items-center lg:gap-x-12 lg:px-16 lg:py-8">
          <div className="max-w-md lg:max-w-lg">
            <H3 as="h2" id={headingId}>
              {heading}
            </H3>
            <P className="mt-2 text-sm text-ink-muted">{standfirst}</P>
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="w-full max-w-xl"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="min-w-0 flex-1">
                <Label className="sr-only" htmlFor={nameId}>
                  Full name
                </Label>
                <Input
                  autoComplete="name"
                  className="w-full min-w-0 border-input bg-transparent"
                  id={nameId}
                  name="name"
                  placeholder="Your name"
                  type="text"
                />
              </div>

              <div className="min-w-0 flex-1">
                <Label className="sr-only" htmlFor={emailId}>
                  Email address
                </Label>
                <Input
                  autoComplete="email"
                  className="w-full min-w-0 border-input bg-transparent"
                  id={emailId}
                  name="email"
                  placeholder="you@example.com"
                  type="email"
                />
              </div>

              <Button size="lg" type="submit" className="shrink-0">
                <span>Subscribe</span>
                <Icon icon={ArrowUpRightIcon} />
              </Button>
            </div>
          </form>
        </div>
      </Reveal>
    </section>
  );
}
