import type { Finding } from "./shared";

// Google PageSpeed Insights, mobile strategy. Works without a key at low
// volume; set PAGESPEED_API_KEY for a higher quota. The fetch is in
// auditSpeed; analyzeSpeed turns the raw Lighthouse result into findings
// that name the exact files and scripts to fix.

export type Opportunity = { id: string; title: string; savingsMs: number; resources: string[] };

export type SpeedResult = {
  scores: { performance: number | null; accessibility: number | null; bestPractices: number | null; seo: number | null };
  field: { lcp: number | null; inp: number | null; cls: number | null; source: "url" | "origin" | null };
  lab: { lcp: number | null; tbt: number | null; cls: number | null; fcp: number | null };
  opportunities: Opportunity[];
  findings: Finding[];
};

type LhItem = {
  url?: string;
  wastedBytes?: number;
  wastedMs?: number;
  totalBytes?: number;
  blockingTime?: number;
  entity?: string | { text?: string };
  node?: { snippet?: string; nodeLabel?: string };
  items?: LhItem[];
};
type LhAudit = {
  id?: string;
  title: string;
  score: number | null;
  scoreDisplayMode?: string;
  numericValue?: number;
  details?: { type?: string; overallSavingsMs?: number; items?: LhItem[] };
};
export type Psi = {
  lighthouseResult?: {
    categories?: Record<string, { score: number | null; auditRefs?: { id: string; weight?: number }[] }>;
    audits?: Record<string, LhAudit>;
  };
  loadingExperience?: { metrics?: Record<string, { percentile: number }>; origin_fallback?: boolean };
  originLoadingExperience?: { metrics?: Record<string, { percentile: number }> };
  error?: { message?: string };
};

const pct = (n: number | null | undefined) => (typeof n === "number" ? Math.round(n * 100) : null);

/** Plain-language fix for each Lighthouse opportunity. */
const HOW: Record<string, string> = {
  "uses-responsive-images": "Resize these images to the width they display at (usually 800–1600 px) before uploading.",
  "modern-image-formats": "Convert these images to WebP or AVIF. Most image plugins and CDNs do it automatically.",
  "uses-optimized-images": "Compress these images (TinyPNG, Squoosh or an image plugin).",
  "offscreen-images": "Lazy-load images below the first screen (loading=\"lazy\").",
  "render-blocking-resources": "Defer or inline these files so the page can paint before they load.",
  "unused-javascript": "Remove or delay these scripts. Load chat, review and tracking widgets after the page is interactive.",
  "unused-css-rules": "Remove unused CSS, often left by page-builder plugins and themes.",
  "unminified-javascript": "Minify JavaScript (most caching plugins have a switch).",
  "unminified-css": "Minify CSS (most caching plugins have a switch).",
  "uses-text-compression": "Turn on gzip or Brotli compression on the server or CDN.",
  "server-response-time": "Speed up the server: page caching, better hosting, a CDN.",
  "redirects": "Link directly to the final URL to avoid redirect hops.",
  "efficient-animated-content": "Replace animated GIFs with MP4 video.",
  "legacy-javascript": "Stop shipping old-browser polyfills to modern browsers.",
  "prioritize-lcp-image": "Preload the main hero image.",
  "total-byte-weight": "Cut total page weight: smaller images, fewer scripts and fonts.",
  "font-display": "Add font-display: swap so text shows while fonts load.",
};

function shortUrl(u: string): string {
  try {
    const url = new URL(u);
    const path = url.pathname.length > 60 ? `…${url.pathname.slice(-57)}` : url.pathname;
    return `${url.hostname}${path}`;
  } catch {
    return u.slice(0, 80);
  }
}
const kb = (b?: number) => (b ? `${Math.round(b / 1024).toLocaleString("en-US")} KB` : "");

export async function auditSpeed(url: string): Promise<SpeedResult> {
  const api = new URL("https://www.googleapis.com/pagespeedonline/v5/runPagespeed");
  api.searchParams.set("url", url);
  api.searchParams.set("strategy", "mobile");
  for (const c of ["performance", "accessibility", "best-practices", "seo"]) api.searchParams.append("category", c);
  if (process.env.PAGESPEED_API_KEY) api.searchParams.set("key", process.env.PAGESPEED_API_KEY);

  const res = await fetch(api, { signal: AbortSignal.timeout(55000), cache: "no-store" });
  const data = (await res.json()) as Psi;
  if (!res.ok || !data.lighthouseResult) {
    const msg = data.error?.message ?? "";
    if (/quota/i.test(msg)) {
      throw new Error(process.env.PAGESPEED_API_KEY ? "The PageSpeed API key is out of quota for today." : "Google's shared PageSpeed quota is used up. Add a free PAGESPEED_API_KEY to run this test.");
    }
    throw new Error(msg.split("\n")[0] || `PageSpeed answered with HTTP ${res.status}.`);
  }
  return analyzeSpeed(data);
}

export function analyzeSpeed(data: Psi): SpeedResult {
  const cats = data.lighthouseResult?.categories ?? {};
  const audits = data.lighthouseResult?.audits ?? {};
  const fieldSrc = data.loadingExperience?.metrics && !data.loadingExperience.origin_fallback ? "url" : data.originLoadingExperience?.metrics ? "origin" : null;
  const fm = (fieldSrc === "url" ? data.loadingExperience?.metrics : data.originLoadingExperience?.metrics) ?? {};

  const opportunities: Opportunity[] = Object.entries(audits)
    .filter(([, a]) => (a.details?.overallSavingsMs ?? 0) > 150 && (a.score ?? 1) < 0.9)
    .sort(([, a], [, b]) => (b.details?.overallSavingsMs ?? 0) - (a.details?.overallSavingsMs ?? 0))
    .slice(0, 6)
    .map(([id, a]) => ({
      id,
      title: a.title,
      savingsMs: Math.round(a.details?.overallSavingsMs ?? 0),
      resources: (a.details?.items ?? [])
        .filter((i) => i.url && /^https?:/.test(i.url))
        .slice(0, 5)
        .map((i) => [shortUrl(i.url!), i.wastedBytes ? `${kb(i.wastedBytes)} to save` : i.totalBytes ? kb(i.totalBytes) : ""].filter(Boolean).join(" · ")),
    }));

  const result: SpeedResult = {
    scores: {
      performance: pct(cats.performance?.score),
      accessibility: pct(cats.accessibility?.score),
      bestPractices: pct(cats["best-practices"]?.score),
      seo: pct(cats.seo?.score),
    },
    field: {
      lcp: fm.LARGEST_CONTENTFUL_PAINT_MS?.percentile ?? null,
      inp: fm.INTERACTION_TO_NEXT_PAINT?.percentile ?? null,
      cls: fm.CUMULATIVE_LAYOUT_SHIFT_SCORE ? fm.CUMULATIVE_LAYOUT_SHIFT_SCORE.percentile / 100 : null,
      source: fieldSrc,
    },
    lab: {
      lcp: audits["largest-contentful-paint"]?.numericValue ?? null,
      tbt: audits["total-blocking-time"]?.numericValue ?? null,
      cls: audits["cumulative-layout-shift"]?.numericValue ?? null,
      fcp: audits["first-contentful-paint"]?.numericValue ?? null,
    },
    opportunities,
    findings: [],
  };

  const f = result.findings;
  const perf = result.scores.performance;
  if (perf !== null) {
    f.push({
      id: "psi-performance",
      category: "speed",
      label: "Mobile performance score",
      impact: "high",
      status: perf >= 80 ? "pass" : perf >= 50 ? "warn" : "fail",
      detail: `Google PageSpeed scores the mobile site ${perf} out of 100.`,
      fix: opportunities.length ? `Biggest wins: ${opportunities.slice(0, 3).map((o) => o.title.toLowerCase()).join("; ")}.` : "Compress images, cut unused scripts and serve from a CDN.",
      steps: opportunities.map((o) => `${o.title} (saves about ${(o.savingsMs / 1000).toFixed(1)} s): ${HOW[o.id] ?? "see the PageSpeed report for details."}`),
      items: opportunities.flatMap((o) => o.resources.slice(0, 3).map((r) => `${o.title}: ${r}`)).slice(0, 12),
    });
  }

  // The element that is the Largest Contentful Paint.
  const lcpEl = findNode(audits["largest-contentful-paint-element"]?.details?.items);
  const lcp = result.field.lcp ?? result.lab.lcp;
  if (lcp !== null) {
    f.push({
      id: "lcp",
      category: "speed",
      label: "Largest Contentful Paint",
      impact: "high",
      status: lcp <= 2500 ? "pass" : lcp <= 4000 ? "warn" : "fail",
      detail: `The main content appears after ${(lcp / 1000).toFixed(1)} s on a phone (${result.field.lcp !== null ? "real visitors" : "lab test"}). Google's bar is 2.5 s.`,
      fix: "Make the element below load first and load fast.",
      items: lcpEl ? [`Slowest element: ${lcpEl}`] : undefined,
      steps: [
        "If it is an image: compress it under 150 KB, serve WebP, set width and height, and add fetchpriority=\"high\". Never lazy-load it.",
        "If it is text: make sure fonts use font-display: swap and no slider or animation hides it at load.",
        "Remove render-blocking scripts in the <head> (see the performance item above).",
      ],
    });
  }

  // Third-party scripts that block the main thread.
  const thirdParty = (audits["third-party-summary"]?.details?.items ?? [])
    .filter((i) => (i.blockingTime ?? 0) > 50)
    .sort((a, b) => (b.blockingTime ?? 0) - (a.blockingTime ?? 0))
    .slice(0, 6)
    .map((i) => `${typeof i.entity === "string" ? i.entity : i.entity?.text ?? "Script"}: blocks ${Math.round(i.blockingTime ?? 0)} ms`);
  if (result.field.inp !== null || result.lab.tbt !== null) {
    const inp = result.field.inp;
    const tbt = result.lab.tbt ?? 0;
    const status = inp !== null ? (inp <= 200 ? "pass" : inp <= 500 ? "warn" : "fail") : tbt <= 200 ? "pass" : tbt <= 600 ? "warn" : "fail";
    f.push({
      id: "inp",
      category: "speed",
      label: "Responsiveness (INP)",
      impact: "medium",
      status,
      detail: inp !== null ? `Taps respond in ${inp} ms for real visitors. Google's bar is 200 ms.` : `Scripts block the page for ${Math.round(tbt)} ms in the lab test.`,
      fix: thirdParty.length ? "Delay or remove the third-party scripts listed." : "Cut third-party scripts and defer the rest.",
      items: thirdParty.length ? thirdParty : undefined,
      steps: ["Load chat, review, heatmap and social widgets after the first interaction or a 3-second delay.", "Move tracking tags into Tag Manager and remove duplicates.", "Remove plugins and widgets nobody uses."],
    });
  }
  const shifts = (audits["layout-shifts"]?.details?.items ?? audits["layout-shift-elements"]?.details?.items ?? [])
    .map((i) => i.node?.nodeLabel || i.node?.snippet)
    .filter((x): x is string => !!x)
    .slice(0, 5);
  const cls = result.field.cls ?? result.lab.cls;
  if (cls !== null) {
    f.push({
      id: "cls",
      category: "speed",
      label: "Layout stability (CLS)",
      impact: "low",
      status: cls <= 0.1 ? "pass" : cls <= 0.25 ? "warn" : "fail",
      detail: `Layout shift score ${cls.toFixed(2)}. Google's bar is 0.10.`,
      fix: "Give images and embeds fixed dimensions so the page does not jump while loading.",
      items: shifts.length ? shifts.map((s) => `Moves while loading: ${s.slice(0, 90)}`) : undefined,
    });
  }
  f.push({
    id: "crux",
    category: "speed",
    label: "Real-visitor speed data",
    impact: "low",
    status: "info",
    detail: result.field.source ? `Google has Chrome field data for this ${result.field.source === "url" ? "page" : "site"}.` : "Google has no real-visitor data for this site, which usually means low traffic.",
  });
  const failing = (cat: string) =>
    (cats[cat]?.auditRefs ?? [])
      .filter((r) => (r.weight ?? 0) > 0)
      .map((r) => audits[r.id])
      .filter((a): a is LhAudit => !!a && a.score !== null && a.score < 0.9 && a.scoreDisplayMode !== "notApplicable" && a.scoreDisplayMode !== "manual")
      .map((a) => a.title)
      .slice(0, 8);
  if (result.scores.seo !== null) {
    f.push({
      id: "psi-seo",
      category: "search",
      label: "Lighthouse SEO checks",
      impact: "low",
      status: result.scores.seo >= 90 ? "pass" : result.scores.seo >= 70 ? "warn" : "fail",
      detail: `Lighthouse SEO score ${result.scores.seo} out of 100.`,
      fix: "Fix the failing checks listed.",
      items: failing("seo"),
    });
  }
  if (result.scores.accessibility !== null) {
    f.push({
      id: "psi-a11y",
      category: "website",
      label: "Accessibility",
      impact: "low",
      status: result.scores.accessibility >= 90 ? "pass" : result.scores.accessibility >= 70 ? "warn" : "fail",
      detail: `Lighthouse accessibility score ${result.scores.accessibility} out of 100.`,
      fix: "Fix the failing checks listed. It widens the audience and lowers ADA risk.",
      items: failing("accessibility"),
    });
  }
  return result;
}

function findNode(items: LhItem[] | undefined): string | null {
  for (const i of items ?? []) {
    if (i.node?.snippet) return i.node.nodeLabel ? `${i.node.nodeLabel} — ${i.node.snippet.slice(0, 120)}` : i.node.snippet.slice(0, 140);
    const nested = findNode(i.items);
    if (nested) return nested;
  }
  return null;
}
