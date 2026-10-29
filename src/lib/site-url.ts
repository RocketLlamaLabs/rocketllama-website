import { headers } from "next/headers";

// Public origin of the current request, e.g. https://rocketllamalabs.com.
// Used to build absolute URLs for auth emails and redirects.
export async function getSiteOrigin() {
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "https";
  if (!host) return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return `${proto}://${host}`;
}
