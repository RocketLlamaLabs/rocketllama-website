/* eslint-disable @next/next/no-img-element -- markup ported from the BBM Local mockup; swap for next/image during the redesign */

import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { V7Footer } from "@/components/v7/footer";

export const metadata: Metadata = {
  title: 'Industries',
  description: "Every trade that goes to a customer's home: HVAC, plumbing, electrical, roofing, garage door, pest control, landscaping and more.",
};

// Industries, moved off the home page on 4 November 2026.
export default function Page() {
  return (
    <>
<nav className="nav"><div className="wrap in">
  <a className="wm" href="/v7" aria-label="Rocket Llama Labs home"><img src="/brand/logo-nav.svg" alt="Rocket Llama Labs" /></a>
  <div className="links"><a href="/v7/services">Services</a><a href="/v7/industries">Industries</a><a href="/v7/about">About Us</a></div>
  <a className="btn sm" href="/v7/book">Schedule a call</a>
  <details className="menu">
    <summary aria-label="Menu"><span></span></summary>
    <div className="panel">
      <a href="/v7/services">Services</a><a href="/v7/industries">Industries</a><a href="/v7/about">About Us</a>
      <a className="btn sm" href="/v7/book">Schedule a call</a>
    </div>
  </details>
</div></nav>
<script dangerouslySetInnerHTML={{__html:"document.addEventListener('click',function(e){var m=e.target.closest('.v7 .nav .menu');if(m){if(e.target.closest('a'))m.removeAttribute('open');}else{document.querySelectorAll('.v7 .nav .menu[open]').forEach(function(x){x.removeAttribute('open')})}})"}} />
<main>
<section id="industries"><div className="wrap">
  <p className="kicker">Industries</p>
  <h1>Every trade that goes to a customer&rsquo;s home.</h1>
  <p className="sub">If you send a truck to a house, this is built for you. We start in Phoenix and expand city by city. Every lead comes from your own site and your own ads, so it is yours alone, never sold to four other contractors.</p>
  <div className="trades"><a className="trade" href="/v7/book?trade=HVAC">HVAC</a><a className="trade" href="/v7/book?trade=Plumbing">Plumbing</a><a className="trade" href="/v7/book?trade=Electrical">Electrical</a><a className="trade" href="/v7/book?trade=Roofing">Roofing</a><a className="trade" href="/v7/book?trade=Garage%20door">Garage door</a><a className="trade" href="/v7/book?trade=Pest%20control">Pest control</a><a className="trade" href="/v7/book?trade=Landscaping">Landscaping</a><a className="trade" href="/v7/book?trade=Painting">Painting</a><a className="trade" href="/v7/book?trade=Window%20and%20pressure%20washing">Window and pressure washing</a><a className="trade" href="/v7/book?trade=Handyman">Handyman</a><a className="trade" href="/v7/book?trade=Mobile%20mechanic">Mobile mechanic</a><a className="trade" href="/v7/book?trade=Windows%20and%20doors">Windows and doors</a><a className="trade" href="/v7/book?trade=Solar">Solar</a><a className="trade" href="/v7/book?trade=Flooring">Flooring</a><a className="trade" href="/v7/book?trade=Remodeling">Remodeling</a><a className="trade other" href="/v7/book?trade=Other">Other home service &rarr;</a></div>
</div></section>
</main>
      <V7Footer note='Version 7, industries' />
    </>
  );
}
