import Link from "next/link";
import { Reveal, RevealItem } from "@/components/motion/reveal";

export function GallerySubmissionBanner() {
  return (
    <Reveal className="mt-12 sm:mt-16" y={16}>
      <RevealItem>
        <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-surface/90 p-5 sm:p-7 shadow-xs">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
            {/* Left Side: Circular Red Camera Icon + Copy */}
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="flex size-12 sm:size-14 shrink-0 items-center justify-center rounded-full bg-[#BD1B21] text-white shadow-md shadow-[#BD1B21]/20">
                <svg
                  className="size-6 sm:size-7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="12" cy="13" r="4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              <div>
                <h3 className="font-display text-base sm:text-lg font-bold text-ink">
                  Capture your best memories!
                </h3>
                <p className="font-body text-xs sm:text-sm text-ink-muted mt-0.5">
                  Submit your photos and be featured in our gallery.
                </p>
              </div>
            </div>

            {/* Right Side: Action Button */}
            <div className="shrink-0">
              <Link
                className="group inline-flex items-center gap-2 rounded-xl border border-border-strong bg-surface px-5 py-2.5 font-body text-xs sm:text-sm font-semibold text-ink shadow-2xs transition-all duration-200 hover:border-[#BD1B21] hover:bg-[#BD1B21] hover:text-white hover:shadow-md"
                href="/contact#inquiry-form"
              >
                <span>Submit Your Photos</span>
                <svg
                  className="size-4 transition-transform group-hover:-translate-y-0.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeLinecap="round" strokeLinejoin="round" />
                  <polyline points="17 8 12 3 7 8" strokeLinecap="round" strokeLinejoin="round" />
                  <line strokeLinecap="round" strokeLinejoin="round" x1="12" x2="12" y1="3" y2="15" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </RevealItem>
    </Reveal>
  );
}
