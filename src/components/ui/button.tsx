import {
  Button as ButtonPrimitive,
  type ButtonProps as ButtonPrimitiveProps,
} from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-sm font-medium whitespace-nowrap transition duration-200 select-none data-disabled:cursor-not-allowed data-disabled:opacity-45 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        solid: "bg-accent text-accent-ink hover:opacity-90 active:opacity-80",
        quiet:
          "border border-border-strong bg-transparent text-ink hover:bg-ink hover:text-surface",
        link: "text-accent underline decoration-1 underline-offset-4 hover:decoration-2",
      },
      size: {
        sm: "h-9 px-4 text-xs [&_svg]:size-4",
        md: "h-11 px-6 text-sm [&_svg]:size-5",
        lg: "h-13 px-8 text-base [&_svg]:size-6",
        icon: "size-11 [&_svg]:size-5",
      },
    },
    compoundVariants: [{ variant: "link", class: "h-auto px-0" }],
    defaultVariants: { variant: "solid", size: "md" },
  },
);

export type ButtonProps = Omit<ButtonPrimitiveProps, "className"> &
  VariantProps<typeof buttonVariants> & { className?: string };

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
