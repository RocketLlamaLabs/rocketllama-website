// Us against the typical home services agency. From Madison's mockups, with
// the three pricing rows replaced by the plan row.
export function CompareTable() {
  return (
    <section id="compare"><div className="wrap">
      <p className="kicker">Side by side</p>
      <h2>Us against the typical home services agency.</h2>
      <p className="sub">From the public websites of ten agencies, read in October 2026.</p>
      <div className="cmpwrap"><table className="compare">
        <thead><tr><th></th><th className="us">Rocket Llama Labs</th><th>Typical agency</th></tr></thead>
        <tbody>
          <tr><td>What you see before you pay</td><td className="us">A written marketing plan with a number on it</td><td>A proposal after the sales call<span className="src">8 of 10 show nothing first</span></td></tr>
          <tr><td>What the report shows</td><td className="us">Booked jobs and value by source, return per $1</td><td>Clicks, calls, lead counts<span className="src">2 of 10 report revenue</span></td></tr>
          <tr><td>Contract</td><td className="us">Month to month</td><td>12 months typical<span className="src">stated in FAQs</span></td></tr>
          <tr><td>Who owns the website</td><td className="us">You, code in your GitHub, hosting free</td><td>Varies. One: &ldquo;you&rsquo;ll need another vendor to rebuild your website&rdquo;</td></tr>
          <tr><td>Who the ad money goes to</td><td className="us">Google and Meta, directly, your card</td><td>Often routed through the agency</td></tr>
          <tr><td>Clients per trade per area</td><td className="us">Capped. One spot, yours</td><td>Unlimited</td></tr>
          <tr><td>Local footprint</td><td className="us">Phoenix address, city pages, Brian in person</td><td>National, no city pages<span className="src">10 of 10</span></td></tr>
          <tr><td>Fields to book a call</td><td className="us">Four, then optional questions</td><td>7 to 11, including annual revenue</td></tr>
          <tr><td>Speed to lead</td><td className="us">Under 60 seconds, text and email, every lead</td><td>&ldquo;Within 2 hours&rdquo; at best</td></tr>
          <tr><td>Guarantee</td><td className="us">$2 back per $1 over a quarter, or we work free</td><td>&ldquo;We do not guarantee results&rdquo;</td></tr>
          <tr><td>A bad month</td><td className="us">In the report, with the reason and the fix</td><td>Not shown</td></tr>
        </tbody>
      </table></div>
    </div></section>
  );
}
