import { redirect } from "next/navigation";
import { connection } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Reads the session and checks admin_users membership. Call it from inside a
// <Suspense> boundary: it reads cookies, so it runs at request time.
export async function getAdminUser() {
  // Opt out of prerendering explicitly: the Supabase client checks token
  // expiry with Date.now(), which would otherwise trip the prerender check.
  await connection();
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  const { data: isAdmin } = await supabase.rpc("is_admin");

  return { user, isAdmin: isAdmin === true, supabase };
}
