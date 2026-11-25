import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // The public site is open to search engines. The admin and the earlier
  // design versions and mockups stay out: every response under them
  // (pages, files, redirects) carries a noindex header. Version 2 is listed
  // page by page because the live site still uses images under /v2/img.
  async headers() {
    const noindex = [{ key: "X-Robots-Tag", value: "noindex, nofollow" }];
    return [
      {
        source:
          "/:section(admin|v1|v3|v4|v5|v6|v8|slides|mockups|about-mockups)/:path*",
        headers: noindex,
      },
      { source: "/v2", headers: noindex },
      {
        source: "/v2/:page(about-brian|book|qualify|services)/:path*",
        headers: noindex,
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
      { source: "/v7/audit", destination: "/book", permanent: false },
      { source: "/v7/about-brian", destination: "/about", permanent: false },
      {
        source:
          "/v7/:page(about|ai-policy|book|industries|privacy|qualify|report|services|terms)",
        destination: "/:page",
        permanent: false,
      },
      // The instant audit page was removed on 20 November 2026; old links go to the booking page.
      { source: "/audit", destination: "/book", permanent: false },
      { source: "/about-brian", destination: "/about", permanent: false },
      // The earlier design versions (v1 to v6, v8) and the mockups were removed on 25 November 2026;
      // old links go to the home page. Version 2 is matched page by page because the live site still
      // uses images under /public/v2.
      { source: "/:v(v1|v3|v4|v5|v6|v8)", destination: "/", permanent: false },
      { source: "/:v(v1|v3|v8)/:path*", destination: "/", permanent: false },
      { source: "/v2", destination: "/", permanent: false },
      { source: "/v2/:page(about-brian|book|qualify|services)/:path*", destination: "/", permanent: false },
      { source: "/:m(mockups|about-mockups)", destination: "/", permanent: false },
      { source: "/:m(mockups|about-mockups)/:path*", destination: "/", permanent: false },
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
