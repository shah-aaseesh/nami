import type { InstitutionGalleryCopy } from "@/components/shared/institution-gallery";
import type { InstitutionNoticesCopy } from "@/components/shared/institution-notices";
import type { ContentImage, SectionCopy, Testimonial } from "@/lib/content";
import { entryOf, richText, schoolGrades } from "@/lib/content";
import type { SchoolAdmissionCopy } from "./school-admission";
import type { SchoolBandsCopy } from "./school-bands";
import type { SchoolDayCopy } from "./school-day";
import type { SchoolMastheadCopy } from "./school-masthead";

// Stand-in portrait until the school supplies its own — Asmit directive 2026-08-11.
const principalPortrait: ContentImage = {
  src: "/nami/principal-philip-badikar-hilario.jpg",
  alt: "Philip Badikar Hilario, A Level Principal at NAMI College, standing in a checked jacket and holding a folder.",
  width: 233,
  height: 430,
};

const masthead: SchoolMastheadCopy = {
  heading: "Nurturing minds, shaping tomorrow together.",
  standfirst:
    "A primary division that opened in 2024 and a National Examination Board +2 that has run since 2019, on one campus in Gokarneshwor. Registered under the Ministry of Education in Nepal.",
  cta: {
    label: "Start an admission",
    href: "/admissions",
    destination: "internal",
  },
  admissionLabel: "Admission",
  campusLabel: "Campus",
  phoneLabel: "Admissions line",
};

const bands: SchoolBandsCopy = {
  eyebrow: "Academics",
  heading: "A primary division and a +2, under one roof.",
  standfirst: `The primary division teaches ${schoolGrades.labelPlural} within the framework of the Government of Nepal's National Curriculum. The +2 runs at Grades 11 and 12, in Science and Management, under the National Examination Board.`,
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
      },
    ],
  },
};

const day: SchoolDayCopy = {
  eyebrow: "A day at NAMI",
  heading: "Care is the first thing a child is taught here.",
  standfirst:
    "The school sets out to be a place where every child feels seen, heard and supported — and the campus is built around that rather than around the timetable.",
  approachLabel: "How the school teaches",
  approach: [
    {
      title: "Progressive education",
      body: "Holistic development first: creativity, critical thinking and inquiry-based learning, with teachers emphasising teamwork over instruction.",
    },
    {
      title: "A values-driven curriculum",
      body: "Respect, kindness, honesty and ethical behaviour are taught inside the ordinary subjects rather than bolted on beside them.",
    },
    {
      title: "A caring, inclusive atmosphere",
      body: "Differences are celebrated and every child is meant to feel important and included. Parents are treated as essential partners in the child's education.",
    },
    {
      title: "Service and the environment",
      body: "Community service programmes let students help others from a young age, and the school runs sustainable practices as an environmentally conscious institution.",
    },
  ],
  campusLabel: "What the campus holds",
  campus: [
    {
      title: "Three meals a day",
      body: "Breakfast, lunch and a snack for students of Grade 1 to 5, with a separate canteen for Grades 11 and 12.",
    },
    {
      title: "Fields and courts",
      body: "A mini football field, an NBA-standard basketball court, a table tennis court and an outdoor play area for the juniors.",
    },
    {
      title: "Science laboratories",
      body: "Biology, Chemistry and Physics laboratories for hands-on study and experience of scientific method.",
    },
    {
      title: "Computer laboratories",
      body: "Laboratories in both the junior and senior buildings, each furnished with computer systems on high-speed internet.",
    },
    {
      title: "Digital classrooms",
      body: "Interactive boards in the classrooms, used as an everyday teaching tool rather than a showpiece.",
    },
    {
      title: "Library",
      body: "A school library for leisure reading, with classroom libraries kept in the primary grades.",
    },
    {
      title: "Infirmary and counsellor",
      body: "A fully equipped infirmary with trained medical staff on duty through school hours, and a qualified psycho-social counsellor for students and teachers.",
    },
    {
      title: "Auditorium",
      body: "A fully equipped auditorium seating 300 for assemblies, performing arts shows and exhibitions.",
    },
    {
      title: "Air-conditioned classrooms",
      body: "Learning spaces are air-conditioned so they stay comfortable through the year.",
    },
    {
      title: "Transport",
      body: "Bus service picking up and dropping off students at set points.",
    },
  ],
};

const parents: SectionCopy = {
  navLabel: "Parents",
  eyebrow: "Parent voices",
  heading: "Six families, on the school their children come home from.",
  standfirst:
    "Parents across the primary division and the +2 years, on the teaching, the pastoral care, and what the first weeks actually felt like.",
  cta: null,
  emptyState:
    "Parent accounts of the school appear here as families share them.",
};

// Written in-house as stand-ins until the school supplies attributed parent quotes.
export const dummyParentTestimonials: readonly Testimonial[] = [
  {
    ...entryOf("parent-sarita-adhikari"),
    quote:
      "We were nervous about the jump into Grade 11 — the science load is real. But the laboratories are properly staffed, and her teachers flagged where she was slipping before we ever had to ask. She has found her footing.",
    name: "Sarita Adhikari",
    programme: "Parent, Grade 11 Science",
    institution: "school",
    graduatedYear: null,
    portrait: null,
  },
  {
    ...entryOf("parent-prakash-maharjan"),
    quote:
      "He started Grade 1 barely speaking to anyone. Six months on he is telling us about his service-learning group over dinner and correcting my Mandarin. Three meals a day quietly took a load off our mornings too.",
    name: "Prakash Maharjan",
    programme: "Parent of a Grade 1 student",
    institution: "school",
    graduatedYear: null,
    portrait: null,
  },
  {
    ...entryOf("parent-bikash-shrestha"),
    quote:
      "My son went quiet for most of a term and I did not know how to reach him. The counsellor did — patiently, and without making him feel like a problem to be solved. That kind of care is not on any syllabus.",
    name: "Bikash Shrestha",
    programme: "Parent of a Grade 6 student",
    institution: "school",
    graduatedYear: null,
    portrait: null,
  },
  {
    ...entryOf("parent-rekha-tamang"),
    quote:
      "The admissions office rang us the week we registered and walked us through the whole thing. The Principal's orientation answered questions we had not thought to ask, and the tour afterwards is what decided it for us.",
    name: "Rekha Tamang",
    programme: "Parent of a Grade 2 student",
    institution: "school",
    graduatedYear: null,
    portrait: null,
  },
  {
    ...entryOf("parent-sunita-karki"),
    quote:
      "What I did not expect was how much of the day is spent doing rather than copying. My daughter comes home with clay on her sleeves and a Mandarin word she wants us to learn, and the boards are used for teaching, not for show.",
    name: "Sunita Karki",
    programme: "Parent of a Grade 4 student",
    institution: "school",
    graduatedYear: null,
    portrait: null,
  },
  {
    ...entryOf("parent-deepak-bhattarai"),
    quote:
      "Both our children have gone through the +2 here, Management and then Science. The career counselling and the internship placements are what set it apart — and the auditorium has held more of our family evenings than I can count.",
    name: "Deepak Bhattarai",
    programme: "Parent, Grades 11 and 12",
    institution: "school",
    graduatedYear: null,
    portrait: null,
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
  callHeading: "Ready to enrol?",
  callBody:
    "The admissions team will guide you through every step. Call the school, or start the enquiry online and they will come back to you.",
  cta: {
    label: "Start an admission",
    href: "/admissions",
    destination: "internal",
  },
  phoneLabel: "Call the school",
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
  campusSlug: "gokarneshwor",
  levelSlug: "school",
  masthead,
  bands,
  principal: {
    slug: "leader-anisha-joshi",
    eyebrow: "From the Principal",
    heading:
      "We embrace each child as an individual, with unique talent and potential.",
    portrait: principalPortrait,
    message: richText(
      "My personal and professional commitment at NAMI International School is to guide the growth of students and ensure a nurturing environment for all.",
      "At NAMI International School, we hold a deep conviction that education should be a catalyst for bringing out the best in every child. We work towards enhancing knowledge, skill, ability and the overall potential of individuals to become successful and ready for a world that never ceases to change.",
      "As my understanding of the world deepens, so does my conviction that we need to raise a generation of empathetic and compassionate individuals. It is therefore crucial to instil a culture of care from an early age, both within the household and the school environment. This entails acknowledging parents as essential partners in moulding the educational path of the child.",
      "Keeping the above in mind, our school curriculum is crafted through extensive research and is designed to address various facets of development — cognitive, social-emotional, physical and creative. We aim to instil a genuine love for learning in our students, and therefore embrace each child as an individual with unique talent and potential.",
      "Academics at NAMI International School are not just about grades. Our focus is on creating an inclusive and caring community where every child feels seen, heard and supported in all manner of ways.",
      "Together with my team, we are dedicated to creating a centre of excellence in education, empowering students to become resilient lifelong learners and positive agents of change.",
    ),
  },
  day,
  parents,
  admission,
  gallery,
  notices,
} as const;
