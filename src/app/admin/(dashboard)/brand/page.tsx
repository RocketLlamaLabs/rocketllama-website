import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Card, PageHeader } from "@/components/ui";

export const metadata: Metadata = { title: "Brand kit" };

// Pulled from the brand book v1.0. Four staples; everything else is derived.
const staples = [
  { token: "brand-navy", hex: "#022C6A", job: "All text and every dark background. Our black." },
  { token: "brand-blue", hex: "#006EFF", job: "The one accent. Buttons, one highlighted word, icons, focus." },
  { token: "brand-mist", hex: "#DFE9F2", job: "The one tint. Section backgrounds, cards, table stripes." },
  { token: "white", hex: "#FFFFFF", job: "Page background; text on navy and blue." },
];

const derived = [
  { token: "link", hex: "#0057D9", job: "Inline text links (AA on white)." },
  { token: "text-muted", hex: "#45587A", job: "Captions, metadata, secondary labels." },
  { token: "border", hex: "#7B93B5", job: "Input and control borders." },
  { token: "divider", hex: "#C9D8E6", job: "Hairlines, table rules, card edges." },
  { token: "error", hex: "#B42318", job: "The one state color. Always with an icon or a word." },
];

const type = [
  { role: "Display & headings", family: "Montserrat", weights: "700 Bold · 600 SemiBold", className: "font-display font-bold text-[32px] leading-10" },
  { role: "Body & UI", family: "Inter", weights: "400 · 500 · 600", className: "font-sans text-lg" },
  { role: "Code", family: "JetBrains Mono", weights: "400", className: "font-mono text-sm" },
];

const logos = [
  { file: "wordmark-horizontal-rocket-o.svg", name: "Horizontal wordmark, rocket “o”", use: "Website header and footer, email signature, document headers. Minimum 160px wide." },
  { file: "lockup-horizontal.svg", name: "Horizontal lockup", use: "Mascot beside the wordmark. Banners, co-branding strips." },
  { file: "lockup-horizontal-3line.svg", name: "Three-line lockup", use: "Mascot beside a stacked wordmark. Square-ish placements." },
  { file: "mascot-rocket-llama.svg", name: "Mascot with short wordmark", use: "Social and places the company name is already stated." },
  { file: "mascot.svg", name: "Mascot", use: "Avatars, app icons, stickers, loading states. Always faces right. Minimum 32px." },
];

const rules = [
  "Use the supplied logo files. Never redraw, re-type, stretch, rotate or recolor a mark.",
  "Clear space around any logo = the cap height of the “R” in the wordmark, on all sides.",
  "Headings are navy in Montserrat Bold. Body is 16px Inter minimum. Nothing under 12px.",
  "One brand-blue primary button per screen. Secondary actions are outlined navy.",
  "Four colors only: navy, blue, mist, white. The logo’s lighter blues and flame gradient stay inside the artwork.",
  "No gradients. Buttons, bands, charts and progress bars are flat navy, blue or mist.",
  "Sentence case everywhere, including buttons and nav. No exclamation marks in UI.",
  "Every page has one H1 in real HTML text, alt text on every logo, and the favicon set.",
];

export default function BrandPage() {
  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow="Brand kit"
        title="Brand kit"
        lead="The working reference for how Rocket Llama Labs looks. The full brand book (v1.0) is in Assets."
        actions={
          <Link
            href="/admin/assets"
            className="inline-flex min-h-11 items-center rounded-md border-[1.5px] border-navy px-5 font-semibold hover:bg-mist"
          >
            Open brand book
          </Link>
        }
      />

      <section>
        <h2 className="text-2xl font-semibold">Color</h2>
        <p className="mt-1 text-muted">
          Think of any page as 65 / 25 / 10: white and mist, then navy, then
          blue.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {staples.map((c) => (
            <Swatch key={c.token} {...c} />
          ))}
        </div>
        <h3 className="mt-8 text-lg font-semibold">Derived tokens</h3>
        <p className="mt-1 text-sm text-muted">
          Built from navy and blue for interfaces. Never in logos, print or
          decks.
        </p>
        <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {derived.map((c) => (
            <Swatch key={c.token} {...c} small />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold">Typography</h2>
        <div className="mt-4 grid gap-4">
          {type.map((t) => (
            <Card key={t.family} className="grid gap-2 sm:grid-cols-[200px_1fr] sm:items-center">
              <div>
                <p className="font-semibold">{t.family}</p>
                <p className="text-sm text-muted">{t.role}</p>
                <p className="text-sm text-muted">{t.weights}</p>
              </div>
              <p className={t.className}>Build fast. Launch faster.</p>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold">Logos</h2>
        <p className="mt-1 text-muted">
          SVG masters, served from the site. Right-click to save, or download
          the originals from Assets.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {logos.map((l) => (
            <Card key={l.file} className="flex flex-col gap-4">
              <div className="flex h-36 items-center justify-center rounded-md bg-mist p-6">
                <Image
                  src={`/brand/${l.file}`}
                  alt="Rocket Llama Labs"
                  width={320}
                  height={120}
                  className="max-h-full w-auto max-w-full"
                />
              </div>
              <div>
                <p className="font-semibold">{l.name}</p>
                <p className="mt-1 text-sm text-muted">{l.use}</p>
                <p className="mt-1 font-mono text-xs text-muted">/brand/{l.file}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold">Quick rules</h2>
        <ol className="mt-4 list-decimal space-y-2 pl-5">
          {rules.map((rule) => (
            <li key={rule}>{rule}</li>
          ))}
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-semibold">Voice</h2>
        <p className="mt-1">
          <strong>Capable. Direct. Light.</strong> Lead with the outcome. Short
          sentences, one idea each. Active voice. Specific beats impressive.
          Say what it costs and how long it takes.
        </p>
        <dl className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-md bg-mist p-4">
            <dt className="text-sm font-semibold">Primary tagline</dt>
            <dd className="mt-1 font-display text-xl font-bold">Build fast. Launch faster.</dd>
          </div>
          <div className="rounded-md bg-mist p-4">
            <dt className="text-sm font-semibold">Social bio</dt>
            <dd className="mt-1">Software &amp; AI studio. We build the thing, then we ship it.</dd>
          </div>
        </dl>
      </section>
    </div>
  );
}

function Swatch({
  token,
  hex,
  job,
  small,
}: {
  token: string;
  hex: string;
  job: string;
  small?: boolean;
}) {
  const light = hex === "#FFFFFF" || hex === "#DFE9F2" || hex === "#C9D8E6";
  return (
    <div className="overflow-hidden rounded-lg border border-divider">
      <div
        className={`${small ? "h-14" : "h-24"} flex items-end p-3`}
        style={{ backgroundColor: hex }}
      >
        <span
          className={`font-mono text-xs ${light ? "text-navy" : "text-white"}`}
        >
          {token}
        </span>
      </div>
      <div className="p-3">
        <p className="font-mono text-sm font-semibold">{hex}</p>
        <p className="mt-1 text-xs text-muted">{job}</p>
      </div>
    </div>
  );
}
