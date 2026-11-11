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
<IndustriesStructuredData />
<section id="industries"><div className="wrap">
  <p className="kicker">Industries</p>
  <h1>Every trade that goes to a customer&rsquo;s home.</h1>
  <p className="sub">If you send a truck to a house this is built for you. We start in your service area and expand city by city. Every lead comes from your own site and your own ads so it is yours alone, never sold to four other contractors.</p>
  <div className="trades"><a className="trade" href="/book?trade=HVAC"><span>HVAC</span></a><a className="trade" href="/book?trade=Plumbing"><span>Plumbing</span></a><a className="trade" href="/book?trade=Electrical"><span>Electrical</span></a><a className="trade" href="/book?trade=Roofing"><span>Roofing</span></a><a className="trade" href="/book?trade=Garage%20door"><span>Garage door</span></a><a className="trade" href="/book?trade=Pest%20control"><span>Pest control</span></a><a className="trade" href="/book?trade=Landscaping"><span>Landscaping</span></a><a className="trade" href="/book?trade=Painting"><span>Painting</span></a><a className="trade" href="/book?trade=Window%20and%20pressure%20washing"><span>Window and pressure washing</span></a><a className="trade" href="/book?trade=Handyman"><span>Handyman</span></a><a className="trade" href="/book?trade=Mobile%20mechanic"><span>Mobile mechanic</span></a><a className="trade" href="/book?trade=Windows%20and%20doors"><span>Windows and doors</span></a><a className="trade" href="/book?trade=Solar"><span>Solar</span></a><a className="trade" href="/book?trade=Flooring"><span>Flooring</span></a><a className="trade" href="/book?trade=Remodeling"><span>Remodeling</span></a></div>
</div></section>
</main>
      <V7Footer note='Version 7, industries' />
    </>
  );
}
