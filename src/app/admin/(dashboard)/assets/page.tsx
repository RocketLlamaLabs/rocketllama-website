import type { Metadata } from "next";
import { ArrowUpRight, Download, Trash2 } from "lucide-react";
import { Card, PageHeader } from "@/components/ui";
import { getAdminUser } from "@/lib/admin-auth";
import {
  ASSET_CATEGORIES,
  formatBytes,
  formatDate,
  type Asset,
} from "@/lib/assets";
import { slideFile, slideImage, slideVersions } from "@/lib/slide-versions";
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

      <section aria-labelledby="presentation" className="mt-10">
        <h2 id="presentation" className="text-2xl font-semibold">
          Presentation
        </h2>
        <p className="mt-1 max-w-[68ch] text-muted">
          Every version of the sales presentation. Each one has its own page
          under <code className="font-mono text-sm">/slides</code> that anyone
          with the link can open, no sign-in.
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {[...slideVersions].reverse().map((v) => (
            <Card key={v.id} className="flex flex-col gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={slideImage(v, 0)}
                alt=""
                width={1920}
                height={1080}
                className="h-auto w-full rounded-md border border-divider"
              />
              <div>
                <p className="text-[13px] font-bold tracking-[0.08em] text-blue uppercase font-display">
                  {v.id}
                </p>
                <h3 className="mt-1 text-xl font-semibold">{v.name}</h3>
                <p className="mt-1 text-sm text-muted">
                  {v.slides.length} slides · {v.author} · {formatDate(v.added)}
                </p>
              </div>
              <p className="text-muted">{v.summary}</p>
              <div className="mt-auto flex flex-wrap gap-3 pt-2">
                <a
                  href={`/slides/${v.id}`}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex min-h-11 items-center gap-1 rounded-md bg-blue px-5 font-semibold text-white hover:bg-action-hover"
                >
                  Open /slides/{v.id}
                  <ArrowUpRight className="size-4" />
                </a>
                <a
                  href={slideFile(v)}
                  download
                  className="inline-flex min-h-11 items-center gap-1.5 rounded-md border-[1.5px] border-navy px-5 font-semibold hover:bg-mist"
                >
                  <Download className="size-4" />
                  PowerPoint
                </a>
              </div>
            </Card>
          ))}
        </div>
        <p className="mt-4 max-w-[68ch] text-sm text-muted">
          To add a version, run{" "}
          <code className="font-mono">scripts/make-slides.sh v2 deck.pptx</code>{" "}
          and add the entry it prints to{" "}
          <code className="font-mono">src/lib/slide-versions.ts</code>. The new
          version appears here and at its own link once the change is deployed.
        </p>
      </section>

      <h2 className="mt-12 text-2xl font-semibold">Files</h2>
      {assets.length === 0 ? (
        <p className="mt-4 text-muted">Nothing here yet. Upload something.</p>
      ) : (
        <div className="mt-4 overflow-x-auto rounded-lg border border-divider">
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
