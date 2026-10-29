import type { CSSProperties } from "react";

// The client's marketing system on one page, from the mockup's system-map.html.
export function SystemDiagram() {
  return (
<svg className="diag" viewBox="0 0 1000 680" role="img" aria-label="The client's marketing system: traffic sources feed a website they own, the phone system and website feed the CRM, the CRM books jobs, closed jobs feed the return on ad spend loop">
  <defs><marker id="arrC" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" className="mk" /></marker></defs>
  <text x="20" y="22" className="lab">WHERE CUSTOMERS COME FROM</text>
  <g><rect x="20" y="32" width="200" height="78" rx="12" className="box" /><text x="120" y="60" textAnchor="middle" className="t"><tspan className="b">Google Business Profile</tspan><tspan x="120" dy="19" className="s">reviews, maps, free clicks</tspan></text></g>
  <g><rect x="260" y="32" width="200" height="78" rx="12" className="box" /><text x="360" y="60" textAnchor="middle" className="t"><tspan className="b">Google Ads + Local Services</tspan><tspan x="360" dy="19" className="s">highest intent, your own account</tspan></text></g>
  <g><rect x="500" y="32" width="200" height="78" rx="12" className="box" /><text x="600" y="60" textAnchor="middle" className="t"><tspan className="b">Facebook + Instagram ads</tspan><tspan x="600" dy="19" className="s">lead forms, your own account</tspan></text></g>
  <g><rect x="740" y="32" width="240" height="78" rx="12" className="box" /><text x="860" y="60" textAnchor="middle" className="t"><tspan className="b">YouTube + social + AI search</tspan><tspan x="860" dy="19" className="s">your channels, your name</tspan></text></g>

  <g><rect x="300" y="200" width="400" height="150" rx="14" className="hub" /><text x="500" y="236" textAnchor="middle" className="t"><tspan className="h">Your website: home base</tspan><tspan x="500" dy="26" className="s">Next.js on Vercel, code in your GitHub, hosted free</tspan><tspan x="500" dy="20" className="s">schema for Google and AI search, stars per service</tspan><tspan x="500" dy="20" className="s">funnels: questions, address autofill, offer, booking</tspan></text></g>

  <g><rect x="20" y="220" width="230" height="110" rx="12" className="box" /><text x="135" y="250" textAnchor="middle" className="t"><tspan className="b">Phones + AI receptionist</tspan><tspan x="135" dy="19" className="s">tracked numbers on Telnyx (Tier 1)</tspan><tspan x="135" dy="18" className="s">answers, transfers to you, returns</tspan><tspan x="135" dy="18" className="s">to the AI to book or take a message</tspan></text></g>
  <g><rect x="750" y="220" width="230" height="110" rx="12" className="box" /><text x="865" y="250" textAnchor="middle" className="t"><tspan className="b">Reviews per service</tspan><tspan x="865" dy="19" className="s">existing reviews cross-referenced</tspan><tspan x="865" dy="18" className="s">with your jobs; new ones collected</tspan><tspan x="865" dy="18" className="s">automatically after every job</tspan></text></g>

  <g><rect x="200" y="430" width="600" height="110" rx="14" className="hub" /><text x="500" y="462" textAnchor="middle" className="t"><tspan className="h">Your CRM (Pulse)</tspan><tspan x="500" dy="26" className="s">pipelines, automations, AI text and email reply within 60 seconds</tspan><tspan x="500" dy="20" className="s">booking, call tracking, closed-job value, return on ad spend dashboard</tspan></text></g>

  <g><rect x="20" y="590" width="280" height="64" rx="12" className="box own" /><text x="160" y="617" textAnchor="middle" className="t"><tspan className="b">You own all of it</tspan><tspan x="160" dy="19" className="s">export data, port numbers, take the code</tspan></text></g>
  <g><rect x="360" y="590" width="280" height="64" rx="12" className="box" /><text x="500" y="617" textAnchor="middle" className="t"><tspan className="b">Booked calls and appointments</tspan><tspan x="500" dy="19" className="s">leads that already want to work with you</tspan></text></g>
  <g><rect x="700" y="590" width="280" height="64" rx="12" className="box" /><text x="840" y="617" textAnchor="middle" className="t"><tspan className="b">Closed jobs and revenue</tspan><tspan x="840" dy="19" className="s">goal: at least $2 back per $1 spent</tspan></text></g>

  <path d="M120 110 L120 220" className="arrow" />
  <path d="M360 110 L420 200" className="arrow" />
  <path d="M600 110 L560 200" className="arrow" />
  <path d="M860 110 L700 205" className="arrow" />
  <path d="M250 275 L300 275" className="arrow" />
  <path d="M750 275 L700 275" className="arrow" />
  <path d="M135 330 L135 400 L260 400 L260 430" className="arrow" />
  <path d="M500 350 L500 430" className="arrow" />
  <path d="M865 330 L865 400 L740 400 L740 430" className="arrow" />
  <path d="M500 540 L500 590" className="arrow" />
  <path d="M640 622 L700 622" className="arrow" />
  <path d="M300 622 L360 622" className="arrow" style={{strokeDasharray:"4 4"} as CSSProperties} />
  <path d="M980 590 L992 590 L992 71 L980 71" className="arrow" style={{strokeDasharray:"4 4"} as CSSProperties} />
  <text x="980" y="165" className="lab" textAnchor="end">SPEND FOLLOWS RESULTS</text>
</svg>
  );
}
