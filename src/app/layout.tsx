import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import AppToaster from "@/components/AppToaster";
import AppShell from "@/components/AppShell";
import TopPromoBar from "@/components/marketplace/TopPromoBar";
import CookieConsent from "@/components/CookieConsent";
import { absoluteUrl, companyContact, siteConfig } from "@/lib/site";
import { createPageMetadata } from "@/lib/metadata";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteOg = createPageMetadata({
  title: siteConfig.title,
  description: siteConfig.description,
  path: "/",
  image: "/opengraph-image",
  imageAlt: siteConfig.ogImageAlt,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.shortTitle}`,
  },
  description: siteOg.description,
  alternates: siteOg.alternates,
  openGraph: siteOg.openGraph,
  twitter: siteOg.twitter,
  applicationName: siteConfig.name,
  keywords: [
    "tech products",
    "electronics",
    "Nigeria",
    "phones",
    "laptops",
    "budget tech products",
    "Section Eight",
    "buy phones online Nigeria",
    "laptops Lagos",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "ecommerce",
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/icon",
    apple: "/apple-icon",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: absoluteUrl("/"),
  logo: absoluteUrl("/icon"),
  description: siteConfig.description,
  email: companyContact.email,
  telephone: companyContact.phoneTel,
  address: {
    "@type": "PostalAddress",
    streetAddress: "12, Thomas Olaniyan Street",
    addressLocality: "Anthony Village",
    addressRegion: "Lagos",
    addressCountry: "NG",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <AppShell>
          <TopPromoBar />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
          <AppToaster />
          <CookieConsent />
        </AppShell>
      </body>
    </html>
  );
}
