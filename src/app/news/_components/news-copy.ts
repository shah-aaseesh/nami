import type { Crumb } from "@/components/seo/structured-data";

export const newsTrail: readonly Crumb[] = [
  { name: "Home", path: "/" },
  { name: "News", path: "/news" },
];

export const newsCopy = {
  meta: {
    title: "News and notices",
    description:
      "Announcements and notices from NAMI College, Kathmandu — admissions, registration and everything the college needs students and parents to read.",
  },
  masthead: {
    eyebrow: "News & notices",
    heading: "What the college is announcing.",
    standfirst:
      "Registration windows, admission notices and announcements. Anything with a date attached to it belongs on the events page instead.",
  },
  eventsLinkLabel: "See what's happening",
  emptyState:
    "There is nothing to announce right now. Notices and news will appear here as the college publishes them.",
} as const;
