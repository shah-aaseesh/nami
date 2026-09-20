import { entryOf } from "../identifiers";
import type { Testimonial } from "../types";
import {
  pranilPandeyPortrait,
  rameshPrasadTiwariPortrait,
  rameshwarThapaPortrait,
  robinRanaPortrait,
  samjhanaPhuyalPortrait,
  soniJoshiPortrait,
  sureshRajGhimirePortrait,
  yogRajKandelSharmaPortrait,
} from "./images";

export const stakeholderTestimonials: readonly Testimonial[] = [
  {
    ...entryOf("stakeholder-rameshwar-thapa"),
    name: "Capt. Rameshwar Thapa",
    programme: "Chairperson, NAMI Group of Companies",
    quote:
      "Our founding vision for NAMI is to deliver education of uncompromised global standards in Nepal. We empower young minds to lead with integrity, entrepreneurial vision, and a deep commitment to national progress.",
    institution: null,
    graduatedYear: null,
    portrait: rameshwarThapaPortrait,
  },
  {
    ...entryOf("stakeholder-pranil-pandey"),
    name: "Mr. Pranil Pandey, FCCA",
    programme: "Chief Executive Officer, NAMI Group of Companies",
    quote:
      "At NAMI, we are building a future-ready academic ecosystem that bridges global curricula with real-world industry competence, preparing students to excel anywhere in the world.",
    institution: null,
    graduatedYear: null,
    portrait: pranilPandeyPortrait,
  },
  {
    ...entryOf("stakeholder-suresh-ghimire"),
    name: "Mr. Suresh Raj Ghimire",
    programme: "Director, NAMI Group of Companies",
    quote:
      "By blending engineering rigor, technical innovation, and managerial expertise, we guide students to transform theoretical concepts into impactful solutions for industry and society.",
    institution: null,
    graduatedYear: null,
    portrait: sureshRajGhimirePortrait,
  },
  {
    ...entryOf("stakeholder-soni-joshi"),
    name: "Ms. Soni Joshi",
    programme: "Director, NAMI Group of Companies",
    quote:
      "Education is the most powerful catalyst for social transformation. At NAMI, we cultivate empathy, inclusivity, and leadership, empowering students to drive meaningful change in their communities.",
    institution: null,
    graduatedYear: null,
    portrait: soniJoshiPortrait,
  },
  {
    ...entryOf("stakeholder-yog-raj-kandel"),
    name: "Mr. Yog Raj Kandel Sharma",
    programme: "Director, NAMI Group of Companies",
    quote:
      "Sustainable institutional excellence requires strong governance, ethical leadership, and continuous innovation. NAMI stands as a benchmark of disciplined, high-quality education in Nepal.",
    institution: null,
    graduatedYear: null,
    portrait: yogRajKandelSharmaPortrait,
  },
  {
    ...entryOf("stakeholder-robin-rana"),
    name: "Mr. Robin Rana",
    programme: "Director, NAMI Group of Companies",
    quote:
      "Preparing students for the modern global economy demands multidisciplinary learning, financial acumen, and an understanding of sustainability and enterprise resilience.",
    institution: null,
    graduatedYear: null,
    portrait: robinRanaPortrait,
  },
  {
    ...entryOf("stakeholder-samjhana-phuyal"),
    name: "Ms. Samjhana Phuyal",
    programme: "Director, NAMI Group of Companies",
    quote:
      "We are committed to nurturing critical thinking, empathy, and social responsibility, ensuring our students grow into conscious leaders who champion equity and human dignity.",
    institution: null,
    graduatedYear: null,
    portrait: samjhanaPhuyalPortrait,
  },
  {
    ...entryOf("stakeholder-ramesh-tiwari"),
    name: "Mr. Ramesh Prasad Tiwari",
    programme: "Director, NAMI Group of Companies",
    quote:
      "Our focus is on creating an inspiring, values-driven environment where academic pursuit harmonizes with holistic character building and civic consciousness.",
    institution: null,
    graduatedYear: null,
    portrait: rameshPrasadTiwariPortrait,
  },
];

export const testimonials: readonly Testimonial[] = [
  // Bachelors & Masters (Institute) Testimonials
  {
    ...entryOf("dhirendra-singh-khadka"),
    name: "Dhirendra Singh Khadka",
    programme: "BSc. Computer Science — Level 5 (Year II)",
    quote:
      "At NAMI, I learned that true family isn't just born the amazing friends I met here became my brothers for life..",
    institution: "institute",
    graduatedYear: null,
    portrait: {
      src: "/NAMI_Institute Testimonials/dhirendra Singh Khadka.png",
      alt: "Dhirendra Singh Khadka",
      width: 400,
      height: 400,
    },
  },
  {
    ...entryOf("rashmi-kc"),
    name: "Rashmi KC",
    programme: "BBA — Level 4 (Year I)",
    quote:
      "Beyond academics, NAMI showed me that meaningful success comes from integrity, adaptability, and building genuine connections with people.",
    institution: "institute",
    graduatedYear: null,
    portrait: {
      src: "/NAMI_Institute Testimonials/rashmi kc.png",
      alt: "Rashmi KC",
      width: 400,
      height: 400,
    },
  },
  {
    ...entryOf("smrit-chaulagain"),
    name: "Smrit Chaulagain",
    programme: "BSc. Computer Science — Level 5 (Year II)",
    quote:
      "NAMI taught me to solve problems, collaborate effectively, and keep learning with confidence. These lessons will stay with me forever.",
    institution: "institute",
    graduatedYear: null,
    portrait: {
      src: "/NAMI_Institute Testimonials/smrit Chaulagai.png",
      alt: "Smrit Chaulagain",
      width: 400,
      height: 400,
    },
  },
  {
    ...entryOf("subham-khadka"),
    name: "Subham Khadka",
    programme: "BSc. Computer Science — Level 5 (Year II)",
    quote:
      "NAMI has taught me that meaningful innovation begins with empathy, collaboration, and solving real-world problems to create lasting impact in our communities.",
    institution: "institute",
    graduatedYear: null,
    portrait: {
      src: "/NAMI_Institute Testimonials/Subham_Khadka.png",
      alt: "Subham Khadka",
      width: 400,
      height: 400,
    },
  },
  {
    ...entryOf("anish-babu-pokharel"),
    name: "Anish Babu Pokharel",
    programme: "BSc. Computer Science — Level 5 (Year II)",
    quote:
      "I learned that every challenge is an opportunity to grow, build confidence, and become a more responsible and resilient individual. .",
    institution: "institute",
    graduatedYear: null,
    portrait: {
      src: "/NAMI_Institute Testimonials/anish_babu.png",
      alt: "Anish Babu Pokharel",
      width: 400,
      height: 400,
    },
  },
  {
    ...entryOf("renasha-dahal"),
    name: "Renasha Dahal",
    programme: "BSc. Computer Science — Level 6 (Year III)",
    quote:
      "NAMI taught me to solve problems, collaborate effectively, and keep learning with confidence. These lessons will stay with me forever.",
    institution: "institute",
    graduatedYear: null,
    portrait: {
      src: "/NAMI_Institute Testimonials/renasha dahal.png",
      alt: "Renasha Dahal",
      width: 400,
      height: 400,
    },
  },
  {
    ...entryOf("aarya-adhikari"),
    name: "Aarya Adhikari",
    programme: "BSc. Computer Science — Level 6 (Year III)",
    quote:
      "NAMI’s vibrant tech community and encouraging mentors transformed my learning into a journey of innovation, deep confidence, and lasting career readiness.",
    institution: "institute",
    graduatedYear: null,
    portrait: {
      src: "/NAMI_Institute Testimonials/Aarya_Adhikari.png",
      alt: "Aarya Adhikari",
      width: 400,
      height: 400,
    },
  },
  {
    ...entryOf("rhythm-manandhar"),
    name: "Rhythm Manandhar",
    programme: "BSc. Computer Science — Level 6 (Year III)",
    quote:
      "Tackling group projects with my classmates under tight deadlines, where shared stress turned hard work into unforgettable memories and genuine friendships.",
    institution: "institute",
    graduatedYear: null,
    portrait: {
      src: "/NAMI_Institute Testimonials/Rhythm_Manandhar.png",
      alt: "Rhythm Manandhar",
      width: 400,
      height: 400,
    },
  },
  {
    ...entryOf("suraj-karki"),
    name: "Suraj Karki",
    programme: "BBA — Level 6 (Year III)",
    quote:
      "My teachers are kind. I like playing with friends at school. I love the food at school. NAMI is clean and nice. NAMI makes me happy every day.",
    institution: "institute",
    graduatedYear: null,
    portrait: {
      src: "/NAMI_Institute Testimonials/Suraj_Karki.png",
      alt: "Suraj Karki",
      width: 400,
      height: 400,
    },
  },
  {
    ...entryOf("dipa-chaulagain"),
    name: "Dipa Chaulagain",
    programme: "BSc. Computer Science — Level 5 (Year II)",
    quote:
      "The friendships I built, the vibrant campus events, and the simple moments of laughter shared in the canteen are memories I'll always cherish, and I'll always be grateful to NAMI for these experiences. More importantly, NAMI gave me the confidence to connect with people and communicate with others more openly—something I'll never forget.",
    institution: "institute",
    graduatedYear: null,
    portrait: {
      src: "/NAMI_Institute Testimonials/Dipa_Chaulagain.png",
      alt: "Dipa Chaulagain",
      width: 400,
      height: 400,
    },
  },

  // School Testimonials
  {
    ...entryOf("evana-khanal"),
    name: "Evana Khanal",
    programme: "Grade 4",
    quote:
      "We learn from our own mistakes. Making mistakes while learning doesn't mean we are bad. Our teachers help us understand our mistakes with kindness, so we can do better next time.",
    institution: "school",
    graduatedYear: null,
    portrait: {
      src: "/School Testimonials/evana khanal.png",
      alt: "Evana Khanal",
      width: 400,
      height: 400,
    },
  },
  {
    ...entryOf("aarushi-poudyal"),
    name: "Aarushi Poudyal",
    programme: "Grade 5",
    quote:
      "I will never forget visiting Namgyal School during Environment Week, where I learned to segregate, reuse, and recycle different types of waste.",
    institution: "school",
    graduatedYear: null,
    portrait: {
      src: "/School Testimonials/Aarushi Poudyal.png",
      alt: "Aarushi Poudyal",
      width: 400,
      height: 400,
    },
  },
  {
    ...entryOf("himanshu-raya"),
    name: "Himanshu Raya",
    programme: "Grade 5",
    quote:
      "At Nami, I learned to adapt to new challenges and become more confident through public speaking and teamwork.",
    institution: "school",
    graduatedYear: null,
    portrait: {
      src: "/School Testimonials/Himanshu Raya.png",
      alt: "Himanshu Raya",
      width: 400,
      height: 400,
    },
  },
  {
    ...entryOf("hriden-jung-karki"),
    name: "Hriden Jung Karki",
    programme: "Grade 5",
    quote:
      "At Nami, we learn through fun activities. In Science, we played football to understand force. Football is my favourite sport so it was my best experience.",
    institution: "school",
    graduatedYear: null,
    portrait: {
      src: "/School Testimonials/Hriden Jung Karki.png",
      alt: "Hriden Jung Karki",
      width: 400,
      height: 400,
    },
  },

  // A-Levels (College) Testimonials
  {
    ...entryOf("rufash-kc"),
    name: "Rufash K.C.",
    programme: "AS Level — Batch 2026",
    quote:
      "One thing I learned at NAMI that I’ll never forget is that there are endless possibilities beyond what I had imagined. Before coming here, I thought college life was just about studying, but NAMI showed me that it’s so much more. I have had the chance to explore new experiences and explore what I am interested in.",
    institution: "college",
    graduatedYear: null,
    portrait: {
      src: "/A-levels/Rufash.png",
      alt: "Rufash K.C.",
      width: 400,
      height: 400,
    },
  },
  {
    ...entryOf("adarsh-karna"),
    name: "Adarsh Karna",
    programme: "A Level — Batch 2025",
    quote:
      "One thing I learned in Nami is that freedom to make decisions is the best way a student can learn, grow and build a strong self-confidence.",
    institution: "college",
    graduatedYear: null,
    portrait: {
      src: "/A-levels/Adarsh Karna.png",
      alt: "Adarsh Karna",
      width: 400,
      height: 400,
    },
  },
  {
    ...entryOf("angel-gurung"),
    name: "Angel Gurung",
    programme: "A Level — Batch 2025",
    quote:
      "One thing I will never forget about Nami college is the friendships and enjoyable moments which made school memorable. but education should always remain a priority because it shapes my future opportunities. Guidance and encouragement of my teachers also taught me to enjoy student life while staying focused on my studies. Nami college taught me the value of balance as while we create happy memories, our responsibility as a student should be consistent to a bright and successful future.",
    institution: "college",
    graduatedYear: null,
    portrait: {
      src: "/A-levels/Angel.png",
      alt: "Angel Gurung",
      width: 400,
      height: 400,
    },
  },
  {
    ...entryOf("shreeyash-dhungana"),
    name: "Shreeyash Dhungana",
    programme: "A Level — Batch 2022",
    quote:
      "One thing about Nami that will forever stay with me is the fun I had studying here. 2 years in this college passed so quickly I wish I could go back in time and live all those moments once again. Awkward orientation in Chitwan to that emotional farewell in Kurintar. One of the best moments in my life.",
    institution: "college",
    graduatedYear: null,
    portrait: {
      src: "/A-levels/Shreeyash.png",
      alt: "Shreeyash Dhungana",
      width: 400,
      height: 400,
    },
  },
];
