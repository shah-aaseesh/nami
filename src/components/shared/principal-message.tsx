import Image from "next/image";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { Icon } from "@/components/ui/icon";
import { H6, P } from "@/components/ui/typography";
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
  id,
  message,
  person,
}: PrincipalMessageProps) {
  const letter = paragraphsOf(message);

  return (
    <section className="gutter-x section-y" id={id}>
      <div className="mx-auto max-w-page">
        <Reveal className="flex flex-col gap-4">
          <H6
            as="p"
            className="text-accent tracking-widest uppercase font-body"
          >
            {eyebrow}
          </H6>

          <span className="block h-1 w-16 rounded-full bg-accent" />
        </Reveal>

        <div className="mt-8 sm:mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-x-10 items-start">
          <Reveal
            className="space-y-5 lg:col-span-8 xl:col-span-9"
            stagger={0.1}
          >
            {letter.map((paragraph, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: message is a static, never-reordered paragraph list; text isn't unique across callers
              <RevealItem key={index}>
                <P className="lg:text-justify">{paragraph}</P>
              </RevealItem>
            ))}
          </Reveal>

          <div className="mx-auto w-full max-w-xs lg:col-span-4 xl:col-span-3 lg:mx-0 lg:max-w-none">
            <Reveal>
              <PortraitCard person={person} />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
