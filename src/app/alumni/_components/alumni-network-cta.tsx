import { Mail01Icon } from "@hugeicons/core-free-icons";
import { buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Eyebrow, H2, Standfirst } from "@/components/ui/typography";
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
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="flex items-center gap-5">
                <Eyebrow>{copy.heading}</Eyebrow>
                <span className="h-px flex-1 bg-border" />
              </div>

              <H2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-display font-normal">
                {copy.eyebrow ?? "Stay Connected"}
              </H2>

              <Standfirst className="mt-4">{copy.standfirst}</Standfirst>
            </div>

            <div className="flex flex-col items-start gap-4 lg:items-end lg:shrink-0">
              <a
                href={mailtoHref}
                className={cn(
                  buttonVariants({ size: "lg", variant: "default" }),
                  "inline-flex items-center justify-center gap-2 px-6",
                )}
              >
                <Icon icon={Mail01Icon} className="size-4" />
                <span>Register with Alumni Office</span>
              </a>

              <span className="text-sm text-ink-muted">{copy.email}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
