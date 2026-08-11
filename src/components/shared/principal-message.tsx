import Image from "next/image";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Eyebrow, P } from "@/components/ui/typography";
import type { ContentImage, RichText } from "@/lib/content";
import { paragraphsOf } from "@/lib/content";
import { cn } from "@/lib/utils";

export type PrincipalMessagePerson = {
  readonly name: string;
  readonly title: string;
  readonly portrait: ContentImage | null;
};

export type PrincipalMessageProps = {
  readonly eyebrow: string;
  readonly heading: string;
  readonly id?: string;
  readonly message: RichText;
  readonly person: PrincipalMessagePerson;
};

export function PrincipalMessage({
  eyebrow,
  heading,
  id,
  message,
  person,
}: PrincipalMessageProps) {
  const [salutation, ...letter] = paragraphsOf(message);
  const { portrait } = person;

  return (
    <section className="gutter-x section-y" id={id}>
      <div className="mx-auto max-w-page">
        <div className="flex flex-col gap-10 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-10">
          {portrait === null ? null : (
            <Reveal className="lg:col-span-4" y={24}>
              <Image
                alt={portrait.alt}
                className="h-auto w-full max-w-64 rounded-xl sm:max-w-72 lg:max-w-80"
                height={portrait.height}
                loading="lazy"
                sizes="(max-width: 639px) 256px, (max-width: 1023px) 288px, 320px"
                src={portrait.src}
                width={portrait.width}
              />
            </Reveal>
          )}

          <div
            className={cn(
              "flex flex-col gap-10",
              portrait === null
                ? "lg:col-span-9"
                : "lg:col-span-7 lg:col-start-6",
            )}
          >
            <div className="flex flex-col gap-4">
              <Reveal>
                <Eyebrow>{eyebrow}</Eyebrow>
              </Reveal>

              <SplitText
                as="h2"
                className="font-display text-5xl font-normal text-balance text-ink"
              >
                {heading}
              </SplitText>
            </div>

            <Reveal className="flex max-w-xl flex-col gap-10" stagger={0.1}>
              <div className="flex flex-col gap-6">
                {salutation === undefined ? null : (
                  <RevealItem>
                    <P className="text-lg text-ink">{salutation}</P>
                  </RevealItem>
                )}

                <RevealItem className="flex flex-col gap-5">
                  {letter.map((paragraph, index) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: message is a static, never-reordered paragraph list; text isn't unique across callers
                    <P key={index}>{paragraph}</P>
                  ))}
                </RevealItem>
              </div>

              <RevealItem className="flex flex-col gap-6">
                <span className="block h-px w-16 bg-accent" />

                <div className="flex flex-col gap-3">
                  <p className="font-display text-3xl text-ink">
                    {person.name}
                  </p>
                  <Eyebrow>{person.title}</Eyebrow>
                </div>
              </RevealItem>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
