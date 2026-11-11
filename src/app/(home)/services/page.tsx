/* eslint-disable @next/next/no-img-element -- markup ported from the BBM Local mockup; swap for next/image during the redesign */

import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { pageMeta, ServicesStructuredData } from "@/components/v7/page-seo";
import { V7Footer } from "@/components/v7/footer";
import { DreamBadge } from "@/components/v7/dream-badge";
import { SystemFlow } from "@/components/v7/system-flow";

export const metadata: Metadata = pageMeta("/services", "Services", "Every piece of the Rocket Llama Labs marketing system for home service companies: website, local SEO and AI search, Google Business Profile, funnels, phones with an AI receptionist, CRM, ads and reviews.");

// Ported from the mockup's src-c-services.html.
export default function Page() {
  return (
    <>
<nav className="nav" aria-label="Main"><div className="wrap in">
  <a className="wm" href="/" aria-label="Rocket Llama Labs home"><img src="/brand/logo-nav.svg" alt="Rocket Llama Labs" /></a>
  <div className="links"><a href="/services">Services</a><a href="/industries">Industries</a><a href="/about">About</a></div>
  <div className="navbtns"><a className="btn sm" href="/book">Schedule a call</a><a className="btn sm ghost" href="/audit">Run an instant audit</a></div>
  <details className="menu">
    <summary aria-label="Menu"><span></span></summary>
    <div className="panel">
      <a href="/services">Services</a><a href="/industries">Industries</a><a href="/about">About</a>
      <a className="btn sm" href="/book">Schedule a call</a>
      <a className="btn sm ghost" href="/audit">Run an instant audit</a>
    </div>
  </details>
</div></nav>
<script dangerouslySetInnerHTML={{__html:"document.addEventListener('click',function(e){var m=e.target.closest('.v7 .nav .menu');if(m){if(e.target.closest('a'))m.removeAttribute('open');}else{document.querySelectorAll('.v7 .nav .menu[open]').forEach(function(x){x.removeAttribute('open')})}});document.addEventListener('click',function(e){var b=e.target.closest('.v7 .team details.bio .less');if(b){var d=b.closest('details');d.removeAttribute('open');d.closest('.card').scrollIntoView({block:'nearest'})}})"}} />
<main>
<ServicesStructuredData />

<header className="pagehead with-badge" id="top">
  <div className="wrap in">
    <div className="copy">
    <p className="kicker">Our services</p>
    <h1>Everything your company needs to get the call.</h1>
    <p className="lede">The website, the phones, the CRM, the reviews and the ads, built as one system, and run by one team. Here is every piece we run for you and how they fit together.</p>
    <DreamBadge tone="blue" />
    </div>
  </div>
</header>

<section className="watch" id="video"><div className="wrap in">
  <div>
    <p className="kicker">Under 90 seconds</p>
    <h2>The overview.</h2>
    <p>The three ways good companies lose jobs, what we build instead, how the money is tracked, and who is behind it.</p>
    <div className="ctas"><a className="btn" href="/book">Schedule a call</a></div>
  </div>
  <div className="shot"><video controls playsInline preload="metadata" poster="/v7/video-poster.png"><source src="/v7/video/rocket-llama-overview.mp4" type="video/mp4" /></video></div>
</div></section>

<section id="what"><div className="wrap">
  <p className="kicker">What we build</p>
  <h2>Eight pieces. One system. All yours.</h2>
  <div className="svc">
    <div className="card"><span className="k">01 · Website</span><h3>A website you own, hosted free</h3><p>Preview every change before it goes live. Stop paying Wix or GoDaddy.</p><ul><li>Service pages per service and per city</li><li>Reviews and stars on every page</li><li>Loads fast on a phone in a driveway</li></ul></div>
    <div className="card"><span className="k">02 · Search and AI search</span><h3>Found by Google and by AI</h3><p>Schema on every page: FAQs, authorship, services and review stars per service, so Gemini and ChatGPT can recommend you by name.</p><ul><li>Local pages that answer real questions</li><li>Structured data an AI can read</li><li>Monthly rank and mention report</li></ul></div>
    <div className="card"><span className="k">03 · Reviews</span><h3>Google profile and reviews, worked hard</h3><p>Complete profiles get seven times more clicks. We request a review after every job and answer every one.</p><ul><li>Profile fully built out and posted weekly</li><li>Review requests by text, timed to the job</li><li>Every review answered in your voice</li></ul></div>
    <div className="card"><span className="k">04 · Funnels</span><h3>Funnels not contact forms</h3><p>Qualifying questions, address autofill, your offer and your reviews, then a booking calendar, or a call-back button.</p><ul><li>20% to 30% conversion against a 5% average</li><li>One funnel per service and per ad</li><li>Every submission lands in the CRM</li></ul></div>
    <div className="card"><span className="k">05 · Phones</span><h3>An AI receptionist that gets you the call first</h3><p>Clear audio on a Tier 1 carrier. Takes details, rings your team, and if nobody answers, books a callback or takes a message.</p><ul><li>One tracked number per source</li><li>Call recording and transcripts</li><li>After-hours booking, not voicemail</li></ul></div>
    <div className="card"><span className="k">06 · CRM</span><h3>Your CRM, with AI follow-up</h3><p>Text and email reply in under a minute, pipelines, booking, closed-job value, and the return-on-spend dashboard.</p><ul><li>Every lead answered in under 60 seconds</li><li>Pipeline from lead to paid job</li><li>The dashboard that sets next month&rsquo;s budget</li></ul></div>
    <div className="card"><span className="k">07 · Ads</span><h3>Google, Local Services, and Meta ads in your name</h3><p>Your accounts and your card with our management. Budget up in busy months, budget down in slow ones. Never a contract.</p><ul><li>Local Services Ads with the guaranteed badge</li><li>Search for the jobs you want</li><li>Meta for the offers that fill the calendar</li></ul></div>
    <div className="card"><span className="k">08 · Ownership</span><h3>Never locked in</h3><p>Export your data, port your numbers, take the code. If you leave, we help the next provider get set up.</p><ul><li>Month to month</li><li>Everything in your name</li><li>Free hosting for life of the site</li></ul></div>
    <div className="card" style={{background:"var(--accent-soft)",borderColor:"#BFD8FF"} as CSSProperties}><span className="k">Your leads</span><h3>Exclusive, never shared</h3><p>Every lead comes from your own website and your own ads, so it is yours alone. A marketplace sells the same homeowner to four contractors. We never do.</p><p style={{marginTop:"14px"} as CSSProperties}><a className="btn sm" href="/book">Schedule a call</a></p></div>
  </div>
</div></section>

<div className="band" id="proof" style={{"--img":"url(/v2/img/band-door.jpg)"} as CSSProperties}><div className="wrap in">
  <p className="kicker">Tracked to the job</p>
  <h2>We don&rsquo;t report clicks.</h2>
  <h3 className="bsub">We report booked jobs and what they were worth.</h3>
  <div className="bstats">
    <div><div className="b">$2 : $1</div><div className="l">Our floor: two dollars back for every dollar spent or we work free</div></div>
    <div><div className="b">&lt;60s</div><div className="l">Every new lead gets a text and an email in your voice</div></div>
    <div><div className="b">1 per source</div><div className="l">Tracked phone numbers, so we know which ad made it ring</div></div>
    <div><div className="b">100%</div><div className="l">Yours: the site, the data, the numbers, and the ad accounts</div></div>
  </div>
</div></div>

<section id="map" className="feature"><div className="wrap">
  <p className="kicker">How it connects</p>
  <h2>Everything points to a website you own. Everything lands in a CRM you own.</h2>
  <p className="sub">Traffic from Google, Meta, and your reviews feeds a site built for search and AI search. The site and the phones feed your CRM. The CRM books the job and records what it was worth.</p>
  <SystemFlow />
</div></section>

</main>
      <V7Footer note='Version 7, services page' />
    </>
  );
}
