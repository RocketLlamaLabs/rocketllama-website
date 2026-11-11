import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  Folder,
  FolderOpen,
  type LucideIcon,
  Mail,
  Globe,
  Palette,
  Presentation,
} from "lucide-react";
import { Card, PageHeader } from "@/components/ui";
import { TEAM } from "@/components/v7/team-data";

export const metadata: Metadata = { title: "Company" };

const drive = (id: string) => `https://drive.google.com/drive/folders/${id}`;
const SHARED_DRIVE = drive("0AKenccRwSD0jUk9PVA");

type Fact = { label: string; value: string; href?: string; external?: boolean };

const facts: Fact[] = [
  { label: "Legal name", value: "Rocket Llama Labs LLC" },
  {
    label: "Entity",
    value: "Arizona limited liability company, formed October 2026",
  },
  { label: "What we do", value: "Marketing and technology for home services" },
  { label: "Based in", value: "Phoenix, Arizona" },
  {
    label: "Website",
    value: "rocketllamalabs.com",
    href: "https://rocketllamalabs.com",
    external: true,
  },
  {
    label: "Owner email",
    value: "admin@rocketllamalabs.com",
    href: "mailto:admin@rocketllamalabs.com",
  },
  { label: "Brand book", value: "v1.0 · October 2026", href: "/admin/brand" },
];

// Folders in the Rocket Llama Labs shared drive. Each opens in Google Drive.
const driveGroups: {
  title: string;
  href: string;
  folders: { name: string; note: string; id: string }[];
}[] = [
  {
    title: "Corporate documents",
    href: drive("1P1fTpuSAXCuXtQMqMHZKdJjjQv5zOHYn"),
    folders: [
      {
        name: "Legal",
        note: "Everything legal in one place",
        id: "13fZX0lf2Ly4pWWhKpL_MANXe9v9FG8dv",
      },
      {
        name: "LLC formation",
        note: "Articles of organization",
        id: "1mCczjWAnU6CHVRAfiLhh7nHkazPFy6r1",
      },
      {
        name: "Operating agreement",
        note: "Signed agreement and drafts",
        id: "1DbUhEv6vXxqgXm5a9OrsSeccAZcoPHU9",
      },
      {
        name: "EIN",
        note: "IRS employer ID letter",
        id: "1fIszK6MlXqFKRjBqJBZXFI6dcJThaB2k",
      },
      {
        name: "Logo",
        note: "Every logo file, SVG and PNG",
        id: "1pfrofK_cK7YRA_qJIPrr_bHOUcU0HzmI",
      },
      {
        name: "Photos",
        note: "Team and job photos",
        id: "1qpmLxS9neQQPd9o0KqBUP2PaULvLcA7q",
      },
    ],
  },
  {
    title: "Financials",
    href: drive("1cHNHvTTmeMUrzZz8hBHvFt1AEtZQ-vlE"),
    folders: [
      {
        name: "Banking",
        note: "Statements and account papers",
        id: "15jrIdvVjyLwlCrGM1VU-9raTSkn3IMP4",
      },
      {
        name: "Expenses",
        note: "Spending records",
        id: "1w5HJ1uBvOw3UwBhqIU4FPLfVGDlyvSHd",
      },
      {
        name: "Receipts",
        note: "Filed by year and month",
        id: "1fKhozUf3vFkaOxT6QrfTeoz1A6kI-IFK",
      },
    ],
  },
];

const sitePages: { label: string; href: string; icon: LucideIcon }[] = [
  { label: "Home", href: "/", icon: Globe },
  { label: "Services", href: "/services", icon: Globe },
  { label: "Industries", href: "/industries", icon: Globe },
  { label: "About", href: "/about", icon: Globe },
  { label: "Schedule a call", href: "/book", icon: Globe },
  { label: "Instant audit", href: "/audit", icon: Globe },
  { label: "Sales presentation", href: "/slides/v1", icon: Presentation },
];

const linkClass =
  "inline-flex items-center gap-1 font-semibold text-link underline-offset-2 hover:underline";

export default function CompanyPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Business"
        title="Company"
        lead="The legal entity, the people, and where the paperwork lives. Every link opens the real thing."
        actions={
          <a
            href={SHARED_DRIVE}
            target="_blank"
            rel="noopener"
            className="inline-flex min-h-11 items-center gap-2 rounded-md bg-blue px-5 font-semibold text-white hover:bg-action-hover"
          >
            <FolderOpen className="size-4" />
            Open the shared drive
          </a>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <Card>
          <h2 className="text-xl font-semibold">At a glance</h2>
          <dl className="mt-4 divide-y divide-divider">
            {facts.map(({ label, value, href, external }) => (
              <div
                key={label}
                className="grid gap-1 py-3 sm:grid-cols-[9rem_1fr] sm:gap-4"
              >
                <dt className="text-sm font-semibold text-muted">{label}</dt>
                <dd>
                  {href ? (
                    <a
                      href={href}
                      className={linkClass}
                      {...(external
                        ? { target: "_blank", rel: "noopener" }
                        : {})}
                    >
                      {href.startsWith("mailto:") ? (
                        <Mail className="size-4" />
                      ) : null}
                      {href === "/admin/brand" ? (
                        <Palette className="size-4" />
                      ) : null}
                      {value}
                      {external ? <ArrowUpRight className="size-4" /> : null}
                    </a>
                  ) : (
                    value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold">Leadership</h2>
          <ul className="mt-4 space-y-3">
            {TEAM.map((p) => (
              <li key={p.slug}>
                <a
                  href={`/about/${p.slug}`}
                  target="_blank"
                  rel="noopener"
                  className="group flex items-center gap-4 rounded-md border border-divider p-3 hover:border-border hover:bg-mist/40"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.photo}
                    alt=""
                    width={56}
                    height={56}
                    className="size-14 shrink-0 rounded-full object-cover"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold">{p.name}</span>
                    <span className="block text-sm text-muted">{p.role}</span>
                  </span>
                  <ArrowUpRight className="size-4 shrink-0 text-link opacity-60 group-hover:opacity-100" />
                </a>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card>
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-xl font-semibold">Documents in Google Drive</h2>
          <p className="text-sm text-muted">
            Opens in Drive. You need access to the shared drive.
          </p>
        </div>
        <div className="mt-5 grid gap-6 md:grid-cols-2">
          {driveGroups.map((group) => (
            <section key={group.title}>
              <a
                href={group.href}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-1.5 text-sm font-bold tracking-[0.06em] text-navy uppercase font-display hover:text-link"
              >
                {group.title}
                <ArrowUpRight className="size-4" />
              </a>
              <ul className="mt-3 grid gap-2">
                {group.folders.map((f) => (
                  <li key={f.id}>
                    <a
                      href={drive(f.id)}
                      target="_blank"
                      rel="noopener"
                      className="group flex items-center gap-3 rounded-md bg-mist/50 px-3 py-2.5 hover:bg-mist"
                    >
                      <Folder className="size-5 shrink-0 text-blue" />
                      <span className="min-w-0 flex-1">
                        <span className="block font-semibold">{f.name}</span>
                        <span className="block text-sm text-muted">
                          {f.note}
                        </span>
                      </span>
                      <ArrowUpRight className="size-4 shrink-0 text-link opacity-60 group-hover:opacity-100" />
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </Card>

      <Card>
        <h2 className="text-xl font-semibold">Public pages</h2>
        <p className="mt-1 text-sm text-muted">
          What customers see, one click away.
        </p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {sitePages.map(({ label, href, icon: Icon }) => (
            <li key={href}>
              <a
                href={href}
                target="_blank"
                rel="noopener"
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-divider bg-white px-4 text-sm font-semibold hover:border-border hover:bg-mist/40"
              >
                <Icon className="size-4 text-blue" />
                {label}
                <ArrowUpRight className="size-3.5 text-muted" />
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-muted">
          Website versions and their history are on the{" "}
          <Link href="/admin/website" className={linkClass}>
            Website
          </Link>{" "}
          page.
        </p>
      </Card>
    </div>
  );
}
