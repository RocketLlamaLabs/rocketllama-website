"use client";

import { useState, type ReactNode } from "react";
import { AlertTriangle, Check, Info, X } from "lucide-react";
import type { Finding, Status } from "@/lib/audit/shared";

// Presentational pieces of the audit report. Brand rules: navy text, one blue
// accent, mist tints, no gradients, error red only with an icon and a word.

const STATUS: Record<Status, { word: string; className: string; Icon: typeof Check }> = {
  pass: { word: "Pass", className: "bg-blue text-white", Icon: Check },
  warn: { word: "Needs work", className: "border-[1.5px] border-navy text-navy bg-white", Icon: AlertTriangle },
  fail: { word: "Fix", className: "border-[1.5px] border-error text-error bg-white", Icon: X },
  info: { word: "Note", className: "bg-mist text-muted", Icon: Info },
};

export function StatusChip({ status }: { status: Status }) {
  const s = STATUS[status];
  return (
    <span className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap ${s.className}`}>
      <s.Icon className="size-3.5" strokeWidth={2.5} aria-hidden="true" />
      {s.word}
    </span>
  );
}

export function ImpactTag({ impact }: { impact: Finding["impact"] }) {
  return <span className="text-xs font-semibold tracking-wide text-muted uppercase">{impact} impact</span>;
}

export function FindingRow({ f }: { f: Finding }) {
  const open = f.status === "fail" || f.status === "warn";
  return (
    <li id={`f-${f.id}`} className="grid scroll-mt-4 gap-2 border-t border-divider py-4 first:border-t-0 sm:grid-cols-[110px_1fr]">
      <div>
        <StatusChip status={f.status} />
      </div>
      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4">
          <p className="font-semibold">{f.label}</p>
          {f.status !== "info" ? <ImpactTag impact={f.impact} /> : null}
        </div>
        <p className="mt-1 text-[15px] text-muted">{f.detail}</p>
        {open ? <FixDetails f={f} /> : null}
      </div>
    </li>
  );
}

/** The specific fix: one-line summary, what failed, the steps and paste-ready code. */
export function FixDetails({ f }: { f: Finding }) {
  return (
    <div className="mt-2 space-y-3">
      {f.fix ? (
        <p className="text-[15px]">
          <span className="font-semibold">Fix: </span>
          {f.fix}
        </p>
      ) : null}
      {f.items?.length ? (
        <div>
          <p className="text-xs font-semibold tracking-wide text-muted uppercase">What we found</p>
          <ul className="mt-1 space-y-0.5 text-sm">
            {f.items.map((it) => (
              <li key={it} className="break-words">
                · {it}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      {f.steps?.length ? (
        <div>
          <p className="text-xs font-semibold tracking-wide text-muted uppercase">How to fix it</p>
          <ol className="mt-1 list-decimal space-y-1 pl-5 text-sm">
            {f.steps.map((st) => (
              <li key={st}>{st}</li>
            ))}
          </ol>
        </div>
      ) : null}
      {f.snippet ? <Snippet label={f.snippet.label} text={f.snippet.text} /> : null}
    </div>
  );
}

export function Snippet({ label, text, mono = true }: { label: string; text: string; mono?: boolean }) {
  return (
    <div className="overflow-hidden rounded-md border border-divider break-inside-avoid">
      <div className="flex items-center justify-between gap-3 bg-mist px-3 py-1.5">
        <p className="text-xs font-semibold">{label}</p>
        <CopyButton text={text} />
      </div>
      <pre className={`max-h-72 overflow-auto px-3 py-2 text-[13px] leading-relaxed whitespace-pre-wrap break-words print:max-h-none ${mono ? "font-mono" : "font-sans"}`}>{text}</pre>
    </div>
  );
}

export function CopyButton({ text }: { text: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      className="shrink-0 rounded px-2 py-0.5 text-xs font-semibold text-link hover:bg-white print:hidden"
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setDone(true);
        setTimeout(() => setDone(false), 1500);
      }}
    >
      {done ? "Copied" : "Copy"}
    </button>
  );
}

export function ScoreRing({ score, size = 132, label = "out of 100" }: { score: number | null; size?: number; label?: string }) {
  const r = 52;
  const c = 2 * Math.PI * r;
  const v = score ?? 0;
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg viewBox="0 0 120 120" className="size-full -rotate-90" aria-hidden="true">
        <circle cx="60" cy="60" r={r} fill="none" stroke="#DFE9F2" strokeWidth="12" />
        <circle cx="60" cy="60" r={r} fill="none" stroke="#006EFF" strokeWidth="12" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - v / 100)} style={{ transition: "stroke-dashoffset 0.8s ease" }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-4xl font-bold">{score ?? "–"}</span>
        <span className="text-xs text-muted">{label}</span>
      </div>
    </div>
  );
}

export function Bar({ value }: { value: number | null }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-mist" role="img" aria-label={value === null ? "Not scored" : `${value} out of 100`}>
      <div className="h-full rounded-full bg-blue" style={{ width: `${value ?? 0}%`, transition: "width 0.8s ease" }} />
    </div>
  );
}

export function Spinner({ label }: { label: string }) {
  return (
    <p className="flex items-center gap-2 text-[15px] text-muted" role="status">
      <span className="inline-block size-4 animate-spin rounded-full border-2 border-divider border-t-blue" aria-hidden="true" />
      {label}
    </p>
  );
}

export function Panel({ title, children, className = "" }: { title?: string; children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-lg border border-divider bg-white p-5 break-inside-avoid ${className}`}>
      {title ? <h4 className="mb-3 text-base font-semibold">{title}</h4> : null}
      {children}
    </div>
  );
}

export function ExtLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="font-medium text-link underline underline-offset-2 hover:text-navy">
      {children}
    </a>
  );
}
