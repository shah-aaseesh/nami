import { HugeiconsIcon } from "@hugeicons/react";
import type { ComponentProps } from "react";
import type { IconSvgElement } from "@/lib/icons";
import { cn } from "@/lib/utils";

export type IconProps = Omit<ComponentProps<typeof HugeiconsIcon>, "icon"> & {
  icon: IconSvgElement;
};

export function Icon({ className, strokeWidth = 1.5, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      data-slot="icon"
      aria-hidden
      focusable="false"
      strokeWidth={strokeWidth}
      className={cn("size-5 shrink-0", className)}
      {...props}
    />
  );
}
