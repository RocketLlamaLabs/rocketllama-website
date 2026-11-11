import type { MetadataRoute } from "next";
import { INDUSTRIES } from "@/components/v7/industries-data";

// The pages worth indexing once the site goes public. Version 7 is the
// live site at the root; the earlier versions stay out of the sitemap.
export default function sitemap(): MetadataRoute.Sitemap {
  const site = "https://rocketllamalabs.com";
  const now = new Date();
  return [
    { url: `${site}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${site}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site}/industries`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    ...INDUSTRIES.map((i) => ({ url: `${site}/${i.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 })),
    { url: `${site}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site}/about/brian-greenberg`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${site}/about/branson-cobb`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${site}/about/madison-schantz`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${site}/audit`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site}/book`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site}/report`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${site}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${site}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${site}/ai-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];
}
