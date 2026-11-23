import type { MetadataRoute } from "next";

// Search and AI crawlers may read the whole public site; only the admin is
// closed. The earlier design versions are kept out of search by a noindex
// header in next.config.ts instead, which crawlers can only see if they are
// allowed to fetch those pages.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/admin",
    },
    sitemap: "https://rocketllamalabs.com/sitemap.xml",
  };
}
