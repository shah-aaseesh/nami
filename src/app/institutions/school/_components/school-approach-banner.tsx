import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";

export function SchoolApproachBanner() {
  return (
    <section
      className="gutter-x pb-8 sm:pb-12 lg:pb-16"
      id="progressive-approach"
    >
      <div className="mx-auto max-w-4xl">
        <Reveal y={24}>
          <div className="relative overflow-hidden rounded-2xl border border-border bg-surface-raised shadow-lg">
            <Image
              alt="The Progressive Approach to Education - NAMI International School"
              className="h-auto w-full object-contain"
              height={1000}
              loading="lazy"
              sizes="(max-width: 896px) 100vw, 896px"
              src="/ChatGPT Image Aug 25, 2026, 05_43_29 PM (1).png"
              width={2000}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
