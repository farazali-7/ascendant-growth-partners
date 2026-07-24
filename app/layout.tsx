import type { Metadata, Viewport } from "next";
import { Newsreader, Public_Sans } from "next/font/google";

import { SkipLink } from "@/components/shared/skip-link";
import { MAIN_CONTENT_ID } from "@/components/shared/landmarks";
import { SiteHeader } from "@/components/navigation";
import { SiteFooter } from "@/components/layout/site-footer";
import { siteConfig } from "@/lib/site-config";

import "./globals.css";

/**
 * Display serif. Newsreader is drawn for screen reading rather than adapted
 * from print, so it holds its colour at both headline and standfirst sizes.
 * Variable axis avoids shipping discrete weight files.
 */
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  display: "swap",
});

/**
 * Body grotesque. Public Sans is an institutional typeface (originally drawn
 * for US federal use) — sober and neutral without reading as a system default.
 */
const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Executive Advisory`,
    // Page-level titles compose against this rather than repeating the firm name.
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — Executive Advisory`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Executive Advisory`,
    description: siteConfig.description,
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
  formatDetection: {
    // Suppresses iOS auto-linking figures in copy as phone numbers.
    telephone: false,
    address: false,
    email: false,
  },
};

export const viewport: Viewport = {
  themeColor: siteConfig.themeColor,
  // Declared explicitly: the system ships light-only by brand decision.
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${publicSans.variable} ${newsreader.variable} h-full antialiased`}
    >
      {/*
        suppressHydrationWarning tolerates attributes injected onto <body> by
        browser extensions (e.g. ColorZilla's `cz-shortcut-listen`, Grammarly,
        Dark Reader) before React hydrates. It suppresses only this element's
        own attribute diff — one level deep — so genuine mismatches inside the
        app are still reported.
      */}
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        <SkipLink />
        <SiteHeader />
        {/*
          The main landmark lives here rather than in each page so the skip
          target can never go missing. The sticky header overlays the top of
          main (via its negative margin) so a hero can sit beneath a
          transparent bar without any layout shift.
        */}
        <main id={MAIN_CONTENT_ID} className="flex flex-1 flex-col">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
