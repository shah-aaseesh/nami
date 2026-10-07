import type { InstitutionGalleryCopy } from "@/components/shared/institution-gallery";
import type { InstitutionNoticesCopy } from "@/components/shared/institution-notices";
import type { SharedHeroSlide } from "@/components/shared/shared-hero";
import type { ContentLink, SectionCopy, Testimonial } from "@/lib/content";
import { entryOf, schoolGrades } from "@/lib/content";
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
    src: "/hero/contact/contact-hero.jpg",
    alt: "NAMI International School campus and student life.",
    width: 1500,
    height: 1000,
  },
  {
    src: "/hero/gallery/gallery-hero.jpg",
    alt: "NAMI International School learning environment and activities.",
    width: 1500,
    height: 1000,
  },
  {
    src: "/hero/notices/notices-hero.jpg",
    alt: "NAMI International School classroom and academic sessions.",
    width: 1500,
    height: 1000,
  },
  {
    src: "/hero/documents/documents-hero.jpg",
    alt: "NAMI International School student activities and sports.",
    width: 1500,
    height: 1000,
  },
  {
    src: "/hero/faculty/faculty-hero.jpg",
    alt: "NAMI International School events and community.",
    width: 1500,
    height: 1000,
  },
  {
    src: "/sections/general/32.jpg",
    alt: "NAMI International School facilities and grounds.",
    width: 1500,
    height: 1000,
  },
  {
    src: "/sections/general/33.jpg",
    alt: "NAMI International School cultural and creative programmes.",
    width: 1500,
    height: 1000,
  },
  {
    src: "/sections/general/34.jpg",
    alt: "NAMI International School academic excellence and practical sessions.",
    width: 1500,
    height: 1000,
  },
  {
    src: "/sections/general/35.jpg",
    alt: "NAMI International School student leadership and collaboration.",
    width: 1500,
    height: 1000,
  },
  {
    src: "/sections/general/36.jpg",
    alt: "NAMI International School holistic education and celebration.",
    width: 1500,
    height: 1000,
  },
];

const masthead: SchoolHeroCopy = {
  eyebrow: "Gokarneshwor-7, Kathmandu",
  tagline: `Nurturing Minds, Shaping Tomorrow Together! From Grades ${schoolGrades.first} through ${schoolGrades.last} and +2 in Science and Management.`,
  heroLabel: "NAMI International School",
  slides: heroSlides,
  admissionCta: {
    label: "Apply for Admission",
    href: "/admissions",
    destination: "internal",
  },
};

const bands: SchoolBandsCopy = {
  eyebrow: "Academics",
  standfirst:
    "A progressive education approach grounded in meaningful learning, student participation, inclusion, values, creativity, and personal growth.",
  primary: {
    label: schoolGrades.labelPlural,
    affiliationSlug: "neb-school",
    sinceLabel: "National Curriculum",
    enrolment: "Progressive Education from Grades I to VII",
    body: "NAMI International School offers education from Grades I to VII, following the Nepal Government's National Curriculum through a progressive approach to teaching and learning. Our Grades I to VII programme provides students with strong academic foundations while giving them opportunities to explore, create, collaborate, communicate, and apply what they learn.",
    notes: [
      "Curriculum across Languages, Mathematics, Science & Tech, Serophero, Samajik Shikshya, Mero Gokarneshwor, Positive Living, HPE & Creative Arts",
      "English is the primary language of instruction with a strong emphasis on Nepali, plus Mandarin Chinese and Sanskrit language learning",
      "Active learning through morning circles, exploration, research, projects, experiments, problem-solving, reflection, and real-world application",
      "Continuous assessment through classwork, assignments, projects, practical activities, and interactive engagement",
      "Learning collaborations with 3Di School (Design & Tech), Play Nepal (Movement & Wellness), UnMath (Joyful Math), Mero Coding (Coding & Computational Thinking), and Samatva Wellness",
      "Co-curricular activities in Art & Craft, Music, Dance, Public Speaking, Football, Basketball, Karate, Cricksal, Swimming, Table Tennis & Badminton",
      "Curriculum-related educational trips (2 per term in Kathmandu Valley) plus optional national and international experiential learning trips",
      "Strong parent partnership with parent representative roles, guest speaking, classroom support, and regular communication",
    ],
    streams: [
      {
        name: "Grades I - III",
        note: "Foundational academic programme developing early literacy, numeracy, positive living, local knowledge, and foreign languages.",
        subjects: [
          "English Language Arts",
          "Nepali Language Arts",
          "Mathematics",
          "Serophero",
          "Mero Gokarneshwor",
          "Positive Living",
          "Mandarin Chinese",
          "Sanskrit",
        ],
        photo: {
          src: "/sections/general/9.jpg",
          alt: "Primary students exploring books and interactive materials in the school library.",
          width: 1600,
          height: 1200,
        },
      },
      {
        name: "Grades IV - VII",
        note: "Comprehensive progressive curriculum integrating core academics, scientific inquiry, social studies, creative arts, and continuous assessment.",
        subjects: [
          "English Language Arts",
          "Nepali Language Arts",
          "Mathematics",
          "Science and Technology",
          "Samajik Shikshya",
          "Mero Gokarneshwor",
          "Positive Living",
          "Health, Physical Education & Creative Arts",
          "Mandarin Chinese",
          "Sanskrit",
        ],
        photo: {
          src: "/sections/general/10.jpg",
          alt: "Middle school students learning collaboratively in interactive digital classrooms.",
          width: 1600,
          height: 1066,
        },
      },
    ],
  },
  secondary: {
    label: "Grades XI and XII (+2)",
    affiliationSlug: "neb-plus-two",
    sinceLabel: "NEB +2 since",
    enrolment: "Management & Science Streams under NEB",
    body: "NAMI's Secondary School offers Grades XI and XII (+2) programmes in Management and Science under the National Examination Board (NEB). The programme combines academic learning with practical experiences, career guidance, internships, competitions, educational visits, and national and international exposure.",
    notes: [
      "In-house well-equipped Biology, Chemistry, and Physics laboratories with skilled laboratory technicians",
      "Career counselling and guidance helping students explore pathways and prepare for higher education",
      "Internship opportunities, hotel visits, biology excursions, industry visits, and educational tours",
      "Student clubs: Sports Club, Art and Literature Club, Event Management Club, Social Service Club, and Science & Technology Club",
      "Sports competitions in futsal, basketball, table tennis, chess, carrom, shot put, tug of war, and annual Sports Meet",
      "National and international exposure trips fostering independence, adaptability, and cultural understanding",
      "Modern facilities: Air-conditioned classrooms, 250+ seat auditorium, computer labs, library, infirmary, and school canteen",
    ],
    streams: [
      {
        name: "Science Stream",
        note: "Offers Biology Group (A), Biology Group (B), and Physical Group (Computer Science) with well-equipped in-house laboratories and skilled technicians applying theory to practice.",
        subjectGroups: [
          {
            title: "Biology Group (A)",
            subjects: [
              "Comp. Nepali",
              "Comp. English",
              "Mathematics",
              "Physics",
              "Chemistry",
              "Biology",
            ],
          },
          {
            title: "Biology Group (B)",
            subjects: [
              "Comp. Nepali",
              "Comp. English",
              "Social Studies",
              "Physics",
              "Chemistry",
              "Biology",
            ],
          },
          {
            title: "Physical Group (Computer)",
            subjects: [
              "Comp. Nepali",
              "Comp. English",
              "Mathematics",
              "Physics",
              "Chemistry",
              "Computer Science",
            ],
          },
        ],
        photo: {
          src: "/sections/general/16.jpg",
          alt: "NAMI Science Stream laboratory with chemistry workstations and apparatus.",
          width: 1280,
          height: 853,
        },
      },
      {
        name: "Management Stream",
        note: "Offers Business Studies, Computer Science, and Hotel Management groups providing a solid foundational understanding of management facts and principles.",
        subjectGroups: [
          {
            title: "Business Studies",
            subjects: [
              "Comp. Nepali",
              "Comp. English",
              "Social Studies",
              "Accounting",
              "Economics",
              "Business Studies",
            ],
          },
          {
            title: "Computer Science",
            subjects: [
              "Comp. Nepali",
              "Comp. English",
              "Social Studies / Mathematics",
              "Accounting",
              "Economics",
              "Computer Science",
            ],
          },
          {
            title: "Hotel Management",
            subjects: [
              "Comp. Nepali",
              "Comp. English",
              "Social Studies",
              "Accounting",
              "Economics",
              "Hotel Management",
            ],
          },
        ],
        photo: {
          src: "/sections/general/15.jpg",
          alt: "NAMI Management stream classroom and facilities.",
          width: 1280,
          height: 853,
        },
      },
    ],
  },
  photo: {
    src: "/sections/nami/campus-library.jpg",
    alt: "A NAMI reading hall, long study desks ranked beneath ceiling fans with a projection screen at the far end and a silence notice on the wall.",
    width: 1280,
    height: 853,
  },
};

const day: SchoolDayCopy = {
  eyebrow: "Facilities & Student Experience",
  heading: "School & Learning Environment",
  standfirst:
    "NAMI International School provides facilities designed to support learning, creativity, technology, physical development, and student well-being.",
  campusLabel: "Facilities",
  campus: [
    {
      title: "School Library",
      body: "A well-resourced school library for study, research, and leisure reading, with dedicated classroom libraries in the primary grades.",
      photo: {
        src: "/sections/general/8.jpg",
        alt: "A well-resourced school library for study, research, and leisure reading.",
        width: 1280,
        height: 960,
      },
    },
    {
      title: "Science Laboratories",
      body: "In-house, well-equipped Biology, Chemistry, and Physics laboratories staffed with skilled technicians to apply scientific theories to practical experiments.",
      photo: {
        src: "/sections/nami/nami-school-science-lab.jpg",
        alt: "Students in white lab coats and safety goggles running a titration into a conical flask at a laboratory bench, reagent bottles ranked on the shelves behind them.",
        width: 1000,
        height: 666,
      },
    },
    {
      title: "Computer Laboratories",
      body: "Modern computer laboratories in both junior and senior wings, each furnished with computer workstations on high-speed internet.",
      photo: {
        src: "/sections/general/14.jpg",
        alt: "Modern computer laboratories equipped with high-speed workstations for interactive learning.",
        width: 1280,
        height: 960,
      },
    },
    {
      title: "Digital Classrooms & Interactive Boards",
      body: "Interactive smart boards in every classroom used as an everyday active teaching tool, with air-conditioned spaces for comfortable learning year-round.",
      photo: {
        src: "/sections/nami/nami-school-digital-classroom.jpeg",
        alt: "A teacher mid-lesson at a wall-mounted interactive board, presenting a red quadrilateral she has drawn on its touchscreen.",
        width: 1125,
        height: 1066,
      },
    },
    {
      title: "250+ Seat Auditorium",
      body: "A fully equipped auditorium with a 250+ seat capacity and quality acoustic sound system for school assemblies, cultural fests, presentations, and events.",
      photo: {
        src: "/sections/general/12.jpg",
        alt: "A fully equipped 250+ seat auditorium with acoustic sound system for assemblies, cultural fests, and events.",
        width: 1600,
        height: 811,
      },
    },
    {
      title: "Sports Facilities & Courts",
      body: "Indoor spaces for table tennis and badminton, outdoor facilities for mini-football, basketball, and cricksal, plus swimming and futsal coaching.",
      photo: {
        src: "/sections/general/11.jpg",
        alt: "Indoor and outdoor sports facilities, courts, and athletic coaching at NAMI.",
        width: 1600,
        height: 1066,
      },
    },
    {
      title: "Cafeteria",
      body: "Three nutritious, hygienic vegetarian meals (breakfast, lunch, and snack) provided for primary students, with a dedicated canteen for Grades 11 and 12.",
      photo: {
        src: "/sections/nami/nami-school-cafeteria.jpg",
        alt: "The school cafeteria, wooden tables and chairs ranked across a polished floor beside a glazed partition, with a stainless steel serving counter and a water dispenser against the orange wall.",
        width: 1000,
        height: 1333,
      },
    },
    {
      title: "Infirmary & Nursing Support",
      body: "A fully equipped school infirmary with qualified nursing staff on duty throughout school hours to ensure student health and well-being.",
      photo: {
        src: "/sections/nami/nami-school-infirmity.jpg",
        alt: "The school infirmary, two single beds made up with pale blue linen and folded blankets beneath a wall fan and a curtained window.",
        width: 1000,
        height: 1333,
      },
    },
    {
      title: "Counselling Services",
      body: "Dedicated psycho-social counselling and career guidance to ensure every child feels safe, respected, heard, and supported in their personal and academic growth.",
      photo: {
        src: "/sections/nami/nami-school-cafeteria.jpg",
        alt: "Students and teachers collaborating in a welcoming campus environment.",
        width: 1000,
        height: 1333,
      },
    },
    {
      title: "School Transportation",
      body: "Safe and reliable bus service covering extensive pickup and drop-off routes across Kathmandu Valley.",
      photo: {
        src: "/sections/general/13.jpg",
        alt: "Safe and reliable NAMI International School transportation fleet covering extensive routes across Kathmandu.",
        width: 1280,
        height: 483,
      },
    },
  ],
};

const parents: SectionCopy = {
  navLabel: "Voices",
  eyebrow: "Parent & Student Voices",
  heading: "",
  cta: null,
  emptyState:
    "Stories and experiences from our students and families appear here as they are shared.",
};

export const parentTestimonials: readonly Testimonial[] = [
  {
    ...entryOf("parent-dayana-shakya"),
    name: "Dayana Shakya, PhD",
    programme:
      "Parent of Adhyant Bhatta (Grade 2) • Associate Professor, Kathmandu Medical College",
    graduatedYear: null,
    quote:
      "We are truly happy with our child’s experience at school. The teachers are so warm, caring, and approachable, and he genuinely looks forward to going to school each day. It has brought out his confidence and helped him grow in so many ways. He says the food is yummy, and the ECAs are wonderful too!",
    institution: "school",
    portrait: {
      src: "/testimonials/parents/Dayana Shakya.jpeg",
      alt: "Dayana Shakya, PhD",
      width: 334,
      height: 363,
    },
  },
  {
    ...entryOf("student-evana-khanal"),
    name: "Evana Khanal",
    programme: "Grade 4",
    quote:
      "We learn from our own mistakes. Our teachers help us understand our mistakes with kindness, so we can do better next time.",
    institution: "school",
    graduatedYear: null,
    portrait: {
      src: "/testimonials/school/evana khanal.png",
      alt: "Evana Khanal",
      width: 400,
      height: 400,
    },
  },
  {
    ...entryOf("parent-arun-poudyal"),
    name: "Arun Poudyal",
    programme: "Arushi Poudyal’s Parent",
    quote:
      "Associating with NAMI has been a great experience. I have noticed remarkable growth in my child’s confidence, communication, and essential life skills beyond regular academics.",
    institution: "school",
    graduatedYear: null,
    portrait: {
      src: "/testimonials/parents/Arun Poudyal.jpeg",
      alt: "Arun Poudyal",
      width: 344,
      height: 351,
    },
  },
  {
    ...entryOf("student-hriden-jung-karki"),
    name: "Hriden Jung Karki",
    programme: "Grade 5",
    quote:
      "At NAMI, we learn through fun activities. In Science, we played football to understand force, which was my best learning experience.",
    institution: "school",
    graduatedYear: null,
    portrait: {
      src: "/testimonials/school/Hriden Jung Karki.png",
      alt: "Hriden Jung Karki",
      width: 400,
      height: 400,
    },
  },
  {
    ...entryOf("parent-milan-phuyal"),
    name: "Mr. Milan Phuyal",
    programme: "Parent of Sanvika Phuyal",
    quote:
      "Being part of the NAMI community has been truly rewarding. We value the supportive teachers, welcoming environment, and strong partnership fostering our child’s growth and well-being.",
    institution: "school",
    graduatedYear: null,
    portrait: {
      src: "/testimonials/parents/Milan Phuyal.jpeg",
      alt: "Mr. Milan Phuyal",
      width: 257,
      height: 292,
    },
  },
  {
    ...entryOf("student-himanshu-raya"),
    name: "Himanshu Raya",
    programme: "Grade 5",
    quote:
      "At NAMI, I learned to adapt to new challenges and become much more confident through public speaking and teamwork.",
    institution: "school",
    graduatedYear: null,
    portrait: {
      src: "/testimonials/school/Himanshu Raya.png",
      alt: "Himanshu Raya",
      width: 400,
      height: 400,
    },
  },
  {
    ...entryOf("parent-pooja-shrestha"),
    name: "Pooja Shrestha",
    programme: "Mother of Satwik Ghimire, Grade 7 and Saarvi Ghimire, Grade 3",
    quote:
      "Enrolling our kids at NAMI has proved to be our best decision. The kids love interacting with their teachers in academics and ECA activities, and have become noticeably confident and vocal.",
    institution: "school",
    graduatedYear: null,
    portrait: {
      src: "/testimonials/parents/Pooja Shrestha.jpeg",
      alt: "Pooja Shrestha",
      width: 189,
      height: 255,
    },
  },
  {
    ...entryOf("student-aarushi-poudyal"),
    name: "Aarushi Poudyal",
    programme: "Grade 5",
    quote:
      "I will never forget visiting Namgyal School during Environment Week, where I learned to segregate, reuse, and recycle different types of waste.",
    institution: "school",
    graduatedYear: null,
    portrait: {
      src: "/testimonials/school/Aarushi Poudyal.png",
      alt: "Aarushi Poudyal",
      width: 400,
      height: 400,
    },
  },
  {
    ...entryOf("parent-enu-shrestha"),
    name: "Enu Shrestha (Yuvan Krien Shrestha)",
    programme: "Parent, Grade 1",
    quote:
      "It gives us immense pride to see Yuvan thriving at NAMI. In a short time, we have witnessed remarkable growth in his confidence, curiosity, and overall learning environment.",
    institution: "school",
    graduatedYear: null,
    portrait: {
      src: "/testimonials/parents/Enu shrestha.jpeg",
      alt: "Enu Shrestha (Yuvan Krien Shrestha)",
      width: 219,
      height: 214,
    },
  },
];

export const plusTwoVoices: SectionCopy = {
  navLabel: "Voices",
  eyebrow: "From Our +2 Graduates",
  heading: "",
  cta: null,
  emptyState:
    "Testimonials and experiences from our +2 students and graduates appear here as they are shared.",
};

export const plusTwoTestimonials: readonly Testimonial[] = [
  {
    ...entryOf("student-nirakar-bhandari"),
    name: "Nirakar Bhandari",
    programme: "Batch of 2026",
    quote:
      "My journey at NAMI has been a meaningful and memorable part of my academic life. The supportive environment, teacher guidance, friendships, and experiences helped me grow in confidence, knowledge, and skills. I am proud to be part of the NAMI family.",
    institution: "school",
    graduatedYear: null,
    portrait: {
      src: "/testimonials/plus-two/Nirakar Bhandari.jpeg",
      alt: "Nirakar Bhandari",
      width: 301,
      height: 334,
    },
  },
  {
    ...entryOf("student-avni-adhikari"),
    name: "Avni Adhikari",
    programme: "Batch of 2026",
    quote:
      "My two years at NAMI were filled with learning, friendships, and unforgettable memories. From lab classes and Holi celebrations to leading the Arts and Literature Club, every experience helped me grow in confidence and gratitude.",
    institution: "school",
    graduatedYear: null,
    portrait: {
      src: "/testimonials/plus-two/Avni Adhikari.png",
      alt: "Avni Adhikari",
      width: 1175,
      height: 1338,
    },
  },
  {
    ...entryOf("student-yunisha-basnet"),
    name: "Yunisha Basnet",
    programme: "Management Stream (Class of 2026)",
    quote:
      "My journey at NAMI has been a truly wonderful and memorable experience. The faculty members were very supportive, friendly, and understanding, always there whenever I needed guidance. The peaceful, green campus and the wonderful friends I made created memories that I will always cherish.",
    institution: "school",
    graduatedYear: null,
    portrait: {
      src: "/testimonials/plus-two/Yunisha Shrestha.jpeg",
      alt: "Yunisha Basnet",
      width: 273,
      height: 349,
    },
  },
];

const admission: SchoolAdmissionCopy = {
  eyebrow: "Admission Process",
  heading: "",
  standfirst:
    "The step-by-step admissions procedure from registration to final enrolment.",
  stepLabel: "Step",
  steps: [
    {
      title: "Registration",
      body: "Register your child's name at reception or through our online portal.",
    },
    {
      title: "Orientation",
      body: "Attend the Principal's academic briefing and a guided school tour.",
    },
    {
      title: "Application",
      body: "Obtain the official application form from admissions or online.",
    },
    {
      title: "Application Submission",
      body: "Submit forms to schedule placement assessment and family interview.",
    },
    {
      title: "Notification",
      body: "Receive your child's admission decision by phone or email.",
    },
    {
      title: "Admission Confirmation",
      body: "Confirm your seat upon acceptance letter and deposit submission.",
    },
    {
      title: "Open House",
      body: "Attend the Open House to receive student handbooks and essentials.",
    },
  ],
};

const gallery: InstitutionGalleryCopy = {
  eyebrow: "The School, Photographed",
  heading: "Ordinary days, as they actually look.",
  standfirst:
    "Assemblies, sports, classrooms and the weeks in between — the school's own record of what a child's day here looks like.",
  ctaLabel: "All School Photographs",
};

const notices: InstitutionNoticesCopy = {
  eyebrow: "Notice Board",
  heading: "What the school is announcing.",
  standfirst:
    "Admission windows, examination dates, holidays and the standing notices that parents need in front of them.",
  ctaLabel: "All School Notices",
  emptyState:
    "There is no school notice standing right now. Everything the school publishes appears here and on the notice board.",
};

export const schoolFaqs = [
  {
    question: "What is the philosophy of the school?",
    answer:
      "The school follows a progressive education approach, emphasizing holistic development for each individual.",
  },
  {
    question: "What will the role of parents at NAMI International School be?",
    answer:
      "Parents are encouraged to take on roles such as class representatives and guest speakers, and occasionally accompany students on trips and picnics.",
  },
  {
    question: "Which curriculum do Grades I-VII follow?",
    answer:
      "NAMI International School has adopted the Nepal Government's curriculum to align with progressive education principles. The school implements this curriculum using the progressive pedagogical approach, emphasising creative thinking and inquiry-based learning.",
  },
  {
    question: "Does NAMI International School have a uniform?",
    answer:
      "We celebrate diversity and acknowledge each student's individuality, we therefore do not have a uniform, instead, we have a dress code in place to ensure a sense of decorum. However, the school does have a track suit and jersey for students that is optional to wear on regular days but is mandatory on days they have field trips.",
  },
  {
    question:
      "Why doesn't NAMI International School have assessments until grade V?",
    answer:
      "Our approach to education is centered on preparing children for life, not just examinations. We believe in empowering students to take ownership of their learning and construct knowledge actively. Continuous assessments in the form of assignments, projects, and interactive engagements are used to evaluate their understanding and application of concepts in real-life situations.",
  },
  {
    question: "Does NAMI International School provide meals to the students?",
    answer:
      "Yes, we provide 3 vegetarian meals (breakfast, lunch and snack). We have a canteen for Grade 11 and 12 students.",
  },
  {
    question: "Why is NAMI International School’s cafeteria vegetarian?",
    answer:
      "We prioritize healthy eating and avoid the challenges associated with managing a large-scale meat supply, which poses hygiene risks. Our commitment to the nutritional well-being of children is uncompromising.",
  },
  {
    question: "What are the sports facilities at NAMI International School?",
    answer:
      "We offer physical education classes, along with activities like table tennis, basketball, badminton, cricksal and football. Additionally, students get the opportunity to attend futsal and swimming lessons at a nearby public club.",
  },
  {
    question: "Does NAMI International School provide transportation?",
    answer: "We have transport facilities in various areas.",
  },
] as const;

export const schoolCopy = {
  meta: {
    title:
      "NAMI International School | Grades I–VII & +2 Science and Management",
    description: `NAMI International School offers progressive education for Grades I–VII under the Nepal Government's National Curriculum and NEB +2 in Science and Management at Gokarneshwor-7, Kathmandu.`,
  },
  levelSlug: "school",
  masthead,
  bands,
  day,
  parents,
  plusTwoVoices,
  plusTwoTestimonials,
  admission,
  gallery,
  notices,
  faqs: schoolFaqs,
} as const;
