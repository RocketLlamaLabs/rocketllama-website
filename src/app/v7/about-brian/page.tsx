/* eslint-disable @next/next/no-img-element -- markup ported from the BBM Local mockup; swap for next/image during the redesign */

import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { V7Footer } from "@/components/v7/footer";

export const metadata: Metadata = {
  title: 'Brian Greenberg',
  description: "Brian Greenberg, co-founder and CEO of Rocket Llama Labs: twenty years of building businesses that get found online, and the author of The Salesman Who Doesn't Sell.",
};

// Ported from the mockup's src-c-about-brian.html.
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
    <p className="kicker">Brian Greenberg &middot; Co-Founder and CEO</p>
    <h1>&ldquo;Nobody wakes up wanting to be sold to. So don&rsquo;t sell. <em>Get found.</em>&rdquo;</h1>
    <p className="lede">Brian has spent more than twenty years building businesses that get found online. He built True Blue Life Insurance into a fully digital agency that sold in all 50 states with no cold calls, generating over $50 million in revenue through inbound marketing, and he has delivered the same local SEO and inbound playbook to home services companies, including Phoenix pool service companies. He is the author of <em>The Salesman Who Doesn&rsquo;t Sell</em> and a Million Dollar Round Table member.</p>
  </div>
</header>

<section id="story" className="feature"><div className="wrap">
  <div className="story">
    <div className="story-text">
      <h2>Born into building businesses.</h2>
      <p className="sub">Entrepreneurship is the family trade. Brian learned it from his father, and it was everywhere around him: his grandfather ran his own business, and so did every one of his uncles. Growing up in Highland Park, Illinois, he never seriously considered working for anyone else. The University of Arizona&rsquo;s Eller College of Management gave him the formal version, entrepreneurship and marketing, sharpened by the McGuire Entrepreneurship Program. Then he settled in Scottsdale, Arizona, and got to work.</p>
      <h2>Selling while he slept.</h2>
      <p className="sub">In 2003 Brian started two companies at once: True Blue Life Insurance and Wholesale Warehouse Supply, an e-commerce business. At True Blue he pioneered selling life insurance fully online, in all 50 states. No cold calls. No kitchen-table pitches. Content, search, funnels and automation did the selling, and the results followed: more than $1 million in annual premium for ten consecutive years, over $50 million in total revenue, and membership in the Million Dollar Round Table, the top 1% of financial professionals worldwide.</p>
      <h2>The same machine, for other businesses.</h2>
      <p className="sub">The inbound system that sold policies also powered Wholesale Warehouse Supply&rsquo;s online stores, and Brian has been delivering it to other businesses ever since. He built SEO Services Internet Marketing LLC, a digital marketing and SEO company, and later BJG Digital, a local services marketing agency that helped Phoenix pool service companies win their local market through local SEO, reviews and inbound funnels. He also leads Quoteplicity, quoting software for insurance agents whose funnels have generated more than 200,000 leads.</p>
      <h2>Rocket Llama Labs.</h2>
      <p className="sub">Rocket Llama Labs brings that playbook to local home services companies, run with modern AI tools so a small team delivers what used to take an agency floor. Brian&rsquo;s job as CEO is to keep the company pointed at the only thing that matters to a client: being the business people find first, and the one they call.</p>
    </div>
    <div className="story-side">
      <img className="portrait" src="/v2/img/brian-greenberg.jpg" alt="Brian Greenberg" />
      <div className="stats">
        <div><b>20+</b><span>years building businesses that get found online</span></div>
        <div><b>$50M+</b><span>in revenue through automated inbound funnels</span></div>
        <div><b>200,000+</b><span>leads generated by funnels Brian built</span></div>
        <div><b>Top 1%</b><span>Million Dollar Round Table member</span></div>
      </div>
    </div>
  </div>
</div></section>

<section id="book"><div className="wrap">
  <div className="book">
    <img className="cover" src="/v2/img/book-salesman.jpg" alt="The Salesman Who Doesn&rsquo;t Sell, by Brian J. Greenberg" />
    <div>
      <p className="kicker">The book</p>
      <h2>The Salesman Who Doesn&rsquo;t Sell</h2>
      <p className="sub"><b>A Marketing Guide to Making Money While You Sleep.</b> Foreword by Marques Colston, Super Bowl champion wide receiver.</p>
      <p className="sub">The theory behind inbound marketing: build systems that work on their own to bring people in. Reviews, reputation, transparency, SEO: a passive sales system that brings in customers 24/7, even as you sleep. The book is the exact playbook Brian used to do it, and the one Rocket Llama Labs runs for its clients.</p>
      <div className="ctas"><a className="btn" href="https://www.amazon.com/Salesman-Who-Doesnt-Sell-Marketing-ebook/dp/B078HMS1CQ" target="_blank" rel="noopener">Buy on Amazon</a><a className="btn ghost" href="https://www.audible.com/pd/The-Salesman-Who-Doesnt-Sell-A-Marketing-Guide-for-Making-Money-While-You-Sleep-Audiobook/B0794Q3418" target="_blank" rel="noopener">Listen on Audible</a></div>
    </div>
  </div>
</div></section>

<section id="press" className="feature"><div className="wrap">
  <p className="kicker">Press and credentials</p>
  <h2>Featured in Forbes, Entrepreneur, Fast Company, HuffPost, Bloomberg, USA Today, Yahoo Finance, Fox, NBC and CBS.</h2>
  <p className="sub">University of Arizona, Eller College of Management. McGuire Entrepreneurship Program. Million Dollar Round Table.</p>
  <div className="ctas"><a className="btn" href="/v7/book">Schedule a call</a><a className="btn ghost" href="/v7/about">Back to About Us</a></div>
</div></section>
</main>
      <V7Footer note='Version 7, about page' />
    </>
  );
}
