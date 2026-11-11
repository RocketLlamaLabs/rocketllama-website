/* eslint-disable @next/next/no-img-element -- same markup as the rest of the site */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { V7Footer } from "@/components/v7/footer";
import { Nav } from "@/components/v7/about-mockups";
import { TEAM } from "@/components/v7/team-data";
import { pageMeta } from "@/components/v7/page-seo";
import { PersonStructuredData } from "@/components/v7/about-seo";

// One page per person on the team, written by scripts/make-v3.py.
export function generateStaticParams() {
  return TEAM.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = TEAM.find((t) => t.slug === slug);
  if (!p) return {};
  return pageMeta(`/about/${p.slug}`, `${p.name}, ${p.role}`, p.summary.replace(/<[^>]+>/g, ""));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = TEAM.find((t) => t.slug === slug);
  if (!p) notFound();
  return (
    <>
      <Nav />
      <main className="person">
        <PersonStructuredData slug={p.slug} />
        <header className="pagehead" id="top"><div className="wrap in">
          <a className="back" href="/about#team">&larr; Leadership</a>
          <div className="person-head">
            <img className="headshot photo" src={p.photo} alt={p.alt} />
            <div>
              <p className="kicker">{p.role}</p>
              <h1>{p.name}</h1>
              <p className="lede" dangerouslySetInnerHTML={{ __html: p.summary }} />
            </div>
          </div>
        </div></header>
        <section className="person-bio"><div className="wrap">
          {p.bio.map((html) => (<p key={html} dangerouslySetInnerHTML={{ __html: html }} />))}
          <div className="ctas"><a className="btn" href="/book">Schedule a call</a></div>
        </div></section>
      </main>
      <V7Footer note={`Version 7, ${p.name}`} />
    </>
  );
}
