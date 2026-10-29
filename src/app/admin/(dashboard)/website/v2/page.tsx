import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Download } from "lucide-react";
import { Card, PageHeader } from "@/components/ui";
import {
  faviconSizes,
  v2BrandRounds,
  v2Components,
  v2Pages,
  v2Palette,
  v2Photos,
  v2Poster,
  v2Type,
  v2Videos,
} from "@/lib/site-versions";

export const metadata: Metadata = { title: "Version 2 kit" };

// Everything behind the version 2 sample: the pages, the interactive pieces,
// the design tokens, and every image and video that came over from bbm-plan.
export default function V2KitPage() {
  return (
    <div className="space-y-12">
      <PageHeader
        eyebrow="Website · Version 2"
        title="Version 2 kit"
        lead="The sample site at /v2 and everything used to build it. Ported from the BBM Local mockup C; the design is expected to change a lot, so treat this as the raw material."
        actions={
          <a
            href="/v2"
            target="_blank"
            rel="noopener"
            className="inline-flex min-h-11 items-center gap-1 rounded-md bg-blue px-5 font-semibold text-white hover:bg-action-hover"
          >
            Open /v2
            <ArrowUpRight className="size-4" />
          </a>
        }
      />

      <nav aria-label="On this page" className="flex flex-wrap gap-2 text-sm">
        {[
          ["#pages", "Pages"],
          ["#components", "Quizzes and calendar"],
          ["#design", "Design tokens"],
          ["#photos", "Photography"],
          ["#video", "Video"],
          ["#marks", "Logo rounds"],
          ["#favicons", "Favicons"],
          ["#source", "Source"],
        ].map(([href, label]) => (
          <a
            key={href}
            href={href}
            className="rounded-full border border-divider px-3 py-1 hover:bg-mist"
          >
            {label}
          </a>
        ))}
      </nav>

      <section id="pages">
        <h2 className="text-2xl font-semibold">Pages</h2>
        <p className="mt-1 text-muted">
          Five pages under <code className="font-mono text-sm">/v2</code>. Each
          one is a Server Component in{" "}
          <code className="font-mono text-sm">src/app/v2</code>.
        </p>
        <ul className="mt-4 divide-y divide-divider rounded-lg border border-divider">
          {v2Pages.map((p) => (
            <li key={p.path} className="grid gap-2 px-4 py-4 sm:grid-cols-[1fr_auto]">
              <div>
                <p className="font-semibold">
                  {p.title}{" "}
                  <span className="ml-1 font-mono text-xs font-normal text-muted">
                    {p.path}
                  </span>
                </p>
                <p className="mt-1 text-sm text-muted">{p.body}</p>
                <p className="mt-1 font-mono text-xs text-muted">from {p.source}</p>
              </div>
              <a
                href={p.path}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-1 self-start text-sm text-link underline"
              >
                Open <ArrowUpRight className="size-3.5" />
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section id="components">
        <h2 className="text-2xl font-semibold">Quizzes, funnel and calendar</h2>
        <p className="mt-1 text-muted">
          The interactive pieces, as client components in{" "}
          <code className="font-mono text-sm">src/components/v2</code>. The
          forms post nowhere yet; the calendar shows the next five weekdays.
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {v2Components.map((c) => (
            <Card key={c.title} className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold">{c.title}</h3>
              <p className="text-sm text-muted">{c.body}</p>
              <div className="mt-auto flex items-center justify-between gap-3 pt-2">
                <code className="font-mono text-xs text-muted">{c.file}</code>
                <a
                  href={c.path}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-1 text-sm text-link underline"
                >
                  Try it <ArrowUpRight className="size-3.5" />
                </a>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section id="design">
        <h2 className="text-2xl font-semibold">Design tokens</h2>
        <p className="mt-1 text-muted">
          The sample&rsquo;s own palette and type, kept from the mockup. They are
          CSS variables on <code className="font-mono text-sm">.v2</code> in{" "}
          <code className="font-mono text-sm">src/app/v2/v2.css</code>; change
          them there to restyle every page at once. The v1 brand kit is{" "}
          <Link href="/admin/brand" className="text-link underline">
            here
          </Link>
          .
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {v2Palette.map((c) => (
            <div key={c.token} className="overflow-hidden rounded-lg border border-divider">
              <div
                className="flex h-16 items-end p-3"
                style={{ backgroundColor: c.hex }}
              >
                <span
                  className={`font-mono text-xs ${
                    ["#f6f8f6", "#ffffff", "#dde5df", "#eefbf1", "#4ade80"].includes(c.hex)
                      ? "text-navy"
                      : "text-white"
                  }`}
                >
                  {c.token}
                </span>
              </div>
              <div className="p-3">
                <p className="font-mono text-sm font-semibold">{c.hex}</p>
                <p className="mt-1 text-xs text-muted">{c.job}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 grid gap-4">
          {v2Type.map((t) => (
            <Card
              key={t.family}
              className="grid gap-2 sm:grid-cols-[200px_1fr] sm:items-center"
            >
              <div>
                <p className="font-semibold">{t.family}</p>
                <p className="text-sm text-muted">{t.role}</p>
                <p className="text-sm text-muted">{t.weights}</p>
              </div>
              <p className={`text-2xl ${t.className}`} style={t.style}>
                {t.sample}
              </p>
            </Card>
          ))}
        </div>
      </section>

      <section id="photos">
        <h2 className="text-2xl font-semibold">Photography</h2>
        <p className="mt-1 text-muted">
          The eight generated photos and the portrait, served from{" "}
          <code className="font-mono text-sm">/v2/img</code>.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {v2Photos.map((img) => (
            <AssetCard
              key={img.file}
              src={`/v2/img/${img.file}`}
              alt={img.alt}
              title={img.file}
              meta={[img.role, img.size].filter(Boolean).join(" · ")}
            />
          ))}
        </div>
      </section>

      <section id="video">
        <h2 className="text-2xl font-semibold">Video</h2>
        <p className="mt-1 text-muted">
          The animated walkthrough in three cuts, with its poster frame. The
          voice-over files, script and render pipeline stay in the bbm-plan
          repository.
        </p>
        <div className="mt-4 grid gap-4 lg:grid-cols-[2fr_1fr]">
          <Card className="p-0 overflow-hidden">
            <video
              controls
              playsInline
              preload="metadata"
              poster={`/v2/video/${v2Poster}`}
              className="aspect-video w-full bg-black"
            >
              <source src="/v2/video/bbm-local-full.mp4" type="video/mp4" />
            </video>
          </Card>
          <ul className="space-y-3">
            {v2Videos.map((v) => (
              <li key={v.file} className="rounded-lg border border-divider p-4">
                <p className="font-semibold">{v.label}</p>
                <p className="mt-1 text-sm text-muted">{v.body}</p>
                <a
                  href={`/v2/video/${v.file}`}
                  download
                  className="mt-2 inline-flex items-center gap-1 text-sm text-link underline"
                >
                  <Download className="size-3.5" /> {v.file}
                </a>
              </li>
            ))}
            <li className="rounded-lg border border-divider p-4">
              <p className="font-semibold">Poster frame</p>
              <a
                href={`/v2/video/${v2Poster}`}
                download
                className="mt-2 inline-flex items-center gap-1 text-sm text-link underline"
              >
                <Download className="size-3.5" /> {v2Poster}
              </a>
            </li>
          </ul>
        </div>
      </section>

      <section id="marks">
        <h2 className="text-2xl font-semibold">Logo rounds</h2>
        <p className="mt-1 text-muted">
          Every mark explored on the way to Rocket Llama, newest first. The
          decided direction is the first group; the rest are the record of the
          rounds. Files are under{" "}
          <code className="font-mono text-sm">/v2/brand</code>.
        </p>
        <div className="mt-6 space-y-10">
          {v2BrandRounds.map((round) => (
            <div key={round.name}>
              <h3 className="text-xl font-semibold">{round.name}</h3>
              <p className="mt-1 max-w-[68ch] text-sm text-muted">{round.body}</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {round.images.map((img) => (
                  <AssetCard
                    key={img.file}
                    src={`/v2/brand/${img.file}`}
                    alt={img.alt}
                    title={img.file}
                    meta={img.alt}
                    compact
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="favicons">
        <h2 className="text-2xl font-semibold">Favicon packs</h2>
        <p className="mt-1 text-muted">
          Four rounds got a favicon pack: 16, 32, 48, 192 and 512 pixel PNGs,
          an ICO and an Apple touch icon. The Rocket Llama pack also has an SVG.
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {v2BrandRounds
            .filter((r) => r.favicon)
            .map((r) => (
              <Card key={r.favicon} className="flex flex-col gap-3">
                <p className="font-semibold">{r.name}</p>
                <div className="flex items-end gap-4 rounded-md bg-mist p-4">
                  {faviconSizes.slice(0, 4).map((size) => (
                    <div key={size} className="flex flex-col items-center gap-1">
                      <Image
                        src={`/v2/brand/${r.favicon}/favicon-${size}.png`}
                        alt=""
                        width={Number(size) > 48 ? 64 : Number(size)}
                        height={Number(size) > 48 ? 64 : Number(size)}
                        unoptimized
                      />
                      <span className="text-xs text-muted">{size}</span>
                    </div>
                  ))}
                </div>
                <p className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs">
                  {[
                    ...faviconSizes.map((s) => `favicon-${s}.png`),
                    "favicon.ico",
                    "apple-touch-icon.png",
                    ...(r.favicon === "rocket-llama-favicon" ? ["favicon.svg"] : []),
                  ].map((file) => (
                    <a
                      key={file}
                      href={`/v2/brand/${r.favicon}/${file}`}
                      download
                      className="text-link underline"
                    >
                      {file}
                    </a>
                  ))}
                </p>
              </Card>
            ))}
        </div>
      </section>

      <section id="source">
        <h2 className="text-2xl font-semibold">Source</h2>
        <Card>
          <dl className="grid gap-x-8 gap-y-3 sm:grid-cols-[max-content_1fr]">
            {[
              ["Mockup", "BBM Local mockup C, version 2 of the light design, September 2026"],
              ["Repository", "github.com/RocketLlamaLabs/bbm-plan"],
              ["Port", "scripts/port-v2-site.py and scripts/build-v2-css.py, run against a checkout of bbm-plan"],
              ["Still placeholder", "Privacy and terms links in the texting disclosure; the forms post nowhere; the calendar is not connected to a real booking system"],
            ].map(([label, value]) => (
              <div key={label} className="contents">
                <dt className="text-sm font-semibold text-muted">{label}</dt>
                <dd className="text-sm">{value}</dd>
              </div>
            ))}
          </dl>
        </Card>
      </section>
    </div>
  );
}

function AssetCard({
  src,
  alt,
  title,
  meta,
  compact,
}: {
  src: string;
  alt: string;
  title: string;
  meta?: string;
  compact?: boolean;
}) {
  return (
    <figure className="overflow-hidden rounded-lg border border-divider bg-white">
      <a href={src} target="_blank" rel="noopener" className="block bg-mist">
        <Image
          src={src}
          alt={alt}
          width={640}
          height={compact ? 640 : 360}
          className={`w-full ${compact ? "aspect-square object-contain p-2" : "aspect-video object-cover"}`}
        />
      </a>
      <figcaption className="flex items-start justify-between gap-2 p-3">
        <div className="min-w-0">
          <p className="truncate font-mono text-xs font-semibold" title={title}>
            {title}
          </p>
          {meta ? <p className="mt-1 text-xs text-muted">{meta}</p> : null}
        </div>
        <a
          href={src}
          download
          aria-label={`Download ${title}`}
          className="shrink-0 rounded-md p-1 text-muted hover:bg-mist hover:text-navy"
        >
          <Download className="size-4" />
        </a>
      </figcaption>
    </figure>
  );
}
