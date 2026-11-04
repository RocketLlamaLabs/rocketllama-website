/* eslint-disable @next/next/no-img-element -- markup ported from the BBM Local mockup; swap for next/image during the redesign */

import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { V7Footer } from "@/components/v7/footer";

export const metadata: Metadata = {
  title: 'About Us',
  description: "Rocket Llama Labs is Brian, Branson and Madison. Brian built three companies on this system and sold all three.",
};

// About Us, moved off the home page on 4 November 2026.
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
<section id="who" className="feature"><div className="wrap">
  <p className="kicker">Who you are talking to</p>
  <h1>Rocket Llama Labs is Brian, Branson and Madison. We have done this before.</h1>
  <p className="sub"><a href="/v7/about-brian">Brian Greenberg</a> built three companies on this exact system, customers finding him online and booking themselves, and sold all three. Branson and Madison run the day to day. Phoenix owners get Brian in person for the proposal.</p>
  <p className="note"><a href="/v7/about-brian">Read Brian&rsquo;s story &rarr;</a></p>
</div></section>
</main>
      <V7Footer note='Version 7, about us' />
    </>
  );
}
