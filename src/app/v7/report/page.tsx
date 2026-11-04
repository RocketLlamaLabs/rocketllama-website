/* eslint-disable @next/next/no-img-element -- markup ported from the BBM Local mockup; swap for next/image during the redesign */

import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { V7Footer } from "@/components/v7/footer";
import { ReportSection } from "@/components/v7/report-section";

export const metadata: Metadata = {
  title: 'The monthly report',
  description: "What a Rocket Llama Labs monthly report looks like: booked jobs by source, what they were worth, what it cost and what we changed.",
};

// The sample monthly report, moved off the home page on 4 November 2026.
export default function Page() {
  return (
    <>
<nav className="nav"><div className="wrap in">
  <a className="wm" href="/v7" aria-label="Rocket Llama Labs home"><img src="/brand/logo-nav.svg" alt="Rocket Llama Labs" /></a>
  <div className="links"><a href="/v7/about">About Us</a><a href="/v7/services">Services</a><a href="/v7/industries">Industries</a></div>
  <a className="btn sm" href="/v7/book">Schedule a call</a>
  <details className="menu">
    <summary aria-label="Menu"><span></span></summary>
    <div className="panel">
      <a href="/v7/about">About Us</a><a href="/v7/services">Services</a><a href="/v7/industries">Industries</a>
      <a className="btn sm" href="/v7/book">Schedule a call</a>
    </div>
  </details>
</div></nav>
<script dangerouslySetInnerHTML={{__html:"document.addEventListener('click',function(e){var m=e.target.closest('.v7 .nav .menu');if(m){if(e.target.closest('a'))m.removeAttribute('open');}else{document.querySelectorAll('.v7 .nav .menu[open]').forEach(function(x){x.removeAttribute('open')})}})"}} />
<main>
<ReportSection />
</main>
      <V7Footer note='Version 7, monthly report' />
    </>
  );
}
