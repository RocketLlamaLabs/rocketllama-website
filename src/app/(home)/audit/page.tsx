/* eslint-disable @next/next/no-img-element -- markup ported from the BBM Local mockup; swap for next/image during the redesign */

import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { pageMeta, PageStructuredData } from "@/components/v7/page-seo";
import { V7Footer } from "@/components/v7/footer";
import { InstantAudit } from "@/components/v7/instant-audit";

export const metadata: Metadata = pageMeta("/audit", "Run an instant audit", "See how your home service company shows up online in 20 seconds: Google Business Profile, reviews, website, phone and what the AI engines say about you.");

// The instant audit, on its own page since 4 November 2026.
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
      <a href="/services">Services</a><a href="/industries">Industries</a><div className="sublinks"><a href="/hvac">HVAC</a><a href="/plumbing">Plumbing</a><a href="/electrical">Electrical</a><a href="/roofing">Roofing</a><a href="/garage-door">Garage door</a><a href="/pest-control">Pest control</a><a href="/landscaping">Landscaping</a><a href="/painting">Painting</a><a href="/window-and-pressure-washing">Window and pressure washing</a><a href="/handyman">Handyman</a><a href="/mobile-mechanic">Mobile mechanic</a><a href="/windows-and-doors">Windows and doors</a><a href="/solar">Solar</a><a href="/flooring">Flooring</a><a href="/remodeling">Remodeling</a></div><a href="/about">About</a>
      <a className="btn sm" href="/book">Schedule a call</a>
    </div>
  </details>
</div></nav>
<script dangerouslySetInnerHTML={{__html:"document.addEventListener('click',function(e){var m=e.target.closest('.v7 .nav .menu');if(m){if(e.target.closest('a'))m.removeAttribute('open');}else{document.querySelectorAll('.v7 .nav .menu[open]').forEach(function(x){x.removeAttribute('open')})}});document.addEventListener('click',function(e){var b=e.target.closest('.v7 .team details.bio .less');if(b){var d=b.closest('details');d.removeAttribute('open');d.closest('.card').scrollIntoView({block:'nearest'})}})"}} />
<main>
<PageStructuredData path="/audit" name="Run an instant audit" description="See how your home service company shows up online in 20 seconds: Google Business Profile, reviews, website, phone and what the AI engines say about you." />
<section id="check" className="qzsec"><div className="wrap">
  <p className="kicker">The audit</p>
  <h1>See how you show up online. In 20 seconds.</h1>
  <p className="sub">Your Google profile, your reviews, your website, your phone and what the AI engines say about you, side by side with the top company in your trade in your area. No email, no call, no sales rep. Then decide.</p>
  <InstantAudit base="" />
</div></section>
</main>
      <V7Footer note='Version 7, audit' />
    </>
  );
}
