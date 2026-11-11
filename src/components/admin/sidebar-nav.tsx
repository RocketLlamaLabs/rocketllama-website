"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Building2,
  FolderOpen,
  Globe,
  LayoutDashboard,
  Palette,
  Settings,
  type LucideIcon,
} from "lucide-react";

type Item = { href: string; label: string; icon: LucideIcon };

const groups: { label: string; items: Item[] }[] = [
  {
    label: "Overview",
    items: [{ href: "/admin", label: "Dashboard", icon: LayoutDashboard }],
  },
  {
    label: "Marketing",
    items: [
      { href: "/admin/website", label: "Website", icon: Globe },
      { href: "/admin/brand", label: "Brand kit", icon: Palette },
      { href: "/admin/assets", label: "Assets", icon: FolderOpen },
    ],
  },
  {
    label: "Business",
    items: [
      { href: "/admin/company", label: "Company", icon: Building2 },
      { href: "/admin/settings", label: "Settings", icon: Settings },
    ],
  },
];

// Grouped on wide screens; one scrolling row on phones.
export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Admin"
      className="-mx-4 flex gap-1 overflow-x-auto px-4 pb-1 lg:mx-0 lg:flex-col lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-0"
    >
      {groups.map((group) => (
        <div key={group.label} className="flex gap-1 lg:flex-col">
          <p className="hidden px-3 pb-1 text-[12px] font-bold tracking-[0.08em] text-muted uppercase font-display lg:block">
            {group.label}
          </p>
          {group.items.map(({ href, label, icon: Icon }) => {
            const active =
              href === "/admin" ? pathname === href : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`flex shrink-0 items-center gap-3 rounded-md px-3 py-2.5 text-[15px] font-medium whitespace-nowrap ${
                  active
                    ? "bg-mist font-semibold text-navy"
                    : "text-muted hover:bg-mist/60 hover:text-navy"
                }`}
              >
                <Icon
                  className={`size-5 shrink-0 ${active ? "text-blue" : ""}`}
                  strokeWidth={2}
                />
                {label}
              </Link>
            );
          })}
        </div>
      ))}
    </nav>
  );
}
