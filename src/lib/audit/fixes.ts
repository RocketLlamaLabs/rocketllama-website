// Builders for the specific, copy-paste fixes in the audit. Pure functions:
// everything is written from what the audit found plus the business's name,
// city and service, so no network is involved.

import { type AuditContext, type Platform, profileUrl, titleCase } from "./shared";

export const PLACEHOLDER = (what: string) => `REPLACE WITH ${what.toUpperCase()}`;

/** schema.org type for the industry, falling back to LocalBusiness. */
export function schemaType(industry: string): string {
  const i = industry.toLowerCase();
  const map: [RegExp, string][] = [
    [/plumb/, "Plumber"],
    [/electric/, "Electrician"],
    [/hvac|heating|air cond|cooling|furnace/, "HVACBusiness"],
    [/roof/, "RoofingContractor"],
    [/paint/, "HousePainter"],
    [/locksmith/, "Locksmith"],
    [/move|moving/, "MovingCompany"],
    [/general contractor|remodel|construction|handyman/, "GeneralContractor"],
    [/dent/, "Dentist"],
    [/law|attorney|lawyer/, "Attorney"],
    [/restaurant|cafe|diner|pizza/, "Restaurant"],
    [/auto|mechanic|car repair/, "AutoRepair"],
    [/real estate|realtor/, "RealEstateAgent"],
    [/gym|fitness/, "ExerciseGym"],
    [/spa|salon|beauty/, "HealthAndBeautyBusiness"],
    [/account|cpa|bookkeep/, "AccountingService"],
    [/insur/, "InsuranceAgency"],
    [/vet/, "VeterinaryCare"],
    [/landscap|lawn|pest|garage|pool|clean|window|pressure wash|solar|floor/, "HomeAndConstructionBusiness"],
  ];
  return map.find(([re]) => re.test(i))?.[1] ?? "LocalBusiness";
}

const cityOnly = (city: string) => city.split(",")[0].trim();

/** "Plumber in Mesa, AZ | Desert Peak Plumbing", kept under 60 characters when possible. */
export function suggestTitle(ctx: AuditContext): string {
  const service = titleCase(ctx.industry || "");
  const options = [
    service && ctx.city ? `${service} in ${ctx.city} | ${ctx.name}` : null,
    service && ctx.city ? `${service} in ${cityOnly(ctx.city)} | ${ctx.name}` : null,
    service ? `${service} | ${ctx.name}` : null,
    ctx.city ? `${ctx.name} | ${ctx.city}` : null,
    ctx.name,
  ].filter((x): x is string => !!x);
  return options.find((t) => t.length <= 60) ?? options[options.length - 1];
}

export function suggestDescription(ctx: AuditContext, phone: string | null): string {
  const service = ctx.industry ? ctx.industry.toLowerCase() : "local service";
  const area = ctx.city ? ` serving ${ctx.city} and nearby areas` : "";
  const action = phone ? `Call ${phone} or book online today.` : "Book online today.";
  let d = `${ctx.name} is a trusted, licensed ${service}${area}. Fast response, upfront pricing and work done right. ${action}`;
  if (d.length > 160) d = `${ctx.name}: trusted ${service}${area}. Upfront pricing. ${action}`;
  return d.slice(0, 160);
}

export function suggestH1(ctx: AuditContext): string {
  const service = titleCase(ctx.industry || "");
  if (service && ctx.city) return `${service} in ${ctx.city} you can count on`;
  if (service) return `${service} you can count on`;
  return `${ctx.name}`;
}

export function telHref(phone: string): string {
  const digits = phone.replace(/[^\d+]/g, "");
  return digits.startsWith("+") ? digits : digits.length === 10 ? `+1${digits}` : `+${digits}`;
}

export function localBusinessJsonLd(
  ctx: AuditContext,
  site: { url: string; phone: string | null; logo: string | null; socials: Partial<Record<Platform, string>>; description: string | null },
): string {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": schemaType(ctx.industry),
    "@id": `${new URL(site.url).origin}/#business`,
    name: ctx.name,
    url: new URL(site.url).origin + "/",
    telephone: site.phone ?? PLACEHOLDER("main phone"),
    description: site.description ?? PLACEHOLDER("one-sentence description"),
    image: site.logo ?? PLACEHOLDER("logo or storefront image URL"),
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: PLACEHOLDER("street address"),
      addressLocality: ctx.city ? cityOnly(ctx.city) : PLACEHOLDER("city"),
      addressRegion: ctx.city.split(",")[1]?.trim() || PLACEHOLDER("state"),
      postalCode: PLACEHOLDER("ZIP code"),
      addressCountry: "US",
    },
    areaServed: ctx.city ? [cityOnly(ctx.city)] : [PLACEHOLDER("cities served")],
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "17:00" },
    ],
    sameAs: Object.entries(site.socials).map(([p, h]) => profileUrl(p as Platform, h as string)),
  };
  if (!(data.sameAs as string[]).length) data.sameAs = [PLACEHOLDER("Google, Facebook, Yelp and social profile URLs")];
  return `<script type="application/ld+json">\n${JSON.stringify(data, null, 2)}\n</script>`;
}

export function faqQuestions(ctx: AuditContext): string[] {
  const service = ctx.industry ? ctx.industry.toLowerCase() : "your service";
  const where = ctx.city ? ` in ${cityOnly(ctx.city)}` : "";
  return [
    `How much does a ${service} cost${where}?`,
    "Do you offer same-day or emergency service?",
    `What areas do you serve${ctx.city ? ` around ${cityOnly(ctx.city)}` : ""}?`,
    "Are you licensed and insured?",
    "Do you give free estimates?",
    "How soon can you come out?",
    "Do you offer financing?",
    "What warranty or guarantee do you offer?",
  ];
}

export function faqJsonLd(questions: string[]): string {
  return `<script type="application/ld+json">\n${JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: questions.slice(0, 3).map((q) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: PLACEHOLDER("a two or three sentence answer") } })),
    },
    null,
    2,
  )}\n</script>`;
}

export const AI_SEARCH_BOTS = ["OAI-SearchBot", "ChatGPT-User", "GPTBot", "Claude-SearchBot", "ClaudeBot", "Claude-User", "PerplexityBot", "Perplexity-User", "Google-Extended", "Applebot-Extended", "Bingbot"];

export function robotsAllowBlock(origin: string, sitemap: string | null): string {
  const lines = AI_SEARCH_BOTS.map((b) => `User-agent: ${b}\nAllow: /`).join("\n\n");
  return `# Let search and AI answer engines read the site\n${lines}\n\nUser-agent: *\nAllow: /\n\nSitemap: ${sitemap ?? `${origin}/sitemap.xml`}`;
}

export function llmsTxt(ctx: AuditContext, site: { url: string; phone: string | null; description: string | null; pages: { title: string; url: string }[] }): string {
  const service = ctx.industry ? ctx.industry.toLowerCase() : "local business";
  const pages = site.pages.length ? site.pages.map((p) => `- [${p.title}](${p.url})`).join("\n") : `- [Home](${site.url})`;
  return `# ${ctx.name}

> ${site.description ?? `${ctx.name} is a ${service}${ctx.city ? ` serving ${ctx.city}` : ""}.`}

## Contact
- Phone: ${site.phone ?? PLACEHOLDER("phone")}
- Website: ${new URL(site.url).origin}
- Service area: ${ctx.city || PLACEHOLDER("cities served")}
- Hours: ${PLACEHOLDER("opening hours")}

## Services
- ${PLACEHOLDER("service one, with a one-line description")}
- ${PLACEHOLDER("service two")}
- ${PLACEHOLDER("service three")}

## Key pages
${pages}
`;
}

export function ogTags(title: string, description: string, url: string): string {
  return `<meta property="og:type" content="website">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${new URL(url).origin}/og-image.jpg">  <!-- 1200 x 630 photo of the team or a finished job -->
<meta name="twitter:card" content="summary_large_image">`;
}

export function footerNap(ctx: AuditContext, phone: string | null): string {
  const tel = phone ? `<a href="tel:${telHref(phone)}">${phone}</a>` : PLACEHOLDER("phone");
  return `<address>
  <strong>${ctx.name}</strong><br>
  ${PLACEHOLDER("street address")}<br>
  ${ctx.city || PLACEHOLDER("city, state")} ${PLACEHOLDER("ZIP")}<br>
  ${tel}<br>
  Serving ${ctx.city ? cityOnly(ctx.city) : PLACEHOLDER("city")} and nearby areas
</address>`;
}

/** Install steps and snippets for the tracking tags. */
export const TRACKER_FIX: Record<string, { steps: string[]; snippet?: string }> = {
  ga4: {
    steps: [
      "At analytics.google.com create a GA4 property and a Web data stream for the site. Copy the Measurement ID (G-…).",
      "Paste the tag below into the <head> of every page, or add it as a Google tag in Tag Manager.",
      "In Admin → Events, mark form_submit, phone-link clicks and bookings as key events.",
      "Link GA4 to Google Ads and Search Console so search and ad data land in one place.",
    ],
    snippet: `<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>`,
  },
  gtm: {
    steps: ["Create a container at tagmanager.google.com.", "Paste its two snippets: one high in <head>, one right after <body>.", "Move GA4, Google Ads and Meta tags into the container so they can be changed without a developer."],
  },
  gads: {
    steps: [
      "In Google Ads go to Goals → Conversions → New conversion action → Website.",
      "Create three actions: form submissions, clicks on the phone number, and calls from ads (Google forwarding number).",
      "Install the Google tag (AW-…) site-wide and fire each conversion event, or import the GA4 key events instead.",
      "Set the primary conversions as the bidding goal so Smart Bidding pays for leads, not clicks.",
    ],
    snippet: `<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-XXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'AW-XXXXXXXXX');
</script>
<!-- On the thank-you page or form success -->
<script>gtag('event', 'conversion', {'send_to': 'AW-XXXXXXXXX/XXXXXXXXXXXXXX'});</script>`,
  },
  meta: {
    steps: [
      "In Meta Events Manager, create a dataset (pixel) for the business.",
      "Install the base code below on every page, or use the Meta partner integration for the site builder.",
      "Fire a Lead event on form success and a Contact event on phone clicks.",
      "Turn on the Conversions API (server-side) so iPhone and ad-blocker traffic is still counted.",
    ],
    snippet: `<script>
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init', 'YOUR_PIXEL_ID');
fbq('track', 'PageView');
</script>
<!-- On form success -->
<script>fbq('track', 'Lead');</script>`,
  },
  tiktok: { steps: ["Create a pixel in TikTok Ads Manager → Assets → Events.", "Install it through Tag Manager and fire SubmitForm on leads."] },
  linkedin: { steps: ["Create the Insight Tag in LinkedIn Campaign Manager → Analyze → Insight Tag.", "Install it through Tag Manager and add a lead conversion."] },
  bing: { steps: ["Create a UET tag in Microsoft Advertising → Tools → UET tag.", "Install it through Tag Manager, or import the Google Ads campaigns and conversions directly."] },
};
