import type { Metadata } from "next";
import { Suspense } from "react";
import { AuditReport } from "@/components/audit/report";
import { Spinner } from "@/components/audit/parts";

export const metadata: Metadata = { title: "Audit report" };

// The report is built in the browser from the query string, so any link
// (?site=acme.com&ig=acme&city=Mesa) is a ready-to-run audit.
export default function ReportPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-6xl px-5 py-16">
          <Spinner label="Starting the audit…" />
        </div>
      }
    >
      <AuditReport />
    </Suspense>
  );
}
