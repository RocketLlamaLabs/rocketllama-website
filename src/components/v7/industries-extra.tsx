import { INDUSTRIES_FAQ } from "@/components/v7/page-seo";

// The Industries page's FAQ. The copy lives in page-seo.tsx, beside the structured
// data it also feeds (IndustriesStructuredData). Placed on the page by
// scripts/make-v3.py (v7_industries_extras).

export function IndustriesFaq() {
  return (
    <section id="faq"><div className="wrap">
      <p className="kicker">Questions</p>
      <h2>Home service industry questions</h2>
      <div className="faq">
        {INDUSTRIES_FAQ.map(([q, a]) => <details key={q}><summary><h3>{q}</h3></summary><p>{a}</p></details>)}
      </div>
    </div></section>
  );
}
