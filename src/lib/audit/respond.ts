import "server-only";

// Every audit route answers { ok: true, data } or { ok: false, error } so the
// report page can show a section as failed without losing the others.
export async function respond<T>(work: () => Promise<T>): Promise<Response> {
  try {
    const data = await work();
    return Response.json({ ok: true, data }, { headers: { "cache-control": "no-store" } });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Something went wrong.";
    return Response.json({ ok: false, error: message }, { status: 200, headers: { "cache-control": "no-store" } });
  }
}

export function param(req: Request, key: string, max = 200): string {
  return (new URL(req.url).searchParams.get(key) ?? "").trim().slice(0, max);
}
