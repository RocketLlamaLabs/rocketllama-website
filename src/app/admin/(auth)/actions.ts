"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getSiteOrigin } from "@/lib/site-url";

// `email` is echoed back on errors so the form can keep what was typed
// (React clears uncontrolled fields once a form action completes).
export type AuthState = { error?: string; success?: string; email?: string };

function field(formData: FormData, name: string) {
  return String(formData.get(name) ?? "").trim();
}

export async function signIn(
  _prev: AuthState,
  formData: FormData
): Promise<AuthState> {
  const email = field(formData, "email").toLowerCase();
  const password = String(formData.get("password") ?? "");
  const next = field(formData, "next");

  if (!email || !password) {
    return { error: "Enter your email and password.", email };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: "That email and password don't match.", email };
  }

  redirect(next.startsWith("/admin") ? next : "/admin");
}

export async function requestPasswordReset(
  _prev: AuthState,
  formData: FormData
): Promise<AuthState> {
  const email = field(formData, "email").toLowerCase();
  if (!email) return { error: "Enter your email address.", email };

  const supabase = await createClient();
  const origin = await getSiteOrigin();
  await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/admin/auth/callback?next=/admin/reset-password`,
  });

  // Same message whether or not the address exists, so the form can't be
  // used to check which emails have accounts.
  return {
    success:
      "If that address has an owner account, a reset link is on its way. It expires in an hour.",
  };
}

export async function updatePassword(
  _prev: AuthState,
  formData: FormData
): Promise<AuthState> {
  const password = String(formData.get("password") ?? "");
  const confirm = String(formData.get("confirm") ?? "");

  if (password.length < 12) {
    return { error: "Use at least 12 characters." };
  }
  if (password !== confirm) {
    return { error: "The two passwords don't match." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    return {
      error:
        "That didn't work. Your reset link may have expired — request a new one.",
    };
  }

  return { success: "Password updated." };
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
