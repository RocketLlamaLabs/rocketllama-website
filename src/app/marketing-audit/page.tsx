import { Suspense } from "react";
import { Eyebrow } from "@/components/ui";
import { AuditForm } from "@/components/audit/audit-form";

const covers = [
  ["Website and conversion", "Click-to-call, booking, forms, chat, proof, accessibility."],
  ["Search engines", "Titles, headings, content, sitemap, indexing, share previews."],
  ["AI answer engines", "A live AI search for the trade and city, schema, llms.txt, AI crawler access."],
  ["Speed", "Google PageSpeed on a phone and real-visitor Core Web Vitals."],
  ["Google profile", "Rating, reviews, hours and photos against the top local competitors."],
  ["Social media", "Every profile found, its size and how it is run."],
  ["Ads and tracking", "Pixels, conversion tags, call tracking and the public ad libraries."],
  ["Lead handling", "Speed to lead, phone answering, CRM and follow-up."],
];

export default function MarketingAuditPage() {
  return (
    <>
      <section className="bg-mist">
        <div className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
          <Eyebrow>Rocket Llama Labs audit</Eyebrow>
          <h1 className="mt-3 max-w-3xl text-4xl leading-tight font-bold sm:text-5xl">Audit a whole marketing system from one URL.</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            Enter a website, social handles, or both. The audit reads the site, runs Google PageSpeed, finds the Google profile and competitors, asks an AI search engine who it recommends and checks every social profile. Each audit gets a link you can send to the prospect.
          </p>
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-10 lg:grid-cols-[1fr_320px]">
        <Suspense fallback={<p className="text-muted">Loading the form…</p>}>
          <AuditForm />
        </Suspense>
        <aside>
          <h2 className="text-xl font-semibold">What it covers</h2>
          <ul className="mt-4 space-y-3">
            {covers.map(([name, what]) => (
              <li key={name} className="border-l-2 border-blue pl-3">
                <p className="font-semibold">{name}</p>
                <p className="text-sm text-muted">{what}</p>
              </li>
            ))}
          </ul>
        </aside>
      </section>
    </>
  );
}
