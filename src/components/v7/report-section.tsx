"use client";

import { useEffect } from "react";
import { mountReport } from "./behavior/report";

// The report we send on the first of the month, as a live card: six sample
// months, booked jobs by source, what we changed and why, and a button that
// shows a bad month. From Madison's "open book" mockup.
export function ReportSection({ heading = "h2" }: { heading?: "h1" | "h2" } = {}) {
  const H = heading;
  useEffect(mountReport, []);
  return (
    <section id="proof"><div className="wrap">
      <div className="repgrid">
        <div>
          <p className="kicker">The first of the month</p>
          <H>We don&rsquo;t report clicks. We report booked jobs and what they were worth.</H>
          <p className="sub">Booked jobs by source. What they were worth. What they cost. The return per dollar. Most agencies show you clicks and a dashboard login. We show you this, every month, and we put it on the website before you call.</p>
          <div className="stats">
            <div className="stat"><div className="b">$2 : $1</div><div className="l">Our floor: two dollars back for every dollar spent, over a rolling quarter, or we work free</div></div>
            <div className="stat"><div className="b">&lt;60s</div><div className="l">AI reply to every new lead, text and email</div></div>
          </div>
        </div>
        <div className="report rep" role="region" aria-label="Sample monthly report">
          <div className="bar"><div className="ttl">Sun Valley Air · monthly report<small>sample client · HVAC · Chandler · jobs attributed to the system · illustrative</small></div><div className="months" role="group" aria-label="Month"></div></div>
          <div className="kpis"><div className="kpi"><div className="l">Booked jobs</div><div className="v k-jobs">—</div><div className="d k-jobs-d"></div></div><div className="kpi"><div className="l">Closed-job value</div><div className="v k-rev">—</div><div className="d k-rev-d"></div></div><div className="kpi"><div className="l">Total spend, all three lines</div><div className="v k-spend">—</div><div className="d">platform + work + ads</div></div><div className="kpi"><div className="l">Return per $1</div><div className="v k-roi">—</div><div className="d k-roi-d">floor is $2.00</div></div></div>
          <div className="body">
            <div><h3>Booked jobs by source</h3><div className="chart"><div className="row"><span>Google profile</span><div className="trk"><i></i></div><span className="n"></span></div><div className="row"><span>Local Services Ads</span><div className="trk"><i></i></div><span className="n"></span></div><div className="row"><span>Search ads</span><div className="trk"><i></i></div><span className="n"></span></div><div className="row"><span>Meta</span><div className="trk"><i></i></div><span className="n"></span></div><div className="row ai"><span>AI search</span><div className="trk"><i></i></div><span className="n"></span></div><div className="row"><span>Referrals, repeat</span><div className="trk"><i></i></div><span className="n"></span></div></div></div>
            <div className="notes"><span className="k">What we changed, and why</span><ul className="k-notes"></ul><p className="reply"><span className="k">Median reply time</span><br /><b className="k-reply">—</b> <span className="m">text and email, every lead</span></p></div>
          </div>
          <div className="foot"><span>Floor: $2 back per $1, rolling quarter · <b className="k-floor">—</b></span><button className="honest" type="button" aria-pressed="false">Show me a bad month</button></div>
        </div>
      </div>
    </div></section>
  );
}
