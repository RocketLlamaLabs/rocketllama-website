import { auditSpeed } from "@/lib/audit/speed";
import { normalizeSiteUrl } from "@/lib/audit/shared";
import { param, respond } from "@/lib/audit/respond";

export const maxDuration = 60;

export async function GET(req: Request) {
  return respond(async () => {
    const url = normalizeSiteUrl(param(req, "url", 500));
    if (!url) throw new Error("Enter a website address, such as acme.com.");
    return auditSpeed(url);
  });
}
