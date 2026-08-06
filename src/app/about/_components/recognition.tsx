import { Reveal } from "@/components/motion/reveal";
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
    <section className="field-teal gutter-x section-y">
      <div className="mx-auto max-w-page">
        <h2 className="max-w-2xl font-display text-5xl font-normal text-balance">
          {section.heading}
        </h2>
        {section.standfirst === null ? null : (
          <Standfirst className="mt-6 max-w-xl">
            {section.standfirst}
          </Standfirst>
        )}

        {ordered.length === 0 ? null : (
          <Reveal className="mt-16 lg:mt-24" stagger={0.09}>
            <ol className="flex flex-col gap-12 lg:gap-16">
              {ordered.map((item) => (
                <li data-reveal-item="" key={item.id}>
                  <DocumentRow
                    measure="wide"
                    rail={
                      <span className="block font-display text-4xl text-accent">
                        {item.sinceYear}
                      </span>
                    }
                  >
                    <H4 as="h3">{item.body}</H4>
                    <P className="mt-3 text-lg">{item.scope}</P>
                    {item.note === null ? null : (
                      <p className="mt-4 font-body text-sm font-medium text-accent">
                        {item.note}
                      </p>
                    )}
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
