import type { AiResult } from "./ai";
import type { CopyResult } from "./copy";
import { analyzePlaces, type PlaceSummary } from "./places";
import { analyzeSite } from "./site-analyze";
import { analyzeSpeed, type Psi } from "./speed";
import { DEMO_INPUT, type Platform } from "./shared";
import type { SocialResult } from "./social";

// A sample audit of a fictional plumber, run through the real analyzers.
// Opened with /marketing-audit/report?demo=1 for training and demos.


const HTML = `<!doctype html><html><head><title>Home - Desert Peak Plumbing</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="canonical" href="https://desertpeakplumbing.com/">
<meta property="og:title" content="Desert Peak Plumbing">
<script async src="https://www.googletagmanager.com/gtag/js?id=G-AB12CD34EF"></script>
<script type="application/ld+json">{"@context":"https://schema.org","@graph":[{"@type":"WebSite","name":"Desert Peak Plumbing"},{"@type":"WebPage","name":"Home"}]}</script>
</head><body>
<header><img src="/wp-content/uploads/2021/06/dpp-logo.png"><nav><a href="/">Home</a><a href="/services/">Services</a><a href="/water-heaters/">Water heaters</a><a href="/about-us/">About us</a><a href="/contact/">Contact us</a></nav></header>
<main>
<h1>Mesa's family-owned plumbers since 2009</h1>
<img src="/wp-content/uploads/2022/03/hero-truck.jpg">
<p>Desert Peak Plumbing has served homeowners across the East Valley for more than a decade. We fix leaks, clear drains, install and repair water heaters, and handle repiping and slab leaks. Our licensed plumbers show up on time, explain the options and clean up when the job is done. Call us at (480) 555-0142.</p>
<h2>Our services</h2>
<p>Drain cleaning, leak detection, water heater repair and replacement, tankless water heaters, repiping, slab leak repair, gas lines, water softeners and fixture installation for homes and small businesses.</p>
<img src="/wp-content/uploads/2022/03/drain-cleaning.jpg"><img src="/wp-content/uploads/2022/03/water-heater.jpg"><img src="/wp-content/uploads/2022/03/repipe.jpg" alt="Repipe job in Mesa"><img src="/wp-content/uploads/2022/03/slab-leak.jpg"><img src="/wp-content/uploads/2022/03/team-photo.jpg">
<img src="/wp-content/uploads/2022/03/van.jpg"><img src="/wp-content/uploads/2021/06/bbb.png" alt="BBB"><img src="/wp-content/uploads/2021/06/angi.png" alt="Angi"><img src="/wp-content/uploads/2022/03/faucet.jpg"><img src="/wp-content/uploads/2022/03/toilet.jpg"><img src="/wp-content/uploads/2022/03/softener.jpg"><img src="/wp-content/uploads/2022/03/gas-line.jpg"><img src="/wp-content/uploads/2022/03/kitchen-sink.jpg">
<h2>Why homeowners call us</h2>
<p>We are a local, family-owned company. We give a clear price before any work starts and we stand behind every repair. Most calls get a plumber the same day, and we serve Mesa, Gilbert, Chandler, Tempe and Queen Creek.</p>
<form action="/contact/" method="post"><input name="name"><input name="phone"><textarea name="message"></textarea><button>Send</button></form>
<a href="/contact/">Contact us</a>
</main>
<footer><a href="https://www.facebook.com/desertpeakplumbing">Facebook</a><a href="https://www.instagram.com/desertpeakplumbing/">Instagram</a><p>© 2022 Desert Peak Plumbing. All rights reserved.</p></footer>
</body></html>`;

const ROBOTS = `User-agent: *
Disallow: /wp-admin/

User-agent: GPTBot
Disallow: /

User-agent: PerplexityBot
Disallow: /

User-agent: CCBot
Disallow: /

Sitemap: https://desertpeakplumbing.com/sitemap_index.xml`;

const up = (f: string) => `https://desertpeakplumbing.com/wp-content/uploads/2022/03/${f}`;
const PSI: Psi = {
  lighthouseResult: {
    categories: {
      performance: { score: 0.38 },
      accessibility: { score: 0.81, auditRefs: [{ id: "color-contrast", weight: 7 }, { id: "image-alt", weight: 10 }, { id: "link-name", weight: 7 }, { id: "button-name", weight: 10 }] },
      "best-practices": { score: 0.78 },
      seo: { score: 0.85, auditRefs: [{ id: "meta-description", weight: 1 }, { id: "image-alt", weight: 1 }, { id: "target-size", weight: 1 }] },
    },
    audits: {
      "uses-responsive-images": { title: "Properly size images", score: 0, details: { overallSavingsMs: 2400, items: [{ url: up("hero-truck.jpg"), wastedBytes: 1843200 }, { url: up("team-photo.jpg"), wastedBytes: 921600 }, { url: up("van.jpg"), wastedBytes: 640000 }] } },
      "unused-javascript": { title: "Reduce unused JavaScript", score: 0.2, details: { overallSavingsMs: 1350, items: [{ url: "https://desertpeakplumbing.com/wp-content/plugins/elementor/assets/js/frontend.min.js", wastedBytes: 312000 }, { url: "https://desertpeakplumbing.com/wp-content/plugins/revslider/public/assets/js/rbtools.min.js", wastedBytes: 204000 }] } },
      "render-blocking-resources": { title: "Eliminate render-blocking resources", score: 0.3, details: { overallSavingsMs: 980, items: [{ url: "https://desertpeakplumbing.com/wp-content/themes/astra/assets/css/minified/main.min.css", totalBytes: 98000 }, { url: "https://fonts.googleapis.com/css?family=Roboto:400,700|Open+Sans", totalBytes: 4000 }] } },
      "modern-image-formats": { title: "Serve images in next-gen formats", score: 0.3, details: { overallSavingsMs: 760, items: [{ url: up("hero-truck.jpg"), wastedBytes: 1100000 }, { url: up("drain-cleaning.jpg"), wastedBytes: 380000 }] } },
      "largest-contentful-paint": { title: "Largest Contentful Paint", score: 0.1, numericValue: 6100 },
      "total-blocking-time": { title: "Total Blocking Time", score: 0.3, numericValue: 870 },
      "cumulative-layout-shift": { title: "Cumulative Layout Shift", score: 0.5, numericValue: 0.21 },
      "first-contentful-paint": { title: "First Contentful Paint", score: 0.4, numericValue: 2900 },
      "largest-contentful-paint-element": { title: "Largest Contentful Paint element", score: 0, details: { items: [{ items: [{ node: { nodeLabel: "Hero image", snippet: '<img src="/wp-content/uploads/2022/03/hero-truck.jpg">' } }] }] } },
      "third-party-summary": { title: "Third-party usage", score: 0, details: { items: [{ entity: "Google Tag Manager", blockingTime: 310 }, { entity: "Elfsight", blockingTime: 240 }, { entity: "Google Fonts", blockingTime: 60 }] } },
      "layout-shifts": { title: "Avoid large layout shifts", score: 0, details: { items: [{ node: { nodeLabel: "Hero image without width and height" } }, { node: { nodeLabel: "Cookie notice bar" } }] } },
      "color-contrast": { title: "Background and foreground colors do not have a sufficient contrast ratio", score: 0 },
      "image-alt": { title: "Image elements do not have [alt] attributes", score: 0 },
      "link-name": { title: "Links do not have a discernible name", score: 0 },
      "button-name": { title: "Buttons have an accessible name", score: 1 },
      "meta-description": { title: "Document does not have a meta description", score: 0 },
      "target-size": { title: "Tap targets are not sized appropriately", score: 0 },
    },
  },
};

const place = (name: string, rating: number, reviews: number, extra: Partial<PlaceSummary> = {}): PlaceSummary => ({ id: null, name, rating, reviews, address: null, website: null, phone: null, hours: true, photos: 10, status: "OPERATIONAL", mapsUrl: null, primaryType: "Plumber", ...extra });

export function demoAudit() {
  const ctx = { name: DEMO_INPUT.name, city: DEMO_INPUT.city, industry: DEMO_INPUT.industry };
  const site = analyzeSite(
    { url: DEMO_INPUT.site, finalUrl: `${DEMO_INPUT.site}/`, headers: {}, html: HTML, ms: 1600, bytes: 188000, redirects: 0, robots: ROBOTS, sitemapFound: true, llms: null, httpUpgraded: true },
    ctx,
  );
  const speed = analyzeSpeed(PSI);
  const places = analyzePlaces({
    found: [place("Desert Peak Plumbing", 4.4, 87, { id: "ChIJsample-desert-peak", address: "Mesa, AZ 85201", website: `${DEMO_INPUT.site}/`, phone: "(480) 555-0142", photos: 4 })],
    comp: [place("Saguaro Pipe & Drain", 4.9, 1240), place("Red Mountain Rooter", 4.8, 912), place("Superstition Plumbing Co.", 4.7, 604), place("Gilbert Road Plumbing", 4.9, 388)],
    query: "Desert Peak Plumbing Mesa, AZ",
    competitorQuery: "plumber in Mesa, AZ",
    site: DEMO_INPUT.site,
    city: DEMO_INPUT.city,
  });
  const recommendations = [
    "Claim and complete Yelp and BBB listings with the same name, address and phone as the Google profile",
    "Add LocalBusiness schema and an FAQ about pricing, emergency service and areas served",
    "Grow Google reviews past 300 with an automated request after every job",
    "Allow PerplexityBot and GPTBot in robots.txt so the site can be read and cited",
    "Get listed in local roundups such as city guides and “best plumbers in Mesa” lists",
  ];
  const citationGaps = ["Yelp, where all four recommended plumbers have 100+ reviews", "BBB accredited business listings", "Local “best plumber in Mesa” roundups and city guides", "Reddit threads in r/mesa and r/phoenix"];
  const ai: AiResult = {
    question: "Who is the best plumber in Mesa, AZ?",
    answer: "For Mesa, the most consistently recommended plumbers are Saguaro Pipe & Drain and Red Mountain Rooter, both with hundreds of recent reviews, upfront pricing and 24/7 emergency service. Superstition Plumbing Co. is a strong choice for water heaters and repiping.",
    recommended: [
      { name: "Saguaro Pipe & Drain", reason: "1,200+ reviews, 24/7 service, upfront pricing" },
      { name: "Red Mountain Rooter", reason: "Fast emergency response, strong Yelp presence" },
      { name: "Superstition Plumbing Co.", reason: "Water heater and repipe specialists" },
      { name: "Gilbert Road Plumbing", reason: "Highly rated small team, fair quotes" },
    ],
    mentioned: false,
    position: null,
    brandSummary: "Desert Peak Plumbing has a Google profile with a 4.4 rating and a basic website. Little else about it appears on the web: no Yelp or BBB listing was found, and it is not mentioned in local roundups or Reddit threads.",
    sources: [],
    citationGaps,
    accuracyIssues: [],
    recommendations,
    findings: [
      {
        id: "ai-recommended",
        category: "ai",
        label: "Recommended by AI search",
        impact: "high",
        status: "fail",
        detail: "Asked “Who is the best plumber in Mesa, AZ?”, the AI answer recommends Saguaro Pipe & Drain, Red Mountain Rooter and Superstition Plumbing Co., and does not mention Desert Peak Plumbing.",
        fix: "Win citations on the sources AI engines lean on, add schema and an FAQ, and keep name, address and phone identical everywhere.",
        steps: recommendations,
        items: citationGaps.map((g) => `Missing from: ${g}`),
      },
    ],
  };
  const copy: CopyResult = {
    title: "Plumber in Mesa, AZ | Desert Peak Plumbing",
    metaDescription: "Family-owned plumber in Mesa, AZ since 2009. Drain cleaning, water heaters, leaks and repiping, with a clear price before work starts. Call (480) 555-0142.",
    h1: "Plumber in Mesa, AZ, family-owned since 2009",
    subheadline: "Same-day service across Mesa, Gilbert, Chandler, Tempe and Queen Creek, with a clear price before any work starts.",
    aboutParagraph: "Desert Peak Plumbing is a family-owned plumbing company serving Mesa and the East Valley since 2009. Our licensed plumbers handle drain cleaning, leak detection, water heater repair and replacement, tankless water heaters, repiping, slab leaks and gas lines for homes and small businesses. Most calls get a plumber the same day. You get a clear price before any work starts, and we stand behind every repair with a [warranty length] warranty. We serve Mesa, Gilbert, Chandler, Tempe and Queen Creek.",
    gbpDescription: "Desert Peak Plumbing is a family-owned plumber in Mesa, Arizona, serving homeowners and small businesses across the East Valley since 2009. We clear drains, find and fix leaks, repair and replace water heaters, install tankless water heaters, repipe homes, repair slab leaks and run gas lines. Most calls get a licensed plumber the same day, and you get a clear price before any work starts. We clean up when the job is done and stand behind every repair. Service area: Mesa, Gilbert, Chandler, Tempe and Queen Creek.",
    faqs: [
      { question: "How much does a plumber cost in Mesa?", answer: "Most repairs fall between [price range]. We give you a clear price before any work starts, so there are no surprises on the bill." },
      { question: "Do you offer same-day plumbing service?", answer: "Yes. Most calls in Mesa, Gilbert, Chandler, Tempe and Queen Creek get a plumber the same day." },
      { question: "What areas do you serve?", answer: "We serve Mesa, Gilbert, Chandler, Tempe and Queen Creek, and nearby parts of the East Valley." },
      { question: "Are your plumbers licensed and insured?", answer: "Yes. Every plumber on our team is licensed in Arizona (ROC [licence number]) and we carry full liability insurance." },
      { question: "Do you repair and replace water heaters?", answer: "Yes. We repair and replace tank and tankless water heaters, and can usually install a new one within [time frame]." },
      { question: "Can you fix a slab leak?", answer: "Yes. We locate slab leaks with detection equipment and repair or reroute the line, depending on what is least disruptive for your home." },
    ],
  };
  const socials: Partial<Record<Platform, SocialResult>> = {
    instagram: { platform: "instagram", handle: "desertpeakplumbing", url: "", state: "found", name: "Desert Peak Plumbing", bio: null, followers: 1180, posts: 64, note: null },
    facebook: { platform: "facebook", handle: "desertpeakplumbing", url: "", state: "found", name: "Desert Peak Plumbing", bio: null, followers: 2300, posts: null, note: null },
    tiktok: { platform: "tiktok", handle: "@desertpeakplumbing", url: "", state: "missing", name: null, bio: null, followers: null, posts: null, note: "TikTok says this account does not exist." },
  };
  return { site, speed, places, ai, copy, socials };
}
