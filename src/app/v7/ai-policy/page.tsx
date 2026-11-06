/* eslint-disable @next/next/no-img-element -- markup ported from the BBM Local mockup; swap for next/image during the redesign */

import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { V7Footer } from "@/components/v7/footer";
import { LegalBody, AI, EFFECTIVE } from "@/components/v7/legal-copy";

export const metadata: Metadata = {
  title: "AI Policy",
  description: "Where Rocket Llama Labs uses artificial intelligence, what it does, and where a person is responsible.",
  alternates: { canonical: "https://rocketllamalabs.com/v7/ai-policy" },
};

// AI Policy, built from src/components/v7/legal-copy.tsx.
export default function Page() {
  return (
    <>
<nav className="nav"><div className="wrap in">
  <a className="wm" href="/v7" aria-label="Rocket Llama Labs home"><img src="/brand/logo-nav.svg" alt="Rocket Llama Labs" /></a>
  <div className="links"><a href="/v7/services">Services</a><a href="/v7/industries">Industries</a><a href="/v7/about">About</a></div>
  <div className="navbtns"><a className="btn sm" href="/v7/book">Schedule a call</a><a className="btn sm ghost" href="/v7/audit">Run an instant audit</a></div>
  <details className="menu">
    <summary aria-label="Menu"><span></span></summary>
    <div className="panel">
      <a href="/v7/services">Services</a><a href="/v7/industries">Industries</a><a href="/v7/about">About</a>
      <a className="btn sm" href="/v7/book">Schedule a call</a>
      <a className="btn sm ghost" href="/v7/audit">Run an instant audit</a>
    </div>
  </details>
</div></nav>
<script dangerouslySetInnerHTML={{__html:"document.addEventListener('click',function(e){var m=e.target.closest('.v7 .nav .menu');if(m){if(e.target.closest('a'))m.removeAttribute('open');}else{document.querySelectorAll('.v7 .nav .menu[open]').forEach(function(x){x.removeAttribute('open')})}})"}} />
<main>
<header className="pagehead" id="top">
  <div className="wrap in">
    <p className="kicker">Legal</p>
    <h1>AI Policy</h1>
    <p className="lede">Where we use artificial intelligence, what it does, and where a person is responsible. Effective {EFFECTIVE}.</p>
  </div>
</header>
<section className="feature"><div className="wrap">
  <LegalBody sections={AI} />
</div></section>
</main>
      <V7Footer note='Version 7, ai policy' />
    </>
  );
}
