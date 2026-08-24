import type { Route } from "next";
import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { Eyebrow, H5 } from "@/components/ui/typography";
import type { ContentImage, IsoDate, Update } from "@/lib/content";
import { CalendarIcon, LocationIcon } from "@/lib/icons";
import { institutionLabel } from "@/lib/institution-filter";
import { cn } from "@/lib/utils";
import { UpdatesCarousel } from "./updates-carousel";

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  timeZone: "UTC",
  year: "numeric",
});

function formatDate(value: IsoDate) {
  return dateFormat.format(new Date(value));
}

function UpdateRow({
  indexHref,
  item,
  ordinal,
  showInstitution,
}: {
  readonly indexHref: Route | null;
  readonly item: Update;
  readonly ordinal: number;
  readonly showInstitution: boolean;
}) {
  const alternate = ordinal % 2 === 1;
  const own =
    item.link !== null && item.link.destination !== "legacy" ? item.link : null;
  const href = indexHref === null ? null : ((own?.href ?? indexHref) as Route);
  const isExternal = own !== null && own.destination === "external";

  return (
    <li
      className={cn(
        "group relative grid gap-x-4 gap-y-4 border-b border-border px-5 py-6 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center sm:gap-x-8 sm:px-8 sm:py-8 lg:px-10 lg:py-9",
        alternate
          ? "bg-accent"
          : "bg-surface-raised before:absolute before:inset-0 before:origin-top before:scale-y-0 before:bg-accent before:transition-transform before:duration-300 hover:before:scale-y-100 has-[a:focus-visible]:before:scale-y-100",
      )}
      data-reveal-item=""
    >
      <p
        aria-hidden="true"
        className={cn(
          "relative text-outline font-display text-7xl leading-none transition-colors duration-300",
          alternate
            ? "text-accent-ink"
            : "text-neutral-400 group-hover:text-accent-ink group-has-[a:focus-visible]:text-accent-ink",
        )}
      >
        {String(ordinal + 1).padStart(2, "0")}
      </p>

      <div
        className={cn(
          "relative transition-colors duration-300 sm:border-l sm:pl-6",
          alternate
            ? "sm:border-white"
            : "sm:border-border sm:group-hover:border-white sm:group-has-[a:focus-visible]:border-white",
        )}
      >
        {showInstitution && item.institution !== null ? (
          <Eyebrow
            className={cn(
              "mb-2 transition-colors duration-300",
              alternate
                ? "text-accent-ink"
                : "text-ink-muted group-hover:text-accent-ink",
            )}
          >
            {institutionLabel[item.institution]}
          </Eyebrow>
        ) : null}

        <H5
          as="h3"
          className={cn(
            "line-clamp-2 transition-colors duration-300",
            alternate
              ? "text-accent-ink"
              : "group-hover:text-accent-ink group-has-[a:focus-visible]:text-accent-ink",
          )}
        >
          {href === null ? (
            item.title
          ) : (
            <Link
              className="after:absolute after:inset-0 focus-visible:outline-current"
              href={href}
              rel={isExternal ? "noopener noreferrer" : undefined}
              target={isExternal ? "_blank" : undefined}
            >
              {item.title}
            </Link>
          )}
        </H5>

        <div
          className={cn(
            "mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 font-body text-sm transition-colors duration-300",
            alternate
              ? "text-accent-ink"
              : "text-ink-muted group-hover:text-accent-ink group-has-[a:focus-visible]:text-accent-ink",
          )}
        >
          <span className="inline-flex items-center gap-2">
            <Icon className="size-4" icon={CalendarIcon} />
            <span className="sr-only">Published </span>
            <time dateTime={item.publishedAt}>
              {formatDate(item.publishedAt)}
            </time>
          </span>

          {item.venue === null ? null : (
            <span className="inline-flex items-center gap-2">
              <Icon className="size-4" icon={LocationIcon} />
              <span className="sr-only">Venue </span>
              {item.venue}
            </span>
          )}
        </div>
      </div>
    </li>
  );
}

export function UpdateBoard({
  indexHref = null,
  items,
  showInstitution = true,
}: {
  readonly indexHref?: Route | null;
  readonly items: readonly Update[];
  readonly showInstitution?: boolean;
}) {
  const slides = items
    .map((item) => item.image)
    .filter((image): image is ContentImage => image !== null)
    .filter(
      (image, index, all) =>
        all.findIndex((other) => other.src === image.src) === index,
    );

  return (
    <div className="grid gap-y-8 lg:grid-cols-12 lg:gap-y-0">
      <ul
        className={cn(
          "grid auto-rows-fr border-t border-border",
          slides.length === 0 ? "lg:col-span-12" : "lg:col-span-7",
        )}
      >
        {items.map((item, index) => (
          <UpdateRow
            indexHref={indexHref}
            item={item}
            key={item.id}
            ordinal={index}
            showInstitution={showInstitution}
          />
        ))}
      </ul>

      {slides.length === 0 ? null : (
        <div className="lg:col-span-5" data-reveal-item="">
          <UpdatesCarousel
            className="aspect-4/3 w-full lg:aspect-auto lg:h-full"
            images={slides}
          />
        </div>
      )}
    </div>
  );
}
