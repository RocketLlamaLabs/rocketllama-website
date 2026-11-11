/* eslint-disable @next/next/no-img-element -- same photo markup as the rest of version 7 */

import type { CSSProperties } from "react";
import { V7Footer } from "@/components/v7/footer";
import { TeamSection } from "@/components/v7/about-team";

// Three About page layouts to choose between. Same copy, same team cards,
// same nav and footer as the rest of version 7; only the arrangement differs.

const MENU = "document.addEventListener('click',function(e){var m=e.target.closest('.v7 .nav .menu');if(m){if(e.target.closest('a'))m.removeAttribute('open');}else{document.querySelectorAll('.v7 .nav .menu[open]').forEach(function(x){x.removeAttribute('open')})}});document.addEventListener('click',function(e){var b=e.target.closest('.v7 .team details.bio .less');if(b){var d=b.closest('details');d.removeAttribute('open');d.closest('.card').scrollIntoView({block:'nearest'})}})";

export function Nav() {
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
      <script dangerouslySetInnerHTML={{ __html: MENU }} />
    </>
  );
}

export const TITLE = "Built for the Trades. Powered by Experience. Driven by Results.";
export const GOAL = "One goal: more customers for your business. Every system we build exists to make the phone ring and the calendar fill.";
export const LEDE = "Rocket Llama Labs is a Phoenix, Arizona-based marketing and technology company dedicated to helping home service businesses build stronger operations, attract more customers, and achieve sustainable growth.";
export const PULL_1 = "We are more than a marketing agency. We are a complete growth and technology partner.";
export const PULL_2 = "We don’t just build marketing. We build the systems behind better businesses.";

export const BLOCKS: [string, string[]][] = [
  ["Who we serve", ["We specialize in the industries that keep homes running—from HVAC, plumbing, electrical, and roofing to garage doors, pest control, landscaping, painting, and virtually every trade that serves homeowners."]],
  ["Our approach", ["Our approach is built around a simple principle: successful businesses need more than individual marketing campaigns, disconnected software, or strategies that look good on paper. They need integrated systems that work together to generate opportunities, improve efficiency, strengthen customer relationships, and support long-term growth.", "That’s where Rocket Llama Labs comes in."]],
  ["How we get you customers", ["We don’t simply make recommendations and leave businesses to figure out the execution. We design, build, implement, manage, and continuously improve the systems that help home service companies operate and grow."]],
  ["What sets us apart", ["What truly sets us apart is our foundation in real-world experience. The solutions we deliver are rooted in work we’ve already done, challenges we’ve already addressed, and systems we’ve already implemented. We believe in applying practical experience rather than asking our clients to gamble on unproven ideas."]],
  ["Why it matters", ["We understand that home service companies have unique demands. Every missed call can mean a lost opportunity. Every inefficient process can affect profitability. And every customer interaction can determine whether a business earns a one-time job or a relationship that lasts for years."]],
  ["Our mission", ["Our mission is to bring marketing, technology, and business execution together into one coordinated approach—giving home service companies the tools, systems, and support they need to compete with confidence."]],
  ["Who it is for", ["Whether you’re an established contractor looking to modernize your business or a growing home service company ready to reach the next level, Rocket Llama Labs is built to help you move forward."]],
];

const STATS: [string, string][] = [
  ["20+", "years building businesses that get found online"],
  ["$50M+", "generated through inbound marketing"],
  ["23", "years leading sales and client strategy"],
];

function Stats() {
  return (
    <div className="am-stats">
      {STATS.map(([n, l]) => (<div key={n}><div className="n">{n}</div><div className="l">{l}</div></div>))}
    </div>
  );
}

// Option A: the editorial. White header, then a sticky left rail with the pull
// quote and proof numbers while the copy scrolls on the right. Team on light blue.
// Closing quote as a navy band with the button.
export function AboutA() {
  return (
    <>
      <Nav />
      <main className="am am-a">
        <header className="pagehead" id="top"><div className="wrap in">
          <p className="kicker">About us</p>
          <h1>{TITLE}</h1>
          <p className="goal">{GOAL}</p>
        </div></header>
        <section className="am-body"><div className="wrap">
          <div className="am-cols">
            <aside className="am-rail">
              <p className="pull">{PULL_1}</p>
              <Stats />
            </aside>
            <div className="am-copy">
              <p className="lede">{LEDE}</p>
              {BLOCKS.map(([h, ps]) => (<div className="ablk" key={h}><h2>{h}</h2>{ps.map((p) => <p key={p}>{p}</p>)}</div>))}
            </div>
          </div>
        </div></section>
        <TeamSection tone="blue" />
        <div className="band am-close" style={{ "--img": "url(/v7/img/band-neighborhood-1920.webp)" } as CSSProperties}><div className="wrap in">
          <h2>{PULL_2}</h2>
          <div className="ctas"><a className="btn" href="/v7/book">Schedule a call</a></div>
        </div></div>
      </main>
      <V7Footer note="About mockup A" />
    </>
  );
}

// Option B: the pillars. Light blue header with the goal and lede, the seven
// points as numbered cards like the Services page, a photo band carrying the two
// quotes, then the team.
export function AboutB() {
  return (
    <>
      <Nav />
      <main className="am am-b">
        <header className="pagehead" id="top"><div className="wrap in">
          <p className="kicker">About us</p>
          <h1>{TITLE}</h1>
          <p className="goal">{GOAL}</p>
          <p className="lede">{LEDE}</p>
        </div></header>
        <section className="am-cards"><div className="wrap">
          <p className="kicker">How we work</p>
          <h2>Seven things to know about us.</h2>
          <div className="grid">
            {BLOCKS.map(([h, ps], i) => (
              <div className="card" key={h}><span className="k">{String(i + 1).padStart(2, "0")} &middot; {h}</span>{ps.map((p) => <p key={p}>{p}</p>)}</div>
            ))}
          </div>
        </div></section>
        <div className="band am-quotes" style={{ "--img": "url(/v7/img/band-van-1920.webp)" } as CSSProperties}><div className="wrap in">
          <p className="kicker">In short</p>
          <h2>{PULL_1}</h2>
          <p className="q2">{PULL_2}</p>
          <div className="ctas"><a className="btn" href="/v7/book">Schedule a call</a></div>
        </div></div>
        <TeamSection tone="white" />
      </main>
      <V7Footer note="About mockup B" />
    </>
  );
}

// Option C: the story. A full-width photo header like the home banner, the
// opening copy and first quote on light blue, the points as label-left rows on
// white with a stats strip in the middle, the closing quote large, team on blue.
export function AboutC() {
  return (
    <>
      <Nav />
      <main className="am am-c">
        <header className="hero am-hero" id="top">
          <div className="slides" aria-hidden="true"><img className="on" src="/v7/img/band-neighborhood-1920.webp" alt="" fetchPriority="high" /></div>
          <div className="wrap in"><div>
            <p className="kicker">About us</p>
            <h1>{TITLE}</h1>
            <p className="goal">{GOAL}</p>
          </div></div>
        </header>
        <section className="am-open feature"><div className="wrap">
          <p className="lede">{LEDE}</p>
          <p className="pull">{PULL_1}</p>
        </div></section>
        <section className="am-rows"><div className="wrap">
          {BLOCKS.slice(0, 4).map(([h, ps]) => (<div className="ablk" key={h}><h2>{h}</h2><div>{ps.map((p) => <p key={p}>{p}</p>)}</div></div>))}
          <Stats />
          {BLOCKS.slice(4).map(([h, ps]) => (<div className="ablk" key={h}><h2>{h}</h2><div>{ps.map((p) => <p key={p}>{p}</p>)}</div></div>))}
          <p className="pull big">{PULL_2}</p>
        </div></section>
        <TeamSection tone="blue" />
      </main>
      <V7Footer note="About mockup C" />
    </>
  );
}
