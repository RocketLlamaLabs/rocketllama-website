/* eslint-disable @next/next/no-img-element -- same photo markup as the other versions */

import type { CSSProperties, ReactNode } from "react";
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

// More detail for the "Keep it running" column, used where the page asks for it.
const KEEP_RUNNING_DETAILED = [
  "Ongoing technical support",
  "Monthly report: booked jobs by source and what they were worth",
  "Custom projects upon request",
  "Review requests after every job, every review answered",
  "Website updates and new pages as your company grows",
];

export function FullSystem({ base, id = "system", photo, detailed, badge, noDream, band }: { base: string; id?: string; photo?: { src: string; alt: string }; detailed?: boolean; badge?: ReactNode; noDream?: boolean; band?: boolean }) {
  const groups = detailed ? SYSTEM.map(([name, blurb, items]) => [name, blurb, name === "Keep it running" ? KEEP_RUNNING_DETAILED : items] as [string, string, string[]]) : SYSTEM;
  return (
  <>
<section id={id} className="feature"><div className="wrap">
  <p className="kicker">The full system</p>
  <h2>Most agencies sell you one tactic.<br />We run the whole thing.</h2>
  <p className="sub">{detailed ? "Website, local SEO and AI search, Google Ads, reviews, call tracking, the CRM, and the AI receptionist that answers for you, built as one system and run by one marketing and technology team for home service contractors." : "Phones, website, search, ads, reviews, the CRM and the AI that answers for you, built as one system and run by one team. Pick the pieces you need; most owners want all of it."}</p>
  <div className="sysgrid">
    {groups.map(([name, blurb, items]) => (
      <div className="sysgroup" key={name}>
        <h3>{name}</h3>
        <p className="blurb">{blurb}</p>
        <ul>{items.map((it) => (<li key={it}>{it}</li>))}</ul>
      </div>
    ))}
  </div>
  {band ? null : (
  <div className={photo ? "evolve with-photo" : "evolve"}>
    <div className="evolve-text">
    <p>{detailed ? <><b>Our system never stands still.</b> As marketing technology and consumer behavior evolve, we continuously improve and adapt to keep your business ahead of the competition. Our mission is simple: take marketing off your plate, make your life easier, and keep bringing new customers through your door.</> : <><b>Our system is constantly evolving</b>, because the marketing systems it runs on never stop changing. Our goal is simple: make your job easier and bring you customers.</>}</p>
    {noDream ? null : <p className="dream">If you can dream it, we can build it.</p>}
    <a className="btn" href={`${base}/book`}>Schedule a call</a>
    </div>
    {photo ? (badge ? <div className="evolve-photo-wrap"><img className="evolve-photo" src={photo.src} alt={photo.alt} />{badge}</div> : <img className="evolve-photo" src={photo.src} alt={photo.alt} />) : null}
  </div>
  )}
</div></section>
  {band && photo ? (
    <div className="band evolve-band" id="evolve" style={{ "--img": `url(${photo.src})` } as CSSProperties}><div className="wrap in">
      <p className="kicker">Never standing still</p>
      <h2>If you can dream it, we can build it.</h2>
      <p className="bsub">Our system never stands still. As marketing technology and consumer behavior evolve, we keep improving it to keep your business ahead. Our mission is simple: take marketing off your plate and keep bringing new customers through your door.</p>
      <div className="ctas"><a className="btn" href={`${base}/book`}>Schedule a call</a></div>
    </div></div>
  ) : null}
  </>
  );
}

export function HowItWorks({ base }: { base: string }) {
  return (
<section id="how"><div className="wrap">
  <p className="kicker">How it works</p>
  <h2>Getting started is simple. Keeping your phone ringing and your calendar full is our job.</h2>
  <div className="steps4">
    <div className="step"><span className="num">1</span><h3>Schedule a call</h3><p>It takes about a minute to book. On the call we will discuss an audit of how you show up online.</p></div>
    <div className="step"><span className="num">2</span><h3>We quote your plan</h3><p>We take your vision and what you currently have, add our suggestions, our expertise and our technology, and provide you a quote.</p></div>
    <div className="step"><span className="num">3</span><h3>We build and run everything</h3><p>Your website, phones, your CRM, the ads, and your reviews are all in your name. Every lead is answered in under a minute.</p></div>
    <div className="step"><span className="num">4</span><h3>Your phone starts ringing</h3><p>On the first of every month you get the report: booked jobs by source, what they were worth, and what we changed.</p></div>
  </div>
</div></section>
  );
}
