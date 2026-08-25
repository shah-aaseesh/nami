import type { ReactNode } from "react";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import {
  Eyebrow,
  H1,
  H2,
  H3,
  H4,
  Standfirst,
} from "@/components/ui/typography";
import { cn } from "@/lib/utils";

export interface SectionHeaderProps {
  /** The small uppercase tag/strapline above the border */
  eyebrow?: ReactNode;
  /** Main section heading */
  title: ReactNode;
  /** Secondary description/standfirst copy */
  description?: ReactNode;
  /** Optional CTA button, link, or controls placed on the right */
  action?: ReactNode;
  /**
   * - "split" (Default when description is present and no action): Title on left, Description on right (`lg:max-w-md`, `items-start`)
   * - "stacked": Description placed directly below Title
   * - "action": Title on left, Action on right, Description below Title
   */
  layout?: "split" | "stacked" | "action";
  /** Heading tag to render (default: "h2") */
  as?: "h1" | "h2" | "h3" | "h4";
  /** Enable entrance animations (default: true) */
  animated?: boolean;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

const HEADING_COMPONENTS = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  layout,
  as = "h2",
  animated = true,
  className,
  titleClassName,
  descriptionClassName,
}: SectionHeaderProps) {
  const effectiveLayout =
    layout ?? (action ? "action" : description ? "split" : "stacked");

  const HeadingComponent = HEADING_COMPONENTS[as] ?? H2;

  const renderTitle = () => {
    if (typeof title === "string") {
      return animated ? (
        <SplitText as={as} className={cn("lg:max-w-2xl", titleClassName)}>
          {title}
        </SplitText>
      ) : (
        <HeadingComponent className={cn("lg:max-w-2xl", titleClassName)}>
          {title}
        </HeadingComponent>
      );
    }
    return title;
  };

  const renderDescription = (extraClass?: string) => {
    if (!description) return null;
    const content =
      typeof description === "string" ? (
        <Standfirst
          className={cn(
            "text-xs sm:text-sm leading-relaxed",
            descriptionClassName,
          )}
        >
          {description}
        </Standfirst>
      ) : (
        description
      );

    return animated ? (
      <RevealItem className={extraClass}>{content}</RevealItem>
    ) : (
      <div className={extraClass}>{content}</div>
    );
  };

  const renderEyebrowBar = () => {
    if (!eyebrow) return null;
    const bar = (
      <div className="flex items-center gap-5">
        <Eyebrow>{eyebrow}</Eyebrow>
        <span className="h-px flex-1 bg-border" />
      </div>
    );
    return animated ? <RevealItem>{bar}</RevealItem> : bar;
  };

  const renderBody = () => {
    if (effectiveLayout === "split") {
      return (
        <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-x-16">
          <div>{renderTitle()}</div>
          {description && (
            <div className="lg:max-w-md">{renderDescription()}</div>
          )}
        </div>
      );
    }

    if (effectiveLayout === "action") {
      return (
        <>
          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-x-8">
            <div>{renderTitle()}</div>
            {action && (
              <div className="shrink-0 sm:self-start">
                {animated ? <RevealItem>{action}</RevealItem> : action}
              </div>
            )}
          </div>
          {description && renderDescription("mt-6 max-w-2xl")}
        </>
      );
    }

    // "stacked" layout
    return (
      <div className="mt-4 max-w-3xl">
        <div>{renderTitle()}</div>
        {description && renderDescription("mt-4 max-w-2xl")}
        {action && (
          <div className="mt-6">
            {animated ? <RevealItem>{action}</RevealItem> : action}
          </div>
        )}
      </div>
    );
  };

  const content = (
    <div className={className}>
      {renderEyebrowBar()}
      {renderBody()}
    </div>
  );

  if (!animated) {
    return content;
  }

  return <Reveal stagger={0.08}>{content}</Reveal>;
}
