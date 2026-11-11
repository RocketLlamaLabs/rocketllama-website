import "server-only";
import { safeFetch, tryFetch } from "./safe-fetch";
import { analyzeSite, type SiteResult } from "./site-analyze";
import type { AuditContext } from "./shared";

export type { SiteResult } from "./site-analyze";

// Fetches the prospect's homepage plus robots.txt, sitemap.xml and llms.txt,
// then hands everything to analyzeSite.
export async function auditSite(url: string, ctx: Partial<AuditContext> = {}): Promise<SiteResult> {
  const page = await safeFetch(url, { timeoutMs: 15000 });
  if (page.status >= 400) throw new Error(`The site answered with HTTP ${page.status}.`);
  const final = new URL(page.finalUrl);
  const origin = final.origin;
  const [robotsRes, sitemapRes, llmsRes, httpRes] = await Promise.all([
    tryFetch(`${origin}/robots.txt`, { timeoutMs: 6000, maxBytes: 200_000 }),
    tryFetch(`${origin}/sitemap.xml`, { timeoutMs: 6000, maxBytes: 200_000 }),
    tryFetch(`${origin}/llms.txt`, { timeoutMs: 6000, maxBytes: 200_000 }),
    final.protocol === "https:" ? tryFetch(`http://${final.host}/`, { timeoutMs: 6000, maxBytes: 10_000 }) : Promise.resolve(null),
  ]);
  const ok = (r: typeof robotsRes) => (r && r.status === 200 && !/<html/i.test(r.body) ? r.body : null);
  return analyzeSite(
    {
      url,
      finalUrl: page.finalUrl,
      headers: Object.fromEntries(page.headers.entries()),
      html: page.body,
      ms: page.ms,
      bytes: page.bytes,
      redirects: page.redirects.length,
      robots: ok(robotsRes),
      sitemapFound: !!sitemapRes && sitemapRes.status === 200 && /<(urlset|sitemapindex)/i.test(sitemapRes.body),
      llms: ok(llmsRes),
      httpUpgraded: httpRes ? httpRes.finalUrl.startsWith("https:") : null,
    },
    ctx,
  );
}
