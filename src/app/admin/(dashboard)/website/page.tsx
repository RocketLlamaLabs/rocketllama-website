import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Card, PageHeader } from "@/components/ui";
import { siteVersions } from "@/lib/site-versions";

export const metadata: Metadata = { title: "Website" };

const statusLabel = {
  live: "Live at /",
  sample: "Sample",
} as const;

export default function WebsitePage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Website"
        title="Website versions"
        lead="Every version of the public site, where it runs and what it was built from. Version 2 has a kit with its pages, components and assets."
      />

      <div className="grid gap-4 md:grid-cols-2">
        {siteVersions.map((v) => (
          <Card key={v.id} className="flex flex-col gap-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[13px] font-bold tracking-[0.08em] text-blue uppercase font-display">
                  {v.id}
                </p>
                <h2 className="mt-1 text-2xl font-semibold">{v.name}</h2>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  v.status === "live"
                    ? "bg-blue text-white"
                    : "bg-mist text-navy"
                }`}
              >
                {statusLabel[v.status]}
              </span>
            </div>
            <p className="text-muted">{v.summary}</p>
            <p className="text-sm text-muted">{v.origin}</p>
            <div className="mt-auto flex flex-wrap gap-3 pt-2">
              <a
                href={v.href}
                target="_blank"
                rel="noopener"
                className="inline-flex min-h-11 items-center gap-1 rounded-md bg-blue px-5 font-semibold text-white hover:bg-action-hover"
              >
                Open {v.href}
                <ArrowUpRight className="size-4" />
              </a>
              {v.kitHref ? (
                <Link
                  href={v.kitHref}
                  className="inline-flex min-h-11 items-center rounded-md border-[1.5px] border-navy px-5 font-semibold hover:bg-mist"
                >
                  Version 2 kit
                </Link>
              ) : (
                <Link
                  href="/admin/brand"
                  className="inline-flex min-h-11 items-center rounded-md border-[1.5px] border-navy px-5 font-semibold hover:bg-mist"
                >
                  Brand kit
                </Link>
              )}
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <h2 className="text-xl font-semibold">How versions work here</h2>
        <p className="mt-2 text-muted">
          Version 1 is the homepage at <code className="font-mono text-sm">/</code>.
          Version 2 lives under <code className="font-mono text-sm">/v2</code>{" "}
          with its own stylesheet, fonts and components, so the two can be
          changed independently. Both are kept out of search engines until
          launch. When version 2 is ready to replace version 1, its routes move
          to the root.
        </p>
      </Card>
    </div>
  );
}
