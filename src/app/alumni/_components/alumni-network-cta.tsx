import { Mail01Icon } from "@hugeicons/core-free-icons";
import type { Route } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/shared/section-header";
import { buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

export function AlumniNetworkCta({
  copy,
}: {
  readonly copy: {
    readonly eyebrow: string;
    readonly heading: string;
    readonly standfirst: string;
    readonly email: string;
  };
}) {
  const mailtoHref = `mailto:${copy.email}?subject=NAMI%20Alumni%20Network%20Registration%20-%20[Your%20Name]&body=Dear%20NAMI%20Alumni%20Relations,%0D%0A%0D%0AI%20am%20a%20NAMI%20graduate%20and%20would%20like%20to%20update%20my%20details%20/%20join%20the%20Alumni%20Network.%0D%0A%0D%0AName:%20%0D%0ABatch%20/%20Graduation%20Year:%20%0D%0AProgramme:%20%0D%0ACurrent%20Organization%20&%20Role:%20%0D%0ACity%20&%20Country:%20%0D%0APhone%20/%20WhatsApp:%20%0D%0ALinkedIn%20Profile:%20%0D%0A%0D%0AThank%20you,%0D%0A[Your%20Name]`;

  return (
    <section className="gutter-x section-y" id="connect">
      <div className="mx-auto max-w-page">
        <div className="field-brand rounded-3xl p-8 sm:p-12 lg:p-16">
          <SectionHeader
            action={
              <Link
                className={cn(
                  buttonVariants({ size: "lg", variant: "default" }),
                  "inline-flex items-center justify-center gap-2 px-6",
                )}
                href={mailtoHref as Route}
              >
                <Icon className="size-4" icon={Mail01Icon} />
                <span>Email Us</span>
              </Link>
            }
            description={copy.standfirst}
            eyebrow={copy.heading}
            layout="action"
            title={copy.eyebrow ?? "Stay Connected"}
          />
        </div>
      </div>
    </section>
  );
}
