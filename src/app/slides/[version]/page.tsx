import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SlideViewer } from "@/components/slides/viewer";
import {
  getSlideVersion,
  slideFile,
  slideImage,
  slideVersions,
} from "@/lib/slide-versions";

// One full-page presentation per version in src/lib/slide-versions.ts.
// Public on purpose: anyone with the link can view, no sign-in.
export function generateStaticParams() {
  return slideVersions.map((v) => ({ version: v.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/slides/[version]">): Promise<Metadata> {
  const { version } = await params;
  const v = getSlideVersion(version);
  if (!v) return {};
  return { title: `${v.name} ${v.id}` };
}

export default async function SlidesPage({
  params,
}: PageProps<"/slides/[version]">) {
  const { version } = await params;
  const v = getSlideVersion(version);
  if (!v) notFound();

  return (
    <SlideViewer
      name={`${v.name} ${v.id}`}
      slides={v.slides.map((title, i) => ({ title, src: slideImage(v, i) }))}
      downloadHref={slideFile(v)}
      versions={slideVersions.map((s) => ({ id: s.id, href: `/slides/${s.id}` }))}
      currentVersion={v.id}
    />
  );
}
