import { Display, Eyebrow, Standfirst } from "@/components/ui/typography";

export function FacultyHero() {
  return (
    <section className="gutter-x section-y-masthead">
      <div className="mx-auto max-w-page">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-7">
            <Eyebrow>Our People</Eyebrow>
            <Display className="mt-5 text-4xl leading-[1.1] text-ink sm:text-6xl lg:text-7xl">
              Faculty & Leadership
            </Display>
          </div>
          <div className="mt-8 max-w-xl lg:col-span-4 lg:col-start-9 lg:mt-0 lg:flex lg:flex-col lg:justify-between lg:self-end">
            <Standfirst className="text-ink-muted">
              Meet the visionary leaders, dedicated academics, and experienced
              management team who shape the future of NAMI and inspire our
              students to achieve greatness.
            </Standfirst>
          </div>
        </div>
      </div>
    </section>
  );
}
