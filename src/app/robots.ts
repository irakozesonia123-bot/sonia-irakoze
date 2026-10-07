import type { MetadataRoute } from "next";
import { profile } from "@/content/portfolio";

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${profile.siteUrl}/sitemap.xml`, host: profile.siteUrl };
}
