import type { Metadata } from "next";
import { ORG, SITE } from "@/components/v7/about-seo";

// Metadata and structured data for the version 7 home page. Search engines
// and AI assistants read this; visitors never see it. Everything stated here
// also appears in the page copy, and fields we do not have yet (street
// address, phone, social profiles, reviews) are left out rather than guessed.

const TITLE = "Home Services Marketing in Phoenix | Rocket Llama Labs";
const DESCRIPTION =
  "Phoenix marketing and technology for HVAC, plumbing, electrical, roofing and other home service companies. Every lead answered in under a minute.";

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
  alternates: { canonical: `${SITE}/` },
  openGraph: {
    type: "website",
    url: `${SITE}/`,
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

// Shown on the home page under "Questions" and repeated as FAQ structured data. Keep the two in step.
export const HOME_FAQ: [string, string][] = [
  ["What does it cost?", "Every company is quoted on its own. On the first call we write a marketing plan for your company with a number on it. You see the plan before you pay for anything, and you keep it either way."],
  ["Do I own the website, the data and the ad accounts?", "Yes. The website code, the data, the phone numbers and the ad accounts are all in your name. If you ever leave, you take everything with you."],
  ["Is there a contract?", "No. Everything is month to month. Turn the budget up in busy months and down in slow ones."],
  ["How fast are leads answered?", "Every new lead gets a text and an email in under a minute, in your voice. If you cannot pick up, the AI receptionist answers the call and books the job or takes a message."],
  ["What trades do you work with?", "HVAC, plumbing, electrical, roofing, garage door, pest control, landscaping, painting and every other trade that goes to a customer's home."],
  ["Do you work outside Phoenix?", "Yes. We start in your service area and expand city by city. The team is based in Phoenix, Arizona, and everything is run remotely."],
  ["Is Rocket Llama Labs a marketing agency or a lead generation company?", "Both, and more. We are a home services marketing agency that builds and runs the whole system: the website, local SEO and AI search, Google Ads and Local Services Ads, review management, call tracking, the AI receptionist and the CRM. The leads it produces come from your own site and your own ads, so they are exclusive to you and never resold."],
  ["What does local SEO for a home service company involve?", "Service pages per service and per city, a Google Business Profile that is kept current, reviews on every page, and the schema that lets Google and AI search engines like ChatGPT and Gemini read your site and recommend you. We do all of it as part of the system."],
  ["How do you track return on marketing spend?", "Every phone number is tracked to its source, every form and call lands in the CRM, and every closed job is recorded with its value. The dashboard shows what each dollar of ad spend brought back in booked, paid work, not clicks or impressions."],
];

export function HomeFaq() {
  return (
    <section id="faq"><div className="wrap">
      <p className="kicker">Questions</p>
      <h2>The things every owner asks.</h2>
      <div className="faq">
        {HOME_FAQ.map(([q, a]) => (<details key={q}><summary>{q}</summary><p>{a}</p></details>))}
      </div>
    </div></section>
  );
}

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
        "@type": "FAQPage",
        "@id": `${SITE}/#faq`,
        mainEntity: HOME_FAQ.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
      },
      {
        "@type": "WebPage",
        "@id": `${SITE}/#webpage`,
        url: `${SITE}/`,
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
