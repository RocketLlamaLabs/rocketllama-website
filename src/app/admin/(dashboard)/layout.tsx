import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { ArrowUpRight, LogOut } from "lucide-react";
import { SidebarNav } from "@/components/admin/sidebar-nav";
import { Button } from "@/components/ui";
import { getAdminUser } from "@/lib/admin-auth";
import { signOut } from "../(auth)/actions";

export const metadata: Metadata = {
  title: {
    default: "Admin",
    template: "%s · Admin — Rocket Llama Labs",
  },
};

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return (
    <div className="flex flex-1 flex-col bg-mist/40 lg:flex-row">
      <aside className="flex w-full shrink-0 flex-col gap-4 border-b border-divider bg-white px-4 pt-4 pb-3 lg:sticky lg:top-0 lg:h-screen lg:w-72 lg:gap-8 lg:border-r lg:border-b-0 lg:px-5 lg:py-7">
        <div className="flex items-center justify-between gap-3 lg:flex-col lg:items-start">
          <Link href="/admin" className="block px-1" aria-label="Rocket Llama Labs admin">
            <Image
              src="/brand/logo-nav.svg"
              alt="Rocket Llama Labs"
              width={249}
              height={40}
              priority
              className="h-8 w-auto"
            />
          </Link>
          <span className="rounded-full bg-navy px-2.5 py-1 text-[11px] font-bold tracking-[0.08em] text-white uppercase font-display lg:ml-1">
            Admin
          </span>
        </div>
        <SidebarNav />
        <div className="hidden lg:block">
          <a
            href="/"
            target="_blank"
            rel="noopener"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold text-link hover:bg-mist/60"
          >
            View the live site
            <ArrowUpRight className="size-4" />
          </a>
        </div>
        <Suspense fallback={null}>
          <UserMenu />
        </Suspense>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-8 lg:px-12 lg:py-12">
          <Suspense fallback={<p className="text-muted">Loading…</p>}>
            <AdminGate>{children}</AdminGate>
          </Suspense>
        </main>
      </div>
    </div>
  );
}

// Everything under /admin renders behind this. The proxy already redirects
// signed-out visitors; this handles signed-in users who aren't owners.
async function AdminGate({ children }: { children: React.ReactNode }) {
  const { user, isAdmin } = await getAdminUser();

  if (!isAdmin) {
    return (
      <div className="max-w-md space-y-4">
        <h1 className="text-2xl font-bold">No access</h1>
        <p>
          <strong>{user.email}</strong> is signed in but isn&rsquo;t on the
          owner list. Ask an owner to add you, or sign in with another account.
        </p>
        <form action={signOut}>
          <Button type="submit" variant="secondary">
            Sign out
          </Button>
        </form>
      </div>
    );
  }

  return children;
}

async function UserMenu() {
  const { user } = await getAdminUser();

  return (
    <div className="flex items-center justify-between gap-3 border-t border-divider pt-3 lg:mt-auto lg:pt-4">
      <div className="flex min-w-0 items-center gap-3">
        <span
          aria-hidden
          className="flex size-9 shrink-0 items-center justify-center rounded-full bg-navy text-sm font-bold text-white uppercase font-display"
        >
          {user.email?.[0] ?? "?"}
        </span>
        <p className="truncate text-sm text-muted" title={user.email}>
          {user.email}
        </p>
      </div>
      <form action={signOut}>
        <button
          type="submit"
          title="Sign out"
          className="flex min-h-11 shrink-0 items-center gap-2 rounded-md px-2 text-sm font-medium whitespace-nowrap text-muted hover:bg-mist/60 hover:text-navy"
        >
          <LogOut className="size-4" />
          Sign out
        </button>
      </form>
    </div>
  );
}
