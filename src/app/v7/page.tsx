/* eslint-disable @next/next/no-img-element -- markup ported from the BBM Local mockup; swap for next/image during the redesign */

import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { V7Footer } from "@/components/v7/footer";
import { FullSystem, HowItWorks } from "@/components/v8/full-system";
import { SixtySecondCheck } from "@/components/v2/sixty-second-check";
import { Valley } from "@/components/v7/valley";
import { Race } from "@/components/v7/race";

export const metadata: Metadata = {
  title: { absolute: "Rocket Llama Labs · Version 7" },
  description: 'Marketing and technology for local home services in Phoenix: a website you own, every lead answered in under a minute, every dollar tracked to a paid job. Four-image banner that zooms and crossfades, the 30-second video, full-width image sections, the qualification quiz before booking.',
};

// Ported from the mockup's src-c.html.
export default function Page() {
  return (
    <>
<nav className="nav"><div className="wrap in">
  <a className="wm" href="/v7" aria-label="Rocket Llama Labs home"><img src="/brand/logo-nav.svg" alt="Rocket Llama Labs" /></a>
  <div className="links"><a href="/v7/about">About Us</a><a href="/v7/services">Services</a><a href="#industries">Industries</a></div>
  <a className="btn sm" href="/v7/book">Schedule a call</a>
  <details className="menu">
    <summary aria-label="Menu"><span></span></summary>
    <div className="panel">
      <a href="/v7/about">About Us</a><a href="/v7/services">Services</a><a href="#industries">Industries</a>
      <a className="btn sm" href="/v7/book">Schedule a call</a>
    </div>
  </details>
</div></nav>
<script dangerouslySetInnerHTML={{__html:"document.addEventListener('click',function(e){var m=e.target.closest('.v7 .nav .menu');if(m){if(e.target.closest('a'))m.removeAttribute('open');}else{document.querySelectorAll('.v7 .nav .menu[open]').forEach(function(x){x.removeAttribute('open')})}})"}} />
<main>

<header className="hero" id="top">
  <div className="slides" aria-hidden="true">
    <img src="/v2/img/hero-hvac.jpg" alt="" />
    <img src="/v2/img/hero-plumbing.jpg" alt="" />
    <img src="/v2/img/hero-electrical.jpg" alt="" />
    <img src="/v2/img/hero-roofing.jpg" alt="" />
  </div>
  <div className="wrap in">
   <div>
    <h1 className="tagline">Marketing and technology for local home services</h1>
    <div className="rot">
      <div className="rslide"><h2>Your calendar should be <em>full.</em></h2><p className="lede">For plumbers, electricians, HVAC, roofers and every trade that goes to a customer&rsquo;s home. Calls, forms and free-estimate requests, every one answered in under a minute and booked onto your calendar. Every dollar tracked to a paid job. You own all of it.</p></div>
      <div className="rslide"><h2>Every call <em>answered</em> in under a minute.</h2><p className="lede">Calls, forms and estimate requests get a text and an email back in under a minute, in your voice, even when you are on a job. The phone still rings you first. If nobody can pick up, the AI books the appointment.</p></div>
      <div className="rslide"><h2>Be the company Google and AI <em>recommend.</em></h2><p className="lede">When a homeowner searches, or asks ChatGPT, for someone in your trade in your city, the answer should be you. A website you own that search engines and AI can read, your Google profile and reviews worked hard, and ads in your name.</p></div>
      <div className="rslide"><h2>Every dollar tracked to a <em>paid job.</em></h2><p className="lede">We do not report clicks. Every call and form lands in a CRM you own with its source and what the job was worth, and that number sets next month&rsquo;s spend. You see exactly what the marketing brought in.</p></div>
    </div>
    <div className="ctas"><a className="btn light" href="/v7/book">Schedule a call</a><a className="btn outline" href="/v7/audit">Run the audit</a></div>
   </div>
  </div>
  <div className="dots" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
</header>

<section id="quiz" className="qzsec quiz60"><div className="wrap">
  <p className="kicker">The 60-second check</p>
  <h2>How does your company show up online?</h2>
  <p className="sub">Four questions, one tap each. You get a score out of 100 and the honest read on where the jobs are leaking. No email needed to see it.</p>
  <SixtySecondCheck base="/v7" cta="Schedule a call" alt={{ label: "Run an audit", href: "/v7/audit" }} />
</div></section>

<section id="problem"><div className="wrap">
  <p className="kicker">Three ways good companies lose jobs</p>
  <h2>You buy your leads, answer them late, and can&rsquo;t be found where people look now.</h2>
  <div className="grid c3">
    <div className="card"><div className="n">1 in 5</div><h3>your odds on a shared lead</h3><p>A Yelp or Angi lead is sold to four other contractors, and you pay whether you win it or not. Ours come from your own site and your own ads: exclusive, and about a third of the cost per booked job.</p><span className="src">Top Three Web Design, 2026 · owner&rsquo;s field results</span></div>
    <div className="card"><div className="n">62% <span style={{fontSize:".5em",color:"var(--accent)"} as CSSProperties}>vs</span> 28%</div><h3>close rate, fast vs average</h3><p>Answer inside two minutes and 62% of leads convert. The average company answers in 42 minutes and converts 28%. Only 12% of contractors respond inside five minutes.</p><span className="src">ServiceTitan, 2025 · Hatch, 2026</span></div>
    <div className="card"><div className="n">45%</div><h3>now ask an AI for a local pro</h3><p>Up from 6% a year earlier. AI Overviews appear on 68% of local-business searches. Most contractor websites have nothing an AI can read.</p><span className="src">Elev8 Operations roundup, 2026</span></div>
  </div>
</div></section>

<Valley base="/v7" />
<Race />

<section id="system" className="feature"><div className="wrap">
  <p className="kicker">The system on one page</p>
  <h2>Everything points to a website <em>you</em> own. Everything lands in a CRM <em>you</em> own.</h2>
  <p className="sub">Traffic from Google, Meta and your reviews feeds a site built for search and AI search. The site and the phones feed your CRM. The CRM books the job and records what it was worth, and that number decides next month&rsquo;s spend. <a href="/v7/services">See every service in detail.</a></p>
  <p className="trust"><b>Month to month.</b> No contracts. <b>You own everything:</b> the site, the data, the numbers and the ad accounts.</p>
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
  <p className="note"><a href="/v7/report">See a sample monthly report &rarr;</a></p>
</div></section>


<section id="industries"><div className="wrap">
  <p className="kicker">Industries</p>
  <h2>Every trade that goes to a customer&rsquo;s home.</h2>
  <p className="sub">If you send a truck to a house, this is built for you. We start in Phoenix and expand city by city. Every lead comes from your own site and your own ads, so it is yours alone, never sold to four other contractors.</p>
  <div className="trades"><a className="trade" href="/v7/book?trade=HVAC">HVAC</a><a className="trade" href="/v7/book?trade=Plumbing">Plumbing</a><a className="trade" href="/v7/book?trade=Electrical">Electrical</a><a className="trade" href="/v7/book?trade=Roofing">Roofing</a><a className="trade" href="/v7/book?trade=Garage%20door">Garage door</a><a className="trade" href="/v7/book?trade=Pest%20control">Pest control</a><a className="trade" href="/v7/book?trade=Landscaping">Landscaping</a><a className="trade" href="/v7/book?trade=Painting">Painting</a><a className="trade" href="/v7/book?trade=Window%20and%20pressure%20washing">Window and pressure washing</a><a className="trade" href="/v7/book?trade=Handyman">Handyman</a><a className="trade" href="/v7/book?trade=Mobile%20mechanic">Mobile mechanic</a><a className="trade" href="/v7/book?trade=Windows%20and%20doors">Windows and doors</a><a className="trade" href="/v7/book?trade=Solar">Solar</a><a className="trade" href="/v7/book?trade=Flooring">Flooring</a><a className="trade" href="/v7/book?trade=Remodeling">Remodeling</a><a className="trade other" href="/v7/book?trade=Other">Other home service &rarr;</a></div>
</div></section>

<FullSystem base="/v7" id="fullsystem" />
<HowItWorks base="/v7" />
</main>
      <V7Footer note='Version 7 · built from the BBM Local mockup C' />
    </>
  );
}
