"use client";

import {
  type TabsListProps,
  type TabsPanelProps,
  Tabs as TabsPrimitive,
  type TabsRootProps,
  type TabsTabProps,
} from "@base-ui/react/tabs";
import { cn } from "@/lib/utils";

export function Tabs({
  className,
  ...props
}: Omit<TabsRootProps, "className"> & { className?: string }) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("w-full", className)}
      {...props}
    />
  );
}

export function TabsList({
  className,
  children,
  ...props
}: Omit<TabsListProps, "className"> & { className?: string }) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "relative flex gap-6 overflow-x-auto border-b border-border sm:gap-10",
        className,
      )}
      {...props}
    >
      {children}
      <TabsPrimitive.Indicator
        data-slot="tabs-indicator"
        className="absolute bottom-0 left-0 h-0.5 w-(--active-tab-width) translate-x-(--active-tab-left) bg-accent transition-[translate,width] duration-300 ease-out motion-reduce:transition-none"
      />
    </TabsPrimitive.List>
  );
}

export function TabsTab({
  className,
  ...props
}: Omit<TabsTabProps, "className"> & { className?: string }) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-tab"
      className={cn(
        "shrink-0 cursor-pointer bg-transparent py-4 text-sm whitespace-nowrap text-ink-muted transition-colors duration-200 hover:text-ink data-active:text-ink data-disabled:cursor-not-allowed data-disabled:opacity-45",
        className,
      )}
      {...props}
    />
  );
}

export function TabsPanel({
  className,
  ...props
}: Omit<TabsPanelProps, "className"> & { className?: string }) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-panel"
      className={cn("pt-8", className)}
      {...props}
    />
  );
}
