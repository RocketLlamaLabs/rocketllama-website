"use client";

import type { CSSProperties } from "react";
import { useEffect } from "react";
import { mountValley } from "./behavior/valley";

// The Valley: one company per trade per city. From Madison's "Is yours taken?"
// mockup: the map with open and taken spots, the twelve cities, the photo band
// and the per-trade tuning (searches, season, job value). One trade state
// drives all of it. Spot counts are illustrative until the CRM feeds them.
const CITIES: [string, number, number, string][] = [
  ["Surprise", 95, 150, "r"], ["Peoria", 170, 190, "r"], ["Glendale", 220, 240, "l"], ["Cave Creek", 300, 80, "r"],
  ["Phoenix", 300, 250, "t"], ["Scottsdale", 410, 180, "r"], ["Tempe", 370, 300, "r"], ["Mesa", 470, 300, "r"],
  ["Chandler", 410, 380, "l"], ["Gilbert", 480, 390, "r"], ["Queen Creek", 540, 450, "l"], ["Goodyear", 130, 320, "r"],
];
const TRADES = ["HVAC", "Plumbing", "Electrical", "Roofing", "Garage door", "Pest control", "Landscaping"];

export function Valley({ base = "" }: { base?: string }) {
  useEffect(mountValley, []);
  return (
    <>
<section id="cities" className="feature"><div className="wrap">
  <div className="valley">
    <div>
      <p className="kicker">One company per trade per city</p>
      <h2>One <span data-t="trade-lc">HVAC</span> company per city. Is yours taken?</h2>
      <p className="sub">We take one company per trade per city, so our clients never fight each other for the same calls. Pick your trade, then tap a city. Blue spots are open. Navy ones are gone.</p>
      <div className="tradebar" role="group" aria-label="Pick your trade">
        {TRADES.map((t, i) => (<button key={t} className="tchip" type="button" data-trade={t} aria-pressed={i === 0 ? "true" : "false"}>{t}</button>))}
        <a className="tchip other" href="#industries">All trades</a>
      </div>
      <div className="citycard">
        <div><h3><span data-t="city">Phoenix</span> · <span data-t="trade">HVAC</span></h3><div className="meta"><span className="status open" id="cc-status">1 of 1 spot open</span><span id="cc-search">about 9,900 searches a month</span><span id="cc-top">top company: 4.8★, 1,240 reviews</span></div></div>
        <a className="btn" href={`${base}/book`} id="cc-cta">Claim this spot</a>
      </div>
      <p className="note">Spot counts are illustrative in this version. Live counts come from the CRM.</p>
    </div>
    <div>
      <div className="mapwrap">
        <svg className="map" viewBox="0 0 640 520" role="img" aria-label="Map of the Phoenix metropolitan area with the cities Rocket Llama Labs serves. Blue circles are open spots for the chosen trade, navy circles are taken." id="svgmap">
          <path className="land" d="M40 110 C120 40, 300 20, 420 60 C520 90, 610 150, 600 260 C590 360, 520 470, 400 490 C280 510, 120 480, 70 400 C30 330, 10 200, 40 110 Z" />
          <path className="river" d="M80 300 C180 290, 260 300, 340 280 C420 260, 500 270, 590 240" />
          <path className="road" d="M60 230 L600 215" /><path className="road" d="M330 40 L310 500" /><path className="road" d="M110 110 L540 440" /><path className="road" d="M460 80 L200 480" />
          <text className="hq" x="326" y="268">Rocket Llama Labs · Phoenix</text>
          {CITIES.map(([c, x, y, side]) => (
            <g key={c} className="city" data-city={c} transform={`translate(${x},${y})`}>
              <circle className="hit" r="30" fill="transparent" /><circle className="ring" r="12" /><circle className="dot" r={c === "Phoenix" ? 14 : 12} />
              {side === "t" ? (<><text x="-26" y="-20" textAnchor="middle">{c}</text><text className="n" x="-26" y="-36" textAnchor="middle">—</text></>)
                : side === "l" ? (<><text x={c === "Queen Creek" ? -100 : -74} y="5">{c}</text><text className="n" x={c === "Queen Creek" ? -100 : -74} y="21">—</text></>)
                : (<><text x="18" y="5">{c}</text><text className="n" x="18" y="21">—</text></>)}
            </g>
          ))}
        </svg>
        <img className="pin" id="pin" src="/brand/mascot.svg" alt="" width="74" height="56" />
        <div className="mapkey"><span><i className="open"></i>Open</span><span><i className="taken"></i>Taken</span><span>Tap a city</span></div>
      </div>
    </div>
  </div>
  <p className="kicker cities-k">Open spots for <span data-t="trade-lc">HVAC</span></p>
  <h3 className="cities-h">Twelve cities. When the spots are gone, they are gone.</h3>
  <div className="cities citygrid"></div>
</div></section>

<div className="band photo-band" id="tradeband" style={{"--img":"url(/v2/img/hero-hvac.jpg)"} as CSSProperties}><div className="wrap in">
  <p className="kicker">Built for <span data-t="trade-lc">HVAC</span></p>
  <h2 className="photo-h2">When the AC dies in July, the first company to answer gets the job.</h2>
  <p className="photo-p">Every new lead gets a text and an email in under a minute, in your voice, even when your techs are on a roof in 112 degrees. The phone still rings you first. If nobody can pick up, the AI books it.</p>
</div></div>

<section id="tuned"><div className="wrap">
  <p className="kicker">The system, tuned to <span data-t="trade-lc">HVAC</span></p>
  <h2>Same eight pieces. Different searches, different seasons, different jobs.</h2>
  <p className="sub">Everything points to a website you own. Everything lands in a CRM you own. Here is what changes when the trade changes. <a href={`${base}/services`}>All eight pieces.</a></p>
  <div className="pers">
    <article className="card"><span className="k">Search and AI search</span><h3>The searches we build pages for</h3><p>Service pages per service and per city, with the schema that lets Google, Gemini and ChatGPT recommend you by name.</p><div className="kw p-kw"></div></article>
    <article className="card"><span className="k">Ads in your name</span><h3>When the budget goes up</h3><p className="big p-season">June to September</p><p className="p-season-p"></p><div className="season" id="season"></div></article>
    <article className="card"><span className="k">Tracked to the job</span><h3>What one booked job is worth</h3><p className="big p-job">$6,800</p><p className="p-job-p"></p></article>
  </div>
  <p className="note">Trade figures are illustrative in this version. The real pages pull them from client data in the CRM.</p>
</div></section>
    </>
  );
}
