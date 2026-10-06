import { HugeiconsIcon } from "@hugeicons/react";
import type { ComponentProps, ComponentType, SVGProps } from "react";
import type { AnyIcon, IconSvgElement } from "@/lib/icons";
import { cn } from "@/lib/utils";

export type IconProps = Omit<ComponentProps<typeof HugeiconsIcon>, "icon"> & {
  icon: IconSvgElement | AnyIcon;
};

export function Icon({
  className,
  icon,
  strokeWidth = 1.5,
  ...props
}: IconProps) {
  if (typeof icon === "function") {
    const CustomIcon = icon as ComponentType<SVGProps<SVGSVGElement>>;
    return (
      <CustomIcon
        data-slot="icon"
        aria-hidden="true"
        focusable="false"
        className={cn("size-5 shrink-0", className)}
        {...props}
      />
    );
  }

  return (
    <HugeiconsIcon
      data-slot="icon"
      aria-hidden
      focusable="false"
      icon={icon as ComponentProps<typeof HugeiconsIcon>["icon"]}
      strokeWidth={strokeWidth}
      className={cn("size-5 shrink-0", className)}
      {...props}
    />
  );
}
