import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { LogOut } from "lucide-react";
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
    <div className="flex flex-1 flex-col lg:flex-row">
      <aside className="flex w-full shrink-0 flex-col gap-6 bg-navy p-4 text-white lg:min-h-screen lg:w-64 lg:p-6">
        <Link href="/admin" className="flex items-center gap-3 px-1">
          <Image
            src="/brand/mascot.svg"
            alt=""
            width={40}
            height={30}
            className="h-8 w-auto"
          />
          <span className="font-display text-lg font-bold leading-tight">
            Rocket Llama Labs
            <span className="block text-xs font-semibold tracking-[0.08em] text-mist uppercase">
              Admin
            </span>
          </span>
        </Link>
        <SidebarNav />
        <Suspense fallback={null}>
          <UserMenu />
        </Suspense>
      </aside>

      <div className="flex flex-1 flex-col bg-white">
        <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-8 lg:py-10">
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
    <div className="mt-auto border-t border-white/15 pt-4">
      <p className="truncate px-1 text-sm text-mist" title={user.email}>
        {user.email}
      </p>
      <form action={signOut} className="mt-2">
        <button
          type="submit"
          className="flex items-center gap-2 rounded-md px-1 py-1 text-sm font-medium text-mist hover:text-white"
        >
          <LogOut className="size-4" />
          Sign out
        </button>
      </form>
    </div>
  );
}
