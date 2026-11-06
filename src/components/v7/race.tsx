"use client";

import { useEffect } from "react";
import { mountRace } from "./behavior/race";

// Speed to lead as a race: you on the system against the average company,
// at 60 times real speed. From Madison's mockup.
export function Race() {
  useEffect(mountRace, []);
  return (
    <section id="speed" className="feature"><div className="wrap">
      <p className="kicker">Speed to lead</p>
      <h2>Answer in two minutes and 62% of leads close. Wait 42, and it is 28%.</h2>
      <p className="sub">Press the button. A homeowner in <span id="clock-city">Phoenix</span> just searched for a <span id="clock-trade">HVAC</span> company and called two of them. Watch what happens.</p>
      <div className="race">
        <div className="head"><div className="clock"><span id="clock">00:00</span><small>minutes since the call</small></div><div className="go"><a className="again" id="race-reset">Start over</a><button className="btn" type="button" id="race-go">A customer calls</button></div></div>
        <div className="lane us"><div className="lbl"><span>You, on the system</span><span id="us-t">—</span></div><div className="trk"><div className="fill" id="us-fill"></div><span className="wm-txt" aria-hidden="true">Rocket Llama Labs</span><img className="flag" id="us-flag" src="/brand/mascot.svg" alt="" width="56" height="42" /></div><div className="marks"><span>call</span><span>AI answers</span><span>text + email</span><span>booked</span></div><div className="done" id="us-done"></div></div>
        <div className="lane them"><div className="lbl"><span>The average company</span><span id="them-t">—</span></div><div className="trk"><div className="fill" id="them-fill"></div></div><div className="marks"><span>call</span><span>voicemail</span><span>…</span><span>callback at 42 min</span></div><div className="done" id="them-done"></div></div>
        <div className="odds"><div><p className="n good">62%</p><p className="m">chance the job is yours when you answer inside two minutes</p></div><div><p className="n bad" id="odds-them">28%</p><p className="m">chance for the company that calls back at 42 minutes</p></div></div>
        <p className="src">ServiceTitan, 2025 · Hatch, 2026. The demo runs at 45 times real speed.</p>
      </div>
    </div></section>
  );
}
