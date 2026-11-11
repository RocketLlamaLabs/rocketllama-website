// Types and helpers shared by the audit API routes and the report page.
// Nothing in here touches the network, so it is safe to import on the client.

export type Status = "pass" | "warn" | "fail" | "info";
export type Impact = "high" | "medium" | "low";

export type CategoryId =
  | "website"
  | "search"
  | "ai"
  | "speed"
  | "local"
  | "social"
  | "ads"
  | "leads";

export type Finding = {
  id: string;
  category: CategoryId;
  label: string;
  status: Status;
  impact: Impact;
  /** What we found, in one or two plain sentences. */
  detail: string;
  /** What to do about it, in one line. Shown on warn and fail. */
  fix?: string;
  /** Step-by-step instructions written for this business. */
  steps?: string[];
  /** The specific things that failed: file names, blocked bots, slow scripts. */
  items?: string[];
  /** Copy-paste ready code or text, prefilled with this business's details. */
  snippet?: { label: string; text: string };
};

/** Who is being audited. Used to prefill suggested copy and code. */
export type AuditContext = { name: string; city: string; industry: string };

export function titleCase(s: string): string {
  return s.replace(/\b([a-z])/g, (m) => m.toUpperCase()).replace(/\bHvac\b/g, "HVAC");
}

export const CATEGORIES: {
  id: CategoryId;
  name: string;
  blurb: string;
  /** The Rocket Llama service that fixes this category. */
  service: string;
}[] = [
  {
    id: "website",
    name: "Website and conversion",
    blurb: "Can a visitor on a phone call, book or ask for a quote in one tap.",
    service: "Website rebuild with booking, click-to-call and lead forms built in.",
  },
  {
    id: "search",
    name: "Search engines",
    blurb: "What Google and Bing can read, index and show for the site.",
    service: "Technical SEO, page copy and local search pages.",
  },
  {
    id: "ai",
    name: "AI answer engines",
    blurb: "Whether ChatGPT, Gemini, Perplexity and Claude can find, read and recommend the business.",
    service: "AI search optimisation: structured data, llms.txt, citations and answer-ready content.",
  },
  {
    id: "speed",
    name: "Speed and Core Web Vitals",
    blurb: "How fast the site loads and responds on a mid-range phone.",
    service: "Performance rebuild on a modern stack.",
  },
  {
    id: "local",
    name: "Google profile and reviews",
    blurb: "The Google Business Profile, rating and review count against the top local competitors.",
    service: "Google profile management and an automatic review engine.",
  },
  {
    id: "social",
    name: "Social media",
    blurb: "Which profiles exist, how big they are and how they are run.",
    service: "Social content system and posting calendar.",
  },
  {
    id: "ads",
    name: "Ads and tracking",
    blurb: "Whether ads are running and whether every lead and sale can be traced back to its source.",
    service: "Paid ads management with full conversion tracking.",
  },
  {
    id: "leads",
    name: "Lead handling",
    blurb: "What happens after someone raises their hand: speed to lead, follow-up and CRM.",
    service: "Speed-to-lead automation, AI receptionist and CRM follow-up.",
  },
];

/** The fictional business behind the sample report (?demo=1). */
export const DEMO_INPUT = { site: "https://desertpeakplumbing.com", name: "Desert Peak Plumbing", city: "Mesa, AZ", industry: "plumber" };

export type Platform = "instagram" | "facebook" | "tiktok" | "youtube" | "linkedin" | "x";

export const PLATFORMS: { id: Platform; name: string; param: string }[] = [
  { id: "instagram", name: "Instagram", param: "ig" },
  { id: "facebook", name: "Facebook", param: "fb" },
  { id: "tiktok", name: "TikTok", param: "tt" },
  { id: "youtube", name: "YouTube", param: "yt" },
  { id: "linkedin", name: "LinkedIn", param: "li" },
  { id: "x", name: "X (Twitter)", param: "x" },
];

/** Accepts "acme.com", "https://acme.com/page", " www.acme.com " and returns a full URL, or null. */
export function normalizeSiteUrl(input: string | null | undefined): string | null {
  const raw = (input ?? "").trim();
  if (!raw) return null;
  try {
    const url = new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`);
    if (!url.hostname.includes(".")) return null;
    url.hash = "";
    return url.toString();
  } catch {
    return null;
  }
}

export function domainOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

/**
 * Turns whatever was typed or found on the site ("@acme", "acme",
 * "https://instagram.com/acme/") into a bare handle or path.
 */
export function normalizeHandle(platform: Platform, input: string | null | undefined): string | null {
  let raw = (input ?? "").trim();
  if (!raw) return null;
  if (/^https?:\/\//i.test(raw) || /^(www\.)?[a-z]+\.(com|net)\//i.test(raw)) {
    try {
      const url = new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`);
      const parts = url.pathname.split("/").filter(Boolean);
      if (platform === "linkedin") {
        // linkedin.com/company/acme or linkedin.com/in/jane
        raw = parts.slice(0, 2).join("/");
      } else if (platform === "youtube") {
        raw = parts[0]?.startsWith("@") ? parts[0] : parts.slice(0, 2).join("/");
      } else if (platform === "facebook" && parts[0] === "profile.php") {
        raw = `profile.php?id=${url.searchParams.get("id") ?? ""}`;
      } else {
        raw = parts[0] ?? "";
      }
    } catch {
      return null;
    }
  }
  raw = raw.replace(/\/+$/, "");
  if (platform === "tiktok" || platform === "youtube") {
    if (!raw.includes("/") && !raw.startsWith("@")) raw = `@${raw}`;
  } else if (platform !== "linkedin") {
    raw = raw.replace(/^@/, "");
  }
  if (platform === "linkedin" && !raw.includes("/")) raw = `company/${raw}`;
  return raw || null;
}

export function profileUrl(platform: Platform, handle: string): string {
  switch (platform) {
    case "instagram":
      return `https://www.instagram.com/${handle}/`;
    case "facebook":
      return `https://www.facebook.com/${handle}`;
    case "tiktok":
      return `https://www.tiktok.com/${handle}`;
    case "youtube":
      return `https://www.youtube.com/${handle}`;
    case "linkedin":
      return `https://www.linkedin.com/${handle}/`;
    case "x":
      return `https://x.com/${handle}`;
  }
}

/** Points for a finding, used by every score. Info findings do not count. */
const STATUS_POINTS: Record<Status, number | null> = { pass: 1, warn: 0.5, fail: 0, info: null };
const IMPACT_WEIGHT: Record<Impact, number> = { high: 3, medium: 2, low: 1 };

/** 0–100, or null when nothing in the list was scored. */
export function scoreFindings(findings: Finding[]): number | null {
  let got = 0;
  let max = 0;
  for (const f of findings) {
    const p = STATUS_POINTS[f.status];
    if (p === null) continue;
    const w = IMPACT_WEIGHT[f.impact];
    got += p * w;
    max += w;
  }
  return max === 0 ? null : Math.round((got / max) * 100);
}

export function priorityOrder(a: Finding, b: Finding): number {
  const s = (f: Finding) => (f.status === "fail" ? 0 : f.status === "warn" ? 1 : 2);
  return s(a) - s(b) || IMPACT_WEIGHT[b.impact] - IMPACT_WEIGHT[a.impact];
}

export function verdict(score: number): string {
  if (score >= 85) return "Strong marketing, with a few gaps.";
  if (score >= 70) return "A solid base, with money left on the table.";
  if (score >= 50) return "Getting found, but losing jobs.";
  return "Hard for customers to find and choose.";
}
