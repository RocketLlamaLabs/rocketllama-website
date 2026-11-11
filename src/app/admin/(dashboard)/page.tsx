import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Download,
  FolderOpen,
  Globe,
  Palette,
  Presentation,
} from "lucide-react";
import { Card, PageHeader } from "@/components/ui";
import { getAdminUser } from "@/lib/admin-auth";
import { formatDate, type Asset } from "@/lib/assets";

const shortcuts = [
  {
    href: "/admin/website",
    icon: Globe,
    title: "Website",
    body: "Version 7, live at the root, plus versions 1 to 6 and 8.",
  },
  {
    href: "/admin/assets#presentation",
    icon: Presentation,
    title: "Presentation",
    body: "The sales deck, every version, with its public link.",
  },
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
    body: "Legal entity, leadership and the Drive folders.",
  },
];

const quickLinks = [
  { label: "Live site", href: "/" },
  { label: "Sales presentation", href: "/slides/v1" },
  { label: "Schedule a call page", href: "/book" },
  { label: "Instant audit", href: "/audit" },
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
        lead="Everything about Rocket Llama Labs in one place: the website, the brand, the files and the company behind them."
      />

      <ul className="flex flex-wrap gap-2" aria-label="Quick links">
        {quickLinks.map(({ label, href }) => (
          <li key={href}>
            <a
              href={href}
              target="_blank"
              rel="noopener"
              className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-divider bg-white px-4 text-sm font-semibold hover:border-border"
            >
              {label}
              <ArrowUpRight className="size-3.5 text-muted" />
            </a>
          </li>
        ))}
      </ul>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {shortcuts.map(({ href, icon: Icon, title, body }) => (
          <Link key={href} href={href} className="group">
            <Card className="h-full transition hover:border-border hover:shadow-md">
              <span className="flex size-11 items-center justify-center rounded-full bg-mist">
                <Icon className="size-5 text-blue" strokeWidth={2} />
              </span>
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
          <ul className="mt-4 divide-y divide-divider overflow-hidden rounded-lg border border-divider bg-white">
            {recentAssets.map((asset) => (
              <li key={asset.id}>
                <a
                  href={`/admin/assets/${asset.id}/download`}
                  className="group flex items-center justify-between gap-4 px-4 py-3 text-sm hover:bg-mist/40"
                >
                  <span className="font-semibold">
                    {asset.title}
                    {asset.version ? (
                      <span className="ml-2 font-normal text-muted">
                        v{asset.version}
                      </span>
                    ) : null}
                  </span>
                  <span className="flex items-center gap-3 text-muted">
                    {formatDate(asset.created_at)}
                    <Download className="size-4 text-link opacity-60 group-hover:opacity-100" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
