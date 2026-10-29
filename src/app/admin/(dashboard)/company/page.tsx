import type { Metadata } from "next";
import { Card, PageHeader } from "@/components/ui";

export const metadata: Metadata = { title: "Company" };

// Placeholder content until company records move into the database.
const facts: [string, string][] = [
  ["Legal name", "Rocket Llama Labs LLC"],
  ["What we do", "Software and AI product studio"],
  ["Domain", "rocketllamalabs.com"],
  ["Owner email", "admin@rocketllamalabs.com"],
  ["Brand book", "v1.0 · October 2026"],
];

const driveFolders = [
  "Corporate Documents › Legal › LLC Formation",
  "Corporate Documents › Legal › Operating Agreement",
  "Corporate Documents › Legal › EIN",
  "Corporate Documents › Logo",
  "Financials › Banking",
  "Financials › Expenses › Receipts",
];

export default function CompanyPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Company"
        title="Company"
        lead="The legal entity, key contacts and where the paperwork lives. Records will move into the database as this area grows."
      />

      <Card>
        <h2 className="text-xl font-semibold">At a glance</h2>
        <dl className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-[max-content_1fr]">
          {facts.map(([label, value]) => (
            <div key={label} className="contents">
              <dt className="text-sm font-semibold text-muted">{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </Card>

      <Card>
        <h2 className="text-xl font-semibold">Documents in Google Drive</h2>
        <p className="mt-1 text-sm text-muted">
          Formation papers, agreements and financial records currently live in
          Drive. Next step: bring them in as versioned assets.
        </p>
        <ul className="mt-4 space-y-2 text-sm">
          {driveFolders.map((folder) => (
            <li key={folder} className="rounded-md bg-mist px-3 py-2 font-mono text-xs">
              {folder}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
