import { Display, Eyebrow, Standfirst } from "@/components/ui/typography";
import { noticesCopy } from "./notices-copy";

export function NoticesMasthead() {
  return (
    <section className="gutter-x section-y-masthead">
      <div className="mx-auto max-w-page">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-7">
            <Eyebrow>{noticesCopy.masthead.eyebrow}</Eyebrow>
            <Display className="mt-5 text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
              {noticesCopy.masthead.heading}
            </Display>
          </div>
          <div className="mt-8 max-w-xl lg:col-span-4 lg:col-start-9 lg:mt-0 lg:self-end">
            <Standfirst>{noticesCopy.masthead.standfirst}</Standfirst>
          </div>
        </div>
      </div>
    </section>
  );
}
