import Image from "next/image";
import { Counter } from "@/components/motion/counter";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Eyebrow } from "@/components/ui/typography";
import type { ContentImage, SectionCopy, Stat } from "@/lib/content";

export function AboutStats({
  image,
  section,
  stats,
}: {
  image: ContentImage | null;
  section: SectionCopy;
  stats: readonly Stat[];
}) {
  const rows = stats.filter((stat) => stat.placement === "stats");

  if (rows.length === 0) return null;

  return (
    <section
      className="gutter-x pb-[var(--spacing-section-py)] pt-10 lg:pt-14"
      id="numbers"
    >
      <div className="mx-auto max-w-page">
        <div className="lg:grid lg:grid-cols-12 lg:items-end lg:gap-x-10">
          {image === null ? null : (
            <Reveal className="lg:col-span-6" y={48}>
              <div className="overflow-hidden rounded-3xl">
                <Image
                  alt={image.alt}
                  className="h-[36vh] w-full object-cover lg:h-[60vh]"
                  height={image.height}
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 720px"
                  src={image.src}
                  width={image.width}
                />
              </div>
            </Reveal>
          )}

          <div className="mt-10 lg:col-span-6 lg:col-start-7 lg:mt-0">
            {section.eyebrow === null ? null : (
              <Reveal>
                <Eyebrow>{section.eyebrow}</Eyebrow>
              </Reveal>
            )}
            <SplitText
              as="h2"
              className="mt-4 font-display text-3xl sm:text-4xl font-normal tracking-tight text-ink text-balance lg:text-5xl"
            >
              {section.heading}
            </SplitText>

            {section.standfirst === null ? null : (
              <Reveal className="mt-6">
                <p className="font-body text-lg text-pretty text-ink-muted">
                  {section.standfirst}
                </p>
              </Reveal>
            )}

            <Reveal
              className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8 sm:gap-x-8 sm:gap-y-10"
              stagger={0.1}
            >
              {rows.map((stat) => (
                <RevealItem key={stat.id}>
                  <p className="font-display text-4xl sm:text-5xl font-normal tracking-tight text-ink lg:text-6xl">
                    <Counter suffix={stat.suffix ?? ""} value={stat.value} />
                  </p>
                  <p className="mt-2 font-body text-sm text-ink-muted">
                    {stat.label}
                  </p>
                </RevealItem>
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
