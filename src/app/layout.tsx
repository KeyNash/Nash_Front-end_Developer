import type { Metadata, Viewport } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const bodyFont = Manrope({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const displayFont = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "KeyNash — Product-focused developer", template: "%s · KeyNash" },
  description: "Evidence-led product and front-end work by KeyNash, a developer in Kenya.",
  alternates: { canonical: "/" },
  openGraph: { title: "KeyNash — Product-focused developer", description: "Useful digital products, built with clear boundaries and verified evidence.", url: siteUrl, siteName: "KeyNash", locale: "en_KE", type: "website" },
  twitter: { card: "summary_large_image", title: "KeyNash — Product-focused developer", description: "Useful digital products, built with clear boundaries and verified evidence." },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: [{ media: "(prefers-color-scheme: light)", color: "#f3efe6" }, { media: "(prefers-color-scheme: dark)", color: "#101617" }] };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = { "@context": "https://schema.org", "@type": "Person", name: "Nobert Kinyanjui", alternateName: "KeyNash", jobTitle: "Product-focused developer", url: siteUrl, sameAs: ["https://github.com/KeyNash"] };
  return (
    <html lang="en" suppressHydrationWarning className={`${bodyFont.variable} ${displayFont.variable}`}>
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      </body>
    </html>
  );
}
