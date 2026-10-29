import type { Metadata } from "next";
import { Card, PageHeader } from "@/components/ui";
import { getAdminUser } from "@/lib/admin-auth";
import { formatDate } from "@/lib/assets";
import { PasswordForm } from "./password-form";

export const metadata: Metadata = { title: "Settings" };

export default async function SettingsPage() {
  const { user, supabase } = await getAdminUser();
  const { data: owners } = await supabase
    .from("admin_users")
    .select("email, created_at")
    .order("created_at");

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Settings"
        title="Settings"
        lead="Your account and who else can sign in."
      />

      <Card>
        <h2 className="text-xl font-semibold">Your account</h2>
        <p className="mt-1 text-sm text-muted">Signed in as {user.email}</p>
        <div className="mt-6">
          <PasswordForm />
        </div>
      </Card>

      <Card>
        <h2 className="text-xl font-semibold">Owners</h2>
        <p className="mt-1 text-sm text-muted">
          Accounts allowed into the admin area. Adding owners from here is next
          on the list; for now it&rsquo;s a row in the{" "}
          <code className="font-mono text-xs">admin_users</code> table.
        </p>
        <ul className="mt-4 divide-y divide-divider">
          {(owners ?? []).map((owner) => (
            <li
              key={owner.email}
              className="flex items-center justify-between py-2 text-sm"
            >
              <span className="font-semibold">{owner.email}</span>
              <span className="text-muted">
                since {formatDate(owner.created_at)}
              </span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
