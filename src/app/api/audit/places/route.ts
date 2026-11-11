import { auditPlaces, placesEnabled } from "@/lib/audit/places";
import { normalizeSiteUrl } from "@/lib/audit/shared";
import { param, respond } from "@/lib/audit/respond";

export const maxDuration = 30;

export async function GET(req: Request) {
  return respond(async () => {
    if (!placesEnabled()) return { disabled: true as const };
    const name = param(req, "name");
    if (!name) throw new Error("A business name is needed to find the Google profile.");
    return auditPlaces({ name, city: param(req, "city"), industry: param(req, "industry"), site: normalizeSiteUrl(param(req, "site", 500)) });
  });
}
