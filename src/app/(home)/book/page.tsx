/* eslint-disable @next/next/no-img-element -- markup ported from the BBM Local mockup; swap for next/image during the redesign */

import type { Metadata } from "next";
import { pageMeta, PageStructuredData } from "@/components/v7/page-seo";
import { V7Footer } from "@/components/v7/footer";
import { V7Nav } from "@/components/v7/nav";
import { BookFunnel } from "@/components/v2/book-funnel";

export const metadata: Metadata = pageMeta("/book", "Schedule a call", "Pick a time for a call with Rocket Llama Labs. We look at how your home service company shows up online and write a marketing plan with a number on it.");

// Ported from the mockup's src-c-book.html.
export default function Page() {
  return (
    <>
<V7Nav onBook />
<main>
<PageStructuredData path="/book" name="Schedule a call" description="Pick a time for a call with Rocket Llama Labs. We look at how your home service company shows up online and write a marketing plan with a number on it." />

<header className="fhero" id="top"><div className="wrap in">
  <p className="kicker">Schedule a call</p>
  <h1>Pick a time.</h1>
  <p>Book a call and we will provide a free audit of how you show up online: your Google profile, your reviews, your website, and how your phone gets answered. No obligation.</p>
</div></header>

<section className="funnel"><div className="wrap in">
  <div className="qzcol">
    <BookFunnel tz="Arizona time" short />
  </div>
</div></section>
</main>
      <V7Footer note='Version 7, booking funnel' />
    </>
  );
}
