import type { CSSProperties } from "react";

// The client's marketing system on one page. Each box is a wrapped HTML
// paragraph inside the SVG so the text reads as sentences when copied or
// spoken, and wraps instead of overflowing.
type Box = { x: number; y: number; w: number; h: number; rx?: number; cls?: string; title: string; text: string };

const boxes: Box[] = [
  { x: 20, y: 32, w: 200, h: 78, title: "Google Business Profile", text: "Reviews, maps, free clicks." },
  { x: 260, y: 32, w: 200, h: 78, title: "Google Ads and Local Services", text: "Highest intent, you own the account." },
  { x: 500, y: 32, w: 200, h: 78, title: "Facebook and Instagram ads", text: "Lead forms, you own the account." },
  { x: 740, y: 32, w: 240, h: 78, title: "YouTube, social and AI search", text: "Your channels, your name." },
  { x: 300, y: 200, w: 400, h: 150, rx: 14, cls: "hub", title: "Your website: home base", text: "Next.js on Vercel, with the code in your GitHub. Schema for Google and AI search, with review stars per service. Funnels with qualifying questions, address autofill, your offer and a booking calendar." },
  { x: 20, y: 220, w: 230, h: 110, title: "Phones and AI receptionist", text: "Tracked numbers on a Tier 1 carrier. Answers, transfers to you, and returns to the AI to book or take a message." },
  { x: 750, y: 220, w: 230, h: 110, title: "Reviews per service", text: "Existing reviews cross-referenced with your jobs. New ones collected automatically after every job." },
  { x: 200, y: 430, w: 600, h: 110, rx: 14, cls: "hub", title: "Your CRM", text: "Pipelines, automations, and an AI text and email reply within 60 seconds. Booking, call tracking, closed-job value and the return on ad spend dashboard." },
  { x: 20, y: 590, w: 280, h: 64, cls: "own", title: "You own all of it", text: "Export data, port numbers, take the code." },
  { x: 360, y: 590, w: 280, h: 64, title: "Booked calls and appointments", text: "Leads that already want to work with you." },
  { x: 700, y: 590, w: 280, h: 64, title: "Closed jobs and revenue", text: "Goal: at least $2 back per $1 spent." },
];

export function SystemDiagram() {
  return (
<svg className="diag" viewBox="0 0 1000 690" role="img" aria-label="The client's marketing system: traffic sources feed a website they own, the phone system and website feed the CRM, the CRM books jobs, closed jobs feed the return on ad spend loop">
  <defs><marker id="arrC" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" className="mk" /></marker></defs>
  <text x="20" y="22" className="lab">WHERE CUSTOMERS COME FROM</text>
  {boxes.map((b) => (
    <g key={b.title}>
      <rect x={b.x} y={b.y} width={b.w} height={b.h} rx={b.rx ?? 12} className={b.cls === "hub" ? "hub" : b.cls === "own" ? "box own" : "box"} />
      <foreignObject x={b.x} y={b.y} width={b.w} height={b.h}>
        <div {...{ xmlns: "http://www.w3.org/1999/xhtml" }} className={"dbox" + (b.cls === "hub" ? " hub" : "")}>
          <b>{b.title}</b>
          <span>{b.text}</span>
        </div>
      </foreignObject>
    </g>
  ))}
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
