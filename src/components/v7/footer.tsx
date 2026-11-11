import Image from "next/image";
import Link from "next/link";

// Footer for version 7: the version 2 layout in the Rocket Llama colors,
// with the stacked logo (mascot, then Rocket / Llama on two lines).
export function V7Footer({ note: _note }: { note: string }) {
  return (
    <footer>
      <div className="wrap in">
        <Link className="wm" href="/" aria-label="Rocket Llama Labs home">
          <Image
            src="/brand/logo-nav.svg"
            alt="Rocket Llama Labs"
            width={249}
            height={40}
          />
        </Link>
        <span className="copy">&copy; 2026 Rocket Llama Labs LLC</span>
        <span className="legal"><Link href="/privacy">Privacy Policy</Link> / <Link href="/terms">Website Policy</Link> / <Link href="/ai-policy">AI Policy</Link></span>
      </div>
    </footer>
  );
}
