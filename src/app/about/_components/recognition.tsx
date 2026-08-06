import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { H4, P, Standfirst } from "@/components/ui/typography";
import { content } from "@/lib/content";
import { DocumentRow } from "./document-row";

export async function Recognition() {
  const [about, affiliations] = await Promise.all([
    content.getAboutCopy(),
    content.getAffiliations(),
  ]);

  const section = about.sections.recognition;
  const ordered = [...affiliations].sort((a, b) => a.sinceYear - b.sinceYear);

  return (
    <section className="field-teal relative overflow-hidden gutter-x section-y">
      <div className="mx-auto max-w-page">
        <SplitText
          as="h2"
          className="max-w-2xl font-display text-4xl font-normal text-balance sm:text-5xl"
        >
          {section.heading}
        </SplitText>
        {section.standfirst === null ? null : (
          <Reveal delay={0.15}>
            <Standfirst className="mt-6 max-w-xl text-white/90">
              {section.standfirst}
            </Standfirst>
          </Reveal>
        )}

        {ordered.length === 0 ? null : (
          <Reveal className="mt-14 lg:mt-20" stagger={0.09}>
            <ol className="flex flex-col gap-8 lg:gap-12">
              {ordered.map((item) => (
                <li data-reveal-item="" key={item.id}>
                  <DocumentRow
                    measure="wide"
                    rail={
                      <div className="flex items-center gap-3">
                        <span className="block font-display text-4xl font-light text-white">
                          {item.sinceYear}
                        </span>
                        <span className="font-body text-xs font-semibold tracking-wider text-white/70 uppercase">
                          Since
                        </span>
                      </div>
                    }
                  >
                    <div className="group rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-md transition-all duration-300 hover:border-white/40 hover:bg-white/15">
                      <H4 as="h3" className="text-white">
                        {item.body}
                      </H4>
                      <P className="mt-3 text-base text-white/80">
                        {item.scope}
                      </P>
                      {item.note === null ? null : (
                        <p className="mt-4 inline-block rounded-full bg-white/20 px-3 py-1 font-body text-xs font-medium text-white">
                          {item.note}
                        </p>
                      )}
                    </div>
                  </DocumentRow>
                </li>
              ))}
            </ol>
          </Reveal>
        )}
      </div>
    </section>
  );
}
