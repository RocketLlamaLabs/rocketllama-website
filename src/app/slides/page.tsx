import { redirect } from "next/navigation";
import { slideVersions } from "@/lib/slide-versions";

// /slides opens the newest version.
export default function SlidesIndex() {
  redirect(`/slides/${slideVersions[slideVersions.length - 1].id}`);
}
