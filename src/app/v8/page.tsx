import type { Metadata } from "next";
import { V8Home } from "@/components/v8/home";

export const metadata: Metadata = {
  title: { absolute: "Rocket Llama Labs · Version 8" },
  description: "The simplest version of the homepage: the 60-second check under the banner, the full system as one list, how it works, and the trade picker.",
};

// Version 8's home is hand-written; see src/components/v8/home.tsx. The
// sub-pages (/services, /book, /qualify, /about-brian) come from version 2
// through scripts/make-v3.py like the other versions.
export default function Page() {
  return <V8Home base="/v8" />;
}
