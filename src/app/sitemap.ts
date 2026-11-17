import type { MetadataRoute } from "next";
import { profile } from "@/content/profile";
import { publicProjects } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = profile.siteUrl;
  // Content changes ship as deploys, so the build time is an honest "last modified" date.
  const lastModified = new Date();
  return [
    { url: base, lastModified, changeFrequency: "monthly", priority: 1 },
    ...["/work", "/experience", "/about", "/about/beyond"].map((p) => ({ url: `${base}${p}`, lastModified, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...publicProjects.map((p) => ({ url: `${base}/work/${p.slug}`, lastModified, changeFrequency: "monthly" as const, priority: p.prominence === "main" ? 0.7 : 0.5 })),
  ];
}
