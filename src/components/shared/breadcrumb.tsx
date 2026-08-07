import type { Route } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd, type Crumb } from "@/components/seo/structured-data";

export function Breadcrumb({ 
  trail, 
  theme = "light" 
}: { 
  trail: readonly Crumb[];
  theme?: "light" | "dark";
}) {
  const lastIndex = trail.length - 1;

  const activeColor = theme === "dark" ? "text-white" : "text-ink";
  const hoverColor = theme === "dark" ? "hover:text-accent" : "hover:text-accent";
  const mutedColor = theme === "dark" ? "text-white/60" : "text-ink-muted";

  return (
    <nav aria-label="Breadcrumb">
      <BreadcrumbJsonLd trail={trail} />
      <ol className="flex flex-wrap items-center gap-x-3 font-body text-xs font-medium tracking-widest uppercase">
        {trail.map((crumb, index) => (
          <li className="flex items-center gap-x-3" key={crumb.path}>
            {index === lastIndex ? (
              <span aria-current="page" className={mutedColor}>
                {crumb.name}
              </span>
            ) : (
              <Link
                className={`${activeColor} transition-colors ${hoverColor}`}
                href={crumb.path as Route}
              >
                {crumb.name}
              </Link>
            )}
            {index === lastIndex ? null : (
              <span aria-hidden="true" className={mutedColor}>
                /
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
