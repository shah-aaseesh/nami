"use client";

import type { Route } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { H6, P } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

// Cookie icon SVG component
function CookieIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      fill="none"
      height="24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="24"
      {...props}
    >
      <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
      <path d="M8.5 8.5v.01" />
      <path d="M16 15.5v.01" />
      <path d="M12 12v.01" />
      <path d="M11 17v.01" />
      <path d="M7 14v.01" />
    </svg>
  );
}

const STORAGE_KEY = "nami_cookie_consent";

declare global {
  interface Window {
    gtag?: (
      command: "consent" | "config" | "event" | "js" | "set",
      action: string,
      params?: Record<string, unknown>,
    ) => void;
  }
}

export function CookieConsent() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const existingChoice = localStorage.getItem(STORAGE_KEY);
    if (!existingChoice) {
      // Small timeout for smooth natural appearance after initial page load
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleConsent = (type: "granted" | "denied") => {
    try {
      localStorage.setItem(STORAGE_KEY, type);
      localStorage.setItem(`${STORAGE_KEY}_timestamp`, new Date().toISOString());

      // Update Google Consent Mode v2 if gtag is initialized
      if (typeof window !== "undefined" && typeof window.gtag === "function") {
        window.gtag("consent", "update", {
          ad_storage: type,
          analytics_storage: type,
          ad_user_data: type,
          ad_personalization: type,
        });
      }

      // Dispatch event for any third-party pixels (Meta, AdSense, etc.)
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("nami-consent-update", {
            detail: { consent: type },
          }),
        );
      }
    } catch {
      // Local storage might be disabled in private mode
    }

    setIsOpen(false);
  };

  if (!mounted || !isOpen) {
    return null;
  }

  return (
    <aside
      aria-label="Cookie and Privacy Consent"
      aria-live="polite"
      className={cn(
        "fixed bottom-4 left-4 right-4 z-50 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-md",
        "rounded-2xl border border-border/90 bg-surface-raised/95 backdrop-blur-md p-5 sm:p-6 shadow-2xl shadow-black/15 ring-1 ring-black/5 animate-in fade-in slide-in-from-bottom-5 duration-300",
      )}
    >
      <div className="flex items-start gap-3.5">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-100 text-primary-700 border border-primary-200/80 shadow-2xs">
          <CookieIcon className="size-5" />
        </div>

        <div className="min-w-0 flex-1">
          <H6 as="h2" className="text-base font-semibold text-ink">
            Cookie & Privacy Preferences
          </H6>
          <P className="mt-1.5 text-xs text-ink-muted leading-relaxed text-justify [text-align-last:left]">
            We use cookies to analyze site traffic, personalize content, and support our educational and advertising initiatives. You can read more in our{" "}
            <Link
              className="font-medium text-accent underline underline-offset-2 hover:text-accent/80"
              href={"/privacy" as Route}
            >
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link
              className="font-medium text-accent underline underline-offset-2 hover:text-accent/80"
              href={"/terms" as Route}
            >
              Terms
            </Link>
            .
          </P>

          <div className="mt-4 flex flex-wrap items-center gap-2.5 sm:gap-3">
            <Button
              className="flex-1 shrink-0 rounded-full font-semibold shadow-xs"
              onClick={() => handleConsent("granted")}
              size="sm"
              type="button"
            >
              Accept All
            </Button>

            <Button
              className="flex-1 shrink-0 rounded-full border-border/80 bg-surface text-ink hover:bg-neutral-100 font-medium shadow-2xs"
              onClick={() => handleConsent("denied")}
              size="sm"
              type="button"
              variant="outline"
            >
              Necessary Only
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
}
