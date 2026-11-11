import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // Pre-launch: noindex every response (including images and other non-HTML
  // assets) at the HTTP level. Remove when the site goes public.
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
  // Version 7 is the live site at the root; its old /v7 links still work.
  // Only page paths are listed, because its images and video are still
  // served from /public/v7. Version 3 went back to /v3, so the one root page
  // only it had (/about-brian) goes to the About page.
  async redirects() {
    return [
      { source: "/v7", destination: "/", permanent: false },
      { source: "/v7/about-brian", destination: "/about", permanent: false },
      {
        source:
          "/v7/:page(about|ai-policy|audit|book|industries|privacy|qualify|report|services|terms)",
        destination: "/:page",
        permanent: false,
      },
      { source: "/about-brian", destination: "/about", permanent: false },
    ];
  },
  // Versions 4, 5 and 6 are static pages under /public/mockups; these give
  // them version URLs like the Next.js versions have.
  async rewrites() {
    return [
      { source: "/v4", destination: "/mockups/v4.html" },
      { source: "/v5", destination: "/mockups/v5.html" },
      { source: "/v6", destination: "/mockups/v6.html" },
      { source: "/mockups", destination: "/mockups/index.html" },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
