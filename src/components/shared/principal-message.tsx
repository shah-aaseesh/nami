import Image from "next/image";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Icon } from "@/components/ui/icon";
import { Eyebrow, P } from "@/components/ui/typography";
import type { ContentImage, RichText } from "@/lib/content";
import { paragraphsOf } from "@/lib/content";
import { ImageIcon } from "@/lib/icons";

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

function PortraitCard({ person }: { readonly person: PrincipalMessagePerson }) {
  const { portrait } = person;

  return (
    <figure className="mb-8 w-full sm:float-right sm:mb-6 sm:ml-10 sm:w-64 lg:w-72">
      <div className="overflow-hidden rounded-t-xl border border-border border-b-0 bg-surface-raised">
        {portrait === null ? (
          <div className="grid aspect-4/5 w-full place-items-center">
            <Icon className="size-8 text-ink-muted/50" icon={ImageIcon} />
          </div>
        ) : (
          <Image
            alt={portrait.alt}
            className="aspect-4/5 w-full object-cover"
            height={portrait.height}
            loading="lazy"
            sizes="(max-width: 639px) 100vw, (max-width: 1023px) 256px, 288px"
            src={portrait.src}
            width={portrait.width}
          />
        )}
      </div>

      <figcaption className="rounded-b-xl border border-border bg-surface px-4 py-3">
        <p className="font-body text-sm font-medium text-ink">{person.name}</p>
        <p className="mt-0.5 font-body text-xs text-accent">{person.title}</p>
      </figcaption>
    </figure>
  );
}

export function PrincipalMessage({
  eyebrow,
  heading,
  id,
  message,
  person,
}: PrincipalMessageProps) {
  const [salutation, ...letter] = paragraphsOf(message);

  return (
    <section className="gutter-x section-y" id={id}>
      <div className="mx-auto max-w-page">
        <Reveal className="flex flex-col gap-5">
          <Eyebrow>{eyebrow}</Eyebrow>

          <SplitText
            as="h2"
            className="max-w-4xl font-display text-4xl font-normal text-balance text-ink lg:text-5xl"
          >
            {heading}
          </SplitText>

          <span className="block h-1 w-16 rounded-full bg-accent" />
        </Reveal>

        <Reveal className="mt-8" stagger={0.1}>
          <RevealItem className="mt-10 block">
            <PortraitCard person={person} />

            <div className="flex flex-col gap-5">
              {letter.map((paragraph, index) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: message is a static, never-reordered paragraph list; text isn't unique across callers
                <P className="text-sm text-ink-muted lg:text-base" key={index}>
                  {paragraph}
                </P>
              ))}
            </div>
          </RevealItem>

          <RevealItem className="clear-both">
            <p className="font-display text-3xl text-ink italic lg:text-4xl">
              {person.name}
            </p>
          </RevealItem>
        </Reveal>
      </div>
    </section>
  );
}
