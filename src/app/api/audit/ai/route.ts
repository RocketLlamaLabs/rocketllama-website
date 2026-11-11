import { aiEnabled, auditAi } from "@/lib/audit/ai";
import { normalizeSiteUrl } from "@/lib/audit/shared";
import { param, respond } from "@/lib/audit/respond";

export const maxDuration = 60;

export async function GET(req: Request) {
  return respond(async () => {
    if (!aiEnabled()) return { disabled: true as const };
    const name = param(req, "name");
    if (!name) throw new Error("A business name is needed for the AI check.");
    return auditAi({ name, city: param(req, "city"), industry: param(req, "industry"), site: normalizeSiteUrl(param(req, "site", 500)) });
  });
}
