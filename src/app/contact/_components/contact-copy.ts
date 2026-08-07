import type { Crumb } from "@/components/seo/structured-data";

export const contactTrail: readonly Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" },
];

export const contactCopy = {
  meta: {
    title: "Contact",
    description:
      "Reach NAMI College in Kathmandu — email, phone, campus locations at Gokarneshwor-7 and New Baneshwor, and a message form for admissions and general enquiries.",
  },
  masthead: {
    eyebrow: "Contact",
    heading: "Talk to NAMI.",
    standfirst:
      "Admissions, campus visits, transcripts, or a question about a programme. Reach us directly, or send a message from this page.",
    emailLabel: "Write to us",
    phoneLabel: "Call us",
    socialLabel: "Follow",
  },
  campuses: {
    eyebrow: "Campuses",
    heading: "Where to find us.",
    standfirst:
      "Each campus carries a different part of the institute. The maps below are centred on the surrounding area rather than a door number.",
    mapNote: (locality: string) => `Map centred on the ${locality} area.`,
    mapTitle: (locality: string, city: string) =>
      `Map of the ${locality} area, ${city}`,
    hostsLabel: "Taught here",
  },
  form: {
    eyebrow: "Send a message",
    heading: "Tell us what you need.",
    standfirst: (email: string) =>
      `Fill this in and your email app opens with the message ready to send to ${email}. Nothing is stored by this website.`,
    directPrompt: "Prefer to write it yourself?",
    labels: {
      name: "Full name",
      email: "Email address",
      phone: "Phone number (optional)",
      topic: "What is this about?",
      message: "Your message",
    },
    topicPlaceholder: "Choose a subject",
    topicGeneral: "General enquiry",
    topicOther: "Something else",
    submit: "Send",
    subjectPrefix: "Website enquiry",
    draftHeading: "Your email app should be open.",
    draftBody: (email: string) =>
      `Look for a new draft addressed to ${email}. If nothing opened, reopen the draft below or write to us directly.`,
    draftAction: "Reopen the draft",
  },
} as const;
