"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { AiResult } from "@/lib/audit/ai";
import type { PlacesResult } from "@/lib/audit/places";
import type { SiteResult } from "@/lib/audit/site";
import type { SocialResult } from "@/lib/audit/social";
import type { SpeedResult } from "@/lib/audit/speed";
import { CHECKLIST, checklistFindings, parseAnswers, serializeAnswers, type Answer } from "@/lib/audit/checklist";
import {
  CATEGORIES,
  PLATFORMS,
  type CategoryId,
  type Finding,
  type Platform,
  domainOf,
  normalizeHandle,
  priorityOrder,
  profileUrl,
  scoreFindings,
  verdict,
} from "@/lib/audit/shared";
import { Bar, ExtLink, FindingRow, ImpactTag, Panel, ScoreRing, Spinner, StatusChip } from "./parts";

type Load<T> =
  | { state: "loading" }
  | { state: "ok"; data: T }
  | { state: "error"; error: string }
  | { state: "disabled" }
  | { state: "skipped"; why: string };

type ApiReply<T> = { ok: true; data: T } | { ok: false; error: string };

async function call<T>(path: string, params: Record<string, string>, signal: AbortSignal): Promise<Load<T>> {
  try {
    const res = await fetch(`/api/audit/${path}?${new URLSearchParams(params)}`, { signal, cache: "no-store" });
    const json = (await res.json()) as ApiReply<T | { disabled: true }>;
    if (!json.ok) return { state: "error", error: json.error };
    if (json.data && typeof json.data === "object" && "disabled" in json.data) return { state: "disabled" };
    return { state: "ok", data: json.data as T };
  } catch (e) {
    if (signal.aborted) throw e;
    return { state: "error", error: networkError(e) };
  }
}
const networkError = (e: unknown) => (e instanceof Error && /JSON/.test(e.message) ? "The check timed out." : "The check could not be reached.");

const fmt = (n: number | null | undefined) => (typeof n === "number" ? n.toLocaleString("en-US") : "–");

export function AuditReport() {
  const sp = useSearchParams();
  const input = useMemo(() => {
    const handles: Partial<Record<Platform, string>> = {};
    for (const p of PLATFORMS) {
      const h = normalizeHandle(p.id, sp.get(p.param));
      if (h) handles[p.id] = h;
    }
    return {
      site: sp.get("site") ?? "",
      name: sp.get("name") ?? "",
      city: sp.get("city") ?? "",
      industry: sp.get("industry") ?? "",
      handles,
    };
  }, [sp]);
  const key = JSON.stringify(input);

  const [site, setSite] = useState<Load<SiteResult>>({ state: "loading" });
  const [speed, setSpeed] = useState<Load<SpeedResult>>({ state: "loading" });
  const [places, setPlaces] = useState<Load<PlacesResult>>({ state: "loading" });
  const [ai, setAi] = useState<Load<AiResult>>({ state: "loading" });
  const [socials, setSocials] = useState<Partial<Record<Platform, Load<SocialResult>>>>({});
  const [answers, setAnswers] = useState<Record<string, Answer>>(() => parseAnswers(sp.get("m")));
  const [copied, setCopied] = useState(false);
  const [runAt] = useState(() => new Date());

  useEffect(() => {
    const ac = new AbortController();
    const { signal } = ac;
    const run = async () => {
      setSite({ state: "loading" });
      setSpeed({ state: "loading" });
      setPlaces({ state: "loading" });
      setAi({ state: "loading" });
      setSocials({});

      const speedP = input.site
        ? call<SpeedResult>("speed", { url: input.site }, signal).then(setSpeed)
        : Promise.resolve(setSpeed({ state: "skipped", why: "No website was entered." }));

      let siteRes: Load<SiteResult> = { state: "skipped", why: "No website was entered." };
      if (input.site) siteRes = await call<SiteResult>("site", { url: input.site }, signal);
      setSite(siteRes);

      const found = siteRes.state === "ok" ? siteRes.data.socials : {};
      const handles = { ...found, ...input.handles };
      const name = input.name || (siteRes.state === "ok" ? siteRes.data.businessName ?? "" : "") || (input.site ? domainOf(input.site) : "");
      const ctx = { name, city: input.city, industry: input.industry, site: input.site };

      const entries = Object.entries(handles) as [Platform, string][];
      setSocials(Object.fromEntries(entries.map(([p]) => [p, { state: "loading" }])));
      const socialP = entries.map(([platform, handle]) =>
        call<SocialResult>("social", { platform, handle }, signal).then((r) => setSocials((s) => ({ ...s, [platform]: r }))),
      );
      const placesP = name ? call<PlacesResult>("places", ctx, signal).then(setPlaces) : Promise.resolve(setPlaces({ state: "skipped", why: "No business name to search for." }));
      const aiP = name ? call<AiResult>("ai", ctx, signal).then(setAi) : Promise.resolve(setAi({ state: "skipped", why: "No business name to ask about." }));
      await Promise.all([speedP, placesP, aiP, ...socialP]);
    };
    run().catch(() => {});
    return () => ac.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- key captures input
  }, [key]);

  // Keep checklist answers in the URL so the shared link carries them.
  function answer(id: string, v: Answer) {
    setAnswers((prev) => {
      const next = { ...prev };
      if (next[id] === v) delete next[id];
      else next[id] = v;
      const url = new URL(window.location.href);
      const m = serializeAnswers(next);
      if (m) url.searchParams.set("m", m);
      else url.searchParams.delete("m");
      window.history.replaceState(null, "", url);
      return next;
    });
  }

  const siteData = site.state === "ok" ? site.data : null;
  const businessName = input.name || siteData?.businessName || (input.site ? domainOf(input.site) : "This business");

  const socialFindings = useMemo<Finding[]>(() => {
    const out: Finding[] = [];
    let present = 0;
    for (const p of PLATFORMS) {
      const r = socials[p.id];
      if (!r || r.state !== "ok") continue;
      const d = r.data;
      if (d.state !== "missing") present++;
      out.push({
        id: `social-${p.id}`,
        category: "social",
        label: `${p.name} profile`,
        impact: p.id === "instagram" || p.id === "facebook" ? "medium" : "low",
        status: d.state === "found" ? "pass" : d.state === "missing" ? "fail" : "info",
        detail:
          d.state === "found"
            ? [d.followers !== null ? `${fmt(d.followers)} followers` : null, d.posts !== null ? `${fmt(d.posts)} posts` : null].filter(Boolean).join(", ") || "The profile is live."
            : d.note ?? "",
        fix: d.state === "missing" ? `Claim the ${p.name} handle and link it from the website, or remove the broken link.` : undefined,
      });
    }
    const done = Object.values(socials).every((s) => s && s.state !== "loading");
    if (done) {
      out.push({
        id: "social-presence",
        category: "social",
        label: "Active social profiles",
        impact: "high",
        status: present >= 3 ? "pass" : present >= 1 ? "warn" : "fail",
        detail: present ? `${present} profile${present > 1 ? "s" : ""} found.` : "No social profiles were found or entered.",
        fix: "Run at least Google, Facebook and Instagram, plus TikTok or YouTube for video. Customers check them before they call.",
      });
    }
    return out;
  }, [socials]);

  const findings = useMemo<Finding[]>(() => {
    const all: Finding[] = [];
    if (site.state === "ok") all.push(...site.data.findings);
    if (speed.state === "ok") all.push(...speed.data.findings);
    if (places.state === "ok") all.push(...places.data.findings);
    if (ai.state === "ok") all.push(...ai.data.findings);
    all.push(...socialFindings, ...checklistFindings(answers));
    return all;
  }, [site, speed, places, ai, socialFindings, answers]);

  const byCat = useMemo(() => {
    const m = new Map<CategoryId, Finding[]>();
    for (const c of CATEGORIES) m.set(c.id, []);
    for (const f of findings) m.get(f.category)!.push(f);
    for (const list of m.values()) list.sort(priorityOrder);
    return m;
  }, [findings]);
  // Without PageSpeed, server response time alone is too thin to score speed.
  const catScores = CATEGORIES.map((c) => ({ ...c, score: c.id === "speed" && speed.state !== "ok" ? null : scoreFindings(byCat.get(c.id)!) }));
  const scored = catScores.filter((c) => c.score !== null);
  const overall = scored.length ? Math.round(scored.reduce((s, c) => s + (c.score ?? 0), 0) / scored.length) : null;
  const priorities = findings.filter((f) => f.status === "fail" || f.status === "warn").sort(priorityOrder).slice(0, 8);

  const loads = [site, speed, places, ai, ...Object.values(socials)].filter(Boolean) as Load<unknown>[];
  const running = loads.filter((l) => l.state === "loading").length;

  async function copyLink() {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const editHref = `/marketing-audit?${sp.toString()}`;
  const domain = input.site ? domainOf(input.site) : null;

  return (
    <div>
      {/* Summary */}
      <section className="bg-mist print:bg-white">
        <div className="mx-auto max-w-6xl px-5 py-10">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-display text-[13px] font-bold tracking-[0.08em] text-blue uppercase">Marketing system audit</p>
              <h1 className="mt-2 text-3xl leading-tight font-bold sm:text-4xl">{businessName}</h1>
              <p className="mt-2 text-muted">
                {[domain, input.city, input.industry].filter(Boolean).join(" · ")}
                {" · "}
                {runAt.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </p>
              <div className="mt-5 flex flex-wrap gap-3 print:hidden">
                <button type="button" onClick={copyLink} className="inline-flex min-h-11 items-center rounded-md border-[1.5px] border-navy bg-white px-5 font-semibold hover:bg-mist">
                  {copied ? "Link copied" : "Copy share link"}
                </button>
                <button type="button" onClick={() => window.print()} className="inline-flex min-h-11 items-center rounded-md border-[1.5px] border-navy bg-white px-5 font-semibold hover:bg-mist">
                  Save as PDF
                </button>
                <Link href={editHref} className="inline-flex min-h-11 items-center rounded-md px-4 font-semibold hover:bg-white">
                  Edit inputs
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <ScoreRing score={overall} />
              <div className="max-w-56">
                <p className="font-display text-xl font-bold">{overall === null ? "Running checks" : verdict(overall)}</p>
                <p className="mt-1 text-sm text-muted">
                  {running ? `${running} check${running > 1 ? "s" : ""} still running.` : `${scored.length} of ${CATEGORIES.length} areas scored.`}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {catScores.map((c) => {
              const list = byCat.get(c.id)!;
              const fails = list.filter((f) => f.status === "fail").length;
              return (
                <a key={c.id} href={`#${c.id}`} className="block rounded-lg border border-divider bg-white p-4 hover:border-blue break-inside-avoid">
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="font-semibold">{c.name}</p>
                    <p className="font-display text-xl font-bold">{c.score ?? "–"}</p>
                  </div>
                  <div className="mt-2">
                    <Bar value={c.score} />
                  </div>
                  <p className="mt-2 text-xs text-muted">{c.score === null ? "Not scored yet" : fails ? `${fails} to fix` : "Nothing critical"}</p>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Priorities */}
      <section className="mx-auto max-w-6xl px-5 py-10">
        <h2 className="text-2xl font-bold">The fixes that move the needle</h2>
        <p className="mt-1 text-muted">Ranked by impact. Start at the top.</p>
        {priorities.length ? (
          <ol className="mt-5 grid gap-3 md:grid-cols-2">
            {priorities.map((f, i) => (
              <li key={f.id} className="flex gap-4 rounded-lg border border-divider p-4 break-inside-avoid">
                <span className="font-display text-2xl font-bold text-blue">{i + 1}</span>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold">{f.label}</p>
                    <StatusChip status={f.status} />
                  </div>
                  <p className="mt-1 text-sm text-muted">{f.detail}</p>
                  {f.fix ? <p className="mt-1 text-sm">{f.fix}</p> : null}
                  <p className="mt-2">
                    <ImpactTag impact={f.impact} /> <span className="text-xs text-muted">· {CATEGORIES.find((c) => c.id === f.category)?.name}</span>
                  </p>
                </div>
              </li>
            ))}
          </ol>
        ) : (
          <div className="mt-5">{running ? <Spinner label="Collecting findings…" /> : <p className="text-muted">No gaps found in the automated checks.</p>}</div>
        )}
      </section>

      {/* Detailed sections */}
      {CATEGORIES.map((c) => {
        const list = byCat.get(c.id)!;
        const score = catScores.find((x) => x.id === c.id)!.score;
        return (
          <section key={c.id} id={c.id} className="scroll-mt-4 border-t border-divider">
            <div className="mx-auto max-w-6xl px-5 py-10">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-2xl font-bold">{c.name}</h2>
                  <p className="mt-1 max-w-2xl text-muted">{c.blurb}</p>
                </div>
                <p className="font-display text-3xl font-bold">
                  {score ?? "–"}
                  <span className="text-base font-semibold text-muted"> / 100</span>
                </p>
              </div>

              <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
                <div>
                  <SectionStatus c={c.id} site={site} speed={speed} places={places} ai={ai} socials={socials} />
                  {list.length ? <ul>{list.map((f) => <FindingRow key={f.id} f={f} />)}</ul> : null}
                  <Checklist category={c.id} answers={answers} onAnswer={answer} />
                </div>
                <div className="space-y-4">
                  <Extras c={c.id} name={businessName} input={input} speed={speed} places={places} ai={ai} socials={socials} />
                  <Panel className="bg-mist print:bg-white">
                    <p className="text-sm font-semibold">How Rocket Llama fixes this</p>
                    <p className="mt-1 text-sm">{c.service}</p>
                  </Panel>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Call to action */}
      <section className="bg-navy text-white print:bg-white print:text-navy">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-12 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-bold">We fix all of it. Usually in 90 days.</h2>
            <p className="mt-2 max-w-2xl text-mist print:text-muted">
              Website, search, AI visibility, Google profile, social, ads and lead follow-up, built and run as one system. Book a call and we will walk through this audit with you.
            </p>
          </div>
          <Link href="/book" className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-md bg-blue px-6 text-lg font-semibold text-white hover:bg-action-hover print:border print:border-navy print:text-navy">
            Schedule a call
          </Link>
        </div>
      </section>
      <p className="mx-auto max-w-6xl px-5 py-6 text-xs text-muted">
        Automated checks read the public homepage, robots.txt, sitemap and llms.txt, Google PageSpeed Insights (mobile), the Google Places API and a live AI web search. Social networks limit automated access, so some profiles are marked for a manual check. Results reflect the moment the audit ran.
      </p>
    </div>
  );
}

type Input = { site: string; name: string; city: string; industry: string; handles: Partial<Record<Platform, string>> };
type Loads = {
  site: Load<SiteResult>;
  speed: Load<SpeedResult>;
  places: Load<PlacesResult>;
  ai: Load<AiResult>;
  socials: Partial<Record<Platform, Load<SocialResult>>>;
};

function LoadNote({ load, what }: { load: Load<unknown> | undefined; what: string }) {
  if (!load) return null;
  if (load.state === "loading") return <Spinner label={`Running the ${what}…`} />;
  if (load.state === "error") return <p className="text-[15px] text-error">The {what} did not finish: {load.error}</p>;
  if (load.state === "skipped") return <p className="text-[15px] text-muted">The {what} was skipped. {load.why}</p>;
  return null;
}

function SectionStatus({ c, site, speed, places, ai, socials }: { c: CategoryId } & Loads) {
  const notes: [Load<unknown> | undefined, string][] = [];
  if (c === "website" || c === "search" || c === "ads" || c === "ai") notes.push([site, "website check"]);
  if (c === "speed") notes.push([speed, "PageSpeed test"], [site, "website check"]);
  if (c === "local") notes.push([places, "Google profile check"]);
  if (c === "ai") notes.push([ai, "AI search test"]);
  if (c === "social") {
    notes.push([site, "website check"]);
    for (const p of PLATFORMS) if (socials[p.id]?.state === "loading" || socials[p.id]?.state === "error") notes.push([socials[p.id], `${p.name} check`]);
  }
  const shown = notes.filter(([l]) => l && l.state !== "ok" && l.state !== "disabled");
  if (!shown.length) return null;
  return <div className="mb-3 space-y-2">{shown.map(([l, w], i) => <LoadNote key={i} load={l} what={w} />)}</div>;
}

function Checklist({ category, answers, onAnswer }: { category: CategoryId; answers: Record<string, Answer>; onAnswer: (id: string, v: Answer) => void }) {
  const items = CHECKLIST.filter((c) => c.category === category);
  if (!items.length) return null;
  return (
    <div className="mt-6 rounded-lg border border-divider p-5 break-inside-avoid">
      <h3 className="text-lg font-semibold">Checked by hand</h3>
      <p className="mt-1 text-sm text-muted">The auditor answers these. Answers count toward the score and stay in the share link.</p>
      <ul className="mt-3">
        {items.map((item) => {
          const a = answers[item.id];
          return (
            <li key={item.id} className="flex flex-col gap-2 border-t border-divider py-3 first:border-t-0 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-medium">{item.label}</p>
                <p className="text-sm text-muted print:hidden">{item.how}</p>
              </div>
              <div className="flex shrink-0 gap-1 print:hidden" role="group" aria-label={item.label}>
                {(["y", "n", "na"] as const).map((v) => (
                  <button
                    key={v}
                    type="button"
                    aria-pressed={a === v}
                    onClick={() => onAnswer(item.id, v)}
                    className={`min-h-9 rounded-md border-[1.5px] px-3 text-sm font-semibold ${a === v ? "border-navy bg-navy text-white" : "border-border text-navy hover:bg-mist"}`}
                  >
                    {v === "y" ? "Yes" : v === "n" ? "No" : "N/A"}
                  </button>
                ))}
              </div>
              <p className="hidden text-sm font-semibold print:block">{a === "y" ? "Yes" : a === "n" ? "No" : a === "na" ? "N/A" : "Not checked"}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Extras({ c, name, input, speed, places, ai, socials }: { c: CategoryId; name: string; input: Input } & Omit<Loads, "site">) {
  const q = (s: string) => encodeURIComponent(s);
  const domain = input.site ? domainOf(input.site) : "";
  const question = input.industry && input.city ? `Who is the best ${input.industry} in ${input.city}?` : `What do you know about ${name}${input.city ? ` in ${input.city}` : ""}?`;

  if (c === "speed" && speed.state === "ok") {
    const s = speed.data;
    return (
      <Panel title="Google PageSpeed, mobile">
        <dl className="grid grid-cols-2 gap-3">
          {(
            [
              ["Performance", s.scores.performance],
              ["Accessibility", s.scores.accessibility],
              ["Best practices", s.scores.bestPractices],
              ["SEO", s.scores.seo],
            ] as const
          ).map(([k, v]) => (
            <div key={k} className="rounded-md bg-mist p-3">
              <dt className="text-xs text-muted">{k}</dt>
              <dd className="font-display text-2xl font-bold">{v ?? "–"}</dd>
            </div>
          ))}
        </dl>
        {s.opportunities.length ? (
          <>
            <p className="mt-4 text-sm font-semibold">Biggest savings</p>
            <ul className="mt-1 space-y-1 text-sm">
              {s.opportunities.map((o) => (
                <li key={o.title} className="flex justify-between gap-3">
                  <span>{o.title}</span>
                  <span className="shrink-0 text-muted">{(o.savingsMs / 1000).toFixed(1)} s</span>
                </li>
              ))}
            </ul>
          </>
        ) : null}
        {input.site ? (
          <p className="mt-4 text-sm print:hidden">
            <ExtLink href={`https://pagespeed.web.dev/analysis?url=${q(input.site)}`}>Open the full PageSpeed report</ExtLink>
          </p>
        ) : null}
      </Panel>
    );
  }

  if (c === "local") {
    if (places.state === "ok") {
      const { business, competitors, competitorQuery } = places.data;
      const rows = [...(business ? [{ ...business, you: true }] : []), ...competitors.map((p) => ({ ...p, you: false }))];
      return (
        <Panel title={competitorQuery ? `Google results for “${competitorQuery}”` : "Google profile"}>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-muted">
                <th className="pb-2 font-semibold">Business</th>
                <th className="pb-2 text-right font-semibold">Rating</th>
                <th className="pb-2 text-right font-semibold">Reviews</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((p) => (
                <tr key={p.name + p.you} className={`border-t border-divider ${p.you ? "font-semibold" : ""}`}>
                  <td className="py-2 pr-2">
                    {p.mapsUrl ? <ExtLink href={p.mapsUrl}>{p.name}</ExtLink> : p.name}
                    {p.you ? <span className="ml-1 text-xs text-blue">(audited)</span> : null}
                  </td>
                  <td className="py-2 text-right">{p.rating?.toFixed(1) ?? "–"}</td>
                  <td className="py-2 text-right">{fmt(p.reviews)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
      );
    }
    return (
      <Panel title="Check the Google profile by hand">
        <p className="text-sm text-muted">{places.state === "disabled" ? "Automatic Google profile checks turn on when GOOGLE_PLACES_API_KEY is set." : "Open Maps and compare the rating and reviews against the top three results."}</p>
        <p className="mt-2 text-sm print:hidden">
          <ExtLink href={`https://www.google.com/maps/search/${q([name, input.city].filter(Boolean).join(" "))}`}>Search Google Maps for {name}</ExtLink>
        </p>
        {input.industry && input.city ? (
          <p className="mt-1 text-sm print:hidden">
            <ExtLink href={`https://www.google.com/maps/search/${q(`${input.industry} in ${input.city}`)}`}>See the top {input.industry} results in {input.city}</ExtLink>
          </p>
        ) : null}
      </Panel>
    );
  }

  if (c === "ai") {
    const links = (
      <Panel title="Ask the AI engines yourself">
        <p className="text-sm text-muted">“{question}”</p>
        <ul className="mt-2 space-y-1 text-sm print:hidden">
          <li><ExtLink href={`https://chatgpt.com/?q=${q(question)}`}>ChatGPT</ExtLink></li>
          <li><ExtLink href={`https://www.perplexity.ai/search?q=${q(question)}`}>Perplexity</ExtLink></li>
          <li><ExtLink href={`https://claude.ai/new?q=${q(question)}`}>Claude</ExtLink></li>
          <li><ExtLink href={`https://www.google.com/search?q=${q(question)}`}>Google (AI Overview)</ExtLink></li>
          <li><ExtLink href={`https://www.bing.com/search?q=${q(question)}&showconv=1`}>Microsoft Copilot</ExtLink></li>
        </ul>
      </Panel>
    );
    if (ai.state !== "ok") {
      return (
        <>
          {ai.state === "disabled" ? (
            <Panel>
              <p className="text-sm text-muted">The live AI search test turns on when ANTHROPIC_API_KEY is set.</p>
            </Panel>
          ) : null}
          {links}
        </>
      );
    }
    const d = ai.data;
    return (
      <>
        <Panel title={`AI search: “${d.question}”`}>
          <p className="text-sm">{d.answer}</p>
          {d.recommended.length ? (
            <ol className="mt-3 space-y-1 text-sm">
              {d.recommended.map((r, i) => (
                <li key={r.name} className={i + 1 === d.position ? "font-semibold text-blue" : ""}>
                  {i + 1}. {r.name}
                  {r.reason ? <span className="text-muted"> — {r.reason}</span> : null}
                </li>
              ))}
            </ol>
          ) : null}
          {d.brandSummary ? (
            <>
              <p className="mt-4 text-sm font-semibold">What the web says about {name}</p>
              <p className="mt-1 text-sm text-muted">{d.brandSummary}</p>
            </>
          ) : null}
          {d.citationGaps.length ? (
            <>
              <p className="mt-4 text-sm font-semibold">Where competitors are cited and {name} is not</p>
              <ul className="mt-1 list-disc space-y-1 pl-5 text-sm">{d.citationGaps.map((g) => <li key={g}>{g}</li>)}</ul>
            </>
          ) : null}
          {d.recommendations.length ? (
            <>
              <p className="mt-4 text-sm font-semibold">To get recommended</p>
              <ul className="mt-1 list-disc space-y-1 pl-5 text-sm">{d.recommendations.map((g) => <li key={g}>{g}</li>)}</ul>
            </>
          ) : null}
          {d.sources.length ? (
            <details className="mt-4 text-sm">
              <summary className="cursor-pointer font-semibold">Sources the answer used ({d.sources.length})</summary>
              <ul className="mt-2 space-y-1">{d.sources.map((s) => <li key={s.url}><ExtLink href={s.url}>{s.title.slice(0, 70)}</ExtLink></li>)}</ul>
            </details>
          ) : null}
        </Panel>
        {links}
      </>
    );
  }

  if (c === "social") {
    const rows = PLATFORMS.map((p) => ({ p, r: socials[p.id] })).filter((x) => x.r);
    return (
      <Panel title="Profiles">
        {rows.length ? (
          <ul className="space-y-2 text-sm">
            {rows.map(({ p, r }) => {
              const d = r?.state === "ok" ? r.data : null;
              const handle = input.handles[p.id] ?? d?.handle;
              return (
                <li key={p.id} className="flex items-baseline justify-between gap-3 border-t border-divider pt-2 first:border-t-0 first:pt-0">
                  <span>
                    <span className="font-semibold">{p.name}</span>{" "}
                    {handle ? <ExtLink href={profileUrl(p.id, handle)}>{handle}</ExtLink> : null}
                  </span>
                  <span className="shrink-0 text-muted">{r?.state === "loading" ? "Checking…" : d?.state === "found" ? (d.followers !== null ? `${fmt(d.followers)} followers` : "Live") : d?.state === "missing" ? "Not found" : "Check by hand"}</span>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-sm text-muted">No handles were entered or found on the site.</p>
        )}
      </Panel>
    );
  }

  if (c === "ads") {
    return (
      <Panel title="Check live ads">
        <ul className="space-y-1 text-sm print:hidden">
          <li><ExtLink href={`https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=US&q=${q(name)}&search_type=keyword_unordered`}>Meta Ad Library (Facebook and Instagram)</ExtLink></li>
          {domain ? <li><ExtLink href={`https://adstransparency.google.com/?region=US&domain=${q(domain)}`}>Google Ads Transparency Center</ExtLink></li> : null}
          <li><ExtLink href={`https://www.linkedin.com/ad-library/search?companyName=${q(name)}`}>LinkedIn Ad Library</ExtLink></li>
          <li><ExtLink href={`https://ads.tiktok.com/business/creativecenter/inspiration/topads/pc/en?keyword=${q(name)}`}>TikTok Creative Center</ExtLink></li>
        </ul>
        <p className="mt-3 text-sm text-muted">Then answer the ads questions under “Checked by hand”.</p>
      </Panel>
    );
  }

  if (c === "search" && domain) {
    return (
      <Panel title="Check by hand">
        <ul className="space-y-1 text-sm print:hidden">
          <li><ExtLink href={`https://www.google.com/search?q=site%3A${q(domain)}`}>Pages Google has indexed</ExtLink></li>
          <li><ExtLink href={`https://search.google.com/test/rich-results?url=${q(input.site)}`}>Google Rich Results test</ExtLink></li>
          <li><ExtLink href={`https://validator.schema.org/#url=${q(input.site)}`}>Schema validator</ExtLink></li>
        </ul>
      </Panel>
    );
  }
  return null;
}
