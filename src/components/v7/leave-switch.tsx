"use client";

import { useEffect } from "react";
import { mountLeaveSwitch } from "./behavior/leave-switch";

// Flip the switch, watch what you walk out with. From Madison's "open book" mockup.
export function LeaveSwitch() {
  useEffect(mountLeaveSwitch, []);
  return (
    <section id="leaving"><div className="wrap">
      <div className="leave">
        <div>
          <p className="kicker">Leaving</p>
          <h2>Flip the switch. Watch what you walk out with.</h2>
          <p className="sub">The best test of an agency is the day you fire it. We built ours to pass. Everything on the right is in your name from day one, so leaving is a checklist, not a negotiation.</p>
          <label className="toggle"><input type="checkbox" id="leave-sw" /><span className="sw"></span><span id="leave-lbl">I am leaving Rocket Llama Labs</span></label>
          <p className="note" id="leave-note">Flip it to run the exit.</p>
        </div>
        <div className="assets" id="assets">
          <div className="asset"><span className="ic"></span><div><b>The website code</b><small>Transferred to your GitHub. It was already there. Hosting stays free.</small></div><span className="st">yours now</span></div>
          <div className="asset"><span className="ic"></span><div><b>The CRM data</b><small>Every lead, call, text, job and value. Exported as CSV any time.</small></div><span className="st">yours now</span></div>
          <div className="asset"><span className="ic"></span><div><b>The tracked phone numbers</b><small>Ported to any carrier you choose. Callers never notice.</small></div><span className="st">yours now</span></div>
          <div className="asset"><span className="ic"></span><div><b>The ad accounts and history</b><small>Google, Local Services and Meta. Your accounts, your card, since day one.</small></div><span className="st">yours now</span></div>
          <div className="asset"><span className="ic"></span><div><b>The reviews and the Google profile</b><small>Always yours. We only ever had manager access.</small></div><span className="st">yours now</span></div>
          <div className="asset"><span className="ic"></span><div><b>Thirty days of handover</b><small>We set the next provider up, at no charge, and answer their questions.</small></div><span className="st">included</span></div>
        </div>
      </div>
    </div></section>
  );
}
