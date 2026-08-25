import { Reveal } from "@/components/motion/reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { Eyebrow, H3, P } from "@/components/ui/typography";
import type { Campus } from "@/lib/content";
import { content } from "@/lib/content";
import { cn } from "@/lib/utils";
import { contactCopy } from "./contact-copy";

const MAP_ORIGIN = "https://www.google.com/maps";

function mapSrc(campus: Campus): string {
  const params = new URLSearchParams({
    q: `${campus.locality}, ${campus.city}, Nepal`,
    output: "embed",
    hl: "en",
    z: "14",
  });
  return `${MAP_ORIGIN}?${params.toString()}`;
}

function CampusEntry({ campus, index }: { campus: Campus; index: number }) {
  const copy = contactCopy.campuses;
  const flipped = index % 2 === 1;

  return (
    <li className="lg:grid lg:grid-cols-12 lg:gap-x-10" data-reveal-item="">
      <div
        className={cn(
          "border-t pt-6 lg:row-start-1 lg:col-span-4",
          flipped ? "lg:col-start-1" : "lg:col-start-9",
        )}
      >
        <Eyebrow as="span" className="block">
          {String(index + 1).padStart(2, "0")}
        </Eyebrow>
        <H3 className="mt-3">{campus.locality}</H3>
        <P className="mt-1">{campus.city}</P>

        {campus.hosts.length === 0 ? null : (
          <div className="mt-8">
            <Eyebrow className="text-ink-muted">{copy.hostsLabel}</Eyebrow>
            <ul className="mt-3 flex flex-col gap-y-2 font-body text-base text-ink">
              {campus.hosts.map((host) => (
                <li className="border-t pt-2" key={host}>
                  {host}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div
        className={cn(
          "mt-8 lg:row-start-1 lg:col-span-7 lg:mt-0",
          flipped ? "lg:col-start-6" : "lg:col-start-1",
        )}
      >
        <div className="overflow-hidden rounded-xl border">
          <iframe
            className="block aspect-4/3 h-auto w-full lg:aspect-video"
            height={600}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={mapSrc(campus)}
            title={copy.mapTitle(campus.locality, campus.city)}
            width={800}
          />
        </div>
        <p className="mt-3 font-body text-sm text-ink-muted">
          {copy.mapNote(campus.locality)}
        </p>
      </div>
    </li>
  );
}

export async function CampusLocations() {
  const institution = await content.getInstitution();
  const copy = contactCopy.campuses;

  if (institution.campuses.length === 0) return null;

  return (
    <section className="gutter-x section-y" id="campuses">
      <div className="mx-auto max-w-page">
        <SectionHeader
          eyebrow={copy.heading}
          title={copy.eyebrow ?? "Campuses"}
          description={copy.standfirst}
        />

        <Reveal className="mt-14 lg:mt-24" stagger={0.12}>
          <ul className="flex flex-col gap-y-12 sm:gap-y-16 lg:gap-y-28">
            {institution.campuses.map((campus, index) => (
              <CampusEntry campus={campus} index={index} key={campus.id} />
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
