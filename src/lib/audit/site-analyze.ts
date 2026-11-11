import { parse, type HTMLElement } from "node-html-parser";
import {
  AI_SEARCH_BOTS,
  TRACKER_FIX,
  faqJsonLd,
  faqQuestions,
  footerNap,
  llmsTxt,
  localBusinessJsonLd,
  ogTags,
  robotsAllowBlock,
  suggestDescription,
  suggestH1,
  suggestTitle,
  telHref,
} from "./fixes";
import { type AuditContext, type Finding, type Platform, domainOf, normalizeHandle } from "./shared";

// Turns a fetched homepage (plus robots.txt, sitemap and llms.txt) into
// findings for the website, search, AI, ads and social categories, each with
// fix details written for this business. No network access in here.

export type SiteInput = {
  url: string;
  finalUrl: string;
  headers: Record<string, string>;
  html: string;
  ms: number;
  bytes: number;
  redirects: number;
  robots: string | null;
  sitemapFound: boolean;
  llms: string | null;
  /** Whether http:// forwards to https://; null when not checked. */
  httpUpgraded: boolean | null;
};

export type SiteResult = {
  url: string;
  finalUrl: string;
  businessName: string | null;
  title: string | null;
  description: string | null;
  h1: string | null;
  phone: string | null;
  socials: Partial<Record<Platform, string>>;
  schemaTypes: string[];
  /** The start of the readable page text, for the AI copywriter. */
  pageText: string;
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


export function analyzeSite(input: SiteInput, ctxIn: Partial<AuditContext>): SiteResult {
  const final = new URL(input.finalUrl);
  const origin = final.origin;
  const html = input.html;
  const root = parse(html, { comment: false });
  const findings: Finding[] = [];
  const add = (f: Finding) => findings.push(f);
  const robots = input.robots;

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
  const h1s = root.querySelectorAll("h1").map(text).filter(Boolean);

  const businessName =
    ld.name ??
    ogSiteName ??
    (title ? title.split(/\s[|\-–—:·]\s/).map((s) => s.trim()).filter((s) => s && !/^home$/i.test(s)).sort((a, b) => a.length - b.length)[0] ?? null : null);
  const ctx: AuditContext = { name: ctxIn.name || businessName || domainOf(input.url), city: ctxIn.city ?? "", industry: ctxIn.industry ?? "" };

  // Social links (needed early for the schema snippet).
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

  // Main internal pages, for llms.txt.
  const pages: { title: string; url: string }[] = [];
  for (const a of root.querySelectorAll("nav a[href], header a[href]")) {
    try {
      const u = new URL(a.getAttribute("href") ?? "", origin);
      const label = text(a);
      if (u.origin !== origin || !label || label.length > 40 || pages.some((p) => p.url === u.href)) continue;
      pages.push({ title: label, url: u.href.replace(/#.*$/, "") });
    } catch {}
    if (pages.length >= 8) break;
  }

  const telLinks = root.querySelectorAll('a[href^="tel:"]');
  const phoneMatch = visibleText.match(/(?:\+?1[\s.-]?)?\(?\b\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}\b/);
  const phone = telLinks[0]?.getAttribute("href")?.replace(/^tel:/, "") ?? phoneMatch?.[0] ?? null;
  const logo = root.querySelector('img[src*="logo" i]')?.getAttribute("src");
  const logoUrl = logo ? safeUrl(logo, origin) : meta(root, "og:image");

  // ---------- Website and conversion ----------
  add({
    id: "https",
    category: "website",
    label: "Secure connection (HTTPS)",
    impact: "high",
    status: final.protocol === "https:" ? "pass" : "fail",
    detail: final.protocol === "https:" ? "The site loads over HTTPS." : "The site loads over plain HTTP. Browsers mark it “Not secure”.",
    fix: "Install an SSL certificate and redirect every http address to https.",
    steps: [
      "Turn on the free SSL certificate in the hosting or site-builder panel (Let's Encrypt or the host's own).",
      `Add a permanent 301 redirect from http://${final.host} to https://${final.host}.`,
      "Update the Google profile, social bios and ad links to the https address.",
    ],
  });
  if (final.protocol === "https:" && input.httpUpgraded === false) {
    add({
      id: "http-redirect",
      category: "website",
      label: "HTTP redirects to HTTPS",
      impact: "medium",
      status: "warn",
      detail: `http://${final.host}/ does not forward to https://.`,
      fix: "Add a permanent (301) redirect from http to https.",
      steps: ["Turn on “Force HTTPS” in the host or CDN settings (Cloudflare: SSL/TLS → Edge Certificates → Always Use HTTPS)."],
    });
  }

  const viewport = meta(root, "viewport");
  add({
    id: "viewport",
    category: "website",
    label: "Built for phones",
    impact: "high",
    status: viewport && /width=device-width/i.test(viewport) ? "pass" : "fail",
    detail: viewport ? `Viewport tag: “${viewport}”.` : "No mobile viewport tag. On a phone the page renders as a shrunken desktop site.",
    fix: "Add a mobile viewport tag and a responsive layout.",
    snippet: { label: "Add to the <head>", text: '<meta name="viewport" content="width=device-width, initial-scale=1">' },
  });

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
    fix: "Put the phone number in the header as a tap-to-call link.",
    steps: [
      "Wrap every phone number on the site in a tel: link (code below).",
      "Put it top right in the header on desktop and as a sticky “Call now” button at the bottom of the screen on phones.",
      "Use a tracked number (call tracking) so calls from the website can be counted.",
    ],
    snippet: { label: "Tap-to-call link", text: phone ? `<a href="tel:${telHref(phone)}">${phone}</a>` : '<a href="tel:+1XXXXXXXXXX">(XXX) XXX-XXXX</a>' },
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
    fix: "Add a short quote form above the fold.",
    steps: [
      "Add a four-field form in the hero: name, phone, ZIP code, “What do you need help with?”.",
      "Send submissions to the CRM and text the owner instantly; reply to the lead by text within five minutes.",
      "Show a thank-you page (/thank-you) so Google Ads, Meta and GA4 can count it as a conversion.",
    ],
  });

  const ctaWords = /\b(book|schedule|get (a |your )?(free )?(quote|estimate)|request (a |an )?(quote|estimate|service|appointment)|call now|contact us|get started|free (quote|estimate|consultation|inspection))\b/i;
  const ctas = root.querySelectorAll("a,button").filter((a) => ctaWords.test(text(a)));
  const hasBooking = BOOKING.test(lower);
  const ctaLabels = [...new Set(ctas.map((c) => text(c).slice(0, 40)))].slice(0, 6);
  add({
    id: "cta",
    category: "website",
    label: "Clear call to action",
    impact: "high",
    status: ctas.length >= 2 || hasBooking ? "pass" : ctas.length === 1 ? "warn" : "fail",
    detail: hasBooking
      ? "An online booking tool is wired into the site."
      : ctas.length
        ? `Found ${ctas.length} call-to-action button${ctas.length > 1 ? "s" : ""}, for example “${ctaLabels[0]}”.`
        : "No book, quote or schedule button was found.",
    fix: "Repeat one primary action everywhere and add online booking.",
    items: ctaLabels.length ? ctaLabels.map((l) => `Button found: “${l}”`) : undefined,
    steps: [
      `Pick one primary action, for example “Book ${ctx.industry ? `a ${ctx.industry.toLowerCase()}` : "online"}” or “Get a free quote”, and use those exact words on every button.`,
      "Place it in the header, in the hero, after the services section and at the bottom of the page.",
      "Connect online booking (the field-service software's booking widget, or Calendly) so people can pick a time without calling.",
    ],
  });

  add({
    id: "chat",
    category: "leads",
    label: "Website chat or AI receptionist",
    impact: "medium",
    status: CHAT.test(lower) ? "pass" : "warn",
    detail: CHAT.test(lower) ? "A chat or messaging widget is installed." : "No chat or text-us widget was found.",
    fix: "Add a text-us widget or an AI receptionist that answers and books around the clock.",
    steps: ["Add a “Text us” widget that sends messages to the team's phones.", "After hours, let an AI receptionist answer questions and book the job.", "Log every conversation in the CRM."],
  });

  const proof = REVIEW_WIDGETS.test(lower) || /\b(testimonials?|reviews?|rated \d|★|5[- ]star)\b/i.test(visibleText);
  add({
    id: "social-proof",
    category: "website",
    label: "Reviews and social proof on the site",
    impact: "medium",
    status: proof ? "pass" : "warn",
    detail: proof ? "Reviews or testimonials appear on the homepage." : "No reviews, ratings or testimonials were found on the homepage.",
    fix: "Show the star rating, review count and three recent reviews near the top.",
    steps: [
      "Add a line under the hero headline: “★★★★★ 4.9 from 300+ Google reviews” with the real numbers.",
      "Embed a live Google reviews feed further down the page.",
      "Add trust badges: licensed and insured, years in business, warranty, BBB.",
    ],
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
      fix: `Update the footer to © ${thisYear} and refresh dated pages.`,
      snippet: { label: "Footer line that never goes stale", text: `© <script>document.write(new Date().getFullYear())</script> ${ctx.name}` },
    });
  }

  // ---------- Search engines ----------
  const newTitle = suggestTitle(ctx);
  add({
    id: "title",
    category: "search",
    label: "Page title",
    impact: "high",
    status: !title ? "fail" : title.length < 25 || title.length > 65 ? "warn" : "pass",
    detail: title ? `“${title}” (${title.length} characters).` : "The page has no <title>.",
    fix: `Change the title to “${newTitle}”.`,
    steps: ["Lead with the main service and the city, then the brand.", "Keep it between 50 and 60 characters.", "Give every service page its own title in the same pattern."],
    snippet: { label: `Suggested title (${newTitle.length} characters)`, text: `<title>${newTitle}</title>` },
  });
  const newDesc = suggestDescription(ctx, phone);
  add({
    id: "meta-description",
    category: "search",
    label: "Meta description",
    impact: "medium",
    status: !description ? "fail" : description.length < 70 || description.length > 165 ? "warn" : "pass",
    detail: description ? `“${description.slice(0, 160)}” (${description.length} characters).` : "No meta description. Google will pick random text for the search result.",
    fix: "Use the suggested description below.",
    snippet: { label: `Suggested description (${newDesc.length} characters)`, text: `<meta name="description" content="${newDesc}">` },
  });
  const newH1 = suggestH1(ctx);
  add({
    id: "h1",
    category: "search",
    label: "One clear H1 heading",
    impact: "medium",
    status: h1s.length === 1 ? "pass" : h1s.length === 0 ? "fail" : "warn",
    detail: h1s.length === 0 ? "No H1 heading on the page." : h1s.length === 1 ? `H1: “${h1s[0].slice(0, 90)}”.` : `${h1s.length} H1 headings. Search engines expect one.`,
    fix: h1s.length > 1 ? "Keep one H1 and change the others to H2." : `Use one H1 that says what the business does and where, such as “${newH1}”.`,
    items: h1s.length > 1 ? h1s.slice(0, 6).map((h) => `H1: “${h.slice(0, 80)}”`) : undefined,
    snippet: h1s.length === 0 ? { label: "Suggested H1", text: `<h1>${newH1}</h1>` } : undefined,
  });
  const h2s = root.querySelectorAll("h2").map(text).filter(Boolean);
  add({
    id: "headings",
    category: "search",
    label: "Section headings",
    impact: "low",
    status: h2s.length >= 3 ? "pass" : h2s.length >= 1 ? "warn" : "fail",
    detail: `${h2s.length} H2 heading${h2s.length === 1 ? "" : "s"} on the page.`,
    fix: "Break the page into sections, each with an H2.",
    items: h2s.length ? h2s.slice(0, 6).map((h) => `H2: “${h.slice(0, 70)}”`) : undefined,
    steps: [
      `Suggested H2s: “${ctx.industry ? `${capitalize(ctx.industry)} services` : "Our services"}”, “Areas we serve${ctx.city ? ` around ${ctx.city.split(",")[0]}` : ""}”, “Why ${ctx.name}”, “What customers say”, “Frequently asked questions”.`,
    ],
  });
  add({
    id: "content-depth",
    category: "search",
    label: "Enough text to rank",
    impact: "medium",
    status: words >= 500 ? "pass" : words >= 250 ? "warn" : "fail",
    detail: `About ${words.toLocaleString("en-US")} words of readable text on the homepage.`,
    fix: `Add about ${Math.max(0, 650 - words).toLocaleString("en-US")} words in the sections below.`,
    steps: [
      "Services: one short paragraph per main service (60–80 words each), each linking to its own page.",
      `Areas served: list the cities and neighbourhoods${ctx.city ? ` around ${ctx.city.split(",")[0]}` : ""}, each linking to a location page.`,
      "Why choose us: years in business, licences, warranty, response time, pricing approach.",
      "FAQ: the eight questions in the AI section below, answered in two or three sentences each.",
    ],
  });
  const canonical = root.querySelector('link[rel="canonical"]')?.getAttribute("href");
  add({
    id: "canonical",
    category: "search",
    label: "Canonical URL",
    impact: "low",
    status: canonical ? "pass" : "warn",
    detail: canonical ? `Canonical: ${canonical}` : "No canonical tag. Duplicate versions of the page can split ranking signals.",
    fix: "Add a canonical tag to every page.",
    snippet: { label: "Add to the <head>", text: `<link rel="canonical" href="${origin}/">` },
  });
  const robotsMeta = meta(root, "robots") ?? "";
  const robotsHeader = input.headers["x-robots-tag"] ?? "";
  if (/noindex/i.test(`${robotsMeta} ${robotsHeader}`)) {
    add({
      id: "noindex",
      category: "search",
      label: "Page can be indexed",
      impact: "high",
      status: "fail",
      detail: "The homepage tells search engines not to index it (noindex).",
      fix: "Remove the noindex directive.",
      items: [robotsMeta && `<meta name="robots" content="${robotsMeta}">`, robotsHeader && `HTTP header X-Robots-Tag: ${robotsHeader}`].filter(Boolean) as string[],
      steps: ["WordPress: Settings → Reading → untick “Discourage search engines”. Other builders: SEO settings → allow indexing.", "Then request indexing in Google Search Console."],
    });
  } else {
    add({ id: "noindex", category: "search", label: "Page can be indexed", impact: "high", status: "pass", detail: "No noindex directive found." });
  }
  const imgs = root.querySelectorAll("img");
  const noAlt = imgs.filter((i) => !(i.getAttribute("alt") ?? "").trim());
  if (imgs.length) {
    const withAlt = imgs.length - noAlt.length;
    const pct = Math.round((withAlt / imgs.length) * 100);
    add({
      id: "alt-text",
      category: "search",
      label: "Image alt text",
      impact: "low",
      status: pct >= 90 ? "pass" : pct >= 60 ? "warn" : "fail",
      detail: `${withAlt} of ${imgs.length} images have alt text (${pct}%).`,
      fix: "Add alt text to the images listed.",
      items: countBy(noAlt.map((i) => fileName(i.getAttribute("src") ?? i.getAttribute("data-src") ?? "(inline image)")))
        .slice(0, 12)
        .map(([file, n]) => `Missing alt: ${file}${n > 1 ? ` (used ${n} times)` : ""}`),
      steps: [`Describe what is in each photo and where, for example “${ctx.industry ? capitalize(ctx.industry) : "Our team"} at work on a job in ${ctx.city ? ctx.city.split(",")[0] : "town"}”.`, "Leave alt empty (alt=\"\") only on purely decorative images and icons."],
    });
  }
  const sitemapLine = robots?.match(/^\s*sitemap\s*:\s*(\S+)/im)?.[1] ?? null;
  add({
    id: "robots-txt",
    category: "search",
    label: "robots.txt",
    impact: "low",
    status: robots ? "pass" : "warn",
    detail: robots ? "robots.txt is present." : "No robots.txt file.",
    fix: "Publish the robots.txt below at the site root.",
    snippet: robots ? undefined : { label: `${origin}/robots.txt`, text: robotsAllowBlock(origin, sitemapLine) },
  });
  const sitemapOk = !!sitemapLine || input.sitemapFound;
  add({
    id: "sitemap",
    category: "search",
    label: "XML sitemap",
    impact: "medium",
    status: sitemapOk ? "pass" : "fail",
    detail: sitemapOk ? `Sitemap found${sitemapLine ? ` (${sitemapLine})` : " at /sitemap.xml"}.` : "No XML sitemap was found at /sitemap.xml or in robots.txt.",
    fix: "Publish a sitemap and submit it to Google and Bing.",
    steps: [
      "WordPress: turn on the sitemap in Yoast or Rank Math. Wix, Squarespace and Webflow create one automatically at /sitemap.xml.",
      `Add “Sitemap: ${origin}/sitemap.xml” to robots.txt.`,
      "Submit it in Google Search Console and Bing Webmaster Tools (Bing feeds ChatGPT and Copilot search).",
    ],
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
    fix: "Add the share-preview tags below.",
    snippet: { label: "Add to the <head>", text: ogTags(title && title.length >= 25 ? title : newTitle, description ?? newDesc, `${origin}/`) },
  });
  const lang = root.querySelector("html")?.getAttribute("lang");
  if (!lang) {
    add({ id: "lang", category: "search", label: "Page language", impact: "low", status: "warn", detail: "The <html> tag has no lang attribute.", fix: "Set the page language.", snippet: { label: "Opening tag", text: '<html lang="en">' } });
  }

  // ---------- AI answer engines ----------
  const schemaSnippet = { label: "Paste into the <head> of the homepage, then fill in the REPLACE values", text: localBusinessJsonLd(ctx, { url: input.finalUrl, phone, logo: logoUrl, socials, description: description ?? newDesc }) };
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
    fix: "Add the LocalBusiness markup below, prefilled from the site.",
    snippet: localTypes.length ? undefined : schemaSnippet,
    steps: localTypes.length ? undefined : ["Fill in the REPLACE values and the real hours.", "Check it with the Google Rich Results test (link in the search section).", "Keep the name, address and phone identical to the Google profile."],
  });
  if (localTypes.length) {
    const missing = [!ld.hasAddress && "address", !ld.hasHours && "opening hours", !ld.hasRating && "aggregate rating", ld.sameAs.length === 0 && "sameAs profile links"].filter(Boolean) as string[];
    add({
      id: "schema-depth",
      category: "ai",
      label: "Business details in the structured data",
      impact: "medium",
      status: missing.length === 0 ? "pass" : missing.length <= 2 ? "warn" : "fail",
      detail: missing.length === 0 ? "Address, hours, rating and profile links are all marked up." : `Missing from the markup: ${missing.join(", ")}.`,
      fix: "Add the missing fields. A complete version is below to compare against.",
      items: missing.map((m) => `Missing: ${m}`),
      snippet: missing.length ? schemaSnippet : undefined,
    });
  }
  const faq = ld.types.includes("FAQPage") || root.querySelectorAll("h2,h3,h4,summary,dt").filter((h) => /\?\s*$/.test(text(h))).length >= 3;
  const questions = faqQuestions(ctx);
  add({
    id: "faq",
    category: "ai",
    label: "Question-and-answer content",
    impact: "medium",
    status: faq ? "pass" : "warn",
    detail: faq ? "The page answers questions directly (FAQ headings or FAQPage markup)." : "No FAQ section. AI engines quote pages that answer the exact question asked.",
    fix: "Add an FAQ section with these questions, answered in two or three sentences each.",
    items: faq ? undefined : questions,
    snippet: faq ? undefined : { label: "FAQPage markup (first three questions; add the rest the same way)", text: faqJsonLd(questions) },
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
      detail: blocked.length === 0 ? "robots.txt lets GPTBot, ClaudeBot, PerplexityBot, Google-Extended and the other AI crawlers in." : `robots.txt blocks ${blocked.length} AI crawler${blocked.length > 1 ? "s" : ""}.`,
      fix: "Remove the Disallow rules for these bots and add the allow block below to robots.txt.",
      items: blocked.map((b) => `Blocked: ${b.agent} (${b.owner})`),
      snippet: blocked.length ? { label: `Add to ${origin}/robots.txt`, text: AI_SEARCH_BOTS.map((b) => `User-agent: ${b}\nAllow: /`).join("\n\n") } : undefined,
      steps: blocked.length ? ["Some security plugins and CDNs (Cloudflare “Block AI bots”) add these blocks automatically. Turn that setting off for the search bots."] : undefined,
    });
    if (robotsBlocks(robots, "Googlebot") || robotsBlocks(robots, "Bingbot")) {
      add({ id: "search-crawlers", category: "search", label: "Google and Bing can crawl", impact: "high", status: "fail", detail: "robots.txt blocks Googlebot or Bingbot from the whole site.", fix: "Remove the Disallow: / rule for search engine crawlers.", snippet: { label: `Replace ${origin}/robots.txt with`, text: robotsAllowBlock(origin, sitemapLine) } });
    }
  }
  const llms = !!input.llms && !/<html/i.test(input.llms) && input.llms.trim().length > 20;
  add({
    id: "llms-txt",
    category: "ai",
    label: "llms.txt",
    impact: "low",
    status: llms ? "pass" : "warn",
    detail: llms ? "An llms.txt file gives AI models a summary of the site." : "No /llms.txt. It is an emerging standard that hands AI models a clean summary of the business.",
    fix: `Publish the file below at ${origin}/llms.txt.`,
    snippet: llms ? undefined : { label: `${origin}/llms.txt (draft, fill in the REPLACE lines)`, text: llmsTxt(ctx, { url: input.finalUrl, phone, description: description ?? null, pages }) },
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
    steps: jsOnly ? ["If the site is a React or Vue app, switch to server rendering or static export (Next.js, Nuxt, Astro).", "On Wix or similar builders, check that text is real text and not inside images or embeds."] : undefined,
  });
  const napAddress = /\b\d{2,6}\s+[A-Za-z0-9.\s]{2,40}\b(st|street|ave|avenue|rd|road|blvd|dr|drive|ln|lane|way|ct|court|pkwy|hwy|suite)\b/i.test(visibleText) || ld.hasAddress;
  add({
    id: "nap",
    category: "ai",
    label: "Name, address and phone on the page",
    impact: "medium",
    status: phone && napAddress ? "pass" : phone || napAddress ? "warn" : "fail",
    detail: phone && napAddress ? "Phone and address are both on the page." : `Missing: ${[!phone && "phone", !napAddress && "street address or service area"].filter(Boolean).join(" and ")}.`,
    fix: "Add the footer block below to every page, matching the Google profile exactly.",
    snippet: phone && napAddress ? undefined : { label: "Footer contact block", text: footerNap(ctx, phone) },
  });

  // ---------- Ads and tracking ----------
  const hasGtm = TRACKERS[1].test.test(html);
  for (const t of TRACKERS) {
    const found = t.test.test(html);
    const howTo = TRACKER_FIX[t.id];
    if (!found && hasGtm && t.id !== "gtm") {
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
      steps: found ? undefined : howTo?.steps,
      snippet: !found && howTo?.snippet ? { label: `${t.name} (replace the X placeholders with the real ID)`, text: howTo.snippet } : undefined,
    });
  }
  add({
    id: "call-tracking",
    category: "ads",
    label: "Call tracking",
    impact: "medium",
    status: CALL_TRACKING.test(lower) ? "pass" : "warn",
    detail: CALL_TRACKING.test(lower) ? "A call tracking service swaps numbers on the site." : "No call tracking. Phone leads cannot be tied back to the ad, search or post that produced them.",
    fix: "Add dynamic number insertion so every call is credited to its source.",
    steps: [
      "Set up CallRail (or similar) with one number pool for the website and separate numbers for the Google profile, ads and print.",
      `Keep ${phone ?? "the main number"} as the number shown to search engines and in the Google profile's primary field; put the tracked number in the profile's secondary field.`,
      "Send calls as conversions to Google Ads and GA4.",
    ],
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
    add({ id: "consent", category: "ads", label: "Cookie consent", impact: "low", status: "info", detail: "Tracking runs without a consent banner. Fine for most US-only audiences, required for visitors from the EU, UK and some US states." });
  }

  // ---------- Social links on the site ----------
  const linked = Object.keys(socials) as Platform[];
  const unlinked = (["facebook", "instagram", "youtube", "tiktok", "linkedin"] as Platform[]).filter((p) => !socials[p]);
  add({
    id: "social-links",
    category: "social",
    label: "Social profiles linked from the site",
    impact: "medium",
    status: linked.length >= 3 ? "pass" : linked.length >= 1 ? "warn" : "fail",
    detail: linked.length ? `The site links to ${linked.length} profile${linked.length > 1 ? "s" : ""}: ${linked.join(", ")}.` : "The site does not link to any social profile.",
    fix: "Link every active profile from the footer and list them in the sameAs schema.",
    items: unlinked.map((p) => `Not linked: ${p}`),
  });

  // Response time is a rough signal; the PageSpeed test is the real one.
  add({
    id: "response-time",
    category: "speed",
    label: "Server response",
    impact: "medium",
    status: input.ms < 1200 ? "pass" : input.ms < 2500 ? "warn" : "fail",
    detail: `The homepage HTML (${Math.round(input.bytes / 1024)} KB) arrived in ${(input.ms / 1000).toFixed(1)} s from our server${input.redirects ? ` after ${input.redirects} redirect${input.redirects > 1 ? "s" : ""}` : ""}.`,
    fix: "Move to faster hosting with a CDN and page caching.",
    steps: ["Turn on page caching (WP Rocket or the host's cache on WordPress).", "Put the site behind a CDN such as Cloudflare.", input.redirects ? `Link straight to ${input.finalUrl} to skip the redirect${input.redirects > 1 ? "s" : ""}.` : "Upgrade from shared hosting if the server stays slow."],
  });

  return {
    url: input.url,
    finalUrl: input.finalUrl,
    businessName,
    title,
    description,
    h1: h1s[0] ?? null,
    phone,
    socials,
    schemaTypes: ld.types,
    pageText: visibleText.slice(0, 6000),
    findings,
  };
}

function safeUrl(src: string, origin: string): string | null {
  try {
    return new URL(src, origin).href;
  } catch {
    return null;
  }
}

function fileName(src: string): string {
  if (src.startsWith("data:")) return "(inline image)";
  try {
    const u = new URL(src, "https://x.invalid");
    return decodeURIComponent(u.pathname.split("/").filter(Boolean).pop() ?? src).slice(0, 80);
  } catch {
    return src.slice(0, 80);
  }
}

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

function countBy(list: string[]): [string, number][] {
  const m = new Map<string, number>();
  for (const x of list) m.set(x, (m.get(x) ?? 0) + 1);
  return [...m];
}
