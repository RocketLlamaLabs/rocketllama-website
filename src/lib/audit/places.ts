import type { Finding } from "./shared";
import { domainOf } from "./shared";

// Google Business Profile check through the Places API (New). Needs
// GOOGLE_PLACES_API_KEY with the Places API (New) enabled.

export type PlaceSummary = {
  id: string | null;
  name: string;
  rating: number | null;
  reviews: number | null;
  address: string | null;
  website: string | null;
  phone: string | null;
  hours: boolean;
  photos: number;
  status: string | null;
  mapsUrl: string | null;
  primaryType: string | null;
};

export type PlacesResult = {
  business: PlaceSummary | null;
  competitors: PlaceSummary[];
  query: string;
  competitorQuery: string | null;
  findings: Finding[];
};

const FIELDS = [
  "id",
  "displayName",
  "rating",
  "userRatingCount",
  "formattedAddress",
  "websiteUri",
  "nationalPhoneNumber",
  "regularOpeningHours",
  "photos",
  "businessStatus",
  "googleMapsUri",
  "primaryTypeDisplayName",
];

type ApiPlace = {
  id?: string;
  displayName?: { text?: string };
  rating?: number;
  userRatingCount?: number;
  formattedAddress?: string;
  websiteUri?: string;
  nationalPhoneNumber?: string;
  regularOpeningHours?: unknown;
  photos?: unknown[];
  businessStatus?: string;
  googleMapsUri?: string;
  primaryTypeDisplayName?: { text?: string };
};

async function search(query: string, max: number): Promise<PlaceSummary[]> {
  const res = await fetch("https://places.googleapis.com/v1/places:searchText", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-goog-api-key": process.env.GOOGLE_PLACES_API_KEY ?? "",
      "x-goog-fieldmask": FIELDS.map((f) => `places.${f}`).join(","),
    },
    body: JSON.stringify({ textQuery: query, pageSize: max }),
    signal: AbortSignal.timeout(12000),
    cache: "no-store",
  });
  const data = (await res.json()) as { places?: ApiPlace[]; error?: { message?: string } };
  if (!res.ok) throw new Error(data.error?.message ?? `Places API answered HTTP ${res.status}.`);
  return (data.places ?? []).map((p) => ({
    id: p.id ?? null,
    name: p.displayName?.text ?? "Unnamed",
    rating: p.rating ?? null,
    reviews: p.userRatingCount ?? null,
    address: p.formattedAddress ?? null,
    website: p.websiteUri ?? null,
    phone: p.nationalPhoneNumber ?? null,
    hours: !!p.regularOpeningHours,
    photos: p.photos?.length ?? 0,
    status: p.businessStatus ?? null,
    mapsUrl: p.googleMapsUri ?? null,
    primaryType: p.primaryTypeDisplayName?.text ?? null,
  }));
}

export const placesEnabled = () => !!process.env.GOOGLE_PLACES_API_KEY;

export async function auditPlaces({ name, city, industry, site }: { name: string; city: string; industry: string; site: string | null }): Promise<PlacesResult> {
  const query = [name, city].filter(Boolean).join(" ");
  const competitorQuery = industry && city ? `${industry} in ${city}` : null;
  const [found, comp] = await Promise.all([search(query, 5), competitorQuery ? search(competitorQuery, 10) : Promise.resolve([])]);
  return analyzePlaces({ found, comp, query, competitorQuery, site, city });
}

/** Turns the two Places searches into findings with specific numbers and links. */
export function analyzePlaces({ found, comp, query, competitorQuery, site, city }: { found: PlaceSummary[]; comp: PlaceSummary[]; query: string; competitorQuery: string | null; site: string | null; city: string }): PlacesResult {

  // Prefer the result whose website matches the prospect's domain.
  const domain = site ? domainOf(site) : null;
  const business = (domain && found.find((p) => p.website && domainOf(p.website) === domain)) || found[0] || null;
  const competitors = comp
    .filter((p) => !business || p.name !== business.name)
    .sort((a, b) => (b.reviews ?? 0) - (a.reviews ?? 0))
    .slice(0, 5);

  const findings: Finding[] = [];
  const add = (f: Finding) => findings.push(f);
  if (!business) {
    add({ id: "gbp", category: "local", label: "Google Business Profile", impact: "high", status: "fail", detail: `No Google listing came up for “${query}”.`, fix: "Claim and verify the Google Business Profile. It is the single biggest source of local calls.", steps: ["Go to business.google.com and search for the business name. Claim it if it exists, or create it.", "Choose the most specific primary category (for example “Plumber”, not “Contractor”) and add secondary categories for each main service.", "Verify by video or postcard, then add hours, service areas, services, photos and the website link."] });
    return { business, competitors, query, competitorQuery, findings };
  }
  add({ id: "gbp", category: "local", label: "Google Business Profile", impact: "high", status: business.status && business.status !== "OPERATIONAL" ? "fail" : "pass", detail: `Found “${business.name}”${business.address ? `, ${business.address}` : ""}${business.primaryType ? ` (${business.primaryType})` : ""}.`, fix: "The listing is marked closed. Fix the status in Business Profile Manager." });

  const top = competitors[0];
  const reviewLink = business.id ? `https://search.google.com/local/writereview?placeid=${business.id}` : null;
  add({
    id: "rating",
    category: "local",
    label: "Star rating",
    impact: "high",
    status: business.rating === null ? "fail" : business.rating >= 4.6 ? "pass" : business.rating >= 4.2 ? "warn" : "fail",
    detail: business.rating === null ? "No rating yet." : `${business.rating.toFixed(1)} stars${top?.rating ? ` against ${top.rating.toFixed(1)} for ${top.name}` : ""}.`,
    fix: "Ask every happy customer for a review by text the day the job is done, and reply to every review.",
    steps: [
      "Text the review link (below) to every customer the day the job is done, with the technician's name in the message.",
      "Reply to every review within two days. For a bad one: thank them, say what you changed, and offer to make it right offline.",
      "Never gate or filter reviews. Google removes them and can suspend the profile.",
    ],
    snippet: reviewLink ? { label: "Review request text (direct link to the review form)", text: `Hi {first name}, thanks for choosing ${business.name}. If {tech name} did a great job, would you leave us a quick Google review? It really helps a local business. ${reviewLink}` } : undefined,
  });
  const reviews = business.reviews ?? 0;
  const topReviews = top?.reviews ?? null;
  const ratio = topReviews ? reviews / topReviews : null;
  add({
    id: "review-count",
    category: "local",
    label: "Review count against the top competitor",
    impact: "high",
    status: ratio === null ? (reviews >= 100 ? "pass" : reviews >= 30 ? "warn" : "fail") : ratio >= 0.7 ? "pass" : ratio >= 0.3 ? "warn" : "fail",
    detail: `${reviews.toLocaleString("en-US")} reviews${top && topReviews !== null ? ` against ${topReviews.toLocaleString("en-US")} for ${top.name}, the most-reviewed competitor` : ""}.`,
    fix: "Review count is a top-three map ranking factor. An automated review request after every job closes the gap in months, not years.",
    steps: reviewGapSteps(reviews, top),
  });
  add({ id: "gbp-hours", category: "local", label: "Hours on the profile", impact: "medium", status: business.hours ? "pass" : "fail", detail: business.hours ? "Opening hours are set." : "No opening hours. Google and AI assistants show “hours unknown”.", fix: "Add regular and holiday hours.", steps: ["Business Profile → Edit profile → Hours: add regular hours, and “Open 24 hours” only if emergency calls are really answered around the clock.", "Add holiday hours before every public holiday."] });
  add({ id: "gbp-photos", category: "local", label: "Photos on the profile", impact: "medium", status: business.photos >= 10 ? "pass" : business.photos >= 3 ? "warn" : "fail", detail: business.photos >= 10 ? "The profile has 10 or more photos." : `The profile shows ${business.photos} photo${business.photos === 1 ? "" : "s"}.`, fix: `Upload at least ${Math.max(0, 25 - business.photos)} more photos, then add new ones every week.`, steps: ["Add a logo and a cover photo.", "Upload real photos: the team, the vans, before and after shots of jobs, the office or shop.", `Name the files before uploading, for example “${(competitorQuery ?? "service").split(" in ")[0].replace(/\s+/g, "-").toLowerCase()}-${city ? city.split(",")[0].trim().toLowerCase().replace(/\s+/g, "-") : "job"}-1.jpg”.`] });
  const siteMatch = business.website && domain ? domainOf(business.website) === domain : null;
  add({
    id: "gbp-website",
    category: "local",
    label: "Website linked from the profile",
    impact: "medium",
    status: !business.website ? "fail" : siteMatch === false ? "warn" : "pass",
    detail: !business.website ? "The profile has no website link." : siteMatch === false ? `The profile links to ${business.website}, not the audited site.` : `The profile links to ${business.website}.`,
    fix: "Link the profile to the main website with tracking tags so the traffic shows up in analytics.",
    snippet: site ? { label: "Website link for the Google profile", text: `${new URL(site).origin}/?utm_source=google&utm_medium=organic&utm_campaign=gbp` } : undefined,
  });
  add({ id: "gbp-phone", category: "local", label: "Phone on the profile", impact: "medium", status: business.phone ? "pass" : "fail", detail: business.phone ? `Phone: ${business.phone}.` : "No phone number on the profile.", fix: "Add the main phone number (a tracked number with the main line as secondary)." });
  return { business, competitors, query, competitorQuery, findings };
}

function reviewGapSteps(reviews: number, top: PlaceSummary | undefined): string[] {
  if (!top?.reviews) return ["Aim for at least 10 new reviews a month."];
  const target = Math.ceil(top.reviews * 0.7);
  const gap = Math.max(0, target - reviews);
  if (gap === 0) return ["Keep the pace: at least 10 new reviews a month."];
  const perMonth = Math.max(10, Math.ceil(gap / 12));
  return [
    `To reach 70% of ${top.name}'s count you need about ${gap.toLocaleString("en-US")} more reviews (${target.toLocaleString("en-US")} total).`,
    `At ${perMonth} new reviews a month that takes about ${Math.ceil(gap / perMonth)} months. That is roughly one review for every two or three jobs.`,
    "Automate the request: a text with the direct review link goes out when each job is marked complete, with one reminder two days later.",
  ];
}
