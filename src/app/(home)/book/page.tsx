/* eslint-disable @next/next/no-img-element -- markup ported from the BBM Local mockup; swap for next/image during the redesign */

import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { pageMeta, PageStructuredData } from "@/components/v7/page-seo";
import { V7Footer } from "@/components/v7/footer";
import { BookFunnel } from "@/components/v2/book-funnel";

export const metadata: Metadata = pageMeta("/book", "Schedule a call", "Pick a time for a call with Rocket Llama Labs. We look at how your home service company shows up online and write a marketing plan with a number on it.");

// Ported from the mockup's src-c-book.html.
export default function Page() {
  return (
    <>
<nav className="nav" aria-label="Main"><div className="wrap in">
  <a className="wm" href="/" aria-label="Rocket Llama Labs home"><img src="/brand/logo-nav.svg" alt="Rocket Llama Labs" /></a>
  <div className="links"><a href="/services">Services</a><a href="/industries">Industries</a><a href="/about">About</a></div>
  <span className="cnt" style={{fontFamily:"var(--sans)",fontSize:"13px",fontWeight:"600",color:"var(--muted)"} as CSSProperties}>About a minute</span>
</div></nav>
<main>
<PageStructuredData path="/book" name="Schedule a call" description="Pick a time for a call with Rocket Llama Labs. We look at how your home service company shows up online and write a marketing plan with a number on it." />

<header className="fhero" id="top"><div className="wrap in">
  <p className="kicker">Schedule a call</p>
  <h1>Pick a time. About a minute.</h1>
  <p>Book the walkthrough and the call opens with a free live audit of how you show up online: your Google profile, your reviews, your website and how your phone gets answered, side by side with the top company in your trade. No obligation.</p>
  <div className="meta"><span><b>Book first</b> · questions after, optional</span><span><b>Free live audit</b> on the call</span><span><b>No obligation</b></span><span><b>Nothing shared</b> outside Rocket Llama Labs</span></div>
</div></header>

<section className="funnel"><div className="wrap in">
  <div className="qzcol">
    <BookFunnel tz="Arizona time" />
  </div>
  <aside className="aside">
    <div className="abox">
      <p className="k">What happens next</p>
      <ol className="steps">
        <li><span><b>Pick a time.</b>Company, name, email, and you are booked.</span></li>
        <li><span><b>A few quick questions, if you have a minute.</b>One per screen, most a single tap, so the call is about your business from the first minute. Skip them if you are in a hurry.</span></li>
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
      <V7Footer note='Version 7, booking funnel' />
    </>
  );
}
