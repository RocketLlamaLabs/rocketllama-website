"use client";

import { useEffect } from "react";
import { mountInstantAudit } from "./behavior/instant-audit";

// The instant audit card from Madison's "See how you show up online" mockup:
// company and trade in, five checks run on screen, a score against the top
// company in the trade. Results are illustrative until the real audit is wired.
export function InstantAudit({ base = "" }: { base?: string }) {
  useEffect(mountInstantAudit, []);
  return (
    <form className="audit" id="audit" onSubmit={(e) => e.preventDefault()}>
      <div className="top"><span className="live"><i></i>Instant audit</span><span>Free · no email needed</span></div>
      <h2>Run the audit on your company</h2>
      <div className="row">
        <div><label htmlFor="a-co">Company name or website</label><input id="a-co" placeholder="Desert Peak Plumbing or desertpeakplumbing.com" autoComplete="organization" /></div>
        <div><label htmlFor="a-tr">Trade</label><select id="a-tr" defaultValue="HVAC"><option>HVAC</option><option>Plumbing</option><option>Electrical</option><option>Roofing</option><option>Garage door</option><option>Pest control</option><option>Landscaping</option><option>Painting</option><option>Window and pressure washing</option><option>Handyman</option><option>Mobile mechanic</option><option>Windows and doors</option><option>Solar</option><option>Flooring</option><option>Remodeling</option><option>Other home service</option></select></div>
      </div>
      <div className="go">
        <button className="btn" type="button" id="a-run">Run my audit &rarr;</button>
        <span className="fine">About 20 seconds. Nothing is stored.</span>
      </div>
      <div className="achecks" id="a-checks">
        <div className="arow"><span className="ic"><span className="spin"></span></span><span className="lbl">Google Business Profile<small>completeness, photos, posts, map rank for your top three searches</small></span><span className="val" data-val="61 / 100">…</span></div>
        <div className="arow"><span className="ic"><span className="spin"></span></span><span className="lbl">Reviews<small>count, pace and replies, against the top company in your trade</small></span><span className="val" data-val="38 · 4.6★">…</span></div>
        <div className="arow"><span className="ic"><span className="spin"></span></span><span className="lbl">Website on a phone<small>speed, whether a lead can book, what a search engine can read</small></span><span className="val" data-val="4.8 s">…</span></div>
        <div className="arow"><span className="ic"><span className="spin"></span></span><span className="lbl">What the AI engines say<small>ChatGPT, Gemini and Perplexity asked for a pro in your trade near you</small></span><span className="val" data-val="0 of 3">…</span></div>
        <div className="arow"><span className="ic"><span className="spin"></span></span><span className="lbl">The phone test<small>how long until a person answers</small></span><span className="val" data-val="voicemail">…</span></div>
      </div>
      <div className="aresult" id="a-result">
        <div className="scoreboard">
          <div className="aring"><svg viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="52" fill="none" stroke="var(--line)" strokeWidth="12" /><circle id="a-arc" cx="60" cy="60" r="52" fill="none" stroke="var(--accent)" strokeWidth="12" strokeLinecap="round" strokeDasharray="326.7" strokeDashoffset="326.7" style={{ transition: "stroke-dashoffset 1s ease" }} /></svg><div className="n"><span><span id="a-score">0</span><small>out of 100</small></span></div></div>
          <div>
            <p className="verdict">Getting found, losing jobs.</p>
            <p className="fine"><b id="a-name">Your company</b> against the top <span id="a-trade">HVAC</span> company in Phoenix.</p>
            <div className="abars">
              <div className="abar"><span className="lbl"><span>Google profile</span><span>61 vs 94</span></span><div className="trk"><i data-w="61"></i></div><div className="trk top"><i data-w="94"></i></div></div>
              <div className="abar"><span className="lbl"><span>Reviews</span><span>38 vs <span id="a-toprev">1,240</span></span></span><div className="trk"><i data-w="9"></i></div><div className="trk top"><i data-w="100"></i></div></div>
              <div className="abar"><span className="lbl"><span>Website</span><span>4.8 s vs 1.1 s</span></span><div className="trk"><i data-w="23"></i></div><div className="trk top"><i data-w="100"></i></div></div>
              <div className="abar"><span className="lbl"><span>Phone answered</span><span>voicemail vs 9 s</span></span><div className="trk"><i data-w="5"></i></div><div className="trk top"><i data-w="96"></i></div></div>
            </div>
            <p className="legend"><span><i className="you"></i>You</span><span><i className="top"></i>Top company in your trade</span></p>
          </div>
        </div>
        <div className="ai-cards">
          <div className="ai-card"><span className="eng"><span>ChatGPT</span><span>asked: best <span className="a-trade-lc">HVAC company</span> near me, Phoenix</span></span><p>Recommends three companies. Yours is not one of them. Nothing on your site is structured for an AI to read.</p></div>
          <div className="ai-card"><span className="eng"><span>Gemini</span><span>same question</span></span><p>Lists the top company with its rating and hours. Your profile is missing hours, services and photos.</p></div>
          <div className="ai-card"><span className="eng"><span>Perplexity</span><span>same question</span></span><p>Cites Yelp and Reddit threads. You appear in neither.</p></div>
        </div>
        <div className="ctas"><a className="btn" href={`${base}/book`}>Schedule a call, we fix all five</a><a className="btn ghost" href="#scan">Email me the full written scan</a></div>
        <p className="fine">Illustrative results. The real audit reads the live Google profile, review feeds, PageSpeed and the three AI engines.</p>
      </div>
    </form>
  );
}
