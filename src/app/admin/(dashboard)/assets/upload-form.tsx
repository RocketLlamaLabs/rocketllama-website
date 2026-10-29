"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Upload } from "lucide-react";
import {
  Alert,
  Button,
  Card,
  Field,
  Input,
  Select,
  Textarea,
} from "@/components/ui";
import { ASSETS_BUCKET, ASSET_CATEGORIES } from "@/lib/assets";
import { createClient } from "@/lib/supabase/client";
import { registerAsset } from "./actions";

// Uploads straight from the browser to Supabase Storage (so large files don't
// pass through a Server Action), then registers the metadata.
export function UploadForm() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const file = data.get("file");
    if (!(file instanceof File) || file.size === 0) {
      setError("Choose a file.");
      return;
    }

    setBusy(true);
    setError(null);

    const safeName = file.name.replace(/[^\w.-]+/g, "-");
    const storagePath = `${crypto.randomUUID()}/${safeName}`;
    const supabase = createClient();
    const { error: uploadError } = await supabase.storage
      .from(ASSETS_BUCKET)
      .upload(storagePath, file, { contentType: file.type || undefined });

    if (uploadError) {
      setBusy(false);
      setError("Upload failed. Check your connection and try again.");
      return;
    }

    const result = await registerAsset({
      title: String(data.get("title") ?? ""),
      description: String(data.get("description") ?? ""),
      category: String(data.get("category") ?? "other"),
      version: String(data.get("version") ?? ""),
      storagePath,
      mimeType: file.type,
      sizeBytes: file.size,
    });

    setBusy(false);
    if (result.error) {
      setError(result.error);
      return;
    }

    form.reset();
    setOpen(false);
    router.refresh();
  }

  if (!open) {
    return (
      <Button type="button" onClick={() => setOpen(true)}>
        <Upload className="size-4" />
        Upload asset
      </Button>
    );
  }

  return (
    <Card className="mt-6">
      <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
        <h2 className="text-xl font-semibold sm:col-span-2">Upload an asset</h2>

        {error ? (
          <div className="sm:col-span-2">
            <Alert tone="error">{error}</Alert>
          </div>
        ) : null}

        <div className="sm:col-span-2">
          <Field label="File" htmlFor="file">
            <Input id="file" name="file" type="file" required className="py-2" />
          </Field>
        </div>

        <Field label="Title" htmlFor="title">
          <Input id="title" name="title" required placeholder="Brand book" />
        </Field>

        <Field label="Version" htmlFor="version" hint="Optional, e.g. 1.0">
          <Input id="version" name="version" placeholder="1.0" />
        </Field>

        <Field label="Category" htmlFor="category">
          <Select id="category" name="category" defaultValue="brand">
            {ASSET_CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </Select>
        </Field>

        <div className="sm:col-span-2">
          <Field label="Description" htmlFor="description">
            <Textarea id="description" name="description" rows={2} />
          </Field>
        </div>

        <div className="flex gap-3 sm:col-span-2">
          <Button type="submit" disabled={busy}>
            {busy ? "Uploading…" : "Upload"}
          </Button>
          <Button
            type="button"
            variant="ghost"
            disabled={busy}
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
}
