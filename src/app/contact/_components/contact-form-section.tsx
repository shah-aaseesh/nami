import { Reveal } from "@/components/motion/reveal";
import { Eyebrow, H2, Standfirst } from "@/components/ui/typography";
import { content } from "@/lib/content";
import { contactCopy } from "./contact-copy";
import { ContactForm } from "./contact-form";

export async function ContactFormSection() {
  const [institution, levels] = await Promise.all([
    content.getInstitution(),
    content.getAcademicLevels(),
  ]);

  const copy = contactCopy.form;

  const email = institution.contact.email;
  if (email === null) return null;

  const topics = [
    copy.topicGeneral,
    ...levels.map((level) => institution.entities[level.entity].name),
    copy.topicOther,
  ];

  return (
    <section className="gutter-x section-y" id="enquiry">
      <div className="mx-auto max-w-page lg:grid lg:grid-cols-12 lg:gap-x-10">
        <div className="lg:col-span-4">
          <div className="flex items-center gap-5">
            <Eyebrow>{copy.heading}</Eyebrow>
            <span className="h-px flex-1 bg-border" />
          </div>
          <H2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl">
            {copy.eyebrow ?? "Enquiry"}
          </H2>
          <Standfirst className="mt-6">{copy.standfirst(email)}</Standfirst>
        </div>

        <Reveal className="mt-10 lg:col-span-7 lg:col-start-6 lg:mt-0">
          <ContactForm email={email} topics={topics} />
        </Reveal>
      </div>
    </section>
  );
}
