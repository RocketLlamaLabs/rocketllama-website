import { NextResponse } from "next/server";
import { ASSETS_BUCKET } from "@/lib/assets";
import { createClient } from "@/lib/supabase/server";

// Redirects to a short-lived signed URL for a private asset file.
export async function GET(
  _request: Request,
  { params }: RouteContext<"/admin/assets/[id]/download">
) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: asset } = await supabase
    .from("assets")
    .select("storage_path")
    .eq("id", id)
    .single();
  if (!asset) {
    return new NextResponse("Not found", { status: 404 });
  }

  const fileName = asset.storage_path.split("/").pop() ?? "download";
  const { data, error } = await supabase.storage
    .from(ASSETS_BUCKET)
    .createSignedUrl(asset.storage_path, 60, { download: fileName });
  if (error || !data) {
    return new NextResponse("Could not create download link", { status: 500 });
  }

  return NextResponse.redirect(data.signedUrl);
}
