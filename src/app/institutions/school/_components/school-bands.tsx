import Image from "next/image";
import { RevealItem } from "@/components/motion/reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { Icon } from "@/components/ui/icon";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/components/ui/tabs";
import { H6, P } from "@/components/ui/typography";
import type { ContentImage } from "@/lib/content";
import { CheckIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

export type SchoolStream = {
  readonly name: string;
  readonly note: string;
  readonly subjects: readonly string[];
  readonly photo?: ContentImage;
};

export type SchoolBand = {
  readonly label: string;
  readonly affiliationSlug: string;
  readonly sinceLabel: string;
  readonly enrolment: string | null;
  readonly body: string;
  readonly notes: readonly string[];
  readonly streams: readonly SchoolStream[];
};

export type SchoolBandsCopy = {
  readonly eyebrow?: string;
  readonly heading?: string;
  readonly standfirst?: string;
  readonly primary: SchoolBand;
  readonly secondary: SchoolBand;
  readonly photo?: ContentImage;
};

function BandContent({ band }: { readonly band: SchoolBand }) {
  return (
    <div>
      <P className="max-w-2xl text-ink-muted leading-relaxed">{band.body}</P>

      {band.notes.length === 0 ? null : (
        <ul className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2">
          {band.notes.map((note, idx) => (
            <li
              className="flex items-start gap-3 font-body text-sm text-ink-muted"
              key={note}
            >
              <div
                className={cn(
                  "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full shadow-xs",
                  idx % 2 === 0
                    ? "bg-[#9CC21A]/20 text-[#143D35]"
                    : "bg-[#FCD700]/30 text-[#BD1B21]",
                )}
              >
                <Icon className="size-3" icon={CheckIcon} />
              </div>
              <span className="leading-snug">{note}</span>
            </li>
          ))}
        </ul>
      )}

      {band.streams.length === 0 ? null : (
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {band.streams.map((stream, idx) => (
            <div
              className="rounded-2xl border border-border/70 bg-surface-raised p-6 lg:p-8 transition-shadow hover:shadow-lg"
              key={stream.name}
            >
              {stream.photo && (
                <div className="relative mb-6 aspect-video w-full overflow-hidden rounded-xl">
                  <Image
                    alt={stream.photo.alt}
                    className="object-cover"
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    src={stream.photo.src}
                  />
                </div>
              )}
              <div className="flex items-center gap-3">
                <H6 as="h4" className="text-ink font-semibold">
                  {stream.name}
                </H6>
                <span
                  className={cn(
                    "rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider",
                    idx === 0
                      ? "bg-[#BD1B21]/10 text-[#BD1B21] border border-[#BD1B21]/20"
                      : "bg-[#2BBCC6]/15 text-[#0E5C54] border border-[#2BBCC6]/30",
                  )}
                >
                  Stream
                </span>
              </div>
              <p className="mt-2 font-body text-sm text-ink-muted">
                {stream.note}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {stream.subjects.map((subject) => (
                  <span
                    className="rounded-full bg-surface px-3 py-1 font-body text-xs text-ink-muted ring-1 ring-border"
                    key={subject}
                  >
                    {subject}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function SchoolBands({
  copy,
  id,
}: {
  readonly copy: SchoolBandsCopy;
  readonly id?: string;
}) {
  return (
    <section
      className="gutter-x pt-6 sm:pt-8 lg:pt-12 pb-16 sm:pb-24 lg:pb-32"
      id={id}
    >
      <div className="mx-auto max-w-page">
        <SectionHeader
          description={copy.standfirst}
          eyebrow={copy.heading}
          layout="split"
          title={copy.eyebrow ?? "Academic Bands"}
        />

        <RevealItem className="mt-6 sm:mt-8 lg:mt-14">
          <Tabs defaultValue="primary" className="w-full">
            <TabsList className="mb-6 sm:mb-8 lg:mb-10 gap-8 sm:gap-12">
              <TabsTab
                value="primary"
                className="py-3.5 font-display text-xl sm:text-2xl lg:text-3xl font-medium text-ink-muted transition-all duration-200 hover:text-ink data-active:text-accent data-active:font-semibold"
              >
                {copy.primary.label}
              </TabsTab>
              <TabsTab
                value="secondary"
                className="py-3.5 font-display text-xl sm:text-2xl lg:text-3xl font-medium text-ink-muted transition-all duration-200 hover:text-ink data-active:text-accent data-active:font-semibold"
              >
                {copy.secondary.label}
              </TabsTab>
            </TabsList>

            <TabsPanel value="primary">
              <BandContent band={copy.primary} />
            </TabsPanel>

            <TabsPanel value="secondary">
              <BandContent band={copy.secondary} />
            </TabsPanel>
          </Tabs>
        </RevealItem>
      </div>
    </section>
  );
}
