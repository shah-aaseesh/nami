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
    label: "Academics",
    href: "/programs",
    descriptor: "Explore our academic offerings.",
    children: [
      { label: "School", href: "/programs/school" },
      { label: "+2 NEB", href: "/programs/plus-two" },
      { label: "A-Level", href: "/programs/a-level" },
      { label: "Bachelor / Master", href: "/programs/bachelor-master" },
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
    href: "/events",
    descriptor: "Stay updated with latest happenings and view our gallery.",
    children: [
      { label: "Events", href: "/events" },
      // { label: "News", href: "/news" },
      { label: "Gallery", href: "/gallery" },
    ],
  },
  { label: "Contact", href: "/contact", descriptor: "Get in touch with us." },
];
