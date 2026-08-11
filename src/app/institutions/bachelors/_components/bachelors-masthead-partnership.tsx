import { Icon } from "@/components/ui/icon";
import { Eyebrow } from "@/components/ui/typography";
import type { Campus, NamedEntity } from "@/lib/content";
import { ArrowRightIcon } from "@/lib/icons";
import type {
  BachelorsMastheadCopy,
  BachelorsPartnership,
} from "./bachelors-copy";

export function BachelorsMastheadPartnership({
  campus,
  copy,
  entity,
  partnership,
}: {
  readonly campus: Campus | null;
  readonly copy: BachelorsMastheadCopy;
  readonly entity: NamedEntity;
  readonly partnership: BachelorsPartnership | null;
}) {
  if (partnership === null || campus === null) return null;

  return (
    <section className="bleed-x mt-14 lg:mt-20">
      <div className="gutter-x border-y border-border bg-surface-raised py-10 lg:py-14">
        <div className="mx-auto grid max-w-page gap-8 lg:grid-cols-12 lg:items-start lg:gap-x-10">
          <div className="lg:col-span-7">
            <Eyebrow>{copy.awardedLabel}</Eyebrow>
            <p className="mt-4 font-display text-3xl text-balance text-ink lg:text-4xl">
              {partnership.body}
            </p>
            <p className="mt-2 font-body text-sm text-pretty text-ink-muted">
              {`${copy.awardedPlace} · ${copy.sinceLabel} ${partnership.sinceYear}`}
            </p>

            {copy.incoming === null ? null : (
              <div className="mt-8 border-t border-border pt-5">
                <p className="font-display text-2xl text-balance text-ink lg:text-3xl">
                  {copy.incoming.body}
                </p>
                <p className="mt-2 font-body text-sm text-pretty text-ink-muted">
                  {copy.incoming.scope}
                </p>
                <Eyebrow className="mt-3">{copy.incoming.status}</Eyebrow>
              </div>
            )}
          </div>

          <div className="flex items-center lg:col-span-1 lg:justify-center">
            <Icon
              className="size-5 shrink-0 rotate-90 text-accent lg:rotate-0"
              icon={ArrowRightIcon}
            />
          </div>

          <div className="lg:col-span-4 lg:text-end">
            <Eyebrow>{copy.taughtLabel}</Eyebrow>
            <p className="mt-4 font-display text-3xl text-balance text-ink lg:text-4xl">
              {entity.shortName}
            </p>
            <p className="mt-2 font-body text-sm text-ink-muted">
              {`${campus.locality}, ${campus.city}`}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
