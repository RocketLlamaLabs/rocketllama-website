/* eslint-disable @next/next/no-img-element -- markup ported from the BBM Local mockup; swap for next/image during the redesign */

import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { pageMeta, IndustriesStructuredData } from "@/components/v7/page-seo";
import { V7Footer } from "@/components/v7/footer";

export const metadata: Metadata = pageMeta("/industries", "Industries", "Home services marketing for HVAC, plumbing, electrical, roofing, garage door, pest control, landscaping, painting and every trade that goes to a customer's home.");

// Industries, moved off the home page on 4 November 2026.
export default function Page() {
  return (
    <>
<nav className="nav" aria-label="Main"><div className="wrap in">
  <a className="wm" href="/" aria-label="Rocket Llama Labs home"><img src="/brand/logo-nav.svg" alt="Rocket Llama Labs" /></a>
  <div className="links"><a href="/services">Services</a><div className="dd"><a href="/industries" aria-haspopup="true">Industries</a><div className="ddmenu"><a href="/hvac">HVAC</a><a href="/plumbing">Plumbing</a><a href="/electrical">Electrical</a><a href="/roofing">Roofing</a><a href="/garage-door">Garage door</a><a href="/pest-control">Pest control</a><a href="/landscaping">Landscaping</a><a href="/painting">Painting</a><a href="/window-and-pressure-washing">Window and pressure washing</a><a href="/handyman">Handyman</a><a href="/mobile-mechanic">Mobile mechanic</a><a href="/windows-and-doors">Windows and doors</a><a href="/solar">Solar</a><a href="/flooring">Flooring</a><a href="/remodeling">Remodeling</a><a className="all" href="/industries">All industries</a></div></div><a href="/about">About</a></div>
  <div className="navbtns"><a className="btn sm" href="/book">Schedule a call</a><a className="btn sm ghost" href="/audit">Run an instant audit</a></div>
  <details className="menu">
    <summary aria-label="Menu"><span></span></summary>
    <div className="panel">
      <a href="/services">Services</a><a href="/industries">Industries</a><div className="sublinks"><a href="/hvac">HVAC</a><a href="/plumbing">Plumbing</a><a href="/electrical">Electrical</a><a href="/roofing">Roofing</a><a href="/garage-door">Garage door</a><a href="/pest-control">Pest control</a><a href="/landscaping">Landscaping</a><a href="/painting">Painting</a><a href="/window-and-pressure-washing">Window and pressure washing</a><a href="/handyman">Handyman</a><a href="/mobile-mechanic">Mobile mechanic</a><a href="/windows-and-doors">Windows and doors</a><a href="/solar">Solar</a><a href="/flooring">Flooring</a><a href="/remodeling">Remodeling</a></div><a href="/about">About</a>
      <a className="btn sm" href="/book">Schedule a call</a>
      <a className="btn sm ghost" href="/audit">Run an instant audit</a>
    </div>
  </details>
</div></nav>
<script dangerouslySetInnerHTML={{__html:"document.addEventListener('click',function(e){var m=e.target.closest('.v7 .nav .menu');if(m){if(e.target.closest('a'))m.removeAttribute('open');}else{document.querySelectorAll('.v7 .nav .menu[open]').forEach(function(x){x.removeAttribute('open')})}});document.addEventListener('click',function(e){var b=e.target.closest('.v7 .team details.bio .less');if(b){var d=b.closest('details');d.removeAttribute('open');d.closest('.card').scrollIntoView({block:'nearest'})}})"}} />
<main>
<IndustriesStructuredData />
<section id="industries"><div className="wrap">
  <p className="kicker">Industries</p>
  <h1>Every trade that goes to a customer&rsquo;s home.</h1>
  <p className="sub">If you send a truck to a house this is built for you. Pick your trade to see the marketing services we run for it. We start in your service area and expand city by city. Every lead comes from your own site and your own ads so it is yours alone, never sold to four other contractors.</p>
  <div className="trades"><a className="trade" href="/hvac"><span>HVAC</span></a><a className="trade" href="/plumbing"><span>Plumbing</span></a><a className="trade" href="/electrical"><span>Electrical</span></a><a className="trade" href="/roofing"><span>Roofing</span></a><a className="trade" href="/garage-door"><span>Garage door</span></a><a className="trade" href="/pest-control"><span>Pest control</span></a><a className="trade" href="/landscaping"><span>Landscaping</span></a><a className="trade" href="/painting"><span>Painting</span></a><a className="trade" href="/window-and-pressure-washing"><span>Pressure washing</span></a><a className="trade" href="/handyman"><span>Handyman</span></a><a className="trade" href="/mobile-mechanic"><span>Mobile mechanic</span></a><a className="trade" href="/windows-and-doors"><span>Windows and doors</span></a><a className="trade" href="/solar"><span>Solar</span></a><a className="trade" href="/flooring"><span>Flooring</span></a><a className="trade" href="/remodeling"><span>Remodeling</span></a></div>
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
</main>
      <V7Footer note='Version 7, industries' />
    </>
  );
}
