/* eslint-disable @next/next/no-img-element -- markup ported from the BBM Local mockup; swap for next/image during the redesign */

import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { pageMeta, PageStructuredData } from "@/components/v7/page-seo";
import { V7Footer } from "@/components/v7/footer";
import { QualifyQuiz } from "@/components/v2/qualify-quiz";

export const metadata: Metadata = pageMeta("/qualify", "See if you qualify", "Two minutes of questions about your home service company, then a time on the calendar.", { noindex: true });

// Ported from the mockup's src-c-qualify.html.
export default function Page() {
  return (
    <>
<nav className="nav" aria-label="Main"><div className="wrap in">
  <a className="wm" href="/" aria-label="Rocket Llama Labs home"><img src="/brand/logo-nav.svg" alt="Rocket Llama Labs" /></a>
  <div className="links"><a href="/services">Services</a><div className="dd"><a href="/industries" aria-haspopup="true">Industries</a><div className="ddmenu"><a href="/hvac">HVAC</a><a href="/plumbing">Plumbing</a><a href="/electrical">Electrical</a><a href="/roofing">Roofing</a><a href="/garage-door">Garage door</a><a href="/pest-control">Pest control</a><a href="/landscaping">Landscaping</a><a href="/painting">Painting</a><a href="/window-and-pressure-washing">Window and pressure washing</a><a href="/handyman">Handyman</a><a href="/mobile-mechanic">Mobile mechanic</a><a href="/windows-and-doors">Windows and doors</a><a href="/solar">Solar</a><a href="/flooring">Flooring</a><a href="/remodeling">Remodeling</a><a className="all" href="/industries">All industries</a></div></div><a href="/about">About</a></div>
  <span className="cnt" style={{fontFamily:"var(--sans)",fontSize:"13px",fontWeight:"600",color:"var(--muted)"} as CSSProperties}>Two minutes</span>
</div></nav>
<main>
<PageStructuredData path="/qualify" name="See if you qualify" description="Two minutes of questions about your home service company, then a time on the calendar." />

<header className="fhero" id="top"><div className="wrap in">
  <p className="kicker">See if you qualify</p>
  <h1>Two minutes of questions. Then a time on the calendar.</h1>
  <p>We like to know the business before we talk, so the call is about you from the first minute. If you qualify, you book right here, and the call opens with a free live audit of how you show up online.</p>
  <div className="meta"><span><b>One question per screen</b> · about two minutes</span><span><b>Free live audit</b> on the call</span><span><b>No obligation</b></span><span><b>Nothing shared</b> outside Rocket Llama Labs</span></div>
</div></header>

<section className="funnel"><div className="wrap in">
  <div className="qzcol">
    <QualifyQuiz />
  </div>
  <aside className="aside">
    <div className="abox">
      <p className="k">What happens next</p>
      <ol className="steps">
        <li><span><b>Answer a few quick questions.</b>One per screen, most a single tap: size, where jobs come from today, website, reviews, spend.</span></li>
        <li><span><b>See if you qualify, on the spot.</b>If you do, pick a time for a walkthrough right here.</span></li>
        <li><span><b>The walkthrough.</b>Thirty to forty-five minutes. What the top company in your trade is doing to get customers, and your numbers on the same system.</span></li>
      </ol>
    </div>
    <div className="abox">
      <p className="k">What you get on the call</p>
      <ul className="checks">
        <li>A free live audit, on screen: your Google Business Profile, your website and your reviews, side by side with the top company in your trade</li>
        <li>A look at who is winning your trade in your area, and how</li>
        <li>What your numbers look like on the system, floor to ceiling</li>
        <li>The website design first. Setup is refunded if you do not like it</li>
        <li>A straight answer on whether it fits</li>
      </ul>
    </div>
    <div className="abox">
      <p className="k">The free live audit</p>
      <h4>Ten minutes, on screen, and you keep the notes.</h4>
      <ul className="checks">
        <li>Your Google Business Profile: completeness, photos, posts, and where you rank on the map for your top three searches</li>
        <li>Your reviews: count, pace and replies, against the top company in your trade</li>
        <li>Your website: speed on a phone, what a search engine and an AI can read, and whether a lead can book</li>
        <li>The phone test: we call your number and time how long it takes to reach a person</li>
      </ul>
    </div>
    <div className="abox rule">
      <p className="k">Your leads</p>
      <p><b>Exclusive leads, never shared.</b> Every lead comes from your own website and your own ads, so it is yours alone. A marketplace sells the same homeowner to four contractors. We never do.</p>
    </div>
  </aside>
</div></section>
</main>
      <V7Footer note='Version 7, qualify funnel' />
    </>
  );
}
