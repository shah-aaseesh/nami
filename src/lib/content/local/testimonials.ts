import { entryOf } from "../identifiers";
import type { Testimonial } from "../types";
import { pragatiRaiPortrait } from "./images";

// TEMP: every quote below is written copy, not an attributed account — replace with client-verified NAMI stories before launch.
// PLACEHOLDER (DEC-068), not final: every portrait deliberately reuses ONE real
// person's photo (Pragati Rai). Must not ship — retire per-entry, or portrait: null.
export const testimonials: readonly Testimonial[] = [
  {
    ...entryOf("pragati-rai"),
    quote:
      "The A-Level non-science load pushed me harder than I expected, and no weak essay ever got past my teachers. I left knowing how to argue a point properly.",
    name: "Pragati Rai",
    programme: "A-Level (Non-Science)",
    institution: "college",
    graduatedYear: null,
    portrait: pragatiRaiPortrait,
  },
  {
    ...entryOf("aarav-shrestha"),
    quote:
      "Small classes meant every question got a real answer. My physics teacher stayed back most Fridays until A-Level mechanics finally clicked for me.",
    name: "Aarav Shrestha",
    programme: "Cambridge A-Level (Science)",
    institution: "college",
    graduatedYear: null,
    portrait: null,
  },
  {
    ...entryOf("anisha-gurung"),
    quote:
      "My first university year felt familiar because A-Levels here had already taught me to plan a week, ask sharper questions, and show up on the dull days.",
    name: "Anisha Gurung",
    programme: "Cambridge A-Level (Science)",
    institution: "college",
    graduatedYear: null,
    portrait: null,
  },
  {
    ...entryOf("nirdishta-amatya"),
    quote:
      "Environmental Science here is taught in the field, not only the lecture hall. The British curriculum gave me an international degree without leaving Nepal.",
    name: "Nirdishta Amatya",
    programme: "BSc (Hons) Environmental Science",
    institution: "institute",
    graduatedYear: null,
    portrait: null,
  },
  {
    ...entryOf("ronak-bastola"),
    quote:
      "The Northampton computing curriculum is hands-on from the first semester. My mentor's code reviews are the reason I got through my first industry interview.",
    name: "Ronak Bastola",
    programme: "BSc (Hons) Computing (Software Engineering)",
    institution: "institute",
    graduatedYear: null,
    portrait: null,
  },
  {
    ...entryOf("ananda-roy"),
    quote:
      "The BBA lecturers taught the theory and then made us defend it in front of the class. That habit is what I fall back on in every meeting I sit in now.",
    name: "Ananda Roy",
    programme: "Bachelor of Business Administration (BBA)",
    institution: "institute",
    graduatedYear: null,
    portrait: null,
  },
  {
    ...entryOf("devashree-niroula"),
    quote:
      "The fieldwork at NAMI turned an interest in environmental science into a career. I now work on research and outreach for the UNCCD in Bonn, Germany.",
    name: "Devashree Niroula",
    programme: null,
    institution: "institute",
    graduatedYear: null,
    portrait: null,
  },
  {
    ...entryOf("yamato-sherpa"),
    quote:
      "The BBA modules are demanding and the lecturers have actually worked in what they teach. I got that standard of teaching without leaving Kathmandu.",
    name: "Yamato Sherpa (Revmandu)",
    programme: "BBA (Hons)",
    institution: "institute",
    graduatedYear: null,
    portrait: null,
  },
  {
    ...entryOf("pankaj-badu"),
    quote:
      "An internationally recognised computing degree at a cost my family could manage, taught by faculty who knew my name inside the first fortnight.",
    name: "Pankaj Badu",
    programme: "BSc (Hons) Computing",
    institution: "institute",
    graduatedYear: null,
    portrait: null,
  },
];
