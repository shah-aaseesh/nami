import { Reveal } from "@/components/motion/reveal";
import { SectionHeader } from "@/components/shared/section-header";
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
      <div className="mx-auto max-w-page">
        <SectionHeader
          description={copy.standfirst(email)}
          eyebrow={copy.heading}
          layout="split"
          title={copy.eyebrow ?? "Enquiry"}
        />

        <Reveal className="mt-12 lg:mt-16 max-w-3xl">
          <ContactForm email={email} topics={topics} />
        </Reveal>
      </div>
    </section>
  );
}
