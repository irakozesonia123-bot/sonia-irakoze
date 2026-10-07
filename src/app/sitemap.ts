import type { MetadataRoute } from "next";
import { nav, profile } from "@/content/profile";
import { publicProjects } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = profile.siteUrl;
  return [
    { url: base, changeFrequency: "monthly", priority: 1 },
    ...nav.map((n) => ({ url: `${base}${n.href}`, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...publicProjects.map((p) => ({ url: `${base}/work/${p.slug}`, changeFrequency: "monthly" as const, priority: p.tier === "flagship" ? 0.8 : 0.6 })),
  ];
}
