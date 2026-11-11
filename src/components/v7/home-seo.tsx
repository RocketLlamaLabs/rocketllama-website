import type { Metadata } from "next";
import { ORG, SITE } from "@/components/v7/about-seo";

// Metadata and structured data for the version 7 home page. Search engines
// and AI assistants read this; visitors never see it. Everything stated here
// also appears in the page copy, and fields we do not have yet (street
// address, phone, social profiles, reviews) are left out rather than guessed.

const TITLE = "Home Services Marketing in Phoenix | Rocket Llama Labs";
const DESCRIPTION =
  "Rocket Llama Labs builds and runs the whole marketing system for HVAC, plumbing, electrical, roofing and other home service companies in Phoenix: website, Google and AI search, ads, reviews, phones, AI receptionist and CRM. Every lead answered in under a minute, every dollar tracked to a paid job.";

export const HOME_META: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: [
    "home services marketing",
    "HVAC marketing Phoenix",
    "plumber marketing Phoenix",
    "electrician marketing",
    "roofing marketing",
    "local SEO Phoenix",
    "AI search optimization",
    "Google Business Profile management",
    "Google Local Services Ads",
    "AI receptionist for contractors",
    "CRM for home service companies",
    "Rocket Llama Labs",
  ],
  alternates: { canonical: `${SITE}/v7` },
  openGraph: {
    type: "website",
    url: `${SITE}/v7`,
    siteName: "Rocket Llama Labs",
    locale: "en_US",
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: `${SITE}/v7/og.png`, width: 1200, height: 630, alt: "Rocket Llama Labs: marketing and technology for home services" }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [`${SITE}/v7/og.png`] },
};

// The pieces of the system, as named on the home page and the Services page.
const SERVICES: [string, string][] = [
  ["Website design and hosting for home service companies", "A website you own, hosted free, with service pages per service and per city, reviews on every page and fast load on a phone."],
  ["Local SEO and AI search optimization", "Ranking in Google search and in AI search (ChatGPT, Gemini, Perplexity), with the schema and content an AI can read."],
  ["Google Business Profile management", "Your profile kept current, with reviews and stars worked hard."],
  ["Google Ads and Local Services Ads", "Search and Local Services ads run in your name, on your own accounts, with the budget turned up in busy months and down in slow ones."],
  ["Facebook and Instagram ads", "Lead-form ads on Meta, on your own accounts."],
  ["Review management", "Review requests after every job, every review answered, and reviews cross-referenced with your jobs."],
  ["Phone system with call tracking and AI receptionist", "Tracked phone numbers per source, an AI voice attendant that answers, transfers to you, and books or takes a message when you cannot pick up."],
  ["CRM with AI follow-up", "Every lead gets a text and an email in under a minute, pipelines, booking, closed-job value and a return-on-spend dashboard."],
];

const TRADES = ["HVAC", "Plumbing", "Electrical", "Roofing", "Garage door", "Pest control", "Landscaping", "Painting", "Window and pressure washing", "Handyman", "Mobile mechanic", "Windows and doors", "Solar", "Flooring", "Remodeling"];

export function HomeStructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        ...ORG,
        "@type": ["Organization", "ProfessionalService"],
        slogan: "Marketing and technology for home services",
        serviceType: SERVICES.map(([name]) => name),
        audience: { "@type": "BusinessAudience", audienceType: "Home service companies", name: TRADES.join(", ") },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "The Rocket Llama Labs marketing system",
          itemListElement: SERVICES.map(([name, description]) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name, description, provider: { "@id": `${SITE}/#organization` }, areaServed: ORG.areaServed },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE}/#website`,
        url: SITE,
        name: "Rocket Llama Labs",
        description: DESCRIPTION,
        publisher: { "@id": `${SITE}/#organization` },
        inLanguage: "en-US",
      },
      {
        "@type": "WebPage",
        "@id": `${SITE}/v7#webpage`,
        url: `${SITE}/v7`,
        name: TITLE,
        description: DESCRIPTION,
        isPartOf: { "@id": `${SITE}/#website` },
        about: { "@id": `${SITE}/#organization` },
        primaryImageOfPage: { "@type": "ImageObject", url: `${SITE}/v7/og.png`, width: 1200, height: 630 },
        inLanguage: "en-US",
      },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
