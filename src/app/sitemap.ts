import type { MetadataRoute } from "next";

// The pages worth indexing once the site goes public. Version 7 is the
// current design; the earlier versions stay out of the sitemap.
export default function sitemap(): MetadataRoute.Sitemap {
  const site = "https://rocketllamalabs.com";
  const now = new Date();
  return [
    { url: `${site}/v7`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${site}/v7/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site}/v7/industries`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site}/v7/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site}/v7/audit`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site}/v7/book`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site}/v7/report`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${site}/v7/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${site}/v7/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${site}/v7/ai-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];
}
