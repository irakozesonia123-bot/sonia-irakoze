import type { Metadata, Viewport } from "next";
import { Atkinson_Hyperlegible_Next, Fraunces, IBM_Plex_Mono } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { profile } from "@/content/profile";
import "./globals.css";

const display = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", style: ["normal", "italic"], axes: ["SOFT", "WONK", "opsz"] });
const sans = Atkinson_Hyperlegible_Next({ subsets: ["latin"], variable: "--font-atkinson", weight: ["400", "700"], adjustFontFallback: false, fallback: ["system-ui", "-apple-system", "Segoe UI", "sans-serif"] });
const mono = IBM_Plex_Mono({ subsets: ["latin"], variable: "--font-plex-mono", weight: ["400"] });

const title = `${profile.name} · Mechanical Engineering`;

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: { default: title, template: `%s · ${profile.name}` },
  description: profile.seoDescription,
  applicationName: profile.name,
  authors: [{ name: profile.name, url: profile.siteUrl }],
  keywords: ["Sonia Irakoze", "mechanical engineering", "University of Rochester", "Rwanda", "SAquaSolve", "CDOT Compass", "Aero Design", "water infrastructure", "portfolio"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: profile.name,
    title,
    description: profile.seoDescription,
    firstName: "Sonia",
    lastName: "Irakoze",
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title, description: profile.seoDescription },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fcecef" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0f2b" },
  ],
  viewportFit: "cover",
};

// Runs before first paint: a saved theme wins; otherwise every first visit is light.
// Then decides on the welcome animation: home page only, once per browser session, never
// with reduced motion. Direct links to other pages never see it.
const themeScript = `(function(){var d=document.documentElement;try{var t=localStorage.getItem("theme");d.setAttribute("data-theme",t==="dark"?"dark":"light")}catch(e){}try{if(location.pathname==="/"&&!sessionStorage.getItem("intro")&&!matchMedia("(prefers-reduced-motion: reduce)").matches){sessionStorage.setItem("intro","1");d.setAttribute("data-intro","");setTimeout(function(){d.removeAttribute("data-intro")},1600)}}catch(e){}})()`;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${profile.siteUrl}/#person`,
      name: profile.name,
      url: profile.siteUrl,
      image: `${profile.siteUrl}${profile.headshot.src}`,
      email: `mailto:${profile.email}`,
      jobTitle: "Mechanical Engineering Student",
      description: profile.seoDescription,
      alumniOf: [{ "@type": "CollegeOrUniversity", name: "University of Rochester" }],
      knowsAbout: ["Mechanical engineering", "Bridge asset management", "Water infrastructure", "Solar-powered water treatment", "Web development", "React", "SQL", "Python"],
      sameAs: [profile.links.linkedin, profile.links.github],
    },
    { "@type": "WebSite", "@id": `${profile.siteUrl}/#website`, url: profile.siteUrl, name: profile.name, publisher: { "@id": `${profile.siteUrl}/#person` } },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      </head>
      <body className="min-h-dvh bg-bg text-ink">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-bg">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
