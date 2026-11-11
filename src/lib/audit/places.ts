import "server-only";
import type { Finding } from "./shared";
import { domainOf } from "./shared";

// Google Business Profile check through the Places API (New). Needs
// GOOGLE_PLACES_API_KEY with the Places API (New) enabled.

export type PlaceSummary = {
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
    add({ id: "gbp", category: "local", label: "Google Business Profile", impact: "high", status: "fail", detail: `No Google listing came up for “${query}”.`, fix: "Claim and verify the Google Business Profile. It is the single biggest source of local calls." });
    return { business, competitors, query, competitorQuery, findings };
  }
  add({ id: "gbp", category: "local", label: "Google Business Profile", impact: "high", status: business.status && business.status !== "OPERATIONAL" ? "fail" : "pass", detail: `Found “${business.name}”${business.address ? `, ${business.address}` : ""}${business.primaryType ? ` (${business.primaryType})` : ""}.`, fix: "The listing is marked closed. Fix the status in Business Profile Manager." });

  const top = competitors[0];
  add({
    id: "rating",
    category: "local",
    label: "Star rating",
    impact: "high",
    status: business.rating === null ? "fail" : business.rating >= 4.6 ? "pass" : business.rating >= 4.2 ? "warn" : "fail",
    detail: business.rating === null ? "No rating yet." : `${business.rating.toFixed(1)} stars${top?.rating ? ` against ${top.rating.toFixed(1)} for ${top.name}` : ""}.`,
    fix: "Ask every happy customer for a review by text the day the job is done, and reply to every review.",
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
  });
  add({ id: "gbp-hours", category: "local", label: "Hours on the profile", impact: "medium", status: business.hours ? "pass" : "fail", detail: business.hours ? "Opening hours are set." : "No opening hours. Google and AI assistants show “hours unknown”.", fix: "Add regular and holiday hours." });
  add({ id: "gbp-photos", category: "local", label: "Photos on the profile", impact: "medium", status: business.photos >= 10 ? "pass" : business.photos >= 3 ? "warn" : "fail", detail: business.photos >= 10 ? "The profile has 10 or more photos." : `The profile shows ${business.photos} photo${business.photos === 1 ? "" : "s"}.`, fix: "Upload real job, team and truck photos every week. Profiles with photos get more calls and direction requests." });
  const siteMatch = business.website && domain ? domainOf(business.website) === domain : null;
  add({
    id: "gbp-website",
    category: "local",
    label: "Website linked from the profile",
    impact: "medium",
    status: !business.website ? "fail" : siteMatch === false ? "warn" : "pass",
    detail: !business.website ? "The profile has no website link." : siteMatch === false ? `The profile links to ${business.website}, not the audited site.` : `The profile links to ${business.website}.`,
    fix: "Link the profile to the main website, ideally with UTM tags so the traffic shows up in analytics.",
  });
  add({ id: "gbp-phone", category: "local", label: "Phone on the profile", impact: "medium", status: business.phone ? "pass" : "fail", detail: business.phone ? `Phone: ${business.phone}.` : "No phone number on the profile.", fix: "Add the main phone number (a tracked number with the main line as secondary)." });
  return { business, competitors, query, competitorQuery, findings };
}
