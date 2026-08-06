"use client";

import {
  type AvatarFallbackProps,
  type AvatarImageProps,
  Avatar as AvatarPrimitive,
  type AvatarRootProps,
} from "@base-ui/react/avatar";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const avatarVariants = cva(
  "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-accent text-accent-ink select-none",
  {
    variants: {
      size: {
        sm: "size-10 text-xs",
        md: "size-14 text-sm",
        lg: "size-16 text-base",
        xl: "size-24 text-xl",
      },
    },
    defaultVariants: { size: "md" },
  },
);

export type AvatarProps = Omit<AvatarRootProps, "className"> &
  VariantProps<typeof avatarVariants> & { className?: string };

export function Avatar({ className, size, ...props }: AvatarProps) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(avatarVariants({ size }), className)}
      {...props}
    />
  );
}

export function AvatarImage({
  className,
  ...props
}: Omit<AvatarImageProps, "className"> & { className?: string }) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("size-full object-cover", className)}
      {...props}
    />
  );
}

export function AvatarFallback({
  className,
  ...props
}: Omit<AvatarFallbackProps, "className"> & { className?: string }) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn("flex size-full items-center justify-center", className)}
      {...props}
    />
  );
}
