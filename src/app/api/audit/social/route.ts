import { auditSocial } from "@/lib/audit/social";
import { PLATFORMS, normalizeHandle, type Platform } from "@/lib/audit/shared";
import { param, respond } from "@/lib/audit/respond";

export const maxDuration = 30;

export async function GET(req: Request) {
  return respond(async () => {
    const platform = param(req, "platform") as Platform;
    if (!PLATFORMS.some((p) => p.id === platform)) throw new Error("Unknown platform.");
    const handle = normalizeHandle(platform, param(req, "handle"));
    if (!handle) throw new Error("Enter a handle or profile link.");
    return auditSocial(platform, handle);
  });
}
