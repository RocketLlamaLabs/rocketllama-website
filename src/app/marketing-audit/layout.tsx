import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: { default: "Marketing audit", template: "%s — Rocket Llama Labs" },
  description:
    "A full marketing system audit: website, search engines, AI answer engines, speed, Google profile, social media, ads and lead handling.",
};

export default function AuditLayout({ children }: LayoutProps<"/marketing-audit">) {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-white text-navy">
      <header className="border-b border-divider print:border-navy">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
          <Link href="/marketing-audit" aria-label="Rocket Llama Labs marketing audit">
            <Image src="/brand/wordmark-horizontal-rocket-o.svg" alt="Rocket Llama Labs" width={200} height={40} priority className="h-9 w-auto" />
          </Link>
          <p className="font-display text-[13px] font-bold tracking-[0.08em] text-blue uppercase">Marketing audit</p>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-divider bg-mist print:bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-6 text-sm text-muted sm:flex-row sm:justify-between">
          <p>Rocket Llama Labs · Build fast. Launch faster.</p>
          <p>rocketllamalabs.com</p>
        </div>
      </footer>
    </div>
  );
}
