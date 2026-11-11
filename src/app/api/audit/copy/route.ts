import { aiEnabled } from "@/lib/audit/ai";
import { writeCopy } from "@/lib/audit/copy";
import { respond } from "@/lib/audit/respond";

export const maxDuration = 60;

export async function POST(req: Request) {
  return respond(async () => {
    if (!aiEnabled()) return { disabled: true as const };
    const body = (await req.json()) as Record<string, unknown>;
    const str = (k: string, max = 300) => (typeof body[k] === "string" ? (body[k] as string).trim().slice(0, max) : "");
    const name = str("name");
    if (!name) throw new Error("A business name is needed to write copy.");
    return writeCopy({
      name,
      city: str("city"),
      industry: str("industry"),
      site: str("site", 500),
      title: str("title"),
      description: str("description", 400),
      h1: str("h1"),
      pageText: str("pageText", 6000),
    });
  });
}
