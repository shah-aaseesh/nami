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
    href: "/institutions/college",
    descriptor: "Three institutions, one academic pathway.",
    children: [
      { label: "NAMI International School", href: "/institutions/school" },
      { label: "NAMI College", href: "/institutions/college" },
      {
        label: "Multi-Disciplinary Institute",
        href: "/institutions/bachelors",
      },
    ],
  },
  {
    label: "Admissions",
    href: "/admissions",
    descriptor: "Join our diverse community.",
  },
  {
    label: "Student Life",
    href: "/student-life",
    descriptor: "Experience vibrant campus life.",
  },
  {
    label: "Resources",
    href: "/notices",
    descriptor: "Stay updated with latest happenings and view our gallery.",
    children: [
      { label: "Notices", href: "/notices" },
      { label: "Gallery", href: "/gallery" },
    ],
  },
  { label: "Contact", href: "/contact", descriptor: "Get in touch with us." },
];
