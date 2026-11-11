"use client";

import { useState, type ReactNode } from "react";
import { AlertTriangle, Check, Info, X } from "lucide-react";
import { grade, plain } from "@/lib/audit/plain";
import type { Finding, Status } from "@/lib/audit/shared";

// Presentational pieces of the audit report. Brand rules: navy text, one blue
// accent, mist tints, no gradients, error red only with an icon and a word.

const STATUS: Record<Status, { word: string; className: string; Icon: typeof Check }> = {
  pass: { word: "Working", className: "bg-blue text-white", Icon: Check },
  warn: { word: "Improve", className: "border-[1.5px] border-navy text-navy bg-white", Icon: AlertTriangle },
  fail: { word: "Problem", className: "border-[1.5px] border-error text-error bg-white", Icon: X },
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

/** A problem in plain words, with the how-to folded away until asked for. Print shows everything. */
export function ProblemRow({ f }: { f: Finding }) {
  const [open, setOpen] = useState(false);
  const p = plain(f);
  const hasHow = !!(f.fix || f.steps?.length || f.items?.length || f.snippet);
  return (
    <li id={`f-${f.id}`} data-f={f.id} data-cat={f.category} data-status={f.status} data-impact={f.impact} className="scroll-mt-4 border-t border-divider py-4 first:border-t-0 break-inside-avoid">
      <div className="flex flex-wrap items-center gap-2">
        <StatusChip status={f.status} />
        <p className="font-semibold">{p.problem}</p>
      </div>
      {p.why ? <p className="mt-1 text-[15px]">{p.why}</p> : null}
      <p className="mt-1 text-sm text-muted">
        <span className="font-semibold">Found: </span>
        {f.detail}
      </p>
      {hasHow ? (
        <>
          <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} className="mt-2 text-sm font-semibold text-link underline underline-offset-2 print:hidden">
            {open ? "Hide how to fix" : `Show how to fix${f.snippet ? " (with code)" : ""}`}
          </button>
          <div className={open ? "block" : "hidden print:block"}>
            <FixDetails f={f} />
          </div>
        </>
      ) : null}
      <p className="mt-2 text-xs text-muted">
        <ImpactTag impact={f.impact} /> · check: {f.label}
      </p>
    </li>
  );
}

/** Everything that passed, folded into one line. */
export function WorkingList({ items }: { items: Finding[] }) {
  const [open, setOpen] = useState(false);
  if (!items.length) return null;
  return (
    <div className="mt-4 rounded-lg bg-mist px-4 py-3 print:bg-white">
      <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} className="flex w-full items-center justify-between gap-3 text-left">
        <span className="font-semibold">
          <span className="text-blue">✓</span> {items.length} thing{items.length > 1 ? "s" : ""} already working
        </span>
        <span className="text-sm font-semibold text-link print:hidden">{open ? "Hide" : "Show"}</span>
      </button>
      <ul className={`mt-2 space-y-1 text-sm ${open ? "block" : "hidden print:block"}`}>
        {items.map((f) => (
          <li key={f.id} data-f={f.id} data-cat={f.category} data-status={f.status} data-impact={f.impact}>
            <span className="font-semibold">{f.label}.</span> <span className="text-muted">{f.detail}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function GradeChip({ score, big = false }: { score: number | null; big?: boolean }) {
  if (score === null) return <span className="text-xs text-muted">Not scored yet</span>;
  const g = grade(score);
  const cls = g.tone === "good" ? "bg-blue text-white" : g.tone === "mid" ? "border-[1.5px] border-navy text-navy bg-white" : "border-[1.5px] border-error text-error bg-white";
  const Icon = g.tone === "good" ? Check : g.tone === "mid" ? AlertTriangle : X;
  return (
    <span className={`inline-flex items-center gap-1 rounded-full font-semibold whitespace-nowrap ${big ? "px-3 py-1 text-sm" : "px-2 py-0.5 text-xs"} ${cls}`}>
      <Icon className={big ? "size-4" : "size-3.5"} strokeWidth={2.5} aria-hidden="true" />
      {g.word}
    </span>
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
