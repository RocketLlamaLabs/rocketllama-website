import { auditSite } from "@/lib/audit/site";
import { normalizeSiteUrl } from "@/lib/audit/shared";
import { param, respond } from "@/lib/audit/respond";

export const maxDuration = 60;

export async function GET(req: Request) {
  return respond(async () => {
    const url = normalizeSiteUrl(param(req, "url", 500));
    if (!url) throw new Error("Enter a website address, such as acme.com.");
    return auditSite(url, { name: param(req, "name"), city: param(req, "city"), industry: param(req, "industry") });
  });
}
