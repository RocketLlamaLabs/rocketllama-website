"use client";

import type { CSSProperties } from "react";
import { useEffect } from "react";
import { mountBookFunnel } from "./behavior/book-funnel";

// BookFunnel: markup from the mockup's _book.html, behaviour mounted on the client.
export function BookFunnel() {
  useEffect(mountBookFunnel, []);
  return (
    <>


<div className="qz" id="qz">
  <div className="bar"><i id="qzbar"></i></div>
  <div className="body">
    <div className="prog"><span id="qzcnt">Step 1 of 2</span><span id="qztitle">About a minute</span></div>

    <div className="step on" data-q="slot" data-auto="1">
      <h3>Pick a time.</h3>
      <p className="why">Phoenix time. The Zoom link comes by text and email, and you can move it any time.</p>
      <span className="f">Day</span>
      <div className="opts five" data-single="q_day" id="q_days" style={{marginTop:"10px"} as CSSProperties}></div>
      <div className="grp" id="g_slots" hidden><span className="f">Time</span><div className="opts five" data-single="q_slot" id="q_slots" style={{marginTop:"10px"} as CSSProperties}></div></div>
    </div>

    <div className="step" data-q="who">
      <h3 id="who_h">Where do we send the confirmation?</h3>
      <p className="why" id="who_p">The Zoom link and a reminder the day before. Nothing goes to a sales list.</p>
      <div className="fields two">
        <label className="f">Company name<input type="text" id="q_company" placeholder="Company name" autoComplete="organization" /></label>
        <label className="f">Your name<input type="text" id="q_name" placeholder="First and last name" autoComplete="name" /></label>
      </div>
      <div className="fields two" style={{marginTop:"16px"} as CSSProperties}>
        <label className="f">Email<input type="email" id="q_email" placeholder="name@company.com" autoComplete="email" inputMode="email" autoCapitalize="none" autoCorrect="off" spellCheck="false" /></label>
        <label className="f"><span id="mob_l">Mobile</span><input type="tel" id="q_mobile" placeholder="(555) 555-5555" autoComplete="tel" inputMode="tel" maxLength={18} pattern="[0-9()+.\- ]*" /></label>
      </div>
      <div className="grp"><label className="f" htmlFor="q_url">Website <span className="hint">optional, so the audit can include it</span></label><input type="text" id="q_url" placeholder="yourcompany.com" autoComplete="url" inputMode="url" autoCapitalize="none" style={{marginTop:"8px"} as CSSProperties} /></div>
      <label className="consent" data-disclosure-version="rll-sms-2026-10-29.v2"><input type="checkbox" id="q_consent" /><span><b>Yes, text me about this request.</b> By checking this box and providing your mobile number, you agree to receive text messages from Rocket Llama Labs about this request: your qualification result, your walkthrough booking and reminders, and your free live audit. No marketing texts without a separate opt-in. Message frequency varies. Message and data rates may apply. Reply STOP to opt out at any time and HELP for help. Consent is not a condition of doing business with us. See our <a href="#privacy">Privacy Policy</a> and <a href="#terms">Terms</a>.</span></label>
    </div>

    <div className="step" data-q="confirm">
      <div className="tick">&#10003;</div>
      <p className="k" id="cf_k">You are booked</p>
      <h3 id="cf_h"></h3>
      <p className="why" id="cf_p"></p>
      <p className="why">In a hurry? <a className="skip" id="qzskip">Skip the questions</a>.</p>
    </div>

    <div className="step" data-q="years" data-auto="1">
      <h3>How long have you been in business?</h3>
      <p className="why" id="qzstart" hidden>Starting with <b></b>. About two minutes to go.</p>
      <div className="opts four" data-single="q_years"><label className="opt"><input type="radio" name="q_years" value="Under 1" />Under a year</label><label className="opt"><input type="radio" name="q_years" value="1 to 3" />1 to 3 years</label><label className="opt"><input type="radio" name="q_years" value="3 to 10" />3 to 10 years</label><label className="opt"><input type="radio" name="q_years" value="10 or more" />10 years or more</label></div>
    </div>

    <div className="step" data-q="trade" data-auto="1">
      <h3>What trade are you in?</h3>
      <div className="opts three" data-single="q_trade"><label className="opt"><input type="radio" name="q_trade" value="HVAC" />HVAC</label><label className="opt"><input type="radio" name="q_trade" value="Plumbing" />Plumbing</label><label className="opt"><input type="radio" name="q_trade" value="Electrical" />Electrical</label><label className="opt"><input type="radio" name="q_trade" value="Roofing" />Roofing</label><label className="opt"><input type="radio" name="q_trade" value="Garage door" />Garage door</label><label className="opt"><input type="radio" name="q_trade" value="Pest control" />Pest control</label><label className="opt"><input type="radio" name="q_trade" value="Landscaping" />Landscaping</label><label className="opt"><input type="radio" name="q_trade" value="Painting" />Painting</label><label className="opt"><input type="radio" name="q_trade" value="Window and pressure washing" />Window and pressure washing</label><label className="opt"><input type="radio" name="q_trade" value="Handyman" />Handyman</label><label className="opt"><input type="radio" name="q_trade" value="Mobile mechanic" />Mobile mechanic</label><label className="opt"><input type="radio" name="q_trade" value="Windows and doors" />Windows and doors</label><label className="opt"><input type="radio" name="q_trade" value="Solar" />Solar</label><label className="opt"><input type="radio" name="q_trade" value="Flooring" />Flooring</label><label className="opt"><input type="radio" name="q_trade" value="Remodeling" />Remodeling</label><label className="opt"><input type="radio" name="q_trade" value="Other home service" />Other home service</label><label className="opt"><input type="radio" name="q_trade" value="other" />Something else</label></div>
      <div className="cond" id="c_other" hidden>
        <label className="f" htmlFor="q_other">What kind of business is it?</label>
        <input type="text" id="q_other" placeholder="For example: pool service, appliance repair, junk removal" style={{marginTop:"8px"} as CSSProperties} />
      </div>
    </div>

    <div className="step" data-q="city">
      <h3>Where do you work?</h3>
      <p className="why">Your home base, and how far the trucks go. Whole metro, several metros, more than one state: all fine.</p>
      <div className="geo">
        <div>
          <label className="f" htmlFor="q_home">Home base</label>
          <div className="ta"><input type="text" id="q_home" placeholder="City, State" autoComplete="off" autoCapitalize="words" style={{marginTop:"8px"} as CSSProperties} /><div className="sug" id="q_homesug" hidden></div></div>
          <span className="f" style={{marginTop:"18px"} as CSSProperties}>How far do you go?</span>
          <div className="opts" data-single="q_radius" style={{marginTop:"10px"} as CSSProperties}>
            <label className="opt"><input type="radio" name="q_radius" value="15" />Around town <small>about 15 miles out</small></label>
            <label className="opt"><input type="radio" name="q_radius" value="30" />Across the metro <small>about 30 miles out</small></label>
            <label className="opt"><input type="radio" name="q_radius" value="50" />Regional <small>50 miles and more</small></label>
            <label className="opt"><input type="radio" name="q_radius" value="multi" />Several metros or states <small>we will list them</small></label>
          </div>
        </div>
        <svg className="ring" viewBox="0 0 240 240" aria-hidden="true">
          <defs><pattern id="qzgrid" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0H0V24" fill="none" stroke="#dfe7e1" strokeWidth="1" /></pattern></defs>
          <rect width="240" height="240" rx="18" fill="#f4f8f5" /><rect width="240" height="240" rx="18" fill="url(#qzgrid)" />
          <circle className="r r50" cx="120" cy="120" r="104" /><circle className="r r30" cx="120" cy="120" r="66" /><circle className="r r15" cx="120" cy="120" r="34" />
          <g className="pin2"><circle cx="196" cy="52" r="9" fill="#16a34a" opacity=".9" /><circle cx="56" cy="190" r="9" fill="#16a34a" opacity=".9" /></g>
          <circle cx="120" cy="120" r="9" fill="#16a34a" stroke="#fff" strokeWidth="3" />
          <text className="lbl" x="120" y="228" textAnchor="middle" id="q_ringlbl">Pick a home base</text>
        </svg>
      </div>
      <div className="cond" id="c_multi" hidden>
        <label className="f" htmlFor="q_areas">The other metros or states you serve</label>
        <textarea id="q_areas" rows={2} placeholder="For example: Tucson AZ, Las Vegas NV, all of Orange County CA" style={{marginTop:"8px"} as CSSProperties}></textarea>
      </div>
    </div>

    <div className="step" data-q="rev" data-auto="1">
      <h3>What was revenue last year, roughly?</h3>
      <p className="why">We size the budget to the business, so this matters more than anything else you tell us.</p>
      <div className="opts three" data-single="q_rev"><label className="opt"><input type="radio" name="q_rev" value="lt250" />Under $250K</label><label className="opt"><input type="radio" name="q_rev" value="250-500" />$250K to $500K</label><label className="opt"><input type="radio" name="q_rev" value="500-1m" />$500K to $1M</label><label className="opt"><input type="radio" name="q_rev" value="1-2m" />$1M to $2M</label><label className="opt"><input type="radio" name="q_rev" value="2m+" />Over $2M</label><label className="opt"><input type="radio" name="q_rev" value="unsure" />Not sure</label></div>
    </div>

    <div className="step" data-q="crew" data-auto="1">
      <h3>How many people are on the crew, including you?</h3>
      <div className="opts four" data-single="q_crew"><label className="opt"><input type="radio" name="q_crew" value="1" />Just me</label><label className="opt"><input type="radio" name="q_crew" value="2-4" />2 to 4</label><label className="opt"><input type="radio" name="q_crew" value="5-9" />5 to 9</label><label className="opt"><input type="radio" name="q_crew" value="10+" />10 or more</label></div>
    </div>

    <div className="step" data-q="ticket" data-auto="1">
      <h3>What is an average job worth?</h3>
      <div className="opts four" data-single="q_ticket"><label className="opt"><input type="radio" name="q_ticket" value="Under $300" />Under $300</label><label className="opt"><input type="radio" name="q_ticket" value="$300 to $1,000" />$300 to $1,000</label><label className="opt"><input type="radio" name="q_ticket" value="$1,000 to $5,000" />$1,000 to $5,000</label><label className="opt"><input type="radio" name="q_ticket" value="Over $5,000" />Over $5,000</label></div>
    </div>

    <div className="step" data-q="pain">
      <h3>What are your biggest pain points right now?</h3>
      <p className="why">Pick everything that costs you sleep.</p>
      <div className="opts two" data-multi="q_pain"><label className="opt"><input type="checkbox" name="q_pain" value="leads" />Not enough leads</label><label className="opt"><input type="checkbox" name="q_pain" value="cost" />Leads cost too much</label><label className="opt"><input type="checkbox" name="q_pain" value="calls" />We miss calls</label><label className="opt"><input type="checkbox" name="q_pain" value="web" />Nobody finds us online</label><label className="opt"><input type="checkbox" name="q_pain" value="reviews" />Reviews and reputation</label><label className="opt"><input type="checkbox" name="q_pain" value="all" />All of it, and nobody owns it</label></div>
    </div>

    <div className="step" data-q="src">
      <h3>Where do your jobs come from right now?</h3>
      <p className="why">Pick everything that applies.</p>
      <div className="opts three" data-multi="q_src"><label className="opt"><input type="checkbox" name="q_src" value="referrals" />Referrals and repeat</label><label className="opt"><input type="checkbox" name="q_src" value="google" />Google search or maps</label><label className="opt"><input type="checkbox" name="q_src" value="angi" />Angi or HomeAdvisor</label><label className="opt"><input type="checkbox" name="q_src" value="thumbtack" />Thumbtack</label><label className="opt"><input type="checkbox" name="q_src" value="yelp" />Yelp</label><label className="opt"><input type="checkbox" name="q_src" value="lsa" />Google Local Services Ads</label><label className="opt"><input type="checkbox" name="q_src" value="facebook" />Facebook or Nextdoor</label><label className="opt"><input type="checkbox" name="q_src" value="agency" />A marketing agency</label><label className="opt"><input type="checkbox" name="q_src" value="trucks" />Trucks, yard signs, mailers</label></div>
      <div className="cond" id="c_marketplace" hidden>
        <p className="k">Because you pay for shared leads</p>
        <div className="fields two">
          <label className="f">About what do you pay per lead?<select id="q_cpl"><option value="">Choose one</option><option>Under $25</option><option>$25 to $50</option><option>$50 to $100</option><option>Over $100</option><option>Not sure</option></select></label>
          <label className="f">Of every five, how many do you win?<select id="q_win"><option value="">Choose one</option><option>Less than one</option><option>One</option><option>Two</option><option>Three or more</option></select></label>
        </div>
      </div>
      <div className="cond" id="c_agency" hidden>
        <p className="k">Because you have an agency</p>
        <div className="fields two">
          <label className="f">What do you pay them a month?<select id="q_agencyfee"><option value="">Choose one</option><option>Under $1,000</option><option>$1,000 to $2,500</option><option>$2,500 to $5,000</option><option>Over $5,000</option></select></label>
          <label className="f">When does the contract end?<select id="q_agencyend"><option value="">Choose one</option><option>Month to month</option><option>Within 3 months</option><option>3 to 12 months</option><option>Over a year</option><option>Not sure</option></select></label>
        </div>
      </div>
    </div>

    <div className="step" data-q="site" data-auto="1">
      <h3>Do you have a website today?</h3>
      <div className="opts two" data-single="q_site"><label className="opt"><input type="radio" name="q_site" value="none" />No website yet</label><label className="opt"><input type="radio" name="q_site" value="diy" />Yes, I built it <small>Wix, GoDaddy, Squarespace</small></label><label className="opt"><input type="radio" name="q_site" value="agency" />Yes, an agency built it and hosts it</label><label className="opt"><input type="radio" name="q_site" value="unsure" />Yes, but not sure who runs it</label></div>
      <div className="cond" id="c_site" hidden>
        <p className="k">So we can include it in the audit. If it works, we keep it, and your setup comes down.</p>
        <div className="fields two">
          <label className="f">Website address<input type="text" id="q_url" placeholder="yourcompany.com" autoComplete="url" inputMode="url" autoCapitalize="none" /></label>
          <label className="f">What do you pay a month for it?<select id="q_sitefee"><option value="">Choose one</option><option>Nothing</option><option>Under $50</option><option>$50 to $200</option><option>Over $200</option><option>Not sure</option></select></label>
        </div>
      </div>
    </div>

    <div className="step" data-q="reviews" data-auto="1">
      <h3>How many Google reviews do you have, roughly?</h3>
      <p className="why">We will look it up anyway. A rough number is fine.</p>
      <div className="opts three" data-single="q_reviews"><label className="opt"><input type="radio" name="q_reviews" value="Under 20" />Under 20</label><label className="opt"><input type="radio" name="q_reviews" value="20 to 50" />20 to 50</label><label className="opt"><input type="radio" name="q_reviews" value="50 to 150" />50 to 150</label><label className="opt"><input type="radio" name="q_reviews" value="150 to 300" />150 to 300</label><label className="opt"><input type="radio" name="q_reviews" value="Over 300" />Over 300</label></div>
    </div>

    <div className="step" data-q="spend" data-auto="1">
      <h3>What do you spend on marketing today, per month, all in?</h3>
      <div className="opts three" data-single="q_spend"><label className="opt"><input type="radio" name="q_spend" value="0" />Nothing</label><label className="opt"><input type="radio" name="q_spend" value="lt1k" />Under $1,000</label><label className="opt"><input type="radio" name="q_spend" value="1-2.5k" />$1,000 to $2,500</label><label className="opt"><input type="radio" name="q_spend" value="2.5-5k" />$2,500 to $5,000</label><label className="opt"><input type="radio" name="q_spend" value="5k+" />Over $5,000</label></div>
    </div>

    <div className="step" data-q="cap" data-auto="1">
      <h3>If you booked 20% more jobs next month, could you take them?</h3>
      <p className="why">Honest answer. Some months you want to grow, some you do not, and our budget dial is built for that.</p>
      <div className="opts" data-single="q_cap"><label className="opt"><input type="radio" name="q_cap" value="yes" />Yes, we have room now</label><label className="opt"><input type="radio" name="q_cap" value="hire" />Yes, if I hire, and I would</label><label className="opt"><input type="radio" name="q_cap" value="no" />No, we are at capacity for now</label></div>
    </div>

    <div className="step" data-q="dm" data-auto="1">
      <h3>What is your role?</h3>
      <div className="opts three" data-single="q_dm"><label className="opt"><input type="radio" name="q_dm" value="owner" />I own the business</label><label className="opt"><input type="radio" name="q_dm" value="partner" />Partner or general manager</label><label className="opt"><input type="radio" name="q_dm" value="staff" />I work here, someone else decides</label></div>
    </div>


    <div className="result" id="r_done">
      <div className="tick">&#10003;</div>
      <p className="k">All set</p>
      <h3 id="done_h"></h3>
      <p className="why" id="done_p"></p>
      <p className="summary" id="sum_done"></p>
    </div>

    <div className="qznav" id="qznav">
      <button className="btn ghost" type="button" id="qzback">Back</button>
      <button className="btn" type="button" id="qznext">Next</button>
    </div>
    
    <p className="err" id="qzerr" role="alert"></p>
    <p className="trust"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="7" width="10" height="7" rx="1.5" /><path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" /></svg>Free, no obligation, and your answers stay with us. <a className="skip" id="scanlink">Not ready for a call? Get the free scan instead.</a></p>
  </div>
</div>

<div className="scanwrap" id="scanwrap" hidden>
  <div className="scancard" role="dialog" aria-modal="true" aria-labelledby="scan_h">
    <button className="scanx" type="button" id="scanx" aria-label="Close">&times;</button>
    <div id="scan_form">
      <p className="k">Before you go</p>
      <h3 id="scan_h">Not ready for a call? Take the free scan.</h3>
      <p className="why">A written scan of your Google profile, your reviews, your website and how your phone gets answered, with the three fixes that matter most. In your inbox within one business day. No call.</p>
      <div className="fields two">
        <label className="f">Company name<input type="text" id="s_company" placeholder="Company name" autoComplete="organization" /></label>
        <label className="f">Email<input type="email" id="s_email" placeholder="name@company.com" autoComplete="email" inputMode="email" autoCapitalize="none" autoCorrect="off" spellCheck="false" /></label>
      </div>
      <div className="grp" style={{marginTop:"14px"} as CSSProperties}><label className="f" htmlFor="s_url">Website <span className="hint">optional</span></label><input type="text" id="s_url" placeholder="yourcompany.com" autoComplete="url" inputMode="url" autoCapitalize="none" style={{marginTop:"8px"} as CSSProperties} /></div>
      <div className="qznav" style={{marginTop:"22px",paddingBottom:"0"} as CSSProperties}><a className="skip" id="scanno">No thanks, I will book a time</a><button className="btn" type="button" id="scango">Send my scan</button></div>
      <p className="err" id="scanerr" role="alert"></p>
    </div>
    <div id="scan_done" hidden>
      <div className="tick">&#10003;</div>
      <p className="k">On its way</p>
      <h3>Your scan lands within one business day.</h3>
      <p className="why">If you want the fixes done, the walkthrough is one click away, right here.</p>
      <div className="qznav" style={{paddingBottom:"0"} as CSSProperties}><span></span><button className="btn" type="button" id="scanbook">Book a time anyway</button></div>
    </div>
  </div>
</div>
    </>
  );
}
