/* eslint-disable @next/next/no-img-element -- markup ported from the BBM Local mockup; swap for next/image during the redesign */

import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { V2Footer } from "@/components/v2/footer";

export const metadata: Metadata = {
  title: 'Brian Greenberg',
  description: "Who is behind Rocket Llama Labs: Brian Greenberg, founder, author of The Salesman Who Doesn't Sell.",
};

// Ported from the mockup's src-c-about-brian.html.
export default function Page() {
  return (
    <>
<nav className="nav"><div className="wrap in">
  <a className="wm" href="/v2" aria-label="Rocket Llama Labs home"><img src="/brand/wordmark-horizontal-rocket-o.svg" alt="Rocket Llama Labs" /></a>
  <div className="links" style={{display:"flex"} as CSSProperties}><a className="backlink" href="/v2">&larr; Back to the site</a></div>
  <a className="btn sm" href="/v2/book">Book a walkthrough</a>
</div></nav>
<main>

<div style={{height:"12px"} as CSSProperties}></div>
<section id="who" className="feature"><div className="wrap">
  <p className="kicker">Who is behind Rocket Llama Labs</p>
  <h2>Brian Greenberg has done this before.</h2>
  <div className="who">
    <div className="pic">
      <a href="https://briangreenberg.com" target="_blank" rel="noopener" aria-label="Brian Greenberg, briangreenberg.com"><img className="face" src="/v2/img/brian-greenberg.jpg" alt="Brian Greenberg" width="800" height="968" loading="lazy" /></a>
      <a className="book" href="https://briangreenberg.com" target="_blank" rel="noopener"><img src="/v2/img/book-salesman.jpg" alt="The Salesman Who Doesn't Sell, by Brian Greenberg" width="323" height="500" loading="lazy" /></a>
    </div>
    <div className="bio">
      <h3><a href="https://briangreenberg.com" target="_blank" rel="noopener">Brian Greenberg</a></h3>
      <p className="role">Founder. Author of <a href="https://briangreenberg.com" target="_blank" rel="noopener"><em>The Salesman Who Doesn&rsquo;t Sell</em></a>, a marketing guide to making money while you sleep. More at <a href="https://briangreenberg.com" target="_blank" rel="noopener">briangreenberg.com</a>.</p>
      <p>Brian built <b>True Blue Life Insurance</b> from a one-person agency into a company that sold more than $50 million of policies online, ranked in the top 1% of agents worldwide, and sold it in 2022. He did it without cold calls: his customers found him on Google, read his reviews, and booked themselves. He built and sold two more companies the same way, an SEO agency in 2012 and BJG Digital in 2025, and today runs <b>Quoteplicity</b>, the quoting platform behind more than 200,000 insurance leads.</p>
      <p>&quot;I never wanted to pressure anyone. So I built systems where customers sell themselves.&quot; That system, the reviews, the search rankings and the booking funnel, is what Rocket Llama Labs installs for one trade in one area at a time. Branson and Madison run the day to day; Brian runs the strategy and sits in on every proposal.</p>
      <blockquote>&quot;I competed for the top spots on the internet nationally against the biggest players. Doing it for one city and one trade is the fight I want.&quot;<cite>Brian Greenberg</cite></blockquote>
      <div className="stats bio-stats">
        <div className="stat"><div className="b">$50M+</div><div className="l">sold online, no cold calls</div></div>
        <div className="stat"><div className="b">200,000+</div><div className="l">leads through his platform</div></div>
        <div className="stat"><div className="b">3</div><div className="l">companies built and sold</div></div>
      </div>
    </div>
  </div>
</div></section>

<section className="feature" style={{paddingTop:"0"} as CSSProperties}><div className="wrap"><p className="note">Branson and Madison run the day to day at Rocket Llama Labs. Their bios follow. <a href="/v2/book">Book a walkthrough</a> or <a href="/v2">back to the site</a>.</p></div></section>
</main>
      <V2Footer note='Version 2 sample, about page' />
    </>
  );
}
