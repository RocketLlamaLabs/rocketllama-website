import type { Metadata } from "next";
import { Download, Trash2 } from "lucide-react";
import { Card, PageHeader } from "@/components/ui";
import { getAdminUser } from "@/lib/admin-auth";
import {
  PROPOSAL_CATEGORY,
  fileKind,
  formatBytes,
  formatDate,
  type Asset,
} from "@/lib/assets";
import { deleteAsset } from "../assets/actions";
import { UploadForm } from "../assets/upload-form";

export const metadata: Metadata = { title: "Proposals" };

// Files that share a title are one proposal: usually a PowerPoint and its PDF.
function groupByTitle(assets: Asset[]) {
  const groups = new Map<string, Asset[]>();
  for (const asset of assets) {
    const key = asset.title.trim().toLowerCase();
    groups.set(key, [...(groups.get(key) ?? []), asset]);
  }
  return [...groups.values()];
}

export default async function ProposalsPage() {
  const { supabase } = await getAdminUser();
  const { data } = await supabase
    .from("assets")
    .select("*")
    .eq("category", PROPOSAL_CATEGORY)
    .order("created_at", { ascending: false });
  const proposals = groupByTitle((data ?? []) as Asset[]);

  return (
    <div>
      <PageHeader
        eyebrow="Sales"
        title="Proposals"
        lead="Client proposals and marketing plans. Files are private to owners; download links expire after a minute."
        actions={<UploadForm kind="proposal" />}
      />

      {proposals.length === 0 ? (
        <p className="mt-10 text-muted">
          No proposals yet. Upload a PowerPoint or a PDF.
        </p>
      ) : (
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {proposals.map((files) => {
            const first = files[0];
            const description = files.find((f) => f.description)?.description;
            return (
              <Card key={first.id} className="flex flex-col gap-4">
                <div>
                  <p className="text-[13px] font-bold tracking-[0.08em] text-blue uppercase font-display">
                    {files.map((f) => fileKind(f.storage_path)).join(" · ")}
                  </p>
                  <h2 className="mt-1 text-xl font-semibold">{first.title}</h2>
                  <p className="mt-1 text-sm text-muted">
                    Added {formatDate(first.created_at)}
                    {first.version ? ` · Version ${first.version}` : ""}
                  </p>
                </div>
                {description ? <p className="text-muted">{description}</p> : null}
                <ul className="mt-auto divide-y divide-divider border-t border-divider">
                  {files.map((file) => (
                    <li
                      key={file.id}
                      className="flex flex-wrap items-center justify-between gap-3 py-3"
                    >
                      <a
                        href={`/admin/assets/${file.id}/download`}
                        className="inline-flex min-h-11 items-center gap-1.5 rounded-md border-[1.5px] border-navy px-5 font-semibold hover:bg-mist"
                      >
                        <Download className="size-4" />
                        {fileKind(file.storage_path)}
                        <span className="font-normal text-muted">
                          {formatBytes(file.size_bytes)}
                        </span>
                      </a>
                      <form action={deleteAsset}>
                        <input type="hidden" name="id" value={file.id} />
                        <button
                          type="submit"
                          className="inline-flex min-h-11 items-center gap-1.5 rounded-md px-2.5 font-semibold text-error hover:bg-error/5"
                          aria-label={`Delete the ${fileKind(file.storage_path)} of ${file.title}`}
                        >
                          <Trash2 className="size-4" />
                          Delete
                        </button>
                      </form>
                    </li>
                  ))}
                </ul>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
