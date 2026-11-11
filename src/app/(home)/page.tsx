/* eslint-disable @next/next/no-img-element -- markup ported from the BBM Local mockup; swap for next/image during the redesign */

import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { HOME_META, HomeStructuredData } from "@/components/v7/home-seo";
import { V7Footer } from "@/components/v7/footer";
import { FullSystem, HowItWorks } from "@/components/v8/full-system";
import { SixtySecondCheck } from "@/components/v2/sixty-second-check";
import { Valley } from "@/components/v7/valley";
import { HeroCarousel } from "@/components/v7/hero-carousel";

export const metadata: Metadata = HOME_META;

// Ported from the mockup's src-c.html.
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
<HomeStructuredData />

<header className="hero" id="top">
  <div className="slides" aria-hidden="true">
    <img src="/v7/img/hero-hvac-1920.webp" srcSet="/v7/img/hero-hvac-800.webp 800w, /v7/img/hero-hvac-1280.webp 1280w, /v7/img/hero-hvac-1920.webp 1920w" sizes="100vw" alt="" className="on" fetchPriority="high" decoding="async" />
    <img src="/v7/img/hero-plumbing-1920.webp" srcSet="/v7/img/hero-plumbing-800.webp 800w, /v7/img/hero-plumbing-1280.webp 1280w, /v7/img/hero-plumbing-1920.webp 1920w" sizes="100vw" alt="" loading="lazy" decoding="async" />
    <img src="/v7/img/hero-electrical-1920.webp" srcSet="/v7/img/hero-electrical-800.webp 800w, /v7/img/hero-electrical-1280.webp 1280w, /v7/img/hero-electrical-1920.webp 1920w" sizes="100vw" alt="" loading="lazy" decoding="async" />
    <img src="/v7/img/hero-roofing-1920.webp" srcSet="/v7/img/hero-roofing-800.webp 800w, /v7/img/hero-roofing-1280.webp 1280w, /v7/img/hero-roofing-1920.webp 1920w" sizes="100vw" alt="" loading="lazy" decoding="async" />
  </div>
  <div className="wrap in">
   <div>
    <h1 className="tagline">Marketing and technology for home services</h1>
    <div className="rot">
      <div className="rslide"><h2>Your calendar should be <em>full.</em></h2><p className="lede">Built for HVAC companies, plumbers, electricians, roofers, and every home service trade. Every call, form submission, and estimate request gets a response in under 60 seconds and is booked directly onto your calendar. Track every marketing dollar all the way to a completed, paid job. You own the leads, the data, and the results.</p></div>
      <div className="rslide"><h2>Never miss a <em>call</em> again.</h2><p className="lede">When a new lead comes in, they get a text and email in under 60 seconds, written in your voice&mdash;even while at a job site. The system calls you first. If you can&rsquo;t answer, AI steps in to capture the customer&rsquo;s details, qualify the lead, and book the appointment directly on your calendar.</p></div>
      <div className="rslide"><h2>Show up where homeowners look <em>first.</em></h2><p className="lede">When they search Google, check Google Maps, or ask ChatGPT who to call, your business shows up. With a website you own that&rsquo;s built for search engines and AI, an optimized Google Business Profile, and ads running under your name, you&rsquo;re positioned to be the go-to home service company.</p></div>
      <div className="rslide"><h2>Know what every <em>dollar</em> brings in.</h2><p className="lede">No chasing clicks or digging through dashboards. Every call and form submission is tracked in a CRM you own, showing where each lead came from and how much revenue it generated. Real results&mdash;not guesswork&mdash;drive your marketing budget.</p></div>
    </div>
    <div className="ctas"><a className="btn" href="/book">Schedule a call</a><a className="btn light audit-btn" href="/audit">Run an instant audit</a></div>
   </div>
  </div>
  <div className="dots"><button type="button" aria-label="Picture 1"></button><button type="button" aria-label="Picture 2"></button><button type="button" aria-label="Picture 3"></button><button type="button" aria-label="Picture 4"></button></div>
</header>
<HeroCarousel />

<section id="quiz" className="qzsec quiz60"><div className="wrap">
  <p className="kicker">The 60-second check</p>
  <h2>How does your company show up online?</h2>
  <p className="sub">Four questions, one click each. You&rsquo;ll get a score out of 100 and see where you stand on your company&rsquo;s visibility. Know where you perform well and learn where you need to improve.</p>
  <SixtySecondCheck base="" cta="Schedule a call" alt={{ label: "Run an instant audit", href: "/audit" }} />
</div></section>

<section id="problem"><div className="wrap">
  <p className="kicker">Three ways good companies lose jobs</p>
  <h2>You buy your leads, answer them late, and can&rsquo;t be found where people look now.</h2>
  <p className="sub">Most home services marketing sells one tactic at a time: a lead generation list, an SEO package, an ad budget. HVAC, plumbing, electrical and roofing companies lose jobs in the gaps between them.</p>
  <div className="grid c3">
    <div className="card"><div className="n">1 <span className="sm">in</span> 5</div><h3>your odds on a shared lead</h3><p>A Yelp or Angi lead is sold to four other contractors, and you pay whether you win it or not. Ours come from your own site and your own ads: exclusive, and about a third of the cost per booked job.</p><span className="src">Top Three Web Design, 2026 · owner&rsquo;s field results</span></div>
    <div className="card"><div className="n">62% <span className="sm">vs</span> 28%</div><h3>close rate, fast vs average</h3><p>Answer inside two minutes and 62% of leads convert. The average company answers in 42 minutes and converts 28%. Only 12% of contractors respond inside five minutes.</p><span className="src">ServiceTitan, 2025 · Hatch, 2026</span></div>
    <div className="card"><div className="n">45%</div><h3>now ask an AI for a local pro</h3><p>Up from 6% a year earlier. AI Overviews appear on 68% of local-business searches. Most contractor websites have nothing an AI can read.</p><span className="src">Elev8 Operations roundup, 2026</span></div>
  </div>
</div></section>

<Valley base="" />

<FullSystem base="" id="fullsystem" photo={{ src: "/v7/img/band-van-1280.webp", alt: "A service van on a Phoenix street" }} detailed />
<HowItWorks base="" />
</main>
      <V7Footer note='Version 7 · built from the BBM Local mockup C' />
    </>
  );
}
