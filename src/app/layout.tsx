import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inter_Tight } from "next/font/google";
import { SmoothScrollProvider } from "@/components/motion/smooth-scroll-provider";
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

export const metadata: Metadata = createMetadata({ path: "/" });

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: siteConfig.themeColor,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bricolageGrotesque.variable} ${interTight.variable} font-sans antialiased`}
    >
      <body>
        <SmoothScrollProvider chrome={null}>
          <div className="flex min-h-svh flex-col">
            <main id="main" className="flex-1">
              {children}
            </main>
          </div>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
