import { Display, Eyebrow, Standfirst } from "@/components/ui/typography";

export type CareersMastheadCopy = {
  readonly eyebrow: string;
  readonly heading: string;
  readonly standfirst: string;
};

export function CareersMasthead({
  copy,
}: {
  readonly copy: CareersMastheadCopy;
}) {
  return (
    <section className="gutter-x section-y-masthead">
      <div className="mx-auto max-w-page">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-7">
            <Eyebrow>{copy.eyebrow}</Eyebrow>
            <Display className="mt-5">{copy.heading}</Display>
          </div>
          <div className="mt-8 max-w-xl lg:col-span-4 lg:col-start-9 lg:mt-0 lg:self-end">
            <Standfirst>{copy.standfirst}</Standfirst>
          </div>
        </div>
      </div>
    </section>
  );
}
