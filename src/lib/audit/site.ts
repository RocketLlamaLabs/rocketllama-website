import "server-only";
import { parse, type HTMLElement } from "node-html-parser";
import { safeFetch, tryFetch } from "./safe-fetch";
import { type Finding, type Platform, normalizeHandle } from "./shared";

// Reads the prospect's homepage plus robots.txt, sitemap.xml and llms.txt and
// turns what it finds into findings for five categories: website, search,
// AI answer engines, ads and tracking, and the social links the site lists.

export type SiteResult = {
  url: string;
  finalUrl: string;
  businessName: string | null;
  title: string | null;
  description: string | null;
  phone: string | null;
  socials: Partial<Record<Platform, string>>;
  schemaTypes: string[];
  findings: Finding[];
};

const AI_BOTS: { agent: string; owner: string }[] = [
  { agent: "GPTBot", owner: "OpenAI training" },
  { agent: "OAI-SearchBot", owner: "ChatGPT search" },
  { agent: "ChatGPT-User", owner: "ChatGPT browsing" },
  { agent: "ClaudeBot", owner: "Anthropic" },
  { agent: "Claude-SearchBot", owner: "Claude search" },
  { agent: "PerplexityBot", owner: "Perplexity" },
  { agent: "Google-Extended", owner: "Gemini" },
  { agent: "Applebot-Extended", owner: "Apple Intelligence" },
  { agent: "CCBot", owner: "Common Crawl" },
];

const TRACKERS: { id: string; name: string; test: RegExp; impact: "high" | "medium" | "low"; why: string }[] = [
  { id: "ga4", name: "Google Analytics 4", test: /gtag\/js\?id=G-|['"]G-[A-Z0-9]{6,}['"]|google-analytics\.com\/g\/collect/i, impact: "high", why: "Without analytics there is no record of where visitors come from or what they do." },
  { id: "gtm", name: "Google Tag Manager", test: /googletagmanager\.com\/gtm\.js|GTM-[A-Z0-9]{4,}/i, impact: "low", why: "Tag Manager makes adding and changing tracking a five-minute job instead of a developer ticket." },
  { id: "gads", name: "Google Ads conversion tag", test: /AW-\d{6,}|googleadservices\.com\/pagead\/conversion/i, impact: "high", why: "Google Ads cannot optimise for leads it cannot see. Without this tag Smart Bidding is flying blind." },
  { id: "meta", name: "Meta Pixel", test: /connect\.facebook\.net\/[^"']*fbevents\.js|fbq\(\s*['"]init/i, impact: "high", why: "Facebook and Instagram ads cannot retarget visitors or optimise for leads without the pixel." },
  { id: "tiktok", name: "TikTok Pixel", test: /analytics\.tiktok\.com|ttq\.load/i, impact: "low", why: "Needed only if TikTok ads are part of the plan." },
  { id: "linkedin", name: "LinkedIn Insight Tag", test: /snap\.licdn\.com|_linkedin_partner_id/i, impact: "low", why: "Needed only for B2B campaigns on LinkedIn." },
  { id: "bing", name: "Microsoft Ads (UET)", test: /bat\.bing\.com/i, impact: "low", why: "Microsoft Ads is cheap traffic and also feeds Copilot. The tag lets it optimise." },
];

const CALL_TRACKING = /callrail|calltrackingmetrics|whatconverts|ringba|invoca|marchex|callsource|phonewagon/i;
const SESSION_TOOLS = /clarity\.ms|hotjar|fullstory|luckyorange|mouseflow/i;
const CONSENT = /cookiebot|onetrust|termly|iubenda|cookieyes|osano|usercentrics|complianz/i;
const CHAT = /intercom|drift\.com|tawk\.to|livechatinc|hs-scripts|hubspot.*conversations|podium|birdeye|tidio|crisp\.chat|zendesk|olark|smith\.ai|gorgias|ngage|chatbot/i;
const BOOKING = /calendly|acuityscheduling|housecallpro|servicetitan|jobber|getjobber|squareup\.com\/appointments|setmore|booksy|vagaro|schedulicity|youcanbook|zocdoc|mindbody|hubspot.*meetings|scheduleengine|workiz|fieldedge/i;
const REVIEW_WIDGETS = /birdeye|podium|trustindex|elfsight|nicejob|grade\.us|reviewsonmywebsite|trustpilot|yotpo|judge\.me|embedsocial|broadly/i;

const SOCIAL_PATTERNS: { platform: Platform; test: RegExp }[] = [
  { platform: "instagram", test: /instagram\.com\/(?!p\/|reel\/|explore\/|accounts\/)[A-Za-z0-9._]+/i },
  { platform: "facebook", test: /facebook\.com\/(?!sharer|share|dialog|plugins|tr\b|events\/)[A-Za-z0-9.\-]+/i },
  { platform: "tiktok", test: /tiktok\.com\/@[A-Za-z0-9._]+/i },
  { platform: "youtube", test: /youtube\.com\/(@[A-Za-z0-9._\-]+|channel\/[A-Za-z0-9_\-]+|c\/[A-Za-z0-9_\-]+|user\/[A-Za-z0-9_\-]+)/i },
  { platform: "linkedin", test: /linkedin\.com\/(company|in)\/[A-Za-z0-9_\-%]+/i },
  { platform: "x", test: /(?:twitter|x)\.com\/(?!intent|share|home|i\/)[A-Za-z0-9_]{1,15}(?=[/?"']|$)/i },
];

function text(el: HTMLElement | null | undefined): string {
  return (el?.textContent ?? "").replace(/\s+/g, " ").trim();
}

function meta(root: HTMLElement, key: string): string | null {
  const el =
    root.querySelector(`meta[name="${key}"]`) ??
    root.querySelector(`meta[property="${key}"]`) ??
    root.querySelector(`meta[name="${key.toLowerCase()}"]`);
  const v = el?.getAttribute("content")?.trim();
  return v ? v : null;
}

/** Collects every @type in every JSON-LD block, including inside @graph. */
function readJsonLd(root: HTMLElement) {
  const types = new Set<string>();
  const sameAs = new Set<string>();
  let invalid = 0;
  let hasRating = false;
  let hasAddress = false;
  let hasHours = false;
  let name: string | null = null;
  const visit = (node: unknown) => {
    if (Array.isArray(node)) return node.forEach(visit);
    if (!node || typeof node !== "object") return;
    const o = node as Record<string, unknown>;
    const t = o["@type"];
    (Array.isArray(t) ? t : [t]).forEach((x) => typeof x === "string" && types.add(x));
    const s = o.sameAs;
    (Array.isArray(s) ? s : [s]).forEach((x) => typeof x === "string" && sameAs.add(x));
    if (!name && typeof o.name === "string" && typeof t === "string" && /LocalBusiness|Organization|Service|Store|Contractor|Plumber|Electrician|Roofing|HVAC/i.test(t)) name = o.name;
    if (o.aggregateRating || o["@type"] === "AggregateRating") hasRating = true;
    if (o.address) hasAddress = true;
    if (o.openingHours || o.openingHoursSpecification) hasHours = true;
    Object.values(o).forEach((v) => typeof v === "object" && visit(v));
  };
  for (const s of root.querySelectorAll('script[type="application/ld+json"]')) {
    try {
      visit(JSON.parse(s.textContent));
    } catch {
      invalid++;
    }
  }
  return { types: [...types], sameAs: [...sameAs], invalid, hasRating, hasAddress, hasHours, name };
}

/**
 * Minimal robots.txt reader: returns whether the given agent is blocked from
 * "/" (a "Disallow: /" in its own group, or in "*" when it has no group).
 */
function robotsBlocks(robots: string, agent: string): boolean {
  const groups: { agents: string[]; disallowRoot: boolean; allowRoot: boolean }[] = [];
  let current: (typeof groups)[number] | null = null;
  let lastWasAgent = false;
  for (const rawLine of robots.split(/\r?\n/)) {
    const line = rawLine.replace(/#.*/, "").trim();
    const m = line.match(/^([A-Za-z-]+)\s*:\s*(.*)$/);
    if (!m) continue;
    const key = m[1].toLowerCase();
    const value = m[2].trim();
    if (key === "user-agent") {
      if (!current || !lastWasAgent) {
        current = { agents: [], disallowRoot: false, allowRoot: false };
        groups.push(current);
      }
      current.agents.push(value.toLowerCase());
      lastWasAgent = true;
    } else {
      lastWasAgent = false;
      if (!current) continue;
      if (key === "disallow" && value === "/") current.disallowRoot = true;
      if (key === "allow" && value === "/") current.allowRoot = true;
    }
  }
  const own = groups.filter((g) => g.agents.includes(agent.toLowerCase()));
  const pick = own.length ? own : groups.filter((g) => g.agents.includes("*"));
  return pick.some((g) => g.disallowRoot && !g.allowRoot);
}

export async function auditSite(url: string): Promise<SiteResult> {
  const page = await safeFetch(url, { timeoutMs: 15000 });
  if (page.status >= 400) {
    throw new Error(`The site answered with HTTP ${page.status}.`);
  }
  const final = new URL(page.finalUrl);
  const origin = final.origin;
  const html = page.body;
  const root = parse(html, { comment: false });
  const findings: Finding[] = [];
  const add = (f: Finding) => findings.push(f);

  const [robotsRes, sitemapRes, llmsRes, httpRes] = await Promise.all([
    tryFetch(`${origin}/robots.txt`, { timeoutMs: 6000, maxBytes: 200_000 }),
    tryFetch(`${origin}/sitemap.xml`, { timeoutMs: 6000, maxBytes: 200_000 }),
    tryFetch(`${origin}/llms.txt`, { timeoutMs: 6000, maxBytes: 200_000 }),
    final.protocol === "https:" ? tryFetch(`http://${final.host}/`, { timeoutMs: 6000, maxBytes: 10_000 }) : Promise.resolve(null),
  ]);
  const robots = robotsRes && robotsRes.status === 200 && !/<html/i.test(robotsRes.body) ? robotsRes.body : null;

  // Visible text: drop scripts, styles and templates first.
  const bodyEl = root.querySelector("body") ?? root;
  const clone = parse(bodyEl.toString());
  clone.querySelectorAll("script,style,noscript,template,svg").forEach((n) => n.remove());
  const visibleText = text(clone);
  const words = visibleText ? visibleText.split(" ").length : 0;
  const lower = html.toLowerCase();

  const title = text(root.querySelector("title")) || null;
  const description = meta(root, "description");
  const ogSiteName = meta(root, "og:site_name");
  const ld = readJsonLd(root);

  // ---------- Website and conversion ----------
  add({
    id: "https",
    category: "website",
    label: "Secure connection (HTTPS)",
    impact: "high",
    status: final.protocol === "https:" ? "pass" : "fail",
    detail: final.protocol === "https:" ? "The site loads over HTTPS." : "The site loads over plain HTTP. Browsers mark it “Not secure”.",
    fix: "Install an SSL certificate and redirect every http address to https.",
  });
  if (final.protocol === "https:") {
    const upgraded = httpRes ? httpRes.finalUrl.startsWith("https:") : null;
    if (upgraded === false) {
      add({ id: "http-redirect", category: "website", label: "HTTP redirects to HTTPS", impact: "medium", status: "warn", detail: "The http:// version of the site does not forward to https://.", fix: "Add a permanent (301) redirect from http to https." });
    }
  }

  const viewport = meta(root, "viewport");
  add({
    id: "viewport",
    category: "website",
    label: "Built for phones",
    impact: "high",
    status: viewport && /width=device-width/i.test(viewport) ? "pass" : "fail",
    detail: viewport ? `Viewport tag: “${viewport}”.` : "No mobile viewport tag. On a phone the page renders as a shrunken desktop site.",
    fix: "Add <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"> and a responsive layout.",
  });

  const telLinks = root.querySelectorAll('a[href^="tel:"]');
  const phoneMatch = visibleText.match(/(?:\+?1[\s.-]?)?\(?\b\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}\b/);
  const phone = telLinks[0]?.getAttribute("href")?.replace(/^tel:/, "") ?? phoneMatch?.[0] ?? null;
  add({
    id: "click-to-call",
    category: "website",
    label: "Click-to-call phone number",
    impact: "high",
    status: telLinks.length ? "pass" : phoneMatch ? "warn" : "fail",
    detail: telLinks.length
      ? `Found ${telLinks.length} tap-to-call link${telLinks.length > 1 ? "s" : ""}.`
      : phoneMatch
        ? `A phone number (${phoneMatch[0]}) is on the page but it is not a tap-to-call link.`
        : "No phone number was found on the homepage.",
    fix: "Put the phone number in the header as a tel: link so one tap starts the call.",
  });

  const forms = root.querySelectorAll("form").filter((f) => !/search/i.test(f.getAttribute("role") ?? "") && !/search/i.test(f.getAttribute("action") ?? ""));
  const embeddedForm = /hsforms|jotform|typeform|gravityforms|wpforms|formstack|cognitoforms|ninja-forms|wpcf7|elementor-form|leadconnector|msgsndr|formsite|123formbuilder/i.test(lower);
  add({
    id: "lead-form",
    category: "website",
    label: "Lead capture form",
    impact: "high",
    status: forms.length || embeddedForm ? "pass" : "fail",
    detail: forms.length || embeddedForm ? "A contact or quote form is on the homepage." : "No form on the homepage. Visitors who will not call have no way to reach out.",
    fix: "Add a short quote form (name, phone, what they need) above the fold or one click away.",
  });

  const ctaWords = /\b(book|schedule|get (a |your )?(free )?(quote|estimate)|request (a |an )?(quote|estimate|service|appointment)|call now|contact us|get started|free (quote|estimate|consultation|inspection))\b/i;
  const ctas = root.querySelectorAll("a,button").filter((a) => ctaWords.test(text(a)));
  const hasBooking = BOOKING.test(lower);
  add({
    id: "cta",
    category: "website",
    label: "Clear call to action",
    impact: "high",
    status: ctas.length >= 2 || hasBooking ? "pass" : ctas.length === 1 ? "warn" : "fail",
    detail: hasBooking
      ? "An online booking tool is wired into the site."
      : ctas.length
        ? `Found ${ctas.length} call-to-action button${ctas.length > 1 ? "s" : ""}, for example “${text(ctas[0]).slice(0, 40)}”.`
        : "No book, quote or schedule button was found.",
    fix: "Repeat one primary action (book, get a quote) in the header, the hero and the end of every section. Online booking converts best.",
  });

  add({
    id: "chat",
    category: "leads",
    label: "Website chat or AI receptionist",
    impact: "medium",
    status: CHAT.test(lower) ? "pass" : "warn",
    detail: CHAT.test(lower) ? "A chat or messaging widget is installed." : "No chat or text-us widget was found.",
    fix: "Add a text-us widget or an AI receptionist that answers and books around the clock.",
  });

  const proof = REVIEW_WIDGETS.test(lower) || /\b(testimonials?|reviews?|rated \d|★|5[- ]star)\b/i.test(visibleText);
  add({
    id: "social-proof",
    category: "website",
    label: "Reviews and social proof on the site",
    impact: "medium",
    status: proof ? "pass" : "warn",
    detail: proof ? "Reviews or testimonials appear on the homepage." : "No reviews, ratings or testimonials were found on the homepage.",
    fix: "Show the star rating, review count and three recent reviews near the top of the page.",
  });

  const years = [...visibleText.matchAll(/(?:©|copyright)\s*(?:\d{4}\s*[-–]\s*)?(\d{4})/gi)].map((m) => Number(m[1]));
  const year = years.length ? Math.max(...years) : null;
  const thisYear = new Date().getFullYear();
  if (year) {
    add({
      id: "freshness",
      category: "website",
      label: "Site looks maintained",
      impact: "low",
      status: year >= thisYear - 1 ? "pass" : "warn",
      detail: `The footer says © ${year}.`,
      fix: "Update the footer year and refresh dated pages. Stale sites lose trust with people and search engines.",
    });
  }

  // ---------- Search engines ----------
  add({
    id: "title",
    category: "search",
    label: "Page title",
    impact: "high",
    status: !title ? "fail" : title.length < 25 || title.length > 65 ? "warn" : "pass",
    detail: title ? `“${title}” (${title.length} characters).` : "The page has no <title>.",
    fix: "Write a 50–60 character title: main service, city, brand. For example “Plumber in Mesa, AZ | Desert Peak Plumbing”.",
  });
  add({
    id: "meta-description",
    category: "search",
    label: "Meta description",
    impact: "medium",
    status: !description ? "fail" : description.length < 70 || description.length > 165 ? "warn" : "pass",
    detail: description ? `“${description.slice(0, 160)}” (${description.length} characters).` : "No meta description. Google will pick random text for the search result.",
    fix: "Write a 140–160 character description with the service, the area and a reason to click.",
  });
  const h1s = root.querySelectorAll("h1").map(text).filter(Boolean);
  add({
    id: "h1",
    category: "search",
    label: "One clear H1 heading",
    impact: "medium",
    status: h1s.length === 1 ? "pass" : h1s.length === 0 ? "fail" : "warn",
    detail: h1s.length === 0 ? "No H1 heading on the page." : h1s.length === 1 ? `H1: “${h1s[0].slice(0, 90)}”.` : `${h1s.length} H1 headings. Search engines expect one.`,
    fix: "Use exactly one H1 that says what the business does and where.",
  });
  const h2s = root.querySelectorAll("h2").length;
  add({
    id: "headings",
    category: "search",
    label: "Section headings",
    impact: "low",
    status: h2s >= 3 ? "pass" : h2s >= 1 ? "warn" : "fail",
    detail: `${h2s} H2 heading${h2s === 1 ? "" : "s"} on the page.`,
    fix: "Break the page into sections with H2 headings, one per service or question.",
  });
  add({
    id: "content-depth",
    category: "search",
    label: "Enough text to rank",
    impact: "medium",
    status: words >= 500 ? "pass" : words >= 250 ? "warn" : "fail",
    detail: `About ${words.toLocaleString("en-US")} words of readable text on the homepage.`,
    fix: "Aim for 600+ words on the homepage: services, areas served, process, pricing cues and FAQs.",
  });
  const canonical = root.querySelector('link[rel="canonical"]')?.getAttribute("href");
  add({
    id: "canonical",
    category: "search",
    label: "Canonical URL",
    impact: "low",
    status: canonical ? "pass" : "warn",
    detail: canonical ? `Canonical: ${canonical}` : "No canonical tag. Duplicate versions of the page can split ranking signals.",
    fix: "Add <link rel=\"canonical\"> pointing to the preferred URL of each page.",
  });
  const robotsMeta = `${meta(root, "robots") ?? ""} ${page.headers.get("x-robots-tag") ?? ""}`;
  if (/noindex/i.test(robotsMeta)) {
    add({ id: "noindex", category: "search", label: "Page can be indexed", impact: "high", status: "fail", detail: "The homepage tells search engines not to index it (noindex).", fix: "Remove the noindex directive unless the site is deliberately hidden." });
  } else {
    add({ id: "noindex", category: "search", label: "Page can be indexed", impact: "high", status: "pass", detail: "No noindex directive found." });
  }
  const imgs = root.querySelectorAll("img");
  const withAlt = imgs.filter((i) => (i.getAttribute("alt") ?? "").trim().length > 0).length;
  if (imgs.length) {
    const pct = Math.round((withAlt / imgs.length) * 100);
    add({
      id: "alt-text",
      category: "search",
      label: "Image alt text",
      impact: "low",
      status: pct >= 90 ? "pass" : pct >= 60 ? "warn" : "fail",
      detail: `${withAlt} of ${imgs.length} images have alt text (${pct}%).`,
      fix: "Describe every meaningful image in its alt text. It helps image search, AI models and screen readers.",
    });
  }
  add({
    id: "robots-txt",
    category: "search",
    label: "robots.txt",
    impact: "low",
    status: robots ? "pass" : "warn",
    detail: robots ? "robots.txt is present." : "No robots.txt file.",
    fix: "Add a robots.txt that allows crawling and lists the sitemap.",
  });
  const sitemapInRobots = robots?.match(/^\s*sitemap\s*:\s*(\S+)/im)?.[1];
  const sitemapOk = !!sitemapInRobots || (sitemapRes?.status === 200 && /<(urlset|sitemapindex)/i.test(sitemapRes.body));
  add({
    id: "sitemap",
    category: "search",
    label: "XML sitemap",
    impact: "medium",
    status: sitemapOk ? "pass" : "fail",
    detail: sitemapOk ? `Sitemap found${sitemapInRobots ? ` (${sitemapInRobots})` : " at /sitemap.xml"}.` : "No XML sitemap was found at /sitemap.xml or in robots.txt.",
    fix: "Publish a sitemap.xml, list it in robots.txt and submit it in Google Search Console and Bing Webmaster Tools.",
  });
  const ogTitle = meta(root, "og:title");
  const ogImage = meta(root, "og:image");
  add({
    id: "open-graph",
    category: "search",
    label: "Share previews (Open Graph)",
    impact: "low",
    status: ogTitle && ogImage ? "pass" : ogTitle || ogImage ? "warn" : "fail",
    detail: ogTitle && ogImage ? "Title and image are set for link previews." : `Missing ${[!ogTitle && "og:title", !ogImage && "og:image"].filter(Boolean).join(" and ")}. Links shared in texts and social posts show a blank card.`,
    fix: "Add og:title, og:description and a 1200×630 og:image.",
  });
  const lang = root.querySelector("html")?.getAttribute("lang");
  if (!lang) {
    add({ id: "lang", category: "search", label: "Page language", impact: "low", status: "warn", detail: "The <html> tag has no lang attribute.", fix: "Set <html lang=\"en\">." });
  }

  // ---------- AI answer engines ----------
  const localTypes = ld.types.filter((t) => /LocalBusiness|Organization|Store|Service|Contractor|Plumber|Electrician|HVAC|Roofing|Dentist|Attorney|Restaurant|ProfessionalService|HomeAndConstruction|MedicalBusiness|AutoRepair|LegalService|RealEstate/i.test(t));
  add({
    id: "schema",
    category: "ai",
    label: "Structured data (schema.org)",
    impact: "high",
    status: localTypes.length ? "pass" : ld.types.length ? "warn" : "fail",
    detail: ld.types.length
      ? `JSON-LD types found: ${ld.types.slice(0, 8).join(", ")}${ld.invalid ? `. ${ld.invalid} block${ld.invalid > 1 ? "s" : ""} could not be parsed` : ""}.`
      : "No structured data. AI engines and Google have to guess the business name, services, area and hours.",
    fix: "Add LocalBusiness (or the specific type) JSON-LD with name, address, phone, hours, area served, services, rating and sameAs links to every profile.",
  });
  if (localTypes.length) {
    const missing = [!ld.hasAddress && "address", !ld.hasHours && "opening hours", !ld.hasRating && "aggregate rating", ld.sameAs.length === 0 && "sameAs profile links"].filter(Boolean);
    add({
      id: "schema-depth",
      category: "ai",
      label: "Business details in the structured data",
      impact: "medium",
      status: missing.length === 0 ? "pass" : missing.length <= 2 ? "warn" : "fail",
      detail: missing.length === 0 ? "Address, hours, rating and profile links are all marked up." : `Missing from the markup: ${missing.join(", ")}.`,
      fix: "Fill in every LocalBusiness field. sameAs links tie the website to the Google, Facebook, Yelp and social profiles so AI models treat them as one entity.",
    });
  }
  const faq = ld.types.includes("FAQPage") || root.querySelectorAll("h2,h3,h4,summary,dt").filter((h) => /\?\s*$/.test(text(h))).length >= 3;
  add({
    id: "faq",
    category: "ai",
    label: "Question-and-answer content",
    impact: "medium",
    status: faq ? "pass" : "warn",
    detail: faq ? "The page answers questions directly (FAQ headings or FAQPage markup)." : "No FAQ section. AI engines quote pages that answer the exact question asked.",
    fix: "Add an FAQ with the 8–10 questions customers actually ask (cost, timing, areas, warranties), each answered in two or three sentences, plus FAQPage markup.",
  });
  if (robots) {
    const blocked = AI_BOTS.filter((b) => robotsBlocks(robots, b.agent));
    const searchBlocked = blocked.filter((b) => /Search|User|Perplexity|Extended/.test(b.agent));
    add({
      id: "ai-crawlers",
      category: "ai",
      label: "AI crawlers allowed",
      impact: "high",
      status: blocked.length === 0 ? "pass" : searchBlocked.length ? "fail" : "warn",
      detail: blocked.length === 0 ? "robots.txt lets GPTBot, ClaudeBot, PerplexityBot, Google-Extended and the other AI crawlers in." : `robots.txt blocks ${blocked.map((b) => `${b.agent} (${b.owner})`).join(", ")}.`,
      fix: "Allow the AI search crawlers (OAI-SearchBot, ChatGPT-User, Claude-SearchBot, PerplexityBot, Google-Extended) so the business can be cited in AI answers.",
    });
    if (robotsBlocks(robots, "Googlebot") || robotsBlocks(robots, "Bingbot")) {
      add({ id: "search-crawlers", category: "search", label: "Google and Bing can crawl", impact: "high", status: "fail", detail: "robots.txt blocks Googlebot or Bingbot from the whole site.", fix: "Remove the Disallow: / rule for search engine crawlers." });
    }
  }
  const llms = llmsRes && llmsRes.status === 200 && !/<html/i.test(llmsRes.body) && llmsRes.body.trim().length > 20;
  add({
    id: "llms-txt",
    category: "ai",
    label: "llms.txt",
    impact: "low",
    status: llms ? "pass" : "warn",
    detail: llms ? "An llms.txt file gives AI models a summary of the site." : "No /llms.txt. It is an emerging standard that hands AI models a clean summary of the business.",
    fix: "Publish /llms.txt with a short description, services, areas, contact details and links to key pages.",
  });
  const scripts = root.querySelectorAll("script").length;
  const jsOnly = words < 120 && (scripts > 8 || /id="(root|__next|app)"/.test(html));
  add({
    id: "server-rendered",
    category: "ai",
    label: "Content readable without JavaScript",
    impact: "high",
    status: jsOnly ? "fail" : "pass",
    detail: jsOnly ? `Only ${words} words reach a crawler before JavaScript runs. Most AI crawlers do not run JavaScript, so they see an empty page.` : "The page text is in the HTML, so AI crawlers can read it.",
    fix: "Render pages on the server (or pre-render them) so the text is in the HTML.",
  });
  const napAddress = /\b\d{2,6}\s+[A-Za-z0-9.\s]{2,40}\b(st|street|ave|avenue|rd|road|blvd|dr|drive|ln|lane|way|ct|court|pkwy|hwy|suite)\b/i.test(visibleText) || ld.hasAddress;
  add({
    id: "nap",
    category: "ai",
    label: "Name, address and phone on the page",
    impact: "medium",
    status: phone && napAddress ? "pass" : phone || napAddress ? "warn" : "fail",
    detail: phone && napAddress ? "Phone and address are both on the page." : `Missing: ${[!phone && "phone", !napAddress && "street address or service area"].filter(Boolean).join(" and ")}.`,
    fix: "Show the same name, address and phone in the footer of every page, matching the Google profile exactly.",
  });

  // ---------- Ads and tracking ----------
  const hasGtm = TRACKERS[1].test.test(html);
  for (const t of TRACKERS) {
    const found = t.test.test(html);
    if (!found && hasGtm && t.id !== "gtm") {
      // Tags fired through Tag Manager never appear in the page source.
      add({
        id: `track-${t.id}`,
        category: "ads",
        label: t.name,
        impact: t.impact,
        status: "info",
        detail: `${t.name} is not in the page code, but Tag Manager is installed and may load it. Confirm with Google Tag Assistant or the Meta Pixel Helper.`,
      });
      continue;
    }
    add({
      id: `track-${t.id}`,
      category: "ads",
      label: t.name,
      impact: t.impact,
      status: found ? "pass" : t.impact === "low" ? "info" : "fail",
      detail: found ? `${t.name} is installed.` : `${t.name} was not found on the homepage. ${t.why}`,
      fix: found ? undefined : `Install ${t.name} and set up lead and call conversions.`,
    });
  }
  add({
    id: "call-tracking",
    category: "ads",
    label: "Call tracking",
    impact: "medium",
    status: CALL_TRACKING.test(lower) ? "pass" : "warn",
    detail: CALL_TRACKING.test(lower) ? "A call tracking service swaps numbers on the site." : "No call tracking. Phone leads cannot be tied back to the ad, search or post that produced them.",
    fix: "Add dynamic number insertion (CallRail or similar) so every call is credited to its source.",
  });
  add({
    id: "session-recording",
    category: "ads",
    label: "Visitor behaviour insight",
    impact: "low",
    status: SESSION_TOOLS.test(lower) ? "pass" : "info",
    detail: SESSION_TOOLS.test(lower) ? "Heatmaps or session recordings are installed (Clarity, Hotjar or similar)." : "No heatmap or session recording tool. Microsoft Clarity is free.",
  });
  if (/gtag|fbq|googletagmanager/.test(lower) && !CONSENT.test(lower)) {
    add({ id: "consent", category: "ads", label: "Cookie consent", impact: "low", status: "info", detail: "Tracking runs without a consent banner. Fine for most US-only audiences, required for visitors from the EU, UK and some US states.", });
  }

  // ---------- Social links on the site ----------
  const socials: Partial<Record<Platform, string>> = {};
  const hrefs = [...root.querySelectorAll("a[href]").map((a) => a.getAttribute("href") ?? ""), ...ld.sameAs];
  for (const { platform, test } of SOCIAL_PATTERNS) {
    for (const href of hrefs) {
      const m = href.match(test);
      if (m) {
        const handle = normalizeHandle(platform, `https://${m[0]}`);
        if (handle) {
          socials[platform] = handle;
          break;
        }
      }
    }
  }
  const linked = Object.keys(socials).length;
  add({
    id: "social-links",
    category: "social",
    label: "Social profiles linked from the site",
    impact: "medium",
    status: linked >= 3 ? "pass" : linked >= 1 ? "warn" : "fail",
    detail: linked ? `The site links to ${linked} profile${linked > 1 ? "s" : ""}: ${Object.keys(socials).join(", ")}.` : "The site does not link to any social profile.",
    fix: "Link every active profile from the footer and list them in the sameAs schema so search and AI engines connect them.",
  });

  // Response time is a rough signal; the PageSpeed test is the real one.
  add({
    id: "response-time",
    category: "speed",
    label: "Server response",
    impact: "medium",
    status: page.ms < 1200 ? "pass" : page.ms < 2500 ? "warn" : "fail",
    detail: `The homepage HTML (${Math.round(page.bytes / 1024)} KB) arrived in ${(page.ms / 1000).toFixed(1)} s from our server${page.redirects.length ? ` after ${page.redirects.length} redirect${page.redirects.length > 1 ? "s" : ""}` : ""}.`,
    fix: "Move to faster hosting with a CDN and page caching.",
  });

  const businessName =
    ld.name ??
    ogSiteName ??
    (title ? title.split(/\s[|\-–—:·]\s/).map((s) => s.trim()).filter(Boolean).sort((a, b) => a.length - b.length)[0] ?? null : null);

  return {
    url,
    finalUrl: page.finalUrl,
    businessName,
    title,
    description,
    phone,
    socials,
    schemaTypes: ld.types,
    findings,
  };
}
