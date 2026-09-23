import { Display, Standfirst } from "@/components/ui/typography";

export function FacultyHero() {
  return (
    <section className="gutter-x pt-4 sm:pt-5 lg:pt-6 pb-6 sm:pb-8 border-b border-border/70 bg-gradient-to-b from-primary-100/30 via-surface/50 to-surface">
      <div className="mx-auto max-w-page">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-10 items-end">
          <div className="lg:col-span-7">
            <Display className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] text-ink leading-[1.2] font-normal">
              The People Shaping the Future of NAMI
            </Display>
          </div>
          <div className="mt-4 max-w-lg text-neutral-700 lg:col-span-5 lg:mt-0">
            <Standfirst className="text-ink-muted text-sm sm:text-base leading-relaxed">
              Meet our esteemed board of directors, management leaders, and academic heads steering academic excellence, international standards, and student empowerment.
            </Standfirst>
          </div>
        </div>
      </div>
    </section>
  );
}

