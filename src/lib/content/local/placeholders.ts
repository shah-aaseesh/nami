import { entryOf, isoDate } from "../identifiers";
import {
  placeholderData,
  placeholderImage,
  placeholderText,
} from "../placeholder-registry";
import type { Award, ContentImage, ContentLink, Update } from "../types";
import {
  readingHall,
  readingRoom,
  schoolTransport,
  scienceLaboratory,
} from "./images";

export const gokarneshworStreetAddress = placeholderText(
  "institution.campuses[gokarneshwor].streetAddress",
  "address",
  "Placeholder Marg, House No. 00",
);

export const newBaneshworStreetAddress = placeholderText(
  "institution.campuses[new-baneshwor].streetAddress",
  "address",
  "Placeholder Sadak, House No. 00",
);

export const gokarneshworMapUrl = placeholderText(
  "institution.campuses[gokarneshwor].mapUrl",
  "map",
  "https://maps.example/placeholder/gokarneshwor",
);

export const newBaneshworMapUrl = placeholderText(
  "institution.campuses[new-baneshwor].mapUrl",
  "map",
  "https://maps.example/placeholder/new-baneshwor",
);

export const whatsappContactLink = placeholderData<ContentLink>(
  "institution.contact.whatsapp",
  "contact",
  {
    label: "WhatsApp",
    href: "https://wa.example/placeholder/nami-college",
    destination: "external",
  },
);

export const schoolContactPhone = placeholderText(
  "institution.contact.byEntity.school.phone",
  "contact",
  "+977 1 4XXXXX1",
);

export const schoolContactEmail = placeholderText(
  "institution.contact.byEntity.school.email",
  "contact",
  "admissions@namischool.example",
);

export const collegeContactPhone = placeholderText(
  "institution.contact.byEntity.college.phone",
  "contact",
  "+977 1 4XXXXX2",
);

export const collegeContactEmail = placeholderText(
  "institution.contact.byEntity.college.email",
  "contact",
  "admissions@namicollege.example",
);

export const plusTwoAdmissionLink: ContentLink = {
  label: "Visit College Website",
  href: "https://college.nami.edu.np/",
  destination: "external",
};

export const bachelorMasterAdmissionLink: ContentLink = {
  label: "Visit College Website",
  href: "https://college.nami.edu.np/",
  destination: "external",
};

export const preRegistrationNoticeExcerpt = placeholderText(
  "updates[pre-registration-open-for-a-level].excerpt",
  "update",
  "Placeholder summary. NAMI's own notice carries this headline and no body text, so there is nothing yet to quote here.",
);

export const partnerLogoStandIn: ContentImage = placeholderImage(
  "partners[*].logo",
  {
    src: "/logo/nami-color.svg",
    alt: "Placeholder partner logo. NAMI’s own mark stands in on every partner tile until the client supplies the partners’ artwork.",
    width: 1000,
    height: 1000,
  },
);

export const placeholderUpdates: readonly Update[] = [
  placeholderData<Update>("updates[news-placeholder-long]", "update", {
    ...entryOf("news-placeholder-long"),
    kind: "news",
    category: "general",
    institution: null,
    title:
      "General Notice from the NAMI Group to Students, Staff and Families Across Every Campus",
    excerpt:
      "A general notice from the NAMI Group for students, staff and families across every campus.",
    publishedAt: isoDate("2024-03-15"),
    happensAt: null,
    venue: null,
    link: null,
    image: null,
  }),
  placeholderData<Update>("updates[news-placeholder-medium]", "update", {
    ...entryOf("news-placeholder-medium"),
    kind: "news",
    category: "results",
    institution: null,
    title: "General Notice from the NAMI Group",
    excerpt: "A general notice from the NAMI Group.",
    publishedAt: isoDate("2023-11-10"),
    happensAt: null,
    venue: null,
    link: null,
    image: null,
  }),
  placeholderData<Update>("updates[news-placeholder-short]", "update", {
    ...entryOf("news-placeholder-short"),
    kind: "news",
    category: "holidays",
    institution: null,
    title: "NAMI Group Notice",
    excerpt: "A short notice from the NAMI Group.",
    publishedAt: isoDate("2023-09-05"),
    happensAt: null,
    venue: null,
    link: null,
    image: null,
  }),

  placeholderData<Update>("updates[school-placeholder-uniform]", "update", {
    ...entryOf("school-placeholder-uniform"),
    kind: "notice",
    category: "admissions",
    institution: "school",
    title: "Uniform and Stationery Collection Window",
    excerpt:
      "A notice from NAMI International School about the collection window for uniform and stationery.",
    publishedAt: isoDate("2026-07-14"),
    happensAt: null,
    venue: null,
    link: null,
    image: schoolTransport,
  }),
  placeholderData<Update>("updates[school-placeholder-sports-day]", "update", {
    ...entryOf("school-placeholder-sports-day"),
    kind: "event",
    category: "events",
    institution: "school",
    title: "Junior School Sports Day",
    excerpt:
      "An event notice from NAMI International School announcing the junior school sports day.",
    publishedAt: isoDate("2026-06-02"),
    happensAt: isoDate("2026-09-12"),
    venue: "Placeholder Ground",
    link: null,
    image: readingRoom,
  }),
  placeholderData<Update>("updates[school-placeholder-library]", "update", {
    ...entryOf("school-placeholder-library"),
    kind: "news",
    category: "general",
    institution: "school",
    title: "Junior Library Reopens After Refurbishment",
    excerpt:
      "A notice from NAMI International School announcing that the junior library has reopened after refurbishment.",
    publishedAt: isoDate("2026-03-19"),
    happensAt: null,
    venue: null,
    link: null,
    image: readingHall,
  }),
  placeholderData<Update>("updates[school-placeholder-parents]", "update", {
    ...entryOf("school-placeholder-parents"),
    kind: "notice",
    category: "examinations",
    institution: "school",
    title: "Parents' Evening Scheduling",
    excerpt:
      "A notice from NAMI International School about the scheduling of the next parents' evening.",
    publishedAt: isoDate("2025-11-05"),
    happensAt: null,
    venue: null,
    link: null,
    image: scienceLaboratory,
  }),

  placeholderData<Update>(
    "updates[college-placeholder-registration]",
    "update",
    {
      ...entryOf("college-placeholder-registration"),
      kind: "notice",
      category: "admissions",
      institution: "college",
      title: "A-Level Registration Window",
      excerpt:
        "A notice from the college about the A-Level registration window.",
      publishedAt: isoDate("2026-07-28"),
      happensAt: null,
      venue: null,
      link: {
        label: "Read the notice",
        href: "https://placeholder.example/nami-registration",
        destination: "external",
      },
      image: readingHall,
    },
  ),
  placeholderData<Update>("updates[college-placeholder-quiz]", "update", {
    ...entryOf("college-placeholder-quiz"),
    kind: "event",
    category: "events",
    institution: "college",
    title: "Inter-House Quiz Final",
    excerpt: "An event notice announcing the college's inter-house quiz final.",
    publishedAt: isoDate("2026-05-20"),
    happensAt: isoDate("2026-08-29"),
    venue: "Placeholder Hall",
    link: null,
    image: readingRoom,
  }),
  placeholderData<Update>(
    "updates[college-placeholder-orientation]",
    "update",
    {
      ...entryOf("college-placeholder-orientation"),
      kind: "event",
      category: "events",
      institution: "college",
      title: "A-Level Intake Orientation",
      excerpt: "An event notice for the college's A-Level intake orientation.",
      publishedAt: isoDate("2025-08-11"),
      happensAt: isoDate("2025-08-24"),
      venue: "Placeholder Auditorium",
      link: null,
      image: schoolTransport,
    },
  ),
  placeholderData<Update>("updates[college-placeholder-results]", "update", {
    ...entryOf("college-placeholder-results"),
    kind: "news",
    category: "results",
    institution: "college",
    title: "A Note on the Last Examination Session",
    excerpt: "A note from the college on the last examination session.",
    publishedAt: isoDate("2025-06-27"),
    happensAt: null,
    venue: null,
    link: null,
    image: scienceLaboratory,
  }),

  placeholderData<Update>("updates[institute-placeholder-thesis]", "update", {
    ...entryOf("institute-placeholder-thesis"),
    kind: "notice",
    category: "examinations",
    institution: "institute",
    title: "Undergraduate Thesis Submission",
    excerpt:
      "A notice from Naaya Aayam Multi-Disciplinary Institute about undergraduate thesis submission.",
    publishedAt: isoDate("2026-07-02"),
    happensAt: null,
    venue: null,
    link: null,
    image: readingRoom,
  }),
  placeholderData<Update>("updates[institute-placeholder-research]", "update", {
    ...entryOf("institute-placeholder-research"),
    kind: "event",
    category: "events",
    institution: "institute",
    title: "Undergraduate Research Day",
    excerpt: "An event notice for the institute's undergraduate research day.",
    publishedAt: isoDate("2026-04-08"),
    happensAt: isoDate("2026-10-03"),
    venue: "Placeholder Campus",
    link: null,
    image: scienceLaboratory,
  }),
  placeholderData<Update>(
    "updates[institute-placeholder-partnership]",
    "update",
    {
      ...entryOf("institute-placeholder-partnership"),
      kind: "news",
      category: "holidays",
      institution: "institute",
      title: "Institute Partnership Announcement",
      excerpt:
        "An announcement from the institute regarding an academic partnership.",
      publishedAt: isoDate("2026-01-16"),
      happensAt: null,
      venue: null,
      link: null,
      image: readingHall,
    },
  ),
  placeholderData<Update>("updates[institute-placeholder-careers]", "update", {
    ...entryOf("institute-placeholder-careers"),
    kind: "event",
    category: "events",
    institution: "institute",
    title: "Graduate Careers Fair",
    excerpt: "An event notice for the institute's graduate careers fair.",
    publishedAt: isoDate("2025-09-30"),
    happensAt: isoDate("2025-10-18"),
    venue: "Placeholder Campus",
    link: null,
    image: schoolTransport,
  }),

  placeholderData<Update>("updates[college-placeholder-timetable]", "update", {
    ...entryOf("college-placeholder-timetable"),
    kind: "notice",
    category: "general",
    institution: "college",
    title: "Revised Class Timetable",
    excerpt: "A notice from the college about a revised class timetable.",
    publishedAt: isoDate("2025-12-01"),
    happensAt: null,
    venue: null,
    link: null,
    image: null,
  }),
  placeholderData<Update>("updates[institute-placeholder-library]", "update", {
    ...entryOf("institute-placeholder-library"),
    kind: "notice",
    category: "general",
    institution: "institute",
    title: "Library Access Hours Update",
    excerpt:
      "A notice from the institute about an update to library access hours.",
    publishedAt: isoDate("2025-10-06"),
    happensAt: null,
    venue: null,
    link: null,
    image: null,
  }),

  placeholderData<Update>(
    "updates[press-release-placeholder-group]",
    "update",
    {
      ...entryOf("press-release-placeholder-group"),
      kind: "press-release",
      category: "general",
      institution: null,
      title: "A Statement from the NAMI Group",
      excerpt: "A press statement from the NAMI Group.",
      publishedAt: isoDate("2026-02-11"),
      happensAt: null,
      venue: null,
      link: null,
      image: null,
    },
  ),
  placeholderData<Update>(
    "updates[press-release-placeholder-college]",
    "update",
    {
      ...entryOf("press-release-placeholder-college"),
      kind: "press-release",
      category: "general",
      institution: "college",
      title: "A College Announcement to the Press",
      excerpt: "A press statement from the college.",
      publishedAt: isoDate("2025-05-19"),
      happensAt: null,
      venue: null,
      link: null,
      image: null,
    },
  ),
];

export const placeholderAwards: readonly Award[] = [
  placeholderData<Award>(
    "aboutCopy.awards[award-placeholder-teaching]",
    "update",
    {
      ...entryOf("award-placeholder-teaching"),
      title: "Excellence in Teaching and Learning",
      awardingBody: "National education awards panel",
      year: 2024,
      citation:
        "Placeholder award. NAMI's real awards list is still owed from the client, and every entry in this section must be replaced before launch.",
    },
  ),
  placeholderData<Award>(
    "aboutCopy.awards[award-placeholder-emerging]",
    "update",
    {
      ...entryOf("award-placeholder-emerging"),
      title: "Best Emerging Institution",
      awardingBody: "Regional schools association",
      year: 2022,
      citation:
        "Placeholder award, standing in until the client supplies NAMI's real recognition record.",
    },
  ),
  placeholderData<Award>(
    "aboutCopy.awards[award-placeholder-students]",
    "update",
    {
      ...entryOf("award-placeholder-students"),
      title: "Outstanding Student Achievement",
      awardingBody: "Inter-college academic council",
      year: 2020,
      citation:
        "Placeholder award. The citation that belongs here is owed from the client and has not been supplied.",
    },
  ),
  placeholderData<Award>(
    "aboutCopy.awards[award-placeholder-sustainability]",
    "update",
    {
      ...entryOf("award-placeholder-sustainability"),
      title: "Campus Sustainability Commendation",
      awardingBody: "City sustainability forum",
      year: 2018,
      citation:
        "Placeholder award, seeded so this section can be reviewed. NAMI's real awards are still owed from the client.",
    },
  ),
];
