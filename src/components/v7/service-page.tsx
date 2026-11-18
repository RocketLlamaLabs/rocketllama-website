import Link from "next/link";
import { V7Nav } from "@/components/v7/nav";
import { V7Footer } from "@/components/v7/footer";
import { ServiceStructuredData } from "@/components/v7/page-seo";
import { INDUSTRY_AUTHOR } from "@/components/v7/industries-data";
import { type ServiceDetail, SERVICE_BY_SLUG, SERVICE_UPDATED, SERVICE_UPDATED_LABEL } from "@/components/v7/services-data";

// One service page (/services/websites, /services/crm, ...). Laid out like the
// industry pages (industry-page.tsx) under a light header instead of a photo:
// byline, summary, problems, what's included, steps, FAQ, related services.
// All copy comes from services-data.ts.
export function ServicePage({ svc }: { svc: ServiceDetail }) {
  return (
    <>
      <V7Nav />
      <main className="svcpage">
        <ServiceStructuredData svc={svc} />

        <header className="pagehead" id="top"><div className="wrap in">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/services">Services</Link><span aria-hidden="true">/</span><span aria-current="page">{svc.name}</span>
          </nav>
          <h1>{svc.h1}</h1>
          <p className="lede">{svc.lede}</p>
          <div className="ctas"><a className="btn" href="/book">Schedule a call</a></div>
        </div></header>

        <section id="summary" className="isum"><div className="wrap">
          <p className="byline">
            By <Link href={`/about/${INDUSTRY_AUTHOR.id}`} rel="author">{INDUSTRY_AUTHOR.name}</Link>, {INDUSTRY_AUTHOR.role}
            <span aria-hidden="true"> · </span>
            Updated <time dateTime={SERVICE_UPDATED}>{SERVICE_UPDATED_LABEL}</time>
          </p>
          <div className="box">
            <div>
              <p className="kicker">Summary</p>
              <h2>{svc.name}, in short</h2>
              <p className="answer">{svc.summary}</p>
            </div>
            <ul>{svc.facts.map((f) => <li key={f}>{f}</li>)}</ul>
          </div>
        </div></section>

        <section id="problem"><div className="wrap">
          <p className="kicker">The problem</p>
          <h2>{svc.problemsHeading}</h2>
          <div className="grid c3">
            {svc.problems.map(([h, p]) => <div className="card" key={h}><h3>{h}</h3><p>{p}</p></div>)}
          </div>
        </div></section>

        <section id="included" className="feature"><div className="wrap">
          <p className="kicker">What&rsquo;s included</p>
          <h2>{svc.includedHeading}</h2>
          <p className="sub">One team runs it in your company&rsquo;s name, as part of one system. See <Link href="/services">how every service fits together</Link>.</p>
          <div className="svc">
            {svc.included.map(([k, h, p]) => <div className="card" key={k}><span className="k">{k}</span><h3>{h}</h3><p>{p}</p></div>)}
          </div>
        </div></section>

        <section id="how"><div className="wrap">
          <p className="kicker">How it works</p>
          <h2>{svc.stepsHeading}</h2>
          <ol className="isteps">
            {svc.steps.map(([h, p], i) => <li key={h}><span className="n">{i + 1}</span><h3>{h}</h3><p>{p}</p></li>)}
          </ol>
        </div></section>

        <section id="faq" className="feature"><div className="wrap">
          <p className="kicker">Questions</p>
          <h2>{svc.faqHeading}</h2>
          <div className="faq">
            {svc.faq.map(([q, a], i) => <details key={q} open={i === 0}><summary><h3>{q}</h3></summary><p>{a}</p></details>)}
          </div>
        </div></section>

        <section id="next" className="inext"><div className="wrap">
          <h2>{svc.cta[0]}</h2>
          <p className="sub">{svc.cta[1]}</p>
          <div className="ctas"><a className="btn" href="/book">Schedule a call</a><a className="btn ghost" href="/audit">Run an instant audit</a></div>
          <p className="rel">Related services: {svc.related.map((s, i) => <span key={s}>{i > 0 ? ", " : ""}<Link href={`/services/${s}`}>{SERVICE_BY_SLUG[s].name}</Link></span>)}, or <Link href="/industries">the trades we work with</Link>.</p>
        </div></section>
      </main>
      <V7Footer note={`Version 7, service ${svc.slug}`} />
    </>
  );
}
