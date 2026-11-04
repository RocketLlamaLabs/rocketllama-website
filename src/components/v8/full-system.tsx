// The full-system list and the four "how it works" steps, shared by the
// version 8 home and the version 7 home.

const SYSTEM: [string, string, string[]][] = [
  ["Get found", "Where homeowners look first.", [
    "Ranking in Google search", "AI search (ChatGPT, Gemini, Perplexity)", "Google Business Profile management", "Website design", "Free website hosting", "Landing page and funnel optimization", "Link building", "Content creation",
  ]],
  ["Get the call", "Ads that run in your name, on your card.", [
    "Google Ads", "Google Local Services Ads", "Facebook Ads", "Instagram", "YouTube ads", "Targeted local commercials", "Email campaigns", "Voicemail drop",
  ]],
  ["Answer and book", "Every lead answered, every job on the calendar.", [
    "Phone system and call tracking", "AI voice attendant", "AI calendar booking", "CRM with AI built in", "Review management",
  ]],
  ["Keep it running", "A team on the other end of the line.", [
    "Ongoing technical support", "Custom projects upon request",
  ]],
];

export function FullSystem({ base, id = "system" }: { base: string; id?: string }) {
  return (
<section id={id} className="feature"><div className="wrap">
  <p className="kicker">The full system</p>
  <h2>Most agencies sell you one tactic. We run the whole thing.</h2>
  <p className="sub">Phones, website, search, ads, reviews, the CRM and the AI that answers for you, built as one system and run by one team. Pick the pieces you need; most owners want all of it.</p>
  <div className="sysgrid">
    {SYSTEM.map(([name, blurb, items]) => (
      <div className="sysgroup" key={name}>
        <h3>{name}</h3>
        <p className="blurb">{blurb}</p>
        <ul>{items.map((it) => (<li key={it}>{it}</li>))}</ul>
      </div>
    ))}
  </div>
  <div className="evolve">
    <p><b>Our system is constantly evolving</b>, because the marketing systems it runs on never stop changing. Our goal is simple: make your job easier and bring you customers.</p>
    <p className="dream">If you can dream it, we can build it.</p>
    <a className="btn" href={`${base}/book`}>Schedule a call</a>
  </div>
</div></section>
  );
}

export function HowItWorks({ base }: { base: string }) {
  return (
<section id="how"><div className="wrap">
  <p className="kicker">How it works</p>
  <h2>Getting started is simple. Keeping your phone ringing is our job.</h2>
  <div className="steps4">
    <div className="step"><span className="num">1</span><h3>Schedule a call</h3><p>About a minute to book. On the call we run a live audit of how you show up online, side by side with the top company in your trade.</p></div>
    <div className="step"><span className="num">2</span><h3>We write your plan</h3><p>Your trade, your area, your calendar and what you already have, written up with a number on it. You see it before you pay for anything.</p></div>
    <div className="step"><span className="num">3</span><h3>We build and run everything</h3><p>Site, phones, CRM, ads and reviews, all in your name. Ads go on. Every lead is answered in under a minute.</p></div>
    <div className="step"><span className="num">4</span><h3>Your phone starts ringing</h3><p>On the first of every month you get the report: booked jobs by source, what they were worth, and what we changed.</p></div>
  </div>
</div></section>
  );
}
