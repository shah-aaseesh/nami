import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Eyebrow, Standfirst } from "@/components/ui/typography";

export function FacultyHero() {
  return (
    <section className="gutter-x section-y-masthead">
      <div className="mx-auto max-w-page">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-7">
            <Reveal atFold>
              <Eyebrow>Our People</Eyebrow>
            </Reveal>
            <SplitText
              as="h1"
              atFold
              className="mt-5 font-display text-4xl font-normal leading-[1.1] text-balance text-ink sm:text-6xl lg:text-7xl"
            >
              Faculty & Leadership
            </SplitText>
          </div>
          <div className="mt-8 max-w-xl lg:col-span-4 lg:col-start-9 lg:mt-0 lg:flex lg:flex-col lg:justify-between lg:self-end">
            <Reveal atFold delay={0.15}>
              <Standfirst className="text-ink-muted">
                Meet the visionary leaders, dedicated academics, and experienced
                management team who shape the future of NAMI and inspire our
                students to achieve greatness.
              </Standfirst>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
