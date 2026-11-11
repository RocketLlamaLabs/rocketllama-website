import "server-only";
import type { Finding } from "./shared";

// Google PageSpeed Insights, mobile strategy. Works without a key at low
// volume; set PAGESPEED_API_KEY for a higher quota.

export type SpeedResult = {
  scores: { performance: number | null; accessibility: number | null; bestPractices: number | null; seo: number | null };
  field: { lcp: number | null; inp: number | null; cls: number | null; source: "url" | "origin" | null };
  lab: { lcp: number | null; tbt: number | null; cls: number | null; fcp: number | null };
  opportunities: { title: string; savingsMs: number }[];
  findings: Finding[];
};

type LhAudit = { title: string; score: number | null; numericValue?: number; details?: { type?: string; overallSavingsMs?: number } };
type Psi = {
  lighthouseResult?: {
    categories?: Record<string, { score: number | null }>;
    audits?: Record<string, LhAudit>;
  };
  loadingExperience?: { id?: string; metrics?: Record<string, { percentile: number }>; origin_fallback?: boolean };
  originLoadingExperience?: { metrics?: Record<string, { percentile: number }> };
  error?: { message?: string };
};

const pct = (n: number | null | undefined) => (typeof n === "number" ? Math.round(n * 100) : null);

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
  const cats = data.lighthouseResult.categories ?? {};
  const audits = data.lighthouseResult.audits ?? {};
  const fieldSrc = data.loadingExperience?.metrics && !data.loadingExperience.origin_fallback ? "url" : data.originLoadingExperience?.metrics ? "origin" : null;
  const fm = (fieldSrc === "url" ? data.loadingExperience?.metrics : data.originLoadingExperience?.metrics) ?? {};

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
    opportunities: Object.values(audits)
      .filter((a) => (a.details?.overallSavingsMs ?? 0) > 150 && (a.score ?? 1) < 0.9)
      .sort((a, b) => (b.details?.overallSavingsMs ?? 0) - (a.details?.overallSavingsMs ?? 0))
      .slice(0, 6)
      .map((a) => ({ title: a.title, savingsMs: Math.round(a.details?.overallSavingsMs ?? 0) })),
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
      fix: result.opportunities.length ? `Biggest wins: ${result.opportunities.slice(0, 3).map((o) => o.title.toLowerCase()).join("; ")}.` : "Compress images, cut unused scripts and serve from a CDN.",
    });
  }
  const lcp = result.field.lcp ?? result.lab.lcp;
  if (lcp !== null) {
    f.push({
      id: "lcp",
      category: "speed",
      label: "Largest Contentful Paint",
      impact: "high",
      status: lcp <= 2500 ? "pass" : lcp <= 4000 ? "warn" : "fail",
      detail: `The main content appears after ${(lcp / 1000).toFixed(1)} s on a phone (${result.field.lcp !== null ? "real visitors" : "lab test"}). Google's bar is 2.5 s.`,
      fix: "Shrink and preload the hero image, and remove render-blocking scripts and fonts.",
    });
  }
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
      fix: "Cut third-party scripts and defer the rest. Chat widgets and old page builders are the usual culprits.",
    });
  }
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
  if (result.scores.seo !== null) {
    f.push({
      id: "psi-seo",
      category: "search",
      label: "Lighthouse SEO checks",
      impact: "low",
      status: result.scores.seo >= 90 ? "pass" : result.scores.seo >= 70 ? "warn" : "fail",
      detail: `Lighthouse SEO score ${result.scores.seo} out of 100.`,
      fix: "Fix the items flagged in the Lighthouse SEO section: tap targets, link text, crawlability.",
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
      fix: "Fix contrast, labels and alt text. It widens the audience and lowers ADA risk.",
    });
  }
  return result;
}
