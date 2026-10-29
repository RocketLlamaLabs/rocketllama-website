/* eslint-disable @next/next/no-img-element -- markup ported from the BBM Local mockup; swap for next/image during the redesign */

import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { V2Footer } from "@/components/v2/footer";
import { SystemDiagram } from "@/components/v2/system-diagram";

export const metadata: Metadata = {
  title: 'Services',
  description: 'Rocket Llama Labs services page : the full 90-second video, every piece of the system, the trades it serves.',
};

// Ported from the mockup's src-c-services.html.
export default function Page() {
  return (
    <>
<nav className="nav"><div className="wrap in">
  <a className="wm" href="/v2" aria-label="Rocket Llama Labs home"><img src="/brand/wordmark-horizontal-rocket-o.svg" alt="Rocket Llama Labs" /></a>
  <div className="links"><a href="/v2#problem">Why us</a><a href="/v2#system">The system</a><a className="on" href="#top">Services</a><a href="/v2#industries">Industries</a><a href="/v2#pricing">Pricing</a><a href="/v2#who">About</a></div>
  <a className="btn sm" href="/v2/book">Book a walkthrough</a>
</div></nav>
<main>

<header className="hero small" id="top">
  <div className="slides" aria-hidden="true" style={{backgroundImage:"url(/v2/img/hero-roofing.jpg)"} as CSSProperties}></div>
  <div className="wrap in">
    <p className="kicker">Services</p>
    <h1>Everything a local home services company needs to <em>get the call.</em></h1>
    <p className="lede">The website, the phones, the CRM, the reviews and the ads, built as one system and run by one team. You own every piece.</p>
  </div>
</header>

<section className="watch" id="video"><div className="wrap in">
  <div>
    <p className="kicker">Ninety seconds</p>
    <h2>The full walkthrough.</h2>
    <p>The three ways good companies lose jobs, what we build instead, how the money is tracked, and who is behind it.</p>
    <p><a className="lk" href="/v2/book">Book a walkthrough</a> &nbsp;·&nbsp; In a hurry? <a className="lk" href="/v2/video/bbm-local-30s.mp4" target="_blank" rel="noopener">The 30-second cut</a></p>
  </div>
  <div className="shot"><video controls playsInline preload="metadata" poster="/v2/video/poster.png"><source src="/v2/video/bbm-local-full.mp4" type="video/mp4" /></video><span className="tag">90 seconds</span></div>
</div></section>

<section id="what"><div className="wrap">
  <p className="kicker">What we build</p>
  <h2>Eight pieces. One system. Yours.</h2>
  <div className="svc">
    <div className="card"><span className="k">01 · Website</span><h3>A website you own, hosted free</h3><p>Next.js, the code in your GitHub, on Vercel. Preview every change before it goes live. Stop paying Wix or GoDaddy.</p><ul><li>Service pages per service and per city</li><li>Reviews and stars on every page</li><li>Loads fast on a phone in a driveway</li></ul></div>
    <div className="card"><span className="k">02 · Search and AI search</span><h3>Found by Google and by AI</h3><p>Schema on every page: FAQs, authorship, services and review stars per service, so Gemini and ChatGPT can recommend you by name.</p><ul><li>Local pages that answer real questions</li><li>Structured data an AI can read</li><li>Monthly rank and mention report</li></ul></div>
    <div className="card"><span className="k">03 · Reviews</span><h3>Google profile and reviews, worked hard</h3><p>Complete profiles get seven times more clicks. We request a review after every job and answer every one.</p><ul><li>Profile fully built out and posted weekly</li><li>Review requests by text, timed to the job</li><li>Every review answered in your voice</li></ul></div>
    <div className="card"><span className="k">04 · Funnels</span><h3>Funnels, not contact forms</h3><p>Qualifying questions, address autofill, your offer and your reviews, then a booking calendar or a call-back button.</p><ul><li>20 to 30% conversion against a 5% average</li><li>One funnel per service and per ad</li><li>Every submission lands in the CRM</li></ul></div>
    <div className="card"><span className="k">05 · Phones</span><h3>An AI receptionist that gets you the call first</h3><p>Clear audio on a Tier 1 carrier. Takes details, rings your team, and if nobody answers, books a callback or takes a message.</p><ul><li>One tracked number per source</li><li>Call recording and transcripts</li><li>After-hours booking, not voicemail</li></ul></div>
    <div className="card"><span className="k">06 · CRM</span><h3>Your CRM, with AI follow-up</h3><p>Text and email reply in under a minute, pipelines, booking, closed-job value and the return-on-spend dashboard.</p><ul><li>Every lead answered in under 60 seconds</li><li>Pipeline from lead to paid job</li><li>The dashboard that sets next month&rsquo;s budget</li></ul></div>
    <div className="card"><span className="k">07 · Ads</span><h3>Google, Local Services and Meta ads, in your name</h3><p>Your accounts, your card, our management. Budget up in busy months, down in slow ones, never a contract.</p><ul><li>Local Services Ads with the guaranteed badge</li><li>Search for the jobs you want</li><li>Meta for the offers that fill the calendar</li></ul></div>
    <div className="card"><span className="k">08 · Ownership</span><h3>Never locked in</h3><p>Export your data, port your numbers, take the code. If you leave, we help the next provider get set up.</p><ul><li>Month to month</li><li>Everything in your name</li><li>Free hosting for life of the site</li></ul></div>
    <div className="card" style={{background:"var(--accent-soft)",borderColor:"#bbf7d0"} as CSSProperties}><span className="k">The rule</span><h3>Limited spots per trade per area</h3><p>We cap how many companies we take in each trade and area, so our clients are never fighting each other for the same calls. Your spot is yours for as long as you are with us.</p><p style={{marginTop:"14px"} as CSSProperties}><a className="btn sm" href="/v2/book">Claim your spot</a></p></div>
  </div>
</div></section>

<section id="map" className="feature"><div className="wrap">
  <p className="kicker">How it connects</p>
  <h2>Everything points to a website you own. Everything lands in a CRM you own.</h2>
  <p className="sub">Traffic from Google, Meta and your reviews feeds a site built for search and AI search. The site and the phones feed your CRM. The CRM books the job and records what it was worth.</p>
  <div className="diagwrap"><SystemDiagram /></div>
</div></section>

<div className="band" style={{"--img":"url(/v2/img/band-van.jpg)"} as CSSProperties}><div className="wrap in">
  <p className="kicker">Speed to lead</p>
  <h2>Answer in two minutes and 62% of leads close. Wait 42, and it&rsquo;s 28%.</h2>
  <p>The whole system is built around that one number. The site, the phones and the CRM exist to get you the call first and to answer it when you can&rsquo;t.</p>
</div></div>

<section id="industries"><div className="wrap">
  <p className="kicker">Industries</p>
  <h2>Every trade that goes to a customer&rsquo;s home.</h2>
  <p className="sub">If you send a truck to a house, this is built for you. We limit how many clients we take per trade per service area.</p>
  <div className="trades"><a className="trade" href="/v2/book?trade=HVAC">HVAC</a><a className="trade" href="/v2/book?trade=Plumbing">Plumbing</a><a className="trade" href="/v2/book?trade=Electrical">Electrical</a><a className="trade" href="/v2/book?trade=Roofing">Roofing</a><a className="trade" href="/v2/book?trade=Garage%20door">Garage door</a><a className="trade" href="/v2/book?trade=Pest%20control">Pest control</a><a className="trade" href="/v2/book?trade=Landscaping">Landscaping</a><a className="trade" href="/v2/book?trade=Painting">Painting</a><a className="trade" href="/v2/book?trade=Window%20and%20pressure%20washing">Window and pressure washing</a><a className="trade" href="/v2/book?trade=Handyman">Handyman</a><a className="trade" href="/v2/book?trade=Mobile%20mechanic">Mobile mechanic</a><a className="trade" href="/v2/book?trade=Windows%20and%20doors">Windows and doors</a><a className="trade" href="/v2/book?trade=Solar">Solar</a><a className="trade" href="/v2/book?trade=Flooring">Flooring</a><a className="trade" href="/v2/book?trade=Remodeling">Remodeling</a><a className="trade other" href="/v2/book?trade=Other">Other home service &rarr;</a></div>
  <div className="ctas"><a className="btn" href="/v2/book">Book a walkthrough</a><a className="btn ghost" href="/v2#pricing">Pricing</a></div>
</div></section>
</main>
      <V2Footer note='Version 2 sample, services page' />
    </>
  );
}
