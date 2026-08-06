import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { H5, P } from "@/components/ui/typography";
import type { ContentImage } from "@/lib/content";
import { cn } from "@/lib/utils";

export type LevelPanel = {
  readonly id: string;
  readonly title: string;
  readonly stage: string;
  readonly lead: string | null;
  readonly campus: string | null;
  readonly image: ContentImage | null;
};

export function AcademicLevelsSequence({
  className,
  panels,
}: {
  className?: string;
  panels: readonly LevelPanel[];
}) {
  return (
    <Reveal className={className} stagger={0.12}>
      <ol className="grid gap-x-8 gap-y-14 sm:grid-cols-2">
        {panels.map((panel, index) => (
          <li
            className={cn("flex flex-col", index % 2 === 1 && "sm:mt-20")}
            data-reveal-item=""
            key={panel.id}
          >
            {panel.image === null ? null : (
              <figure className="relative aspect-[3/2] overflow-hidden xl:aspect-[4/3]">
                <Image
                  alt={panel.image.alt}
                  className="h-full w-full object-cover"
                  height={panel.image.height}
                  sizes="(min-width: 1280px) 25vw, (min-width: 640px) 45vw, 100vw"
                  src={panel.image.src}
                  width={panel.image.width}
                />
                <div className="absolute inset-0 bg-linear-to-t from-surface via-surface/55 to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-5 lg:p-6">
                  <H5 as="h3">{panel.title}</H5>
                  <span className="font-body text-sm text-ink-muted">
                    {panel.stage}
                  </span>
                </figcaption>
              </figure>
            )}

            <div className="mt-6 flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <span className="font-display text-sm font-semibold tracking-widest text-accent tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="h-px flex-1 bg-border" />
                {panel.campus === null ? null : (
                  <span className="font-body text-sm text-ink-muted">
                    {panel.campus}
                  </span>
                )}
              </div>

              {panel.lead === null ? null : (
                <P className="text-sm">{panel.lead}</P>
              )}
            </div>
          </li>
        ))}
      </ol>
    </Reveal>
  );
}
