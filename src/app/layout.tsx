import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/seo";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["200", "300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f4f0" },
    { media: "(prefers-color-scheme: dark)",  color: "#0e0e0d" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),

  title: {
    default:  siteConfig.pages.home.title,
    template: `%s | Joy Bliss Edmonton`,
  },
  description: siteConfig.pages.home.description,
  keywords: siteConfig.keywords,

  authors:   [{ name: "Joy Bliss", url: siteConfig.url }],
  creator:   "Joy Bliss",
  publisher: "Joy Bliss",

  // ── Icons ──
  icons: {
    icon: [
      { url: "/s.svg", sizes: "any" },
      { url: "/s.svg",     type: "image/svg", sizes: "512x512" },
      { url: "/icon-192.png", type: "image/svg", sizes: "192x192" },
    ],
    apple:    [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.ico",
  },

  // ── Manifest ──
  manifest: "/site.webmanifest",

  // ── Robots ──
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ── Open Graph ──
  openGraph: {
    type:        siteConfig.type,
    locale:      siteConfig.locale,
    url:         siteConfig.url,
    siteName:    "Joy Bliss",
    title:       siteConfig.pages.home.title,
    description: siteConfig.pages.home.description,
    images: [
      {
        url:    siteConfig.og.image,
        width:  1200,
        height: 630,
        alt:    siteConfig.og.imageAlt,
      },
    ],
  },

  // ── Twitter / X ──
  twitter: {
    card:        siteConfig.og.twitterCard,
    site:        siteConfig.og.twitterHandle,
    creator:     siteConfig.og.twitterHandle,
    title:       siteConfig.pages.home.title,
    description: siteConfig.pages.home.description,
    images:      [siteConfig.og.image],
  },

  // ── Canonical ──
  alternates: { canonical: siteConfig.url },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TattooParlor",
    name: "Joy Bliss",
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.studio.phone,
    email: siteConfig.studio.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.studio.address,
      addressLocality: "Edmonton",
      addressRegion: "AB",
      addressCountry: "CA",
    },
    openingHours: siteConfig.studio.hours,
    priceRange: siteConfig.schema.priceRange,
    sameAs: [siteConfig.studio.instagram, siteConfig.studio.tiktok],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={dmSans.variable}>
        {children}
      </body>
    </html>
  );
}