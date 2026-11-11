import "server-only";
import { tryFetch } from "./safe-fetch";
import { type Platform, profileUrl } from "./shared";

// Best-effort public profile check. Most networks show a login wall to
// servers, so we read whatever the public page gives away (status, title,
// description, follower counts) and say plainly when it cannot be verified.

export type SocialResult = {
  platform: Platform;
  handle: string;
  url: string;
  state: "found" | "missing" | "unverified";
  name: string | null;
  bio: string | null;
  followers: number | null;
  posts: number | null;
  note: string | null;
};

function num(s: string | undefined | null): number | null {
  if (!s) return null;
  const m = s.replace(/,/g, "").match(/([\d.]+)\s*([KkMmBb])?/);
  if (!m) return null;
  const n = Number(m[1]);
  const mult = { k: 1e3, m: 1e6, b: 1e9 }[(m[2] ?? "").toLowerCase() as "k" | "m" | "b"] ?? 1;
  return Number.isFinite(n) ? Math.round(n * mult) : null;
}

function metaContent(html: string, key: string): string | null {
  // Regex, not a DOM parse: profile pages run to megabytes and the tags can sit deep in them.
  const esc = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const tag = html.match(new RegExp(`<meta[^>]+(?:property|name)=["']${esc}["'][^>]*>`, "i"))?.[0];
  const v = tag?.match(/content=["']([^"']*)["']/i)?.[1]?.trim();
  return v ? decode(v) : null;
}

function decode(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)));
}

export async function auditSocial(platform: Platform, handle: string): Promise<SocialResult> {
  const url = profileUrl(platform, handle);
  const base: SocialResult = { platform, handle, url, state: "unverified", name: null, bio: null, followers: null, posts: null, note: null };

  if (platform === "linkedin" || platform === "x") {
    return { ...base, note: `${platform === "x" ? "X" : "LinkedIn"} hides profiles from automated checks. Open the profile to confirm it and note the follower count.` };
  }

  const page = await tryFetch(url, { timeoutMs: 10000, maxBytes: 2_500_000 });
  if (!page) return { ...base, note: "The profile page did not respond. Open it to check by hand." };
  if (page.status === 404 || page.status === 410) return { ...base, state: "missing", note: "This profile does not exist." };
  if (page.status >= 400) return { ...base, note: `The network answered HTTP ${page.status}. Open the profile to check by hand.` };

  const html = page.body;
  const ogTitle = metaContent(html, "og:title");
  const ogDesc = metaContent(html, "og:description") ?? metaContent(html, "description");
  const out: SocialResult = { ...base, name: ogTitle, bio: ogDesc };

  switch (platform) {
    case "instagram": {
      // "1,234 Followers, 56 Following, 78 Posts - See Instagram photos and videos from Acme (@acme)"
      const m = ogDesc?.match(/([\d.,]+[KkMm]?)\s+Followers?,\s*[\d.,]+[KkMm]?\s+Following,\s*([\d.,]+[KkMm]?)\s+Posts?/i);
      if (m) {
        out.followers = num(m[1]);
        out.posts = num(m[2]);
        out.state = "found";
        out.bio = ogDesc?.split(/ - |: /).slice(1).join(" - ") || null;
      } else if (/page isn.?t available|sorry, this page/i.test(html)) {
        out.state = "missing";
        out.note = "Instagram says this page is not available.";
      } else {
        out.note = "Instagram returned a login wall. Open the profile to confirm the follower and post counts.";
      }
      break;
    }
    case "facebook": {
      const likes = ogDesc?.match(/([\d.,]+[KkMm]?)\s+likes?/i) ?? html.match(/([\d.,]+[KkMm]?)\s+(?:followers|likes)/i);
      if (/content isn.?t available|page not found|this page isn.?t available/i.test(html) && !ogTitle) {
        out.state = "missing";
        out.note = "Facebook says this page is not available.";
      } else if (ogTitle && !/^(facebook|log in|log into facebook)/i.test(ogTitle)) {
        out.state = "found";
        out.followers = num(likes?.[1]);
        if (out.followers === null) out.note = "The page exists. Facebook hid the follower count from our check.";
      } else {
        out.note = "Facebook returned a login wall. Open the page to check it by hand.";
      }
      break;
    }
    case "tiktok": {
      const f = html.match(/"followerCount":(\d+)/);
      const v = html.match(/"videoCount":(\d+)/);
      const nick = html.match(/"nickname":"([^"]+)"/);
      if (f) {
        out.state = "found";
        out.followers = Number(f[1]);
        out.posts = v ? Number(v[1]) : null;
        out.name = nick?.[1] ?? out.name;
        const sig = html.match(/"signature":"([^"]*)"/);
        out.bio = sig?.[1] ? sig[1].replace(/\\n/g, " ") : out.bio;
      } else if (/"statusCode":10221|couldn.?t find this account/i.test(html)) {
        out.state = "missing";
        out.note = "TikTok says this account does not exist.";
      } else {
        out.note = "TikTok did not share the profile with our check. Open it to confirm.";
      }
      break;
    }
    case "youtube": {
      const subs = html.match(/([\d.,]+[KkMm]?) subscribers/);
      const vids = html.match(/"videosCountText":\{"runs":\[\{"text":"([\d,.]+[KkMm]?)"/) ?? html.match(/([\d,.]+[KkMm]?) videos/);
      if (ogTitle && !/^youtube$/i.test(ogTitle)) {
        out.state = "found";
        out.followers = num(subs?.[1]);
        out.posts = num(vids?.[1]);
      } else {
        out.note = "YouTube did not return a channel. Check the handle.";
        out.state = page.status === 200 ? "unverified" : "missing";
      }
      break;
    }
  }
  return out;
}
