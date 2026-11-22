// The home page's summary block, laid out like the summaries on the Services
// and industry pages: who Rocket Llama Labs is and what it does, in a passage
// an AI assistant can quote on its own. home-seo.tsx marks it as Speakable.
// Placed under the banner by scripts/make-v3.py (v7_home_extras).

export const HOME_SUMMARY =
  "Rocket Llama Labs is a marketing and technology company for home service businesses: HVAC, plumbing, electrical, roofing and every trade that goes to a customer’s home. One team builds and runs the website, Google and AI search, ads, reviews, phones with an AI receptionist and the CRM, so every lead is answered in under a minute and every dollar is traced to a paid job. You own all of it, month to month.";

const HOME_FACTS = [
  "For HVAC, plumbing, electrical, roofing and 11 more trades",
  "Every lead answered in under 60 seconds",
  "Every dollar tracked to a booked, paid job",
  "Website, ad accounts and phone numbers in your company’s name",
  "Month to month, no contract",
];

export function HomeSummary() {
  return (
    <section id="summary" className="isum"><div className="wrap">
      <div className="box">
        <div>
          <p className="kicker">Summary</p>
          <h2>Rocket Llama Labs</h2>
          <p className="answer">{HOME_SUMMARY}</p>
        </div>
        <ul>{HOME_FACTS.map((f) => <li key={f}>{f}</li>)}</ul>
      </div>
    </div></section>
  );
}
