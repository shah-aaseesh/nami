import type { Metadata, MetadataRoute } from "next";

const FALLBACK_SITE_ORIGIN = "https://college.nami.edu.np";

export const siteOrigin = (
  process.env.SITE_URL ?? FALLBACK_SITE_ORIGIN
).replace(/\/+$/, "");

export const siteUrl = new URL(siteOrigin);

export const siteConfig = {
  name: "NAMI College",
  legalName: "Naaya Aayam Multi-Disciplinary Institute",
  title: "NAMI College — Transform yourself, to lead the world",
  titleTemplate: "%s | NAMI College",
  description:
    "NAMI College, Kathmandu, established 2013 — Cambridge A-Level, +2 NEB and University of Northampton degree programmes at Naaya Aayam Multi-Disciplinary Institute.",
  locale: "en_US",
  themeColor: "#bc2125",
} as const;

type SitemapEntry = MetadataRoute.Sitemap[number];

export type SiteRoute = {
  path: string;
  changeFrequency: NonNullable<SitemapEntry["changeFrequency"]>;
  priority: number;
};

export const siteRoutes: readonly SiteRoute[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/events", changeFrequency: "monthly", priority: 0.8 },
  { path: "/news", changeFrequency: "monthly", priority: 0.8 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.8 },
];

export type SocialImage = {
  url: string;
  width: number;
  height: number;
  alt: string;
};

type PageMetadataInput = {
  path: string;
  title?: string;
  description?: string;
  image?: SocialImage;
};

export function absoluteUrl(path: string): string {
  const basePath = siteUrl.pathname.replace(/\/+$/, "");
  const suffix = path === "/" ? "" : path;
  return new URL(`${basePath}${suffix}` || "/", siteUrl).toString();
}

export function createMetadata({
  path,
  title,
  description = siteConfig.description,
  image,
}: PageMetadataInput): Metadata {
  const canonical = absoluteUrl(path);
  const socialTitle = title ?? siteConfig.title;
  const images = image ? [image] : undefined;

  return {
    metadataBase: siteUrl,
    title: title ?? {
      default: siteConfig.title,
      template: siteConfig.titleTemplate,
    },
    description,
    applicationName: siteConfig.name,
    alternates: { canonical },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      url: canonical,
      title: socialTitle,
      description,
      images,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title: socialTitle,
      description,
      images,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}
