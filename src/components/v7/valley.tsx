"use client";

import type { CSSProperties } from "react";
import { useEffect } from "react";
import { mountValley } from "./behavior/valley";

// The Valley: the cities we serve. From Madison's map mockup, without the
// open or closed spots: pick your trade, tap a city, and see what people
// search for there, who the top company is, and how the system is tuned to
// that trade (the photo band and the three tuning cards). Figures are
// illustrative until the CRM feeds them.
const CITIES: [string, number, number, string][] = [
  ["Surprise", 95, 150, "r"], ["Peoria", 170, 190, "r"], ["Glendale", 220, 240, "l"], ["Cave Creek", 300, 80, "r"],
  ["Phoenix", 300, 250, "t"], ["Scottsdale", 410, 180, "r"], ["Tempe", 370, 300, "r"], ["Mesa", 470, 300, "r"],
  ["Chandler", 410, 380, "l"], ["Gilbert", 480, 390, "r"], ["Queen Creek", 540, 450, "l"], ["Goodyear", 130, 320, "r"],
];
const TRADES = ["HVAC", "Plumbing", "Electrical", "Roofing", "Garage door", "Pest control", "Landscaping"];

export function Valley({ base = "" }: { base?: string }) {
  useEffect(mountValley, []);
  return (
    <>
<div className="band photo-band" id="tradeband" style={{"--img":"url(/v2/img/hero-hvac.jpg)"} as CSSProperties}><div className="bg on" style={{backgroundImage:"url(/v2/img/hero-hvac.jpg)"} as CSSProperties}></div><div className="bg"></div><div className="dots" id="trade-dots"></div><div className="wrap in">
  <p className="kicker">Built for <span data-t="trade-lc">HVAC</span></p>
  <h2 className="photo-h2">When the AC dies in July, the first company to answer gets the job.</h2>
  <p className="photo-p">Every new lead gets a text and an email in under a minute, in your voice, even when your techs are on a roof in 112°. The phone still rings you first. If nobody can pick up, the AI books it.</p>
</div></div>
    </>
  );
}
