import { Reveal, RevealItem } from "@/components/motion/reveal";
import { Display, Eyebrow, Standfirst } from "@/components/ui/typography";
import { noticesCopy } from "./notices-copy";

export function NoticesMasthead() {
  return (
    <section className="gutter-x section-y-masthead">
      <div className="mx-auto max-w-page">
        <Reveal atFold stagger={0.08}>
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-10">
            <div className="lg:col-span-7">
              <RevealItem>
                <Eyebrow>{noticesCopy.masthead.eyebrow}</Eyebrow>
              </RevealItem>
              <RevealItem className="mt-5">
                <Display className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                  {noticesCopy.masthead.heading}
                </Display>
              </RevealItem>
            </div>
            <RevealItem className="mt-8 max-w-xl lg:col-span-4 lg:col-start-9 lg:mt-0 lg:self-end">
              <Standfirst>{noticesCopy.masthead.standfirst}</Standfirst>
            </RevealItem>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
