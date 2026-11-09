// Structured data for the About page: the organization, the three people, and a
// short FAQ. Search engines and AI assistants read this, visitors never see it.
// Facts here must stay in step with the copy on the page. Fields we do not have
// yet (street address, phone, social profiles) are left out rather than guessed.

const SITE = "https://rocketllamalabs.com";

const ORG = {
  "@type": "Organization",
  "@id": `${SITE}/#organization`,
  name: "Rocket Llama Labs",
  legalName: "Rocket Llama Labs LLC",
  url: SITE,
  logo: `${SITE}/brand/logo-nav.svg`,
  email: "info@rocketllamalabs.com",
  description:
    "A Phoenix, Arizona marketing and technology company that builds and runs the whole marketing system for home service companies: website, search and AI search, Google Business Profile, ads, reviews, phones, AI receptionist and CRM, with every lead answered in under a minute and every dollar tracked to a paid job.",
  address: { "@type": "PostalAddress", addressLocality: "Phoenix", addressRegion: "AZ", addressCountry: "US" },
  areaServed: [
    { "@type": "City", name: "Phoenix" }, { "@type": "City", name: "Scottsdale" }, { "@type": "City", name: "Mesa" },
    { "@type": "City", name: "Chandler" }, { "@type": "City", name: "Gilbert" }, { "@type": "City", name: "Glendale" },
    { "@type": "City", name: "Tempe" }, { "@type": "City", name: "Peoria" }, { "@type": "State", name: "Arizona" },
  ],
  knowsAbout: [
    "Local SEO", "AI search optimization", "Google Business Profile", "Google Ads", "Google Local Services Ads",
    "Review management", "Call tracking", "AI voice attendant", "CRM for home services", "Website design for contractors",
    "HVAC marketing", "Plumbing marketing", "Electrician marketing", "Roofing marketing", "Garage door marketing",
    "Pest control marketing", "Landscaping marketing", "Painting marketing",
  ],
  founder: [{ "@id": `${SITE}/v7/about#brian-greenberg` }, { "@id": `${SITE}/v7/about#branson-cobb` }],
  employee: [
    { "@id": `${SITE}/v7/about#brian-greenberg` },
    { "@id": `${SITE}/v7/about#branson-cobb` },
    { "@id": `${SITE}/v7/about#madison-schantz` },
  ],
};

const PEOPLE = [
  {
    "@type": "Person",
    "@id": `${SITE}/v7/about#brian-greenberg`,
    name: "Brian Greenberg",
    jobTitle: "CEO",
    worksFor: { "@id": `${SITE}/#organization` },
    image: `${SITE}/v7/brian-greenberg.jpg`,
    url: `${SITE}/v7/about#brian-greenberg`,
    sameAs: ["https://briangreenberg.com"],
    description:
      "Entrepreneur and author with more than twenty years building businesses that get found online. Built True Blue Life Insurance into a fully digital agency selling in all 50 states with over $50 million in revenue through inbound marketing; Million Dollar Round Table member; founder of SEO Services Internet Marketing LLC and BJG Digital; leads Quoteplicity. Featured in Forbes, Entrepreneur, Fast Company, HuffPost, Bloomberg, USA Today, Yahoo Finance, Fox, NBC and CBS.",
    alumniOf: { "@type": "CollegeOrUniversity", name: "University of Arizona, Eller College of Management" },
    memberOf: { "@type": "Organization", name: "Million Dollar Round Table" },
    author: {
      "@type": "Book",
      name: "The Salesman Who Doesn't Sell: A Marketing Guide to Making Money While You Sleep",
      author: { "@id": `${SITE}/v7/about#brian-greenberg` },
      sameAs: [
        "https://www.amazon.com/Salesman-Who-Doesnt-Sell-Marketing-ebook/dp/B078HMS1CQ",
        "https://www.audible.com/pd/The-Salesman-Who-Doesnt-Sell-A-Marketing-Guide-for-Making-Money-While-You-Sleep-Audiobook/B0794Q3418",
      ],
    },
  },
  {
    "@type": "Person",
    "@id": `${SITE}/v7/about#branson-cobb`,
    name: "Branson Cobb",
    jobTitle: "President and COO",
    worksFor: { "@id": `${SITE}/#organization` },
    image: `${SITE}/v7/branson-cobb.jpg`,
    url: `${SITE}/v7/about#branson-cobb`,
    description:
      "President and COO of Rocket Llama Labs. More than 23 years leading sales, business development and client strategy for large healthcare organizations: Market President for CBIZ's Arizona and California offices, business development lead at Aetna, and 13 years at Cigna from underwriter to Senior Account Executive.",
    alumniOf: { "@type": "CollegeOrUniversity", name: "University of Arizona" },
  },
  {
    "@type": "Person",
    "@id": `${SITE}/v7/about#madison-schantz`,
    name: "Madison Schantz",
    jobTitle: "Chief Marketing Officer",
    worksFor: { "@id": `${SITE}/#organization` },
    image: `${SITE}/v7/madison.jpg`,
    url: `${SITE}/v7/about#madison-schantz`,
    description:
      "Creative digital designer, branding specialist, AI content creator and digital architect. Designs the brands, websites and AI-powered tools Rocket Llama Labs builds for home service companies.",
  },
];

export const ABOUT_FAQ: [string, string][] = [
  ["Who is Rocket Llama Labs?", "Rocket Llama Labs is a marketing and technology company in Phoenix, Arizona, run by Brian Greenberg (CEO), Branson Cobb (President and COO) and Madison Schantz (Chief Marketing Officer). We build and run the whole marketing system for home service companies."],
  ["Where is Rocket Llama Labs based?", "Phoenix, Arizona. We serve home service companies across the Valley, including Scottsdale, Mesa, Chandler, Gilbert, Glendale, Tempe and Peoria, and work with companies in other markets remotely."],
  ["What trades does Rocket Llama Labs work with?", "HVAC, plumbing, electrical, roofing, garage door, pest control, landscaping, painting and every other trade that goes to a customer's home."],
  ["What does Rocket Llama Labs do?", "One system, built and run by us: a website you own, Google and AI search, your Google Business Profile, ads in your name, review management, tracked phone numbers, an AI receptionist and a CRM. Every lead is answered in under a minute and every dollar is tracked to a paid job."],
  ["Who owns the website, data and ad accounts?", "You do. The website, the data, the phone numbers and the ad accounts are all in your name, month to month, with no contracts."],
];

export function AboutStructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      ORG,
      ...PEOPLE,
      {
        "@type": "AboutPage",
        "@id": `${SITE}/v7/about#webpage`,
        url: `${SITE}/v7/about`,
        name: "About Rocket Llama Labs",
        about: { "@id": `${SITE}/#organization` },
        isPartOf: { "@type": "WebSite", url: SITE, name: "Rocket Llama Labs" },
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE}/v7/about#faq`,
        mainEntity: ABOUT_FAQ.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
      },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
