import Image from "next/image";
import { Eyebrow, H3, P } from "@/components/ui/typography";

export function PearsonVueBanner() {
  return (
    <section className="gutter-x py-8 sm:py-12" id="pearson-vue">
      <div className="mx-auto max-w-page">
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-border/80 bg-linear-to-br from-white via-surface-raised to-neutral-50 p-6 sm:p-8 lg:p-10 shadow-xs">
          {/* Subtle decorative background glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-[#003B71]/5 blur-3xl"
          />

          <div className="relative flex flex-col md:flex-row items-center gap-6 sm:gap-8 lg:gap-12">
            {/* Logo Badge Container */}
            <div className="shrink-0 flex items-center justify-center rounded-2xl bg-white border border-border/70 p-4 sm:p-5 shadow-sm max-w-[220px] sm:max-w-[240px] w-full">
              <Image
                alt="Pearson VUE-Authorized Test Center Logo"
                className="h-auto w-full max-h-24 object-contain"
                height={120}
                sizes="(max-width: 640px) 200px, 240px"
                src="/partners/pearson-vue.jpg"
                width={240}
              />
            </div>

            {/* Content Details */}
            <div className="flex-1 text-center md:text-left">
              <Eyebrow className="text-[#BD1B21] font-semibold tracking-wider mb-2">
                OFFICIAL TESTING CENTRE
              </Eyebrow>

              <H3 className="font-display text-2xl sm:text-3xl font-medium text-ink tracking-tight mb-2.5">
                Pearson VUE-Authorized Test Center
              </H3>

              <P className="text-sm sm:text-base text-ink-muted leading-relaxed max-w-3xl">
                NAMI is an officially authorized Pearson VUE test center,
                empowering students and professionals across Nepal to take
                internationally recognized IT certifications, academic
                assessments, and global professional licensure examinations in a
                secure, state-of-the-art testing facility.
              </P>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
