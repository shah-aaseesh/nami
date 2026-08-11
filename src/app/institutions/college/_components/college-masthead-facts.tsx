import type { Campus, NamedEntity } from "@/lib/content";
import type { CollegeMastheadCopy } from "./college-copy";

export function CollegeMastheadFacts({
  campus,
  copy,
  entity,
}: {
  readonly campus: Campus | null;
  readonly copy: CollegeMastheadCopy;
  readonly entity: NamedEntity;
}) {
  const facts = [
    entity.establishedYear === null
      ? null
      : {
          label: copy.establishedLabel,
          value: String(entity.establishedYear),
        },
    { label: copy.statusLabel, value: copy.statusValue },
    campus === null
      ? null
      : {
          label: copy.campusLabel,
          value: `${campus.locality}, ${campus.city}`,
        },
  ].filter((fact) => fact !== null);

  return (
    <section className="gutter-x mt-12 mb-20 lg:mt-16 lg:mb-24">
      <div className="mx-auto max-w-page grid gap-x-10 gap-y-8 sm:grid-cols-3">
        {facts.map((fact) => (
          <div className="border-t border-border pt-6" key={fact.label}>
            <p className="font-body text-xs font-medium tracking-widest text-accent uppercase">
              {fact.label}
            </p>
            <p className="mt-3 font-display text-2xl text-ink">{fact.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
