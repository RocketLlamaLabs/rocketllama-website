import type { Metadata } from "next";
import { ORG, PEOPLE, SITE } from "@/components/v7/about-seo";
import { type Industry, INDUSTRY_AUTHOR, INDUSTRY_PUBLISHED, INDUSTRY_UPDATED } from "@/components/v7/industries-data";

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
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
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
  const path = "/services";
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
          contentUrl: `${SITE}/v7/video/rocket-llama-overview.mp4`,
          uploadDate: "2026-11-06",
          duration: "PT1M2S",
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

// Each trade has its own page; the slug is the trade name in lowercase with hyphens.
const TRADE_SLUGS: Record<string, string> = Object.fromEntries(TRADE_COPY.map(([name]) => [name, name.toLowerCase().replace(/ /g, "-")]));

export function IndustriesStructuredData() {
  const path = "/industries";
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
            item: { "@type": "Service", name: `${name} marketing`, description, url: `${SITE}/${TRADE_SLUGS[name]}`, provider: { "@id": `${SITE}/#organization` }, areaServed: ORG.areaServed },
          })),
        },
      ]}
    />
  );
}

export function PageStructuredData({ path, name, description }: { path: string; name: string; description: string }) {
  return <Script graph={[breadcrumbs(path, name), webPage(path, `${name} | Rocket Llama Labs`, description)]} />;
}

// Metadata for an industry page (/hvac, /plumbing, ...): its own title tag,
// description and social image, taken from the page's banner photo.
export function industryMeta(ind: Industry): Metadata {
  const meta = pageMeta(`/${ind.slug}`, ind.title, ind.description);
  const image = { url: `${SITE}/v7/img/${ind.image.stem}-1280.webp`, width: 1280, height: 720, alt: ind.image.alt };
  return {
    ...meta,
    authors: [{ name: INDUSTRY_AUTHOR.name, url: `${SITE}/about#${INDUSTRY_AUTHOR.id}` }],
    openGraph: { ...meta.openGraph, images: [image] },
    twitter: { ...meta.twitter, images: [image.url] },
  };
}

// Structured data for an industry page: where it sits in the site, who wrote it
// and when, the service it describes, where that service is offered, and the
// page's questions and answers. Every value is also in the visible page.
export function IndustryStructuredData({ ind }: { ind: Industry }) {
  const path = `/${ind.slug}`;
  const url = `${SITE}${path}`;
  const authorId = `${SITE}/about#${INDUSTRY_AUTHOR.id}`;
  const author = PEOPLE.find((p) => p["@id"] === authorId);
  return (
    <Script
      graph={[
        ORG,
        ...(author ? [author] : []),
        {
          "@type": "BreadcrumbList",
          "@id": `${url}#breadcrumb`,
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
            { "@type": "ListItem", position: 2, name: "Industries", item: `${SITE}/industries` },
            { "@type": "ListItem", position: 3, name: `${ind.name} marketing`, item: url },
          ],
        },
        webPage(path, `${ind.title} | Rocket Llama Labs`, ind.description, {
          author: { "@id": authorId },
          publisher: { "@id": `${SITE}/#organization` },
          datePublished: INDUSTRY_PUBLISHED,
          dateModified: INDUSTRY_UPDATED,
          breadcrumb: { "@id": `${url}#breadcrumb` },
          mainEntity: { "@id": `${url}#service` },
          primaryImageOfPage: { "@type": "ImageObject", "@id": `${url}#image`, url: `${SITE}/v7/img/${ind.image.stem}-1920.webp`, width: 1920, height: 1080, caption: ind.image.alt },
          speakable: { "@type": "SpeakableSpecification", cssSelector: ["#summary .answer"] },
        }),
        {
          "@type": "Service",
          "@id": `${url}#service`,
          name: `${ind.name} marketing services`,
          serviceType: `${ind.name} marketing`,
          url,
          description: ind.summary,
          image: { "@id": `${url}#image` },
          provider: { "@id": `${SITE}/#organization` },
          areaServed: ORG.areaServed,
          audience: { "@type": "BusinessAudience", audienceType: ind.audience },
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: ind.servicesHeading,
            itemListElement: ind.services.map(([label, heading, copy]) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: `${label}: ${heading}`, description: copy },
            })),
          },
        },
        {
          "@type": "FAQPage",
          "@id": `${url}#faq`,
          mainEntity: ind.faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
        },
      ]}
    />
  );
}
