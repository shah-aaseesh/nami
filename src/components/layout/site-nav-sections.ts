import { institutionPath } from "@/lib/content/institutions";

export type SiteNavItem = {
  readonly label: string;
  readonly href: string;
  readonly descriptor?: string;
  readonly children?: { label: string; href: string }[];
};

export const SITE_NAV_ITEMS: SiteNavItem[] = [
  { label: "Home", href: "/", descriptor: "Start your journey here." },
  {
    label: "About Us",
    href: "/about",
    descriptor: "Discover our mission, vision, and values.",
    children: [
      { label: "Our Story", href: "/about" },
      { label: "Faculty & Leadership", href: "/faculty" },
    ],
  },
  {
    label: "Institutions",
    href: institutionPath("college"),
    descriptor: "Explore our institutions, each separately accredited.",
    children: [
      { label: "NAMI International School", href: institutionPath("school") },
      { label: "NAMI A-Levels", href: institutionPath("college") },
      {
        label: "Naaya Aayam Multi-Disciplinary Institute",
        href: institutionPath("bachelors"),
      },
    ],
  },
  {
    label: "Admissions",
    href: "/admissions",
    descriptor: "Join our diverse community.",
  },
  {
    label: "Gallery",
    href: "/gallery",
    descriptor: "View our photo gallery.",
  },
  {
    label: "Careers",
    href: "/careers",
    descriptor: "See what the group is recruiting for.",
  },
];

export const SITE_FOOTER_NAV_ITEMS: SiteNavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Institutions", href: institutionPath("college") },
  { label: "Admissions", href: "/admissions" },
  { label: "Student Life", href: "/student-life" },
  { label: "Gallery", href: "/gallery" },
  { label: "Notices", href: "/notices" },
];
