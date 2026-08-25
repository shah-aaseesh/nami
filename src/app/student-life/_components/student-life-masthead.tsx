import { Display, Eyebrow, Standfirst } from "@/components/ui/typography";

export type StudentLifeMastheadCopy = {
  readonly title: string;
  readonly lead: string;
};

export function StudentLifeMasthead({
  copy,
}: {
  copy: StudentLifeMastheadCopy;
}) {
  return (
    <section className="gutter-x section-y-masthead">
      <div className="mx-auto max-w-page">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-7">
            <Eyebrow>College Life</Eyebrow>
            <Display className="mt-5 text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
              {copy.title}
            </Display>
          </div>

          <Standfirst className="mt-8 max-w-xl text-pretty text-ink-muted lg:col-span-4 lg:col-start-9 lg:mt-0 lg:self-end">
            {copy.lead}
          </Standfirst>
        </div>
      </div>
    </section>
  );
}
