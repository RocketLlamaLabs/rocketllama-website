import type { MetadataRoute } from "next";

// Pre-launch: block all crawlers. Remove the disallow when the site goes public.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: "/",
    },
  };
}
