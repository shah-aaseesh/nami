import { Display, Eyebrow, Standfirst } from "@/components/ui/typography";
import { noticesCopy } from "./notices-copy";

export function NoticesMasthead() {
  return (
    <section className="gutter-x section-y-masthead">
      <div className="mx-auto max-w-page">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-10 items-end">
          <div className="lg:col-span-7">
            <Eyebrow>{noticesCopy.masthead.eyebrow}</Eyebrow>
            <Display className="mt-3 text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
              {noticesCopy.masthead.heading}
            </Display>
          </div>
          <div className="mt-5 max-w-xl text-neutral-700 lg:col-span-5 lg:mt-0">
            <Standfirst>{noticesCopy.masthead.standfirst}</Standfirst>
          </div>
        </div>
      </div>
    </section>
  );
}
