// The Services page's summary block and FAQ, laid out like the industry pages
// (src/components/v7/industry-page.tsx) so the page answers "what is this and
// who is it for" up top and carries real questions at the bottom. The same
// copy feeds the structured data in page-seo.tsx (ServicesStructuredData).
// Placed on the page by scripts/make-v3.py (v7_page_seo).

export const SERVICES_SUMMARY =
  "Rocket Llama Labs builds and runs the whole marketing system for home service companies: your website, local SEO and AI search, Google Business Profile, ads, reviews, phones with an AI receptionist, and a CRM. One team runs every piece, every lead is answered in under a minute, and every dollar is tracked to a paid job.";

export const SERVICES_FACTS = [
  "Eight services, run as one system by one team",
  "Every lead answered by text and email in under 60 seconds",
  "Ads run in your company’s name, on your card",
  "Month to month, no contract",
];

export const SERVICES_FAQ: [string, string][] = [
  [
    "What marketing services does Rocket Llama Labs provide for home service companies?",
    "Rocket Llama Labs provides eight services as one system: a website you own with free hosting, local SEO and AI search optimization, Google Business Profile management, funnels that book the job, a phone system with call tracking and an AI receptionist, a CRM with AI follow-up, Google, Local Services and Meta ads, and review management. One team builds and runs all of it for HVAC, plumbing, electrical, roofing and other home service companies.",
  ],
  [
    "How is one system different from hiring separate vendors for SEO, ads, and a website?",
    "Each separate vendor reports their own numbers and nobody owns the result. With Rocket Llama Labs the website, ads, phones, and CRM are built to work together, so every call and form is answered in under a minute and every booked job is tied back to the ad, search, or review that produced it. You see one report: booked jobs, what they were worth, and what they cost.",
  ],
  [
    "How do you get a home service company recommended by ChatGPT, Gemini, and other AI assistants?",
    "AI assistants recommend companies they can read and verify. We publish a clear page for each service and city, add structured data and FAQs. We keep your name, address, and phone identical across listings and grow your review count. Each month we ask the assistants the same questions about your trade and city and report whether your company is named.",
  ],
  [
    "How fast are new leads answered?",
    "Every call, form and estimate request gets a reply by text and email in under 60 seconds, day or night. Calls are answered by an AI receptionist that takes the details and rings your team; if nobody picks up, it books a callback or takes a message instead of sending the homeowner to voicemail.",
  ],
  [
    "What does home service marketing cost with Rocket Llama Labs?",
    "There is no price list. Rocket Llama Labs prices each company after a review, because the number depends on your trade, your service area, how many trucks you run, which services you need and how you show up online today. Schedule a call and we review your company, then write a marketing plan with that number on it. You see the plan before you pay for anything, and you keep it either way.",
  ],
  [
    "Is there a contract, and who owns the website and accounts?",
    "There is no contract. Rocket Llama Labs works month to month. The website, the Google Business Profile, the ad accounts and the tracked phone numbers are in your company’s name, and the ads run on your card. If you leave, you export your data, port your numbers, take the code, and we help the next provider get set up.",
  ],
];

// The Services banner: the page's one heading, the answer-first summary (marked
// Speakable through #summary .answer) and the facts, on the light-blue header.
export function ServicesHero() {
  return (
    <header className="pagehead svchero" id="top"><div className="wrap in">
      <p className="kicker">Our services</p>
      <h1>Marketing Services that get you the call.</h1>
      <div id="summary" className="svchero-grid">
        <div>
          <p className="answer">{SERVICES_SUMMARY}</p>
          <div className="ctas"><a className="btn" href="/book">Schedule a call</a></div>
        </div>
        <ul className="facts">{SERVICES_FACTS.map((f) => <li key={f}>{f}</li>)}</ul>
      </div>
    </div></header>
  );
}

export function ServicesFaq() {
  return (
    <section id="faq"><div className="wrap">
      <p className="kicker">Questions</p>
      <h2>Home service marketing questions</h2>
      <div className="faq">
        {SERVICES_FAQ.map(([q, a]) => <details key={q}><summary><h3>{q}</h3></summary><p>{a}</p></details>)}
      </div>
    </div></section>
  );
}
