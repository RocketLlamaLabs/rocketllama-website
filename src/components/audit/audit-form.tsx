"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Alert, Button, Field, Input } from "@/components/ui";
import { PLATFORMS, normalizeHandle, normalizeSiteUrl } from "@/lib/audit/shared";

const placeholders: Record<string, string> = {
  ig: "@desertpeakplumbing",
  fb: "facebook.com/desertpeakplumbing",
  tt: "@desertpeakplumbing",
  yt: "@desertpeakplumbing",
  li: "linkedin.com/company/desert-peak",
  x: "@desertpeak",
};

export function AuditForm() {
  const router = useRouter();
  const sp = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const out = new URLSearchParams();
    const siteRaw = String(data.get("site") ?? "").trim();
    const site = siteRaw ? normalizeSiteUrl(siteRaw) : null;
    if (siteRaw && !site) {
      setError("That website address does not look right. Try something like acme.com.");
      return;
    }
    if (site) out.set("site", site.replace(/\/$/, ""));
    for (const key of ["name", "city", "industry"]) {
      const v = String(data.get(key) ?? "").trim();
      if (v) out.set(key, v);
    }
    let handles = 0;
    for (const p of PLATFORMS) {
      const h = normalizeHandle(p.id, String(data.get(p.param) ?? ""));
      if (h) {
        out.set(p.param, h);
        handles++;
      }
    }
    if (!site && handles === 0) {
      setError("Enter a website or at least one social handle.");
      return;
    }
    if (!site && !out.get("name")) {
      setError("Without a website, add the business name so the Google and AI checks can find it.");
      return;
    }
    const m = sp.get("m");
    if (m) out.set("m", m);
    router.push(`/marketing-audit/report?${out.toString()}`);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8" noValidate>
      <fieldset className="space-y-4">
        <legend className="font-display text-xl font-semibold">The business</legend>
        <Field label="Website" htmlFor="site" hint="The homepage address. The audit also finds social profiles linked from it.">
          <Input id="site" name="site" inputMode="url" placeholder="desertpeakplumbing.com" defaultValue={sp.get("site") ?? ""} autoComplete="url" />
        </Field>
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Business name" htmlFor="name" hint="Optional with a website.">
            <Input id="name" name="name" placeholder="Desert Peak Plumbing" defaultValue={sp.get("name") ?? ""} autoComplete="organization" />
          </Field>
          <Field label="City or service area" htmlFor="city" hint="For Google and AI.">
            <Input id="city" name="city" placeholder="Mesa, AZ" defaultValue={sp.get("city") ?? ""} />
          </Field>
          <Field label="Industry or main service" htmlFor="industry" hint="As a customer would search it.">
            <Input id="industry" name="industry" placeholder="plumber" defaultValue={sp.get("industry") ?? ""} list="industries" />
          </Field>
        </div>
        <datalist id="industries">
          {["plumber", "HVAC company", "electrician", "roofer", "landscaper", "pest control", "garage door repair", "house painter", "dentist", "med spa", "law firm", "restaurant", "real estate agent", "auto repair shop", "gym"].map((i) => (
            <option key={i} value={i} />
          ))}
        </datalist>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="font-display text-xl font-semibold">Social handles</legend>
        <p className="text-sm text-muted">Optional. Handles, @names or full profile links all work. Anything left blank is filled in from links on the website.</p>
        <div className="grid gap-4 sm:grid-cols-2">
          {PLATFORMS.map((p) => (
            <Field key={p.id} label={p.name} htmlFor={p.param}>
              <Input id={p.param} name={p.param} placeholder={placeholders[p.param]} defaultValue={sp.get(p.param) ?? ""} autoCapitalize="none" spellCheck={false} />
            </Field>
          ))}
        </div>
      </fieldset>

      {error ? <Alert tone="error">{error}</Alert> : null}
      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit">Run the audit</Button>
        <p className="text-sm text-muted">Takes about a minute. Every audit gets its own link.</p>
      </div>
    </form>
  );
}
