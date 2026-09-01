import type { ContentImage } from "@/lib/content";

export type ALevelsClubSlug =
  | "social-services"
  | "sports"
  | "environment"
  | "arts-and-crafts";

export type ALevelsClubActivity = {
  readonly title: string;
  readonly description: string;
  readonly tag: string;
};

export type ALevelsClub = {
  readonly slug: ALevelsClubSlug;
  readonly title: string;
  readonly category: string;
  readonly tagline: string;
  readonly metaDescription: string;
  readonly coverImage: ContentImage;
  readonly overview: readonly string[];
  readonly quote: {
    readonly text: string;
    readonly author: string;
  };
  readonly objectives: readonly string[];
  readonly keyActivities: readonly ALevelsClubActivity[];
  readonly skillsDeveloped: readonly {
    readonly title: string;
    readonly description: string;
  }[];
  readonly meetingSchedule: string;
  readonly eligibility: string;
  readonly facultyMentor: string;
};

export const A_LEVELS_CLUBS: readonly ALevelsClub[] = [
  {
    slug: "social-services",
    title: "Social Services",
    category: "Community Outreach & Humanitarian Aid",
    tagline:
      "Driving impactful social initiatives, community outreach camps, disaster relief drives, and social welfare projects.",
    metaDescription:
      "NAMI College A-Levels Social Services Club engages students in community relief camps, blood donation drives, and public welfare campaigns.",
    coverImage: {
      src: "/nami/campus-service-camp.jpg",
      alt: "NAMI College A-Levels students organizing community service materials during an outreach camp.",
      width: 1190,
      height: 793,
    },
    overview: [
      "The Social Services Club at NAMI College embodies the belief that academic brilliance must be matched with social empathy and active civic leadership. The club offers Cambridge A-Level students a structured platform to understand social realities and organize tangible relief for underserved communities across Nepal.",
      "From running annual educational and winter-relief camps in remote hill districts to hosting blood donation drives and partnering with local grassroots shelters, members develop profound empathy, logistical acumen, and ethical leadership.",
    ],
    quote: {
      text: "True leadership begins when we dedicate our knowledge and resources to uplifting the community around us.",
      author: "Social Services Faculty Mentor",
    },
    objectives: [
      "Instill active humanitarian empathy, altruism, and civic responsibility among A-Level students.",
      "Organize annual rural community outreach expeditions delivering education and health aid.",
      "Coordinate quarterly campus blood donation drives and emergency relief campaigns.",
      "Partner with verified non-profits and community organizations across Nepal.",
    ],
    keyActivities: [
      {
        title: "Sindhupalchowk Rural Outreach Camp",
        description:
          "Annual expedition delivering school supplies, winter clothing, and hygiene essentials to rural community schools.",
        tag: "Annual Expedition",
      },
      {
        title: "Campus Blood Donation & Health Drive",
        description:
          "Quarterly blood collection camps organized in partnership with the Nepal Red Cross Society.",
        tag: "Health & Welfare",
      },
      {
        title: "Book & Warm Clothes Collection Drive",
        description:
          "Student-led mobilization drives collecting and distributing study materials to underprivileged youth.",
        tag: "Community Drive",
      },
      {
        title: "Community Tutoring & Literacy Program",
        description:
          "Weekly volunteer tutoring sessions conducted by A-Level students for local municipal school children.",
        tag: "Weekly Volunteering",
      },
    ],
    skillsDeveloped: [
      {
        title: "Empathetic Leadership",
        description:
          "Leading high-impact initiatives with compassion, integrity, and cultural humility.",
      },
      {
        title: "Project Management",
        description:
          "Managing logistical planning, supply chain coordination, and field budgeting.",
      },
      {
        title: "Community Engagement",
        description:
          "Communicating effectively with municipal leaders, non-profit stakeholders, and local families.",
      },
      {
        title: "Crisis Response",
        description:
          "Mobilizing rapid volunteer relief and aid campaigns during national contingencies.",
      },
    ],
    meetingSchedule: "Fridays (3:30 PM – 5:00 PM) + Weekend Field Drives",
    eligibility: "Open to all Cambridge A-Level students (AS and A2)",
    facultyMentor: "Department of Social Sciences & Student Affairs",
  },
  {
    slug: "sports",
    title: "Sports",
    category: "Athletics & Competitive Tournaments",
    tagline:
      "Fostering athletic excellence, tactical discipline, stamina, and team spirit through competitive and recreational sports.",
    metaDescription:
      "NAMI College A-Levels Sports Club offers competitive training, 3x3 basketball tournaments, futsal championships, and athletics.",
    coverImage: {
      src: "/nami/campus-basketball-award.jpg",
      alt: "NAMI College A-Levels basketball championship awards ceremony in the campus auditorium.",
      width: 1500,
      height: 1000,
    },
    overview: [
      "The Sports Club at NAMI College is dedicated to cultivating physical fitness, mental toughness, and athletic sportsmanship among A-Level students. Balancing rigorous Cambridge academics with energetic physical play, the club provides an outlet for students to excel on courts, fields, and tracks.",
      "With access to an NBA-standard basketball court, mini-football turf, table tennis facilities, and athletic running tracks, members participate in structured coaching clinics, intra-college house leagues, and prominent valley-wide inter-college tournaments.",
    ],
    quote: {
      text: "Sports instill a winning mindset — discipline in practice, humility in victory, and resilience in defeat.",
      author: "College Athletic Director",
    },
    objectives: [
      "Develop cardiovascular fitness, athletic skill, and bodily wellness alongside academic study.",
      "Promote team camaraderie, mutual accountability, and healthy competitive sportsmanship.",
      "Host signature inter-college invitationals in basketball, futsal, and table tennis.",
      "Prepare student-athletes for national and regional Cambridge sports meets.",
    ],
    keyActivities: [
      {
        title: "NAMI SEE & +2 3x3 Basketball Cup",
        description:
          "Flagship valley-wide 3x3 basketball invitational tournament hosted on the college outdoor court.",
        tag: "Flagship Invitational",
      },
      {
        title: "Inter-House Futsal & Football League",
        description:
          "Seasonal intra-college league running across AS and A2 cohorts on the mini-football turf.",
        tag: "League Tournament",
      },
      {
        title: "Annual Sports Day & Track Meet",
        description:
          "Comprehensive athletic championship featuring sprints, relays, shot put, long jump, and tug-of-war.",
        tag: "Annual Championship",
      },
      {
        title: "Table Tennis & Badminton Open",
        description:
          "Singles and doubles knockout tournament held in the indoor recreation complex.",
        tag: "Indoor Sports",
      },
    ],
    skillsDeveloped: [
      {
        title: "Strategic Teamwork",
        description:
          "Executing tactical game plans and supporting teammates under competitive pressure.",
      },
      {
        title: "Physical Conditioning",
        description:
          "Building endurance, muscular strength, agility, and overall personal wellness.",
      },
      {
        title: "Resilience & Focus",
        description:
          "Maintaining mental composure, concentration, and determination during high-stakes games.",
      },
      {
        title: "Sportsmanship",
        description:
          "Treating opponents, referees, and teammates with unwavering respect and fairness.",
      },
    ],
    meetingSchedule: "Tuesdays & Thursdays (3:45 PM – 5:15 PM)",
    eligibility: "Open to all Cambridge A-Level students (AS and A2)",
    facultyMentor: "Department of Physical Education & Sports",
  },
  {
    slug: "environment",
    title: "Environment",
    category: "Ecology, Conservation & Climate Action",
    tagline:
      "Championing ecological sustainability, afforestation drives, waste reduction, and climate action on campus and beyond.",
    metaDescription:
      "NAMI College A-Levels Environment Club leads tree plantation drives, waste management campaigns, and ecological research.",
    coverImage: {
      src: "/nami/event-eco-club.jpg",
      alt: "NAMI College Eco Club members participating in environmental conservation and green campus drives.",
      width: 1200,
      height: 800,
    },
    overview: [
      "The Environment Club at NAMI College is at the forefront of ecological education and grassroots climate action. As future global leaders, A-Level students analyze ecological challenges and implement tangible sustainability projects that minimize carbon footprints and promote biodiversity.",
      "The club spearheads community afforestation projects, campus recycling and zero-waste policies, climate policy symposiums, and nature expeditions across Kathmandu valley's protected watersheds and community forests.",
    ],
    quote: {
      text: "We do not inherit the earth from our ancestors; we borrow it from our children. Action begins with us.",
      author: "Environment Club Advisor",
    },
    objectives: [
      "Raise awareness on climate change, biodiversity loss, and sustainable resource management.",
      "Implement campus-wide green policies including waste segregation and plastic reduction.",
      "Conduct recurring afforestation and urban plantation drives across Gokarneshwor.",
      "Organize ecological field studies and environmental symposiums with climate researchers.",
    ],
    keyActivities: [
      {
        title: "World Environment Day Afforestation Drive",
        description:
          "Mass sapling plantation in local community forests and along the Bagmati watershed corridors.",
        tag: "Afforestation",
      },
      {
        title: "Zero-Waste Campus Initiative",
        description:
          "Student-monitored waste segregation, organic compost pits, and plastic audit programs.",
        tag: "Sustainability",
      },
      {
        title: "Climate Action Panel & Symposium",
        description:
          "Hosting environmental researchers, forestry experts, and policymakers for campus debates.",
        tag: "Symposium",
      },
      {
        title: "Shivapuri National Park Eco-Trek",
        description:
          "Guided ecological field study documenting botanical diversity and watershed preservation.",
        tag: "Field Study",
      },
    ],
    skillsDeveloped: [
      {
        title: "Ecological Literacy",
        description:
          "Deep understanding of ecosystem dynamics, biodiversity, and global climate policies.",
      },
      {
        title: "Policy & Advocacy",
        description:
          "Advocating for institutional sustainability guidelines and community awareness campaigns.",
      },
      {
        title: "Field Research",
        description:
          "Gathering empirical environmental data, soil sampling, and ecological monitoring.",
      },
      {
        title: "Green Innovation",
        description:
          "Designing creative upcycling, composting, and energy-saving solutions on campus.",
      },
    ],
    meetingSchedule: "Wednesdays (3:30 PM – 4:45 PM)",
    eligibility: "Open to all Cambridge A-Level students (AS and A2)",
    facultyMentor: "Department of Environmental Science & Ecology",
  },
  {
    slug: "arts-and-crafts",
    title: "Arts and crafts",
    category: "Visual Arts, Craftsmanship & Design",
    tagline:
      "Cultivating artistic expression, canvas painting, sculpture, stage installations, and visual craftsmanship.",
    metaDescription:
      "NAMI College A-Levels Arts and Crafts Club provides studio spaces for painting, sketching, sculpting, and art exhibitions.",
    coverImage: {
      src: "/nami/event-mascot.jpg",
      alt: "NAMI College A-Levels arts and craftsmanship exhibition and creative design installations.",
      width: 1000,
      height: 750,
    },
    overview: [
      "The Arts and Crafts Club at NAMI College provides a vibrant open studio for young artists, sculptors, graphic illustrators, and craftspeople. It celebrates aesthetic creativity as a vital counterpoint to academic rigor, encouraging students to experiment with diverse mediums and techniques.",
      "Members collaborate on fine art exhibitions, theatrical stage set designs, festive campus installations, pottery and clay sculpting, and visual branding for major college festivals.",
    ],
    quote: {
      text: "Art is the voice of imagination. Craft is the disciplined hand that brings vision into tangible reality.",
      author: "Visual Arts Instructor",
    },
    objectives: [
      "Develop refined artistic techniques in sketching, oil/acrylic painting, and mixed-media sculpture.",
      "Host annual campus art exhibitions showcasing student portfolios and conceptual projects.",
      "Design creative stage backdrops, props, and festive installations for college celebrations.",
      "Foster a supportive, collaborative studio space for personal artistic development.",
    ],
    keyActivities: [
      {
        title: "Annual College Art & Design Showcase",
        description:
          "A curated campus gallery featuring student paintings, sculptures, and photographic installations.",
        tag: "Exhibition",
      },
      {
        title: "Festive Stage & Auditorium Installations",
        description:
          "Designing large-scale thematic backdrops and decorative artwork for college galas.",
        tag: "Stage Design",
      },
      {
        title: "Pottery & Clay Modelling Workshops",
        description:
          "Hands-on studio sessions exploring traditional pottery wheels and ceramic sculpting.",
        tag: "Craft Workshop",
      },
      {
        title: "Live Sketching & Plein Air Art Camps",
        description:
          "Outdoor sketching expeditions capturing historical architecture and natural landscapes.",
        tag: "Outdoor Studio",
      },
    ],
    skillsDeveloped: [
      {
        title: "Visual Artistry",
        description:
          "Mastery of color theory, spatial composition, perspective, and various paint media.",
      },
      {
        title: "Craftsmanship & Fabrication",
        description:
          "Working with clay, wood, papier-mâché, textiles, and architectural model materials.",
      },
      {
        title: "Creative Conceptualization",
        description:
          "Transforming abstract themes and personal reflections into compelling visual artworks.",
      },
      {
        title: "Exhibition Curation",
        description:
          "Mounting, lighting, and curating public gallery exhibitions with professional polish.",
      },
    ],
    meetingSchedule: "Mondays & Thursdays (3:30 PM – 4:45 PM)",
    eligibility: "Open to all Cambridge A-Level students (AS and A2)",
    facultyMentor: "Department of Fine Arts & Design",
  },
];

export function findALevelsClub(slug: string): ALevelsClub | null {
  return A_LEVELS_CLUBS.find((club) => club.slug === slug) ?? null;
}
