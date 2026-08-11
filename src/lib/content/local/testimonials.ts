import { entryOf } from "../identifiers";
import type { Testimonial } from "../types";
import { pragatiRaiPortrait } from "./images";

// TEMP: the three college quotes below are fabricated — replace with verified NAMI stories before launch.
export const testimonials: readonly Testimonial[] = [
  {
    ...entryOf("pragati-rai"),
    quote:
      "Grateful to be an alumnus of a truly exceptional institution. As a proud graduate of the A-Level program at NAMI, reflecting on my academic journey fills me with gratitude and a profound sense of accomplishment. The curriculum was definitely challenging, yet that was what pushed me to do better. I am confident that the skills and values imparted during my time here will continue to guide me.",
    name: "Pragati Rai",
    programme: "A-Level (Non-Science)",
    institution: "college",
    graduatedYear: null,
    portrait: pragatiRaiPortrait,
  },
  {
    ...entryOf("aarav-shrestha"),
    quote:
      "The Cambridge A-Level programme at NAMI gave me the discipline to think independently. Small class sizes meant every question got a proper answer, and my teachers genuinely cared about how I was doing, not just about my grades.",
    name: "Aarav Shrestha",
    programme: "Cambridge A-Level (Science)",
    institution: "college",
    graduatedYear: null,
    portrait: null,
  },
  {
    ...entryOf("anisha-gurung"),
    quote:
      "The foundation I built during my A-Levels made my first year of university feel familiar. NAMI taught me how to manage my time, how to ask better questions, and how to show up consistently.",
    name: "Anisha Gurung",
    programme: "Cambridge A-Level (Science)",
    institution: "college",
    graduatedYear: null,
    portrait: null,
  },
  {
    ...entryOf("nirdishta-amatya"),
    quote:
      "Environmental Science at NAMI has been an inspirational platform to develop my educational skills for a brighter future. For an ambitious yet indecisive student like me, career decisions have always been a dilemma. But choosing NAMI has been the right stepping stone for my career. The college follows the British system of learning, challenging educational programmes and all the benefits of an international degree. Therefore, this creative and student-oriented style of learning has been a fruitful experience till now and hopeful in future.",
    name: "Nirdishta Amatya",
    programme: "BSc (Hons) Environmental Science",
    institution: "institute",
    graduatedYear: null,
    portrait: null,
  },
  {
    ...entryOf("ronak-bastola"),
    quote:
      "Studying here at NAMI for me was a journey of growth and achievement. The hands-on approach to learning and the advanced British curriculum at Nami, partnered with University of Northampton, UK, prepared me for the ever-evolving tech industry. I’m grateful for the supportive community and the mentorship that brought me to where I am today.",
    name: "Ronak Bastola",
    programme: "BSc (Hons) Computing (Software Engineering)",
    institution: "institute",
    graduatedYear: null,
    portrait: null,
  },
  {
    ...entryOf("ananda-roy"),
    quote:
      "My journey at Nami has been like a roller coaster. The supportive teachers and the knowledge they shared has helped me both theoretically and practically in today’s competitive market. It was a totally new experience and the friendly atmosphere here has helped me a lot.",
    name: "Ananda Roy",
    programme: "Bachelor of Business Administration (BBA)",
    institution: "institute",
    graduatedYear: null,
    portrait: null,
  },
  {
    ...entryOf("devashree-niroula"),
    quote:
      "Attending NAMI not only ignited my enthusiasm for environmental science but also developed a profound sense of accountability. The combination of interdisciplinary methods and field experiences shaped my commitment to sustainable practices in my professional journey. I am currently working as Research and Outreach Specialist, United Nations Convention to Combat Desertification (UNCCD), Bonn, Germany.",
    name: "Devashree Niroula",
    programme: null,
    institution: "institute",
    graduatedYear: null,
    portrait: null,
  },
  {
    ...entryOf("yamato-sherpa"),
    quote:
      "The learning experience at NAMI has been of the highest quality. I am completely satisfied with the course contents, learning atmosphere and the lecturers. The modules are stimulating and so are the lecturers who are experienced in teaching their subject matter. I feel blessed for having been able to learn such modules while staying here in Nepal. I believe I will come out as a confident and will contribute as a change maker of Nepal.",
    name: "Yamato Sherpa (Revmandu)",
    programme: "BBA (Hons)",
    institution: "institute",
    graduatedYear: null,
    portrait: null,
  },
  {
    ...entryOf("pankaj-badu"),
    quote:
      "Pursuing my Computing degree at NAMI has truly transformed my life. NAMI stands out as a distinctive fusion of exceptional facilities, academic distinction, and a dynamic campus environment. Surrounded by a dedicated team of faculty members, I have thrived in an inclusive and supportive environment. Moreover, the opportunity to earn an internationally recognized degree at an affordable cost has paved the way for a promising future. My journey towards a brighter tomorrow has indeed commenced at NAMI.",
    name: "Pankaj Badu",
    programme: "BSc (Hons) Computing",
    institution: "institute",
    graduatedYear: null,
    portrait: null,
  },
];
