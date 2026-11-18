import Link from "next/link";
import { INDUSTRIES_FAQ, TRADE_COPY, TRADE_SLUGS } from "@/components/v7/page-seo";

// The Industries page's added sections: one line per trade, linking to that
// trade's page, and a short FAQ. The copy lives in page-seo.tsx, beside the
// structured data it also feeds (IndustriesStructuredData). Placed on the page by
// scripts/make-v3.py (v7_industries_extras).

export function IndustriesList() {
  return (
    <section id="trades-list" className="feature"><div className="wrap">
      <p className="kicker">By trade</p>
      <h2>Marketing services for each home service trade</h2>
      <p className="sub">Each trade has its own page with the searches, services and seasonal plan we run for it.</p>
      <div className="grid c3">
        {TRADE_COPY.map(([name, line]) => (
          <div className="card" key={name}>
            <h3><Link href={`/${TRADE_SLUGS[name]}`}>{name} marketing</Link></h3>
            <p>{line}</p>
          </div>
        ))}
      </div>
    </div></section>
  );
}

export function IndustriesFaq() {
  return (
    <section id="faq"><div className="wrap">
      <p className="kicker">Questions</p>
      <h2>Home service industry questions</h2>
      <div className="faq">
        {INDUSTRIES_FAQ.map(([q, a], i) => <details key={q} open={i === 0}><summary><h3>{q}</h3></summary><p>{a}</p></details>)}
      </div>
    </div></section>
  );
}
