import type { Crumb } from "@/components/seo/structured-data";

export const eventsTrail: readonly Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Events", path: "/events" },
];

export const eventsCopy = {
  meta: {
    title: "Events",
    description:
      "Tournaments, service camps, academic tours, orientations and guest lectures at NAMI College, Kathmandu — the college's own record of what it has hosted, newest first.",
  },
  masthead: {
    eyebrow: "Events",
    heading: "What happens here.",
    standfirst:
      "Tournaments and service camps, academic tours and guest lectures, convocations and orientations. Each entry below is NAMI's own account of the day, newest first.",
  },
  countLabel: (count: number, span: string) =>
    `${count} events on record, ${span}`,
  newsLinkLabel: "Read the notices",
  emptyState:
    "There is nothing on record yet. Events will appear here as the college publishes them.",
} as const;
