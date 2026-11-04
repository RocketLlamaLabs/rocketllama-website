/* eslint-disable @next/next/no-img-element -- markup ported from the BBM Local mockup; swap for next/image during the redesign */

import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { V7Footer } from "@/components/v7/footer";
import { InstantAudit } from "@/components/v7/instant-audit";

export const metadata: Metadata = {
  title: 'Run an instant audit',
  description: "See how your company shows up online in 20 seconds: your Google profile, reviews, website, phone and what the AI engines say, next to the top company in your trade.",
};

// The instant audit, on its own page since 4 November 2026.
export default function Page() {
  return (
    <>
<nav className="nav"><div className="wrap in">
  <a className="wm" href="/v7" aria-label="Rocket Llama Labs home"><img src="/brand/logo-nav.svg" alt="Rocket Llama Labs" /></a>
  <div className="links"><a href="/v7/services">Services</a><a href="/v7/industries">Industries</a><a href="/v7/about">About Us</a></div>
  <div className="navbtns"><a className="btn sm" href="/v7/book">Schedule a call</a><a className="btn sm ghost" href="/v7/audit">Run an instant audit</a></div>
  <details className="menu">
    <summary aria-label="Menu"><span></span></summary>
    <div className="panel">
      <a href="/v7/services">Services</a><a href="/v7/industries">Industries</a><a href="/v7/about">About Us</a>
      <a className="btn sm" href="/v7/book">Schedule a call</a>
      <a className="btn sm ghost" href="/v7/audit">Run an instant audit</a>
    </div>
  </details>
</div></nav>
<script dangerouslySetInnerHTML={{__html:"document.addEventListener('click',function(e){var m=e.target.closest('.v7 .nav .menu');if(m){if(e.target.closest('a'))m.removeAttribute('open');}else{document.querySelectorAll('.v7 .nav .menu[open]').forEach(function(x){x.removeAttribute('open')})}})"}} />
<main>
<section id="check" className="qzsec"><div className="wrap">
  <p className="kicker">The audit</p>
  <h1>See how you show up online. In 20 seconds.</h1>
  <p className="sub">Your Google profile, your reviews, your website, your phone and what the AI engines say about you, side by side with the top company in your trade in your area. No email, no call, no sales rep. Then decide.</p>
  <InstantAudit base="/v7" />
</div></section>
</main>
      <V7Footer note='Version 7, audit' />
    </>
  );
}
