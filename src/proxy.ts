import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// /admin routes that work without a session.
const PUBLIC_ADMIN_PATHS = [
  "/admin/login",
  "/admin/forgot-password",
  "/admin/auth/callback",
];

// Refreshes the Supabase auth session on every request so Server Components
// always see a valid user, and gates /admin behind a sign-in.
export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Do not remove: this call is what refreshes an expired session.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const isAdminPath = pathname === "/admin" || pathname.startsWith("/admin/");
  const isPublicAdminPath = PUBLIC_ADMIN_PATHS.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  );

  let redirectTo: URL | null = null;
  if (isAdminPath && !user && !isPublicAdminPath) {
    redirectTo = new URL("/admin/login", request.url);
    if (pathname !== "/admin") redirectTo.searchParams.set("next", pathname);
  } else if (user && pathname === "/admin/login") {
    redirectTo = new URL("/admin", request.url);
  }

  if (redirectTo) {
    // Carry any refreshed auth cookies over to the redirect response.
    const response = NextResponse.redirect(redirectTo);
    supabaseResponse.cookies
      .getAll()
      .forEach((cookie) => response.cookies.set(cookie));
    return response;
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    // Skip static assets and images.
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|webmanifest)$).*)",
  ],
};
