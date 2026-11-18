import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageHeader } from "@/components/ui";
import { formatDate } from "@/lib/assets";
import {
  CHECKLIST_UPDATED,
  checklistItemCount,
  checklistSections,
} from "@/lib/implementation-checklist";
import { Checklist } from "./checklist";

export const metadata: Metadata = { title: "Implementation Checklist" };

export default function ImplementationChecklistPage() {
  return (
    <div>
      <Link
        href="/admin/assets"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-link hover:underline print:hidden"
      >
        <ArrowLeft className="size-4" />
        Assets
      </Link>
      <div className="mt-3">
        <PageHeader
          eyebrow="New client onboarding"
          title="Implementation Checklist"
          lead="Everything we need from a new client, and everything we set up, before launch. Walk it with the client on the kickoff call."
        />
      </div>
      <p className="mt-2 text-sm text-muted">
        {checklistItemCount} items in {checklistSections.length} sections ·
        Updated {formatDate(`${CHECKLIST_UPDATED}T12:00:00Z`)}
      </p>
      <Checklist />
    </div>
  );
}
