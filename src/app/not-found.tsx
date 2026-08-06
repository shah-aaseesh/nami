import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Button } from "@/components/ui/button";
import { Eyebrow, P } from "@/components/ui/typography";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <section className="gutter-x flex min-h-[70vh] flex-col items-center justify-center pb-24 pt-20 text-center lg:pb-32">
      <div className="mx-auto max-w-2xl">
        <Reveal>
          <Eyebrow>Error 404</Eyebrow>
        </Reveal>

        <SplitText
          as="h1"
          className="mt-6 font-display text-7xl font-normal tracking-normal text-ink lg:text-9xl"
        >
          Page Not Found
        </SplitText>

        <Reveal delay={0.2} y={30}>
          <P className="mx-auto mt-8 max-w-lg text-lg text-ink-muted">
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </P>

          <div className="mt-10">
            <Button render={<Link href="/" />} nativeButton={false}>
              Return to Homepage
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
