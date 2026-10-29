"use server";

import { revalidatePath } from "next/cache";
import { getAdminUser } from "@/lib/admin-auth";
import { ASSETS_BUCKET, type AssetCategory } from "@/lib/assets";

const CATEGORIES: AssetCategory[] = [
  "brand",
  "logo",
  "document",
  "template",
  "other",
];

// Called by the upload form after the file is already in storage.
export async function registerAsset(input: {
  title: string;
  description: string;
  category: string;
  version: string;
  storagePath: string;
  mimeType: string;
  sizeBytes: number;
}): Promise<{ error?: string }> {
  const { user, isAdmin, supabase } = await getAdminUser();
  if (!isAdmin) return { error: "Not an owner." };

  const title = input.title.trim();
  if (!title) return { error: "Give the asset a title." };
  const category = CATEGORIES.includes(input.category as AssetCategory)
    ? (input.category as AssetCategory)
    : "other";

  const { error } = await supabase.from("assets").insert({
    title,
    description: input.description.trim() || null,
    category,
    version: input.version.trim() || null,
    storage_path: input.storagePath,
    mime_type: input.mimeType || null,
    size_bytes: input.sizeBytes,
    created_by: user.id,
  });

  if (error) {
    // Don't leave an orphaned file behind.
    await supabase.storage.from(ASSETS_BUCKET).remove([input.storagePath]);
    return { error: "Couldn't save the asset. Try again." };
  }

  revalidatePath("/admin/assets");
  revalidatePath("/admin");
  return {};
}

export async function deleteAsset(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const { isAdmin, supabase } = await getAdminUser();
  if (!isAdmin || !id) return;

  const { data: asset } = await supabase
    .from("assets")
    .select("storage_path")
    .eq("id", id)
    .single();
  if (!asset) return;

  await supabase.storage.from(ASSETS_BUCKET).remove([asset.storage_path]);
  await supabase.from("assets").delete().eq("id", id);

  revalidatePath("/admin/assets");
  revalidatePath("/admin");
}
