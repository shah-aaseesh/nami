import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import { CampusLocations } from "./_components/campus-locations";
import { contactCopy } from "./_components/contact-copy";
import { ContactFormSection } from "./_components/contact-form-section";
import { ContactMasthead } from "./_components/contact-masthead";

export const metadata: Metadata = createMetadata({
  path: "/contact",
  title: contactCopy.meta.title,
  description: contactCopy.meta.description,
});

export default function ContactPage() {
  return (
    <>
      <ContactMasthead />
      <CampusLocations />
      <ContactFormSection />
    </>
  );
}
