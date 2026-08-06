import { Reveal } from "@/components/motion/reveal";
import { Eyebrow, H2, Standfirst } from "@/components/ui/typography";
import { content, isPlaceholder } from "@/lib/content";
import { contactCopy } from "./contact-copy";
import { ContactForm } from "./contact-form";

export async function ContactFormSection() {
  const [institution, levels] = await Promise.all([
    content.getInstitution(),
    content.getAcademicLevels(),
  ]);
  const copy = contactCopy.form;

  const email = institution.contact.email;
  if (email === null || isPlaceholder(email)) return null;

  const topics = [
    copy.topicGeneral,
    ...levels.map((level) => level.title),
    copy.topicOther,
  ];

  return (
    <section className="gutter-x section-y" id="enquiry">
      <div className="mx-auto max-w-page lg:grid lg:grid-cols-12 lg:gap-x-10">
        <div className="lg:col-span-4">
          <Eyebrow>{copy.eyebrow}</Eyebrow>
          <H2 className="mt-5">{copy.heading}</H2>
          <Standfirst className="mt-6">{copy.standfirst(email)}</Standfirst>
        </div>

        <Reveal className="mt-10 lg:col-span-7 lg:col-start-6 lg:mt-0">
          <ContactForm email={email} topics={topics} />
        </Reveal>
      </div>
    </section>
  );
}
