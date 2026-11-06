/* eslint-disable @next/next/no-img-element -- markup ported from the BBM Local mockup; swap for next/image during the redesign */

import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { V7Footer } from "@/components/v7/footer";

export const metadata: Metadata = {
  title: 'About Us',
  description: "Who is behind Rocket Llama Labs and why we built it for home service companies.",
};

// About Us, on its own page. The story section is a placeholder until the owners supply their copy.
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
<header className="hero small" id="top">
  <div className="slides" aria-hidden="true" style={{backgroundImage:"url(/v2/img/band-neighborhood.jpg)"} as CSSProperties}></div>
  <div className="wrap in">
    <p className="kicker">About us</p>
    <h1>Built by people who have <em>done this before.</em></h1>
    <p className="lede">Rocket Llama Labs is Brian, Branson and Madison. We build and run the whole marketing system for home service companies, and we have grown and sold companies on it ourselves.</p>
  </div>
</header>

<section id="story" className="feature"><div className="wrap">
  <p className="kicker">Our story</p>
  <h2>Who we are and why we built this.</h2>
  <div className="story">
    <div className="story-text">
      <p className="sub">[Your story goes here. Two or three short paragraphs: where the three of you came from, what you ran before Rocket Llama Labs, and why you built a marketing system for home service companies instead of selling tactics one at a time.]</p>
      <p className="sub">[A second paragraph for what you believe about the work: owning your leads, answering in under a minute, tracking every dollar to a paid job.]</p>
      <p className="note"><a href="/v7/about-brian">Read Brian&rsquo;s story &rarr;</a></p>
    </div>
    <div className="story-photo" aria-label="Team photo placeholder"><span>Team photo</span></div>
  </div>
</div></section>

<section id="team"><div className="wrap">
  <p className="kicker">The team</p>
  <h2>Three people. One system.</h2>
  <div className="team">
    <article className="card"><div className="headshot"><span>Photo</span></div><h3>Brian Greenberg</h3><p className="role">[Role]</p><p>[Two sentences about Brian.]</p></article>
    <article className="card"><div className="headshot"><span>Photo</span></div><h3>Branson</h3><p className="role">[Role]</p><p>[Two sentences about Branson.]</p></article>
    <article className="card"><div className="headshot"><span>Photo</span></div><h3>Madison</h3><p className="role">[Role]</p><p>[Two sentences about Madison.]</p></article>
  </div>
  <div className="ctas"><a className="btn" href="/v7/book">Schedule a call</a><a className="btn ghost" href="/v7/audit">Run an instant audit</a></div>
</div></section>
</main>
      <V7Footer note='Version 7, about us' />
    </>
  );
}
