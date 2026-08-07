"use client";

import { useEffect } from "react";
import type { Route } from "next";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Button } from "@/components/ui/button";
import { Eyebrow, P } from "@/components/ui/typography";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service in a real app
    console.error("Application error caught by error boundary:", error);
  }, [error]);

  return (
    <section className="gutter-x flex min-h-[70vh] flex-col items-center justify-center pb-24 pt-20 text-center lg:pb-32">
      <div className="mx-auto max-w-2xl">
        <Reveal>
          <Eyebrow className="text-accent">Application Error</Eyebrow>
        </Reveal>

        <SplitText
          as="h1"
          className="mt-6 font-display text-5xl font-normal tracking-tight text-ink lg:text-7xl"
        >
          Something went wrong
        </SplitText>

        <Reveal delay={0.2} y={30}>
          <P className="mx-auto mt-8 max-w-lg text-lg text-ink-muted">
            We apologize for the inconvenience. An unexpected error has occurred
            on this page.
          </P>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button onClick={() => reset()}>Try Again</Button>
            <Button variant="quiet" href={"/" as Route}>
              Return to Homepage
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
