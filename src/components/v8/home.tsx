/* eslint-disable @next/next/no-img-element -- same photo markup as the other versions */

import type { CSSProperties } from "react";
import { SixtySecondCheck } from "@/components/v2/sixty-second-check";
import { V8Footer } from "@/components/v8/footer";

// Version 8: the simplest homepage. A calm banner with one button, the
// 60-second check right under it, the three leaks, the full system as one
// list, how it works, who you are talking to, and the trade picker. Nothing
// else. Structure follows the problem, system, proof, steps rhythm of a
// classic home services agency page; copy is ours.

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

const TRADES = ["HVAC", "Plumbing", "Electrical", "Roofing", "Garage door", "Pest control", "Landscaping", "Painting", "Handyman", "Solar"];

export function V8Home({ base }: { base: string }) {
  return (
    <>
<nav className="nav"><div className="wrap in">
  <a className="wm" href={base} aria-label="Rocket Llama Labs home"><img src="/brand/logo-horizontal-pdf.svg" alt="Rocket Llama Labs" /></a>
  <div className="links"><a href="#problem">Why us</a><a href="#check">60-second check</a><a href={`${base}/services`}>Services</a><a href="#qualify">Industries</a><a href="#how">Your plan</a><a href="#who">About</a></div>
  <a className="btn sm" href={`${base}/book`}>Book a walkthrough</a>
</div></nav>
<main>

<header className="hero v8hero" id="top">
  <div className="slides" aria-hidden="true">
    <img src="/v2/img/hero-hvac.jpg" alt="" />
    <img src="/v2/img/hero-plumbing.jpg" alt="" />
    <img src="/v2/img/hero-electrical.jpg" alt="" />
    <img src="/v2/img/hero-roofing.jpg" alt="" />
  </div>
  <div className="wrap in">
    <p className="kicker">Marketing and technology for local home services</p>
    <h1>Your calendar should be <em>full.</em></h1>
    <p className="lede">We run the whole marketing system for plumbers, electricians, HVAC, roofers and every trade that goes to a customer&rsquo;s home. Every lead answered in under a minute. Every dollar tracked to a paid job. You own all of it.</p>
    <div className="ctas"><a className="btn light" href={`${base}/book`}>Book a walkthrough</a></div>
    <p className="trust"><b>Month to month.</b> No contracts. <b>Exclusive leads, never shared.</b> Hosting free.</p>
  </div>
  <div className="dots" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
</header>

<section id="check" className="qzsec v8check"><div className="wrap">
  <p className="kicker">The 60-second check</p>
  <h2>How does your company show up online?</h2>
  <p className="sub">Four questions, one tap each. You get a score out of 100 and the honest read on where the jobs are leaking. No email needed to see it.</p>
  <SixtySecondCheck base={base} />
</div></section>

<section id="problem"><div className="wrap">
  <p className="kicker">Your phone should be ringing more</p>
  <h2>Good companies lose jobs online every day. Here is where.</h2>
  <div className="grid c3">
    <div className="card"><div className="n">1 in 5</div><h3>your odds on a shared lead</h3><p>A marketplace lead is sold to four other contractors, and you pay whether you win it or not. Ours come from your own site and your own ads, so they are yours alone.</p><span className="src">Top Three Web Design, 2026</span></div>
    <div className="card"><div className="n">62% <span style={{fontSize:".5em",color:"var(--muted)"} as CSSProperties}>vs</span> 28%</div><h3>close rate, fast vs average</h3><p>Answer inside two minutes and 62% of leads convert. The average company answers in 42 minutes and converts 28%.</p><span className="src">ServiceTitan, 2025 · Hatch, 2026</span></div>
    <div className="card"><div className="n">45%</div><h3>now ask an AI for a local pro</h3><p>Up from 6% a year earlier. Most contractor websites have nothing an AI can read, so they are never recommended.</p><span className="src">Elev8 Operations roundup, 2026</span></div>
  </div>
</div></section>

<section id="system" className="feature"><div className="wrap">
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
    <a className="btn" href={`${base}/book`}>Book a walkthrough</a>
  </div>
</div></section>

<div className="band" id="proof" style={{"--img":"url(/v2/img/band-door.jpg)"} as CSSProperties}><div className="wrap in">
  <p className="kicker">Tracked to the job</p>
  <h2>We don&rsquo;t report clicks. We report booked jobs and what they were worth.</h2>
  <div className="bstats">
    <div><div className="b">$2 : $1</div><div className="l">Our floor: two dollars back for every dollar spent, or we work free</div></div>
    <div><div className="b">&lt;60s</div><div className="l">Every new lead gets a text and an email, in your voice</div></div>
    <div><div className="b">1 per source</div><div className="l">Tracked phone numbers, so we know which ad made it ring</div></div>
    <div><div className="b">100%</div><div className="l">Yours: the site, the data, the numbers and the ad accounts</div></div>
  </div>
</div></div>

<section id="how"><div className="wrap">
  <p className="kicker">How it works</p>
  <h2>Getting started is simple. Keeping your phone ringing is our job.</h2>
  <div className="steps4">
    <div className="step"><span className="num">1</span><h3>Book a walkthrough</h3><p>About a minute to book. On the call we run a live audit of how you show up online, side by side with the top company in your trade.</p></div>
    <div className="step"><span className="num">2</span><h3>We write your plan</h3><p>Your trade, your area, your calendar and what you already have, written up with a number on it. You see it before you pay for anything.</p></div>
    <div className="step"><span className="num">3</span><h3>We build and run everything</h3><p>Site, phones, CRM, ads and reviews, all in your name. Ads go on. Every lead is answered in under a minute.</p></div>
    <div className="step"><span className="num">4</span><h3>Your phone starts ringing</h3><p>On the first of every month you get the report: booked jobs by source, what they were worth, and what we changed.</p></div>
  </div>
</div></section>

<section id="who" className="feature"><div className="wrap">
  <div className="who v8who">
    <div><p className="kicker">Who you are talking to</p>
      <h2>Rocket Llama Labs is Brian, Branson and Madison. We have done this before.</h2>
      <p className="sub"><a href={`${base}/about-brian`}>Brian Greenberg</a> built three companies on this exact system, customers finding him online and booking themselves, and sold all three. Branson and Madison run the day to day. Phoenix owners get Brian in person for the proposal.</p>
      <p className="note"><a href={`${base}/about-brian`}>Read Brian&rsquo;s story &rarr;</a></p></div>
    <img className="face" src="/v2/img/brian-greenberg.jpg" alt="Brian Greenberg" />
  </div>
</div></section>

<section id="qualify" className="qzsec"><div className="wrap">
  <p className="kicker">Book a walkthrough</p>
  <h2>Start here. What trade are you in?</h2>
  <p className="sub">Pick your trade, then a time on the calendar. About a minute.</p>
  <div className="starter">
    {TRADES.map((t) => (<a key={t} href={`${base}/book?trade=${encodeURIComponent(t)}`}>{t}</a>))}
    <a className="other" href={`${base}/book?trade=Other`}>Something else &rarr;</a>
  </div>
</div></section>

<section id="faq"><div className="wrap">
  <p className="kicker">Questions</p>
  <h2>The things every owner asks.</h2>
  <div className="faq">
    <details><summary>What does it cost?</summary><p>Every company is quoted on its own. On the walkthrough we write a marketing plan for your company with a number on it. You see the plan before you pay for anything, and you keep it either way.</p></details>
    <details><summary>I already have a website and ad accounts. Can you use them?</summary><p>Yes. We audit what you have on the first call, keep what is working and fix what is not. We never start over for the sake of it.</p></details>
    <details><summary>What if I want to leave?</summary><p>You leave with everything: the website code, the data, the phone numbers, the ad accounts. We will help the next provider get set up. Month to month, cancel any time.</p></details>
    <details><summary>Do you work outside Phoenix?</summary><p>Yes. Everything is remote-capable, and we expand city by city. Phoenix owners get Brian in person for the proposal.</p></details>
  </div>
</div></section>
</main>
      <V8Footer note="Version 8" />
    </>
  );
}
