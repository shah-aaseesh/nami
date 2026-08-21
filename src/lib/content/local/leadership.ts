import { entryOf } from "../identifiers";
import type { Leader, LeadershipProfile } from "../types";
import {
  anishaPandayJoshiPortrait,
  nischalKhadkaPortrait,
  philipBadikarHilarioPortrait,
  pranilPandeyPortrait,
  rameshPrasadTiwariPortrait,
  rameshwarThapaPortrait,
  robinRanaPortrait,
  samjhanaPhuyalPortrait,
  soniJoshiPortrait,
  sureshRajGhimirePortrait,
  yogRajKandelSharmaPortrait,
} from "./images";

const board: readonly Leader[] = [
  {
    ...entryOf("leader-rameshwar-thapa"),
    name: "Capt. Rameshwar Thapa",
    title: "Chairperson",
    group: "board",
    brief:
      "Founder Chairman of Annapurna Ventures, a multi-sector platform of 30+ ventures across Nepal's economy. A first-generation entrepreneur and strategic investor with two decades of aviation leadership, he is Nepal's first MI-17 Commander for commercial operations and chairs Simrik Air and Annapurna Media Network.",
    portrait: rameshwarThapaPortrait,
  },
  {
    ...entryOf("leader-suresh-ghimire"),
    name: "Mr. Suresh Raj Ghimire",
    title: "Director",
    group: "board",
    brief:
      "Engineering management professional with an MSc from Brunel University, UK, and two decades across manufacturing, international trading and consultancy. As Director at NAMI, he blends technical knowledge with managerial expertise.",
    portrait: sureshRajGhimirePortrait,
  },
  {
    ...entryOf("leader-soni-joshi"),
    name: "Ms. Soni Joshi",
    title: "Director",
    group: "board",
    brief:
      "Development practitioner, educator and gender-rights advocate. Her work spans social development and education, with international service through UN Women's organizations and Zonta International.",
    portrait: soniJoshiPortrait,
  },
  {
    ...entryOf("leader-yog-raj-kandel"),
    name: "Mr. Yog Raj Kandel Sharma",
    title: "Director",
    group: "board",
    brief:
      "Leadership experience across aviation management, corporate governance and community development. Holds an MBA Executive from Purbanchal University and an FAA Aircraft Dispatcher qualification.",
    portrait: yogRajKandelSharmaPortrait,
  },
  {
    ...entryOf("leader-robin-rana"),
    name: "Mr. Robin Rana",
    title: "Director",
    group: "board",
    brief:
      "Business leader and strategic advisor with three decades across banking, aviation, telecommunications, energy and environmental sustainability. Director of Himalayan Carbon and Hansa International.",
    portrait: robinRanaPortrait,
  },
  {
    ...entryOf("leader-samjhana-phuyal"),
    name: "Ms. Samjhana Phuyal",
    title: "Director",
    group: "board",
    brief:
      "Human-rights advocate, legal professional and social-development leader with nearly two decades in gender equality and women's rights. Holds a Master's degree in Anthropology and contributes to community-empower initiatives.",
    portrait: samjhanaPhuyalPortrait,
  },
  {
    ...entryOf("leader-ramesh-tiwari"),
    name: "Mr. Ramesh Prasad Tiwari",
    title: "Director",
    group: "board",
    brief:
      "Entrepreneur, educationist and governance professional. Board Director of Stoxkarts Securities and Kantipur Campus, and Founder Member of Kantipur Academy, contributing to institutional development and stakeholder engagement.",
    portrait: rameshPrasadTiwariPortrait,
  },
];

const management: readonly Leader[] = [
  {
    ...entryOf("leader-pranil-pandey"),
    name: "Mr. Pranil Pandey",
    title: "Chief Executive Officer",
    group: "management",
    brief:
      "Chief Executive Officer of NAMI, leading the institution's day-to-day operations and strategic delivery across its schools and college.",
    portrait: pranilPandeyPortrait,
  },
];

const academics: readonly Leader[] = [
  {
    ...entryOf("leader-nischal-khadka"),
    name: "Mr. Nischal Khadka",
    title: "Academic Head, NAMI",
    group: "academics",
    brief:
      "Academic Head at NAMI and the NILE (Northampton Integrated Learning Environment) Champion. His career grew from lecturer to Module and Programme Leader to Academic Head; he also practises as a full-stack developer and IT consultant in .NET Core, Angular and microservices.",
    portrait: nischalKhadkaPortrait,
  },
  {
    ...entryOf("leader-anisha-joshi"),
    name: "Ms. Anisha Panday Joshi",
    title: "Principal, NAMI International School",
    group: "academics",
    brief:
      "Principal of NAMI International School with 15+ years in education leadership. Holds a Master's in Education (NOCM, UK) and an MBA in Marketing from Kathmandu University; a student-centred leader in curriculum, teacher operations and student wellbeing.",
    portrait: anishaPandayJoshiPortrait,
  },
  {
    ...entryOf("leader-philip-hilario"),
    name: "Mr. Philip Badikar Hilario",
    title: "A Level Principal, NAMI College",
    group: "academics",
    brief:
      "A Level Principal at NAMI College with 21+ years in business and accounting education. Leads academic coordination, curriculum implementation and student development toward a culture of academic excellence.",
    portrait: philipBadikarHilarioPortrait,
  },
];

export const leadership: LeadershipProfile = { board, management, academics };
