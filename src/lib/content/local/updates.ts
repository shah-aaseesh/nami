import { entryOf, isoDate } from "../identifiers";
import type { Update } from "../types";
import {
  bachelorOrientation,
  basketballPrizeGiving,
  christmasHall,
  climatePanel,
  convocationCeremony,
  ecoClubFrame,
  eliteCompetition,
  mascotDesignEntry,
  plantationProgramme,
  serviceCamp,
} from "./images";
import { placeholderNews, preRegistrationNoticeExcerpt } from "./placeholders";

const published: readonly Update[] = [
  {
    ...entryOf("motivational-stories-second-session"),
    kind: "event",
    title:
      "Second Session of the most awaited talk program “Motivational Stories by Inspirational Leaders of Change”",
    excerpt:
      "We are pleased to announce the Second Session of the most awaited talk program “Motivational Stories by Inspirational Leaders of Change” taking place at Naaya Aayam Multi-Disciplinary Institute, Jorpati, on the 30th of July, 2024. Get ready for an enriching experience!",
    publishedAt: isoDate("2024-07-30"),
    happensAt: null,
    venue: "Jorpati",
    link: {
      label: "Read the event report",
      href: "https://nami.edu.np/event/216/second-session-of-the-most-awaited-talk-program-motivational-stories-by-inspirat",
      destination: "legacy",
    },
    image: null,
  },
  {
    ...entryOf("motivational-stories-first-session"),
    kind: "event",
    title: "Motivational Stories by Inspirational Leaders of Change",
    excerpt:
      "NAMI is proud to launch a new monthly series featuring three motivational speakers from various walks of life. NAMI kicked off our series of motivational speeches featuring the country's best in their respective fields, Ms. Vidushi Rana, Dr. Bishal Dhakal and Mr. Anil Keshary Shah. The stories shared by all three speakers were relatable, motivational, and deeply moving.",
    publishedAt: isoDate("2024-06-30"),
    happensAt: null,
    venue: "Jorpati",
    link: {
      label: "Read the event report",
      href: "https://nami.edu.np/event/215/motivational-stories-by-inspirational-leaders-of-change",
      destination: "legacy",
    },
    image: null,
  },
  {
    ...entryOf("nami-see-3x3-basketball-tournament"),
    kind: "event",
    title: "NAMI SEE 3x3 Basketball Tournament",
    excerpt:
      "We are thrilled to announce the successful conclusion of the NAMI SEE 3x3 Basketball Tournament! A huge thank you to all the participants for their dedication and sportsmanship.",
    publishedAt: isoDate("2024-05-16"),
    happensAt: null,
    venue: "College Premise",
    link: {
      label: "Read the event report",
      href: "https://college.nami.edu.np/event/14/nami-see-3x3-basketball-tournament",
      destination: "legacy",
    },
    image: basketballPrizeGiving,
  },
  {
    ...entryOf("pre-registration-open-for-a-level"),
    kind: "notice",
    title: "Pre Registration open for A Level",
    excerpt: preRegistrationNoticeExcerpt,
    publishedAt: isoDate("2024-04-02"),
    happensAt: null,
    venue: null,
    link: {
      label: "Read the notice",
      href: "https://college.nami.edu.np/Notice/2/pre-registration-open-for-a-level",
      destination: "legacy",
    },
    image: null,
  },
  {
    ...entryOf("social-camp"),
    kind: "event",
    title: "Social Camp",
    excerpt:
      "NAMI organized a transformative Social Camp at Shree Ganesh Basic School in Sindhupalchowk from January 27th to 28th, aimed at making a positive impact on the local community. The primary focus of the event was to extend assistance to underprivileged children and uplift the overall welfare of the community.",
    publishedAt: isoDate("2024-01-27"),
    happensAt: null,
    venue: "Sindhupalchowk",
    link: {
      label: "Read the event report",
      href: "https://college.nami.edu.np/event/13/social-camp",
      destination: "legacy",
    },
    image: serviceCamp,
  },
  {
    ...entryOf("christmas-event-city-campus"),
    kind: "event",
    title: "Christmas Event, NAMI City Campus",
    excerpt:
      "We are delighted to share the tremendous success of the X-Mas Event, a culmination of festive cheer, laughter, and camaraderie, aimed to provide an unforgettable experience for both students and faculty. The venue was transformed into a festive wonderland, adorned with vibrant Christmas decorations, including two beautifully crafted trees made of cardboard boxes and paper.",
    publishedAt: isoDate("2023-12-24"),
    happensAt: null,
    venue: "City Campus",
    link: {
      label: "Read the event report",
      href: "https://nami.edu.np/event/209/christmas-event-nami-city-campus",
      destination: "legacy",
    },
    image: christmasHall,
  },
  {
    ...entryOf("christmas-blood-donation-drive"),
    kind: "event",
    title:
      "NAMI A-Level Students Embrace the Spirit of Giving through Christmas Blood Donation Drive",
    excerpt:
      "In the spirit of Christmas, A-Level students at NAMI organized a blood donation drive on December 22, 2023, exemplifying the college's commitment to community welfare. The event, marked by festive cheer, saw active participation from students eager to make a meaningful contribution to those in need.",
    publishedAt: isoDate("2023-12-22"),
    happensAt: null,
    venue: "College Premise",
    link: {
      label: "Read the event report",
      href: "https://college.nami.edu.np/event/10/nami-college-a-level-students-embrace-the-spirit-of-giving-through-christmas-bloo",
      destination: "legacy",
    },
    image: null,
  },
  {
    ...entryOf("tour-of-mustang-and-muktinath"),
    kind: "event",
    title: "NAMI A-Levels students Tour of Mustang & Muktinath",
    excerpt:
      "The NAMI organized an enriching 3 Nights, 4 Days Tour for A-Levels students to explore the picturesque region of Mustang and visit the sacred Muktinath temple.",
    publishedAt: isoDate("2023-12-08"),
    happensAt: null,
    venue: "Mustang & Manang",
    link: {
      label: "Read the event report",
      href: "https://college.nami.edu.np/event/11/nami-college-a-levels-students-tour-of-mustang-muktinath",
      destination: "legacy",
    },
    image: null,
  },
  {
    ...entryOf("welcome-programme-kwality-beach-resort"),
    kind: "event",
    title: "NAMI A-Levels: A Welcoming Spectacle at Kwality Beach Resort",
    excerpt:
      "NAMI hosted a vibrant welcome Program on July 29, 2023, for its A-Level students at Kwality Beach Resort, Mulkot, and the event was nothing short of magical.",
    publishedAt: isoDate("2023-07-29"),
    happensAt: null,
    venue: "Mulkot",
    link: {
      label: "Read the event report",
      href: "https://college.nami.edu.np/event/12/nami-a-levels-a-welcoming-spectacle-at-kwality-beach-resort",
      destination: "legacy",
    },
    image: null,
  },
  {
    ...entryOf("eco-club-environment-day"),
    kind: "event",
    title: "Eco Club's Environment Day Program",
    excerpt:
      'NAMI Eco Club orchestrated a captivating Environment Day program that left a lasting impact on approximately 30 participants. The event, dedicated to fostering environmental awareness, featured a thought-provoking photo exhibition and an engaging photo contest centered around the theme of "Nature."',
    publishedAt: isoDate("2023-06-05"),
    happensAt: null,
    venue: "College Premise",
    link: {
      label: "Read the event report",
      href: "https://nami.edu.np/event/208/eco-clubs-environment-day-program",
      destination: "legacy",
    },
    image: ecoClubFrame,
  },
  {
    ...entryOf("mascot-design-competition"),
    kind: "event",
    title:
      "Unleashing Creativity: The Ultimate College Mascot Design Competition",
    excerpt:
      "NAMI organized a one-of-a-kind event, the Ultimate Mascot Design Competition from May 03 to May 11, 2023. Students across faculties unleashed their creativity, drawing inspiration from the college logo and Saraswati's swan symbol.",
    publishedAt: isoDate("2023-05-03"),
    happensAt: null,
    venue: "College Premise",
    link: {
      label: "Read the event report",
      href: "https://nami.edu.np/event/10/unleashing-creativity-the-ultimate-college-mascot-design-competition",
      destination: "legacy",
    },
    image: mascotDesignEntry,
  },
  {
    ...entryOf("elite-2023"),
    kind: "event",
    title: "ELITE 2023",
    excerpt:
      "Elite 2023, an inter-college business competition was meticulously organized to showcase undergraduates' skills in finance, marketing, and management.",
    publishedAt: isoDate("2023-03-31"),
    happensAt: null,
    venue: "City Campus",
    link: {
      label: "Read the event report",
      href: "https://nami.edu.np/event/210/elite-2023",
      destination: "legacy",
    },
    image: eliteCompetition,
  },
  {
    ...entryOf("climate-change-panel-discussion"),
    kind: "event",
    title:
      'Panel Discussion on "Climate Change: Impacts and the Global Response"',
    excerpt:
      "We had insightful conversations on the urgent need for action and the collective efforts required to mitigate the devastating effects of climate change.",
    publishedAt: isoDate("2023-03-23"),
    happensAt: null,
    venue: "City Campus, New Baneshwor",
    link: {
      label: "Read the event report",
      href: "https://nami.edu.np/event/214/panel-discussion-on-climate-change-impacts-and-the-global-response",
      destination: "legacy",
    },
    image: climatePanel,
  },
  {
    ...entryOf("welcome-undergrads-orientation-2022"),
    kind: "event",
    title: "Welcome Undergrads Orientation 2022",
    excerpt:
      "NAMI welcomes the new batch of BSc. Computing, BSc. Environment Science, and BBA Management. The orientation was held at Diamond Hill Resort with a fun-packed orientation session, skillful activities, and a gaming session.",
    publishedAt: isoDate("2022-11-14"),
    happensAt: null,
    venue: "Diamond Hill Resort, Panauti",
    link: {
      label: "Read the event report",
      href: "https://nami.edu.np/event/213/welcome-undergrads-orientation-2022",
      destination: "legacy",
    },
    image: bachelorOrientation,
  },
  {
    ...entryOf("convocation-day-2022"),
    kind: "event",
    title:
      "Triumph and Transition: NAMI's Grand Convocation Day 2022 at YAK & YETI Hotel",
    excerpt:
      "NAMI's Convocation held at the prestigious YAK & YETI Hotel, was a momentous occasion that celebrated the academic achievements of graduates from diverse disciplines. The grand event drew attention not only for the remarkable accomplishments of the graduating class but also for the presence of distinguished personalities from both NAMI and the esteemed University of Northampton.",
    publishedAt: isoDate("2022-09-17"),
    happensAt: null,
    venue: "YAK & YETI Hotel",
    link: {
      label: "Read the event report",
      href: "https://nami.edu.np/event/211/triumph-and-transition-namis-grand-convocation-day-2022-at-yak-yeti-hotel",
      destination: "legacy",
    },
    image: convocationCeremony,
  },
  {
    ...entryOf("world-environment-day-plantation"),
    kind: "event",
    title: "Plantation program on the occasion of World Environment Day",
    excerpt:
      "NAMI organized a Plantation program along with Nature Art Competition in collaboration with WCN (Wildlife Conservation Nepal) and Gokarneshwor Municipality on 5th June at NAMI premises.",
    publishedAt: isoDate("2022-06-05"),
    happensAt: null,
    venue: "College Premise",
    link: {
      label: "Read the event report",
      href: "https://nami.edu.np/event/212/plantation-program-of-ocassion-of-world-environment-day",
      destination: "legacy",
    },
    image: plantationProgramme,
  },
];

export const updates: readonly Update[] = [
  ...published,
  ...placeholderNews,
].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
