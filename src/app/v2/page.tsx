/* eslint-disable @next/next/no-img-element -- markup ported from the BBM Local mockup; swap for next/image during the redesign */

import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { V2Footer } from "@/components/v2/footer";
import { SixtySecondCheck } from "@/components/v2/sixty-second-check";
import { FreeScan } from "@/components/v2/free-scan";

export const metadata: Metadata = {
  title: 'Home',
  description: 'Website version 2 sample for Rocket Llama Labs: version 2 of the light design. Four-image banner that zooms and crossfades, the 30-second video, full-width image sections, the qualification quiz before booking.',
};

// Ported from the mockup's src-c.html.
export default function Page() {
  return (
    <>
<nav className="nav"><div className="wrap in">
  <a className="wm" href="/v2" aria-label="Rocket Llama Labs home"><img src="/brand/wordmark-horizontal-rocket-o.svg" alt="Rocket Llama Labs" /></a>
  <div className="links"><a href="#problem">Why us</a><a href="#check">60-second check</a><a href="/v2/services">Services</a><a href="/v2/services#video">The video</a><a href="#industries">Industries</a><a href="#pricing">Pricing</a><a href="#who">About</a></div>
  <a className="btn sm" href="/v2/book">Book a walkthrough</a>
</div></nav>
<main>

<header className="hero" id="top">
  <div className="slides" aria-hidden="true">
    <img src="/v2/img/hero-hvac.jpg" alt="" />
    <img src="/v2/img/hero-plumbing.jpg" alt="" />
    <img src="/v2/img/hero-electrical.jpg" alt="" />
    <img src="/v2/img/hero-roofing.jpg" alt="" />
  </div>
  <div className="wrap in">
    <p className="kicker">Marketing and technology for local home services</p>
    <h1>Your calendar should be <em>full.</em></h1>
    <p className="lede">For plumbers, electricians, HVAC, roofers and every trade that goes to a customer&rsquo;s home. Calls, forms and free-estimate requests, every one answered in under a minute and booked onto your calendar. Every dollar tracked to a paid job. You own all of it.</p>
    <div className="ctas"><a className="btn light" href="/v2/book">Book a walkthrough</a><a className="btn outline" href="#check">Take the 60-second check</a></div>
    <p className="trust"><b>Month to month.</b> No contracts. <b>Limited spots per trade per area.</b> Hosting free. <b>Not happy?</b> We work free until you are.</p>
  </div>
  <div className="dots" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
</header>

<section id="problem"><div className="wrap">
  <p className="kicker">Three ways good companies lose jobs</p>
  <h2>You buy your leads, answer them late, and can&rsquo;t be found where people look now.</h2>
  <div className="grid c3">
    <div className="card"><div className="n">1 in 5</div><h3>your odds on a shared lead</h3><p>A Yelp or Angi lead is sold to four other contractors, and you pay whether you win it or not. Ours come from your own site and your own ads: exclusive, and about a third of the cost per booked job.</p><span className="src">Top Three Web Design, 2026 · owner&rsquo;s field results</span></div>
    <div className="card"><div className="n">62% <span style={{fontSize:".5em",color:"var(--muted)"} as CSSProperties}>vs</span> 28%</div><h3>close rate, fast vs average</h3><p>Answer inside two minutes and 62% of leads convert. The average company answers in 42 minutes and converts 28%. Only 12% of contractors respond inside five minutes.</p><span className="src">ServiceTitan, 2025 · Hatch, 2026</span></div>
    <div className="card"><div className="n">45%</div><h3>now ask an AI for a local pro</h3><p>Up from 6% a year earlier. AI Overviews appear on 68% of local-business searches. Most contractor websites have nothing an AI can read.</p><span className="src">Elev8 Operations roundup, 2026</span></div>
  </div>
</div></section>

<section id="check" className="qzsec"><div className="wrap">
  <p className="kicker">The 60-second check</p>
  <h2>How does your company show up online?</h2>
  <p className="sub">Four questions, one tap each. You get a score out of 100 and the honest read on where the jobs are leaking. No email needed to see it.</p>
  <SixtySecondCheck />
</div></section>

<div className="band" style={{"--img":"url(/v2/img/band-van.jpg)"} as CSSProperties}><div className="wrap in">
  <p className="kicker">Speed to lead</p>
  <h2>Whether it calls or fills out a form, every lead is answered and booked.</h2>
  <p>Every new lead gets a text and an email in under a minute, in your voice, even when you are with a customer. The phone still rings you first, and if nobody can pick up, the AI books the appointment. One tracked number per source, so you know what made it ring.</p>
</div></div>

<section id="system" className="feature"><div className="wrap">
  <p className="kicker">The system on one page</p>
  <h2>Everything points to a website you own. Everything lands in a CRM you own.</h2>
  <p className="sub">Traffic from Google, Meta and your reviews feeds a site built for search and AI search. The site and the phones feed your CRM. The CRM books the job and records what it was worth, and that number decides next month&rsquo;s spend. <a href="/v2/services">See every service in detail.</a></p>
  <div className="list">
    <div className="li"><span className="d"></span><span><b>A website you own, hosted free</b><span>Next.js, code in your GitHub, on Vercel. Preview before live. Stop paying Wix or GoDaddy.</span></span></div>
    <div className="li"><span className="d"></span><span><b>Found by Google and by AI</b><span>Schema on every page: FAQs, authorship, services, and review stars per service, so Gemini and ChatGPT can recommend you.</span></span></div>
    <div className="li"><span className="d"></span><span><b>Google profile and reviews, worked hard</b><span>Complete profiles get 7 times more clicks. Review requests after every job, every review answered.</span></span></div>
    <div className="li"><span className="d"></span><span><b>Funnels, not contact forms</b><span>Qualifying questions, address autofill, your offer and your reviews, then a booking calendar or a call-back button.</span></span></div>
    <div className="li"><span className="d"></span><span><b>An AI receptionist that gets you the call first</b><span>Takes details, rings your team, and if nobody answers, books a callback or takes a message.</span></span></div>
    <div className="li"><span className="d"></span><span><b>Your CRM, with AI follow-up</b><span>Text and email reply in under a minute, pipelines, booking, call recording, closed-job value, the return-on-spend dashboard.</span></span></div>
    <div className="li"><span className="d"></span><span><b>Google, Local Services and Meta ads, in your name</b><span>Your accounts, your card, our management. Our funnels convert at 20 to 30% against a 5% industry average.</span></span></div>
    <div className="li"><span className="d"></span><span><b>Never locked in</b><span>Export your data, port your numbers, take the code. If you leave, we help the next provider.</span></span></div>
  </div>
</div></section>

<div className="band" id="proof" style={{"--img":"url(/v2/img/band-door.jpg)"} as CSSProperties}><div className="wrap in">
  <p className="kicker">Tracked to the job</p>
  <h2>We don&rsquo;t report clicks. We report booked jobs and what they were worth.</h2>
  <div className="bstats">
    <div><div className="b">$2 : $1</div><div className="l">Our floor: two dollars back for every dollar spent</div></div>
    <div><div className="b">$3 to $4</div><div className="l">What many clients see · owner&rsquo;s field results</div></div>
    <div><div className="b">&lt;60s</div><div className="l">AI reply to every new lead, text and email</div></div>
    <div><div className="b">1 per source</div><div className="l">Tracked phone numbers, so we know which ad made it ring</div></div>
  </div>
</div></div>

<section id="industries"><div className="wrap">
  <p className="kicker">Industries</p>
  <h2>Every trade that goes to a customer&rsquo;s home.</h2>
  <p className="sub">If you send a truck to a house, this is built for you. We start in Phoenix and limit how many clients we take per trade per service area, so our clients are never fighting each other for the same calls. Leads outside your area go to a trusted provider you approve, who sends you theirs.</p>
  <div className="trades"><a className="trade" href="/v2/book?trade=HVAC">HVAC</a><a className="trade" href="/v2/book?trade=Plumbing">Plumbing</a><a className="trade" href="/v2/book?trade=Electrical">Electrical</a><a className="trade" href="/v2/book?trade=Roofing">Roofing</a><a className="trade" href="/v2/book?trade=Garage%20door">Garage door</a><a className="trade" href="/v2/book?trade=Pest%20control">Pest control</a><a className="trade" href="/v2/book?trade=Landscaping">Landscaping</a><a className="trade" href="/v2/book?trade=Painting">Painting</a><a className="trade" href="/v2/book?trade=Window%20and%20pressure%20washing">Window and pressure washing</a><a className="trade" href="/v2/book?trade=Handyman">Handyman</a><a className="trade" href="/v2/book?trade=Mobile%20mechanic">Mobile mechanic</a><a className="trade" href="/v2/book?trade=Windows%20and%20doors">Windows and doors</a><a className="trade" href="/v2/book?trade=Solar">Solar</a><a className="trade" href="/v2/book?trade=Flooring">Flooring</a><a className="trade" href="/v2/book?trade=Remodeling">Remodeling</a><a className="trade other" href="/v2/book?trade=Other">Other home service &rarr;</a></div>
</div></section>

<div className="band center" style={{"--img":"url(/v2/img/band-landscaper.jpg)"} as CSSProperties}><div className="wrap in">
  <p className="kicker" style={{justifyContent:"center"} as CSSProperties}>The rule</p>
  <h2>We limit how many companies we take per trade per area. When the spots are gone, they&rsquo;re gone.</h2>
  <p>We cap how many companies we take in each trade and area, so our clients are never fighting each other for the same calls. Your spot is yours for as long as you are with us.</p>
  <div className="ctas" style={{justifyContent:"center"} as CSSProperties}><a className="btn light" href="/v2/book">Claim your spot</a></div>
</div></div>

<section id="pricing"><div className="wrap">
  <p className="kicker">Pricing</p>
  <h2>Put about 10% of revenue back into marketing. We spend it where you can see it.</h2>
  <p className="sub">Three lines, every month: the platform base that keeps your site, phones, AI and CRM running; our work, itemised; and the ad spend, billed to you directly by Google and Meta. Turn the ad and work lines down in slow months and up in busy ones.</p>
  <div className="panel">
    <div><h3>A $500K company, for example</h3><p>About $4,250 a month working for the business. Setup from scratch is $5,000 to $7,500, charged once, refunded if you do not like the website design we show you first. Already have a website or ad accounts? We keep what works, and your setup comes down. Monthly billing starts when the ads do.</p></div>
    <div className="split"><div><span>Platform base</span><span>$797</span></div><div><span>Our work</span><span>$1,063</span></div><div><span>Ad spend, paid to Google and Meta</span><span>$2,390</span></div><div><span>Total working for you</span><span>$4,250</span></div></div>
  </div>
</div></section>

<section id="who" className="feature"><div className="wrap">
  <p className="kicker">Who you are talking to</p>
  <h2>Rocket Llama Labs is Brian, Branson and Madison. We have done this before.</h2>
  <p className="sub"><a href="/v2/about-brian">Brian Greenberg</a> built three companies on this exact system, customers finding him online and booking themselves, and sold all three. Branson and Madison run the day to day. Phoenix owners get Brian in person for the proposal.</p>
  <p className="note"><a href="/v2/about-brian">Read Brian&rsquo;s story &rarr;</a></p>
</div></section>

<div className="band" style={{"--img":"url(/v2/img/band-neighborhood.jpg)"} as CSSProperties}><div className="wrap in">
  <p className="kicker">Phoenix first</p>
  <h2>Built in Phoenix, for the companies that keep Phoenix running.</h2>
  <p>Everything is remote-capable and we expand city by city. Phoenix owners get Brian in person for the proposal.</p>
</div></div>

<section id="qualify" className="qzsec"><div className="wrap">
  <p className="kicker">Book a walkthrough</p>
  <h2>Start here. What trade are you in?</h2>
  <p className="sub">Pick your trade, then a time on the calendar. About a minute. A few optional questions after, so the call is about you from the first minute. We limit how many companies we take per trade per area.</p>
  <div className="starter">
    <a href="/v2/book?trade=HVAC">HVAC</a>
    <a href="/v2/book?trade=Plumbing">Plumbing</a>
    <a href="/v2/book?trade=Electrical">Electrical</a>
    <a href="/v2/book?trade=Roofing">Roofing</a>
    <a href="/v2/book?trade=Garage%20door">Garage door</a>
    <a href="/v2/book?trade=Pest%20control">Pest control</a>
    <a href="/v2/book?trade=Landscaping">Landscaping</a>
    <a href="/v2/book?trade=Painting">Painting</a>
    <a href="/v2/book?trade=Handyman">Handyman</a>
    <a href="/v2/book?trade=Solar">Solar</a>
    <a className="other" href="/v2/book?trade=Other">Something else &rarr;</a>
  </div>
  <p className="note">Prefer to talk first? <a href="/v2/services">See every service</a> or <a href="/v2/book">go straight to booking</a>.</p>
</div></section>

<section id="scan"><div className="wrap">
  <p className="kicker">Free, no call</p>
  <h2>Not ready to talk? Get the free scan.</h2>
  <p className="sub">A written scan of how you show up online, against the top company in your trade in your area, with the three fixes that matter most.</p>
  <FreeScan />
</div></section>

<section id="faq"><div className="wrap">
  <p className="kicker">Questions</p>
  <h2>The things every owner asks.</h2>
  <div className="faq">
    <details><summary>What if I already get plenty of work from referrals?</summary><p>Good. Referrals check you on Google before they call, and referrals do not scale when you want a third truck. We make sure what they find closes the deal, and we build the second engine for when you want it.</p></details>
    <details><summary>I already have a website and ad accounts. Can you use them?</summary><p>Yes. We audit what you have on the first call, keep what is working and fix what is not. A site or ad account that is already set up simply lowers your setup fee, because there is less to build. We may tune them (tracking, landing pages, review schema, the way the phone is answered), but we never start over for the sake of it.</p></details>
    <details><summary>What if I want to leave?</summary><p>You leave with everything: the website code, the data, the phone numbers, the ad accounts. We will help the next provider get set up. Month to month, cancel any time.</p></details>
    <details><summary>Can I build a website with AI for free?</summary><p>You can, and it will look fine. Most AI-built sites are invisible to Google and to ChatGPT because nothing is structured underneath. Ours ship with the schema, the stars and the funnels wired in, on the same stack the professionals use, and you own the code.</p></details>
    <details><summary>Do you work outside Phoenix?</summary><p>Yes. Everything is remote-capable, and we expand city by city. Phoenix owners get Brian in person for the proposal.</p></details>
  </div>
</div></section>
</main>
      <V2Footer note='Version 2 sample · built from the BBM Local mockup C' />
    </>
  );
}
