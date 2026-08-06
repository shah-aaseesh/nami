import type { Metadata, Viewport } from "next";
import {
  Bricolage_Grotesque,
  Instrument_Serif,
  Inter_Tight,
} from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SmoothScrollProvider } from "@/components/motion/smooth-scroll-provider";
import { StructuredData } from "@/components/seo/structured-data";
import { createMetadata, siteConfig } from "@/lib/seo";
import "./globals.css";

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-bricolage-grotesque",
  subsets: ["latin"],
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = createMetadata({ path: "/" });

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: siteConfig.themeColor,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bricolageGrotesque.variable} ${interTight.variable} ${instrumentSerif.variable} font-sans antialiased`}
    >
      <body>
        <StructuredData />
        <SmoothScrollProvider chrome={<SiteHeader />}>
          <div className="flex min-h-svh flex-col">
            <main id="main" className="flex-1 pt-20">
              {children}
            </main>
            <SiteFooter />
          </div>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
