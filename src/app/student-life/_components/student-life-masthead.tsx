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
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-10 items-end">
          <div className="lg:col-span-7">
            <Eyebrow>College Life</Eyebrow>
            <Display className="mt-3 text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
              {copy.title}
            </Display>
          </div>

          <Standfirst className="mt-5 max-w-xl text-neutral-700 lg:col-span-5 lg:mt-0">
            {copy.lead}
          </Standfirst>
        </div>
      </div>
    </section>
  );
}
