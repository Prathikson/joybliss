import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  return [
    { url: base,                 lastModified: new Date(), changeFrequency: "monthly", priority: 1.0 },
    { url: `${base}/gallery`,    lastModified: new Date(), changeFrequency: "weekly",  priority: 0.9 },
    { url: `${base}/artist`,     lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/services`,   lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/contact`,    lastModified: new Date(), changeFrequency: "yearly",  priority: 0.8 },
    { url: `${base}/privacy`,    lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
    { url: `${base}/terms`,      lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
  ];
}
