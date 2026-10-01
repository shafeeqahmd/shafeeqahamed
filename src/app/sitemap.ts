import type { MetadataRoute } from "next";

const siteUrl = "https://shafeeq.colorkloud.us";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
