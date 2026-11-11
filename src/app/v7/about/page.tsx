/* eslint-disable @next/next/no-img-element -- markup ported from the BBM Local mockup; swap for next/image during the redesign */

import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { V7Footer } from "@/components/v7/footer";
import { AboutStructuredData, ABOUT_FAQ } from "@/components/v7/about-seo";

export const metadata: Metadata = {
  title: { absolute: "About Rocket Llama Labs: the Phoenix marketing team for home service companies" },
  description: "Rocket Llama Labs is Brian Greenberg, Branson Cobb and Madison Schantz, a Phoenix, Arizona team that builds and runs the whole marketing system for home service companies: website, search and AI search, ads, reviews, phones, AI receptionist and CRM. Every lead answered in under a minute, every dollar tracked to a paid job, and you own all of it.",
  alternates: { canonical: "https://rocketllamalabs.com/v7/about" },
  openGraph: {
    type: "website",
    url: "https://rocketllamalabs.com/v7/about",
    siteName: "Rocket Llama Labs",
    title: "About Rocket Llama Labs",
    description: "The Phoenix marketing and technology team for home service companies. Brian Greenberg, Branson Cobb and Madison Schantz build and run one system that gets you found, answers every lead in under a minute, and tracks every dollar to a paid job.",
    images: [{ url: "https://rocketllamalabs.com/v7/og.png", width: 1200, height: 630, alt: "Rocket Llama Labs: marketing and technology for home services" }],
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: "About Rocket Llama Labs", description: "The Phoenix marketing and technology team for home service companies.", images: ["https://rocketllamalabs.com/v7/og.png"] },
};

// About Us, on its own page. The story section is a placeholder until the owners supply their copy.
export default function Page() {
  return (
    <>
<nav className="nav" aria-label="Main"><div className="wrap in">
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
<script dangerouslySetInnerHTML={{__html:"document.addEventListener('click',function(e){var m=e.target.closest('.v7 .nav .menu');if(m){if(e.target.closest('a'))m.removeAttribute('open');}else{document.querySelectorAll('.v7 .nav .menu[open]').forEach(function(x){x.removeAttribute('open')})}});document.addEventListener('click',function(e){var b=e.target.closest('.v7 .team details.bio .less');if(b){var d=b.closest('details');d.removeAttribute('open');d.closest('.card').scrollIntoView({block:'nearest'})}})"}} />
<main>
<header className="pagehead about-head" id="top">
  <div className="wrap in">
    <p className="kicker">About us</p>
    <h1>Built for the Trades. Powered by Experience. Driven by Results.</h1>
    <p className="lede">Rocket Llama Labs is a Phoenix, Arizona-based marketing and technology company dedicated to helping home service businesses build stronger operations, attract more customers, and achieve sustainable growth.</p>
    <p className="lede">We specialize in the industries that keep homes running&mdash;from HVAC, plumbing, electrical, and roofing to garage doors, pest control, landscaping, painting, and virtually every trade that serves homeowners.</p>
    <p className="lede">We are more than a marketing agency. We are a complete growth and technology partner.</p>
    <p className="lede">Our approach is built around a simple principle: successful businesses need more than individual marketing campaigns, disconnected software, or strategies that look good on paper. They need integrated systems that work together to generate opportunities, improve efficiency, strengthen customer relationships, and support long-term growth.</p>
    <p className="lede">That&rsquo;s where Rocket Llama Labs comes in.</p>
    <p className="lede">We don&rsquo;t simply make recommendations and leave businesses to figure out the execution. We design, build, implement, manage, and continuously improve the systems that help home service companies operate and grow.</p>
    <p className="lede">What truly sets us apart is our foundation in real-world experience. The solutions we deliver are rooted in work we&rsquo;ve already done, challenges we&rsquo;ve already addressed, and systems we&rsquo;ve already implemented. We believe in applying practical experience rather than asking our clients to gamble on unproven ideas.</p>
    <p className="lede">We understand that home service companies have unique demands. Every missed call can mean a lost opportunity. Every inefficient process can affect profitability. And every customer interaction can determine whether a business earns a one-time job or a relationship that lasts for years.</p>
    <p className="lede">Our mission is to bring marketing, technology, and business execution together into one coordinated approach&mdash;giving home service companies the tools, systems, and support they need to compete with confidence.</p>
    <p className="lede">Whether you&rsquo;re an established contractor looking to modernize your business or a growing home service company ready to reach the next level, Rocket Llama Labs is built to help you move forward.</p>
    <p className="lede">We don&rsquo;t just build marketing. We build the systems behind better businesses.</p>
  </div>
</header>

<section id="team"><div className="wrap">
  <p className="kicker">The team</p>
  <h2>Three people. One system.</h2>
  <div className="team">
    <article className="card"><img className="headshot photo" src="/v7/brian-greenberg.jpg" alt="Brian Greenberg, CEO of Rocket Llama Labs" /><h3 id="brian-greenberg">Brian Greenberg</h3><p className="role">CEO</p><p>Brian sets the strategy and the marketing playbook for every client. He has spent more than twenty years building businesses that get found online, including a fully digital insurance agency that generated $50M+ through inbound marketing, and he wrote <em>The Salesman Who Doesn&rsquo;t Sell</em>. He has run that same playbook for Phoenix home service companies.</p><details className="bio"><summary>Read more</summary><p>Entrepreneurship is the family trade. Brian learned it from his father, and it was everywhere around him: his grandfather ran his own business, and so did every one of his uncles. Growing up in Highland Park, Illinois, he never seriously considered working for anyone else. The University of Arizona&rsquo;s Eller College of Management gave him the formal version, entrepreneurship and marketing, sharpened by the McGuire Entrepreneurship Program. Then he settled in Scottsdale, Arizona, and got to work.</p><p>In 2003 Brian started two companies at once: True Blue Life Insurance and Wholesale Warehouse Supply, an e-commerce business. At True Blue he pioneered selling life insurance fully online, in all 50 states. No cold calls. No kitchen-table pitches. Content, search, funnels and automation did the selling, and the results followed: more than $1 million in annual premium for ten consecutive years, over $50 million in total revenue, and membership in the Million Dollar Round Table, the top 1% of financial professionals worldwide.</p><p>The inbound system that sold policies also powered Wholesale Warehouse Supply&rsquo;s online stores, and Brian has been delivering it to other businesses ever since. He built SEO Services Internet Marketing LLC, a digital marketing and SEO company, and later BJG Digital, a local services marketing agency that helped Phoenix pool service companies win their local market through local SEO, reviews and inbound funnels. He also leads Quoteplicity, quoting software for insurance agents whose funnels have generated more than 200,000 leads.</p><p>Rocket Llama Labs brings that playbook to local home services companies, run with modern AI tools so a small team delivers what used to take an agency floor. Brian&rsquo;s job as CEO is to keep the company pointed at the only thing that matters to a client: being the business people find first, and the one they call.</p><p>He is the author of <em>The Salesman Who Doesn&rsquo;t Sell: A Marketing Guide to Making Money While You Sleep</em>, with a foreword by Marques Colston, Super Bowl champion wide receiver. <a href="https://www.amazon.com/Salesman-Who-Doesnt-Sell-Marketing-ebook/dp/B078HMS1CQ" target="_blank" rel="noopener">Buy on Amazon</a> or <a href="https://www.audible.com/pd/The-Salesman-Who-Doesnt-Sell-A-Marketing-Guide-for-Making-Money-While-You-Sleep-Audiobook/B0794Q3418" target="_blank" rel="noopener">listen on Audible</a>. Featured in Forbes, Entrepreneur, Fast Company, HuffPost, Bloomberg, USA Today, Yahoo Finance, Fox, NBC and CBS.</p><button type="button" className="less">Read less</button></details></article>
    <article className="card"><img className="headshot photo" src="/v7/branson-cobb.jpg" alt="Branson Cobb, President and COO of Rocket Llama Labs" /><h3 id="branson-cobb">Branson Cobb</h3><p className="role">President and COO</p><p>Branson runs the business and every client relationship. He spent more than 23 years leading sales, business development and client strategy for some of the country&rsquo;s largest healthcare organizations, and he brings that growth discipline to home service companies that want more qualified leads and measurable results.</p><details className="bio"><summary>Read more</summary><p>Before launching Rocket Llama Labs, Branson served as Market President for CBIZ&rsquo;s Arizona and California offices, where he led market growth, business operations and client retention initiatives. Prior to CBIZ, he spent more than five years with Aetna, leading business development for Arizona&rsquo;s Public and Labor segment and helping organizations develop strategic growth initiatives.</p><p>Branson began his career at Cigna, where he spent 13 years advancing from Medical and Dental Underwriter to Senior Account Executive. His background in underwriting, analytics, account management and sales gave him a unique ability to connect financial insights with business strategy, an approach he continues to bring to every client relationship today.</p><p>At Rocket Llama Labs, Branson believes great marketing is not about chasing trends. It is about building systems that consistently generate leads, drive revenue and help business owners focus on what they do best. His forward-looking approach combines data-driven decision-making with innovative marketing strategies designed specifically for home service businesses.</p><p>Outside of work, Branson enjoys traveling, scuba diving, skiing and fishing with his dad. He earned his Bachelor of Science in Finance from the University of Arizona.</p><button type="button" className="less">Read less</button></details></article>
    <article className="card"><img className="headshot photo" src="/v7/madison.jpg" alt="Madison Schantz, Chief Marketing Officer at Rocket Llama Labs" /><h3 id="madison-schantz">Madison Schantz</h3><p className="role">Chief Marketing Officer</p><p>Madison designs the brand, the website and the AI-powered tools each client runs on. Her background spans branding, web design, AI content and digital strategy, and she builds every piece so a home service company looks strong online and turns visitors into booked jobs.</p><details className="bio"><summary>Read more</summary><p>Madison is a creative digital designer, branding specialist, AI content creator and digital architecture expert with a passion for transforming innovative ideas into meaningful digital experiences. With experience in website design, brand development, artificial intelligence and digital strategy, she specializes in creating visually compelling, functional and user-friendly solutions that help businesses establish a strong and memorable online presence.</p><p>Her expertise combines creative design with emerging technology, allowing her to develop cohesive brand identities, modern websites and AI-powered digital solutions tailored to each client&rsquo;s unique vision. As a digital architect, Madison focuses on the balance between aesthetics, functionality and strategy, ensuring every project is thoughtfully designed to enhance user experience, strengthen brand recognition and support long-term growth.</p><p>Driven by curiosity and a passion for innovation, Madison enjoys exploring new technologies, creative trends and opportunities to push the boundaries of traditional digital design. She values attention to detail, strategic thinking and bringing fresh perspectives to every project.</p><p>Outside of her professional work, Madison enjoys working out, reading and traveling. She has a strong appreciation for personal growth, wellness and discovering new places and cultures. These interests inspire her creativity, broaden her perspective and encourage her to continuously learn, evolve and approach both life and work with an open mind.</p><button type="button" className="less">Read less</button></details></article>
  </div>
</div></section>

<section id="faq" className="feature"><div className="wrap">
  <p className="kicker">Questions</p>
  <h2>The short version.</h2>
  <div className="faq">
    {ABOUT_FAQ.map(([q, a]) => (<details key={q}><summary>{q}</summary><p>{a}</p></details>))}
  </div>
</div></section>
</main>
      <V7Footer note='Version 7, about us' />
    </>
  );
}
