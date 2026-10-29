"use client";

import type { CSSProperties } from "react";
import { useEffect } from "react";
import { mountFreeScan } from "./behavior/free-scan";

// FreeScan: markup from the mockup's _scan.html, behaviour mounted on the client.
export function FreeScan() {
  useEffect(mountFreeScan, []);
  return (
    <>


<div className="scan">
  <div>
    <ul className="what">
      <li><b>Your Google Business Profile:</b> completeness, photos, posts, and where you rank on the map for your top three searches.</li>
      <li><b>Your reviews:</b> count, pace and replies, against the top company in your trade in your area.</li>
      <li><b>Your website:</b> speed on a phone, what a search engine and an AI can read, and whether a lead can book.</li>
      <li><b>The phone test:</b> we call your number and time how long it takes to reach a person.</li>
      <li><b>The three fixes that matter most,</b> in order, with what each one is worth.</li>
    </ul>
  </div>
  <div className="scanform" id="scanform">
    <div id="scan_f">
      <h3>Send me the free scan</h3>
      <p>Written, in your inbox within one business day. No call, no obligation.</p>
      <label htmlFor="sc_company">Company name<input type="text" id="sc_company" placeholder="Company name" autoComplete="organization" /></label>
      <label htmlFor="sc_email">Email<input type="email" id="sc_email" placeholder="name@company.com" autoComplete="email" inputMode="email" autoCapitalize="none" spellCheck="false" /></label>
      <label htmlFor="sc_url">Website <span style={{fontWeight:"500",color:"var(--faint)"} as CSSProperties}>(optional)</span><input type="text" id="sc_url" placeholder="yourcompany.com" autoComplete="url" inputMode="url" autoCapitalize="none" /></label>
      <button className="btn" type="button" id="sc_go">Send my scan</button>
      <p className="err" id="sc_err" role="alert"></p>
      <p className="fine">We email the scan and nothing else unless you ask. No texts, no calls.</p>
    </div>
    <div className="done" id="scan_d">
      <div className="tick">&#10003;</div>
      <h3>On its way.</h3>
      <p>Your scan lands within one business day. If you want the fixes done, the walkthrough is one click away.</p>
      <a className="btn" style={{display:"block",textAlign:"center",textDecoration:"none"} as CSSProperties} href="/v2/book">Book a walkthrough</a>
    </div>
  </div>
</div>
    </>
  );
}
