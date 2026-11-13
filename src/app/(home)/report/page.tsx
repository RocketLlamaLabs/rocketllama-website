/* eslint-disable @next/next/no-img-element -- markup ported from the BBM Local mockup; swap for next/image during the redesign */

import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { pageMeta, PageStructuredData } from "@/components/v7/page-seo";
import { V7Footer } from "@/components/v7/footer";
import { ReportSection } from "@/components/v7/report-section";

export const metadata: Metadata = pageMeta("/report", "The monthly report", "What a Rocket Llama Labs monthly report looks like: booked jobs by source, what they were worth, what it cost and what we changed.");

// The sample monthly report, moved off the home page on 4 November 2026.
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
<PageStructuredData path="/report" name="The monthly report" description="What a Rocket Llama Labs monthly report looks like: booked jobs by source, what they were worth, what it cost and what we changed." />
<ReportSection heading="h1" />
</main>
      <V7Footer note='Version 7, monthly report' />
    </>
  );
}
