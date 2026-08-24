"use client";

import { CheckIcon, Copy01Icon, Mail01Icon } from "@hugeicons/core-free-icons";
import { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Eyebrow, H2, P, Standfirst } from "@/components/ui/typography";
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
  const [copied, setCopied] = useState(false);

  const mailtoHref = `mailto:${copy.email}?subject=NAMI%20Alumni%20Network%20Registration%20-%20[Your%20Name]&body=Dear%20NAMI%20Alumni%20Relations,%0D%0A%0D%0AI%20am%20a%20NAMI%20graduate%20and%20would%20like%20to%20update%20my%20details%20/%20join%20the%20Alumni%20Network.%0D%0A%0D%0AName:%20%0D%0ABatch%20/%20Graduation%20Year:%20%0D%0AProgramme:%20%0D%0ACurrent%20Organization%20&%20Role:%20%0D%0ACity%20&%20Country:%20%0D%0APhone%20/%20WhatsApp:%20%0D%0ALinkedIn%20Profile:%20%0D%0A%0D%0AHow%20I%20would%20like%20to%20contribute:%20[Mentorship%20/%20Guest%20Lecture%20/%20Networking%20/%20Stay%20In%20Touch]%0D%0A%0D%0AThank%20you,%0D%0A[Your%20Name]`;

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(copy.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // ignore
    }
  };

  return (
    <section className="gutter-x section-y" id="connect">
      <div className="mx-auto max-w-page">
        <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-surface-raised p-8 sm:p-12 lg:p-16 shadow-xs">
          <div className="max-w-3xl">
            <Eyebrow>{copy.eyebrow}</Eyebrow>

            <H2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-display font-normal text-ink">
              {copy.heading}
            </H2>

            <Standfirst className="mt-4 text-ink-muted">
              {copy.standfirst}
            </Standfirst>

            <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
              <a
                href={mailtoHref}
                className={cn(
                  buttonVariants({ size: "lg", variant: "default" }),
                  "inline-flex items-center justify-center gap-2 px-6 shadow-xs",
                )}
              >
                <Icon icon={Mail01Icon} className="size-4" />
                <span>Register with Alumni Office</span>
              </a>

              <Button
                variant="outline"
                size="lg"
                onClick={handleCopyEmail}
                className="gap-2 px-5 text-xs text-ink min-h-11 sm:min-h-0"
              >
                <Icon
                  icon={copied ? CheckIcon : Copy01Icon}
                  className={cn("size-4", copied ? "text-accent" : "")}
                />
                <span>{copied ? "Email Copied!" : copy.email}</span>
              </Button>
            </div>

            <P className="mt-6 text-xs text-ink-muted">
              Direct inquiries:{" "}
              <span className="font-semibold text-ink">{copy.email}</span> ·
              Gokarneshwor-7, Kathmandu, Nepal
            </P>
          </div>
        </div>
      </div>
    </section>
  );
}
