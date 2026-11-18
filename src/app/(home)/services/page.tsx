/* eslint-disable @next/next/no-img-element -- markup ported from the BBM Local mockup; swap for next/image during the redesign */

import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta, ServicesStructuredData } from "@/components/v7/page-seo";
import { V7Footer } from "@/components/v7/footer";
import { ServicesHero, ServicesFaq } from "@/components/v7/services-extra";
import { SystemFlow } from "@/components/v7/system-flow";

export const metadata: Metadata = pageMeta("/services", "Home Service Marketing Services", "Websites, local SEO and AI search, Google Business Profile, ads, reviews, phones with an AI receptionist and CRM for home service companies, run as one system.");

// Ported from the mockup's src-c-services.html.
export default function Page() {
  return (
    <>
<nav className="nav" aria-label="Main"><div className="wrap in">
  <a className="wm" href="/" aria-label="Rocket Llama Labs home"><img src="/brand/logo-nav.svg" alt="Rocket Llama Labs" /></a>
  <div className="links"><a href="/services">Services</a><div className="dd"><a href="/industries" aria-haspopup="true">Industries</a><div className="ddmenu"><a href="/hvac">HVAC</a><a href="/plumbing">Plumbing</a><a href="/electrical">Electrical</a><a href="/roofing">Roofing</a><a href="/garage-door">Garage door</a><a href="/pest-control">Pest control</a><a href="/landscaping">Landscaping</a><a href="/painting">Painting</a><a href="/window-and-pressure-washing">Window and pressure washing</a><a href="/handyman">Handyman</a><a href="/mobile-mechanic">Mobile mechanic</a><a href="/windows-and-doors">Windows and doors</a><a href="/solar">Solar</a><a href="/flooring">Flooring</a><a href="/remodeling">Remodeling</a><a className="all" href="/industries">All industries</a></div></div><a href="/about">About</a></div>
  <div className="navbtns"><a className="btn sm" href="/book">Schedule a call</a></div>
  <details className="menu">
    <summary aria-label="Menu"><span></span></summary>
    <div className="panel">
      <a href="/services">Services</a>
      <details className="sub"><summary>Industries</summary><div className="sublinks"><a href="/hvac">HVAC</a><a href="/plumbing">Plumbing</a><a href="/electrical">Electrical</a><a href="/roofing">Roofing</a><a href="/garage-door">Garage door</a><a href="/pest-control">Pest control</a><a href="/landscaping">Landscaping</a><a href="/painting">Painting</a><a href="/window-and-pressure-washing">Window and pressure washing</a><a href="/handyman">Handyman</a><a href="/mobile-mechanic">Mobile mechanic</a><a href="/windows-and-doors">Windows and doors</a><a href="/solar">Solar</a><a href="/flooring">Flooring</a><a href="/remodeling">Remodeling</a><a className="all" href="/industries">All industries</a></div></details>
    </div>
  </details>
</div></nav>
<script dangerouslySetInnerHTML={{__html:"document.addEventListener('click',function(e){var m=e.target.closest('.v7 .nav .menu');if(m){if(e.target.closest('a'))m.removeAttribute('open');}else{document.querySelectorAll('.v7 .nav .menu[open]').forEach(function(x){x.removeAttribute('open')})}});document.addEventListener('click',function(e){var b=e.target.closest('.v7 .team details.bio .less');if(b){var d=b.closest('details');d.removeAttribute('open');d.closest('.card').scrollIntoView({block:'nearest'})}})"}} />
<main>
<ServicesStructuredData />

<ServicesHero />

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
    <div className="card"><span className="k">01 · Website</span><h3><Link href="/services/websites">A website you own, hosted free</Link></h3><p>Preview every change before it goes live. Stop paying Wix or GoDaddy.</p><ul><li>Service pages per service and per city</li><li>Reviews and stars on every page</li><li>Loads fast on a phone in a driveway</li></ul></div>
    <div className="card"><span className="k">02 · Search and AI search</span><h3><Link href="/services/local-seo-and-ai-search">Found by Google and by AI</Link></h3><p>Schema on every page: FAQs, authorship, services and review stars per service, so Gemini and ChatGPT can recommend you by name.</p><ul><li>Local pages that answer real questions</li><li>Structured data an AI can read</li><li>Monthly rank and mention report</li></ul></div>
    <div className="card"><span className="k">03 · Reviews</span><h3><Link href="/services/google-business-profile">Google profile</Link> and <Link href="/services/review-management">reviews</Link>, worked hard</h3><p>Complete profiles get seven times more clicks. We request a review after every job and answer every one.</p><ul><li>Profile fully built out and posted weekly</li><li>Review requests by text, timed to the job</li><li>Every review answered in your voice</li></ul></div>
    <div className="card"><span className="k">04 · Funnels</span><h3><Link href="/services/lead-funnels">Funnels not contact forms</Link></h3><p>Qualifying questions, address autofill, your offer and your reviews, then a booking calendar, or a call-back button.</p><ul><li>20% to 30% conversion against a 5% average</li><li>One funnel per service and per ad</li><li>Every submission lands in the CRM</li></ul></div>
    <div className="card"><span className="k">05 · Phones</span><h3><Link href="/services/ai-receptionist">An AI receptionist that gets you the call first</Link></h3><p>Clear audio on a Tier 1 carrier. Takes details, rings your team, and if nobody answers, books a callback or takes a message.</p><ul><li>One tracked number per source</li><li>Call recording and transcripts</li><li>After-hours booking, not voicemail</li></ul></div>
    <div className="card"><span className="k">06 · CRM</span><h3><Link href="/services/crm">Your CRM, with AI follow-up</Link></h3><p>Text and email reply in under a minute, pipelines, booking, closed-job value, and the return-on-spend dashboard.</p><ul><li>Every lead answered in under 60 seconds</li><li>Pipeline from lead to paid job</li><li>The dashboard that sets next month&rsquo;s budget</li></ul></div>
    <div className="card"><span className="k">07 · Ads</span><h3><Link href="/services/google-and-meta-ads">Google, Local Services, and Meta ads in your name</Link></h3><p>Your accounts and your card with our management. Budget up in busy months, budget down in slow ones. Never a contract.</p><ul><li>Local Services Ads with the guaranteed badge</li><li>Search for the jobs you want</li><li>Meta for the offers that fill the calendar</li></ul></div>
    <div className="card"><span className="k">08 · Ownership</span><h3>Never locked in</h3><p>Export your data, port your numbers, take the code. If you leave, we help the next provider get set up.</p><ul><li>Month to month</li><li>Everything in your name</li><li>Free hosting for life of the site</li></ul></div>
    <div className="card" style={{background:"var(--accent-soft)",borderColor:"#BFD8FF"} as CSSProperties}><span className="k">Your leads</span><h3>Exclusive, never shared</h3><p>Every lead comes from your own website and your own ads, so it is yours alone. A marketplace sells the same homeowner to four contractors. We never do.</p><p style={{marginTop:"14px"} as CSSProperties}><a className="btn sm" href="/book">Schedule a call</a></p></div>
  </div>
</div></section>

<section id="map" className="feature"><div className="wrap">
  <p className="kicker">How it connects</p>
  <h2>Everything points to a website you own. Everything lands in a CRM you own.</h2>
  <p className="sub">Traffic from Google, Meta, and your reviews feeds a site built for search and AI search. The site and the phones feed your CRM. The CRM books the job and records what it was worth.</p>
  <SystemFlow />
</div></section>

<ServicesFaq />

</main>
      <V7Footer note='Version 7, services page' />
    </>
  );
}
