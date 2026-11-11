import Image from "next/image";
import Link from "next/link";

// Footer for version 7: the version 2 layout in the Rocket Llama colors,
// with the stacked logo (mascot, then Rocket / Llama on two lines).
export function V7Footer({ note: _note }: { note: string }) {
  return (
    <footer>
      <div className="wrap in">
        <nav className="find" aria-label="Industries"><b>Industries</b><Link href="/hvac">HVAC</Link><Link href="/plumbing">Plumbing</Link><Link href="/electrical">Electrical</Link><Link href="/roofing">Roofing</Link><Link href="/garage-door">Garage door</Link><Link href="/pest-control">Pest control</Link><Link href="/landscaping">Landscaping</Link><Link href="/painting">Painting</Link><Link href="/window-and-pressure-washing">Window and pressure washing</Link><Link href="/handyman">Handyman</Link><Link href="/mobile-mechanic">Mobile mechanic</Link><Link href="/windows-and-doors">Windows and doors</Link><Link href="/solar">Solar</Link><Link href="/flooring">Flooring</Link><Link href="/remodeling">Remodeling</Link></nav>
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
