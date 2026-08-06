import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SmoothScrollProvider } from "@/components/motion/smooth-scroll-provider";
import { StructuredData } from "@/components/seo/structured-data";
import { createMetadata, siteConfig } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
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
      className={`${inter.variable} ${instrumentSerif.variable} font-sans antialiased`}
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
