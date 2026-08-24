import type { InstitutionGalleryCopy } from "@/components/shared/institution-gallery";
import type { InstitutionNoticesCopy } from "@/components/shared/institution-notices";
import type { SharedHeroSlide } from "@/components/shared/shared-hero";
import type { ContentLink, SectionCopy, Testimonial } from "@/lib/content";
import { entryOf, schoolGrades } from "@/lib/content";
import { pragatiRaiPortrait } from "@/lib/content/local/images";
import type { SchoolAdmissionCopy } from "./school-admission";
import type { SchoolBandsCopy } from "./school-bands";
import type { SchoolDayCopy } from "./school-day";

export type SchoolHeroCopy = {
  readonly eyebrow: string;
  readonly tagline: string;
  readonly heroLabel: string;
  readonly slides: readonly SharedHeroSlide[];
  readonly admissionCta: ContentLink;
};

const heroSlides: readonly SharedHeroSlide[] = [
  {
    src: "/nami/campus-service-camp.jpg",
    alt: "Pupils in red uniforms seated around a hilltop school ground in Sindhupalchowk, facing stacks of red relief bags laid out on benches at a NAMI service camp.",
    width: 1190,
    height: 793,
  },
  {
    src: "/nami/campus-science-lab.jpg",
    alt: "A NAMI chemistry laboratory, reagent bottles ranked on shelves above long benches fitted with sinks, burettes and retort stands.",
    width: 1280,
    height: 853,
  },
  {
    src: "/nami/campus-library.jpg",
    alt: "A NAMI reading hall, long study desks ranked beneath ceiling fans with a projection screen at the far end and a silence notice on the wall.",
    width: 1280,
    height: 853,
  },
  {
    src: "/nami/campus-basketball-award.jpg",
    alt: "Prize-giving for the NAMI SEE 3x3 Basketball Tournament on the college auditorium stage, both teams wearing medals and holding certificates behind the winners' trophy and the tournament cheques.",
    width: 1500,
    height: 1000,
  },
  {
    src: "/nami/campus-auditorium.jpg",
    alt: "Students and staff seated on sofas and stacking chairs in the NAMI auditorium, maroon acoustic panelling on the wall behind them.",
    width: 999,
    height: 666,
  },
];

const masthead: SchoolHeroCopy = {
  eyebrow: "Gokarneshwor-7, Kathmandu",
  tagline: `From ${schoolGrades.labelPlural} to +2 in Science and Management.`,
  heroLabel: "NAMI International School",
  slides: heroSlides,
  admissionCta: {
    label: "Apply for admission",
    href: "/admissions",
    destination: "internal",
  },
};

const bands: SchoolBandsCopy = {
  eyebrow: "Academics",
  heading: "A primary division and a +2, under one roof.",
  standfirst: `The primary division teaches ${schoolGrades.labelPlural}. The +2 runs at Grades 11 and 12, in Science and Management.`,
  primary: {
    label: schoolGrades.labelPlural,
    affiliationSlug: "neb-school",
    sinceLabel: "Affiliated since",
    enrolment: "176 students in the primary division.",
    body: `NAMI International School offers a diverse and balanced curriculum for ${schoolGrades.labelPlural}, remaining within the framework of the Nepal Government's National Curriculum. Teachers work through experiential learning, and Science and Social Studies are taught through multidisciplinary and transdisciplinary themes.`,
    notes: [
      "Mandarin as a foreign language from Grade I",
      "Computer instruction from the first grade",
      "An interactive board in every classroom",
      "Mathematics centred on problem-solving",
      "Painting, sketching, clay modelling, acting, singing, dancing and instruments",
      "Physical education, and a service-learning project each student runs themselves",
    ],
    streams: [],
  },
  secondary: {
    label: "Grades 11 and 12",
    affiliationSlug: "neb-plus-two",
    sinceLabel: "NEB +2 since",
    enrolment: "350 students in Grade 11, 454 in Grade 12.",
    body: "A rigorous two-year higher secondary programme under the National Examination Board, taught at NAMI International School alongside extracurricular activities, volunteer work, internships and career counselling.",
    notes: [
      "Well-equipped Biology, Chemistry and Physics laboratories",
      "Skilled laboratory technicians alongside the subject teachers",
      "Career counselling and internship placements",
      "A separate canteen for Grades 11 and 12",
    ],
    streams: [
      {
        name: "Science",
        note: "Taught in a biology group and a physical group, with computer science in the physical group.",
        subjects: [
          "Compulsory English",
          "Compulsory Nepali",
          "Social Studies",
          "Mathematics",
          "Physics",
          "Chemistry",
          "Biology",
          "Computer Science",
        ],
        photo: {
          src: "/nami/campus-science-lab.jpg",
          alt: "A NAMI chemistry laboratory, reagent bottles ranked on shelves above long benches fitted with sinks, burettes and retort stands.",
          width: 1280,
          height: 853,
        },
      },
      {
        name: "Management",
        note: "A foundation in the facts and principles of management for students heading into the field.",
        subjects: [
          "Compulsory English",
          "Compulsory Nepali",
          "Social Studies",
          "Accounting",
          "Business Studies",
          "Economics",
          "Computer Science",
          "Hotel Management",
          "Tourism and Mountaineering",
        ],
        photo: {
          src: "/nami/campus-library.jpg",
          alt: "A NAMI reading hall, long study desks ranked beneath ceiling fans with a projection screen at the far end and a silence notice on the wall.",
          width: 1280,
          height: 853,
        },
      },
    ],
  },
  photo: {
    src: "/nami/campus-library.jpg",
    alt: "A NAMI reading hall, long study desks ranked beneath ceiling fans with a projection screen at the far end and a silence notice on the wall.",
    width: 1280,
    height: 853,
  },
};

const day: SchoolDayCopy = {
  eyebrow: "A day at NAMI",
  heading: "Care is the first thing a child is taught here.",
  standfirst:
    "The school sets out to be a place where every child feels seen, heard and supported — and the campus is built around that rather than around the timetable.",
  campusLabel: "What the school holds",
  campus: [
    {
      title: "Three meals a day",
      body: "Breakfast, lunch and a snack for students of Grade 1 to 5, with a separate canteen for Grades 11 and 12.",
      photo: {
        src: "/nami/school/nami-school-cafeteria.jpg",
        alt: "The school cafeteria, wooden tables and chairs ranked across a polished floor beside a glazed partition, with a stainless steel serving counter and a water dispenser against the orange wall.",
        width: 1000,
        height: 1333,
      },
    },
    {
      title: "Fields and courts",
      body: "A mini football field, an NBA-standard basketball court, a table tennis court and an outdoor play area for the juniors.",
      photo: {
        src: "/nami/school/nami-minifootball.jpg",
        alt: "The school's mini football field, a white goal frame standing on a walled lawn edged by a rainbow-coloured railing and terracotta planters.",
        width: 993,
        height: 1051,
      },
    },
    {
      title: "Science laboratories",
      body: "Biology, Chemistry and Physics laboratories for hands-on study and experience of scientific method.",
      photo: {
        src: "/nami/school/nami-school-science-lab.jpg",
        alt: "Students in white lab coats and safety goggles running a titration into a conical flask at a laboratory bench, reagent bottles ranked on the shelves behind them.",
        width: 1000,
        height: 666,
      },
    },
    {
      title: "Computer laboratories",
      body: "Laboratories in both the junior and senior buildings, each furnished with computer systems on high-speed internet.",
      photo: {
        src: "/nami/school/nami-school-computer-lab.jpg",
        alt: "Students in navy blazers and ties working at desktop computers along a row of wooden benches in the computer laboratory.",
        width: 712,
        height: 666,
      },
    },
    {
      title: "Digital classrooms",
      body: "Interactive boards in the classrooms, used as an everyday teaching tool rather than a showpiece.",
      photo: {
        src: "/nami/school/nami-school-digital-classroom.jpeg",
        alt: "A teacher mid-lesson at a wall-mounted interactive board, presenting a red quadrilateral she has drawn on its touchscreen.",
        width: 1125,
        height: 1066,
      },
    },
    {
      title: "Library",
      body: "A school library for leisure reading, with classroom libraries kept in the primary grades.",
      photo: {
        src: "/nami/school/nami-school-library.jpg",
        alt: "A young pupil stretched out reading in a padded yellow hexagonal alcove built into the library wall, beside floor-to-ceiling shelves of picture books.",
        width: 1000,
        height: 1333,
      },
    },
    {
      title: "Infirmary and counsellor",
      body: "A fully equipped infirmary with trained medical staff on duty through school hours, and a qualified psycho-social counsellor for students and teachers.",
      photo: {
        src: "/nami/school/nami-school-infirmity.jpg",
        alt: "The school infirmary, two single beds made up with pale blue linen and folded blankets beneath a wall fan and a curtained window.",
        width: 1000,
        height: 1333,
      },
    },
    {
      title: "Auditorium",
      body: "A fully equipped auditorium seating 300 for assemblies, performing arts shows and exhibitions.",
      photo: {
        src: "/nami/school/nami-international-school-auditorium.jpg",
        alt: "Primary pupils seated in rows of stacking chairs in the school auditorium, watching the front of the hall beneath maroon acoustic panelling.",
        width: 1000,
        height: 1333,
      },
    },
    {
      title: "Air-conditioned classrooms",
      body: "Learning spaces are air-conditioned so they stay comfortable through the year.",
      photo: {
        src: "/nami/school/nami-school-cafeteria.jpg",
        alt: "Ceiling-mounted air-conditioning units running the length of a NAMI dining hall, above wooden tables and chairs ranked across the polished floor.",
        width: 1000,
        height: 1333,
      },
    },
    {
      title: "Transport",
      body: "Bus service picking up and dropping off students at set points.",
      photo: {
        src: "/nami/school/nami-school-bus.jpg",
        alt: "Two yellow NAMI International School minibuses parked in the school forecourt, children looking out from the windows.",
        width: 1000,
        height: 602,
      },
    },
  ],
};

const parents: SectionCopy = {
  navLabel: "Parents",
  eyebrow: "Parent voices",
  heading: "The school their children come home from.",
  standfirst:
    "Parents across the primary division and the +2 years, on the teaching, the pastoral care, and what the first weeks actually felt like.",
  cta: null,
  emptyState:
    "Parent accounts of the school appear here as families share them.",
};

// PLACEHOLDER, not final: every portrait below reuses the same stock content-layer image.
export const parentTestimonials: readonly Testimonial[] = [
  {
    ...entryOf("parent-sarita-adhikari"),
    quote:
      "The jump into Grade 11 science worried us. Her teachers flagged where she was slipping before we had to ask, and the laboratories are properly staffed.",
    name: "Sarita Adhikari",
    programme: "Parent, Grade 11 Science",
    institution: "school",
    graduatedYear: null,
    portrait: pragatiRaiPortrait,
  },
  {
    ...entryOf("parent-prakash-maharjan"),
    quote:
      "He started Grade 1 barely speaking to anyone. Six months on he tells us about his service-learning group over dinner and corrects my Mandarin.",
    name: "Prakash Maharjan",
    programme: "Parent of a Grade 1 student",
    institution: "school",
    graduatedYear: null,
    portrait: pragatiRaiPortrait,
  },
  {
    ...entryOf("parent-bikash-shrestha"),
    quote:
      "My son went quiet for most of a term and I could not reach him. The school counsellor did, patiently, without ever making him feel like a problem.",
    name: "Bikash Shrestha",
    programme: "Parent of a Grade 6 student",
    institution: "school",
    graduatedYear: null,
    portrait: pragatiRaiPortrait,
  },
  {
    ...entryOf("parent-rekha-tamang"),
    quote:
      "Admissions rang us the week we registered and walked us through every step. The Principal's orientation and the tour afterwards are what decided it.",
    name: "Rekha Tamang",
    programme: "Parent of a Grade 2 student",
    institution: "school",
    graduatedYear: null,
    portrait: pragatiRaiPortrait,
  },
  {
    ...entryOf("parent-sunita-karki"),
    quote:
      "She comes home with clay on her sleeves and a Mandarin word she wants us to learn. Far more of her day is spent making things than copying them down.",
    name: "Sunita Karki",
    programme: "Parent of a Grade 4 student",
    institution: "school",
    graduatedYear: null,
    portrait: pragatiRaiPortrait,
  },
  {
    ...entryOf("parent-deepak-bhattarai"),
    quote:
      "Both our children finished +2 here, Management and then Science. The career counselling and the internship placements are what set this school apart.",
    name: "Deepak Bhattarai",
    programme: "Parent, Grades 11 and 12",
    institution: "school",
    graduatedYear: null,
    portrait: pragatiRaiPortrait,
  },
];

const admission: SchoolAdmissionCopy = {
  eyebrow: "Admission",
  heading: "Seven steps, written for parents and guardians.",
  standfirst:
    "This is the school's own procedure, in the order it happens. The admissions office guides you through each step, and step six carries a deadline worth noting.",
  stepLabel: "Step",
  steps: [
    {
      title: "Registration",
      body: "Register your child's name in the admissions log at the school reception, or online through the school website or its social media.",
    },
    {
      title: "Orientation",
      body: "The admissions office contacts you for an orientation: a session by the Principal on the academic programme, followed by a tour of the school.",
    },
    {
      title: "Application",
      body: "Collect the application form from the admissions office. The form is also available online.",
    },
    {
      title: "Application submission",
      body: "Complete the form and return it to the admissions office or submit it online. The office then schedules a placement assessment and an interview — for your child and for you.",
    },
    {
      title: "Notification",
      body: "You and your child are notified of the acceptance status by telephone or email.",
    },
    {
      title: "Admission confirmation",
      body: "On acceptance you receive an acceptance letter and a voucher for a deposit covering the applicable fees. That deposit confirms the seat. If it is not paid by the specified date the seat is forfeited and offered to a student on the waiting list.",
    },
    {
      title: "Open House",
      body: "Parents or guardians attend an Open House to receive the Parent's and Student's Handbook, the curriculum details and the other essential documents.",
    },
  ],
};

const gallery: InstitutionGalleryCopy = {
  eyebrow: "The school, photographed",
  heading: "Ordinary days, as they actually look.",
  standfirst:
    "Assemblies, sports, classrooms and the weeks in between — the school's own record of what a child's day here looks like.",
  ctaLabel: "All school photographs",
};

const notices: InstitutionNoticesCopy = {
  eyebrow: "Notice board",
  heading: "What the school is announcing.",
  standfirst:
    "Admission windows, examination dates, holidays and the standing notices that parents need in front of them.",
  ctaLabel: "All school notices",
  emptyState:
    "There is no school notice standing right now. Everything the school publishes appears here and on the notice board.",
};

export const schoolCopy = {
  meta: {
    title: "NAMI International School",
    description: `NAMI International School teaches ${schoolGrades.labelPlural} within the Government of Nepal's National Curriculum and NEB +2 in Science and Management at Gokarneshwor-7, Kathmandu.`,
  },
  levelSlug: "school",
  masthead,
  bands,
  day,
  parents,
  admission,
  gallery,
  notices,
} as const;
