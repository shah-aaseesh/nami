import { Display } from "@/components/ui/typography";

export function FacultyHero() {
  return (
    <section className="gutter-x pt-12 sm:pt-16 lg:pt-20 pb-4 sm:pb-6">
      <div className="mx-auto max-w-page">
        <Display className="text-4xl leading-[1.1] text-[#BD1B21] sm:text-5xl lg:text-6xl tracking-tight font-normal">
          Our People
        </Display>
      </div>
    </section>
  );
}
