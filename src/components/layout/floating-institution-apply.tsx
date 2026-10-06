"use client";

import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { Icon } from "@/components/ui/icon";
import { gsap } from "@/lib/gsap";
import { ArrowRightIcon, MortarboardIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

const BACHELORS_COURSES: Record<
  string,
  { title: string; courseParam: string }
> = {
  "computer-science": {
    title: "BSc. (Hons) Computer Science",
    courseParam: "BSc. (Hons) Computer Science",
  },
  "software-engineering": {
    title: "BSc. (Hons) Software Engineering",
    courseParam: "BSc. (Hons) Software Engineering",
  },
  "networking-engineering": {
    title: "BSc. (Hons) Networking Engineering",
    courseParam: "BSc. (Hons) Networking Engineering",
  },
  "environmental-science": {
    title: "BSc. (Hons) Environmental Science",
    courseParam: "BSc. (Hons) Environmental Science",
  },
  "business-administration": {
    title: "BSc. (Hons) Business Administration",
    courseParam: "BSc. (Hons) Business Administration",
  },
  "msc-computing": {
    title: "MSc Computer Science",
    courseParam: "MSc Computer Science",
  },
  "environmental-studies": {
    title: "BSc. Environmental Studies (KU)",
    courseParam: "BSc. Environmental Studies (KU)",
  },
};

function getInstitutionApplyLink(pathname: string): {
  label: string;
  href: Route;
} {
  // 1. School & subpages
  if (pathname.startsWith("/institutions/school")) {
    return {
      label: "Apply to School & +2",
      href: "/admissions?program=school-plus-two#apply" as Route,
    };
  }

  // 2. A-Levels & subpages
  if (pathname.startsWith("/institutions/a-levels")) {
    return {
      label: "Apply for A-Levels",
      href: "/admissions?program=a-level#apply" as Route,
    };
  }

  // 3. Bachelors & course pages
  if (pathname.startsWith("/institutions/bachelors")) {
    const courseSlug = pathname
      .replace(/^\/institutions\/bachelors\/?/, "")
      .split("/")[0];
    if (courseSlug && BACHELORS_COURSES[courseSlug]) {
      const course = BACHELORS_COURSES[courseSlug];
      return {
        label: `Apply for ${course.title}`,
        href: `/admissions?program=degree&course=${encodeURIComponent(course.courseParam)}#apply` as Route,
      };
    }

    return {
      label: "Apply for Degree",
      href: "/admissions?program=degree#apply" as Route,
    };
  }

  // 4. CTEVT
  if (pathname.startsWith("/institutions/ctevt") || pathname === "/ctevt") {
    return {
      label: "Apply for CTEVT",
      href: "/admissions?program=ctevt#apply" as Route,
    };
  }

  // 5. Admissions page itself
  if (pathname.startsWith("/admissions")) {
    return {
      label: "Jump to Application Form",
      href: "#apply" as Route,
    };
  }

  // 6. Default for all other pages (Home, About, Student Life, Notices, Alumni, Careers, Faculty, Contact, etc.)
  return {
    label: "Apply for Admission at NAMI",
    href: "/admissions#apply" as Route,
  };
}

export function FloatingInstitutionApply() {
  const pathname = usePathname();
  const applyInfo = getInstitutionApplyLink(pathname);
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updatePosition = () => {
      const footerBar =
        document.getElementById("site-footer-bottom-bar") ||
        document.querySelector("footer .field-ink");

      if (!footerBar) {
        el.style.transform = "translate3d(0, 0, 0)";
        return;
      }

      const rect = footerBar.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      // If the top of the footer black bar enters the viewport
      const overlap = windowHeight - rect.top;
      if (overlap > 0) {
        // Elevate button above the top edge of the black bar + 8px safety buffer
        el.style.transform = `translate3d(0, -${overlap + 8}px, 0)`;
      } else {
        el.style.transform = "translate3d(0, 0, 0)";
      }
    };

    updatePosition();
    gsap.ticker.add(updatePosition);
    window.addEventListener("scroll", updatePosition, { passive: true });
    window.addEventListener("resize", updatePosition, { passive: true });

    return () => {
      gsap.ticker.remove(updatePosition);
      window.removeEventListener("scroll", updatePosition);
      window.removeEventListener("resize", updatePosition);
    };
  }, []);

  return (
    <aside
      ref={containerRef}
      aria-label="Quick Apply Action"
      className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] right-4 sm:bottom-6 sm:right-6 z-40 animate-in fade-in slide-in-from-bottom-3 duration-300 pointer-events-auto select-none will-change-transform"
    >
      <Link
        href={applyInfo.href}
        title={applyInfo.label}
        className={cn(
          "group inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-accent px-3.5 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm font-semibold text-accent-foreground shadow-[0_4px_18px_rgba(189,27,33,0.38)] ring-1 ring-white/20 transition-all duration-200 hover:bg-accent/90 hover:scale-105 hover:shadow-[0_6px_24px_rgba(189,27,33,0.48)] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 cursor-pointer touch-manipulation whitespace-nowrap",
        )}
      >
        <Icon
          icon={MortarboardIcon}
          className="size-3.5 sm:size-4 shrink-0 transition-transform duration-200 group-hover:-rotate-12"
        />
        <span className="font-semibold tracking-wide">Apply Now</span>
        <Icon
          icon={ArrowRightIcon}
          className="size-3 sm:size-3.5 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
        />
      </Link>
    </aside>
  );
}

export const FloatingApplyButton = FloatingInstitutionApply;
