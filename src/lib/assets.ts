export type AssetCategory =
  | "brand"
  | "logo"
  | "document"
  | "template"
  | "other";

export type Asset = {
  id: string;
  title: string;
  description: string | null;
  category: AssetCategory;
  version: string | null;
  storage_path: string;
  mime_type: string | null;
  size_bytes: number | null;
  created_at: string;
  updated_at: string;
};

export const ASSET_CATEGORIES: { value: AssetCategory; label: string }[] = [
  { value: "brand", label: "Brand" },
  { value: "logo", label: "Logo" },
  { value: "document", label: "Document" },
  { value: "template", label: "Template" },
  { value: "other", label: "Other" },
];

export const ASSETS_BUCKET = "assets";

export function formatBytes(bytes: number | null) {
  if (bytes == null) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
