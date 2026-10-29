"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useActionState } from "react";
import { Alert, Button, Field, Input } from "@/components/ui";
import { signIn, type AuthState } from "../actions";

export function LoginForm() {
  const params = useSearchParams();
  const [state, formAction, pending] = useActionState<AuthState, FormData>(
    signIn,
    {}
  );
  const linkError = params.get("error") === "link";

  return (
    <form action={formAction} className="space-y-5">
      {linkError ? (
        <Alert tone="error">
          That sign-in link is invalid or expired. Request a new one below.
        </Alert>
      ) : null}
      {state.error ? <Alert tone="error">{state.error}</Alert> : null}

      <input type="hidden" name="next" value={params.get("next") ?? ""} />

      <Field label="Email" htmlFor="email">
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          defaultValue={state.email ?? ""}
          placeholder="you@rocketllamalabs.com"
        />
      </Field>

      <Field label="Password" htmlFor="password">
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
        />
      </Field>

      <Button type="submit" disabled={pending} className="w-full">
        {pending ? "Signing in…" : "Sign in"}
      </Button>

      <p className="text-center text-sm">
        <Link href="/admin/forgot-password" className="text-link underline">
          Forgot password
        </Link>
      </p>
    </form>
  );
}
