import "server-only";
import { lookup } from "node:dns/promises";
import { isIP } from "node:net";

// The audit fetches URLs typed by whoever runs it, so every hop is checked
// against private and internal addresses before it is requested.

export const BROWSER_UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Safari/537.36";

function isPrivateIp(ip: string): boolean {
  if (isIP(ip) === 4) {
    const [a, b] = ip.split(".").map(Number);
    return (
      a === 0 ||
      a === 10 ||
      a === 127 ||
      (a === 100 && b >= 64 && b <= 127) ||
      (a === 169 && b === 254) ||
      (a === 172 && b >= 16 && b <= 31) ||
      (a === 192 && b === 168) ||
      (a === 198 && (b === 18 || b === 19)) ||
      a >= 224
    );
  }
  const v6 = ip.toLowerCase();
  if (v6.startsWith("::ffff:")) return isPrivateIp(v6.slice(7));
  return (
    v6 === "::" ||
    v6 === "::1" ||
    v6.startsWith("fc") ||
    v6.startsWith("fd") ||
    v6.startsWith("fe8") ||
    v6.startsWith("fe9") ||
    v6.startsWith("fea") ||
    v6.startsWith("feb")
  );
}

async function assertPublic(url: URL) {
  if (url.protocol !== "https:" && url.protocol !== "http:") {
    throw new Error("Only http and https URLs can be audited.");
  }
  if (url.port && url.port !== "80" && url.port !== "443") {
    throw new Error("Only standard web ports can be audited.");
  }
  const host = url.hostname.replace(/^\[|\]$/g, "");
  if (host === "localhost" || host.endsWith(".local") || host.endsWith(".internal")) {
    throw new Error("That address is not a public website.");
  }
  const addresses = isIP(host) ? [{ address: host }] : await lookup(host, { all: true });
  if (addresses.length === 0 || addresses.some((a) => isPrivateIp(a.address))) {
    throw new Error("That address is not a public website.");
  }
}

export type FetchedPage = {
  url: string;
  finalUrl: string;
  status: number;
  headers: Headers;
  body: string;
  bytes: number;
  ms: number;
  redirects: string[];
};

/**
 * GET a public URL, following up to five redirects by hand so each hop is
 * checked. The body is capped at maxBytes; anything past that is dropped.
 */
export async function safeFetch(
  input: string,
  {
    timeoutMs = 12000,
    maxBytes = 3_000_000,
    headers = {},
  }: { timeoutMs?: number; maxBytes?: number; headers?: Record<string, string> } = {},
): Promise<FetchedPage> {
  const started = Date.now();
  const redirects: string[] = [];
  let current = new URL(input);
  const signal = AbortSignal.timeout(timeoutMs);

  for (let hop = 0; hop <= 5; hop++) {
    await assertPublic(current);
    const res = await fetch(current, {
      redirect: "manual",
      signal,
      headers: {
        "user-agent": BROWSER_UA,
        accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "accept-language": "en-US,en;q=0.9",
        ...headers,
      },
      cache: "no-store",
    });

    const location = res.headers.get("location");
    if (res.status >= 300 && res.status < 400 && location) {
      redirects.push(current.toString());
      current = new URL(location, current);
      await res.body?.cancel();
      continue;
    }

    let body = "";
    let bytes = 0;
    if (res.body) {
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        bytes += value.byteLength;
        if (bytes <= maxBytes) body += decoder.decode(value, { stream: true });
        else {
          await reader.cancel();
          break;
        }
      }
      body += decoder.decode();
    }
    return {
      url: input,
      finalUrl: current.toString(),
      status: res.status,
      headers: res.headers,
      body,
      bytes,
      ms: Date.now() - started,
      redirects,
    };
  }
  throw new Error("Too many redirects.");
}

/** Like safeFetch but never throws: a failed request comes back as null. */
export async function tryFetch(
  input: string,
  opts?: Parameters<typeof safeFetch>[1],
): Promise<FetchedPage | null> {
  try {
    return await safeFetch(input, opts);
  } catch {
    return null;
  }
}
