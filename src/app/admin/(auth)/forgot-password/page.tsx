"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Alert, Button, Field, Input } from "@/components/ui";
import { requestPasswordReset, type AuthState } from "../actions";

export default function ForgotPasswordPage() {
  const [state, formAction, pending] = useActionState<AuthState, FormData>(
    requestPasswordReset,
    {}
  );

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold">Forgot password</h1>
        <p className="mt-1 text-muted">
          Enter your email and we&rsquo;ll send a link to set a new one.
        </p>
      </div>

      {state.error ? <Alert tone="error">{state.error}</Alert> : null}
      {state.success ? <Alert tone="success">{state.success}</Alert> : null}

      <Field label="Email" htmlFor="email">
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="you@rocketllamalabs.com"
        />
      </Field>

      <Button type="submit" disabled={pending} className="w-full">
        {pending ? "Sending…" : "Send reset link"}
      </Button>

      <p className="text-center text-sm">
        <Link href="/admin/login" className="text-link underline">
          Back to sign in
        </Link>
      </p>
    </form>
  );
}
