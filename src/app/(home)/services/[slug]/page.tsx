import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePage } from "@/components/v7/service-page";
import { SERVICE_BY_SLUG, SERVICE_PAGES } from "@/components/v7/services-data";
import { serviceMeta } from "@/components/v7/page-seo";

// One page per service under /services/<slug>, written by scripts/make-v3.py.
// Copy lives in src/components/v7/services-data.ts.
export function generateStaticParams() {
  return SERVICE_PAGES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const svc = SERVICE_BY_SLUG[slug];
  return svc ? serviceMeta(svc) : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const svc = SERVICE_BY_SLUG[slug];
  if (!svc) notFound();
  return <ServicePage svc={svc} />;
}
