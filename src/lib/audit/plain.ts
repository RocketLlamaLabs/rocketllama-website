import type { Finding, Impact } from "./shared";

// Plain-English wording for the report: what the problem is, in words a
// business owner uses, and one sentence on why it costs them customers.
// The technical check name stays on the finding as `label`.

type Plain = { problem: string; why: string };

const PLAIN: Record<string, Plain> = {
  // Website and conversion
  https: { problem: "Site isn't secure", why: "Browsers show “Not secure” next to the address, and many visitors leave." },
  "http-redirect": { problem: "The old insecure address still loads", why: "Some visitors and links land on the “Not secure” version." },
  viewport: { problem: "Site isn't built for phones", why: "Most visitors are on a phone and see a tiny desktop page." },
  "click-to-call": { problem: "Phone number can't be tapped to call", why: "Phone visitors have to copy the number by hand, and many won't." },
  "lead-form": { problem: "No quote or contact form", why: "People who won't call have no way to reach out." },
  cta: { problem: "No clear “book” or “get a quote” button", why: "Visitors aren't told what to do next, so they leave." },
  "social-proof": { problem: "No reviews shown on the website", why: "Reviews are the main reason a stranger trusts a business." },
  freshness: { problem: "Site looks out of date", why: "An old date in the footer makes people wonder if the business is still open." },
  "psi-a11y": { problem: "Hard to use for some visitors", why: "Low contrast and unlabelled buttons lose customers and add legal risk." },
  chat: { problem: "No chat or text-us option", why: "Many people prefer to text, especially after hours." },
  // Search engines
  title: { problem: "Google title doesn't say what you do and where", why: "The title is the blue link in Google results. It decides the click." },
  "meta-description": { problem: "Google description is missing or weak", why: "This is the grey text under the link in Google. Without it, Google picks random text." },
  h1: { problem: "Main headline is missing or unclear", why: "Google and visitors both read it first to understand the page." },
  headings: { problem: "Page isn't split into clear sections", why: "Sections help Google understand each service and help visitors scan." },
  "content-depth": { problem: "Not enough text for Google to rank", why: "Thin pages rarely rank for “service in city” searches." },
  canonical: { problem: "Missing duplicate-page protection", why: "Google can split ranking power across copies of the same page." },
  noindex: { problem: "Homepage is hidden from Google", why: "A setting tells Google not to show the site at all." },
  "alt-text": { problem: "Images have no descriptions", why: "Google, AI tools and screen readers can't tell what the photos show." },
  "robots-txt": { problem: "No robots.txt file", why: "Search engines get no instructions or sitemap location." },
  sitemap: { problem: "No sitemap for Google", why: "New and deep pages are found slowly or not at all." },
  "open-graph": { problem: "Shared links show a blank preview", why: "Links sent by text or posted on social look broken and get fewer clicks." },
  lang: { problem: "Page language isn't set", why: "A small signal search engines and screen readers use." },
  "psi-seo": { problem: "Google's basic SEO checks fail", why: "Each failed check is a small ranking leak." },
  "search-crawlers": { problem: "Google and Bing are blocked", why: "The site cannot appear in search results." },
  // AI answer engines
  schema: { problem: "AI and Google can't read the business details", why: "Without this code, ChatGPT and Google have to guess the name, services, area and hours." },
  "schema-depth": { problem: "Business details for AI are incomplete", why: "Missing address, hours or rating means AI tools leave the business out." },
  faq: { problem: "No FAQ for AI to quote", why: "AI assistants quote pages that answer the exact question a customer asked." },
  "ai-crawlers": { problem: "AI search bots are blocked", why: "ChatGPT and Perplexity can't read the site, so they can't recommend it." },
  "llms-txt": { problem: "No summary file for AI tools", why: "A short file that hands AI models the key facts about the business." },
  "server-rendered": { problem: "Page is invisible to AI crawlers", why: "The text only appears after code runs, and most AI crawlers don't run it." },
  nap: { problem: "Address or phone missing from the page", why: "AI tools and Google match the business across the web by name, address and phone." },
  "ai-recommended": { problem: "AI search recommends competitors instead", why: "More customers now ask ChatGPT or Google's AI who to hire. It names someone else." },
  "ai-accuracy": { problem: "Business details conflict across the web", why: "AI tools trust businesses less when their phone, address or hours disagree." },
  // Speed
  "psi-performance": { problem: "Site is slow on phones", why: "Each extra second of loading loses visitors before they see anything." },
  lcp: { problem: "Main content takes too long to appear", why: "Visitors stare at a blank or half-loaded screen. Google measures this for ranking." },
  inp: { problem: "Page is slow to respond to taps", why: "Buttons feel broken, so people tap away. Google measures this for ranking." },
  cls: { problem: "Page jumps around while loading", why: "People tap the wrong thing and get frustrated. Google measures this for ranking." },
  "response-time": { problem: "Server is slow to respond", why: "Everything else waits on it." },
  // Google profile and reviews
  gbp: { problem: "Google Business Profile missing or closed", why: "The map listing is the biggest source of local calls." },
  rating: { problem: "Star rating is below the competition", why: "People compare stars side by side on the map and pick the higher one." },
  "review-count": { problem: "Far fewer reviews than competitors", why: "Review count is one of the top factors for ranking on the map." },
  "gbp-hours": { problem: "No hours on the Google profile", why: "Google and AI tools show “hours unknown”, and people call someone else." },
  "gbp-photos": { problem: "Too few photos on the Google profile", why: "Profiles with real photos get more calls and direction requests." },
  "gbp-website": { problem: "Google profile isn't linked to the website", why: "Map visitors can't reach the site, and the traffic can't be tracked." },
  "gbp-phone": { problem: "No phone number on the Google profile", why: "The “Call” button is the most-used button on a map listing." },
  // Social
  "social-links": { problem: "Social profiles aren't linked from the website", why: "Google and AI tools use these links to connect the profiles to the business." },
  "social-presence": { problem: "Too few active social profiles", why: "Customers check social pages to see if a business is real and active." },
  // Ads and tracking
  "track-ga4": { problem: "No Google Analytics", why: "There's no record of how many people visit or where they come from." },
  "track-gads": { problem: "Google Ads can't see which clicks become leads", why: "Ad money gets spent on clicks that never call." },
  "track-meta": { problem: "No Facebook and Instagram tracking (Meta Pixel)", why: "Facebook and Instagram ads can't find more people like your customers." },
  "track-gtm": { problem: "No Google Tag Manager", why: "Every tracking change needs a developer." },
  "call-tracking": { problem: "Phone calls aren't tracked to their source", why: "You can't tell which ads, searches or posts make the phone ring." },
  // Checked by hand
  "sc-frequency": { problem: "Not posting at least three times a week", why: "Quiet profiles look like a closed business." },
  "sc-video": { problem: "No short videos", why: "Short video gets the most reach on every platform." },
  "sc-brand": { problem: "Profiles don't match each other", why: "Mismatched names and logos look unprofessional and confuse search engines." },
  "sc-engage": { problem: "Slow to reply to comments and messages", why: "Unanswered messages are lost jobs." },
  "sc-proof": { problem: "Posts use stock images, not real work", why: "Real job photos build trust. Stock images don't." },
  "ad-meta": { problem: "Not running Facebook or Instagram ads", why: "Competitors who run them get seen first by local homeowners." },
  "ad-google": { problem: "Not running Google ads", why: "Ads and Local Services Ads sit above the free results for high-intent searches." },
  "ad-offer": { problem: "Ads have no clear offer", why: "Vague ads get scrolled past." },
  "ad-landing": { problem: "Ads send people to the homepage", why: "A matching landing page usually converts two to three times better." },
  "ad-conversions": { problem: "Ad accounts don't count leads", why: "Without it, the ads optimise for clicks, not customers." },
  "ad-retarget": { problem: "No retargeting", why: "Most visitors don't act on the first visit. Retargeting brings them back." },
  "ld-speed": { problem: "Slow to reply to new leads", why: "Leads answered within five minutes are far more likely to book." },
  "ld-answer": { problem: "Calls go to voicemail", why: "Most callers who reach voicemail call the next business instead." },
  "ld-afterhours": { problem: "No reply to after-hours leads", why: "Evening and weekend leads go to whoever answers first." },
  "ld-crm": { problem: "Leads aren't tracked in a CRM", why: "Quotes that weren't closed are never followed up." },
  "ld-email": { problem: "No emails to past customers", why: "Past customers are the cheapest source of repeat work and referrals." },
  "lc-ask": { problem: "Not asking every customer for a review", why: "Reviews only come in steadily when every customer is asked." },
  "lc-reply": { problem: "Not replying to Google reviews", why: "Replies show future customers that the business cares." },
  "lc-posts": { problem: "No updates on the Google profile", why: "An active profile signals to Google that the business is open and busy." },
};

const SOCIAL_NAMES: Record<string, string> = { instagram: "Instagram", facebook: "Facebook", tiktok: "TikTok", youtube: "YouTube", linkedin: "LinkedIn", x: "X" };

export function plain(f: Finding): Plain {
  const known = PLAIN[f.id];
  if (known) return known;
  if (f.id.startsWith("social-")) {
    const name = SOCIAL_NAMES[f.id.slice(7)] ?? "Social";
    return { problem: `${name} profile missing or broken`, why: "Customers look for the business there and find nothing." };
  }
  if (f.id.startsWith("track-")) return { problem: `${f.label} not installed`, why: "Ad results on that platform can't be measured." };
  return { problem: f.label, why: "" };
}

export type Grade = { word: "Good" | "Needs work" | "Poor"; tone: "good" | "mid" | "bad" };

export function grade(score: number): Grade {
  if (score >= 80) return { word: "Good", tone: "good" };
  if (score >= 50) return { word: "Needs work", tone: "mid" };
  return { word: "Poor", tone: "bad" };
}

/** Which fix group a problem falls into. */
export function urgency(f: Finding): "now" | "next" | "later" {
  const order: Record<Impact, "now" | "next" | "later"> = { high: "now", medium: "next", low: "later" };
  return order[f.impact];
}
