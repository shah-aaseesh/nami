import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Eyebrow, P } from "@/components/ui/typography";
import { paragraphsOf, type RichText, type SectionCopy } from "@/lib/content";

function CreedCard({
  label,
  paragraphs,
}: {
  label: string;
  paragraphs: readonly string[];
}) {
  if (paragraphs.length === 0) return null;

  // Clean any wrapping or trailing/leading quotation marks so quotes aren't in the sentence
  const cleanParagraphs = paragraphs.map((paragraph) =>
    paragraph.trim().replace(/^["“]/, "").replace(/["”]$/, "")
  );

  return (
    <div className="group relative overflow-hidden flex h-full flex-col justify-between rounded-2xl sm:rounded-3xl border border-border/80 bg-surface-raised p-6 sm:p-8 lg:p-10 shadow-xs transition-all duration-300 hover:shadow-md hover:border-accent/40">
      {/* Big Decorative Red Double Quote Mark in Background (Left Aligned) */}
      <svg
        aria-hidden="true"
        className="pointer-events-none select-none absolute left-4 sm:left-6 top-3 sm:top-4 size-20 sm:size-28 lg:size-32 text-[#BD1B21]/10 transition-all duration-500 group-hover:text-[#BD1B21]/16 group-hover:scale-105"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
      </svg>

      <div className="relative z-10">
        <div>
          <Eyebrow as="h3" className="text-accent text-sm font-semibold tracking-wider uppercase">
            {label}
          </Eyebrow>
        </div>
        <div className="mt-5 sm:mt-6 flex flex-col gap-4">
          {cleanParagraphs.map((paragraph) => (
            <P
              className="text-base sm:text-lg lg:text-xl leading-relaxed text-ink/90 font-normal text-left"
              key={paragraph}
            >
              {paragraph}
            </P>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AboutCreed({
  mission,
  vision,
  section,
}: {
  mission: RichText;
  vision: RichText;
  section: SectionCopy;
}) {
  const missionParagraphs = paragraphsOf(mission);
  const visionParagraphs = paragraphsOf(vision);

  if (missionParagraphs.length === 0 && visionParagraphs.length === 0) {
    return null;
  }

  return (
    <section className="gutter-x section-y" id="creed">
      <div className="mx-auto max-w-page">
        {/* Section Heading */}
        <Reveal>
          <div className="flex items-center gap-5">
            <Eyebrow>{section.heading}</Eyebrow>
            <span className="h-px flex-1 bg-border" />
          </div>
        </Reveal>

        <div className="mt-4 sm:mt-5">
          <Reveal>
            <SplitText
              as="h2"
              className="font-display text-3xl sm:text-4xl text-accent font-normal"
            >
              {section.eyebrow ?? "Mission & Vision"}
            </SplitText>
          </Reveal>
        </div>

        {/* 2-Column Side-by-Side Cards: Left Mission & Right Vision */}
        <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          <Reveal className="h-full" y={16}>
            <CreedCard label="Mission" paragraphs={missionParagraphs} />
          </Reveal>

          <Reveal className="h-full" y={24}>
            <CreedCard label="Vision" paragraphs={visionParagraphs} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
