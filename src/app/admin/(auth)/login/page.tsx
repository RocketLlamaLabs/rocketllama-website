import { Suspense } from "react";
import { LoginForm } from "./login-form";

export default function LoginPage() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold">Owner sign in</h1>
        <p className="mt-1 text-muted">
          The administration area for Rocket Llama Labs.
        </p>
      </div>
      {/* useSearchParams() reads the URL at request time, so it streams in. */}
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
