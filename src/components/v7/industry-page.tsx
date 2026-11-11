/* eslint-disable @next/next/no-img-element -- the banner uses a hand-built srcset over the pre-sized files in /public/v7/img */

import Link from "next/link";
import { V7Nav } from "@/components/v7/nav";
import { V7Footer } from "@/components/v7/footer";
import { IndustryStructuredData } from "@/components/v7/page-seo";
import { type Industry, INDUSTRY_AUTHOR, INDUSTRY_BY_SLUG, INDUSTRY_UPDATED, INDUSTRY_UPDATED_LABEL } from "@/components/v7/industries-data";

// One industry page (/hvac, /plumbing, ...). The layout follows the page
// template in docs/seo-playbook.md: banner, byline, summary, unique sections,
// FAQ, related pages. All copy comes from industries-data.ts.
export function IndustryPage({ ind }: { ind: Industry }) {
  const img = `/v7/img/${ind.image.stem}`;
  const book = `/book?trade=${encodeURIComponent(ind.name)}`;
  return (
    <>
      <V7Nav />
      <main>
        <IndustryStructuredData ind={ind} />

        <header className="ihero" id="top">
          <img
            className="bg"
            src={`${img}-1920.webp`}
            srcSet={`${img}-800.webp 800w, ${img}-1280.webp 1280w, ${img}-1920.webp 1920w`}
            sizes="100vw"
            width={1920}
            height={1080}
            alt={ind.image.alt}
            fetchPriority="high"
            decoding="async"
          />
          <div className="wrap in">
            <nav className="crumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/industries">Industries</Link><span aria-hidden="true">/</span><span aria-current="page">{ind.name}</span>
            </nav>
            <h1>{ind.h1}</h1>
            <p className="lede">{ind.lede}</p>
            <div className="ctas"><a className="btn" href={book}>Schedule a call</a><a className="btn light" href="/audit">Run an instant audit</a></div>
          </div>
        </header>

        <section id="summary" className="isum"><div className="wrap">
          <p className="byline">
            By <Link href={`/about/${INDUSTRY_AUTHOR.id}`} rel="author">{INDUSTRY_AUTHOR.name}</Link>, {INDUSTRY_AUTHOR.role}
            <span aria-hidden="true"> · </span>
            Updated <time dateTime={INDUSTRY_UPDATED}>{INDUSTRY_UPDATED_LABEL}</time>
          </p>
          <div className="box">
            <div>
              <p className="kicker">Summary</p>
              <h2>{ind.name} marketing services, in short</h2>
              <p className="answer">{ind.summary}</p>
            </div>
            <ul>{ind.facts.map((f) => <li key={f}>{f}</li>)}</ul>
          </div>
        </div></section>

        <section id="problem"><div className="wrap">
          <p className="kicker">The problem</p>
          <h2>{ind.problemsHeading}</h2>
          <div className="grid c3">
            {ind.problems.map(([h, p]) => <div className="card" key={h}><h3>{h}</h3><p>{p}</p></div>)}
          </div>
        </div></section>

        <section id="services" className="feature"><div className="wrap">
          <p className="kicker">What we do</p>
          <h2>{ind.servicesHeading}</h2>
          <p className="sub">One team builds and runs every piece, in your company&rsquo;s name. See <Link href="/services">how the whole system fits together</Link>.</p>
          <div className="svc">
            {ind.services.map(([k, h, p]) => <div className="card" key={k}><span className="k">{k}</span><h3>{h}</h3><p>{p}</p></div>)}
          </div>
        </div></section>

        <section id="searches"><div className="wrap">
          <p className="kicker">Search and AI search</p>
          <h2>{ind.searchesHeading}</h2>
          <p className="sub">{ind.searchesIntro}</p>
          <ul className="terms">{ind.searches.map((s) => <li key={s}>{s}</li>)}</ul>
        </div></section>

        <section id="how" className="feature"><div className="wrap">
          <p className="kicker">How it works</p>
          <h2>{ind.planHeading}</h2>
          <ol className="isteps">
            {ind.plan.map(([h, p], i) => <li key={h}><span className="n">{i + 1}</span><h3>{h}</h3><p>{p}</p></li>)}
          </ol>
        </div></section>

        <section id="faq"><div className="wrap">
          <p className="kicker">Questions</p>
          <h2>{ind.faqHeading}</h2>
          <div className="faq">
            {ind.faq.map(([q, a], i) => <details key={q} open={i === 0}><summary><h3>{q}</h3></summary><p>{a}</p></details>)}
          </div>
        </div></section>

        <section id="next" className="inext"><div className="wrap">
          <h2>{ind.cta[0]}</h2>
          <p className="sub">{ind.cta[1]}</p>
          <div className="ctas"><a className="btn" href={book}>Schedule a call</a><a className="btn ghost" href="/audit">Run an instant audit</a></div>
          <p className="rel">Related industries: {ind.related.map((s, i) => <span key={s}>{i > 0 ? ", " : ""}<Link href={`/${s}`}>{INDUSTRY_BY_SLUG[s].name} marketing</Link></span>)}, or <Link href="/industries">every trade we work with</Link>.</p>
        </div></section>
      </main>
      <V7Footer note={`Version 7, ${ind.slug}`} />
    </>
  );
}
