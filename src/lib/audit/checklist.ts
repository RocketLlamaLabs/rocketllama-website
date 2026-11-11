import type { CategoryId, Finding, Impact } from "./shared";

// The parts of a marketing system no crawler can see. The auditor answers
// these on the report; answers live in the URL (?m=) so a shared link keeps them.

export type ChecklistItem = {
  id: string;
  category: CategoryId;
  label: string;
  impact: Impact;
  /** How to check it. */
  how: string;
  fix: string;
  /** When "no" is a gap but not a failure (for example, not running ads yet). */
  softNo?: boolean;
};

export const CHECKLIST: ChecklistItem[] = [
  { id: "sc-frequency", category: "social", label: "Posts at least three times a week on the main platform", impact: "high", how: "Scroll the main profile and count the last 30 days of posts.", fix: "Set a weekly content calendar: one job photo, one short video, one review or tip." },
  { id: "sc-video", category: "social", label: "Uses short-form video (Reels, TikTok, Shorts)", impact: "medium", how: "Look for Reels, TikToks or Shorts in the last 60 days.", fix: "Film 15–30 second clips on the job: before and after, a quick tip, the team." },
  { id: "sc-brand", category: "social", label: "Photo, bio and link are consistent on every profile", impact: "medium", how: "Compare name, logo, bio, phone and link across the profiles.", fix: "Use one logo, one name and one bio everywhere, with a tracked link to the booking page." },
  { id: "sc-engage", category: "social", label: "Replies to comments and messages within a day", impact: "medium", how: "Check comments on the last five posts and send a test DM.", fix: "Route DMs and comments into one inbox and answer within business hours." },
  { id: "sc-proof", category: "social", label: "Shows real jobs, team and results, not stock images", impact: "low", how: "Look at the last 12 posts.", fix: "Swap stock graphics for real photos from the field." },
  { id: "ad-meta", category: "ads", label: "Running Facebook and Instagram ads", impact: "medium", softNo: true, how: "Search the business in the Meta Ad Library (link below).", fix: "Test a lead-form or retargeting campaign on Meta with a clear local offer." },
  { id: "ad-google", category: "ads", label: "Running Google Search or Local Services Ads", impact: "medium", softNo: true, how: "Search the domain in the Google Ads Transparency Center and search the main service plus city.", fix: "Start Local Services Ads (pay per lead, Google Guaranteed badge) and a tight search campaign on high-intent keywords." },
  { id: "ad-offer", category: "ads", label: "Ads lead with a clear offer and one call to action", impact: "medium", how: "Read the live ads in the ad libraries.", fix: "Lead every ad with one offer, one benefit and one action." },
  { id: "ad-landing", category: "ads", label: "Ads land on a matching landing page, not the homepage", impact: "high", how: "Click through a live ad and see where it lands.", fix: "Build one landing page per campaign that repeats the ad's offer and has one form." },
  { id: "ad-conversions", category: "ads", label: "Calls, forms and bookings are tracked as conversions", impact: "high", how: "Ask the client, or check the ad accounts if you have access.", fix: "Set up conversion tracking for calls, forms and bookings and import offline sales." },
  { id: "ad-retarget", category: "ads", label: "Retargets visitors who did not convert", impact: "low", how: "Visit the site, then watch for their ads over the next few days.", fix: "Run a low-budget retargeting campaign to recent site visitors." },
  { id: "ld-speed", category: "leads", label: "New web leads get a reply within five minutes", impact: "high", how: "Submit the website form as a test lead and time the reply.", fix: "Automate an instant text reply and alert the team the second a lead arrives." },
  { id: "ld-answer", category: "leads", label: "A person or AI answers the phone during business hours", impact: "high", how: "Call the main number during business hours.", fix: "Add an AI receptionist or answering service so no call goes to voicemail." },
  { id: "ld-afterhours", category: "leads", label: "After-hours leads get an instant reply", impact: "medium", how: "Call or submit the form after hours.", fix: "Send missed callers an automatic text with a booking link." },
  { id: "ld-crm", category: "leads", label: "Every lead lands in a CRM with follow-up", impact: "medium", how: "Ask the client how leads are tracked.", fix: "Put every lead in one CRM with an automatic follow-up sequence for quotes that did not close." },
  { id: "ld-email", category: "leads", label: "Emails past customers with offers or reminders", impact: "low", how: "Ask the client, or join their list from the site.", fix: "Send a monthly email and seasonal service reminders to past customers." },
  { id: "lc-ask", category: "local", label: "Asks every customer for a Google review", impact: "high", how: "Ask the client, and check how fast new reviews arrive.", fix: "Text a review link automatically when every job is marked done." },
  { id: "lc-reply", category: "local", label: "Replies to every Google review", impact: "medium", how: "Open the Google profile and read the last ten reviews.", fix: "Reply to every review within two days, good or bad." },
  { id: "lc-posts", category: "local", label: "Posts updates to the Google profile", impact: "low", how: "Open the Updates tab on the Google profile.", fix: "Post a job photo or offer to the Google profile every week." },
];

export type Answer = "y" | "n" | "na";

export function parseAnswers(m: string | null): Record<string, Answer> {
  const out: Record<string, Answer> = {};
  for (const pair of (m ?? "").split(",")) {
    const [id, v] = pair.split(":");
    if (id && (v === "y" || v === "n" || v === "na") && CHECKLIST.some((c) => c.id === id)) out[id] = v;
  }
  return out;
}

export function serializeAnswers(a: Record<string, Answer>): string {
  return CHECKLIST.filter((c) => a[c.id]).map((c) => `${c.id}:${a[c.id]}`).join(",");
}

export function checklistFindings(a: Record<string, Answer>): Finding[] {
  return CHECKLIST.filter((c) => a[c.id] === "y" || a[c.id] === "n").map((c) => ({
    id: c.id,
    category: c.category,
    label: c.label,
    impact: c.impact,
    status: a[c.id] === "y" ? "pass" : c.softNo ? "warn" : "fail",
    detail: a[c.id] === "y" ? "Confirmed by the auditor." : "Not in place, per the auditor.",
    fix: c.fix,
  }));
}
