import Link from "next/link";
import { ArrowRight, Building2, FolderOpen, Palette } from "lucide-react";
import { Card, PageHeader } from "@/components/ui";
import { getAdminUser } from "@/lib/admin-auth";
import { formatDate, type Asset } from "@/lib/assets";

const shortcuts = [
  {
    href: "/admin/brand",
    icon: Palette,
    title: "Brand kit",
    body: "Colors, type, logos and the rules that go with them.",
  },
  {
    href: "/admin/assets",
    icon: FolderOpen,
    title: "Assets",
    body: "Brand book, logo files, documents and templates.",
  },
  {
    href: "/admin/company",
    icon: Building2,
    title: "Company",
    body: "Legal entity, contacts and where the paperwork lives.",
  },
];

export default async function AdminHome() {
  const { supabase } = await getAdminUser();
  const [{ count }, { data: recent }] = await Promise.all([
    supabase.from("assets").select("*", { count: "exact", head: true }),
    supabase
      .from("assets")
      .select("id, title, category, version, created_at")
      .order("created_at", { ascending: false })
      .limit(5),
  ]);
  const recentAssets = (recent ?? []) as Pick<
    Asset,
    "id" | "title" | "category" | "version" | "created_at"
  >[];

  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow="Owners"
        title="Dashboard"
        lead="Everything about Rocket Llama Labs in one place: the company, the brand and the files behind them."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        {shortcuts.map(({ href, icon: Icon, title, body }) => (
          <Link key={href} href={href} className="group">
            <Card className="h-full hover:shadow-md">
              <Icon className="size-6 text-blue" strokeWidth={2} />
              <h2 className="mt-4 flex items-center gap-1 text-xl font-semibold">
                {title}
                <ArrowRight className="size-4 opacity-0 transition group-hover:opacity-100" />
              </h2>
              <p className="mt-1 text-sm text-muted">{body}</p>
            </Card>
          </Link>
        ))}
      </div>

      <section>
        <div className="flex items-baseline justify-between">
          <h2 className="text-2xl font-semibold">
            Recent assets{" "}
            <span className="text-base font-normal text-muted">
              ({count ?? 0} total)
            </span>
          </h2>
          <Link href="/admin/assets" className="text-sm text-link underline">
            View all
          </Link>
        </div>
        {recentAssets.length === 0 ? (
          <p className="mt-4 text-muted">Nothing here yet. Upload something.</p>
        ) : (
          <ul className="mt-4 divide-y divide-divider rounded-lg border border-divider">
            {recentAssets.map((asset) => (
              <li
                key={asset.id}
                className="flex items-center justify-between gap-4 px-4 py-3 text-sm"
              >
                <span className="font-semibold">
                  {asset.title}
                  {asset.version ? (
                    <span className="ml-2 font-normal text-muted">
                      v{asset.version}
                    </span>
                  ) : null}
                </span>
                <span className="text-muted">{formatDate(asset.created_at)}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
