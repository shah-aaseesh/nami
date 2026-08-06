import { entryOf } from "../identifiers";
import type { Testimonial } from "../types";
import { pragatiRaiPortrait } from "./images";

export const testimonials: readonly Testimonial[] = [
  {
    ...entryOf("pragati-rai"),
    quote:
      "Grateful to be an alumnus of a truly exceptional institution. As a proud graduate of the A-Level program at NAMI College, reflecting on my academic journey fills me with gratitude and a profound sense of accomplishment. The curriculum was definitely challenging, yet that was what pushed me to do better. I am confident that the skills and values imparted during my time here will continue to guide me.",
    name: "Pragati Rai",
    programme: "A-Level (Non-Science)",
    graduatedYear: null,
    portrait: pragatiRaiPortrait,
  },
];
