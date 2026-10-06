import type { IconSvgElement as HugeIconSvgElement } from "@hugeicons/react";
import { type ComponentType, createElement, type SVGProps } from "react";

export {
  ArrowDown01Icon as ChevronDownIcon,
  ArrowLeft01Icon as ArrowLeftIcon,
  ArrowLeft01Icon as ChevronLeftIcon,
  ArrowRight01Icon as ChevronRightIcon,
  ArrowRight01Icon as ArrowRightIcon,
  ArrowUp01Icon as ChevronUpIcon,
  ArrowUpRight01Icon as ArrowUpRightIcon,
  Asterisk02Icon as AsteriskIcon,
  Book01Icon as BookIcon,
  Calendar03Icon as CalendarIcon,
  CallIcon as PhoneIcon,
  Cancel01Icon as CloseIcon,
  Delete02Icon as TrashIcon,
  Download01Icon as DownloadIcon,
  GlobalIcon as GlobeIcon,
  GraduationScrollIcon as DiplomaIcon,
  Image01Icon as ImageIcon,
  Location01Icon as LocationIcon,
  Mail01Icon as MailIcon,
  Menu01Icon as MenuIcon,
  Mortarboard01Icon as MortarboardIcon,
  PauseIcon,
  PlayIcon,
  PlusSignIcon as PlusIcon,
  QuoteUpIcon as QuoteIcon,
  Tick02Icon as CheckIcon,
} from "@hugeicons/core-free-icons";

export type IconSvgElement =
  | HugeIconSvgElement
  | ComponentType<SVGProps<SVGSVGElement>>;
export type AnyIcon = IconSvgElement;

/**
 * Official Brand SVG Logos in their Primary Authentic Colors
 */
export function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return createElement(
    "svg",
    {
      viewBox: "0 0 24 24",
      "aria-hidden": "true",
      ...props,
    },
    createElement("circle", { cx: "12", cy: "12", r: "12", fill: "#1877F2" }),
    createElement("path", {
      d: "M15.5 12.073h-2.125V19.5h-3.125v-7.427H8.5V9.43h1.75V7.474c0-2.43 1.485-3.758 3.657-3.758 1.04 0 2.128.186 2.128.186v2.34h-1.2c-1.205 0-1.58.748-1.58 1.515v1.673h2.637l-.392 2.643z",
      fill: "#FFFFFF",
    }),
  );
}

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return createElement(
    "svg",
    {
      viewBox: "0 0 24 24",
      "aria-hidden": "true",
      ...props,
    },
    createElement(
      "defs",
      null,
      createElement(
        "linearGradient",
        {
          id: "nami-ig-gradient",
          x1: "0%",
          y1: "100%",
          x2: "100%",
          y2: "0%",
        },
        createElement("stop", { offset: "0%", stopColor: "#FFD521" }),
        createElement("stop", { offset: "30%", stopColor: "#F50000" }),
        createElement("stop", { offset: "65%", stopColor: "#B900B4" }),
        createElement("stop", { offset: "100%", stopColor: "#4B00D6" }),
      ),
    ),
    createElement("rect", {
      width: "24",
      height: "24",
      rx: "6.5",
      fill: "url(#nami-ig-gradient)",
    }),
    createElement("path", {
      d: "M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4z",
      fill: "#FFFFFF",
    }),
    createElement("circle", {
      cx: "17.2",
      cy: "6.8",
      r: "1.1",
      fill: "#FFFFFF",
    }),
    createElement("path", {
      d: "M16.5 3.5h-9a4 4 0 0 0-4 4v9a4 4 0 0 0 4 4h9a4 4 0 0 0 4-4v-9a4 4 0 0 0-4-4zm2.2 13a2.2 2.2 0 0 1-2.2 2.2h-9a2.2 2.2 0 0 1-2.2-2.2v-9a2.2 2.2 0 0 1 2.2-2.2h9a2.2 2.2 0 0 1 2.2 2.2v9z",
      fill: "#FFFFFF",
    }),
  );
}

export function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return createElement(
    "svg",
    {
      viewBox: "0 0 24 24",
      "aria-hidden": "true",
      ...props,
    },
    createElement("rect", {
      width: "24",
      height: "24",
      rx: "5",
      fill: "#0A66C2",
    }),
    createElement("path", {
      d: "M19 19h-2.8v-4.4c0-1.05-.02-2.4-1.46-2.4-1.46 0-1.68 1.14-1.68 2.32V19h-2.8V9.97h2.69v1.23h.04c.37-.71 1.3-1.46 2.65-1.46 2.84 0 3.36 1.87 3.36 4.3V19zM6.9 8.74a1.63 1.63 0 1 1 0-3.26 1.63 1.63 0 0 1 0 3.26zM8.3 19H5.5V9.97h2.8V19z",
      fill: "#FFFFFF",
    }),
  );
}

export function TikTokIcon(props: SVGProps<SVGSVGElement>) {
  return createElement(
    "svg",
    {
      viewBox: "0 0 24 24",
      "aria-hidden": "true",
      ...props,
    },
    createElement("rect", {
      width: "24",
      height: "24",
      rx: "5",
      fill: "#000000",
    }),
    createElement("path", {
      d: "M16.6 8.2c-.85-.56-1.42-1.46-1.54-2.5h-2.22v10.3c0 1.27-1.03 2.3-2.3 2.3s-2.3-1.03-2.3-2.3 1.03-2.3 2.3-2.3c.24 0 .47.04.68.11v-2.3a4.57 4.57 0 0 0-.68-.05c-2.52 0-4.56 2.04-4.56 4.54s2.04 4.54 4.56 4.54 4.56-2.04 4.56-4.54V9.82a6.38 6.38 0 0 0 3.42.98v-2.2c-.75 0-1.46-.15-1.92-.4z",
      fill: "#FE2C55",
    }),
    createElement("path", {
      d: "M15.06 5.7c-.12 1.04.45 1.94 1.3 2.5.46.25 1.17.4 1.92.4v-2.2a4.18 4.18 0 0 1-3.22-.7z",
      fill: "#00F2FE",
    }),
    createElement("path", {
      d: "M15.06 5.7v10.3c0 2.5-2.04 4.54-4.56 4.54-2.52 0-4.56-2.04-4.56-4.54s2.04-4.54 4.56-4.54c.24 0 .47.02.68.05v2.24a2.3 2.3 0 0 0-.68-.1c-1.27 0-2.3 1.03-2.3 2.35s1.03 2.3 2.3 2.3 2.3-1.03 2.3-2.3V5.7h2.26z",
      fill: "#FFFFFF",
    }),
  );
}

export function YouTubeIcon(props: SVGProps<SVGSVGElement>) {
  return createElement(
    "svg",
    {
      viewBox: "0 0 24 24",
      "aria-hidden": "true",
      ...props,
    },
    createElement("path", {
      d: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z",
      fill: "#FF0000",
    }),
    createElement("polygon", {
      points: "9.545 15.568 15.818 12 9.545 8.432",
      fill: "#FFFFFF",
    }),
  );
}

export function WhatsappIcon(props: SVGProps<SVGSVGElement>) {
  return createElement(
    "svg",
    {
      viewBox: "0 0 24 24",
      "aria-hidden": "true",
      ...props,
    },
    createElement("path", {
      d: "M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91A9.91 9.91 0 0 0 12.04 2z",
      fill: "#25D366",
    }),
    createElement("path", {
      d: "M17.47 14.38c-.3-.15-1.78-.88-2.06-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.95 1.18-.18.2-.35.23-.65.08-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.68-2.08-.18-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.07-.15-.68-1.64-.93-2.24-.24-.59-.49-.51-.68-.52-.18-.01-.38-.01-.58-.01-.2 0-.53.08-.8.38s-1.06 1.03-1.06 2.51 1.08 2.91 1.23 3.11c.15.2 2.12 3.24 5.14 4.55.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.78-.73 2.03-1.43.25-.7.25-1.3.18-1.43-.08-.13-.28-.2-.58-.35z",
      fill: "#FFFFFF",
    }),
  );
}
