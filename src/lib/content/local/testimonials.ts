import { entryOf } from "../identifiers";
import type { Testimonial } from "../types";
import { pragatiRaiPortrait } from "./images";

// TEMP: four dummy alumni quotes below — replace with verified NAMI stories before launch.
export const testimonials: readonly Testimonial[] = [
  {
    ...entryOf("pragati-rai"),
    quote:
      "Grateful to be an alumnus of a truly exceptional institution. As a proud graduate of the A-Level program at NAMI, reflecting on my academic journey fills me with gratitude and a profound sense of accomplishment. The curriculum was definitely challenging, yet that was what pushed me to do better. I am confident that the skills and values imparted during my time here will continue to guide me.",
    name: "Pragati Rai",
    programme: "A-Level (Non-Science)",
    graduatedYear: null,
    portrait: pragatiRaiPortrait,
  },
  {
    ...entryOf("aarav-shrestha"),
    quote:
      "The Cambridge A-Level programme at NAMI gave me the discipline to think independently. Small class sizes meant every question got a proper answer, and my teachers genuinely cared about how I was doing, not just about my grades.",
    name: "Aarav Shrestha",
    programme: "Cambridge A-Level (Science)",
    graduatedYear: null,
    portrait: null,
  },
  {
    ...entryOf("sneha-karki"),
    quote:
      "Studying Computer Science at NAMI felt like being part of a cohort that pushed each other forward. The labs were open late, the lecturers knew us by name, and the projects we built were real, not textbook exercises.",
    name: "Sneha Karki",
    programme: "BSc (Hons) Computer Science",
    graduatedYear: null,
    portrait: null,
  },
  {
    ...entryOf("rijan-maharjan"),
    quote:
      "What I value most about NAMI is the balance: serious academics in the morning and a campus life that actually lets you breathe. Between the clubs, the service camps and the basketball tournaments, I grew as much outside the classroom as inside it.",
    name: "Rijan Maharjan",
    programme: "BBA Business Administration",
    graduatedYear: null,
    portrait: null,
  },
  {
    ...entryOf("anisha-gurung"),
    quote:
      "The foundation I built during my A-Levels made my first year of university feel familiar. NAMI taught me how to manage my time, how to ask better questions, and how to show up consistently.",
    name: "Anisha Gurung",
    programme: "Cambridge A-Level (Science)",
    graduatedYear: null,
    portrait: null,
  },
];
