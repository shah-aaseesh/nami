import { Marquee } from "@/components/motion/marquee";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { Icon } from "@/components/ui/icon";
import { content, schoolGrades } from "@/lib/content";
import { AsteriskIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

type MarqueeItem = {
  id: string;
  text: string;
  isLevel?: boolean;
};

const ACADEMIC_TRACKS: readonly MarqueeItem[] = [
  // 10+2 NEB
  { id: "neb-level", text: "10+2 (NEB)", isLevel: true },
  { id: "neb-science", text: "Science" },
  { id: "neb-management", text: "Management" },

  // Cambridge A-Level
  { id: "alevel-level", text: "Cambridge A-Level", isLevel: true },
  { id: "alevel-science", text: "Science" },
  { id: "alevel-non-science", text: "Non-Science" },

  // Bachelor's
  { id: "bachelors-level", text: "Bachelor's Degrees", isLevel: true },
  { id: "ug-cs", text: "BSc (Hons) Computer Science" },
  { id: "ug-se", text: "BSc (Hons) Software Engineering" },
  { id: "ug-net", text: "BSc (Hons) Networking Engineering" },
  { id: "ug-env-sci", text: "BSc (Hons) Environmental Science" },
  { id: "ug-bba", text: "BBA (Hons) Business Administration" },
  { id: "ug-env-stud", text: "BSc Environmental Studies" },

  // Master's
  { id: "masters-level", text: "Master's Degree", isLevel: true },
  { id: "pg-cs", text: "MSc Computer Science" },

  // Primary School
  { id: "school-level", text: "School", isLevel: true },
  {
    id: "school-grades",
    text: `Grades ${schoolGrades.first} through ${schoolGrades.last}`,
  },
];

function bodyStep(): string {
  return "text-xl sm:text-2xl";
}

function MarqueeRow({
  glyphClassName,
  items,
  step,
}: {
  glyphClassName: string;
  items: readonly string[];
  step: (item: string) => string;
}) {
  return (
    <ul className="flex items-center whitespace-nowrap">
      {items.map((item) => (
        <li className="flex items-center gap-8 pe-8" key={item}>
          <span className={cn("font-display tracking-normal", step(item))}>
            {item}
          </span>
          <Icon
            className={cn("text-white/60", glyphClassName)}
            icon={AsteriskIcon}
          />
        </li>
      ))}
    </ul>
  );
}

function AcademicMarqueeRow({
  glyphClassName,
  items,
}: {
  glyphClassName: string;
  items: readonly MarqueeItem[];
}) {
  return (
    <ul className="flex items-center whitespace-nowrap">
      {items.map((item) => (
        <li
          className="flex items-center gap-6 sm:gap-8 pe-6 sm:pe-8"
          key={item.id}
        >
          <span
            className={cn(
              "font-display tracking-normal text-2xl sm:text-3xl",
              item.isLevel
                ? "text-accent font-semibold"
                : "text-white font-normal",
            )}
          >
            {item.text}
          </span>
          <Icon
            className={cn("text-accent", glyphClassName)}
            icon={AsteriskIcon}
          />
        </li>
      ))}
    </ul>
  );
}

export async function ProgrammeMarquee() {
  const programmes = await content.getProgrammes();
  const bodies = [
    ...new Set(programmes.map((programme) => programme.awardingBody)),
  ];

  return (
    <section className="gutter-x py-0" id="programmes">
      <Reveal className="bleed-x" stagger={0.12}>
        <RevealItem className="field-ink py-4">
          <Marquee label="Programmes" speed={70}>
            <AcademicMarqueeRow
              glyphClassName="size-5"
              items={ACADEMIC_TRACKS}
            />
          </Marquee>
        </RevealItem>

        <RevealItem className="field-brand py-5">
          <Marquee copies={3} label="Awarding bodies" speed={50}>
            <MarqueeRow
              glyphClassName="size-4"
              items={bodies}
              step={bodyStep}
            />
          </Marquee>
        </RevealItem>
      </Reveal>
    </section>
  );
}
