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
  const emailId = useId();

  return (
    <section aria-labelledby={headingId} className="relative gutter-x">
      <div
        aria-hidden="true"
        className="field-brand absolute inset-x-0 top-1/2 bottom-0"
      />

      <Reveal className="relative mx-auto max-w-page">
        <div className="field-ink flex flex-col items-start justify-between gap-y-8 rounded-xl px-8 py-12 sm:px-12 lg:min-h-50 lg:flex-row lg:items-center lg:gap-x-16 lg:px-20 lg:py-0">
          <div className="max-w-xl">
            <H3 as="h2" id={headingId}>
              {heading}
            </H3>
            <P className="mt-3">{standfirst}</P>
          </div>

          <div className="w-full max-w-md lg:min-w-xs">
            <Label className="sr-only" htmlFor={emailId}>
              Email address
            </Label>

            <div className="flex flex-col gap-3 md:flex-row md:items-center">
              <Input
                autoComplete="email"
                className="min-w-0 border-input bg-transparent md:flex-1"
                id={emailId}
                name="email"
                placeholder="you@example.com"
                type="email"
              />

              <Button size="lg">
                Subscribe
                <Icon icon={ArrowUpRightIcon} />
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
