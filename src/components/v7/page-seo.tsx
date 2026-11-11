import type { Metadata } from "next";
import { ORG, SITE } from "@/components/v7/about-seo";

// Metadata and structured data for the version 7 subpages. Search engines and
// AI assistants read this; visitors never see it. Facts here also appear in
// the page copy, and fields we do not have yet are left out rather than guessed.

const OG_IMAGE = { url: `${SITE}/v7/og.png`, width: 1200, height: 630, alt: "Rocket Llama Labs: marketing and technology for home services" };

// Full metadata for a subpage: title, description, canonical, Open Graph and Twitter.
export function pageMeta(path: string, title: string, description: string, opts: { noindex?: boolean } = {}): Metadata {
  const url = `${SITE}${path}`;
  const full = `${title} | Rocket Llama Labs`;
  return {
    title: { absolute: full },
    description,
    alternates: { canonical: url },
    openGraph: { type: "website", url, siteName: "Rocket Llama Labs", locale: "en_US", title: full, description, images: [OG_IMAGE] },
    twitter: { card: "summary_large_image", title: full, description, images: [OG_IMAGE.url] },
    ...(opts.noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

function breadcrumbs(path: string, name: string) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${SITE}${path}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/v7` },
      { "@type": "ListItem", position: 2, name, item: `${SITE}${path}` },
    ],
  };
}

function webPage(path: string, name: string, description: string, extra: Record<string, unknown> = {}) {
  return {
    "@type": "WebPage",
    "@id": `${SITE}${path}#webpage`,
    url: `${SITE}${path}`,
    name,
    description,
    isPartOf: { "@id": `${SITE}/#website` },
    about: { "@id": `${SITE}/#organization` },
    inLanguage: "en-US",
    ...extra,
  };
}

function Script({ graph }: { graph: unknown[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }) }} />;
}

// The eight pieces of the system, as laid out on the Services page.
export const SERVICE_ITEMS: [string, string][] = [
  ["Website design and hosting for home service companies", "A website you own, hosted free. Service pages per service and per city, reviews and stars on every page, and fast load on a phone in a driveway."],
  ["Local SEO and AI search optimization", "Schema and content that Google, ChatGPT, Gemini and Perplexity can read, so your company is found and recommended where homeowners look now."],
  ["Google Business Profile management", "Your profile kept current, with reviews, photos and services worked hard for maps and local search."],
  ["Funnels", "Qualifying questions, address autofill, your offer and your reviews, then a booking calendar or a call-back button. 20% to 30% conversion against a 5% average."],
  ["Phone system with call tracking and AI receptionist", "Tracked numbers per source on a Tier 1 carrier. The AI answers, transfers to you, and books the job or takes a message if you cannot pick up."],
  ["CRM with AI follow-up", "Text and email reply in under a minute, pipelines, booking, closed-job value, and the return-on-spend dashboard."],
  ["Google, Local Services, and Meta ads in your name", "Your accounts and your card with our management. Budget up in busy months, budget down in slow ones. Never a contract."],
  ["Review management", "Review requests after every job, every review answered, and reviews cross-referenced with your jobs."],
];

export function ServicesStructuredData() {
  const path = "/v7/services";
  return (
    <Script
      graph={[
        breadcrumbs(path, "Services"),
        webPage(path, "Services | Rocket Llama Labs", "Every piece of the Rocket Llama Labs marketing system for home service companies, and how they fit together."),
        {
          "@type": "VideoObject",
          "@id": `${SITE}${path}#video`,
          name: "The Rocket Llama Labs overview",
          description: "The three ways good companies lose jobs, what we build instead, and how the money is tracked. Under 90 seconds.",
          thumbnailUrl: `${SITE}/v7/video-poster.png`,
          contentUrl: `${SITE}/v7/video/rocket-llama-full.mp4`,
          uploadDate: "2026-11-06",
          duration: "PT1M20S",
          publisher: { "@id": `${SITE}/#organization` },
        },
        {
          "@type": "ItemList",
          "@id": `${SITE}${path}#services`,
          name: "The Rocket Llama Labs marketing system",
          itemListElement: SERVICE_ITEMS.map(([name, description], i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: { "@type": "Service", name, description, provider: { "@id": `${SITE}/#organization` }, areaServed: ORG.areaServed, audience: { "@type": "BusinessAudience", audienceType: "Home service companies" } },
          })),
        },
      ]}
    />
  );
}

// The trades, each with a line of copy. Shown on the Industries page and repeated as structured data.
export const TRADE_COPY: [string, string][] = [
  ["HVAC", "When the AC dies in July, the first company to answer gets the job. Every call answered in under a minute, even when your techs are on a roof."],
  ["Plumbing", "A burst line does not wait for office hours. Tracked numbers, an AI receptionist that books the emergency, and service pages per city."],
  ["Electrical", "Panel upgrades, EV chargers and repairs. Reviews on every page and a Google Business Profile that puts you on the map."],
  ["Roofing", "Storm season means a flood of calls in one week. A funnel that qualifies the homeowner and books the inspection before the competition calls back."],
  ["Garage door", "A stuck door is a same-day job. Local Services Ads and a phone system that gets you the call first."],
  ["Pest control", "Recurring plans need recurring customers. A CRM that follows up, re-books and asks for the review."],
  ["Landscaping", "Seasonal demand, repeat clients and big-ticket installs. Ads that turn up in spring and down in summer, with every dollar tracked."],
  ["Painting", "Estimates that turn into booked jobs. Address autofill, your offer and your reviews, then a calendar."],
  ["Window and pressure washing", "High-volume, low-ticket work that lives on reviews and repeat customers."],
  ["Handyman", "Many small jobs from one neighborhood. A site that ranks for every service you offer, per city."],
  ["Mobile mechanic", "Customers who search once and call the first number that answers."],
  ["Windows and doors", "Long sales cycles and big tickets. A funnel that captures the lead and a CRM that keeps it warm."],
  ["Solar", "Expensive leads and long decisions. Exclusive leads from your own site and ads, tracked to the signed contract."],
  ["Flooring", "Showroom traffic starts online. Reviews, photos and a booking calendar for the in-home measure."],
  ["Remodeling", "Projects worth tens of thousands. A site built for the searches homeowners make before they call anyone."],
];

export function IndustriesStructuredData() {
  const path = "/v7/industries";
  return (
    <Script
      graph={[
        breadcrumbs(path, "Industries"),
        webPage(path, "Industries | Rocket Llama Labs", "Home services marketing for HVAC, plumbing, electrical, roofing, garage door, pest control, landscaping, painting and every trade that goes to a customer's home."),
        {
          "@type": "ItemList",
          "@id": `${SITE}${path}#trades`,
          name: "Trades Rocket Llama Labs works with",
          itemListElement: TRADE_COPY.map(([name, description], i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: { "@type": "Service", name: `${name} marketing`, description, provider: { "@id": `${SITE}/#organization` }, areaServed: ORG.areaServed },
          })),
        },
      ]}
    />
  );
}

export function PageStructuredData({ path, name, description }: { path: string; name: string; description: string }) {
  return <Script graph={[breadcrumbs(path, name), webPage(path, `${name} | Rocket Llama Labs`, description)]} />;
}
