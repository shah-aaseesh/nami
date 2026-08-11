import { Reveal, RevealItem } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Eyebrow, Standfirst } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

export type SchoolVoice = {
  readonly quote: string;
  readonly attribution: string;
  readonly relation: string;
  readonly placeholder: boolean;
};

export type SchoolVoicesCopy = {
  readonly eyebrow: string;
  readonly heading: string;
  readonly standfirst: string;
  readonly placeholderLabel: string;
  readonly voices: readonly SchoolVoice[];
};

export function SchoolVoices({
  copy,
  id,
}: {
  readonly copy: SchoolVoicesCopy;
  readonly id?: string;
}) {
  if (copy.voices.length === 0) return null;

  return (
    <section className="gutter-x section-y" id={id}>
      <div className="mx-auto max-w-page">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-7">
            <Reveal className="flex items-center gap-5">
              <Eyebrow>{copy.eyebrow}</Eyebrow>
              <span className="h-px flex-1 bg-border" />
            </Reveal>

            <SplitText
              as="h2"
              className="mt-6 font-display text-5xl font-normal text-balance text-ink lg:mt-8"
            >
              {copy.heading}
            </SplitText>
          </div>

          <Reveal
            className="mt-8 lg:col-span-4 lg:col-start-9 lg:mt-0 lg:self-end"
            delay={0.2}
          >
            <Standfirst>{copy.standfirst}</Standfirst>
          </Reveal>
        </div>

        <Reveal
          className="mt-14 border-t border-border lg:mt-20"
          delay={0.25}
          stagger={0.1}
          y={28}
        >
          {copy.voices.map((voice, index) => (
            <RevealItem
              className="border-b border-border py-10 lg:py-14"
              key={voice.quote}
            >
              <figure
                className={cn(
                  "lg:max-w-4xl",
                  index % 2 === 1 && "lg:ml-auto lg:text-right",
                )}
              >
                {voice.placeholder ? (
                  <p className="font-body text-xs font-medium tracking-widest text-accent uppercase">
                    {copy.placeholderLabel}
                  </p>
                ) : null}

                <blockquote className={voice.placeholder ? "mt-6" : undefined}>
                  <p
                    className={cn(
                      "font-display text-3xl font-normal text-pretty lg:text-4xl",
                      voice.placeholder ? "text-ink-muted" : "text-ink",
                    )}
                  >
                    {voice.quote}
                  </p>
                </blockquote>

                <figcaption className="mt-8 font-body text-sm text-ink-muted">
                  <span className="text-ink">{voice.attribution}</span>
                  <span className="mx-2 text-border-strong">/</span>
                  {voice.relation}
                </figcaption>
              </figure>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
