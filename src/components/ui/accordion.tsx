"use client";

import {
  type AccordionItemProps,
  type AccordionPanelProps,
  Accordion as AccordionPrimitive,
  type AccordionRootProps,
  type AccordionTriggerProps,
} from "@base-ui/react/accordion";
import { Icon } from "@/components/ui/icon";
import { ChevronDownIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

export function Accordion({
  className,
  ...props
}: Omit<AccordionRootProps<string>, "className"> & { className?: string }) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("w-full border-t border-border", className)}
      {...props}
    />
  );
}

export function AccordionItem({
  className,
  ...props
}: Omit<AccordionItemProps, "className"> & { className?: string }) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b border-border", className)}
      {...props}
    />
  );
}

export function AccordionTrigger({
  className,
  children,
  ...props
}: Omit<AccordionTriggerProps, "className"> & { className?: string }) {
  return (
    <AccordionPrimitive.Header data-slot="accordion-header" className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group flex w-full cursor-pointer items-center justify-between gap-6 py-6 text-start text-xl text-ink transition-colors duration-200 hover:text-accent",
          className,
        )}
        {...props}
      >
        {children}
        <Icon
          icon={ChevronDownIcon}
          className="text-ink-muted transition-transform duration-300 ease-out group-hover:text-accent group-data-panel-open:rotate-180 motion-reduce:transition-none"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

export function AccordionPanel({
  className,
  children,
  ...props
}: Omit<AccordionPanelProps, "className"> & { className?: string }) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-panel"
      className="h-(--accordion-panel-height) overflow-hidden transition-[height] duration-300 ease-out data-ending-style:h-0 data-starting-style:h-0 motion-reduce:transition-none"
      {...props}
    >
      <div className={cn("pb-8 pe-8 text-base text-ink-muted", className)}>
        {children}
      </div>
    </AccordionPrimitive.Panel>
  );
}
