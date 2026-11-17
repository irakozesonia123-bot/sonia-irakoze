import type { Metadata } from "next";
import { profile } from "@/content/profile";

/**
 * Search and sharing metadata for one page. Next.js merges metadata shallowly, so a page that
 * sets openGraph or twitter replaces the site defaults; this keeps every page's title, link,
 * and preview image consistent instead.
 */
export function pageMeta({ title, description, path, image }: { title: string; description: string; path: string; image?: { url: string; alt: string } }): Metadata {
  const full = `${title} · ${profile.name}`;
  const img = image ?? { url: "/opengraph-image", alt: `${profile.name}, Mechanical Engineering, University of Rochester` };
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", siteName: profile.name, locale: "en_US", url: path, title: full, description, images: [img] },
    twitter: { card: "summary_large_image", title: full, description, images: [img] },
  };
}
