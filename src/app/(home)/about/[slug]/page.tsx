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
          </div></section>
        {p.book ? (
          <section className="person-book"><div className="wrap">
            <div className="book">
              <img className="cover" src={p.book.cover} alt={p.book.alt} width="323" height="500" loading="lazy" decoding="async" />
              <div>
                <p className="kicker">{p.book.kicker}</p>
                <h2>{p.book.title}</h2>
                {p.book.text.map((html) => (<p key={html} className="sub" dangerouslySetInnerHTML={{ __html: html }} />))}
                <div className="ctas">
                  {p.book.links.map((l, i) => (<a key={l.href} className={i === 0 ? "btn" : "btn outline"} href={l.href} target="_blank" rel="noopener">{l.label}</a>))}
                </div>
              </div>
            </div>
          </div></section>
        ) : null}
        {p.gallery ? (
          <section className="person-gallery feature"><div className="wrap">
            <p className="kicker">{p.gallery.kicker}</p>
            <h2>{p.gallery.title}</h2>
            <p className="sub">{p.gallery.text}</p>
            <div className="gallery">
              {p.gallery.photos.map((ph) => (
                <figure key={ph.src} className={ph.tall ? "tall" : undefined}>
                  <img src={`${ph.src}-1600.webp`} srcSet={`${ph.src}-900.webp 900w, ${ph.src}-1600.webp 1600w`} sizes="(min-width: 900px) 50vw, 100vw" alt={ph.alt} loading="lazy" decoding="async" />
                </figure>
              ))}
            </div>
          </div></section>
        ) : null}
      </main>
      <V7Footer note={`Version 7, ${p.name}`} />
    </>
  );
}
