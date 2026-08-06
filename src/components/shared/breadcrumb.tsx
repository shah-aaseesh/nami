import type { Route } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd, type Crumb } from "@/components/seo/structured-data";

export function Breadcrumb({ trail }: { trail: readonly Crumb[] }) {
  const lastIndex = trail.length - 1;

  return (
    <nav aria-label="Breadcrumb">
      <BreadcrumbJsonLd trail={trail} />
      <ol className="flex flex-wrap items-center gap-x-3 font-body text-xs font-medium tracking-widest uppercase">
        {trail.map((crumb, index) => (
          <li className="flex items-center gap-x-3" key={crumb.path}>
            {index === lastIndex ? (
              <span aria-current="page" className="text-ink-muted">
                {crumb.name}
              </span>
            ) : (
              <Link
                className="text-ink transition-colors hover:text-accent"
                href={crumb.path as Route}
              >
                {crumb.name}
              </Link>
            )}
            {index === lastIndex ? null : (
              <span aria-hidden="true" className="text-ink-muted">
                /
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
