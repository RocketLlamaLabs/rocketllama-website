"use client";

import type { CSSProperties } from "react";
import { useEffect } from "react";
import { mountSixtySecondCheck } from "./behavior/sixty-second-check";

// SixtySecondCheck: markup from the mockup's _check.html, behaviour mounted on the client.
export function SixtySecondCheck() {
  useEffect(mountSixtySecondCheck, []);
  return (
    <>


<div className="chk" id="chk">
  <div className="prog"><span id="chk_n">Question 1 of 4</span><span>About 60 seconds</span></div>
  <div className="bar"><i id="chk_bar"></i></div>
  <div className="q on" data-q="1"><h3>How many Google reviews does your company have?</h3>
    <div className="opts"><label className="opt"><input type="radio" name="c1" value="5" />Under 20</label><label className="opt"><input type="radio" name="c1" value="12" />20 to 50</label><label className="opt"><input type="radio" name="c1" value="20" />50 to 150</label><label className="opt"><input type="radio" name="c1" value="25" />More than 150</label></div></div>
  <div className="q" data-q="2"><h3>A new customer calls while you are on a job. What happens?</h3>
    <div className="opts"><label className="opt"><input type="radio" name="c2" value="0" />Voicemail, and I call back when I can</label><label className="opt"><input type="radio" name="c2" value="8" />Someone in the office picks up, sometimes</label><label className="opt"><input type="radio" name="c2" value="18" />Someone always answers</label><label className="opt"><input type="radio" name="c2" value="25" />It gets answered and booked in under a minute, every time</label></div></div>
  <div className="q" data-q="3"><h3>Your website. Which is closest?</h3>
    <div className="opts"><label className="opt"><input type="radio" name="c3" value="0" />We do not have one</label><label className="opt"><input type="radio" name="c3" value="8" />I built it myself and it is fine</label><label className="opt"><input type="radio" name="c3" value="14" />An agency built it, not sure it brings in work</label><label className="opt"><input type="radio" name="c3" value="25" />It books jobs on its own every week</label></div></div>
  <div className="q" data-q="4"><h3>Where do most new jobs come from?</h3>
    <div className="opts"><label className="opt"><input type="radio" name="c4" value="5" />Referrals and repeat only</label><label className="opt"><input type="radio" name="c4" value="8" />Angi, Thumbtack, Yelp or another marketplace</label><label className="opt"><input type="radio" name="c4" value="16" />Google and referrals</label><label className="opt"><input type="radio" name="c4" value="25" />Our own website and ads, tracked to the job</label></div></div>
  <div className="res" id="chk_res">
    <div className="ring"><svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="52" fill="none" stroke="#e5ece7" strokeWidth="12" /><circle id="chk_arc" cx="60" cy="60" r="52" fill="none" stroke="#16a34a" strokeWidth="12" strokeLinecap="round" strokeDasharray="326.7" strokeDashoffset="326.7" style={{transition:"stroke-dashoffset 1s ease"} as CSSProperties} /></svg><div className="n"><span><span id="chk_score">0</span><small>out of 100</small></span></div></div>
    <div>
      <p className="kicker" style={{marginBottom:"8px"} as CSSProperties}>Your online visibility</p>
      <h3 className="verdict" id="chk_v"></h3>
      <p className="why" id="chk_p"></p>
      <div className="ctas"><a className="btn" id="chk_book" href="/v2/book">Book a walkthrough</a><a className="btn ghost" href="#scan">Get the free scan</a></div>
      <a className="again" id="chk_again">Start over</a>
    </div>
  </div>
</div>
    </>
  );
}
