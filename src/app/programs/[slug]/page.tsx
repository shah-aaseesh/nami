import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { AcademicLevel, Programme } from "@/lib/content";
import { content, paragraphsOf } from "@/lib/content";
import { createMetadata } from "@/lib/seo";
import type { HighlightCard } from "../_components/pinned-highlights-panels";
import { PinnedHighlightsPanels } from "../_components/pinned-highlights-panels";
import { ProgramAdmissionCta } from "../_components/program-admission-cta";
import { ProgramAffiliations } from "../_components/program-affiliations";
import { ProgramDetailHero } from "../_components/program-detail-hero";
import { ProgrammesList } from "../_components/programmes-list";
import { ScrubbedBentoGallery } from "../_components/scrubbed-bento-gallery";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function resolveLevelAndProgramme(
  rawSlug: string,
  levels: readonly AcademicLevel[],
  programmes: readonly Programme[],
): { level: AcademicLevel; programme: Programme | null } | null {
  const norm = rawSlug.toLowerCase().trim();

  const directLevel = levels.find(
    (l) =>
      l.slug === norm ||
      (norm === "school-level" && l.slug === "school") ||
      (norm === "plus-two-programs" && l.slug === "plus-two") ||
      (norm === "neb" && l.slug === "plus-two") ||
      (norm === "a-level-programs" && l.slug === "a-level") ||
      (norm === "cambridge" && l.slug === "a-level") ||
      (norm === "bachelor" && l.slug === "bachelor-master") ||
      (norm === "bachelors" && l.slug === "bachelor-master") ||
      (norm === "bachelor-programs" && l.slug === "bachelor-master"),
  );

  if (directLevel) {
    return { level: directLevel, programme: null };
  }

  const directProg = programmes.find(
    (p) => p.slug === norm || p.id.toLowerCase() === norm,
  );

  if (directProg) {
    const parentLevel = levels.find((l) => l.slug === directProg.levelSlug);
    if (parentLevel) {
      return { level: parentLevel, programme: directProg };
    }
  }

  return null;
}

function buildHighlightCards(level: AcademicLevel): readonly HighlightCard[] {
  if (level.slug === "school") {
    return [
      {
        id: "sch-1",
        number: "01",
        title: "National Curriculum & Global Standards",
        subtitle: "Government of Nepal framework enhanced with Mandarin",
        description:
          "NAMI International School combines the national curriculum with early foreign language learning (Mandarin from Grade I) and digital literacy from primary grades.",
        points: [
          "Mandarin language classes from Grade I",
          "ICT and computer skills from first grade",
          "Interactive smart boards in classrooms",
          "Structured moral and civic education",
        ],
        badge: "Curriculum",
        accentClass: "border-primary-500/30",
      },
      {
        id: "sch-2",
        number: "02",
        title: "Service Learning & Civic Projects",
        subtitle: "Building empathy, leadership, and community awareness",
        description:
          "Students engage in hands-on Service Learning initiatives that teach social responsibility, environmental stewardship, and teamwork early in life.",
        points: [
          "Student-led community service initiatives",
          "Environmental & recycling drives",
          "Peer collaboration & team building",
          "Public speaking & presentation sessions",
        ],
        badge: "Leadership",
        accentClass: "border-secondary-500/30",
      },
      {
        id: "sch-3",
        number: "03",
        title: "Modern ICT & Interactive Learning",
        subtitle: "Technology-enabled smart classrooms",
        description:
          "Classrooms are equipped with interactive smart boards and digital learning tools to make learning engaging, visual, and participatory.",
        points: [
          "Interactive whiteboards in every room",
          "Supervised computer lab sessions",
          "Digital storytelling & coding basics",
          "Safe internet and digital safety modules",
        ],
        badge: "Technology",
        accentClass: "border-primary-400/30",
      },
      {
        id: "sch-4",
        number: "04",
        title: "Holistic Arts & Physical Development",
        subtitle: "Fine arts, performing arts, and active athletics",
        description:
          "A balanced daily routine encourages artistic expression through music, drama, fine arts, and physical education tailored for primary and middle school grades.",
        points: [
          "Performing arts & music classes",
          "Fine arts studio activities",
          "Sports, martial arts & gymnastics",
          "Annual school exhibition & sports day",
        ],
        badge: "Co-Curricular",
        accentClass: "border-secondary-400/30",
      },
    ];
  }

  if (level.slug === "plus-two") {
    return [
      {
        id: "p2-1",
        number: "01",
        title: "NEB Science & Management Streams",
        subtitle: "Affiliated with National Examination Board (NEB) Nepal",
        description:
          "Offering comprehensive +2 programmes in Science and Management since 2019, focused on conceptual clarity, board exam excellence, and university readiness.",
        points: [
          "Physics, Chemistry, Biology & Computer Science",
          "Management, Accounting, Economics & Hotel Mgt",
          "Rigorous board exam preparation",
          "Regular mock exams and performance feedback",
        ],
        badge: "Streams",
        accentClass: "border-primary-500/30",
      },
      {
        id: "p2-2",
        number: "02",
        title: "State-of-the-Art Science & ICT Labs",
        subtitle: "Hands-on practical experimentation",
        description:
          "Students perform experiments in modern Physics, Chemistry, and Biology laboratories equipped with modern apparatus and safety measures.",
        points: [
          "Dedicated Physics, Chemistry & Bio labs",
          "High-speed ICT labs with modern software",
          "Experienced lab instructors & lab manuals",
          "Individual practical workstations",
        ],
        badge: "Laboratories",
        accentClass: "border-secondary-500/30",
      },
      {
        id: "p2-3",
        number: "03",
        title: "Internships & Industry Exposure",
        subtitle: "Real-world experience and volunteerism",
        description:
          "+2 Management and Science students participate in short-term internships, social service projects, and corporate visits to build early career skills.",
        points: [
          "Corporate & bank visit programs",
          "Social volunteerism with partner NGOs",
          "Entrepreneurship workshops & guest talks",
          "Soft skills & communication training",
        ],
        badge: "Exposure",
        accentClass: "border-primary-400/30",
      },
      {
        id: "p2-4",
        number: "04",
        title: "Structured Career & University Guidance",
        subtitle: "Pathways to top medical, engineering & management colleges",
        description:
          "Dedicated guidance counselors assist students with entrance exam preparation (IOE, IOM, CEE, KU) and overseas university applications.",
        points: [
          "Engineering & Medical entrance support",
          "Standardized test prep (SAT/IELTS guidance)",
          "University application counseling",
          "Alumni mentoring sessions",
        ],
        badge: "Pathways",
        accentClass: "border-secondary-400/30",
      },
    ];
  }

  if (level.slug === "a-level") {
    return [
      {
        id: "alevel-1",
        number: "01",
        title: "Independent CAIE Examination Centre",
        subtitle: "Recognised by Cambridge Assessment International Education",
        description:
          "NAMI College is an independent CAIE exam centre operating under strict Cambridge standards, offering global validation for A-Level candidates.",
        points: [
          "Independent CAIE exam centre status since 2024",
          "Official Cambridge past papers & marking schemes",
          "Certified Cambridge-trained faculty",
          "Global equivalency for university admissions",
        ],
        badge: "CAIE Centre",
        accentClass: "border-primary-500/30",
      },
      {
        id: "alevel-2",
        number: "02",
        title: "Flexible Science & Non-Science Combinations",
        subtitle: "Tailored subject options for your dream university",
        description:
          "Students choose from science, business, computing, humanities, and liberal arts combinations tailored for competitive degree entries worldwide.",
        points: [
          "Physics, Chemistry, Biology & Further Math",
          "Computer Science, Economics & Accounting",
          "Sociology, Psychology & English Literature",
          "Personalised subject counseling",
        ],
        badge: "Subjects",
        accentClass: "border-secondary-500/30",
      },
      {
        id: "alevel-3",
        number: "03",
        title: "Global Gold Standard Qualification",
        subtitle:
          "Accepted by Harvard, Oxford, Cambridge, MIT & UK Russell Group",
        description:
          "Cambridge International A Level is recognized by leading universities across the UK, USA, Canada, Australia, and Asia as the premier pre-university qualification.",
        points: [
          "Direct entry into 3-year UK undergraduate degrees",
          "Advanced Placement (AP) credit in US universities",
          "Deep analytical & critical thinking pedagogy",
          "Global benchmark for academic rigor",
        ],
        badge: "Recognition",
        accentClass: "border-primary-400/30",
      },
      {
        id: "alevel-4",
        number: "04",
        title: "Holistic Research & Club Activities",
        subtitle: "Debate, Robotics, Science Fairs & Model UN",
        description:
          "A-Level students lead student clubs, publish research papers, participate in national Model United Nations, and run community outreach projects.",
        points: [
          "NAMI Model United Nations (MUN)",
          "Robotics & Tech Innovators Club",
          "Science & Research Symposia",
          "Global college application essay mentoring",
        ],
        badge: "Co-Curricular",
        accentClass: "border-secondary-400/30",
      },
    ];
  }

  return [
    {
      id: "bm-1",
      number: "01",
      title: "British Degrees Taught in Kathmandu",
      subtitle: "Academic collaboration with University of Northampton UK",
      description:
        "Earn an authentic British degree in Nepal with identical curriculum, assessment, and degree certificate issued directly by The University of Northampton, UK.",
      points: [
        "100% British curriculum & learning management",
        "Degrees awarded by University of Northampton",
        "Option for UK graduation ceremony attendance",
        "AWS Academy certified curriculum integration",
      ],
      badge: "UK Degrees",
      accentClass: "border-primary-500/30",
    },
    {
      id: "bm-2",
      number: "02",
      title: "Kathmandu University Partnership",
      subtitle: "BSc Environmental Studies launching August 2026",
      description:
        "Combining environmental science, sustainability policy, climate science, and practical field studies in collaboration with Kathmandu University.",
      points: [
        "Affiliated with Kathmandu University (KU)",
        "Field research in Nepal's diverse ecosystems",
        "Focus on climate change & policy analysis",
        "Intake commencing August 2026",
      ],
      badge: "KU Affiliation",
      accentClass: "border-secondary-500/30",
    },
    {
      id: "bm-3",
      number: "03",
      title: "Industry Certifications & AWS Academy",
      subtitle: "Cloud computing, software engineering & business skills",
      description:
        "Computing students gain hands-on training with AWS Cloud, Linux, software architecture, and real-world client project portfolios.",
      points: [
        "Official AWS Academy curriculum",
        "Industry capstone project & code reviews",
        "Modern Mac & Linux computer laboratories",
        "Tech hackathons & industry mentorship",
      ],
      badge: "Industry Tech",
      accentClass: "border-primary-400/30",
    },
    {
      id: "bm-4",
      number: "04",
      title: "Postgraduate & MSc Computer Science",
      subtitle: "Advanced specialization for IT professionals",
      description:
        "Designed for graduates looking to master software engineering, data science, cybersecurity, and strategic IT management.",
      points: [
        "Flexible timetable for working professionals",
        "Research dissertation guided by UK supervisors",
        "Advanced network architecture & AI modules",
        "Strong alumni network in tech & enterprise",
      ],
      badge: "Postgraduate",
      accentClass: "border-secondary-400/30",
    },
  ];
}

export async function generateStaticParams() {
  const [levels, programmes] = await Promise.all([
    content.getAcademicLevels(),
    content.getProgrammes(),
  ]);

  const levelParams = levels.map((l) => ({ slug: l.slug }));
  const progParams = programmes.map((p) => ({ slug: p.slug }));

  return [...levelParams, ...progParams];
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug: rawSlug } = await params;

  const [levels, programmes] = await Promise.all([
    content.getAcademicLevels(),
    content.getProgrammes(),
  ]);

  const resolved = resolveLevelAndProgramme(rawSlug, levels, programmes);

  if (!resolved) {
    return createMetadata({
      path: `/programs/${rawSlug}`,
      title: "Program Not Found",
    });
  }

  const { level, programme } = resolved;
  const title = programme
    ? `${programme.title} (${programme.qualification})`
    : level.title;
  const paragraphs = paragraphsOf(level.summary);
  const description = paragraphs[0] ?? `Explore ${title} at NAMI College.`;

  return createMetadata({
    path: `/programs/${level.slug}`,
    title: `${title} — Academic Program`,
    description,
  });
}

export default async function ProgramDetailPage({ params }: PageProps) {
  const { slug: rawSlug } = await params;

  const [
    levels,
    programmes,
    affiliations,
    admissionCalls,
    institution,
    gallery,
  ] = await Promise.all([
    content.getAcademicLevels(),
    content.getProgrammes(),
    content.getAffiliations(),
    content.getAdmissionCalls(),
    content.getInstitution(),
    content.getGallery(),
  ]);

  const resolved = resolveLevelAndProgramme(rawSlug, levels, programmes);

  if (!resolved) {
    notFound();
  }

  const { level } = resolved;

  const campuses = new Map(
    institution.campuses.map((c) => [c.slug, `${c.locality}, ${c.city}`]),
  );

  const campusName = campuses.get(level.campusSlug) ?? "Kathmandu";
  const levelProgrammes = programmes.filter((p) => p.levelSlug === level.slug);
  const levelAffiliations = affiliations.filter(
    (a) => a.levelSlug === level.slug,
  );
  const admissionCall =
    admissionCalls.find((c) => c.levelSlug === level.slug) ?? null;

  const highlightCards = buildHighlightCards(level);

  const galleryImages = gallery
    .filter((g) => g.category === "academics" || g.category === "campus")
    .map((g) => g.image)
    .slice(0, 5);

  return (
    <>
      <ProgramDetailHero
        admissionNoticeUrl={admissionCall?.link?.href ?? null}
        campusName={campusName}
        level={level}
      />

      <div id="highlights">
        <PinnedHighlightsPanels
          cards={highlightCards}
          levelTitle={level.title}
        />
      </div>

      <ProgrammesList levelTitle={level.title} programmes={levelProgrammes} />

      <ScrubbedBentoGallery
        images={galleryImages}
        subtitle="Take a visual tour of our campus, specialized laboratories, library reading rooms, and active student spaces."
        title={`${level.title} Learning Environment`}
      />

      <ProgramAffiliations
        affiliations={levelAffiliations}
        levelTitle={level.title}
      />

      <ProgramAdmissionCta
        admissionCall={admissionCall}
        contact={institution.contact}
        levelTitle={level.title}
      />
    </>
  );
}
