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
  // Version 3 moved to the root; its old /v3 links still work.
  async redirects() {
    return [
      { source: "/v3", destination: "/", permanent: false },
      { source: "/v3/:path*", destination: "/:path*", permanent: false },
      { source: "/v7/about-brian", destination: "/v7/about", permanent: false },
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
