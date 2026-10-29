"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Building2,
  FolderOpen,
  LayoutDashboard,
  Palette,
  Settings,
} from "lucide-react";

const items = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/company", label: "Company", icon: Building2 },
  { href: "/admin/brand", label: "Brand kit", icon: Palette },
  { href: "/admin/assets", label: "Assets", icon: FolderOpen },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Admin" className="flex flex-col gap-1">
      {items.map(({ href, label, icon: Icon }) => {
        const active =
          href === "/admin" ? pathname === href : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-[15px] font-medium ${
              active
                ? "bg-blue text-white"
                : "text-mist hover:bg-white/10 hover:text-white"
            }`}
          >
            <Icon className="size-5 shrink-0" strokeWidth={2} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
