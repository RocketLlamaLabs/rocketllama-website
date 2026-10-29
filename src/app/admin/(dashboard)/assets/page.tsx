import type { Metadata } from "next";
import { Download, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/ui";
import { getAdminUser } from "@/lib/admin-auth";
import {
  ASSET_CATEGORIES,
  formatBytes,
  formatDate,
  type Asset,
} from "@/lib/assets";
import { deleteAsset } from "./actions";
import { UploadForm } from "./upload-form";

export const metadata: Metadata = { title: "Assets" };

export default async function AssetsPage() {
  const { supabase } = await getAdminUser();
  const { data } = await supabase
    .from("assets")
    .select("*")
    .order("created_at", { ascending: false });
  const assets = (data ?? []) as Asset[];

  const categoryLabel = Object.fromEntries(
    ASSET_CATEGORIES.map((c) => [c.value, c.label])
  );

  return (
    <div>
      <PageHeader
        eyebrow="Library"
        title="Assets"
        lead="Brand files, documents and templates. Files are private; download links expire after a minute."
        actions={<UploadForm />}
      />

      {assets.length === 0 ? (
        <p className="mt-10 text-muted">Nothing here yet. Upload something.</p>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-lg border border-divider">
          <table className="w-full text-sm">
            <thead className="bg-mist text-left">
              <tr>
                <th className="px-4 py-3 font-semibold">Asset</th>
                <th className="px-4 py-3 font-semibold">Category</th>
                <th className="px-4 py-3 font-semibold">Version</th>
                <th className="px-4 py-3 font-semibold">Size</th>
                <th className="px-4 py-3 font-semibold">Added</th>
                <th className="px-4 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-divider">
              {assets.map((asset) => (
                <tr key={asset.id}>
                  <td className="px-4 py-3">
                    <p className="font-semibold">{asset.title}</p>
                    {asset.description ? (
                      <p className="mt-0.5 max-w-[48ch] text-muted">
                        {asset.description}
                      </p>
                    ) : null}
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-mist px-2.5 py-1 text-xs font-semibold">
                      {categoryLabel[asset.category] ?? asset.category}
                    </span>
                  </td>
                  <td className="px-4 py-3">{asset.version ?? "—"}</td>
                  <td className="px-4 py-3">{formatBytes(asset.size_bytes)}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {formatDate(asset.created_at)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <a
                        href={`/admin/assets/${asset.id}/download`}
                        className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 font-semibold text-link hover:bg-mist"
                      >
                        <Download className="size-4" />
                        Download
                      </a>
                      <form action={deleteAsset}>
                        <input type="hidden" name="id" value={asset.id} />
                        <button
                          type="submit"
                          className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 font-semibold text-error hover:bg-error/5"
                          aria-label={`Delete ${asset.title}`}
                        >
                          <Trash2 className="size-4" />
                          Delete
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
