import Image from "next/image";
import { RevealItem } from "@/components/motion/reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { Icon } from "@/components/ui/icon";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/components/ui/tabs";
import { H6, P } from "@/components/ui/typography";
import type { ContentImage } from "@/lib/content";
import { CheckIcon } from "@/lib/icons";

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
  readonly eyebrow: string;
  readonly heading: string;
  readonly standfirst: string;
  readonly primary: SchoolBand;
  readonly secondary: SchoolBand;
  readonly photo: ContentImage;
};

function BandContent({ band }: { readonly band: SchoolBand }) {
  return (
    <div>
      <P className="max-w-2xl text-ink-muted leading-relaxed">{band.body}</P>

      {band.notes.length === 0 ? null : (
        <ul className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2">
          {band.notes.map((note) => (
            <li
              className="flex items-start gap-3 font-body text-sm text-ink-muted"
              key={note}
            >
              <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-surface-raised">
                <Icon className="size-3 text-accent" icon={CheckIcon} />
              </div>
              <span className="leading-snug">{note}</span>
            </li>
          ))}
        </ul>
      )}

      {band.streams.length === 0 ? null : (
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {band.streams.map((stream) => (
            <div
              className="rounded-2xl bg-surface-raised p-6 lg:p-8"
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
              <H6 as="h4" className="text-ink">
                {stream.name}
              </H6>
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
    <section className="gutter-x section-y" id={id}>
      <div className="mx-auto max-w-page">
        <SectionHeader
          description={copy.standfirst}
          eyebrow={copy.heading}
          layout="split"
          title={copy.eyebrow ?? "Academic Bands"}
        />

        <RevealItem className="mt-14 lg:mt-20">
          <Tabs defaultValue="primary" className="w-full">
            <TabsList className="mb-10">
              <TabsTab value="primary" className="text-base sm:text-lg">
                {copy.primary.label}
              </TabsTab>
              <TabsTab value="secondary" className="text-base sm:text-lg">
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
