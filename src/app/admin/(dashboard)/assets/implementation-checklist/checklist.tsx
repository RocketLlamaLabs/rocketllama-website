"use client";

import { useMemo, useSyncExternalStore } from "react";
import { Printer, RotateCcw } from "lucide-react";
import { Button, Input } from "@/components/ui";
import {
  checklistItemCount,
  checklistSections,
} from "@/lib/implementation-checklist";

// One checklist in progress at a time, kept in this browser only. Print it
// (or save as PDF) to file a finished copy in the client's folder.
const STORAGE_KEY = "rll-implementation-checklist";

type Saved = { client: string; done: string[] };
const EMPTY: Saved = { client: "", done: [] };

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function readRaw() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) ?? "";
  } catch {
    return "";
  }
}

function write(next: Saved) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Storage unavailable: ticks just won't survive a reload.
  }
  listeners.forEach((listener) => listener());
}

function parse(raw: string): Saved {
  if (!raw) return EMPTY;
  try {
    const value = JSON.parse(raw) as Partial<Saved>;
    return {
      client: typeof value.client === "string" ? value.client : "",
      done: Array.isArray(value.done)
        ? value.done.filter((id) => typeof id === "string")
        : [],
    };
  } catch {
    return EMPTY;
  }
}

export function Checklist() {
  const raw = useSyncExternalStore(subscribe, readRaw, () => "");
  const saved = useMemo(() => parse(raw), [raw]);
  const done = useMemo(() => new Set(saved.done), [saved.done]);

  function toggle(id: string) {
    const next = new Set(done);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    write({ client: saved.client, done: [...next] });
  }

  function reset() {
    if (
      (saved.client || saved.done.length > 0) &&
      !window.confirm("Clear the client name and every tick?")
    ) {
      return;
    }
    write(EMPTY);
  }

  const percent = Math.round((done.size / checklistItemCount) * 100);

  return (
    <div>
      <div className="mt-8 flex flex-col gap-4 rounded-lg border border-divider bg-white p-5 shadow-sm sm:flex-row sm:items-end print:border-0 print:p-0 print:shadow-none">
        <div className="flex-1 space-y-1.5">
          <label htmlFor="client-name" className="block text-sm font-semibold">
            Client
          </label>
          <Input
            id="client-name"
            value={saved.client}
            onChange={(event) =>
              write({ client: event.target.value, done: saved.done })
            }
            placeholder="Company name"
            autoComplete="off"
          />
        </div>
        <div className="flex flex-wrap gap-3 print:hidden">
          <Button type="button" onClick={() => window.print()}>
            <Printer className="size-4" />
            Print or save as PDF
          </Button>
          <Button type="button" variant="secondary" onClick={reset}>
            <RotateCcw className="size-4" />
            Start a new client
          </Button>
        </div>
      </div>

      <div className="mt-5">
        <div className="flex items-baseline justify-between gap-4 text-sm">
          <p className="font-semibold" aria-live="polite">
            {done.size} of {checklistItemCount} done
          </p>
          <p className="text-muted print:hidden">
            Ticks are saved in this browser only.
          </p>
        </div>
        <div
          className="mt-2 h-2 overflow-hidden rounded-full bg-mist print:hidden"
          aria-hidden
        >
          <div
            className="h-full rounded-full bg-blue transition-[width]"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      <nav
        aria-label="Sections"
        className="mt-6 flex flex-wrap gap-2 print:hidden"
      >
        {checklistSections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="rounded-full border border-divider bg-white px-3 py-1.5 text-sm font-semibold hover:bg-mist"
          >
            {section.title}
          </a>
        ))}
      </nav>

      <div className="mt-8 space-y-8">
        {checklistSections.map((section, index) => {
          const ids = section.items.map((_, i) => `${section.id}-${i}`);
          const sectionDone = ids.filter((id) => done.has(id)).length;
          return (
            <section
              key={section.id}
              id={section.id}
              aria-labelledby={`${section.id}-title`}
              className="scroll-mt-8 rounded-lg border border-divider bg-white p-5 shadow-sm sm:p-6 print:border-0 print:p-0 print:shadow-none"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h2
                  id={`${section.id}-title`}
                  className="text-xl font-semibold print:break-after-avoid"
                >
                  {index + 1}. {section.title}
                </h2>
                <p className="text-sm text-muted">
                  {sectionDone} of {ids.length}
                </p>
              </div>
              <p className="mt-1 text-muted">{section.lead}</p>
              <ul className="mt-4 divide-y divide-divider">
                {section.items.map((item, i) => {
                  const id = ids[i];
                  const checked = done.has(id);
                  return (
                    <li key={id} className="print:break-inside-avoid">
                      <label
                        htmlFor={id}
                        className="flex cursor-pointer items-start gap-3 py-3"
                      >
                        <input
                          id={id}
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggle(id)}
                          className="mt-1 size-5 shrink-0 accent-blue"
                        />
                        <span className="min-w-0 flex-1">
                          <span
                            className={`font-semibold ${checked ? "text-muted line-through" : ""}`}
                          >
                            {item.text}
                          </span>
                          {item.note ? (
                            <span className="mt-0.5 block text-sm text-muted">
                              {item.note}
                            </span>
                          ) : null}
                        </span>
                        <span
                          className={`mt-0.5 shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap ${
                            item.who === "client"
                              ? "bg-mist text-navy"
                              : "border border-divider text-muted"
                          }`}
                        >
                          {item.who === "client" ? "From client" : "We do"}
                        </span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
