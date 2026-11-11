import type { Metadata } from "next";
import { IndustryPage } from "@/components/v7/industry-page";
import { INDUSTRY_BY_SLUG } from "@/components/v7/industries-data";
import { industryMeta } from "@/components/v7/page-seo";

// The mobile-mechanic industry page. Copy lives in src/components/v7/industries-data.ts.
const ind = INDUSTRY_BY_SLUG["mobile-mechanic"];

export const metadata: Metadata = industryMeta(ind);

export default function Page() {
  return <IndustryPage ind={ind} />;
}
