import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import type { NamedEntity, SocialProfile } from "@/lib/content";
import { cn } from "@/lib/utils";

const BADGE_RADIUS = 66;
const BADGE_ARC = `M 80,80 m 0,-${BADGE_RADIUS} a ${BADGE_RADIUS},${BADGE_RADIUS} 0 1,1 0,${BADGE_RADIUS * 2} a ${BADGE_RADIUS},${BADGE_RADIUS} 0 1,1 0,-${BADGE_RADIUS * 2}`;
const MARK_SRC: Readonly<Record<string, string>> = {
  college: "/logo/nami-color.svg",
  institute: "/logo/nami-color.svg",
  school: "/logo/nami-school.png",
};
const MARK_WIDTH = 200;
const MARK_HEIGHT = 200;

function leadClause(sentence: string): string {
  const splitAt = sentence.indexOf(", ");
  return splitAt === -1 ? sentence : sentence.slice(0, splitAt);
}

export type HeroBadgeProps = {
  readonly entity: NamedEntity;
  readonly motto?: string;
  readonly watch?: SocialProfile | null;
  readonly className?: string;
  readonly customRing?: string;
};

export function HeroBadge({
  entity,
  motto,
  watch = null,
  className,
  customRing,
}: HeroBadgeProps) {
  const founded =
    entity.establishedYear === null ? null : `Estd. ${entity.establishedYear}`;
  const ringParts = customRing
    ? [customRing]
    : [entity.shortName, founded, motto ? leadClause(motto) : null].filter(
        (part): part is string => part !== null,
      );
  const ring = ringParts.join(" * ");
  const accessibleLabelParts = [
    entity.name,
    founded,
    motto ? leadClause(motto) : null,
  ].filter((part): part is string => part !== null);
  const accessibleLabel = accessibleLabelParts.join(", ");
  const logoSrc = MARK_SRC[entity.role] ?? "/logo/nami-color.svg";

  return (
    <div className={cn("relative size-32 shrink-0 lg:size-36", className)}>
      <svg
        aria-label={accessibleLabel}
        className="size-full animate-[spin_20s_linear_infinite]"
        role="img"
        viewBox="0 0 160 160"
      >
        <defs>
          <path
            d={BADGE_ARC}
            fill="none"
            id={`hero-badge-arc-${entity.role}`}
          />
        </defs>
        <text
          className="fill-ink-muted font-display font-bold text-sm"
          fontSize="11"
          textLength={2 * Math.PI * BADGE_RADIUS}
        >
          <textPath
            href={`#hero-badge-arc-${entity.role}`}
            lengthAdjust="spacing"
          >
            {` ${ring} * `}
          </textPath>
        </text>
      </svg>
      <div className="absolute inset-0 m-auto flex size-20 lg:size-24 items-center justify-center rounded-full">
        {watch ? (
          <Link
            className="flex size-full items-center justify-center rounded-full transition-transform hover:scale-105"
            href={watch.href as Route}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Image
              alt=""
              className="h-16 lg:h-18 w-auto object-contain"
              height={MARK_HEIGHT}
              sizes="(min-width: 1024px) 72px, 64px"
              src={logoSrc}
              width={MARK_WIDTH}
            />
            <span className="sr-only">{`Watch ${entity.name} on ${watch.label}`}</span>
          </Link>
        ) : (
          <Image
            alt=""
            className="h-16 lg:h-18 w-auto object-contain"
            height={MARK_HEIGHT}
            sizes="(min-width: 1024px) 72px, 64px"
            src={logoSrc}
            width={MARK_WIDTH}
          />
        )}
      </div>
    </div>
  );
}
