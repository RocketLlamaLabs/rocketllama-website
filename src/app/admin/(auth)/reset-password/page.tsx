"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Alert, Button, Field, Input } from "@/components/ui";
import { updatePassword, type AuthState } from "../actions";

// Reached from the email link via /admin/auth/callback, which signs the user
// in first; the proxy sends anyone without a session back to /admin/login.
export default function ResetPasswordPage() {
  const [state, formAction, pending] = useActionState<AuthState, FormData>(
    updatePassword,
    {}
  );

  if (state.success) {
    return (
      <div className="space-y-5">
        <h1 className="text-2xl font-bold">Password updated</h1>
        <p>You&rsquo;re signed in with your new password.</p>
        <Link
          href="/admin"
          className="inline-flex min-h-11 items-center rounded-md bg-blue px-5 font-semibold text-white hover:bg-action-hover"
        >
          Go to the admin area
        </Link>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold">Set a new password</h1>
        <p className="mt-1 text-muted">At least 12 characters.</p>
      </div>

      {state.error ? <Alert tone="error">{state.error}</Alert> : null}

      <Field label="New password" htmlFor="password">
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          minLength={12}
          required
        />
      </Field>

      <Field label="Confirm new password" htmlFor="confirm">
        <Input
          id="confirm"
          name="confirm"
          type="password"
          autoComplete="new-password"
          minLength={12}
          required
        />
      </Field>

      <Button type="submit" disabled={pending} className="w-full">
        {pending ? "Saving…" : "Save password"}
      </Button>
    </form>
  );
}
