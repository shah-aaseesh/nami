import { entryOf, isoDate } from "../identifiers";
import type { Update } from "../types";
import { basketballPrizeGiving } from "./images";

export const updates: readonly Update[] = [
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
    ...entryOf("social-camp"),
    kind: "event",
    title: "Social Camp",
    excerpt:
      "NAMI College organized a transformative Social Camp at Shree Ganesh Basic School in Sindhupalchowk from January 27th to 28th, aimed at making a positive impact on the local community. The primary focus of the event was to extend assistance to underprivileged children and uplift the overall welfare of the community.",
    publishedAt: isoDate("2024-01-27"),
    happensAt: null,
    venue: "Sindhupalchowk",
    link: {
      label: "Read the event report",
      href: "https://college.nami.edu.np/event/13/social-camp",
      destination: "legacy",
    },
    image: null,
  },
  {
    ...entryOf("christmas-blood-donation-drive"),
    kind: "event",
    title:
      "NAMI College A-Level Students Embrace the Spirit of Giving through Christmas Blood Donation Drive",
    excerpt:
      "In the spirit of Christmas, A-Level students at NAMI College organized a blood donation drive on December 22, 2023, exemplifying the college's commitment to community welfare. The event, marked by festive cheer, saw active participation from students eager to make a meaningful contribution to those in need.",
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
    title: "NAMI College A-Levels students Tour of Mustang & Muktinath",
    excerpt:
      "The NAMI College organized an enriching 3 Nights, 4 Days Tour for A-Levels students to explore the picturesque region of Mustang and visit the sacred Muktinath temple.",
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
      "NAMI College hosted a vibrant welcome Program on July 29, 2023, for its A-Level students at Kwality Beach Resort, Mulkot, and the event was nothing short of magical.",
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
];
