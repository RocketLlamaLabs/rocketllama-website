import { demoAudit } from "@/lib/audit/demo";

// The sample audit behind /marketing-audit/report?demo=1.
export async function GET() {
  return Response.json(demoAudit(), { headers: { "cache-control": "no-store" } });
}
