import Image from "next/image";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Icon } from "@/components/ui/icon";
import { Eyebrow, P } from "@/components/ui/typography";
import type { ContentImage, RichText } from "@/lib/content";
import { paragraphsOf } from "@/lib/content";
import { ImageIcon } from "@/lib/icons";
import { PrincipalPortraitPin } from "./principal-portrait-pin";

export type PrincipalMessagePerson = {
  readonly name: string;
  readonly title: string;
  readonly portrait: ContentImage | null;
};

export type PrincipalMessageProps = {
  readonly eyebrow: string;
  readonly heading?: string;
  readonly id?: string;
  readonly message: RichText;
  readonly person: PrincipalMessagePerson;
};

function PortraitCard({ person }: { readonly person: PrincipalMessagePerson }) {
  const { portrait } = person;

  return (
    <figure className="w-full">
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
            sizes="(max-width: 1023px) 320px, 23vw"
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
  const letter = paragraphsOf(message);

  return (
    <section className="gutter-x section-y" id={id}>
      <div className="mx-auto max-w-page">
        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-10">
          <Reveal className="flex flex-col gap-5 lg:col-span-9 lg:row-start-1">
            <Eyebrow>{eyebrow}</Eyebrow>

            {heading === undefined ? null : (
              <SplitText as="h2" className="max-w-4xl">
                {heading}
              </SplitText>
            )}

            <span className="block h-1 w-16 rounded-full bg-accent" />
          </Reveal>

          <PrincipalPortraitPin className="mx-auto max-w-xs lg:col-span-3 lg:col-start-10 lg:row-start-1 lg:row-span-2 lg:mx-0 lg:max-w-none">
            <Reveal>
              <PortraitCard person={person} />
            </Reveal>
          </PrincipalPortraitPin>

          <Reveal
            className="space-y-5 lg:col-span-9 lg:row-start-2"
            stagger={0.1}
          >
            {letter.map((paragraph, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: message is a static, never-reordered paragraph list; text isn't unique across callers
              <RevealItem key={index}>
                <P className="lg:text-justify">{paragraph}</P>
              </RevealItem>
            ))}

            <RevealItem>
              <p className="font-display text-3xl text-ink italic lg:text-4xl">
                {person.name}
              </p>
            </RevealItem>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
